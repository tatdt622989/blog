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

test('theme templates define JSON-LD structured data for homepage, posts, and breadcrumbs', () => {
  const head = read('themes/light/layout/_partial/head.ejs');

  assert.match(head, /application\/ld\+json/, 'head partial should emit JSON-LD');
  assert.match(head, /WebSite/, 'head partial should define WebSite structured data');
  assert.match(head, /Organization/, 'head partial should define Organization structured data');
  assert.match(head, /BlogPosting/, 'head partial should define BlogPosting structured data');
  assert.match(head, /BreadcrumbList/, 'head partial should define BreadcrumbList structured data');
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

test('generated pages expose JSON-LD for the homepage, a post, and a taxonomy page', () => {
  const homepage = read('public/index.html');
  const post = read('public/2026/06/18/claude-codex-quota-guide/index.html');
  const category = read('public/categories/AI/index.html');

  assert.match(homepage, /application\/ld\+json/, 'homepage should contain JSON-LD');
  assert.match(homepage, /"@type":"WebSite"/, 'homepage should expose WebSite schema');
  assert.match(homepage, /"@type":"Organization"/, 'homepage should expose Organization schema');

  assert.match(post, /"@type":"BlogPosting"/, 'post page should expose BlogPosting schema');
  assert.match(post, /"@type":"BreadcrumbList"/, 'post page should expose breadcrumb schema');

  assert.match(category, /"@type":"BreadcrumbList"/, 'category page should expose breadcrumb schema');
});

test('generated post images reserve layout space before image load', () => {
  const post = read('public/2026/06/23/OpenAI-推出-GPT-5-5-Cyber：防守方專屬的-AI-網路安全新利器/index.html');
  const firstImageMatch = post.match(/<p\b[^>]*\bpost-cover-frame\b[^>]*><img\b[^>]+><\/p>/);

  assert.ok(firstImageMatch, 'post should render the first article image inside a stable cover frame');

  const firstImage = firstImageMatch[0];
  assert.match(firstImage, /\bwidth="1200"/, 'first image should include intrinsic width');
  assert.match(firstImage, /\bheight="669"/, 'first image should include intrinsic height');
  assert.match(firstImage, /\bdecoding="async"/, 'first image should decode asynchronously');
  assert.match(firstImage, /\bclass="[^"]*\bpost-cover-image\b/, 'first image should be marked as the cover image');
  assert.doesNotMatch(firstImage, /\bloading="lazy"/, 'first image should not be lazy loaded');

  const articleCss = read('themes/light/source/css/_partial/article.styl');
  assert.match(articleCss, /aspect-ratio 16 \/ 9/, 'cover image container should reserve a stable 16:9 ratio');
  assert.match(articleCss, /\.post-cover-frame/, 'cover frame should not depend on DOM shape inferred with :has');
  assert.match(articleCss, /> \.topImgWrap[\s\S]*height 100%/, 'JS-added image links should fill the responsive cover frame');
  assert.doesNotMatch(articleCss, /:has\(/, 'cover frame should survive runtime image link wrapping');
  assert.match(articleCss, /img\.auto-tall-image:not\(\.post-cover-image\)[\s\S]*width auto !important/, 'tall content images should shrink without distortion');
  assert.match(articleCss, /max-height min\(72vh, 760px\)/, 'tall content images should not dominate small screens');

  const imageFilter = read('scripts/image-layout-metadata.js');
  assert.match(imageFilter, /isCoverImage/, 'only real cover filenames should receive the fixed cover ratio');
  assert.match(imageFilter, /cover\[-\\w\]\*/, 'cover-v2 style filenames should be treated as cover images');
  assert.match(imageFilter, /auto-tall-image/, 'very tall non-cover images should receive a safe responsive class');
});

test('homepage cover images use responsive card variants', () => {
  const homepage = read('public/index.html');
  const docsCover = homepage.match(/<img\b[^>]+Docs-MCP[^>]+post-cover-image[^>]+>/);

  assert.ok(docsCover, 'homepage should render the Docs MCP cover image');
  assert.match(docsCover[0], /\bsrc="[^"]*cover-card-720\.jpg"/, 'cover image fallback should use a smaller card file');
  assert.match(docsCover[0], /\bsrcset="[^"]*cover-card-480\.jpg 480w[^"]*cover-card-960\.jpg 960w[^"]*cover\.png 1344w/, 'cover image should expose responsive width candidates');
  assert.match(docsCover[0], /\bsizes="\([^"]*711px"/, 'cover image should advertise the rendered content width');
  assert.ok(
    fs.existsSync(path.join(root, 'public/2026/06/22/Docs-MCP-到底改變了什麼？為什麼-2026-的-Codex、Claude-Code、Cursor-使用者都該裝/cover-card-720.jpg')),
    'responsive cover variant should be generated',
  );
});

test('homepage avoids post-only JavaScript libraries', () => {
  const homepage = read('public/index.html');
  const post = read('public/2026/06/23/OpenAI-推出-GPT-5-5-Cyber：防守方專屬的-AI-網路安全新利器/index.html');

  assert.match(homepage, /js\/custom\.js\?v=260623-1/, 'homepage should load the small custom script');
  assert.doesNotMatch(homepage, /jquery-3\.4\.1\.min\.js/, 'homepage should not load jQuery');
  assert.doesNotMatch(homepage, /jquery\.fancybox\.pack\.js/, 'homepage should not load Fancybox');
  assert.match(post, /jquery-3\.4\.1\.min\.js/, 'post pages should still load jQuery for Fancybox');
  assert.match(post, /jquery\.fancybox\.pack\.js/, 'post pages should keep image lightbox behavior');
});

test('third-party advertising and analytics scripts are delayed', () => {
  const homepage = read('public/index.html');

  assert.match(homepage, /loadBlogThirdParty/, 'homepage should install a delayed third-party loader');
  assert.match(homepage, /requestIdleCallback/, 'third-party scripts should wait for idle time');
  assert.doesNotMatch(homepage, /<script async src="https:\/\/pagead2\.googlesyndication\.com/, 'AdSense should not load directly in the initial head');
  assert.doesNotMatch(homepage, /<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js/, 'GA4 should not load directly in the initial head');
});
