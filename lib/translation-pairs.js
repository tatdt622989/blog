'use strict';

const fs = require('fs');
const path = require('path');
const frontMatter = require('hexo-front-matter');

const LOCALES = ['zh-TW', 'en'];

function normalizePublicPath(value) {
  const pathValue = String(value || '').trim();
  if (!pathValue) return '';

  const withLeadingSlash = pathValue.startsWith('/') ? pathValue : `/${pathValue}`;

  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

function readFrontMatter(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');

  return frontMatter.parse(source);
}

function localePostDir(root, locale) {
  return locale === 'en'
    ? path.join(root, 'source', 'en', '_posts')
    : path.join(root, 'source', '_posts');
}

function defaultPostPath(filePath, data, locale) {
  const basename = path.basename(filePath, path.extname(filePath));
  const dateMatch = basename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);

  if (!dateMatch) return '';

  const [, year, month, day, filenameSlug] = dateMatch;
  const slug = String(data.slug || filenameSlug);
  const localePrefix = locale === 'en' ? '/en' : '';

  return normalizePublicPath(`${localePrefix}/${year}/${month}/${day}/${slug}`);
}

function postPublicPath(filePath, data, locale) {
  if (!data.permalink) return defaultPostPath(filePath, data, locale);

  const configuredPath = normalizePublicPath(data.permalink);
  if (locale !== 'en' || configuredPath.startsWith('/en/')) return configuredPath;

  return normalizePublicPath(`/en${configuredPath}`);
}

function collectTranslationPairs(root) {
  const posts = [];

  for (const locale of LOCALES) {
    const postsDir = localePostDir(root, locale);
    if (!fs.existsSync(postsDir)) continue;

    for (const entry of fs.readdirSync(postsDir, { withFileTypes: true })) {
      if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== '.md') continue;

      const filePath = path.join(postsDir, entry.name);
      const data = readFrontMatter(filePath);
      if (!data.translation_key) continue;

      posts.push({
        filePath,
        locale,
        publicPath: postPublicPath(filePath, data, locale),
        translationKey: String(data.translation_key),
        translations: data.translations || {},
      });
    }
  }

  return posts;
}

function validateTranslationPairs(root) {
  const posts = collectTranslationPairs(root);
  const errors = [];
  const byKey = new Map();

  for (const post of posts) {
    if (!byKey.has(post.translationKey)) byKey.set(post.translationKey, new Map());

    const byLocale = byKey.get(post.translationKey);
    if (byLocale.has(post.locale)) {
      errors.push(`Duplicate translation_key "${post.translationKey}" for ${post.locale}`);
      continue;
    }

    byLocale.set(post.locale, post);
  }

  const pairs = [];

  for (const [key, byLocale] of byKey) {
    for (const locale of LOCALES) {
      if (!byLocale.has(locale)) {
        errors.push(`Missing ${locale} peer for translation_key "${key}"`);
      }
    }

    if (!LOCALES.every(locale => byLocale.has(locale))) continue;

    const chinesePost = byLocale.get('zh-TW');
    const englishPost = byLocale.get('en');

    if (normalizePublicPath(chinesePost.translations.en) !== englishPost.publicPath) {
      errors.push(`zh-TW alternate path mismatch for translation_key "${key}"`);
    }

    if (normalizePublicPath(englishPost.translations['zh-TW']) !== chinesePost.publicPath) {
      errors.push(`en alternate path mismatch for translation_key "${key}"`);
    }

    pairs.push({
      key,
      'zh-TW': chinesePost,
      en: englishPost,
    });
  }

  return { errors, pairs, posts };
}

module.exports = {
  collectTranslationPairs,
  normalizePublicPath,
  readFrontMatter,
  validateTranslationPairs,
};
