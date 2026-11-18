"use strict";
const project = window.project;
const form = document.querySelector("form");
const list = document.querySelector("#items");
const goal = document.querySelector("#goal");
const setting = document.querySelector("#setting");
const summary = document.querySelector("#summary");
const feedback = document.querySelector("#feedback");

function deadline(offset) {
  if (!setting.value || offset === "" || !Number.isInteger(Number(offset))) return "";
  const [year, month, day] = setting.value.split("-").map(Number);
  if (!year || !month || !day) return "";
  const date = new Date(Date.UTC(year, month - 1, day + Number(offset)));
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function rowValues(row) {
  return Array.from(row.querySelectorAll("input,textarea,select"), input => input.value.trim());
}

function values() {
  return Array.from(list.children, rowValues);
}

function summaryText(entries) {
  const statusCounts = project.statuses.map(status =>
    entries.filter(entry => entry[4] === status).length + " " + status.toLowerCase());
  if (project.timed) {
    const minutes = entries.reduce((total, entry) => total + Number(entry[3]), 0);
    const budget = Number(setting.value);
    statusCounts.push(minutes + " min planned" + (budget ? " of " + budget + " min" : ""));
    if (budget && minutes > budget) statusCounts.push((minutes - budget) + " min over budget");
  }
  if (project.dated) statusCounts.push(entries.filter(entry => deadline(entry[3])).length + " dated");
  return statusCounts.join(" · ");
}

function refresh() {
  const entries = values();
  summary.textContent = summaryText(entries);
  Array.from(list.children).forEach((row, index) => {
    row.querySelector("legend").textContent = (entries[index][0] || "New " + project.item);
    if (project.dated) {
      row.querySelector("small").textContent = deadline(entries[index][3]) || "Enter a launch date and a whole-day offset.";
    }
  });
}

function field(label, index, value) {
  const wrapper = document.createElement("label");
  wrapper.textContent = label;
  const numeric = index === 3 && (project.timed || project.dated);
  const control = document.createElement(index === 4 ? "select" : index === 2 && !project.dated ? "textarea" : "input");
  if (index === 4) project.statuses.forEach(status => control.add(new Option(status, status)));
  if (numeric) {
    control.type = "number";
    control.step = "1";
    control.min = project.timed ? "1" : "-365";
    control.max = "365";
  }
  control.required = index === 0 || numeric;
  control.value = value;
  wrapper.append(control);
  return wrapper;
}

function appendRow(entry = ["", "", "", "", project.statuses[0]], focus = false) {
  const row = document.createElement("fieldset");
  row.className = "record";
  const legend = document.createElement("legend");
  const fields = document.createElement("div");
  fields.className = "fields";
  [...project.keys, "Status"].forEach((label, index) => fields.append(field(label, index, entry[index])));
  const actions = document.createElement("div");
  actions.className = "details actions";
  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "Remove";
  remove.addEventListener("click", () => {
    if (!window.confirm("Remove this " + project.item + "?")) return;
    row.remove();
    refresh();
    document.querySelector("#add").focus();
  });
  actions.append(remove);
  if (project.dated) actions.append(document.createElement("small"));
  row.append(legend, fields, actions);
  list.append(row);
  if (focus) fields.querySelector("input").focus();
}

function loadSample() {
  goal.value = project.goal[1];
  setting.value = project.timed ? "15" : project.dated ? "2027-02-18" : "";
  list.replaceChildren();
  project.sample.forEach(entry => appendRow(entry));
  refresh();
}

form.addEventListener("input", refresh);
document.querySelector("#add").addEventListener("click", () => {
  appendRow(undefined, true);
  refresh();
});
document.querySelector("#reset").addEventListener("click", () => {
  if (window.confirm("Replace this workspace with the fictional sample?")) loadSample();
});
form.addEventListener("submit", event => {
  event.preventDefault();
  const entries = values();
  if (!goal.value.trim() || !entries.length || entries.some(entry => !entry[0])) {
    feedback.textContent = "Enter an objective and at least one named " + project.item + ".";
    return;
  }
  const markdown = ["# " + project.name, "", "**" + project.goal[0] + "** — " + goal.value.trim(),
    ...(project.dated ? ["**Launch date** — " + setting.value] : []), "", summaryText(entries), "",
    ...entries.flatMap(entry => ["## " + entry[0], "", ...project.keys.slice(1).map((key, i) => "- **" + key + "** — " + (entry[i + 1] || "Pending")),
      "- **Status** — " + entry[4], ...(project.dated ? ["- **Due date** — " + deadline(entry[3])] : []), ""])
  ].join("\n");
  const url = URL.createObjectURL(new Blob([markdown], {type: "text/markdown"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = project.slug + ".md";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  feedback.textContent = "Markdown download started.";
});
loadSample();
