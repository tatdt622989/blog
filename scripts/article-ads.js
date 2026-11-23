'use strict';

const { renderAdSlot, insertMidArticleAd } = require('../lib/article-ads');

function slotFor(theme, position, label) {
  const adsense = (theme && theme.adsense) || {};
  const slots = adsense.slots || {};
  return renderAdSlot({ client: adsense.client, slot: slots[position], position, label });
}

// The real AdSense script loads only on blog.6yuwei.com (see _partial/head.ejs), so these slots stay
// empty on hexo server and other local previews.
hexo.extend.helper.register('article_ad', function (position) {
  return slotFor(this.theme, position, this.__('advertisement'));
});

hexo.extend.helper.register('with_mid_article_ad', function (content) {
  return insertMidArticleAd(content, slotFor(this.theme, 'article', this.__('advertisement')));
});
