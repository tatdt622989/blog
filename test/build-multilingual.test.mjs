import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  createSitemapIndexXml,
  normalizeSitemapHomeXml,
  writeSitemapIndex,
} = require('../lib/sitemap-index.js');

const sitemapPaths = ['/sitemap-zh-TW.xml', '/zh-cn/sitemap.xml', '/en/sitemap.xml'];

function listFilesRecursively(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);

    return entry.isDirectory() ? listFilesRecursively(entryPath) : [entryPath];
  });
}

function outputTargetExists(outputDir, rawUrl) {
  const pathname = decodeURIComponent(rawUrl.split(/[?#]/, 1)[0]);
  const target = path.join(outputDir, pathname.replace(/^\/+/, ''));

  return fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html'));
}

test('sitemap index lists all localized sitemap URLs', () => {
  const xml = createSitemapIndexXml('https://blog.6yuwei.com', sitemapPaths);

  assert.equal(
    xml,
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://blog.6yuwei.com/sitemap-zh-TW.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://blog.6yuwei.com/zh-cn/sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://blog.6yuwei.com/en/sitemap.xml</loc>
  </sitemap>
</sitemapindex>
`,
  );
});

test('localized sitemap home URL uses the same trailing-slash canonical as HTML', () => {
  const xml = `<urlset>
  <url><loc>https://blog.6yuwei.com/en</loc></url>
  <url><loc>https://blog.6yuwei.com/en/tags/TypeScript/</loc></url>
</urlset>`;

  assert.equal(
    normalizeSitemapHomeXml(xml, 'https://blog.6yuwei.com/en/'),
    `<urlset>
  <url><loc>https://blog.6yuwei.com/en/</loc></url>
  <url><loc>https://blog.6yuwei.com/en/tags/TypeScript/</loc></url>
</urlset>`,
  );
});

test('sitemap index refuses to hide a missing localized sitemap', () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-sitemap-index-'));

  try {
    assert.throws(
      () => writeSitemapIndex(outputDir, 'https://blog.6yuwei.com', sitemapPaths),
      /Missing localized sitemap: .*sitemap-zh-TW\.xml/,
    );
  } finally {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});

test('sitemap index is atomically written after all child maps exist', () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-sitemap-index-'));

  try {
    fs.mkdirSync(path.join(outputDir, 'zh-cn'), { recursive: true });
    fs.mkdirSync(path.join(outputDir, 'en'), { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'sitemap-zh-TW.xml'), '<urlset></urlset>');
    fs.writeFileSync(path.join(outputDir, 'zh-cn', 'sitemap.xml'), '<urlset></urlset>');
    fs.writeFileSync(path.join(outputDir, 'en', 'sitemap.xml'), '<urlset></urlset>');

    const outputPath = writeSitemapIndex(
      outputDir,
      'https://blog.6yuwei.com',
      sitemapPaths,
    );

    assert.equal(outputPath, path.join(outputDir, 'sitemap.xml'));
    assert.match(fs.readFileSync(outputPath, 'utf8'), /<sitemapindex/);
    assert.equal(fs.existsSync(`${outputPath}.tmp`), false);
  } finally {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});

test('multilingual build writes all locale trees to an isolated output directory', () => {
  const buildRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-multilingual-build-'));
  const outputDir = path.join(buildRoot, 'public');

  try {
    const result = spawnSync(
      process.execPath,
      ['scripts/build-multilingual.js', '--output', outputDir, '--silent'],
      {
        cwd: process.cwd(),
        encoding: 'utf8',
        timeout: 180_000,
      },
    );

    assert.equal(
      result.status,
      0,
      `build failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
    assert.ok(fs.existsSync(path.join(outputDir, 'index.html')));
    assert.ok(fs.existsSync(path.join(outputDir, 'sitemap-zh-TW.xml')));
    assert.ok(fs.existsSync(path.join(outputDir, 'zh-cn', 'index.html')));
    assert.ok(fs.existsSync(path.join(outputDir, 'zh-cn', 'sitemap.xml')));
    assert.ok(fs.existsSync(path.join(outputDir, 'en', 'index.html')));
    assert.ok(fs.existsSync(path.join(outputDir, 'en', 'sitemap.xml')));
    assert.ok(fs.existsSync(path.join(outputDir, 'content.json')));
    assert.ok(fs.existsSync(path.join(outputDir, 'zh-cn', 'content.json')));
    assert.ok(fs.existsSync(path.join(outputDir, 'en', 'content.json')));
    const chineseStyles = fs.readFileSync(path.join(outputDir, 'css', 'style.css'), 'utf8');
    const simplifiedChineseStyles = fs.readFileSync(path.join(outputDir, 'zh-cn', 'css', 'style.css'), 'utf8');
    const englishStyles = fs.readFileSync(path.join(outputDir, 'en', 'css', 'style.css'), 'utf8');
    const sitemapIndex = fs.readFileSync(path.join(outputDir, 'sitemap.xml'), 'utf8');
    const chineseSitemap = fs.readFileSync(path.join(outputDir, 'sitemap-zh-TW.xml'), 'utf8');
    const simplifiedChineseSitemap = fs.readFileSync(path.join(outputDir, 'zh-cn', 'sitemap.xml'), 'utf8');
    const englishSitemap = fs.readFileSync(path.join(outputDir, 'en', 'sitemap.xml'), 'utf8');
    const chineseContent = JSON.parse(
      fs.readFileSync(path.join(outputDir, 'content.json'), 'utf8'),
    );
    const simplifiedChineseContent = JSON.parse(
      fs.readFileSync(path.join(outputDir, 'zh-cn', 'content.json'), 'utf8'),
    );
    const englishContent = JSON.parse(
      fs.readFileSync(path.join(outputDir, 'en', 'content.json'), 'utf8'),
    );
    const chineseHome = fs.readFileSync(path.join(outputDir, 'index.html'), 'utf8');
    const simplifiedChineseHome = fs.readFileSync(path.join(outputDir, 'zh-cn', 'index.html'), 'utf8');
    const englishHome = fs.readFileSync(path.join(outputDir, 'en', 'index.html'), 'utf8');
    const chinesePair = fs.readFileSync(
      path.join(outputDir, '2023', '03', '05', 'TypeScript入門：什麼是TypeScript？', 'index.html'),
      'utf8',
    );
    const simplifiedChinesePair = fs.readFileSync(
      path.join(outputDir, 'zh-cn', '2023', '03', '05', 'what-is-typescript', 'index.html'),
      'utf8',
    );
    const englishPair = fs.readFileSync(
      path.join(outputDir, 'en', '2023', '03', '05', 'what-is-typescript', 'index.html'),
      'utf8',
    );
    const unpairedChinesePost = fs.readFileSync(
      path.join(outputDir, '2026', '06', '08', 'claude-design-cowork-code-comparison', 'index.html'),
      'utf8',
    );

    assert.ok(chineseStyles.length > 0);
    assert.ok(simplifiedChineseStyles.length > 0);
    assert.ok(englishStyles.length > 0);
    assert.match(chineseStyles, /\.language-switcher__menu/);
    assert.match(simplifiedChineseStyles, /\.language-switcher__menu/);
    assert.match(englishStyles, /\.language-switcher__menu/);

    assert.match(sitemapIndex, /<sitemapindex/);
    assert.match(sitemapIndex, /https:\/\/blog\.6yuwei\.com\/sitemap-zh-TW\.xml/);
    assert.match(sitemapIndex, /https:\/\/blog\.6yuwei\.com\/zh-cn\/sitemap\.xml/);
    assert.match(sitemapIndex, /https:\/\/blog\.6yuwei\.com\/en\/sitemap\.xml/);
    assert.doesNotMatch(chineseSitemap, /<loc>https:\/\/blog\.6yuwei\.com\/(?:zh-cn|en)\//);
    assert.match(simplifiedChineseSitemap, /<loc>https:\/\/blog\.6yuwei\.com\/zh-cn\//);
    assert.match(simplifiedChineseSitemap, /<loc>https:\/\/blog\.6yuwei\.com\/zh-cn\/<\/loc>/);
    assert.match(englishSitemap, /<loc>https:\/\/blog\.6yuwei\.com\/en\//);
    assert.match(englishSitemap, /<loc>https:\/\/blog\.6yuwei\.com\/en\/<\/loc>/);

    assert.equal(chineseContent.meta.url, 'https://blog.6yuwei.com');
    assert.equal(simplifiedChineseContent.meta.url, 'https://blog.6yuwei.com/zh-cn');
    assert.equal(englishContent.meta.url, 'https://blog.6yuwei.com/en');
    assert.ok(chineseContent.posts.length > 0);
    assert.ok(simplifiedChineseContent.posts.length > 0);
    assert.ok(englishContent.posts.length > 0);

    for (const post of chineseContent.posts) {
      assert.match(post.permalink, /^https:\/\/blog\.6yuwei\.com\/(?!en\/|zh-cn\/)/);
    }

    for (const post of simplifiedChineseContent.posts) {
      assert.match(post.permalink, /^https:\/\/blog\.6yuwei\.com\/zh-cn\//);
    }

    for (const post of englishContent.posts) {
      assert.match(post.permalink, /^https:\/\/blog\.6yuwei\.com\/en\//);
    }

    assert.match(chineseHome, /<html lang="zh-TW">/);
    assert.match(chineseHome, /<link rel="canonical" href="https:\/\/blog\.6yuwei\.com\/">/);
    assert.match(chineseHome, /hreflang="zh-TW" href="https:\/\/blog\.6yuwei\.com\/"/);
    assert.match(chineseHome, /hreflang="zh-CN" href="https:\/\/blog\.6yuwei\.com\/zh-cn\/"/);
    assert.match(chineseHome, /hreflang="en" href="https:\/\/blog\.6yuwei\.com\/en\/"/);
    assert.match(chineseHome, /hreflang="x-default" href="https:\/\/blog\.6yuwei\.com\/"/);
    assert.match(chineseHome, /property="og:locale" content="zh_TW"/);
    assert.match(chineseHome, /"inLanguage":"zh-TW"/);
    assert.match(chineseHome, /class="language-switcher"/);
    assert.match(chineseHome, /<details class="language-switcher__menu">/);
    assert.match(chineseHome, /<summary[^>]+aria-label="切換語言"/);
    assert.match(chineseHome, /<span class="language-switcher__current">中文<\/span>/);
    assert.match(chineseHome, />首頁<\/a>/);
    assert.match(chineseHome, />彙整<\/a>/);

    assert.match(simplifiedChineseHome, /<html lang="zh-CN">/);
    assert.match(simplifiedChineseHome, /<link rel="canonical" href="https:\/\/blog\.6yuwei\.com\/zh-cn\/">/);
    assert.match(simplifiedChineseHome, /hreflang="zh-TW" href="https:\/\/blog\.6yuwei\.com\/"/);
    assert.match(simplifiedChineseHome, /hreflang="zh-CN" href="https:\/\/blog\.6yuwei\.com\/zh-cn\/"/);
    assert.match(simplifiedChineseHome, /hreflang="en" href="https:\/\/blog\.6yuwei\.com\/en\/"/);
    assert.match(simplifiedChineseHome, /property="og:locale" content="zh_CN"/);
    assert.match(simplifiedChineseHome, /"inLanguage":"zh-CN"/);
    assert.match(simplifiedChineseHome, /class="language-switcher"/);
    assert.match(simplifiedChineseHome, /<span class="language-switcher__current">简体中文<\/span>/);
    assert.match(simplifiedChineseHome, />首页<\/a>/);
    assert.match(simplifiedChineseHome, />归档<\/a>/);

    assert.match(englishHome, /<html lang="en">/);
    assert.match(englishHome, /<link rel="canonical" href="https:\/\/blog\.6yuwei\.com\/en\/">/);
    assert.match(englishHome, /hreflang="zh-TW" href="https:\/\/blog\.6yuwei\.com\/"/);
    assert.match(englishHome, /hreflang="zh-CN" href="https:\/\/blog\.6yuwei\.com\/zh-cn\/"/);
    assert.match(englishHome, /hreflang="en" href="https:\/\/blog\.6yuwei\.com\/en\/"/);
    assert.match(englishHome, /property="og:locale" content="en_US"/);
    assert.match(englishHome, /"inLanguage":"en"/);
    assert.match(englishHome, /class="language-switcher"/);
    assert.match(englishHome, /<details class="language-switcher__menu">/);
    assert.match(englishHome, /<summary[^>]+aria-label="Switch language"/);
    assert.match(englishHome, /<span class="language-switcher__current">English<\/span>/);
    assert.match(englishHome, />Home<\/a>/);
    assert.match(englishHome, />Archives<\/a>/);
    assert.match(
      englishHome,
      /href="https:\/\/blog\.6yuwei\.com\/favicon-32x32\.png\?v=20260817"/,
    );
    assert.doesNotMatch(englishHome, /href="\/en\/favicon-/);
    assert.ok(fs.existsSync(path.join(outputDir, 'favicon-32x32.png')));

    assert.match(
      chinesePair,
      /hreflang="zh-CN" href="https:\/\/blog\.6yuwei\.com\/zh-cn\/2023\/03\/05\/what-is-typescript\/"/,
    );
    assert.match(
      chinesePair,
      /hreflang="en" href="https:\/\/blog\.6yuwei\.com\/en\/2023\/03\/05\/what-is-typescript\/"/,
    );
    assert.match(
      simplifiedChinesePair,
      /<link rel="canonical" href="https:\/\/blog\.6yuwei\.com\/zh-cn\/2023\/03\/05\/what-is-typescript\/">/,
    );
    assert.match(
      simplifiedChinesePair,
      /hreflang="zh-TW" href="https:\/\/blog\.6yuwei\.com\/2023\/03\/05\/TypeScript%E5%85%A5%E9%96%80%EF%BC%9A%E4%BB%80%E9%BA%BC%E6%98%AFTypeScript%EF%BC%9F\/"/,
    );
    assert.match(
      simplifiedChinesePair,
      /hreflang="en" href="https:\/\/blog\.6yuwei\.com\/en\/2023\/03\/05\/what-is-typescript\/"/,
    );
    assert.match(simplifiedChinesePair, /"inLanguage":"zh-CN"/);
    assert.match(
      englishPair,
      /<link rel="canonical" href="https:\/\/blog\.6yuwei\.com\/en\/2023\/03\/05\/what-is-typescript\/">/,
    );
    assert.match(
      englishPair,
      /hreflang="zh-TW" href="https:\/\/blog\.6yuwei\.com\/2023\/03\/05\/TypeScript%E5%85%A5%E9%96%80%EF%BC%9A%E4%BB%80%E9%BA%BC%E6%98%AFTypeScript%EF%BC%9F\/"/,
    );
    assert.match(
      englishPair,
      /hreflang="zh-CN" href="https:\/\/blog\.6yuwei\.com\/zh-cn\/2023\/03\/05\/what-is-typescript\/"/,
    );
    assert.match(englishPair, /"inLanguage":"en"/);
    assert.doesNotMatch(
      unpairedChinesePost,
      /<link rel="alternate" hreflang="en"/,
    );

    const highTrafficPairs = [
      {
        chinesePath: '/2026/05/06/AI-coding-工具比較：Claude-Code、Codex、Cursor-怎麼選？/',
        simplifiedChinesePath: '/zh-cn/2026/05/06/claude-code-vs-codex-vs-cursor/',
        englishPath: '/en/2026/05/06/claude-code-vs-codex-vs-cursor/',
      },
      {
        chinesePath: '/2026/06/15/aseprite-install-guide/',
        simplifiedChinesePath: '/zh-cn/2026/06/15/how-to-install-aseprite/',
        englishPath: '/en/2026/06/15/how-to-install-aseprite/',
      },
      {
        chinesePath: '/2026/06/18/claude-codex-quota-guide/',
        simplifiedChinesePath: '/zh-cn/2026/06/18/claude-codex-usage-limits-guide/',
        englishPath: '/en/2026/06/18/claude-codex-usage-limits-guide/',
      },
      {
        chinesePath: '/2026/08/09/Claude-Code-跨工作階段訊息：讓不同-Session-互相傳話的完整用法/',
        simplifiedChinesePath: '/zh-cn/2026/08/09/claude-code-cross-session-messaging/',
        englishPath: '/en/2026/08/09/claude-code-cross-session-messaging/',
      },
    ];

    for (const pair of highTrafficPairs) {
      const chineseUrl = new URL(pair.chinesePath, 'https://blog.6yuwei.com').href;
      const simplifiedChineseUrl = new URL(pair.simplifiedChinesePath, 'https://blog.6yuwei.com').href;
      const englishUrl = new URL(pair.englishPath, 'https://blog.6yuwei.com').href;
      const chineseFile = path.join(outputDir, decodeURIComponent(pair.chinesePath), 'index.html');
      const simplifiedChineseFile = path.join(outputDir, pair.simplifiedChinesePath, 'index.html');
      const englishFile = path.join(outputDir, pair.englishPath, 'index.html');
      const chineseHtml = fs.readFileSync(chineseFile, 'utf8');
      const simplifiedChineseHtml = fs.readFileSync(simplifiedChineseFile, 'utf8');
      const englishHtml = fs.readFileSync(englishFile, 'utf8');

      assert.ok(chineseHtml.includes(`hreflang="zh-CN" href="${simplifiedChineseUrl}"`));
      assert.ok(chineseHtml.includes(`hreflang="en" href="${englishUrl}"`));

      assert.ok(simplifiedChineseHtml.includes(`<link rel="canonical" href="${simplifiedChineseUrl}">`));
      assert.ok(simplifiedChineseHtml.includes(`hreflang="zh-TW" href="${chineseUrl}"`));
      assert.ok(simplifiedChineseHtml.includes(`hreflang="en" href="${englishUrl}"`));
      assert.ok(simplifiedChineseSitemap.includes(`<loc>${simplifiedChineseUrl}</loc>`));

      assert.ok(englishHtml.includes(`<link rel="canonical" href="${englishUrl}">`));
      assert.ok(englishHtml.includes(`hreflang="zh-TW" href="${chineseUrl}"`));
      assert.ok(englishHtml.includes(`hreflang="zh-CN" href="${simplifiedChineseUrl}"`));
      assert.ok(englishSitemap.includes(`<loc>${englishUrl}</loc>`));
    }

    const generatedHtmlFiles = listFilesRecursively(outputDir)
      .filter(filePath => filePath.endsWith('.html'));
    const englishHtmlFiles = generatedHtmlFiles
      .filter(filePath => path.relative(outputDir, filePath).startsWith(`en${path.sep}`));
    const simplifiedChineseHtmlFiles = generatedHtmlFiles
      .filter(filePath => path.relative(outputDir, filePath).startsWith(`zh-cn${path.sep}`));
    const chineseHtmlFiles = generatedHtmlFiles
      .filter(filePath => !englishHtmlFiles.includes(filePath) && !simplifiedChineseHtmlFiles.includes(filePath));

    assert.ok(chineseHtmlFiles.length > 1);
    assert.ok(simplifiedChineseHtmlFiles.length > 1);
    assert.ok(englishHtmlFiles.length > 1);

    for (const filePath of chineseHtmlFiles) {
      const html = fs.readFileSync(filePath, 'utf8');
      const canonicals = html.match(/<link rel="canonical" href="[^"]+">/g) || [];

      assert.equal(canonicals.length, 1, `expected one canonical in ${filePath}`);
      assert.match(html, /<html lang="zh-TW">/);
      assert.doesNotMatch(canonicals[0], /https:\/\/blog\.6yuwei\.com\/(?:en|zh-cn)\//);
    }

    for (const filePath of simplifiedChineseHtmlFiles) {
      const html = fs.readFileSync(filePath, 'utf8');
      const canonicals = html.match(/<link rel="canonical" href="[^"]+">/g) || [];
      const localReferences = [...html.matchAll(/(?:href|src)="(\/[^"\s]+)"/g)]
        .map(match => match[1])
        .filter(reference => !reference.startsWith('//'));

      assert.equal(canonicals.length, 1, `expected one canonical in ${filePath}`);
      assert.match(html, /<html lang="zh-CN">/);
      assert.match(canonicals[0], /https:\/\/blog\.6yuwei\.com\/zh-cn\//);

      for (const reference of localReferences) {
        assert.equal(
          outputTargetExists(outputDir, reference),
          true,
          `missing local target ${reference} referenced by ${filePath}`,
        );
      }
    }

    for (const filePath of englishHtmlFiles) {
      const html = fs.readFileSync(filePath, 'utf8');
      const canonicals = html.match(/<link rel="canonical" href="[^"]+">/g) || [];
      const localReferences = [...html.matchAll(/(?:href|src)="(\/[^"\s]+)"/g)]
        .map(match => match[1])
        .filter(reference => !reference.startsWith('//'));

      assert.equal(canonicals.length, 1, `expected one canonical in ${filePath}`);
      assert.match(html, /<html lang="en">/);
      assert.match(canonicals[0], /https:\/\/blog\.6yuwei\.com\/en\//);

      for (const reference of localReferences) {
        assert.equal(
          outputTargetExists(outputDir, reference),
          true,
          `missing local target ${reference} referenced by ${filePath}`,
        );
      }
    }
  } finally {
    fs.rmSync(buildRoot, { recursive: true, force: true });
  }
});

test('mobile header keeps navigation compact and the language menu unclipped', () => {
  const buildRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-mobile-header-'));
  const outputDir = path.join(buildRoot, 'public');

  try {
    const result = spawnSync(
      process.execPath,
      ['scripts/build-multilingual.js', '--output', outputDir, '--silent'],
      {
        cwd: process.cwd(),
        encoding: 'utf8',
        timeout: 180_000,
      },
    );

    assert.equal(
      result.status,
      0,
      `build failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );

    const englishHome = fs.readFileSync(path.join(outputDir, 'en', 'index.html'), 'utf8');
    const englishStyles = fs.readFileSync(path.join(outputDir, 'en', 'css', 'style.css'), 'utf8');
    const switcherIndex = englishHome.indexOf('<div class="language-switcher">');
    const navigationIndex = englishHome.indexOf('<nav id="main-nav"');

    assert.ok(switcherIndex >= 0, 'expected a standalone language switcher');
    assert.ok(
      switcherIndex < navigationIndex,
      'language switcher should be a header sibling before navigation',
    );
    assert.match(
      englishStyles,
      /@media \(max-width: 480px\) \{\s*#header \{[\s\S]*?display: grid;/,
      'mobile header should compile to a compact grid',
    );
    assert.match(
      englishStyles,
      /@media \(max-width: 480px\) \{\s*#header h2 \{\s*display: none;/,
      'mobile header should hide the long subtitle',
    );
    assert.match(
      englishStyles,
      /#header \.logo a img \{\s*width: 100%;\s*height: auto;\s*\}/,
      'the responsive logo should not retain its fixed HTML height',
    );
    assert.match(
      englishStyles,
      /#header \.language-switcher \.language-switcher__code \{[\s\S]*?flex-shrink: 0;/,
      'language code badges should not shrink behind the clipped panel edge',
    );
    assert.match(
      englishStyles,
      /@media \(max-width: 480px\) \{[\s\S]*?#header \.language-switcher \.language-switcher__panel \{[\s\S]*?top: calc\(100% \+ 48px\);/,
      'the mobile language panel should open below the navigation row',
    );
  } finally {
    fs.rmSync(buildRoot, { recursive: true, force: true });
  }
});
