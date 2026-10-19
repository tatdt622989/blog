// Submit recently updated URLs to IndexNow (Bing, Yandex, etc.) after a deploy.
// Usage: node tools/indexnow.mjs [--days 2] [--dry-run]
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://blog.6yuwei.com';
const KEY = 'ad5115c3a76348d4c70341825d4ce736';
const SITEMAPS = ['sitemap-zh-TW.xml', 'en/sitemap.xml', 'zh-cn/sitemap.xml'];

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const daysIndex = args.indexOf('--days');
const days = daysIndex !== -1 ? Number(args[daysIndex + 1]) : 2;
const publicDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'public');
const since = Date.now() - days * 86400000;

const urls = new Set();
for (const sitemap of SITEMAPS) {
  const file = path.join(publicDir, sitemap);
  if (!fs.existsSync(file)) continue;
  const xml = fs.readFileSync(file, 'utf8');
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    // Only posts: tag, category and index pages get a fresh lastmod on every build.
    if (!loc || !/\/\d{4}\/\d{2}\/\d{2}\//.test(loc)) continue;
    if (lastmod && Date.parse(lastmod) >= since) urls.add(loc.trim());
  }
}

const urlList = [...urls].slice(0, 10000);
console.log(`IndexNow: ${urlList.length} URLs updated in the last ${days} day(s).`);
if (!urlList.length || dryRun) {
  urlList.forEach((url) => console.log(`  ${url}`));
  process.exit(0);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});
console.log(`IndexNow response: ${response.status} ${response.statusText}`);
if (!response.ok && response.status !== 202) process.exit(1);
