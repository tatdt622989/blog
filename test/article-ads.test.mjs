import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';

const require = createRequire(import.meta.url);
const {
  renderAdSlot,
  insertMidArticleAd,
  LONG_POST_MIN_H2,
  LONG_POST_MIN_LENGTH,
} = require('../lib/article-ads.js');

const output = process.env.BLOG_TEST_PUBLIC_DIR || path.resolve('public');
const AD = '<aside class="article-ad"></aside>';

test('insertMidArticleAd puts one ad before the middle h2 on short/medium posts, never the first h2', () => {
  const section = (n) => `<h2 id="s${n}">S${n}</h2><p>${'x'.repeat(100)}</p>`;
  const html = `<p>intro</p>${section(1)}${section(2)}${section(3)}${section(4)}`;
  const result = insertMidArticleAd(html, AD);
  assert.equal(result.split(AD).length, 2, 'exactly one ad');
  assert.ok(result.indexOf(AD) < result.indexOf('<h2 id="s3"'), 'ad sits right before the middle h2');
  assert.ok(result.indexOf(AD) > result.indexOf('<h2 id="s2"'), 'ad is not placed early');
  assert.equal(result.indexOf(AD) + AD.length, result.indexOf('<h2 id="s3"'));
});

test('insertMidArticleAd puts two separated ads on long posts with enough h2 sections', () => {
  const chunkLen = Math.ceil(LONG_POST_MIN_LENGTH / 6) + 200;
  const section = (n) => `<h2 id="s${n}">S${n}</h2><p>${'x'.repeat(chunkLen)}</p>`;
  const html = `<p>intro</p>${[1, 2, 3, 4, 5, 6].map(section).join('')}`;
  assert.ok(html.length >= LONG_POST_MIN_LENGTH);
  assert.ok(6 >= LONG_POST_MIN_H2);

  const result = insertMidArticleAd(html, AD);
  const parts = result.split(AD);
  assert.equal(parts.length, 3, 'two in-article ads');
  assert.ok(parts[0].includes('<h2 id="s1"'), 'never placed before the first h2');
  assert.ok((parts[1].match(/<h2 /g) || []).length >= 2, 'at least two headings separate the two ads');
  assert.ok(parts[2].includes('<h2 id="s6"'), 'last section follows the second ad');
});

test('insertMidArticleAd leaves posts with fewer than two h2 unchanged', () => {
  assert.equal(insertMidArticleAd('<p>a</p><h2>One</h2><p>b</p>', AD), '<p>a</p><h2>One</h2><p>b</p>');
  assert.equal(insertMidArticleAd('<p>a</p>', AD), '<p>a</p>');
  assert.equal(insertMidArticleAd('<h2>A</h2><h2>B</h2>', ''), '<h2>A</h2><h2>B</h2>');
});

test('renderAdSlot returns nothing without a client or slot', () => {
  assert.equal(renderAdSlot({ client: 'ca-pub-1', slot: '', position: 'bottom', label: 'Ad' }), '');
  assert.equal(renderAdSlot({ client: '', slot: '1', position: 'bottom', label: 'Ad' }), '');
});

test('renderAdSlot renders expected markup for article, bottom, sidebar, and feed positions', () => {
  const middle = renderAdSlot({ client: 'ca-pub-1', slot: '111', position: 'article', label: '廣告' });
  assert.match(middle, /class="article-ad article-ad--article"/);
  assert.match(middle, /data-ad-slot="111"/);
  assert.match(middle, /data-ad-layout="in-article" data-ad-format="fluid"/);
  assert.match(middle, /class="article-ad-label">廣告</);

  const bottom = renderAdSlot({ client: 'ca-pub-1', slot: '222', position: 'bottom', label: 'Ad' });
  assert.match(bottom, /class="article-ad article-ad--bottom"/);
  assert.match(bottom, /data-ad-format="auto" data-full-width-responsive="true"/);

  const sidebar = renderAdSlot({ client: 'ca-pub-1', slot: '333', position: 'sidebar', label: '廣告' });
  assert.match(sidebar, /class="widget site-ad site-ad--sidebar"/);
  assert.match(sidebar, /data-ad-slot="333"/);
  assert.match(sidebar, /data-ad-format="auto" data-full-width-responsive="true"/);

  const feed = renderAdSlot({ client: 'ca-pub-1', slot: '444', position: 'feed', label: 'Ad' });
  assert.match(feed, /class="site-ad site-ad--feed"/);
  assert.match(feed, /data-ad-slot="444"/);
});

