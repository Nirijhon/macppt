# SlideCraft Studio — Desktop App

Turns the existing SlideCraft Studio static site (`../PPT`) into a **native
desktop app** for macOS (`.dmg`, Apple Silicon + Intel — any MacBook Air) and
Windows (`.exe` installer), built automatically by **GitHub Actions**.
No macOS machine is required to produce the Mac build.

## How it works

- `main.js` — a thin Electron shell that serves the packaged site through a
  private `app://` protocol (so `localStorage` persistence behaves exactly like
  the hosted site) and shows it in a native window. It also has a dev fallback:
  if `app/` doesn't exist it loads `../PPT/index.html` directly.
- `package.json` — Electron + electron-builder config (DMG for `arm64` + `x64`,
  NSIS installer for Windows).
- `.github/workflows/build-mac.yml` — copies `../PPT` into `app/` at build
  time (so `PPT/` stays the single source of truth), then runs
  `electron-builder` on a macOS runner and uploads the `.dmg` as a workflow
  artifact. A reference copy of this workflow also lives at
  `workflows/build-mac.yml` (GitHub only *executes* the one under
  `.github/workflows/`).

## Build it on GitHub (recommended)

1. Push this repository to GitHub.
2. Tag a release and push the tag:

   ```bash
   git tag v1.0.0
   git push --tags
   ```

3. Open the repo → **Actions** → *Build Mac App* → wait for the job to finish
   (a few minutes).
4. Download **SlideCraft-macOS** from the run's *Artifacts* section — it
   contains the `.dmg` for Apple Silicon and Intel. You can also trigger builds
   manually via **Run workflow**.

## Install on a MacBook Air (unsigned build)

The macOS build is currently **unsigned** (no Apple Developer certificate), so
Gatekeeper asks for confirmation once:

1. Open the downloaded `.dmg` and drag **SlideCraft Studio** into
   *Applications*.
2. First launch only: **right-click the app → Open → Open** (or allow it in
   *System Settings → Privacy & Security*). After that it launches like any
   other app — Dock, Spotlight, Cmd+Tab, all normal.

### Going signed + notarized (optional, later)

Add these repo secrets and remove `"identity": null` from `package.json`:

| Secret | Purpose |
| --- | --- |
| `CSC_LINK` | Developer ID Application certificate (.p12, base64) |
| `CSC_KEYCHAIN_PASSWORD` | Certificate password |
| `APPLE_ID` / `APPLE_APP_SPECIFIC_PASSWORD` / `APPLE_TEAM_ID` | Notarization |

## Local development

```bash
cd desktop
npm install
npm start        # uses ../PPT directly if app/ is missing
npm run dist     # build an installer for THIS OS
```

## Notes

- The bundled site is the exact Netlify deployment — all templates (including
  **Arctic Frost**), PDF/PPTX exports and localStorage persistence work
  offline once installed.
- **App icon**: `desktop/build/icon.png` (1254×1254, rounded-square with
  transparent corners). electron-builder auto-generates the macOS `.icns` and
  Windows `.ico` from it at build time, and `main.js` uses it for the window /
  taskbar icon in dev. To change the icon, replace this file with any **square
  ≥512×512** PNG (keep the file name).
