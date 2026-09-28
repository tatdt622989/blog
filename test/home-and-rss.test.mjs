import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { buildRss } = require('../lib/rss');
const output = process.env.BLOG_TEST_PUBLIC_DIR || path.resolve('public');

test('RSS escapes XML and excludes hidden or unpublished posts', () => {
  const post = { title: 'A & B <guide>', description: 'A < B & C', permalink: 'https://blog.6yuwei.com/en/p/', date: new Date('2026-09-01T00:00:00Z') };
  const xml = buildRss([post, { ...post, title: 'Hidden', hidden: true }, { ...post, title: 'Draft', published: false }], {
    title: 'Blog', description: 'Guide & notes', language: 'en', url: 'https://blog.6yuwei.com/en', feed: { path: 'rss.xml', limit: 20 },
  });
  assert.equal((xml.match(/<item>/g) || []).length, 1);
  assert.match(xml, /A &amp; B &lt;guide&gt;/);
  assert.doesNotMatch(xml, /Hidden|Draft/);
  assert.match(xml, /href="https:\/\/blog.6yuwei.com\/en\/rss.xml"/);
  assert.match(xml, /<pubDate>Tue, 01 Sep 2026 00:00:00 GMT<\/pubDate>/);
});

test('each homepage exposes four local-language guides and a matching RSS feed', () => {
  for (const locale of ['', 'zh-cn', 'en']) {
    const prefix = locale ? `/${locale}/` : '/';
    const html = fs.readFileSync(path.join(output, locale, 'index.html'), 'utf8');
    const section = html.match(/<section class="start-here"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section, `${locale} start here`);
    const links = [...section.matchAll(/class="start-here__link" href="([^"]+)"/g)].map(m => m[1]);
    assert.equal(links.length, 4);
    for (const href of links) {
      assert.ok(href.startsWith(prefix), href);
      assert.ok(fs.existsSync(path.join(output, decodeURI(href).replace(/^\//, ''), 'index.html')), href);
    }
    assert.ok(html.includes(`href="${prefix}rss.xml"`));
    assert.match(html, /type="application\/rss\+xml"/);
    const feed = fs.readFileSync(path.join(output, locale, 'rss.xml'), 'utf8');
    assert.equal((feed.match(/<item>/g) || []).length, 20);
    for (const [, url] of feed.matchAll(/<guid isPermaLink="true">([^<]+)<\/guid>/g)) {
      assert.ok(new URL(url).pathname.startsWith(prefix));
      assert.ok(fs.existsSync(path.join(output, decodeURI(new URL(url).pathname), 'index.html')), url);
    }
    const page2 = fs.readFileSync(path.join(output, locale, 'page/2/index.html'), 'utf8');
    assert.doesNotMatch(page2, /class="start-here"/);
  }
});
