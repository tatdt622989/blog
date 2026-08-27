import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { resolvePublicDir } = require('../scripts/optimize-public-images.js');

test('image optimizer accepts an explicit isolated public directory', () => {
  assert.equal(
    resolvePublicDir(['--public-dir', '/private/tmp/blog-output'], {}, process.cwd()),
    '/private/tmp/blog-output',
  );
});

test('image optimizer accepts the test public directory environment variable', () => {
  assert.equal(
    resolvePublicDir([], { BLOG_TEST_PUBLIC_DIR: 'build/public' }, '/private/tmp/project'),
    path.join('/private/tmp/project', 'build/public'),
  );
});

test('image optimizer rejects a missing public directory argument', () => {
  assert.throws(
    () => resolvePublicDir(['--public-dir'], {}, process.cwd()),
    /--public-dir requires a directory path/,
  );
});

test('loading the optimizer as a Hexo script ignores another command CLI arguments', () => {
  const scriptPath = path.join(process.cwd(), 'scripts/optimize-public-images.js');
  const result = spawnSync(process.execPath, [
    '-e',
    `process.argv = ['node', 'hexo', '--output', '/tmp/site']; require(${JSON.stringify(scriptPath)});`,
  ], { encoding: 'utf8' });

  assert.equal(result.status, 0, result.stderr);
});
