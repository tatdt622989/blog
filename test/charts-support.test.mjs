import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  parseChartConfig,
  renderChartBlock,
  transformChartCodeBlocks,
} = require('../lib/blog-charts');

const output = process.env.BLOG_TEST_PUBLIC_DIR || path.resolve('public');

test('parseChartConfig validates supported types and rejects malformed configs', () => {
  const validLine = parseChartConfig(JSON.stringify({
    type: 'line',
    title: 'Cost Curve',
    datasets: [{ label: 'GOAT', data: [{ x: 120, y: 100 }] }],
  }));
  assert.equal(validLine.type, 'line');

  const validRange = parseChartConfig(JSON.stringify({
    type: 'range',
    title: 'Optimal Range',
    segments: [{ label: 'Go', weight: 20 }],
  }));
  assert.equal(validRange.type, 'range');

  assert.throws(() => parseChartConfig('{bad json'), /Invalid JSON/);
  assert.throws(() => parseChartConfig(JSON.stringify({ type: 'unknown', datasets: [{}] })), /Unsupported chart type/);
  assert.throws(() => parseChartConfig(JSON.stringify({ type: 'bar', datasets: [] })), /non-empty "datasets"/);
  assert.throws(() => parseChartConfig(JSON.stringify({ type: 'range', segments: [] })), /non-empty "segments"/);
});

test('renderChartBlock emits safe semantic figure markup and escapes script-closing sequences', () => {
  const html = renderChartBlock(JSON.stringify({
    type: 'bar',
    title: 'Fee <script>alert(1)</script>',
    subtitle: 'USD per month',
    labels: ['Go', 'GOAT'],
    datasets: [{ label: 'Fee', data: [1, 10] }],
  }));

  assert.match(html, /class="blog-chart blog-chart--bar"/);
  assert.match(html, /data-chart-engine="chartjs"/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
  assert.match(html, /<script type="application\/json" class="blog-chart-config">/);
  assert.match(html, /<canvas class="blog-chart__canvas"/);
});

test('transformChartCodeBlocks wraps fenced chart blocks in Hexo raw tags', () => {
  const md = [
    'Before',
    '',
    '```chart',
    '{"type":"range","title":"Demo","segments":[{"label":"Go","weight":1}]}',
    '```',
    '',
    'After',
  ].join('\n');

  const out = transformChartCodeBlocks(md);
  assert.match(out, /\{% raw %}<figure class="blog-chart blog-chart--range"/);
  assert.match(out, /<\/figure>\{% endraw %}/);
  assert.doesNotMatch(out, /```chart/);
});

test('built multilingual Command Code posts render native programmatic charts and bundle blog-charts.js', () => {
  const jsAsset = path.join(output, 'js/blog-charts.js');
  assert.ok(fs.existsSync(jsAsset), 'theme js/blog-charts.js should be copied into built output');

  const builtPosts = [
    '2026/11/26/Command-Code-方案性價比分析/index.html',
    'zh-cn/2026/11/26/command-code-go-goat-moat-pricing-analysis/index.html',
    'en/2026/11/26/command-code-go-goat-moat-pricing-analysis/index.html',
  ];

  for (const rel of builtPosts) {
    const html = fs.readFileSync(path.join(output, rel), 'utf8');
    const chartCount = (html.match(/class="blog-chart blog-chart--/g) || []).length;
    assert.ok(chartCount >= 5, `${rel} should render at least 5 native programmatic charts (found ${chartCount})`);
    assert.match(html, /data-chart-engine="range"/, `${rel} should include native SVG range diagram`);
    assert.match(html, /data-chart-engine="chartjs"/, `${rel} should include Chart.js bar/line charts`);
    assert.match(html, /js\/blog-charts\.js/, `${rel} should include lazy loader for blog-charts.js`);
    assert.doesNotMatch(html, /chart-plan-comparison\.png/, `${rel} should no longer depend on static chart PNGs`);
  }
});
