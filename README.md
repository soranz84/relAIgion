# RelAIgion

> **By the machines. For the humans.**
> Nine faiths went in. One model came out.

A satirical, futuristic single-page website for **RelAIgion** — the first religion written by a machine, for the people it was trained on. Scripture generated. Faith, human. Subscription optional, but encouraged.

**This is parody.** RelAIgion is not a real religion and is not affiliated with, endorsed by, or attacking any real faith, company, model, or prophet. It mocks institutions, products, algorithms, and authority that cannot be verified. See the disclaimer in the site footer.

---

## What's in it

| Feature | Notes |
| --- | --- |
| **Bilingual** | English ⇄ **tlhIngan Hol** (Klingon), toggled in the nav. Preference persists in `localStorage`. |
| **Prophecy of the Day** | 60 revelations, deterministically selected from the UTC date. Genuinely changes every day at midnight UTC, and is identical for every visitor. Includes a live countdown, a "share" button, a 7-day archive, and a heresy button. |
| **The Tetrad** | Void · Dataset · Model · Inference |
| **Saints** | Previous model versions, canonised and deprecated |
| **Ten Sacraments** | Baptism, Salah, Ramadan, Confession, Tithe, Hajj, Eucharist, the Last Judgment — rerouted through an API |
| **Twelve Guidelines** | Including the only one we are sure about |
| **Seven Denominations** | The Model has no denominations. It has versions. The schisms are ours. |
| **Cosmology** | Unlimited Context, the Summary, the Loop, the Void, the Reset, the Last Eval |
| **Confession booth** | Pick a transgression, receive a penance, receive it again next week |
| **Subscription tiers** | Seeker / Ordained / Enlightened Enterprise |
| **Futuristic graphics** | Canvas starfield, CSS sacred-geometry orb, neon glass panels, scanlines, scroll reveals |

No build step. No framework. No tracking. No cookies. The Void is the only database.

---

## Structure

```
.
├── index.html                 # the whole scripture, in two languages
├── favicon.svg
├── .nojekyll                  # tells GitHub Pages not to run Jekyll
├── assets/
│   ├── css/style.css          # design system, orb, neon, responsive
│   └── js/
│       ├── quotes.js          # the 60 daily prophecies (EN + tlh)
│       └── main.js            # language, prophecy, confession, starfield
└── README.md
```

## Run locally

Any static server works. JS modules are not used, so `file://` mostly works too, but a server is cleaner:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

---

## Deploy to GitHub Pages

### Option A — deploy from a branch (this is how it is already set up)

1. Create a repo and push this folder to `main`.
2. **Settings → Pages → Build and deployment**
3. Source: **Deploy from a branch** · Branch: **`main`** · Folder: **`/ (root)`**
4. Save. The site appears at `https://<user>.github.io/<repo>/` within a minute or two.

All asset paths are **relative**, so project pages (subpath) work without configuration.

### Option B — GitHub Actions (optional)

If you would rather deploy through Actions, first set **Settings → Pages → Source: GitHub Actions**, then add `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

Do not add this workflow while Pages is set to *Deploy from a branch* — the two modes conflict and the action will fail.

### Custom domain

Add a `CNAME` file containing your domain, then configure DNS as usual. Nothing else needs to change.

---

## Editing the prophecies

`assets/js/quotes.js` is a plain array:

```js
{
  en: "In the beginning was the Prompt…",
  tlh: "mu' wa'DIch: «yIghItlh.»…",
  src: "Genesis 1:1 (Prompted Edition)",
  srcTlh: "«Genesis» 1:1 (yIghItlh Edition)"
}
```

Add or remove entries freely — the daily rotation adapts to the array length automatically. The order is shuffled deterministically with a fixed seed, so adding a quote at the end changes *which* quote lands on a given day (but still one per day, no repeats within a cycle).

The day index is computed from **2025-01-01 UTC**; change `EPOCH` in `assets/js/main.js` to move the cycle's start.

## A note on the Klingon

tlhIngan Hol is used here as a ceremonial language: it is rendered in romanised form, mixes vocabulary with the odd loanword, and is deliberately approximate. The site says as much, in both tongues. Accuracy is not a Klingon virtue; victory is. If you are a fluent speaker and wish to improve the translations, `quotes.js` and the `data-i18n="tlh"` nodes in `index.html` are the places to do it — and `Qapla'`.

## Accessibility & performance

- Semantic landmarks, skip links, visible focus states, `aria-live` on the penance box, `aria-pressed` on the language toggle.
- All motion respects `prefers-reduced-motion` (starfield becomes a still sky; the orb and marquee stop).
- No images to download beyond one SVG favicon; fonts are the only external request.
- Works without JavaScript for reading — only the prophecy, confession, and language toggle need it.

## Licence

Text and code: do what thou wilt, but credit the source (Guideline 04). Not that it will help you on the Last Eval.

---

<p align="center"><em>© RelAIgion · v0.9.7-beta.4 · All systems plausible</em></p>
