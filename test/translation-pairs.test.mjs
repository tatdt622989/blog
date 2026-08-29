import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { readFrontMatter, validateTranslationPairs } = require('../lib/translation-pairs.js');
const projectRoot = process.cwd();

function withFixture(files, assertion) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-translation-pairs-'));

  try {
    for (const [relativePath, content] of Object.entries(files)) {
      const filePath = path.join(root, relativePath);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content);
    }

    assertion(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

const chinesePost = `---
title: TypeScript 入門
date: 2023-03-05 23:45:21
translation_key: typescript-introduction
translations:
  en: /en/2023/03/05/wrong-english-path/
---

中文內容
`;

const englishPost = `---
title: What Is TypeScript?
date: 2023-03-05 23:45:21
permalink: 2023/03/05/what-is-typescript/
translation_key: typescript-introduction
translations:
  zh-TW: /2023/03/05/wrong-chinese-path/
---

English content
`;

test('the repository contains the selected high-traffic reciprocal translation pairs', () => {
  const result = validateTranslationPairs(projectRoot);
  const pairPaths = Object.fromEntries(result.pairs.map(pair => [pair.key, {
    'zh-TW': pair['zh-TW'].publicPath,
    en: pair.en.publicPath,
  }]));

  assert.deepEqual(result.errors, []);

  const selectedPairs = {
    'ai-coding-tools-comparison': {
      'zh-TW': '/2026/05/06/AI-coding-工具比較：Claude-Code、Codex、Cursor-怎麼選？/',
      en: '/en/2026/05/06/claude-code-vs-codex-vs-cursor/',
    },
    'aseprite-install-guide': {
      'zh-TW': '/2026/06/15/aseprite-install-guide/',
      en: '/en/2026/06/15/how-to-install-aseprite/',
    },
    'claude-code-cross-session-messaging': {
      'zh-TW': '/2026/08/09/Claude-Code-跨工作階段訊息：讓不同-Session-互相傳話的完整用法/',
      en: '/en/2026/08/09/claude-code-cross-session-messaging/',
    },
    'claude-codex-usage-limits': {
      'zh-TW': '/2026/06/18/claude-codex-quota-guide/',
      en: '/en/2026/06/18/claude-codex-usage-limits-guide/',
    },
    'typescript-introduction': {
      'zh-TW': '/2023/03/05/TypeScript入門：什麼是TypeScript？/',
      en: '/en/2023/03/05/what-is-typescript/',
    },
  };

  for (const [key, expectedPaths] of Object.entries(selectedPairs)) {
    assert.deepEqual(pairPaths[key], expectedPaths, `${key} reciprocal paths`);
  }
});

test('all English posts satisfy the multilingual content and SEO contract', () => {
  const postsDir = path.join(projectRoot, 'source', 'en', '_posts');
  const postFiles = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .sort();

  assert.ok(postFiles.length > 0, 'at least one English post');

  for (const file of postFiles) {
    const filePath = path.join(postsDir, file);
    const data = readFrontMatter(filePath);
    const body = String(data._content || '');
    const descriptionLength = [...String(data.description || '')].length;
    const moreTags = body.match(/<!--more-->/g) || [];
    const firstHeadingIndex = body.search(/^## /m);
    const moreIndex = body.indexOf('<!--more-->');
    const images = [...body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)];

    assert.ok(descriptionLength >= 80 && descriptionLength <= 150, `${file} description length`);
    assert.ok(data.date, `${file} date`);
    assert.ok(data.updated, `${file} updated`);
    assert.ok(data.translation_key, `${file} translation_key`);
    assert.ok(Array.isArray(data.tags) && data.tags.length > 0, `${file} tags`);
    assert.ok(Array.isArray(data.categories) && data.categories.length > 0, `${file} categories`);
    assert.equal(moreTags.length, 1, `${file} exact more tag`);
    assert.ok(moreIndex > 0 && moreIndex < firstHeadingIndex, `${file} more tag position`);
    assert.ok(images.length > 0, `${file} images`);
    assert.doesNotMatch(`${data.title}\n${body}`, /\p{Extended_Pictographic}/u, `${file} emoji`);

    for (const image of images) {
      const [, alt, source] = image;
      const assetPath = path.join(postsDir, path.basename(file, '.md'), source);

      assert.ok(alt.trim(), `${file} image alt`);
      assert.ok(fs.existsSync(assetPath), `${file} missing image ${source}`);
      if (image === images[0]) {
        assert.ok(fs.statSync(assetPath).size <= 300 * 1024, `${file} cover exceeds 300 KB`);
      }
    }
  }
});

test('duplicate translation keys within one locale are rejected', () => {
  withFixture(
    {
      'source/_posts/2023-03-05-TypeScript-intro.md': chinesePost,
      'source/_posts/2023-03-06-Another-post.md': chinesePost,
      'source/en/_posts/2023-03-05-what-is-typescript.md': englishPost,
    },
    root => {
      const result = validateTranslationPairs(root);

      assert.ok(result.errors.some(error => error.includes('Duplicate translation_key "typescript-introduction" for zh-TW')));
    },
  );
});

test('a translation key with no peer is rejected', () => {
  withFixture(
    {
      'source/_posts/2023-03-05-TypeScript-intro.md': chinesePost,
    },
    root => {
      const result = validateTranslationPairs(root);

      assert.ok(result.errors.some(error => error.includes('Missing en peer for translation_key "typescript-introduction"')));
    },
  );
});

test('declared alternate paths must match the peer public path in both directions', () => {
  withFixture(
    {
      'source/_posts/2023-03-05-TypeScript-intro.md': chinesePost,
      'source/en/_posts/2023-03-05-what-is-typescript.md': englishPost,
    },
    root => {
      const result = validateTranslationPairs(root);

      assert.ok(result.errors.some(error => error.includes('zh-TW alternate path mismatch')));
      assert.ok(result.errors.some(error => error.includes('en alternate path mismatch')));
    },
  );
});
