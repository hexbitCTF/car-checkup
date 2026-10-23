# Ambulance Checkup

A web-based ambulance equipment checkup app for LRC Aley Station 602. Used by EMTs to log initial inventory checks, restock missing items, and submit a final report to a Google Sheet.

## Features

- **Three checkup pages**: Medical Kit, Trauma Kit, Ambulance Equipment
- **Per-item tracking**: checkboxes, quantities, PSI readings (oxygen bottles), and fill-level sliders
- **Transport equipment toggle**: Stair Chair / Foldable Stretcher (EZ-Glide must be present to enable Foldable Stretcher)
- **Initial checkup + final restock flow**: submits an initial snapshot, then a final report comparing initial vs. restocked quantities
- **Restock view**: lists items below required thresholds with one-click restock to the required quantity
- **Per-item "how to check" notes**: optional info button on equipment items with pre-written guidance, editable by any user (stored in the spreadsheet)
- **Persistence**: state is saved in `localStorage` so a checkup survives page reloads

## Files

| File | Purpose |
|---|---|
| `index.html` | Page markup and modal containers |
| `script.js` | Item definitions, rendering, state, submission logic |
| `style.css` | Styling (responsive, mobile-friendly) |
| `apps-script.gs` | Google Apps Script backend that writes checkup data to a Google Sheet |

## Setup

1. Deploy `apps-script.gs` as a Web App (Execute as: Me, Who has access: Anyone) and copy the `/exec` URL into `SCRIPT_URL` in `script.js`.
2. Host `index.html`, `script.js`, `style.css` on any static host (GitHub Pages works).
3. Open the site, select EMT / Car / Shift, and run the checkup.

## Notes

- The info-button feature is currently disabled (`infoButtonsEnabled = false` in `script.js`). Flip it to `true` to show the buttons; guidance text is pre-filled and editable.
- `apps-script.gs` keeps its own `requiredQuantities` and `allItems` lists, which must be kept in sync with `script.js` whenever items change.