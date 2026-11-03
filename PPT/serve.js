const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = 8899;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(ROOT, urlPath);
  // Prevent path traversal
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Unknown route → serve the styled 404 page (with a 404 status)
      fs.readFile(path.join(ROOT, '404.html'), (e2, d2) => {
        if (e2) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not Found'); return; }
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(d2);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache'
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log('Serving ' + ROOT + ' on http://localhost:' + PORT);
});
