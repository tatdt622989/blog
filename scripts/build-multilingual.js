'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const Hexo = require('hexo');
const {
  normalizeSitemapCanonicalUrls,
  normalizeSitemapHomeXml,
  writeSitemapIndex,
} = require('../lib/sitemap-index');

const SITEMAP_PATHS = ['/sitemap-zh-TW.xml', '/en/sitemap.xml'];

function parseArguments(argv) {
  const options = {
    output: null,
    silent: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--output') {
      const output = argv[index + 1];
      if (!output || output.startsWith('--')) {
        throw new Error('--output requires a directory path');
      }
      options.output = output;
      index += 1;
    } else if (argument === '--silent') {
      options.silent = true;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  return options;
}

async function generateSite(baseDir, configPaths, stateDir, silent) {
  fs.mkdirSync(stateDir, { recursive: true });

  const hexo = new Hexo(baseDir, {
    config: configPaths.join(','),
    output: stateDir,
    silent,
  });

  try {
    await hexo.init();
    await hexo.call('generate', { bail: true });
  } finally {
    await hexo.exit();
  }
}

function writeOutputOverride(filePath, publicDir) {
  fs.writeFileSync(filePath, JSON.stringify({ public_dir: publicDir }, null, 2));
}

async function buildMultilingualSite(options = {}) {
  const baseDir = path.resolve(options.baseDir || path.join(__dirname, '..'));
  const outputDir = path.resolve(baseDir, options.output || 'public');
  const stateRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-hexo-state-'));
  const chineseOverride = path.join(stateRoot, 'zh-TW-output.json');
  const englishOverride = path.join(stateRoot, 'en-output.json');

  writeOutputOverride(chineseOverride, outputDir);
  writeOutputOverride(englishOverride, path.join(outputDir, 'en'));

  try {
    await generateSite(
      baseDir,
      [path.join(baseDir, '_config.yml'), chineseOverride],
      path.join(stateRoot, 'zh-TW-state'),
      options.silent,
    );
    await generateSite(
      baseDir,
      [path.join(baseDir, '_config.yml'), path.join(baseDir, '_config.en.yml'), englishOverride],
      path.join(stateRoot, 'en-state'),
      options.silent,
    );

    const chineseSitemapPath = path.join(outputDir, 'sitemap-zh-TW.xml');
    const chineseSitemap = fs.readFileSync(chineseSitemapPath, 'utf8');
    fs.writeFileSync(
      chineseSitemapPath,
      normalizeSitemapCanonicalUrls(chineseSitemap),
    );

    const englishSitemapPath = path.join(outputDir, 'en', 'sitemap.xml');
    const englishSitemap = fs.readFileSync(englishSitemapPath, 'utf8');
    fs.writeFileSync(
      englishSitemapPath,
      normalizeSitemapCanonicalUrls(
        normalizeSitemapHomeXml(englishSitemap, 'https://blog.6yuwei.com/en/'),
      ),
    );

    writeSitemapIndex(outputDir, 'https://blog.6yuwei.com', SITEMAP_PATHS);
  } finally {
    fs.rmSync(stateRoot, { recursive: true, force: true });
  }

  return outputDir;
}

async function main() {
  try {
    const options = parseArguments(process.argv.slice(2));
    await buildMultilingualSite(options);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  SITEMAP_PATHS,
  buildMultilingualSite,
  generateSite,
  parseArguments,
};
