'use strict';

// Resolves a dev map definition (page front matter) against the site's posts.
// Entries reference a post by translation_key or by its source file name without
// the .md extension, so posts that only exist in one locale can still be listed.

function findPost(ref, posts) {
  const matches = posts.filter(post => (post.key && post.key === ref) || post.file === ref);

  if (matches.length !== 1) {
    throw new Error(`Dev map entry "${ref}" matched ${matches.length} posts; expected exactly one`);
  }

  return matches[0];
}

function resolveEntries(entries = [], posts, used) {
  return entries.map(entry => {
    const post = findPost(entry.post, posts);
    used.add(post);

    return { post, solves: entry.solves };
  });
}

function resolveDevMap(map, posts) {
  const used = new Set();
  const featured = resolveEntries(map.featured, posts, used);

  const tracks = (map.tracks || []).map(track => {
    const trackPosts = new Set();
    const stages = (map.stops || []).flatMap((stop, index) => {
      const stage = track.stages?.[stop.id];
      if (!stage?.items?.length) return [];

      const items = resolveEntries(stage.items, posts, used);
      items.forEach(item => trackPosts.add(item.post));

      return [{ stop, number: index + 1, note: stage.note, items }];
    });

    return { id: track.id, label: track.label, count: trackPosts.size, stages };
  });

  const more = resolveEntries(map.more, posts, used);
  const latest = [...used].reduce((newest, post) => (
    !newest || post.date.valueOf() > newest.valueOf() ? post.date : newest
  ), null);

  return { featured, tracks, more, posts: [...used], count: used.size, latest };
}

function splitTitle(title) {
  const match = String(title).match(/^(.+?[：:])\s*(.+)$/);

  return match ? [match[1], match[2]] : [String(title), ''];
}

module.exports = { resolveDevMap, splitTitle };
