import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { resolveDevMap, splitTitle } = require('../lib/dev-map.js');

const posts = [
  { key: 'engine-guide', file: '2026-09-09-engine-guide', title: 'Engine guide', path: '2026/09/09/engine/', date: new Date('2026-09-09T12:00:00Z') },
  { key: '', file: '2026-06-15-pixel-assets', title: 'Pixel assets', path: '2026/06/15/pixel/', date: new Date('2026-06-15T12:00:00Z') },
  { key: 'launch-guide', file: '2026-09-23-launch-guide', title: 'Launch guide', path: '2026/09/23/launch/', date: new Date('2026-09-23T12:00:00Z') },
  { key: 'scale-guide', file: '2026-08-24-scale-guide', title: 'Scale guide', path: '2026/08/24/scale/', date: new Date('2026-08-24T12:00:00Z') },
];

const stops = [
  { id: 'plan', label: 'Plan it' },
  { id: 'build', label: 'Build it' },
  { id: 'ship', label: 'Ship it' },
];

function map(overrides = {}) {
  return {
    stops,
    featured: [{ post: 'launch-guide', solves: 'Ship your first build.' }],
    tracks: [{
      id: 'games',
      label: 'Games',
      stages: {
        plan: { note: 'Pick an engine.', items: [{ post: 'engine-guide', solves: 'Choose an engine.' }] },
        build: { note: 'Make assets.', items: [{ post: '2026-06-15-pixel-assets', solves: 'Generate sprites.' }] },
        ship: { note: 'Publish.', items: [{ post: 'launch-guide', solves: 'Submit to stores.' }] },
      },
    }],
    more: [{ post: 'scale-guide', solves: 'Grow the project.' }],
    ...overrides,
  };
}

test('dev map entries resolve by translation key or source file name', () => {
  const resolved = resolveDevMap(map(), posts);
  const [plan, build] = resolved.tracks[0].stages;

  assert.equal(resolved.featured[0].post.title, 'Launch guide');
  assert.equal(resolved.featured[0].solves, 'Ship your first build.');
  assert.equal(plan.items[0].post.path, '2026/09/09/engine/');
  assert.equal(build.items[0].post.title, 'Pixel assets');
  assert.equal(resolved.more[0].post.title, 'Scale guide');
});

test('dev map stages follow the stop order and keep their stop number', () => {
  const resolved = resolveDevMap(map(), posts);

  assert.deepEqual(resolved.tracks[0].stages.map(stage => [stage.stop.id, stage.number, stage.note]), [
    ['plan', 1, 'Pick an engine.'],
    ['build', 2, 'Make assets.'],
    ['ship', 3, 'Publish.'],
  ]);
});

test('dev map tracks skip stops without articles', () => {
  const sparse = map({
    tracks: [{
      id: 'apps',
      label: 'Apps',
      stages: {
        plan: { note: 'Pick tools.', items: [{ post: 'engine-guide', solves: 'Compare tools.' }] },
        build: { note: 'Nothing yet.', items: [] },
        ship: { note: 'Publish.', items: [{ post: 'launch-guide', solves: 'Go live.' }] },
      },
    }],
  });

  assert.deepEqual(resolveDevMap(sparse, posts).tracks[0].stages.map(stage => [stage.stop.id, stage.number]), [
    ['plan', 1],
    ['ship', 3],
  ]);
});

test('dev map counts unique articles per track and overall, and reports the newest article', () => {
  const resolved = resolveDevMap(map(), posts);

  assert.equal(resolved.tracks[0].count, 3);
  assert.equal(resolved.count, 4);
  assert.equal(resolved.latest.toISOString(), '2026-09-23T12:00:00.000Z');
});

test('dev map rejects entries that do not match exactly one article', () => {
  assert.throws(
    () => resolveDevMap(map({ more: [{ post: 'missing-guide', solves: 'Nope.' }] }), posts),
    /missing-guide/,
  );
  assert.throws(
    () => resolveDevMap(map({ more: [{ post: '2026-06-15', solves: 'Partial names are ambiguous.' }] }), posts),
    /2026-06-15/,
  );
});

test('page titles split after the first colon into a headline and a subtitle', () => {
  assert.deepEqual(splitTitle('用 AI 做出你的第一個 App：從點子到上線'), ['用 AI 做出你的第一個 App：', '從點子到上線']);
  assert.deepEqual(splitTitle('Build Your First App with AI: A Map from Idea to Launch'), ['Build Your First App with AI:', 'A Map from Idea to Launch']);
  assert.deepEqual(splitTitle('No subtitle here'), ['No subtitle here', '']);
});

test('dev map lists each article once in page order for structured data', () => {
  const resolved = resolveDevMap(map(), posts);

  assert.deepEqual(resolved.posts.map(post => post.title), ['Launch guide', 'Engine guide', 'Pixel assets', 'Scale guide']);
});
