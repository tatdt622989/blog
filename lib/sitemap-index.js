'use strict';

const fs = require('fs');
const path = require('path');

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function sitemapUrl(siteUrl, sitemapPath) {
  const origin = String(siteUrl || '').replace(/\/+$/, '');
  const pathname = String(sitemapPath || '').startsWith('/')
    ? sitemapPath
    : `/${sitemapPath}`;

  return `${origin}${pathname}`;
}

function createSitemapIndexXml(siteUrl, sitemapPaths) {
  const entries = sitemapPaths.map(sitemapPath => [
    '  <sitemap>',
    `    <loc>${escapeXml(sitemapUrl(siteUrl, sitemapPath))}</loc>`,
    '  </sitemap>',
  ].join('\n'));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</sitemapindex>',
    '',
  ].join('\n');
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeSitemapHomeXml(xml, canonicalHomeUrl) {
  const canonical = String(canonicalHomeUrl).replace(/\/*$/, '/');
  const withoutTrailingSlash = canonical.replace(/\/$/, '');
  const homeLoc = new RegExp(`<loc>${escapeRegExp(withoutTrailingSlash)}</loc>`, 'g');

  return String(xml).replace(homeLoc, `<loc>${canonical}</loc>`);
}

function normalizeSitemapCanonicalUrls(xml) {
  return String(xml)
    .replace(/(<loc>[^<]+)\/index\.html(<\/loc>)/g, '$1/$2')
    .replace(/[ \t]+$/gm, '');
}

function outputFilePath(outputDir, sitemapPath) {
  return path.join(outputDir, String(sitemapPath).replace(/^\/+/, ''));
}

function writeSitemapIndex(outputDir, siteUrl, sitemapPaths) {
  for (const sitemapPath of sitemapPaths) {
    const childPath = outputFilePath(outputDir, sitemapPath);
    if (!fs.existsSync(childPath)) {
      throw new Error(`Missing localized sitemap: ${childPath}`);
    }
  }

  const outputPath = path.join(outputDir, 'sitemap.xml');
  const temporaryPath = `${outputPath}.tmp`;
  const xml = createSitemapIndexXml(siteUrl, sitemapPaths);

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(temporaryPath, xml);
  fs.renameSync(temporaryPath, outputPath);

  return outputPath;
}

module.exports = {
  createSitemapIndexXml,
  normalizeSitemapCanonicalUrls,
  normalizeSitemapHomeXml,
  writeSitemapIndex,
};
