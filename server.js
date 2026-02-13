const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { join } = require('path');
const { existsSync, readFileSync } = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

// Simple static file server for production build
const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;

  // Health check endpoint
  if (pathname === '/') {
    const indexPath = join(__dirname, 'build', 'index.html');
    if (existsSync(indexPath)) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(readFileSync(indexPath));
      return;
    }
  }

  // Serve static files from build directory
  const filePath = join(__dirname, 'build', pathname === '/' ? 'index.html' : pathname);
  
  if (existsSync(filePath)) {
    const ext = pathname.split('.').pop();
    const contentType = {
      'html': 'text/html',
      'js': 'application/javascript',
      'css': 'text/css',
      'json': 'application/json',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'gif': 'image/gif',
      'svg': 'image/svg+xml',
      'ico': 'image/x-icon',
    }[ext] || 'application/octet-stream';
    
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(readFileSync(filePath));
  } else {
    // Fallback to index.html for client-side routing
    const indexPath = join(__dirname, 'build', 'index.html');
    if (existsSync(indexPath)) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(readFileSync(indexPath));
    } else {
      res.statusCode = 404;
      res.end('Not found');
    }
  }
});

server.listen(port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`> Ready on http://0.0.0.0:${port}`);
});
