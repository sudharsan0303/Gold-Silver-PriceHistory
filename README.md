# AURA METALS — India Gold & Silver Buying Price Tracker

A real-time India Gold & Silver buying price tracker built with React and Recharts. All prices displayed in Indian Rupees (INR) with Indian number formatting.

## Features

- **Live Prices** — Fetches international spot prices and converts to approximate Indian buying price (INR/gram) with import duty + GST + markup applied
- **Metal Switcher** — Toggle between Gold 24K and Silver 999 views
- **Auto-Refresh** — Prices refresh every 60 seconds with a visible countdown bar
- **Historical Data** — 31 days of OHLC buying price data (07 Feb - 09 Mar 2026)
- **5 Chart Views** — Trend (area), OHLC (multi-line), Volatility (bar), % Change (colored bars), Data Table
- **Stats Dashboard** — Period return, high/low, bull sessions, average price
- **Key Events** — All-time high, period low, biggest surge/drop
- **Price Milestones Timeline** — Visual timeline of key price points
- **Fallback System** — Graceful degradation with hardcoded prices if APIs fail

## Tech Stack

- **React 18** — UI framework
- **Recharts** — Charting library
- **Vite** — Build tool and dev server
- **IBM Plex Mono** — Typography (Google Fonts)

## Data Sources

| Data | Source |
|------|--------|
| Gold & Silver spot (USD/oz) | [api.metals.live](https://api.metals.live/v1/spot) (primary) |
| Gold & Silver spot (backup) | [Swissquote](https://forex-data-feed.swissquote.com) |
| USD/INR exchange rate | [Frankfurter API](https://api.frankfurter.app) |

## Price Conversion Formula

```
baseINR/gram   = (spotUSD/oz * USD_INR) / 31.1035
withDuty       = baseINR * 1.15    (+15% import duty + GST)
buyingPrice    = withDuty * 1.02   (+2% platform markup)
```

> Prices are indicative. Actual buying price may vary by jeweller, city, and platform.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

## Deploy on Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) > New > Static Site
3. Connect the GitHub repo
4. Set:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Deploy

## Project Structure

```
Gold-Silver/
  index.html            HTML entry with Google Fonts link
  package.json          Dependencies (react, recharts)
  vite.config.js        Vite configuration
  src/
    main.jsx            React entry point
    AuraMetals.jsx      Complete app (single component)
```

## License

MIT
