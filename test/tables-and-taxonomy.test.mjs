import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { wrapDataTables } = require('../lib/responsive-tables');
const { alternateLinks, languageSwitchTarget } = require('../lib/i18n');
const output = process.env.BLOG_TEST_PUBLIC_DIR || path.resolve('public');

test('data tables keep their markup and work without JavaScript, while code tables stay untouched', () => {
  const data = '<table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td><strong>value</strong></td><td>2</td></tr></tbody></table>';
  const code = '<figure class="highlight js"><table><tr><td class="code"><pre>&lt;table&gt;</pre></td></tr></table></figure>';
  const wrapped = wrapDataTables(data + code, 'Table "A"');
  assert.ok(wrapped.includes(data), 'cell content and native table semantics should be preserved verbatim');
  assert.ok(wrapped.endsWith(code), 'syntax-highlighted code should not be restyled or wrapped');
  assert.equal((wrapped.match(/class="table-wrap data-table-wrap"/g) || []).length, 1);
  assert.match(wrapped, /tabindex="0"/);
  assert.match(wrapped, /aria-label="Table &quot;A&quot;"/);
  assert.match(wrapped, /--table-min-width:0px/);
  assert.equal(wrapDataTables(wrapped, 'Table'), wrapped, 'rendering twice should not nest wrappers');
});

test('wide comparison tables reserve readable column widths without forcing narrow tables to 720px', () => {
  const html = '<table><tr><th colspan="2">Models</th><th>Price</th><th>Notes</th></tr></table>';
  assert.match(wrapDataTables(html, 'Comparison'), /--table-min-width:560px/);
});

test('taxonomy directories have real language counterparts without inventing translated tag names', () => {
  const config = { url: 'https://blog.6yuwei.com', language: 'zh-TW', root: '/', i18n: { default_locale: 'zh-TW', locales: { 'zh-TW': '/', 'zh-CN': '/zh-cn/', en: '/en/' } } };
  for (const kind of ['tags', 'categories']) {
    const page = { path: `${kind}/index.html`, taxonomy_index: kind };
    assert.equal(languageSwitchTarget(page, 'en', config), `/en/${kind}/`);
    assert.deepEqual(alternateLinks(page, config).map(link => link.href), [
      `https://blog.6yuwei.com/${kind}/`, `https://blog.6yuwei.com/zh-cn/${kind}/`,
      `https://blog.6yuwei.com/en/${kind}/`, `https://blog.6yuwei.com/${kind}/`,
    ]);
  }
  assert.deepEqual(alternateLinks({ tag: 'AI', path: 'tags/AI/index.html' }, config), []);
});

test('all three sites expose complete crawlable topic directories and bounded sidebar tags', () => {
  for (const locale of ['', 'zh-cn', 'en']) {
    for (const kind of ['tags', 'categories']) {
      const html = fs.readFileSync(path.join(output, locale, kind, 'index.html'), 'utf8');
      const list = html.match(/<ul id="taxonomy-list"[\s\S]*?<\/ul>/)?.[0];
      assert.ok(list, `${locale}/${kind} should include links in the initial HTML`);
      const items = [...list.matchAll(/<a href="([^"]+)"/g)];
      assert.ok(items.length > 0);
      for (const [, href] of items) {
        const relative = decodeURIComponent(new URL(href, 'https://blog.6yuwei.com').pathname).replace(/^\//, '');
        assert.ok(fs.existsSync(path.join(output, relative, 'index.html')), `directory target must exist: ${href}`);
      }
      const sidebar = html.match(/<div class="widget tag tag-summary">[\s\S]*?<\/div>/)?.[0] || '';
      assert.equal((sidebar.match(/<li>/g) || []).length, 20);
      assert.match(html, new RegExp(`rel="canonical" href="https://blog.6yuwei.com/${locale ? locale + '/' : ''}${kind}/"`));
      assert.doesNotMatch(html, /maximum-scale=1/);
    }
  }
});

test('legacy article descriptions come from the article rather than the site introduction', () => {
  const html = fs.readFileSync(path.join(output, '2022/02/05/1/index.html'), 'utf8');
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  assert.ok(description?.length > 20);
  assert.ok(!description.startsWith('6yuwei 的技術與數位生活部落格'));
});
