# Launch Channel Matrix

**Holistic AI · Platform launch execution**

Launch Channel Matrix helps product marketing coordinate assets across teams around a shared launch date. Each row pairs a channel and deliverable with an owner, a deadline relative to launch, and a readiness status.

## Why I built it

I built this around my work coordinating web, email, social, search, paid, press, and analyst materials for the 2025/26 Holistic AI platform launch. It demonstrates how a shared date can anchor planning across teams with different lead times.

## Try the sample

1. Find **Platform overview page** in the **Web** row. Its offset of `-7` puts it one week before the launch date.
2. Change the launch date and observe the calculated dates move together. Use `0` for launch day and a positive offset for follow-up assets.
3. Assign a new owner or add an asset. Use the readiness summary to see how many items are in draft, in review, or ready.
4. Click **Download Markdown** to export the calendar with calculated dates, owners, and statuses.

Offsets count calendar days. You can adjust individual offsets to account for weekends, holidays, or team milestones.

## Run locally

Download the repository ZIP or clone it, then open `index.html` in a modern browser.

```sh
git clone https://github.com/johnmir94/launch-channel-matrix.git
cd launch-channel-matrix
```

The app uses HTML, CSS, and JavaScript and runs entirely in the browser without an account or backend. Sample data is fictional. Edits stay in the current tab, so download the Markdown before reloading or closing it.

## Source files

| File | Role |
| --- | --- |
| `index.html` | Workspace layout and controls |
| `style.css` | Responsive styling |
| `data.js` | Fictional sample workspace |
| `app.js` | Editing, validation, summaries, and Markdown export |
