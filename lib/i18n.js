'use strict';

const DEFAULT_LOCALE = 'zh-TW';

function normalizeLocale(value) {
  const locale = Array.isArray(value) ? value[0] : value;

  return String(locale || '').trim() || DEFAULT_LOCALE;
}

function normalizePath(pathname, fallback = '/') {
  const value = String(pathname || fallback).trim() || fallback;
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;

  return withLeadingSlash === '/' || withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

function localeHomePath(locale, config = {}) {
  const normalizedLocale = normalizeLocale(locale);
  const configuredPath = config.i18n?.locales?.[normalizedLocale];

  if (configuredPath) return normalizePath(configuredPath);
  if (normalizedLocale === normalizeLocale(config.language)) return normalizePath(config.root);

  return normalizedLocale === DEFAULT_LOCALE ? '/' : `/${normalizedLocale}/`;
}

function siteOrigin(config = {}) {
  const configuredUrl = String(config.url || '').trim();

  if (!configuredUrl) return '';

  try {
    return new URL(configuredUrl).origin;
  } catch {
    return configuredUrl.replace(/\/+$/, '');
  }
}

function absoluteSiteUrl(pathname, config = {}) {
  const value = String(pathname || '/').trim() || '/';

  if (/^https?:\/\//i.test(value)) return value;

  const origin = siteOrigin(config);
  const normalizedPath = value.startsWith('/') ? value : `/${value}`;

  return origin ? new URL(normalizedPath, `${origin}/`).href : normalizedPath;
}

function openGraphLocale(locale) {
  return normalizeLocale(locale) === 'en' ? 'en_US' : 'zh_TW';
}

function isHomepage(page = {}) {
  if (Number(page.current || 1) > 1) return false;

  return (
    (!page.path || page.path === 'index.html') &&
    page.layout !== 'post' &&
    !page.archive &&
    !page.category &&
    !page.tag
  );
}

function alternateLinks(page = {}, config = {}) {
  const localePaths = config.i18n?.locales || {
    [DEFAULT_LOCALE]: '/',
    en: '/en/',
  };

  if (isHomepage(page)) {
    const links = Object.keys(localePaths).map(locale => ({
      hreflang: locale,
      href: absoluteSiteUrl(localeHomePath(locale, config), config),
    }));
    const defaultLocale = normalizeLocale(config.i18n?.default_locale);
    const defaultLink = links.find(link => link.hreflang === defaultLocale);

    if (defaultLink && links.length > 1) {
      links.push({ hreflang: 'x-default', href: defaultLink.href });
    }

    return links;
  }

  if (page.layout !== 'post' || !page.translations) return [];

  const currentLocale = normalizeLocale(config.language);
  const byLocale = {
    [currentLocale]: absoluteSiteUrl(page.permalink || page.path, config),
  };

  for (const [locale, pathname] of Object.entries(page.translations)) {
    if (pathname) byLocale[locale] = absoluteSiteUrl(pathname, config);
  }

  const supportedLocales = Object.keys(localePaths);
  if (!supportedLocales.every(locale => byLocale[locale])) return [];

  const links = supportedLocales.map(locale => ({
    hreflang: locale,
    href: byLocale[locale],
  }));
  const defaultLocale = normalizeLocale(config.i18n?.default_locale);

  links.push({
    hreflang: 'x-default',
    href: byLocale[defaultLocale],
  });

  return links;
}

function pathnameFromUrl(value) {
  try {
    const url = new URL(value);

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return value;
  }
}

function languageSwitchTarget(page = {}, targetLocale, config = {}) {
  const normalizedTarget = normalizeLocale(targetLocale);
  const currentLocale = normalizeLocale(config.language);

  if (normalizedTarget === currentLocale && page.permalink) {
    return pathnameFromUrl(page.permalink);
  }

  if (page.layout === 'post' && page.translations?.[normalizedTarget]) {
    return page.translations[normalizedTarget];
  }

  return localeHomePath(normalizedTarget, config);
}

module.exports = {
  absoluteSiteUrl,
  alternateLinks,
  isHomepage,
  languageSwitchTarget,
  localeHomePath,
  normalizeLocale,
  openGraphLocale,
  siteOrigin,
};
