# Launch Channel Matrix

Use the matrix to coordinate launch deliverables around a shared milestone. Set a campaign message and launch date, then track what each channel needs, who owns it, and how far in advance or after launch it is due.

## Run locally

Clone the repository or use **Code → Download ZIP** on GitHub. Open `index.html` in a modern browser. There’s no install, build step, or account required.

```sh
git clone https://github.com/johnmir94/launch-channel-matrix.git
cd launch-channel-matrix
```

## Sample workflow

1. Find **Platform overview page** in the **Web** row. Its offset of `-7` puts it one week before the launch date.
2. Change the launch date and observe the calculated dates move together. Use `0` for launch day and a positive offset for follow-up assets.
3. Assign a new owner or add an asset. Use the readiness summary to see how many items are in draft, in review, or ready.
4. Click **Download Markdown** to export the calendar with calculated dates, owners, and statuses.

## Workspace fields

| Field | What it captures |
| --- | --- |
| Channel and asset | The destination and deliverable, such as web and a platform overview page |
| Owner | Team or person responsible for the asset |
| Days from launch | Whole calendar days before or after the shared launch date |
| Status | Draft, In review, or Ready |

## How it works

Due date equals launch date plus the row’s calendar-day offset. A negative value schedules work before launch, zero schedules it on launch day, and a positive value schedules it after launch. Changing the launch date recalculates every due date while retaining the offsets. Adjust offsets manually for weekends, holidays, and approval deadlines. Readiness is selected per asset.

### Worked example

For the sample launch date of February 18, 2027, the web overview at `-7` falls on February 11, the email at `0` falls on February 18, and paid search at `+2` falls on February 20. Moving the launch date by a week shifts all three deadlines by a week.

## Export and data handling

Markdown includes the campaign message, launch date, readiness counts, and each asset’s channel, owner, offset, status, and calculated deadline.

Processing runs in the browser. The app has no backend and keeps edits in memory. Reloading reopens the fictional sample. Download the Markdown before closing the tab if you need a copy of your work.

## Files and checks

| File | Role |
| --- | --- |
| [`index.html`](index.html) | Workspace and controls |
| [`style.css`](style.css) | Responsive layout |
| [`data.js`](data.js) | Fictional seed data and field labels |
| [`app.js`](app.js) | Editing, validation, summaries, and Markdown export |

Run JavaScript syntax checks with Node.js. Use the sample workflow above for a manual check of editing, summary updates, and the export.

```sh
node --check app.js
node --check data.js
```

## Project context

The workflow draws on cross-channel launch execution for the Holistic AI platform across web, email, social, search, paid, press, and analyst materials. The sample is fictional and uses no internal employer materials or customer records.
