import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');

const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css', '.json', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif'];

const IMPORT_RE = /(?:import\s+(?:[^'"]+\s+from\s+)?|export\s+(?:\*|\{[^}]*\})\s+from\s+|import\s*\(|require\s*\()\s*['"]([^'"]+)['"]/g;
const SIDE_EFFECT_IMPORT_RE = /import\s+['"]([^'"]+)['"]/g;

function resolveImport(fromFile, spec) {
  if (spec.startsWith('@/')) {
    const rel = spec.slice(2);
    return resolveModulePath(path.join(srcDir, rel));
  }
  if (spec.startsWith('.')) {
    return resolveModulePath(path.resolve(path.dirname(fromFile), spec));
  }
  return null; // external package
}

function resolveModulePath(basePath) {
  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) return basePath;

  for (const ext of EXTENSIONS) {
    const withExt = basePath + ext;
    if (fs.existsSync(withExt)) return withExt;
  }

  if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
    for (const idx of ['/index.tsx', '/index.ts', '/index.jsx', '/index.js']) {
      const idxPath = basePath + idx;
      if (fs.existsSync(idxPath)) return idxPath;
    }
  }

  // bare path might be file without ext already checked
  return null;
}

function extractImports(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const specs = new Set();
  let m;
  while ((m = IMPORT_RE.exec(content)) !== null) specs.add(m[1]);
  while ((m = SIDE_EFFECT_IMPORT_RE.exec(content)) !== null) specs.add(m[1]);
  return [...specs];
}

function collectEntryPoints() {
  const entries = new Set([
    path.join(srcDir, 'App.tsx'),
    path.join(srcDir, 'main.tsx'),
    path.join(srcDir, 'index.css'),
    path.join(srcDir, 'contexts/UserContext.tsx'),
    path.join(srcDir, 'contexts/LanguageContext.tsx'),
    path.join(srcDir, 'config/features.ts'),
    path.join(srcDir, 'pages/AgentPage.tsx'),
    path.join(srcDir, 'pages/Contact.tsx'),
    path.join(srcDir, 'pages/FAQ.tsx'),
    path.join(srcDir, 'pages/Privacy.tsx'),
    path.join(srcDir, 'pages/Terms.tsx'),
    path.join(srcDir, 'pages/NotFound.tsx'),
  ]);

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) walk(full);
      else entries.add(full);
    }
  }
  walk(path.join(srcDir, 'features'));
  walk(path.join(srcDir, 'integrations/supabase'));

  return [...entries].filter(f => fs.existsSync(f));
}

function traceDependencies(entryPoints) {
  const visited = new Set();
  const queue = [...entryPoints];

  while (queue.length) {
    const file = queue.shift();
    if (!file || visited.has(file)) continue;
    if (!file.startsWith(srcDir)) continue;
    visited.add(file);

    for (const spec of extractImports(file)) {
      const resolved = resolveImport(file, spec);
      if (resolved && !visited.has(resolved)) queue.push(resolved);
    }
  }
  return visited;
}

function listTopLevel(srcPath) {
  return fs.readdirSync(srcPath).map(n => {
    const full = path.join(srcPath, n);
    return fs.statSync(full).isDirectory() ? n + '/' : n;
  }).sort();
}

function relSrc(filePath) {
  return path.relative(srcDir, filePath).replace(/\\/g, '/');
}

const entries = collectEntryPoints();
const used = traceDependencies(entries);

const usedRel = new Set([...used].map(relSrc));
const allFiles = [];

function walkAll(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkAll(full);
    else allFiles.push(relSrc(full));
  }
}
walkAll(srcDir);

const topLevel = listTopLevel(srcDir);
const usedTopLevel = new Set();
for (const f of usedRel) {
  const parts = f.split('/');
  usedTopLevel.add(parts[0] + (parts.length > 1 && !f.includes('.') ? '/' : ''));
  usedTopLevel.add(parts[0] + (fs.existsSync(path.join(srcDir, parts[0])) && fs.statSync(path.join(srcDir, parts[0])).isDirectory() ? '/' : ''));
}

