'use strict';

const ALLOWED_TYPES = new Set([
  'bar',
  'line',
  'range',
  'doughnut',
  'pie',
  'radar',
  'scatter',
]);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function serializeSafeJson(obj) {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function parseChartConfig(rawJson) {
  const source = String(rawJson || '').trim();
  if (!source) {
    throw new Error('Chart block cannot be empty.');
  }

  let parsed;
  try {
    parsed = JSON.parse(source);
  } catch (err) {
    throw new Error(`Invalid JSON inside chart block: ${err.message}`);
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Chart configuration must be a JSON object.');
  }

  const type = String(parsed.type || '').trim().toLowerCase();
  if (!ALLOWED_TYPES.has(type)) {
    throw new Error(
      `Unsupported chart type "${parsed.type}". Allowed: ${[...ALLOWED_TYPES].join(', ')}`,
    );
  }

  if (type === 'range') {
    if (!Array.isArray(parsed.segments) || parsed.segments.length === 0) {
      throw new Error('Range chart requires a non-empty "segments" array.');
    }
  } else if (!Array.isArray(parsed.datasets) || parsed.datasets.length === 0) {
    throw new Error(`Chart type "${type}" requires a non-empty "datasets" array.`);
  }

  return {
    ...parsed,
    type,
  };
}

function renderChartBlock(rawJson) {
  const config = parseChartConfig(rawJson);
  const engine = config.type === 'range' ? 'range' : 'chartjs';
  const title = config.title ? String(config.title).trim() : '';
  const subtitle = config.subtitle ? String(config.subtitle).trim() : '';
  const note = config.note ? String(config.note).trim() : '';
  const ariaLabel = escapeHtml(config.ariaLabel || title || `${config.type} chart`);
  const height = Number.isFinite(Number(config.height))
    ? Math.max(180, Math.min(720, Number(config.height)))
    : (config.type === 'range' ? 220 : 340);

  const headerHtml = (title || subtitle)
    ? [
        '<div class="blog-chart__header">',
        title ? `<div class="blog-chart__title">${escapeHtml(title)}</div>` : '',
        subtitle ? `<div class="blog-chart__subtitle">${escapeHtml(subtitle)}</div>` : '',
        '</div>',
      ].filter(Boolean).join('')
    : '';

  const bodyHtml = engine === 'range'
    ? '<div class="blog-chart__range-wrap"></div>'
    : `<div class="blog-chart__canvas-wrap" style="--chart-height:${height}px"><canvas class="blog-chart__canvas" role="img" aria-label="${ariaLabel}"></canvas></div>`;

  const noteHtml = note
    ? `<figcaption class="blog-chart__note">${escapeHtml(note)}</figcaption>`
    : '';

  const fallbackText = escapeHtml(title || 'Interactive chart (enable JavaScript to view)');

  return [
    `<figure class="blog-chart blog-chart--${config.type}" data-chart-engine="${engine}" data-chart-type="${config.type}" aria-label="${ariaLabel}">`,
    headerHtml,
    bodyHtml,
    noteHtml,
    `<script type="application/json" class="blog-chart-config">${serializeSafeJson(config)}</script>`,
    `<noscript><p class="blog-chart__fallback">${fallbackText}</p></noscript>`,
    '</figure>',
  ].filter(Boolean).join('');
}

function transformChartCodeBlocks(content) {
  if (!content || typeof content !== 'string') return content;

  return content.replace(/```chart\s*\n([\s\S]*?)\n```/g, function replaceChartBlock(match, code) {
    return `{% raw %}${renderChartBlock(code)}{% endraw %}`;
  });
}

module.exports = {
  ALLOWED_TYPES,
  parseChartConfig,
  renderChartBlock,
  transformChartCodeBlocks,
};
