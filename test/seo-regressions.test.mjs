import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('robots.txt allows crawler access to render-critical assets', () => {
  const robots = read('source/robots.txt');

  assert.doesNotMatch(robots, /^Disallow: \/js\/$/m);
  assert.doesNotMatch(robots, /^Disallow: \/css\/$/m);
  assert.doesNotMatch(robots, /^Disallow: \/fonts\/$/m);
});

test('site config provides non-empty SEO defaults', () => {
  const config = read('_config.yml');

  assert.doesNotMatch(config, /^description:\s*''\s*$/m);
  assert.match(config, /^timezone:\s*Asia\/Taipei\s*$/m);
});

test('head partial emits canonical and social metadata', () => {
  const head = read('themes/light/layout/_partial/head.ejs');

  assert.match(head, /rel="canonical"/);
  assert.match(head, /og:description/);
  assert.match(head, /twitter:card/);
});

test('legacy published URLs have PHP redirect stubs in source', () => {
  const redirects = [
    [
      'source/2026/06/18/2026-AI程式助理額度最佳使用指南：CodexBar-餘額管理與手動重設策略/index.php',
      '/2026/06/18/claude-codex-quota-guide/',
    ],
    [
      'source/2026/06/16/善用頂級LLM：2026年日語學習的高效進階策略-以Claude-Opus-4-8為例/index.php',
      '/2026/06/16/善用頂級LLM：2026年日語學習的高效進階策略/',
    ],
    [
      'source/2026/06/15/ai-agents-game-development-2026-innovation/index.php',
      '/categories/%E9%81%8A%E6%88%B2%E9%96%8B%E7%99%BC/',
    ],
    [
      'source/2026/06/15/2026-智慧浪潮：多模態-AI-與-AI-Agent-如何重塑我們的數位生活與工作？/index.php',
      '/categories/AI/',
    ],
    [
      'source/2026/06/16/GPT-5-5-掀起工作流革命：AI-如何從「對話」走向「執行」？/index.php',
      '/2026/06/21/%E7%94%A8-AI-%E8%A6%96%E8%A6%BA%E4%BB%A3%E7%90%86%EF%BC%88Computer-Use%EF%BC%89%E5%AE%8C%E5%85%A8%E5%8F%96%E4%BB%A3-Playwright%EF%BC%9F%E8%AB%87%E8%AB%87%E5%89%8D%E7%AB%AF%E8%87%AA%E5%8B%95%E5%8C%96%E6%B8%AC%E8%A9%A6%E7%9A%84%E5%96%A7%E5%9B%82%E8%88%87%E5%AF%A6%E5%8B%99%E6%8A%89%E6%93%87/',
    ],
    [
      'source/2026/06/15/最新版-Claude-Opus-超長上下文在企業級應用的實戰指南/index.php',
      '/2026/06/08/claude-design-cowork-code-comparison/',
    ],
  ];

  for (const [relativePath, target] of redirects) {
    const absolutePath = path.join(root, relativePath);
    assert.ok(fs.existsSync(absolutePath), `${relativePath} should exist`);
    assert.match(read(relativePath), new RegExp(target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('priority posts expose description, updated, exact more tag, and non-empty alt text', () => {
  const files = [
    'source/_posts/2026-05-06-AI-coding-工具比較：Claude-Code、Codex、Cursor-怎麼選？.md',
    'source/_posts/2026-05-25-日語自學也能高效，精選AI學習工具大公開（2026版）.md',
    'source/_posts/2026-06-08-claude-design-cowork-code-comparison.md',
  ];

  for (const file of files) {
    const content = read(file);
    assert.match(content, /^description:\s*.+/m, `${file} should have a description`);
    assert.match(content, /^updated:\s*.+/m, `${file} should have an updated timestamp`);
    assert.doesNotMatch(content, /!\[\]\(/, `${file} should not contain empty alt text`);
  }

  const japaneseTools = read('source/_posts/2026-05-25-日語自學也能高效，精選AI學習工具大公開（2026版）.md');
  assert.match(japaneseTools, /<!--more-->/);
  assert.doesNotMatch(japaneseTools, /<!-- more -->/);
});
