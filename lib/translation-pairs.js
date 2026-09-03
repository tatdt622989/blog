'use strict';

const fs = require('fs');
const path = require('path');
const frontMatter = require('hexo-front-matter');

const LOCALES = ['zh-TW', 'zh-CN', 'en'];

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
  if (locale === 'en') return path.join(root, 'source', 'en', '_posts');
  if (locale === 'zh-CN') return path.join(root, 'source', 'zh-cn', '_posts');
  return path.join(root, 'source', '_posts');
}

function defaultPostPath(filePath, data, locale) {
  const basename = path.basename(filePath, path.extname(filePath));
  const dateMatch = basename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);

  if (!dateMatch) return '';

  const [, year, month, day, filenameSlug] = dateMatch;
  const slug = String(data.slug || filenameSlug);
  const localePrefix = locale === 'en' ? '/en' : (locale === 'zh-CN' ? '/zh-cn' : '');

  return normalizePublicPath(`${localePrefix}/${year}/${month}/${day}/${slug}`);
}

function postPublicPath(filePath, data, locale) {
  if (!data.permalink) return defaultPostPath(filePath, data, locale);

  const configuredPath = normalizePublicPath(data.permalink);
  const prefix = locale === 'en' ? '/en' : (locale === 'zh-CN' ? '/zh-cn' : '');
  if (!prefix || configuredPath.startsWith(`${prefix}/`)) return configuredPath;

  return normalizePublicPath(`${prefix}${configuredPath}`);
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

    const currentPair = { key };
    for (const locale of LOCALES) {
      currentPair[locale] = byLocale.get(locale);
    }

    for (const locale of LOCALES) {
      const post = byLocale.get(locale);
      for (const targetLocale of LOCALES) {
        if (targetLocale === locale) continue;
        const targetPath = normalizePublicPath(post.translations?.[targetLocale]);
        const peerPost = byLocale.get(targetLocale);
        if (targetPath !== peerPost.publicPath) {
          errors.push(`${locale} alternate path mismatch for ${targetLocale} in translation_key "${key}"`);
        }
      }
    }

    pairs.push(currentPair);
  }

  return { errors, pairs, posts };
}

module.exports = {
  collectTranslationPairs,
  normalizePublicPath,
  readFrontMatter,
  validateTranslationPairs,
};
