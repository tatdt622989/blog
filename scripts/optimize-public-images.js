const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const publicDir = path.join(__dirname, '..', 'public');
const coverWidths = [480, 720, 960, 1280];
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else files.push(fullPath);
  }

  return files;
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

  return `/${relative}`;
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

  if (!variants.length) return tag;

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

function optimizeHtmlFile(htmlPath, variantsByImage) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  if (!html.includes('post-cover-image')) return false;

  const nextHtml = html.replace(/<img\b[^>]*>/gi, (tag) => optimizeCoverTag(tag, htmlPath, variantsByImage));

  if (nextHtml === html) return false;

  fs.writeFileSync(htmlPath, nextHtml);
  return true;
}

function main() {
  const variantsByImage = new Map();
  const htmlFiles = walk(publicDir).filter((file) => file.endsWith('.html'));
  const updatedHtmlCount = htmlFiles.reduce((count, file) => (
    optimizeHtmlFile(file, variantsByImage) ? count + 1 : count
  ), 0);
  const variantCount = Array.from(variantsByImage.values()).reduce((count, variants) => count + variants.length, 0);

  console.log(`Optimized ${updatedHtmlCount} HTML files with ${variantCount} responsive cover variants.`);
}

if (require.main === module) {
  main();
}
