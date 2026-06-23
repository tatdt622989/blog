const fs = require('fs');
const path = require('path');

const IMAGE_EXTENSIONS = new Set(['.gif', '.jpg', '.jpeg', '.png', '.svg', '.webp']);

function readImageSize(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (!IMAGE_EXTENSIONS.has(ext) || !fs.existsSync(filePath)) return null;

  const buffer = fs.readFileSync(filePath);

  if (ext === '.png') return readPngSize(buffer);
  if (ext === '.jpg' || ext === '.jpeg') return readJpegSize(buffer);
  if (ext === '.webp') return readWebpSize(buffer);
  if (ext === '.gif') return readGifSize(buffer);
  if (ext === '.svg') return readSvgSize(buffer);

  return null;
}

function readPngSize(buffer) {
  if (buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') return null;

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function readJpegSize(buffer) {
  let offset = 2;

  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return null;

    const marker = buffer[offset + 1];
    const size = buffer.readUInt16BE(offset + 2);

    if (
      marker === 0xc0 ||
      marker === 0xc1 ||
      marker === 0xc2 ||
      marker === 0xc3 ||
      marker === 0xc5 ||
      marker === 0xc6 ||
      marker === 0xc7 ||
      marker === 0xc9 ||
      marker === 0xca ||
      marker === 0xcb ||
      marker === 0xcd ||
      marker === 0xce ||
      marker === 0xcf
    ) {
      return {
        width: buffer.readUInt16BE(offset + 7),
        height: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += 2 + size;
  }

  return null;
}

function readWebpSize(buffer) {
  if (
    buffer.length < 30 ||
    buffer.toString('ascii', 0, 4) !== 'RIFF' ||
    buffer.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    return null;
  }

  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString('ascii', offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const payloadOffset = offset + 8;

    if (chunkType === 'VP8X' && payloadOffset + 10 <= buffer.length) {
      return {
        width: 1 + buffer.readUIntLE(payloadOffset + 4, 3),
        height: 1 + buffer.readUIntLE(payloadOffset + 7, 3),
      };
    }

    if (chunkType === 'VP8L' && payloadOffset + 5 <= buffer.length && buffer[payloadOffset] === 0x2f) {
      const bits = buffer.readUInt32LE(payloadOffset + 1);

      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }

    if (chunkType === 'VP8 ' && payloadOffset + 10 <= buffer.length) {
      if (
        buffer[payloadOffset + 3] === 0x9d &&
        buffer[payloadOffset + 4] === 0x01 &&
        buffer[payloadOffset + 5] === 0x2a
      ) {
        return {
          width: buffer.readUInt16LE(payloadOffset + 6) & 0x3fff,
          height: buffer.readUInt16LE(payloadOffset + 8) & 0x3fff,
        };
      }
    }

    offset += 8 + chunkSize + (chunkSize % 2);
  }

  return null;
}

function readGifSize(buffer) {
  if (buffer.length < 10 || buffer.toString('ascii', 0, 3) !== 'GIF') return null;

  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8),
  };
}

function readSvgSize(buffer) {
  const svg = buffer.toString('utf8', 0, Math.min(buffer.length, 2048));
  const width = Number((svg.match(/\bwidth=["']?([\d.]+)/i) || [])[1]);
  const height = Number((svg.match(/\bheight=["']?([\d.]+)/i) || [])[1]);

  if (width > 0 && height > 0) return { width, height };

  const viewBox = (svg.match(/\bviewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)/i) || [])
    .slice(1)
    .map(Number);

  if (viewBox[0] > 0 && viewBox[1] > 0) {
    return { width: viewBox[0], height: viewBox[1] };
  }

  return null;
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

function addClass(tag, className) {
  const currentClass = getAttribute(tag, 'class');

  if (!currentClass) return setAttribute(tag, 'class', className);

  const classes = new Set(currentClass.split(/\s+/).filter(Boolean));
  classes.add(className);

  return setAttribute(tag, 'class', Array.from(classes).join(' '));
}

function decodePathname(src) {
  const cleanSrc = src.split(/[?#]/)[0];

  try {
    return decodeURIComponent(cleanSrc);
  } catch {
    return cleanSrc;
  }
}

function getPostAssetDir(data) {
  if (!data.source) return null;

  const sourcePath = path.isAbsolute(data.source)
    ? data.source
    : data.source.startsWith('source/')
      ? path.join(hexo.base_dir, data.source)
      : path.join(hexo.source_dir, data.source);
  const sourceDir = path.dirname(sourcePath);
  const sourceName = path.basename(sourcePath, path.extname(sourcePath));

  return path.join(sourceDir, sourceName);
}

function resolveImagePath(src, data) {
  if (!src || /^(?:[a-z]+:)?\/\//i.test(src) || /^(?:data|mailto):/i.test(src)) return null;

  const decodedSrc = decodePathname(src);
  const postAssetDir = getPostAssetDir(data);

  if (!postAssetDir) return null;

  if (!decodedSrc.startsWith('/')) {
    return path.resolve(postAssetDir, decodedSrc);
  }

  const root = hexo.config.root || '/';
  let sitePath = decodedSrc;

  if (root !== '/' && sitePath.startsWith(root)) {
    sitePath = `/${sitePath.slice(root.length)}`;
  }

  sitePath = sitePath.replace(/^\/+/, '');

  if (data.path && sitePath.startsWith(data.path)) {
    return path.join(postAssetDir, sitePath.slice(data.path.length));
  }

  if (data.slug) {
    const slugPrefix = `${data.slug}/`;
    const slugIndex = sitePath.indexOf(slugPrefix);

    if (slugIndex !== -1) {
      return path.join(postAssetDir, sitePath.slice(slugIndex + slugPrefix.length));
    }
  }

  return path.join(hexo.source_dir, sitePath);
}

function addImageLayoutMetadata(html, data) {
  if (!html || !html.includes('<img')) return html;

  let imageIndex = 0;

  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const imagePath = resolveImagePath(getAttribute(tag, 'src'), data);
    const size = imagePath ? readImageSize(imagePath) : null;

    if (!size || size.width <= 0 || size.height <= 0) return tag;

    const isFirstImage = imageIndex === 0;
    imageIndex += 1;

    let nextTag = tag;
    nextTag = setAttribute(nextTag, 'width', Math.round(size.width));
    nextTag = setAttribute(nextTag, 'height', Math.round(size.height));
    nextTag = setAttribute(nextTag, 'decoding', 'async');
    nextTag = addClass(nextTag, 'auto-layout-image');

    if (isFirstImage) {
      nextTag = addClass(nextTag, 'post-cover-image');
    } else if (!getAttribute(nextTag, 'loading')) {
      nextTag = setAttribute(nextTag, 'loading', 'lazy');
    }

    return nextTag;
  });
}

hexo.extend.filter.register('after_post_render', function addRenderedImageLayoutMetadata(data) {
  data.content = addImageLayoutMetadata(data.content, data);
  data.excerpt = addImageLayoutMetadata(data.excerpt, data);

  return data;
});
