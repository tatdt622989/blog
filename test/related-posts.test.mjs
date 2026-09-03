import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { extractPostCover, getRelatedPosts } from '../lib/related-posts.js';
import { normalizePath, loadRecentTraffic, getPostTraffic } from '../lib/traffic-loader.js';

const root = process.cwd();
const generatedPublicRoot = process.env.BLOG_TEST_PUBLIC_DIR
  ? path.resolve(process.env.BLOG_TEST_PUBLIC_DIR)
  : path.join(root, 'public');

function read(relativePath) {
  if (relativePath.startsWith('public/')) {
    return fs.readFileSync(
      path.join(generatedPublicRoot, relativePath.slice('public/'.length)),
      'utf8',
    );
  }

  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('traffic-loader normalizes paths and extracts post traffic properly', () => {
  assert.equal(normalizePath('2026/06/18/quota'), '/2026/06/18/quota/');
  assert.equal(normalizePath('/2026/06/18/quota/'), '/2026/06/18/quota/');
  assert.equal(normalizePath('/2026/06/18/quota/index.html'), '/2026/06/18/quota/index.html');
  assert.equal(normalizePath('/2026/06/18/quota?foo=bar#hash'), '/2026/06/18/quota/');

  const fakeTraffic = new Map([
    ['/2026/06/18/claude-codex-quota-guide/', 42],
  ]);

  const postMatch = { path: '2026/06/18/claude-codex-quota-guide/' };
  assert.equal(getPostTraffic(postMatch, fakeTraffic), 42, 'should match path');

  const postFallbackViews = { path: '2026/01/other/', views: 15 };
  assert.equal(getPostTraffic(postFallbackViews, fakeTraffic), 15, 'should fallback to post.views');
});

test('extractPostCover returns the expected cover image path or null', () => {
  assert.equal(
    extractPostCover({ photos: ['/custom-photo.jpg'] }),
    '/custom-photo.jpg',
    'should prefer photos array',
  );

  assert.equal(
    extractPostCover({
      content: '<p>Intro</p><p><img src="/2026/08/test/cover.webp" alt="Cover"></p>',
    }),
    '/2026/08/test/cover.webp',
    'should extract from rendered content <img> tag',
  );

  assert.equal(
    extractPostCover({
      raw: '---\ntitle: Test\n---\n![Alt](cover.jpg)\n',
      path: '2026/08/test/',
    }),
    '/2026/08/test/cover.jpg',
    'should extract from raw markdown and resolve relative path',
  );

  assert.equal(
    extractPostCover({ content: '<p>No image here</p>' }),
    null,
    'should return null when no image is found',
  );
});

test('getRelatedPosts prioritizes traffic when relevance scores match and falls back to popular posts', () => {
  const currentPost = {
    _id: 'current_1',
    path: '2026/09/current/',
    title: 'Current Post',
    tags: ['AI', 'Agent'],
    categories: ['Engineering'],
    date: new Date('2026-09-01T00:00:00Z'),
  };

  const pool = [
    currentPost, // 自身應被排除
    {
      _id: 'post_equal_rel_low_traffic',
      path: '2026/08/equal-low/',
      title: 'Equal Relevance Low Traffic',
      tags: ['AI', 'Agent'],
      categories: ['Engineering'],
      date: new Date('2026-08-10T00:00:00Z'),
      views: 5,
    },
    {
      _id: 'post_equal_rel_high_traffic',
      path: '2026/08/equal-high/',
      title: 'Equal Relevance High Traffic',
      tags: ['AI', 'Agent'],
      categories: ['Engineering'],
      date: new Date('2026-08-09T00:00:00Z'), // 日期稍微早一天，但流量極高
      views: 500,
    },
    {
      _id: 'post_no_match_popular',
      path: '2026/07/popular-unrelated/',
      title: 'Popular Unrelated Post',
      tags: ['Travel'],
      categories: ['Life'],
      date: new Date('2026-07-01T00:00:00Z'), // 舊文章，但全站爆款
      views: 2000,
    },
    {
      _id: 'post_no_match_fresh',
      path: '2026/08/fresh-unrelated/',
      title: 'Fresh Unrelated Post',
      tags: ['Cooking'],
      categories: ['Food'],
      date: new Date('2026-08-28T00:00:00Z'), // 較新但沒流量
      views: 0,
    },
  ];

  const related = getRelatedPosts(currentPost, pool, { limit: 3 });

  assert.equal(related.length, 3, 'should return exactly 3 posts');
  assert.ok(!related.some((p) => p._id === 'current_1'), 'should exclude current post');

  // 同關聯下，高流量應排在低流量前面
  assert.equal(related[0]._id, 'post_equal_rel_high_traffic', 'first should be high traffic related');
  assert.equal(related[1]._id, 'post_equal_rel_low_traffic', 'second should be low traffic related');

  // 無關聯遞補時，爆款熱門文章應優先於無流量新文章
  assert.equal(related[2]._id, 'post_no_match_popular', 'third should fallback to high traffic popular post');
});

test('public post pages render localized related posts and list pages omit them', () => {
  const zhPostPath = 'public/2026/06/18/claude-codex-quota-guide/index.html';
  const enPostPath = 'public/en/2026/06/18/claude-codex-usage-limits-guide/index.html';
  const homepagePath = 'public/index.html';
  const privacyPath = 'public/privacy/index.html';

  if (fs.existsSync(path.join(generatedPublicRoot, '2026/06/18/claude-codex-quota-guide/index.html'))) {
    const zhPost = read(zhPostPath);
    assert.match(zhPost, /class="related-posts"/, 'Chinese post should contain related-posts');
    assert.match(zhPost, /<h3 class="related-posts-title">相關文章<\/h3>/, 'Chinese post should have 相關文章 title');
    assert.match(zhPost, /class="related-post-card"/, 'Chinese post should render cards');
    assert.match(zhPost, /data-rel-source="\/2026\/06\/18\/claude-codex-quota-guide\/"/, 'Chinese post should set data-rel-source');
    assert.match(zhPost, /data-rel-title="/, 'cards should expose data-rel-title');
    assert.match(zhPost, /data-rel-path="/, 'cards should expose data-rel-path');
    assert.match(zhPost, /data-rel-tag="/, 'cards should expose data-rel-tag');
    assert.match(zhPost, /data-rel-position="1"/, 'cards should expose data-rel-position');
    assert.doesNotMatch(
      zhPost,
      /<a href="\/2026\/06\/18\/claude-codex-quota-guide\/" class="related-post-link">/,
      'Chinese post should not recommend itself',
    );
  }

  if (fs.existsSync(path.join(generatedPublicRoot, 'en/2026/06/18/claude-codex-usage-limits-guide/index.html'))) {
    const enPost = read(enPostPath);
    assert.match(enPost, /class="related-posts"/, 'English post should contain related-posts');
    assert.match(enPost, /<h3 class="related-posts-title">Related Posts<\/h3>/, 'English post should have Related Posts title');
    assert.match(enPost, /href="\/en\//, 'English post related links should target English articles');
    assert.doesNotMatch(
      enPost,
      /<a href="\/en\/2026\/06\/18\/claude-codex-usage-limits-guide\/" class="related-post-link">/,
      'English post should not recommend itself',
    );
  }

  if (fs.existsSync(path.join(generatedPublicRoot, 'index.html'))) {
    const homepage = read(homepagePath);
    assert.doesNotMatch(homepage, /class="related-posts"/, 'homepage should not render related posts');
  }

  if (fs.existsSync(path.join(generatedPublicRoot, 'privacy/index.html'))) {
    const privacy = read(privacyPath);
    assert.doesNotMatch(privacy, /class="related-posts"/, 'privacy page should not render related posts');
  }
});
