'use strict';

// Fixed AdSense slots for posts, sidebar, and post feeds.
// The site's Auto ads no longer place in-page ads, so these slots control in-page ad placement.

const H2_PATTERN = /<h2[\s>]/gi;
const LONG_POST_MIN_H2 = 5;
const LONG_POST_MIN_LENGTH = 9000;

function escapeAttribute(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function wrapperClassFor(position) {
  if (position === 'sidebar') return 'widget site-ad site-ad--sidebar';
  if (position === 'feed') return 'site-ad site-ad--feed';
  return `article-ad article-ad--${position}`;
}

// Returns the ad slot markup, or '' when the client or slot is not configured.
function renderAdSlot({ client, slot, position, label }) {
  if (!client || !slot) return '';
  const inArticle = position === 'article';
  const format = inArticle
    ? 'data-ad-layout="in-article" data-ad-format="fluid"'
    : 'data-ad-format="auto" data-full-width-responsive="true"';
  const style = inArticle ? 'display:block;text-align:center' : 'display:block';
  const wrapperClass = wrapperClassFor(position);
  // The label comes after the ad so CSS can hide it with the unfilled ad (ins + label); the
  // stylesheet shows it above the ad with column-reverse.
  return [
    `<aside class="${wrapperClass}" aria-label="${escapeAttribute(label)}">`,
    `<ins class="adsbygoogle" style="${style}" data-ad-client="${escapeAttribute(client)}" data-ad-slot="${escapeAttribute(slot)}" ${format}></ins>`,
    `<div class="article-ad-label">${escapeAttribute(label)}</div>`,
    '<script>(window.adsbygoogle = window.adsbygoogle || []).push({});</script>',
    '</aside>',
  ].join('');
}

function closestCandidateIndex(candidates, target) {
  let bestIdx = 0;
  let bestDist = Math.abs(candidates[0] - target);
  for (let i = 1; i < candidates.length; i += 1) {
    const dist = Math.abs(candidates[i] - target);
    if (dist < bestDist) {
      bestIdx = i;
      bestDist = dist;
    }
  }
  return bestIdx;
}

// Inserts in-article ad slot(s) before suitable <h2> headings:
// - The first <h2> is always skipped so an ad never sits right under the introduction.
// - Posts with fewer than two <h2> get no in-article ad.
// - Short/medium posts get 1 ad before the <h2> closest to 50% of the body.
// - Long posts (>= 5 <h2> and >= 9000 HTML chars) get up to 2 ads near 33% and 67%, separated by
//   at least one <h2> section so two ads are never adjacent.
function insertMidArticleAd(html, adHtml) {
  if (!html || !adHtml) return html;
  const starts = [];
  for (const match of html.matchAll(H2_PATTERN)) starts.push(match.index);
  const candidates = starts.slice(1);
  if (candidates.length === 0) return html;

  let chosenPositions;
  if (starts.length >= LONG_POST_MIN_H2 && html.length >= LONG_POST_MIN_LENGTH && candidates.length >= 3) {
    const firstIdx = closestCandidateIndex(candidates, html.length / 3);
    const secondIdx = closestCandidateIndex(candidates, (html.length * 2) / 3);
    if (secondIdx - firstIdx >= 2) {
      chosenPositions = [candidates[firstIdx], candidates[secondIdx]];
    } else if (firstIdx + 2 < candidates.length) {
      chosenPositions = [candidates[firstIdx], candidates[firstIdx + 2]];
    } else if (secondIdx - 2 >= 0) {
      chosenPositions = [candidates[secondIdx - 2], candidates[secondIdx]];
    } else {
      const midIdx = closestCandidateIndex(candidates, html.length / 2);
      chosenPositions = [candidates[midIdx]];
    }
  } else {
    const midIdx = closestCandidateIndex(candidates, html.length / 2);
    chosenPositions = [candidates[midIdx]];
  }

  let result = html;
  for (let i = chosenPositions.length - 1; i >= 0; i -= 1) {
    const at = chosenPositions[i];
    result = result.slice(0, at) + adHtml + result.slice(at);
  }
  return result;
}

module.exports = { renderAdSlot, insertMidArticleAd, LONG_POST_MIN_H2, LONG_POST_MIN_LENGTH };
