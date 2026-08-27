'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildMultilingualSite } = require('./build-multilingual');

async function main() {
  const root = path.resolve(__dirname, '..');
  const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-test-output-'));
  const publicDir = path.join(testRoot, 'public');

  try {
    await buildMultilingualSite({
      baseDir: root,
      output: publicDir,
      silent: true,
    });

    const optimizeResult = spawnSync(
      process.execPath,
      ['scripts/optimize-public-images.js', '--public-dir', publicDir],
      {
        cwd: root,
        encoding: 'utf8',
      },
    );

    if (optimizeResult.status !== 0) {
      process.stderr.write(optimizeResult.stdout || '');
      process.stderr.write(optimizeResult.stderr || '');
      process.exitCode = optimizeResult.status || 1;
      return;
    }

    const testFiles = fs.readdirSync(path.join(root, 'test'))
      .filter(file => file.endsWith('.test.mjs'))
      .sort()
      .map(file => path.join('test', file));
    const testResult = spawnSync(process.execPath, ['--test', ...testFiles], {
      cwd: root,
      env: {
        ...process.env,
        BLOG_TEST_PUBLIC_DIR: publicDir,
      },
      stdio: 'inherit',
    });

    process.exitCode = testResult.status || 0;
  } finally {
    fs.rmSync(testRoot, { recursive: true, force: true });
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { main };
