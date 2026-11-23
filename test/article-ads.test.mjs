import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { renderAdSlot, insertMidArticleAd } = require('../lib/article-ads.js');

const output = process.env.BLOG_TEST_PUBLIC_DIR || path.resolve('public');
const AD = '<aside class="article-ad"></aside>';

test('insertMidArticleAd puts the ad before the h2 closest to the middle, never the first h2', () => {
  const section = (n) => `<h2 id="s${n}">S${n}</h2><p>${'x'.repeat(100)}</p>`;
  const html = `<p>intro</p>${section(1)}${section(2)}${section(3)}${section(4)}`;
  const result = insertMidArticleAd(html, AD);
  assert.equal(result.split(AD).length, 2, 'exactly one ad');
  assert.ok(result.indexOf(AD) < result.indexOf('<h2 id="s3"'), 'ad sits right before the middle h2');
  assert.ok(result.indexOf(AD) > result.indexOf('<h2 id="s2"'), 'ad is not placed early');
  assert.equal(result.indexOf(AD) + AD.length, result.indexOf('<h2 id="s3"'));
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

test('renderAdSlot uses the in-article format in the middle and a responsive unit at the end', () => {
  const middle = renderAdSlot({ client: 'ca-pub-1', slot: '111', position: 'article', label: '廣告' });
  assert.match(middle, /data-ad-slot="111"/);
  assert.match(middle, /data-ad-layout="in-article" data-ad-format="fluid"/);
  assert.match(middle, /class="article-ad-label">廣告</);
  const bottom = renderAdSlot({ client: 'ca-pub-1', slot: '222', position: 'bottom', label: 'Ad' });
  assert.match(bottom, /data-ad-format="auto" data-full-width-responsive="true"/);
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

test('every post in all three languages has one end slot and at most one middle slot', () => {
  const sites = [
    { dir: output, label: '廣告' },
    { dir: path.join(output, 'zh-cn'), label: '广告' },
    { dir: path.join(output, 'en'), label: 'Advertisement' },
  ];
  for (const { dir, label } of sites) {
    const pages = postPages(dir);
    assert.ok(pages.length > 0, `found posts in ${dir}`);
    let withMiddle = 0;
    for (const file of pages) {
      const html = fs.readFileSync(file, 'utf8');
      assert.equal(count(html, 'article-ad--bottom"'), 1, `${file} has one end slot`);
      assert.match(html, /data-ad-slot="3935576155"/, `${file} uses blog-bottom`);
      assert.match(html, new RegExp(`class="article-ad-label">${label}<`), `${file} shows the ${label} label`);
      const middle = count(html, 'article-ad--article"');
      assert.ok(middle <= 1, `${file} has at most one middle slot`);
      withMiddle += middle;
    }
    assert.ok(withMiddle > pages.length / 2, `most posts in ${dir} get a middle slot`);
  }
});

test('the home page has no fixed post ad slots', () => {
  const html = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
  assert.equal(count(html, 'class="article-ad '), 0);
});
