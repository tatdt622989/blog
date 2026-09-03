'use strict';

const { getRelatedPosts } = require('../lib/related-posts');
const { loadRecentTraffic } = require('../lib/traffic-loader');

let cachedTrafficMap = null;

hexo.extend.helper.register('get_related_posts', function (currentPost, limit = 3) {
  if (cachedTrafficMap === null) {
    cachedTrafficMap = loadRecentTraffic({ projectRoot: hexo.base_dir });
  }

  const allPosts = this.site && this.site.posts ? this.site.posts : [];
  return getRelatedPosts(currentPost, allPosts, { limit, trafficMap: cachedTrafficMap });
});
