# MathSci Academy — Self-Hosted Learning Portal

## What's inside

```
mathsci/
├── index.html          ← Open this in any browser, or deploy as root
├── css/
│   └── style.css       ← All styling (dark theme, responsive)
├── js/
│   ├── state.js        ← Progress engine (localStorage persistence)
│   └── app.js          ← Full application logic
└── data/
    └── curriculum.js   ← All lesson content + 100 exam questions
```

## How to run locally

Just open `index.html` in any modern browser — Chrome, Firefox, Safari, Edge.
No server, no build step, no dependencies. It runs entirely offline after first load.

The only online resource is Google Fonts (loaded from fonts.googleapis.com).
If you want fully offline support, remove the `@import` line from `css/style.css`
and the fonts will fall back gracefully.

## How to self-host

Upload the entire `mathsci/` folder to any static web host:

### Option A — Netlify (free, drag & drop)
1. Go to https://app.netlify.com/drop
2. Drag the `mathsci/` folder onto the page
3. Your portal is live at a `*.netlify.app` URL in 30 seconds

### Option B — GitHub Pages (free)
1. Create a new GitHub repository
2. Push all files to the `main` branch
3. Go to Settings → Pages → Source: `main` branch, `/root`
4. Your portal is live at `https://username.github.io/repo-name`

### Option C — Any web server (cPanel, Apache, Nginx)
Upload all files to `public_html/` or your document root.
No `.htaccess` or server config needed — it's pure static HTML.

### Option D — Cloudflare Pages (free, fast CDN)
Connect your GitHub repo to Cloudflare Pages with zero config.

## Progress storage

All progress is stored in your browser's `localStorage` under the key `mathsci_v1`.
This means:
- Progress persists across browser sessions on the same device/browser
- Clearing browser data will erase progress (use Settings → Export to back up — coming in v2)
- Progress does NOT sync across devices (each device has its own localStorage)

## Curriculum overview

| Stage | Topic | Lessons | Exam |
|-------|-------|---------|------|
| 1 | Foundations — numbers, algebra, geometry | 7 lessons | 20 questions |
| 2 | Pre-Calculus & Trigonometry | 7 lessons | 20 questions |
| 3 | Calculus — derivatives, integrals, ODEs | 7 lessons | 20 questions |
| 4 | Linear Algebra & Statistics | 7 lessons | 20 questions |
| 5 | Advanced — PDEs, Fourier, complex analysis | 7 lessons | 20 questions |

**Total: 35 lessons · 100 exam questions · 5 certificates**

## Gamification system

- **XP** — earn 120–250 XP per lesson, up to 300 per exam pass
- **Levels** — 15 levels from Novice to Mathematics Scientist
- **Badges** — 18 badges for streaks, milestones, perfect scores, and more
- **Streak** — daily streak tracked; resets if you miss a day
- **Weak topics** — wrong answers are tagged and surfaced in Analytics & Dashboard
- **Certificates** — downloadable PNG certificates for each stage + master cert

## Pass marks

All exams require **≥ 75%** to pass. You can retake exams unlimited times.
Your best score is always saved. The Analytics screen shows your full attempt history.
