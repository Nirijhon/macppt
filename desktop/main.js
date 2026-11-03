// desktop/main.js — SlideCraft Studio desktop shell (Electron)
//
// The entire SlideCraft app is the existing zero-build static site (../PPT).
// At build time the GitHub Actions workflow copies those files into desktop/app/
// and electron-builder packages them. Locally, if app/ is missing, we fall back
// to loading ../PPT/index.html directly so `npm start` works during development.
//
// The site is served through a private `app://` protocol instead of file:// so
// that localStorage (slide queue persistence) works reliably and the app has a
// proper web origin — exactly how it behaves on Netlify.

const { app, BrowserWindow, protocol, net, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

// Directory that contains the packaged site (index.html, js/, image.png, ...)
const PACKAGED_SITE = path.join(__dirname, 'app');
// Development fallback: the original site folder next to desktop/
const DEV_SITE = path.join(__dirname, '..', 'PPT');

function siteRoot() {
    return fs.existsSync(path.join(PACKAGED_SITE, 'index.html')) ? PACKAGED_SITE : DEV_SITE;
}

// Register app:// as a standard secure scheme BEFORE app is ready.
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }
]);

function createWindow() {
    const win = new BrowserWindow({
        width: 1360,
        height: 850,
        minWidth: 960,
        minHeight: 600,
        title: 'SlideCraft Studio',
        backgroundColor: '#0B192C',
        autoHideMenuBar: true,
        // Window/taskbar icon (Windows/Linux dev runs). On macOS the .icns
        // generated from desktop/build/icon.png by electron-builder is used.
        icon: path.join(__dirname, 'build', 'icon.png'),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    // Open target=_blank / external links (CDN docs, etc.) in the system browser.
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });

    win.loadURL('app://local/index.html');
}

app.whenReady().then(() => {
    const root = siteRoot();

    // Map app://local/<path> to files inside the site root. Mirrors the static
    // server behavior: "/" → index.html, unknown paths → 404.html.
    protocol.handle('app', (request) => {
        const url = new URL(request.url);
        let pathname = decodeURIComponent(url.pathname);
        if (pathname === '/' || pathname === '') pathname = '/index.html';
        let filePath = path.normalize(path.join(root, pathname));
        if (!filePath.startsWith(root)) {
            return new Response('Forbidden', { status: 403 });
        }
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            filePath = path.join(root, '404.html');
            if (!fs.existsSync(filePath)) filePath = path.join(root, 'index.html');
        }
        return net.fetch(pathToFileURL(filePath).toString());
    });

    createWindow();

    app.on('activate', () => {
        // macOS convention: re-create the window when the dock icon is clicked
        // and no windows are open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// macOS convention: keep the app running until the user quits explicitly (Cmd+Q).
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
