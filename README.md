# SlideCraft Studio — Monorepo

A lightweight, brand-first **sermon slide builder**. Pick a template (17 themes,
including Arctic Frost), add Title / Point / Verse / Message slides, preview
them live, then export print-ready PDFs and PowerPoint decks. Runs entirely in
the browser — no backend, no build step.

## Repository layout

| Path | Purpose | Deployed? |
| --- | --- | --- |
| `PPT/` | **The website** — the actual app (app shell + `js/app.js` logic) | ✅ Netlify |
| `PPT/netlify.toml` | Netlify config when `PPT/` is the publish root | ✅ |
| `netlify.toml` | Netlify config for THIS repo layout (`publish = "PPT"`) | ✅ |
| `index.html` | Root redirect → `PPT/index.html` | ✅ |
| `desktop/` | Electron shell that wraps `PPT/` into a native **macOS / Windows app** | ❌ build-time only |
| `.github/workflows/build-mac.yml` | **Builds the Mac `.dmg`** on GitHub's macOS runners (tag `v*` or manual run) | ❌ CI only |
| `workflows/build-mac.yml` | Reference copy of the workflow (GitHub only executes the one under `.github/`) | — |

## Deploying

- **Website → Netlify**: connect this repo; Netlify picks up the root
  `netlify.toml` (publish dir `PPT`, no build command). Or drag
  `PPT/` onto https://app.netlify.com/drop. Details: `PPT/README.md`.
- **Mac app**: see `desktop/README.md` — push a `v*` tag, download the `.dmg`
  from the Actions artifacts, no Mac required to build.

## Local development

```bash
cd PPT
node serve.js        # http://localhost:8899
```

## License

MIT

