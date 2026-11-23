'use strict';

// Fixed AdSense slots for article pages: one in the middle of the post, one after it.
// The site's Auto ads no longer place in-page ads, so these two are the only ads inside posts.

const H2_PATTERN = /<h2[\s>]/gi;

function escapeAttribute(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

// Returns the ad slot markup, or '' when the client or slot is not configured.
function renderAdSlot({ client, slot, position, label }) {
  if (!client || !slot) return '';
  const inArticle = position === 'article';
  const format = inArticle
    ? 'data-ad-layout="in-article" data-ad-format="fluid"'
    : 'data-ad-format="auto" data-full-width-responsive="true"';
  const style = inArticle ? 'display:block;text-align:center' : 'display:block';
  // The label comes after the ad so CSS can hide it with the unfilled ad (ins + label); the
  // stylesheet shows it above the ad with column-reverse.
  return [
    `<aside class="article-ad article-ad--${position}" aria-label="${escapeAttribute(label)}">`,
    `<ins class="adsbygoogle" style="${style}" data-ad-client="${escapeAttribute(client)}" data-ad-slot="${escapeAttribute(slot)}" ${format}></ins>`,
    `<div class="article-ad-label">${escapeAttribute(label)}</div>`,
    '<script>(window.adsbygoogle = window.adsbygoogle || []).push({});</script>',
    '</aside>',
  ].join('');
}

// Puts adHtml before the <h2> closest to the middle of the post. The first <h2> is skipped so the
// ad never sits right under the introduction. Posts with fewer than two <h2> get no middle ad.
function insertMidArticleAd(html, adHtml) {
  if (!html || !adHtml) return html;
  const starts = [];
  for (const match of html.matchAll(H2_PATTERN)) starts.push(match.index);
  const candidates = starts.slice(1);
  if (candidates.length === 0) return html;

  const middle = html.length / 2;
  const at = candidates.reduce((best, index) => (Math.abs(index - middle) < Math.abs(best - middle) ? index : best));
  return html.slice(0, at) + adHtml + html.slice(at);
}

module.exports = { renderAdSlot, insertMidArticleAd };
