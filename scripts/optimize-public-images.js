const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');

function resolvePublicDir(argv = process.argv.slice(2), env = process.env, baseDir = path.join(__dirname, '..')) {
  let argumentPath = null;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument !== '--public-dir') throw new Error(`Unknown argument: ${argument}`);

    const value = argv[index + 1];
    if (!value || value.startsWith('--')) {
      throw new Error('--public-dir requires a directory path');
    }

    argumentPath = value;
    index += 1;
  }

  const configuredPath = argumentPath || env.BLOG_TEST_PUBLIC_DIR || path.join(baseDir, 'public');

  return path.resolve(baseDir, configuredPath);
}

let publicDir = path.resolve(__dirname, '..', 'public');
const coverWidths = [480, 720, 960, 1280];
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const fileHashMap = new Map();

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else files.push(fullPath);
  }

  return files;
}

function getFileHash(filePath) {
  if (!fileHashMap.has(filePath)) {
    try {
      const buffer = fs.readFileSync(filePath);
      const hash = crypto.createHash('md5').update(buffer).digest('hex').slice(0, 8);
      fileHashMap.set(filePath, hash);
    } catch {
      fileHashMap.set(filePath, '');
    }
  }

  return fileHashMap.get(filePath);
}

function getAttribute(tag, name) {
  const pattern = new RegExp(`\\s${name}=("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const match = tag.match(pattern);

  return match ? match[2] || match[3] || match[4] || '' : null;
}

function setAttribute(tag, name, value) {
  const escapedValue = String(value).replace(/"/g, '&quot;');
  const pattern = new RegExp(`(\\s${name}=)("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');

  if (pattern.test(tag)) {
    return tag.replace(pattern, `$1"${escapedValue}"`);
  }

  return tag.replace(/\s*\/?>$/, ` ${name}="${escapedValue}">`);
}

function hasClass(tag, className) {
  const classes = getAttribute(tag, 'class');

  return Boolean(classes && classes.split(/\s+/).includes(className));
}

function decodeUrlPath(value) {
  try {
    return decodeURIComponent(value.split(/[?#]/)[0]);
  } catch {
    return value.split(/[?#]/)[0];
  }
}

function resolvePublicImagePath(src, htmlPath) {
  if (!src || /^(?:[a-z]+:)?\/\//i.test(src) || /^(?:data|mailto):/i.test(src)) return null;

  const cleanSrc = decodeUrlPath(src);
  if (cleanSrc.startsWith('/')) return path.join(publicDir, cleanSrc.replace(/^\/+/, ''));

  return path.resolve(path.dirname(htmlPath), cleanSrc);
}

function toPublicUrl(filePath) {
  const relative = path.relative(publicDir, filePath).split(path.sep).map(encodeURIComponent).join('/');
  const hash = getFileHash(filePath);

  return hash ? `/${relative}?v=${hash}` : `/${relative}`;
}

function variantPathFor(imagePath, width) {
  const parsed = path.parse(imagePath);

  return path.join(parsed.dir, `${parsed.name}-card-${width}.jpg`);
}

function createVariant(imagePath, width) {
  const outPath = variantPathFor(imagePath, width);
  const result = spawnSync('sips', [
    '-s',
    'format',
    'jpeg',
    '-s',
    'formatOptions',
    '75',
    '-Z',
    String(width),
    imagePath,
    '--out',
    outPath,
  ], { encoding: 'utf8' });

  if (result.status !== 0 || !fs.existsSync(outPath)) {
    const message = (result.stderr || result.stdout || '').trim();
    throw new Error(`Failed to create ${outPath}${message ? `: ${message}` : ''}`);
  }

  return outPath;
}

function optimizeCoverTag(tag, htmlPath, variantsByImage) {
  if (!hasClass(tag, 'post-cover-image')) return tag;

  const src = getAttribute(tag, 'src');
  const imagePath = resolvePublicImagePath(src, htmlPath);
  const sourceWidth = Number(getAttribute(tag, 'width'));

  if (
    !imagePath ||
    !fs.existsSync(imagePath) ||
    !supportedExtensions.has(path.extname(imagePath).toLowerCase()) ||
    !(sourceWidth > 0)
  ) {
    return tag;
  }

  let variants = variantsByImage.get(imagePath);

  if (!variants) {
    variants = coverWidths
      .filter((width) => width < sourceWidth)
      .map((width) => ({ width, path: createVariant(imagePath, width) }));

    variantsByImage.set(imagePath, variants);
  }

  if (!variants.length) {
    return setAttribute(tag, 'src', toPublicUrl(imagePath));
  }

  const srcset = variants
    .map((variant) => `${toPublicUrl(variant.path)} ${variant.width}w`)
    .concat(`${toPublicUrl(imagePath)} ${sourceWidth}w`)
    .join(', ');

  let nextTag = tag;
  nextTag = setAttribute(nextTag, 'src', toPublicUrl(variants[Math.min(1, variants.length - 1)].path));
  nextTag = setAttribute(nextTag, 'srcset', srcset);
  nextTag = setAttribute(nextTag, 'sizes', '(max-width: 820px) calc(100vw - 40px), 711px');

  return nextTag;
}

function optimizeGeneralImageTag(tag, htmlPath) {
  if (hasClass(tag, 'post-cover-image')) return tag;

  const src = getAttribute(tag, 'src');
  if (!src) return tag;

  const imagePath = resolvePublicImagePath(src, htmlPath);
  if (!imagePath || !fs.existsSync(imagePath) || !supportedExtensions.has(path.extname(imagePath).toLowerCase())) {
    return tag;
  }

  return setAttribute(tag, 'src', toPublicUrl(imagePath));
}

function optimizeMetaTags(html, htmlPath) {
  return html.replace(/<meta\b[^>]*>/gi, (tag) => {
    const property = getAttribute(tag, 'property');
    const name = getAttribute(tag, 'name');
    const content = getAttribute(tag, 'content');

    if (!content) return tag;
    if (property !== 'og:image' && name !== 'twitter:image') return tag;

    try {
      const url = new URL(content, 'https://blog.6yuwei.com');
      const imagePath = resolvePublicImagePath(url.pathname, htmlPath);

      if (imagePath && fs.existsSync(imagePath)) {
        const hash = getFileHash(imagePath);
        if (hash) {
          url.searchParams.set('v', hash);
          return setAttribute(tag, 'content', url.toString());
        }
      }
    } catch {}

    return tag;
  });
}

function optimizeHtmlFile(htmlPath, variantsByImage) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  let changed = false;

  const nextHtmlWithCovers = html.replace(/<img\b[^>]*>/gi, (tag) => {
    if (hasClass(tag, 'post-cover-image')) {
      return optimizeCoverTag(tag, htmlPath, variantsByImage);
    }
    return optimizeGeneralImageTag(tag, htmlPath);
  });

  if (nextHtmlWithCovers !== html) {
    html = nextHtmlWithCovers;
    changed = true;
  }

  const nextHtmlWithMeta = optimizeMetaTags(html, htmlPath);
  if (nextHtmlWithMeta !== html) {
    html = nextHtmlWithMeta;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(htmlPath, html);
    return true;
  }

  return false;
}

function main() {
  publicDir = resolvePublicDir();
  fileHashMap.clear();
  const variantsByImage = new Map();
  const htmlFiles = walk(publicDir).filter((file) => file.endsWith('.html'));
  const updatedHtmlCount = htmlFiles.reduce((count, file) => (
    optimizeHtmlFile(file, variantsByImage) ? count + 1 : count
  ), 0);
  const variantCount = Array.from(variantsByImage.values()).reduce((count, variants) => count + variants.length, 0);

  console.log(`Optimized ${updatedHtmlCount} HTML files with ${variantCount} responsive cover variants (and cache-busting ?v=hash parameters).`);
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
  resolvePublicDir,
};
