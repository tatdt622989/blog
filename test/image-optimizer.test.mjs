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

test('responsive covers keep a sizes hint chosen by the template', async () => {
  const fs = await import('node:fs');
  const os = await import('node:os');
  const publicDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-optimizer-sizes-'));

  try {
    const cover = path.join(process.cwd(), 'source/_posts/2026-09-09-GPT-6-做遊戲用什麼引擎？Godot、Unity、Unreal-與網頁遊戲工具怎麼選/cover.jpg');
    const width = spawnSync('sips', ['-g', 'pixelWidth', cover], { encoding: 'utf8' }).stdout.match(/pixelWidth: (\d+)/)[1];
    fs.mkdirSync(path.join(publicDir, 'img'));
    fs.copyFileSync(cover, path.join(publicDir, 'img/card.jpg'));
    fs.writeFileSync(
      path.join(publicDir, 'index.html'),
      `<img class="post-cover-image" src="/img/card.jpg" width="${width}" height="1" sizes="(max-width: 720px) 112px, 300px">`,
    );

    const result = spawnSync(process.execPath, ['scripts/optimize-public-images.js', '--public-dir', publicDir], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);

    const html = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
    assert.match(html, /srcset="[^"]*card-card-480\.jpg/);
    assert.match(html, /sizes="\(max-width: 720px\) 112px, 300px"/);
  } finally {
    fs.rmSync(publicDir, { recursive: true, force: true });
  }
});

test('a stale page that already points at a cover variant does not create nested variants', async () => {
  const fs = await import('node:fs');
  const os = await import('node:os');
  const publicDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-optimizer-stale-'));

  try {
    const cover = path.join(process.cwd(), 'source/_posts/2026-09-09-GPT-6-做遊戲用什麼引擎？Godot、Unity、Unreal-與網頁遊戲工具怎麼選/cover.jpg');
    const width = spawnSync('sips', ['-g', 'pixelWidth', cover], { encoding: 'utf8' }).stdout.match(/pixelWidth: (\d+)/)[1];
    fs.mkdirSync(path.join(publicDir, 'post'));
    fs.copyFileSync(cover, path.join(publicDir, 'post/cover.jpg'));
    fs.copyFileSync(cover, path.join(publicDir, 'post/cover-card-720.jpg'));
    fs.writeFileSync(
      path.join(publicDir, 'post/index.html'),
      `<img class="post-cover-image" src="/post/cover-card-720.jpg?v=old" width="${width}" height="1">`,
    );

    for (let run = 0; run < 2; run += 1) {
      const result = spawnSync(process.execPath, ['scripts/optimize-public-images.js', '--public-dir', publicDir], { encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
    }

    const files = fs.readdirSync(path.join(publicDir, 'post'));
    assert.deepEqual(files.filter((file) => /-card-\d+-card-/.test(file)), []);
    const html = fs.readFileSync(path.join(publicDir, 'post/index.html'), 'utf8');
    assert.match(html, /src="\/post\/cover-card-720\.jpg\?v=/);
    assert.match(html, /srcset="[^"]*\/post\/cover\.jpg\?v=[^"]* \d+w"/);
  } finally {
    fs.rmSync(publicDir, { recursive: true, force: true });
  }
});
