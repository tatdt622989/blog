'use strict';

hexo.extend.generator.register('taxonomy-directories', function () {
  return ['tags', 'categories'].map(kind => ({
    path: `${kind}/index.html`,
    layout: 'taxonomy',
    data: { taxonomy_index: kind },
  }));
});

hexo.extend.helper.register('taxonomy_items', function (kind) {
  const items = [];
  this.site[kind].each(item => {
    const count = item.posts.length;
    if (count) items.push({ name: item.name, path: item.path, count });
  });
  const collator = new Intl.Collator(this.config.language);
  return items.sort((a, b) => b.count - a.count || collator.compare(a.name, b.name));
});
