import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const customJsPath = path.join(root, 'themes/light/source/js/custom.js');
const customJs = fs.readFileSync(customJsPath, 'utf8');

test('custom.js defines a safe trackGAEvent helper with gtag check', () => {
  assert.match(
    customJs,
    /function trackGAEvent\s*\(\s*eventName\s*,\s*params\s*\)\s*\{[\s\S]*?typeof window\.gtag === 'function'[\s\S]*?window\.gtag\('event',\s*eventName,\s*params\);/,
    'must safely guard against missing gtag and invoke window.gtag with event name and params'
  );
});

test('custom.js tracks search modal opening with trigger_type', () => {
  assert.match(
    customJs,
    /trackGAEvent\('search_modal_open',\s*\{[\s\S]*?trigger_type:\s*triggerType/,
    'search modal open must emit search_modal_open event'
  );
  assert.match(customJs, /openModal\('shortcut'\)/, 'shortcut trigger must pass "shortcut"');
  assert.match(customJs, /openModal\('click'\)/, 'click trigger must pass "click"');
});

test('custom.js tracks search queries with debounced GA search event', () => {
  assert.match(
    customJs,
    /trackGAEvent\('search',\s*\{[\s\S]*?search_term:\s*trimmed[\s\S]*?results_count:\s*matches\.length/,
    'search query must emit GA standard search event with search_term and results_count'
  );
});

test('custom.js tracks search result selection via select_content', () => {
  assert.match(
    customJs,
    /trackGAEvent\('select_content',\s*\{[\s\S]*?content_type:\s*'search_result'[\s\S]*?item_id:\s*targetUrl[\s\S]*?item_name:\s*targetTitle/,
    'clicking a search result must emit select_content with search_result and post details'
  );
});

test('custom.js tracks code block copy via copy_code event', () => {
  assert.match(
    customJs,
    /trackGAEvent\('copy_code',\s*\{[\s\S]*?code_language:\s*langClass[\s\S]*?code_length:\s*codeText\.length/,
    'clicking code copy must emit copy_code with language and snippet length'
  );
});

test('custom.js tracks social shares and copy link via share event', () => {
  assert.match(
    customJs,
    /trackGAEvent\('share',\s*\{[\s\S]*?method:\s*'copy_link'[\s\S]*?content_type:\s*'article'/,
    'copying link in share box must emit share event with method copy_link'
  );
  assert.match(
    customJs,
    /trackGAEvent\('share',\s*\{[\s\S]*?method:\s*'wechat'[\s\S]*?content_type:\s*'article'/,
    'wechat button must emit share event with method wechat'
  );
  assert.match(
    customJs,
    /trackGAEvent\('share',\s*\{[\s\S]*?method:\s*'native_share'[\s\S]*?content_type:\s*'article'/,
    'native share button must emit share event with method native_share'
  );
  assert.match(
    customJs,
    /trackGAEvent\('share',\s*\{[\s\S]*?method:\s*method[\s\S]*?content_type:\s*'article'[\s\S]*?locale:\s*locale/,
    'third-party share links must emit share event with mapped method and locale'
  );
});

test('custom.js tracks table of contents interaction and anchor copy', () => {
  assert.match(
    customJs,
    /trackGAEvent\('select_content',\s*\{[\s\S]*?content_type:\s*'toc_heading'[\s\S]*?item_id:\s*heading\.id/,
    'clicking TOC heading must emit select_content with toc_heading'
  );
  assert.match(
    customJs,
    /trackGAEvent\('copy_heading_link',\s*\{[\s\S]*?item_id:\s*heading\.id/,
    'clicking heading # anchor copy must emit copy_heading_link'
  );
});

test('custom.js tracks Japanese speech synthesis audio playback', () => {
  assert.match(
    customJs,
    /trackGAEvent\('play_tts',\s*\{[\s\S]*?text:\s*text/,
    'clicking speak button must emit play_tts event'
  );
});
