# Amanda's Nashville Bach 🤠

A mobile-first wedding-weekend itinerary site for Amanda's bachelorette party in Nashville, May 28–31, 2026.

**Theme:** Saddlin' Up & Settlin' Down

## Stack

- Vite + React (single-page app, client-side routing)
- Inline styles (Playfair Display + DM Sans + Cormorant Garamond via Google Fonts)
- Auto-deployed to GitHub Pages on push to `main`

## Local dev

```bash
npm install
VITE_BASE=/ npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Deploy

Just push to `main`. The workflow at `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.

Live URL: https://meme-murderer.github.io/amanda-bach-nashville/
