const { createServer } = require('http');
const { parse } = require('url');
const { join, extname } = require('path');
const { existsSync, readFileSync } = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;

// MIME types for static files
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
};

// Simple static file server for production build
const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Security: prevent directory traversal
  pathname = pathname.replace(/\.\./g, '');

  // Serve static files from build directory
  let filePath = join(__dirname, 'build', pathname === '/' ? 'index.html' : pathname);
  
  // Check if file exists
  if (existsSync(filePath) && !filePath.endsWith('/')) {
    const ext = extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(readFileSync(filePath));
  } else {
    // Fallback to index.html for client-side routing (React Router)
    const indexPath = join(__dirname, 'build', 'index.html');
    if (existsSync(indexPath)) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(readFileSync(indexPath));
    } else {
      res.statusCode = 404;
      res.end('Not found - build directory missing');
    }
  }
});

server.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`> Server ready on http://0.0.0.0:${port}`);
});
