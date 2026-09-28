'use strict';

const { stripHTML, unescapeHTML } = require('hexo-util');

function xml(value) {
  return String(value || '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function buildRss(posts, config) {
  const home = config.url.replace(/\/$/, '') + '/';
  const feedUrl = new URL(config.feed.path, home).href;
  const visible = posts.filter(post => !post.hidden && !post.hide && post.published !== false)
    .sort((a, b) => Number(b.date) - Number(a.date))
    .slice(0, config.feed.limit || 20);
  const items = visible.map(post => {
    const summary = post.description || unescapeHTML(stripHTML(post.excerpt || '')).replace(/\s+/g, ' ').trim();
    return `<item><title>${xml(post.title)}</title><link>${xml(post.permalink)}</link>`
      + `<guid isPermaLink="true">${xml(post.permalink)}</guid>`
      + `<pubDate>${new Date(Number(post.date)).toUTCString()}</pubDate>`
      + `<description>${xml(summary)}</description></item>`;
  }).join('\n');
  const updated = visible.map(p => Number(p.updated || p.date)).filter(Number.isFinite);
  const lastBuildDate = updated.length ? `<lastBuildDate>${new Date(Math.max(...updated)).toUTCString()}</lastBuildDate>` : '';
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${xml(config.title)}</title><link>${xml(home)}</link>
<description>${xml(config.description)}</description><language>${xml(config.language)}</language>
<atom:link href="${xml(feedUrl)}" rel="self" type="application/rss+xml"/>
${lastBuildDate}
${items}
</channel></rss>\n`;
}

module.exports = { buildRss };