// Better top-level classification
const keepTop = [];
const deleteTop = [];
for (const item of topLevel) {
  const name = item.replace(/\/$/, '');
  const isDir = item.endsWith('/');
  const prefix = name + '/';
  const hasUsed = [...usedRel].some(f => f === name || f.startsWith(prefix));
  if (hasUsed) keepTop.push(item);
  else deleteTop.push(item);
}

const categories = ['lib', 'hooks', 'contexts', 'types', 'content', 'product', 'core', 'ui', 'styles', 'config', 'integrations'];

const result = {
  entryCount: entries.length,
  usedFileCount: usedRel.size,
  keepTopLevel: keepTop,
  deleteTopLevel: deleteTop,
  pages: { keep: [], delete: [] },
  componentsV1Only: [],
  componentsUi: { keep: [], delete: [] },
  componentsSoul: { keep: [], delete: [] },
  lib: { keep: [], delete: [] },
  hooks: { keep: [], delete: [] },
  contexts: { keep: [], delete: [] },
  types: { keep: [], delete: [] },
  content: { keep: [], delete: [] },
  product: { keep: [], delete: [] },
  core: { keep: [], delete: [] },
  ui: { keep: [], delete: [] },
  styles: { keep: [], delete: [] },
  config: { keep: [], delete: [] },
  integrations: { keep: [], delete: [] },
  usedFiles: [...usedRel].sort(),
};

for (const cat of categories) {
  const dir = path.join(srcDir, cat);
  if (!fs.existsSync(dir)) continue;
  const files = [];
  function walkCat(d, base = cat) {
    for (const n of fs.readdirSync(d)) {
      const full = path.join(d, n);
      const rel = path.relative(srcDir, full).replace(/\\/g, '/');
      if (fs.statSync(full).isDirectory()) walkCat(full, base);
      else files.push(rel);
    }
  }
  walkCat(dir);
  for (const f of files.sort()) {
    if (usedRel.has(f)) result[cat].keep.push(f);
    else result[cat].delete.push(f);
  }
}

// components v1-only (exclude ui/, soul/, FeatureUnavailable)
const compDir = path.join(srcDir, 'components');
function walkCompV1(dir, prefix) {
  for (const n of fs.readdirSync(dir)) {
    const full = path.join(dir, n);
    const rel = prefix + n;
    if (fs.statSync(full).isDirectory()) walkCompV1(full, rel + '/');
    else if (!usedRel.has(rel)) result.componentsV1Only.push(rel);
  }
}
result.componentsV1Only = [];
for (const n of fs.readdirSync(compDir)) {
  if (n === 'ui' || n === 'soul') continue;
  const full = path.join(compDir, n);
  if (fs.statSync(full).isDirectory()) walkCompV1(full, 'components/' + n + '/');
  else {
    const rel = 'components/' + n;
    if (!usedRel.has(rel)) result.componentsV1Only.push(rel);
  }
}
result.componentsV1Only.sort();

// ui/ and soul/ keep vs delete
for (const sub of ['ui', 'soul']) {
  const dir = path.join(compDir, sub);
  if (!fs.existsSync(dir)) continue;
  function walkSub(d, prefix) {
    for (const n of fs.readdirSync(d)) {
      const full = path.join(d, n);
      const rel = prefix + n;
      if (fs.statSync(full).isDirectory()) walkSub(full, rel + '/');
      else {
        if (usedRel.has(rel)) result['components' + sub.charAt(0).toUpperCase() + sub.slice(1)].keep.push(rel);
        else result['components' + sub.charAt(0).toUpperCase() + sub.slice(1)].delete.push(rel);
      }
    }
  }
  walkSub(dir, 'components/' + sub + '/');
  result['components' + sub.charAt(0).toUpperCase() + sub.slice(1)].keep.sort();
  result['components' + sub.charAt(0).toUpperCase() + sub.slice(1)].delete.sort();
}

// pages keep vs delete
const pagesDir = path.join(srcDir, 'pages');
for (const n of fs.readdirSync(pagesDir).sort()) {
  const rel = 'pages/' + n;
  if (usedRel.has(rel)) result.pages.keep.push(rel);
  else result.pages.delete.push(rel);
}

console.log(JSON.stringify(result, null, 2));
