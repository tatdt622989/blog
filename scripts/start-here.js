'use strict';

const GUIDES = [
  ['claude-codex-usage-limits', 'quota'],
  ['aseprite-install-guide', 'aseprite'],
  ['gpt-6-game-engines-guide', 'games'],
  ['vibe-coding-app-store-google-play-guide', 'publish'],
];

hexo.extend.helper.register('start_here_guides', function () {
  const posts = this.site.posts.toArray();
  return GUIDES.map(([key, label]) => {
    const post = posts.find(p => p.translation_key === key && !p.hidden && !p.hide && p.published !== false);
    return post ? { key, label, path: post.path } : null;
  }).filter(Boolean);
});
