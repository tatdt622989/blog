'use strict';

const { wrapDataTables } = require('../lib/responsive-tables');

hexo.extend.filter.register('after_post_render', function responsiveTables(data) {
  const __ = hexo.theme.i18n.__(hexo.config.language);
  data.content = wrapDataTables(data.content, __('table_scroll_label'));
  data.excerpt = wrapDataTables(data.excerpt, __('table_scroll_label'));
  return data;
});
