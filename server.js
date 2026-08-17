const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');

// Swagger API docs — served from public/ (no full app build required)
app.get('/api-docs', (_req, res) => {
  res.sendFile(path.join(publicPath, 'api-docs', 'index.html'));
});
app.use('/api-docs', express.static(path.join(publicPath, 'api-docs')));
app.get('/openapi.yaml', (_req, res) => {
  res.sendFile(path.join(publicPath, 'openapi.yaml'));
});

// Serve built app assets when dist exists
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// React SPA fallback (only when dist/index.html exists)
app.get('*', (_req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(404).send(
    'App not built. Run npm run build for the web app, or open /api-docs for API documentation.',
  );
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});