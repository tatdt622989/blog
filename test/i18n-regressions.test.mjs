import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  absoluteSiteUrl,
  alternateLinks,
  languageSwitchTarget,
  localeHomePath,
  normalizeLocale,
  openGraphLocale,
} = require('../lib/i18n.js');

const baseConfig = {
  url: 'https://blog.6yuwei.com',
  root: '/',
  language: 'zh-TW',
  i18n: {
    default_locale: 'zh-TW',
    locales: {
      'zh-TW': '/',
      'zh-CN': '/zh-cn/',
      en: '/en/',
    },
  },
};

test('locale helpers normalize configured language and home paths', () => {
  assert.equal(normalizeLocale(['en', 'zh-TW']), 'en');
  assert.equal(normalizeLocale(undefined), 'zh-TW');
  assert.equal(localeHomePath('zh-TW', baseConfig), '/');
  assert.equal(localeHomePath('zh-CN', baseConfig), '/zh-cn/');
  assert.equal(localeHomePath('en', baseConfig), '/en/');
  assert.equal(openGraphLocale('zh-TW'), 'zh_TW');
  assert.equal(openGraphLocale('zh-CN'), 'zh_CN');
  assert.equal(openGraphLocale('en'), 'en_US');
});

test('absolute site URLs use the origin exactly once', () => {
  assert.equal(absoluteSiteUrl('/', baseConfig), 'https://blog.6yuwei.com/');
  assert.equal(absoluteSiteUrl('/zh-cn/', baseConfig), 'https://blog.6yuwei.com/zh-cn/');
  assert.equal(absoluteSiteUrl('/en/', baseConfig), 'https://blog.6yuwei.com/en/');
  assert.equal(
    absoluteSiteUrl('https://blog.6yuwei.com/en/2023/03/05/what-is-typescript/', baseConfig),
    'https://blog.6yuwei.com/en/2023/03/05/what-is-typescript/',
  );
});

test('all homepages advertise reciprocal locales and a Chinese x-default', () => {
  const expectedLinks = [
    { hreflang: 'zh-TW', href: 'https://blog.6yuwei.com/' },
    { hreflang: 'zh-CN', href: 'https://blog.6yuwei.com/zh-cn/' },
    { hreflang: 'en', href: 'https://blog.6yuwei.com/en/' },
    { hreflang: 'x-default', href: 'https://blog.6yuwei.com/' },
  ];

  const chineseHome = {
    layout: 'index',
    path: 'index.html',
    permalink: 'https://blog.6yuwei.com/',
  };
  assert.deepEqual(alternateLinks(chineseHome, baseConfig), expectedLinks);

  const simplifiedChineseConfig = { ...baseConfig, language: 'zh-CN', root: '/zh-cn/' };
  const simplifiedChineseHome = {
    layout: 'index',
    path: 'index.html',
    permalink: 'https://blog.6yuwei.com/zh-cn/',
  };
  assert.deepEqual(alternateLinks(simplifiedChineseHome, simplifiedChineseConfig), expectedLinks);

  const englishConfig = { ...baseConfig, language: 'en', root: '/en/' };
  const englishHome = {
    layout: 'index',
    path: 'index.html',
    permalink: 'https://blog.6yuwei.com/en/',
  };
  assert.deepEqual(alternateLinks(englishHome, englishConfig), expectedLinks);
});

test('paired posts advertise only real reciprocal translations', () => {
  const page = {
    layout: 'post',
    permalink: 'https://blog.6yuwei.com/2023/03/05/TypeScript%E5%85%A5%E9%96%80/',
    translations: {
      'zh-CN': '/zh-cn/2023/03/05/what-is-typescript/',
      en: '/en/2023/03/05/what-is-typescript/',
    },
  };

  assert.deepEqual(alternateLinks(page, baseConfig), [
    {
      hreflang: 'zh-TW',
      href: 'https://blog.6yuwei.com/2023/03/05/TypeScript%E5%85%A5%E9%96%80/',
    },
    {
      hreflang: 'zh-CN',
      href: 'https://blog.6yuwei.com/zh-cn/2023/03/05/what-is-typescript/',
    },
    {
      hreflang: 'en',
      href: 'https://blog.6yuwei.com/en/2023/03/05/what-is-typescript/',
    },
    {
      hreflang: 'x-default',
      href: 'https://blog.6yuwei.com/2023/03/05/TypeScript%E5%85%A5%E9%96%80/',
    },
  ]);
});

test('unpaired posts do not claim an alternate translation', () => {
  const page = {
    layout: 'post',
    permalink: 'https://blog.6yuwei.com/2026/08/26/unpaired/',
  };

  assert.deepEqual(alternateLinks(page, baseConfig), []);
  assert.equal(languageSwitchTarget(page, 'zh-CN', baseConfig), '/zh-cn/');
  assert.equal(languageSwitchTarget(page, 'en', baseConfig), '/en/');
});

test('language switch targets a paired post and otherwise falls back to locale home', () => {
  const page = {
    layout: 'post',
    permalink: 'https://blog.6yuwei.com/2023/03/05/typescript/',
    translations: {
      'zh-CN': '/zh-cn/2023/03/05/what-is-typescript/',
      en: '/en/2023/03/05/what-is-typescript/',
    },
  };

  assert.equal(
    languageSwitchTarget(page, 'zh-CN', baseConfig),
    '/zh-cn/2023/03/05/what-is-typescript/',
  );
  assert.equal(
    languageSwitchTarget(page, 'en', baseConfig),
    '/en/2023/03/05/what-is-typescript/',
  );
  assert.equal(languageSwitchTarget(page, 'zh-TW', baseConfig), '/2023/03/05/typescript/');
});
