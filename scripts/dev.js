// Локальный запуск без Vercel: статика из public/ + API. Без DATABASE_URL база — PGlite в памяти.
const http = require('http'); const fs = require('fs'); const path = require('path');
const api = require('../api/index.js');
const ROOT = path.join(__dirname, '..', 'public');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (o) => { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(o)); };
  if (req.url.startsWith('/api/')) return api(req, res);
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.statusCode = 403; return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.statusCode = 404; return res.end('not found'); }
    res.setHeader('content-type', TYPES[path.extname(file)] || 'application/octet-stream'); res.end(data);
  });
}).listen(PORT, () => console.log(`Sauat: http://localhost:${PORT}`));
