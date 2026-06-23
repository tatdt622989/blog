'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const STYLE_EXTENSIONS = new Set(['.css', '.styl']);

let cachedStyleVersion = null;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (STYLE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function getStyleSourceDir() {
  const themeDir = hexo.theme_dir || path.join(hexo.base_dir, 'themes', hexo.config.theme || 'light');

  return path.join(themeDir, 'source', 'css');
}

function getStyleVersion() {
  if (cachedStyleVersion) return cachedStyleVersion;

  const sourceDir = getStyleSourceDir();
  const files = walk(sourceDir).sort();
  const hash = crypto.createHash('sha1');

  for (const file of files) {
    hash.update(path.relative(sourceDir, file));
    hash.update('\0');
    hash.update(fs.readFileSync(file));
    hash.update('\0');
  }

  cachedStyleVersion = hash.digest('hex').slice(0, 10);

  return cachedStyleVersion;
}

hexo.extend.helper.register('versioned_css', function versionedCss(assetPath) {
  return `<link rel="stylesheet" href="${this.url_for(assetPath)}?v=${getStyleVersion()}">`;
});
