# The Scottie Scheffler Tracker

A React app that tracks your bets on Scottie Scheffler. Dark theme, summary dashboard, and a filterable list of all bets.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Editing your bet data

All data lives in **`src/data/bets.json`**. Edit that file to add, remove, or change bets. The app reloads on save during `npm run dev`.

### Schema

Each bet is an object with:

| Field       | Type   | Description                          |
|------------|--------|--------------------------------------|
| `id`       | string | Unique ID (e.g. `"1"`, `"2"`)        |
| `book`     | string | Sportsbook (e.g. Draftkings, Fanduel)|
| `tournament` | string | Event name                            |
| `betType`  | string | e.g. winner, top 5, top 10, top 20   |
| `odds`     | number | American odds (e.g. 164, -110)       |
| `stake`    | number | Wager amount                         |
| `result`   | string | `"W"` \| `"L"` \| `"Pending"` \| `"Push"` |
| `profitLoss` | number | (optional) Override computed P/L    |

Profit/loss for resolved bets is computed from American odds if `profitLoss` is omitted.

## Build

```bash
npm run build
npm run preview
```
