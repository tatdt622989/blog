'use strict';

const { renderChartBlock, transformChartCodeBlocks } = require('../lib/blog-charts');

// 註冊 chart Tag Plugin: {% chart %} ... {% endchart %}
hexo.extend.tag.register('chart', function chartTag(args, content) {
  return renderChartBlock(content);
}, { ends: true });

// 在 Markdown 渲染前，將 ```chart ... ``` 轉為安全的互動圖表容器，避免被 highlight.js 破壞
hexo.extend.filter.register('before_post_render', function chartFilter(data) {
  if (!data || !data.content) return data;
  data.content = transformChartCodeBlocks(data.content);
  return data;
}, 9);
