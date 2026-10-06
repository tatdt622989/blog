import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const output = process.env.BLOG_TEST_PUBLIC_DIR || path.resolve('public');
const origin = 'https://blog.6yuwei.com';
const locales = [
  { dir: '', prefix: '/', lang: 'zh-TW', title: '用 AI 做出你的第一個 App' },
  { dir: 'zh-cn', prefix: '/zh-cn/', lang: 'zh-CN', title: '用 AI 做出你的第一个 App' },
  { dir: 'en', prefix: '/en/', lang: 'en', title: 'Build Your First App with AI' },
];

function read(...parts) {
  return fs.readFileSync(path.join(output, ...parts), 'utf8');
}

function existsInOutput(href) {
  const pathname = decodeURI(href.split(/[?#]/)[0]).replace(/^\//, '');
  return fs.existsSync(path.join(output, pathname)) || fs.existsSync(path.join(output, pathname, 'index.html'));
}

test('the dev map page exists in every locale with reciprocal canonical and hreflang links', () => {
  for (const { dir, prefix, lang, title } of locales) {
    const html = read(dir, 'ai-dev-map', 'index.html');

    assert.match(html, new RegExp(`<html lang="${lang}"`));
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${prefix}ai-dev-map/">`), `${lang} canonical`);
    for (const peer of locales) {
      assert.ok(
        html.includes(`<link rel="alternate" hreflang="${peer.lang}" href="${origin}${peer.prefix}ai-dev-map/">`),
        `${lang} hreflang ${peer.lang}`,
      );
    }
    assert.ok(html.includes(`<link rel="alternate" hreflang="x-default" href="${origin}/ai-dev-map/">`), `${lang} x-default`);
    assert.match(html, /<h1 class="dev-map__title">/);
    assert.ok(html.includes(title), `${lang} title`);
    assert.match(html, /<meta name="description" content="[^"]{40,}">/);

    for (const peer of locales) {
      assert.ok(html.includes(`href="${peer.prefix}ai-dev-map/"`), `${lang} language switcher to ${peer.lang}`);
    }
  }
});

test('every dev map card links to a real article in the same locale with a real cover', () => {
  for (const { dir, prefix, lang } of locales) {
    const html = read(dir, 'ai-dev-map', 'index.html');
    const cards = [...html.matchAll(/<a class="dev-map-card[^"]*" href="([^"]+)"[\s\S]*?<\/a>/g)];

    assert.ok(cards.length >= 10, `${lang} has ${cards.length} cards`);
    for (const [card, href] of cards) {
      assert.ok(href.startsWith(prefix) && !href.startsWith(`${prefix}ai-dev-map`), `${lang} card ${href}`);
      if (prefix === '/') assert.ok(!href.startsWith('/en/') && !href.startsWith('/zh-cn/'), `${lang} card ${href}`);
      assert.ok(existsInOutput(href), `${lang} card target ${href}`);

      const src = card.match(/<img [^>]*src="([^"]+)"/)?.[1];
      assert.ok(src, `${lang} card ${href} has a cover`);
      assert.ok(existsInOutput(src), `${lang} cover ${src}`);
    }
  }
});

test('the dev map exposes two routes, five stops, and a last-updated date', () => {
  for (const { dir, lang } of locales) {
    const html = read(dir, 'ai-dev-map', 'index.html');

    assert.equal((html.match(/class="dev-map__tab[ "]/g) || []).length, 2, `${lang} tabs`);
    assert.equal((html.match(/class="dev-map__stop[ "]/g) || []).length, 5, `${lang} stops`);
    assert.match(html, /<time datetime="\d{4}-\d{2}-\d{2}">\d{4}-\d{2}-\d{2}<\/time>/, `${lang} updated`);
    assert.doesNotMatch(html, /<article\b/, `${lang} stays out of the article TOC and heading anchors`);
  }
});

test('every locale links to its dev map from the header and the homepage, and the header no longer links to Atlas', () => {
  for (const { dir, prefix, lang } of locales) {
    const home = read(dir, 'index.html');
    const nav = home.match(/<nav id="main-nav"[\s\S]*?<\/nav>/)?.[0] || '';
    const startHere = home.match(/<section class="start-here"[\s\S]*?<\/section>/)?.[0] || '';

    assert.ok(nav.includes(`href="${prefix}ai-dev-map/"`), `${lang} nav link`);
    assert.doesNotMatch(nav, /atlas\.6yuwei\.com/, `${lang} nav without Atlas`);
    assert.ok(startHere.includes(`href="${prefix}ai-dev-map/"`), `${lang} start here link`);
  }
});

test('each locale sitemap lists its dev map', () => {
  for (const [file, prefix] of [['sitemap-zh-TW.xml', '/'], ['zh-cn/sitemap.xml', '/zh-cn/'], ['en/sitemap.xml', '/en/']]) {
    assert.ok(read(file).includes(`<loc>${origin}${prefix}ai-dev-map/</loc>`), file);
  }

  const chineseSitemap = read('sitemap-zh-TW.xml');
  assert.doesNotMatch(chineseSitemap, /\/(en|zh-cn)\/ai-dev-map\//, 'locale pages stay out of the zh-TW build');
});

test('the dev map head meets strict SEO limits', () => {
  for (const { dir, prefix, lang } of locales) {
    const html = read(dir, 'ai-dev-map', 'index.html');
    const head = html.match(/<head>[\s\S]*?<\/head>/)[0];
    const canonical = `${origin}${prefix}ai-dev-map/`;
    const isEnglish = lang === 'en';
    const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

    const title = decode(head.match(/<title>([^<]+)<\/title>/)[1]);
    assert.ok(title.length <= (isEnglish ? 60 : 40), `${lang} <title> is ${title.length} chars: ${title}`);

    const description = decode(head.match(/<meta name="description" content="([^"]+)">/)[1]);
    const [min, max] = isEnglish ? [110, 160] : [50, 120];
    assert.ok(description.length >= min && description.length <= max, `${lang} description is ${description.length} chars`);

    assert.doesNotMatch(head, /noindex/i, `${lang} indexable`);
    assert.ok(head.includes(`<meta property="og:url" content="${canonical}"/>`), `${lang} og:url`);
    const ogImage = head.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    assert.ok(ogImage?.startsWith(`${origin}/`), `${lang} og:image is absolute`);
    assert.ok(existsInOutput(new URL(ogImage).pathname), `${lang} og:image exists`);

    const graphs = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .flatMap(([, json]) => [].concat(JSON.parse(json)));
    const collection = graphs.find(node => node['@type'] === 'CollectionPage');
    assert.ok(collection, `${lang} CollectionPage`);
    assert.equal(collection.url, canonical);
    assert.equal(collection.inLanguage, lang);
    assert.match(collection.dateModified, /^\d{4}-\d{2}-\d{2}T/);

    const list = collection.mainEntity;
    assert.equal(list['@type'], 'ItemList');
    const cardUrls = [...new Set([...html.matchAll(/<a class="dev-map-card[^"]*" href="([^"]+)"/g)].map(([, href]) => origin + href))];
    assert.deepEqual(list.itemListElement.map(item => item.url), cardUrls, `${lang} ItemList matches the cards`);
    assert.deepEqual(list.itemListElement.map(item => item.position), cardUrls.map((_, index) => index + 1));
    assert.equal(list.numberOfItems, cardUrls.length);
    assert.ok(list.itemListElement.every(item => item.name), `${lang} ItemList names`);
  }
});

test('the first featured cover is fetched eagerly with high priority', () => {
  for (const { dir, lang } of locales) {
    const html = read(dir, 'ai-dev-map', 'index.html');
    const images = [...html.matchAll(/<a class="dev-map-card[^"]*"[\s\S]*?(<img [^>]*>)/g)].map(([, img]) => img);

    assert.match(images[0], /fetchpriority="high"/, `${lang} first cover priority`);
    assert.doesNotMatch(images[0], /loading="lazy"/, `${lang} first cover eager`);
    assert.ok(images.slice(1).every(img => !/fetchpriority/.test(img)), `${lang} only one priority image`);
  }
});

test('every locale promotes Iraiya with a link to its own-language site', () => {
  for (const { dir, lang, iraiya } of [
    { dir: '', lang: 'zh-TW', iraiya: 'https://iraiya.com/zh-TW' },
    { dir: 'zh-cn', lang: 'zh-CN', iraiya: 'https://iraiya.com/zh-TW' },
    { dir: 'en', lang: 'en', iraiya: 'https://iraiya.com/en' },
  ]) {
    const html = read(dir, 'ai-dev-map', 'index.html');
    const promo = html.match(/<section class="dev-map__promo"[\s\S]*?<\/section>/)?.[0] || '';

    assert.ok(promo.includes(`href="${iraiya}"`), `${lang} Iraiya link`);
    assert.match(promo, /<img [^>]*width="\d+" height="\d+"[^>]*alt="[^"]+"/, `${lang} Iraiya image`);
    assert.ok(html.indexOf('dev-map__promo') < html.indexOf('dev-map__tracks'), `${lang} promo sits above the routes`);
  }
});