function postPages(dir) {
  const pages = [];
  for (const year of fs.readdirSync(dir).filter((name) => /^\d{4}$/.test(name))) {
    for (const month of fs.readdirSync(path.join(dir, year))) {
      for (const day of fs.readdirSync(path.join(dir, year, month))) {
        for (const slug of fs.readdirSync(path.join(dir, year, month, day))) {
          const file = path.join(dir, year, month, day, slug, 'index.html');
          if (fs.existsSync(file)) pages.push(file);
        }
      }
    }
  }
  return pages;
}

const count = (html, needle) => html.split(needle).length - 1;

const SLOTS = { bottom: '3935576155', sidebar: '6279943553', feed: '3929112387' };

// Returns the data-ad-slot values of every ad wrapper carrying the given class.
const slotsFor = (html, wrapperClass) =>
  [...html.matchAll(new RegExp(`<aside class="[^"]*\\b${wrapperClass}"[^>]*><ins [^>]*data-ad-slot="(\\d+)"`, 'g'))]
    .map((match) => match[1]);

test('every post in all three languages has end, sidebar, and 0-2 in-article slots', () => {
  const sites = [
    { dir: output, label: '廣告' },
    { dir: path.join(output, 'zh-cn'), label: '广告' },
    { dir: path.join(output, 'en'), label: 'Advertisement' },
  ];
  for (const { dir, label } of sites) {
    const pages = postPages(dir);
    assert.ok(pages.length > 0, `found posts in ${dir}`);
    let withMiddle = 0;
    let withTwoMiddle = 0;
    for (const file of pages) {
      const html = fs.readFileSync(file, 'utf8');
      assert.equal(count(html, 'article-ad--bottom"'), 1, `${file} has one end slot`);
      assert.equal(count(html, 'site-ad--sidebar"'), 1, `${file} has one sidebar slot`);
      assert.deepEqual(slotsFor(html, 'article-ad--bottom'), [SLOTS.bottom], `${file} end slot uses blog-bottom`);
      assert.deepEqual(slotsFor(html, 'site-ad--sidebar'), [SLOTS.sidebar], `${file} sidebar uses blog-sidebar`);
      assert.match(html, new RegExp(`class="article-ad-label">${label}<`), `${file} shows the ${label} label`);
      const middle = count(html, 'article-ad--article"');
      assert.ok(middle <= 2, `${file} has at most two in-article slots`);
      if (middle >= 1) withMiddle += 1;
      if (middle === 2) withTwoMiddle += 1;
    }
    assert.ok(withMiddle > pages.length / 2, `most posts in ${dir} get at least one in-article slot`);
    assert.ok(withTwoMiddle > 0, `long posts in ${dir} get two in-article slots`);
  }
});

test('home pages in all three languages render sidebar and feed ads without post-body slots', () => {
  for (const locale of ['', 'zh-cn', 'en']) {
    const html = fs.readFileSync(path.join(output, locale, 'index.html'), 'utf8');
    assert.equal(count(html, 'class="article-ad '), 0, `${locale || 'zh-TW'} home has no post-body ads`);
    assert.equal(count(html, 'site-ad--sidebar"'), 1, `${locale || 'zh-TW'} home has one sidebar ad`);
    assert.equal(count(html, 'site-ad--feed"'), 1, `${locale || 'zh-TW'} home has one feed ad`);
    assert.deepEqual(slotsFor(html, 'site-ad--sidebar'), [SLOTS.sidebar], `${locale || 'zh-TW'} home sidebar uses blog-sidebar`);
    assert.deepEqual(slotsFor(html, 'site-ad--feed'), [SLOTS.feed], `${locale || 'zh-TW'} home feed uses blog-feed`);
  }
});

test('privacy page renders zero ad slots including sidebar', () => {
  const html = fs.readFileSync(path.join(output, 'privacy/index.html'), 'utf8');
  assert.equal(count(html, 'adsbygoogle'), 0, 'privacy page has no adsbygoogle markup');
  assert.equal(count(html, 'site-ad--'), 0, 'privacy page has no site-ad slots');
  assert.equal(count(html, 'article-ad--'), 0, 'privacy page has no article-ad slots');
});
