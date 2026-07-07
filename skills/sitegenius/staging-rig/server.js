#!/usr/bin/env node
// Staging rig server — mimics Hostinger static hosting for a deploy package.
// Usage: node server.js <package-dir> [port]
// Behavior mirrored from Hostinger: serves static files, falls back to
// /404.html (status 404) for missing paths, correct MIME types.
// Also mounts a mock Supabase endpoint (POST /rest/v1/leads) so a build
// wired to a live form can be rehearsal-tested: echoes the row back and
// logs it to stdout, honoring the honeypot convention (silently accepts
// but flags rows where a honeypot field is non-empty).

const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(process.argv[2] || '.');
const port = parseInt(process.argv[3] || '8787', 10);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  // Mock Supabase leads endpoint
  if (req.method === 'POST' && req.url.startsWith('/rest/v1/leads')) {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      let row = {};
      try { row = JSON.parse(body); } catch (e) {}
      const honeypotHit = Object.entries(row).some(
        ([k, v]) => ['_gotcha', 'company'].includes(k) && v
      );
      console.log('[mock-supabase] lead row:', JSON.stringify(row), honeypotHit ? '(HONEYPOT HIT)' : '');
      res.writeHead(201, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify([row]));
    });
    return;
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    });
    res.end();
    return;
  }

  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const filePath = path.join(root, urlPath);

  // path traversal guard
  if (!filePath.startsWith(root)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Hostinger behavior: serve /404.html with a 404 status
      fs.readFile(path.join(root, '404.html'), (e2, notFound) => {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(e2 ? 'Not found' : notFound);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`[staging-rig] serving ${root} at http://localhost:${port} (404.html fallback + mock /rest/v1/leads)`);
});
