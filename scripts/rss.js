'use strict';

const { buildRss } = require('../lib/rss');

hexo.extend.generator.register('rss', function (locals) {
  if (!this.config.feed) return [];
  return {
    path: this.config.feed.path,
    data: buildRss(locals.posts.toArray(), this.config),
  };
});
