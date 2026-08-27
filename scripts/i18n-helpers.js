'use strict';

const i18n = require('../lib/i18n');

hexo.extend.helper.register('current_locale', function currentLocale() {
  return i18n.normalizeLocale(this.config.language);
});

hexo.extend.helper.register('absolute_site_url', function absoluteSiteUrl(pathname) {
  return i18n.absoluteSiteUrl(pathname, this.config);
});

hexo.extend.helper.register('page_alternate_links', function pageAlternateLinks(page) {
  return i18n.alternateLinks(page, this.config);
});

hexo.extend.helper.register('language_switch_url', function languageSwitchUrl(page, locale) {
  return i18n.languageSwitchTarget(page, locale, this.config);
});

hexo.extend.helper.register('og_locale', function ogLocale(locale) {
  return i18n.openGraphLocale(locale || this.config.language);
});
