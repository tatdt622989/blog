'use strict';

const path = require('path');
const { resolveDevMap, splitTitle } = require('../lib/dev-map');

// The first image of a rendered post is tagged post-cover-image (with its real
// size) by scripts/image-layout-metadata.js, so reuse it as the card cover.
function coverFrom(html) {
  const tag = String(html || '').match(/<img\b[^>]*\bpost-cover-image\b[^>]*>/i)?.[0];
  if (!tag) return null;

  const attribute = name => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];

  return {
    src: attribute('src'),
    width: Number(attribute('width')) || 0,
    height: Number(attribute('height')) || 0,
  };
}

hexo.extend.helper.register('dev_map', function devMap(page) {
  const posts = this.site.posts.toArray()
    .filter(post => !post.hidden && !post.hide && post.published !== false)
    .map(post => ({
      key: post.translation_key || '',
      file: path.basename(post.source, path.extname(post.source)),
      title: post.title,
      path: post.path,
      date: post.date,
      cover: coverFrom(post.content),
    }));

  return resolveDevMap(page.dev_map || {}, posts);
});

hexo.extend.helper.register('split_title', splitTitle);
