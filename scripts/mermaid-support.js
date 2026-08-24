'use strict';

// 註冊 mermaid Tag Plugin: {% mermaid %} ... {% endmermaid %}
hexo.extend.tag.register('mermaid', function(args, content) {
  return `<pre class="mermaid">${content.trim()}</pre>`;
}, { ends: true });

// 在 Markdown 渲染前，將 ```mermaid ... ``` 轉為 raw pre.mermaid 標籤，防止被 highlight.js 破壞
hexo.extend.filter.register('before_post_render', function(data) {
  if (!data.content) return data;

  data.content = data.content.replace(/```mermaid\s*\n([\s\S]*?)\n```/g, function(match, code) {
    return `{% raw %}<pre class="mermaid">\n${code.trim()}\n</pre>{% endraw %}`;
  });

  return data;
}, 9);
