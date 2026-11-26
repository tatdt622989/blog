(function () {
  'use strict';

  var CHARTJS_CDN = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js';
  var DEFAULT_PALETTE = [
    '#2563eb',
    '#059669',
    '#ea580c',
    '#d97706',
    '#7c3aed',
    '#0284c7',
    '#dc2626',
    '#64748b',
  ];

  function parseConfig(figure) {
    var script = figure.querySelector('script.blog-chart-config');
    if (!script) return null;
    try {
      return JSON.parse(script.textContent || '{}');
    } catch (err) {
      console.error('Blog chart JSON parse error:', err);
      return null;
    }
  }

  function formatNumber(val, opts) {
    if (val === null || val === undefined || isNaN(Number(val))) return '';
    var num = Number(val);
    var prefix = (opts && opts.prefix) || '';
    var suffix = (opts && opts.suffix) || '';
    var showPlus = Boolean(opts && opts.showPlus);
    var decimals = opts && typeof opts.decimals === 'number' ? opts.decimals : null;

    var absNum = Math.abs(num);
    var formatted;
    if (decimals !== null) {
      formatted = absNum.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    } else if (Math.abs(absNum - Math.round(absNum)) < 1e-6) {
      formatted = Math.round(absNum).toLocaleString('en-US');
    } else {
      formatted = Number(absNum.toFixed(2)).toLocaleString('en-US');
    }

    var sign = num < 0 ? '-' : (showPlus && num > 0 ? '+' : '');
    return sign + prefix + formatted + suffix;
  }

  function createSvgEl(tag, attrs, textContent) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        el.setAttribute(key, String(attrs[key]));
      });
    }
    if (textContent !== undefined && textContent !== null) {
      el.textContent = String(textContent);
    }
    return el;
  }

  function renderRangeChart(figure, config) {
    var wrap = figure.querySelector('.blog-chart__range-wrap');
    if (!wrap || !Array.isArray(config.segments) || !config.segments.length) return;

    var segments = config.segments;
    var ticks = Array.isArray(config.ticks) ? config.ticks : [];
    var hasCallout = segments.some(function (seg) { return Boolean(seg.callout); });
    var hasStagger = ticks.some(function (tk) { return Boolean(tk.stagger); });

    var svgW = 860;
    var padX = 24;
    var barW = svgW - padX * 2;
    var barY = hasCallout ? 74 : 18;
    var barH = 74;
    var svgH = barY + barH + (hasStagger ? 104 : 62);

    var totalWeight = segments.reduce(function (sum, seg) {
      return sum + (Number(seg.weight) > 0 ? Number(seg.weight) : 1);
    }, 0);

    var clipId = 'blog-range-clip-' + Math.random().toString(36).slice(2, 9);
    var svg = createSvgEl('svg', {
      viewBox: '0 0 ' + svgW + ' ' + svgH,
      class: 'blog-chart__range-svg',
      role: 'img',
      'aria-label': config.ariaLabel || config.title || 'Usage range chart',
    });

    var defs = createSvgEl('defs');
    var clipPath = createSvgEl('clipPath', { id: clipId });
    clipPath.appendChild(createSvgEl('rect', {
      x: padX,
      y: barY,
      width: barW,
      height: barH,
      rx: 11,
    }));
    defs.appendChild(clipPath);
    svg.appendChild(defs);

    var barGroup = createSvgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
    var edges = [padX];
    var curX = padX;

    // Tooltip box for hover/tap interactivity
    var tooltipEl = document.createElement('div');
    tooltipEl.className = 'blog-chart__range-tooltip';
    tooltipEl.setAttribute('aria-live', 'polite');
    if (config.defaultHint) {
      tooltipEl.textContent = config.defaultHint;
    }

    segments.forEach(function (seg, idx) {
      var w = (idx === segments.length - 1)
        ? (padX + barW - curX)
        : Math.round((Number(seg.weight) > 0 ? Number(seg.weight) : 1) / totalWeight * barW);
      var color = seg.color || DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length];

      var segGroup = createSvgEl('g', {
        class: 'blog-chart__range-segment',
        tabindex: '0',
      });

      var rect = createSvgEl('rect', {
        x: curX,
        y: barY,
        width: w,
        height: barH,
        fill: color,
      });
      segGroup.appendChild(rect);

      if (idx > 0) {
        segGroup.appendChild(createSvgEl('line', {
          x1: curX,
          y1: barY,
          x2: curX,
          y2: barY + barH,
          stroke: '#ffffff',
          'stroke-width': 2,
        }));
      }

      if (seg.callout) {
        var midX = curX + w / 2;
        var elbowY = barY - 40;
        var lineEndX = midX + 64;
        svg.appendChild(createSvgEl('polyline', {
          points: midX + ',' + (barY - 5) + ' ' + midX + ',' + elbowY + ' ' + lineEndX + ',' + elbowY,
          fill: 'none',
          stroke: color,
          'stroke-width': 2.8,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }));
        svg.appendChild(createSvgEl('text', {
          x: lineEndX + 10,
          y: elbowY + 8,
          'font-size': 22,
          'font-weight': 800,
          fill: color,
        }, seg.label || ''));
      } else {
        segGroup.appendChild(createSvgEl('text', {
          x: curX + w / 2,
          y: barY + barH / 2 + 8,
          'text-anchor': 'middle',
          'font-size': w < 140 ? 20 : 23,
          'font-weight': 800,
          fill: seg.textColor || '#ffffff',
        }, seg.label || ''));
      }

      if (seg.detail) {
        var showDetail = function () {
          tooltipEl.textContent = seg.detail;
          tooltipEl.classList.add('is-active');
        };
        segGroup.addEventListener('mouseenter', showDetail);
        segGroup.addEventListener('focus', showDetail);
        segGroup.addEventListener('click', showDetail);
      }

      barGroup.appendChild(segGroup);
      curX += w;
      edges.push(curX);
    });

    svg.appendChild(barGroup);

    ticks.forEach(function (tk, idx) {
      var x = edges[Math.min(idx, edges.length - 1)];
      var isFirst = idx === 0;
      var isLast = idx === ticks.length - 1;
      var stagger = Boolean(tk.stagger);
      var lineLen = stagger ? 52 : 18;
      var textY = barY + barH + (stagger ? 78 : 44);
      var anchor = tk.align || (isFirst ? 'start' : (isLast ? 'end' : 'middle'));
      var xOffset = isFirst ? 0 : (isLast ? 0 : (tk.dx || 0));

      svg.appendChild(createSvgEl('line', {
        x1: x,
        y1: barY + barH + 3,
        x2: x,
        y2: barY + barH + 3 + lineLen,
        stroke: '#64748b',
        'stroke-width': 2,
      }));

      svg.appendChild(createSvgEl('text', {
        x: x + xOffset,
        y: textY,
        'text-anchor': anchor,
        'font-size': tk.label === '∞' ? 27 : 21,
        'font-weight': 700,
        fill: '#0f172a',
      }, tk.label || ''));
    });

    wrap.innerHTML = '';
    wrap.appendChild(svg);
    if (config.defaultHint || segments.some(function (seg) { return Boolean(seg.detail); })) {
      wrap.appendChild(tooltipEl);
    }
  }

  // Lightweight built-in Chart.js plugin: horizontal & vertical reference lines + crisp pill labels
  var referenceLinesPlugin = {
    id: 'blogReferenceLines',
    afterDatasetsDraw: function (chart, args, pluginOptions) {
      var lines = pluginOptions && pluginOptions.lines;
      if (!Array.isArray(lines) || !lines.length) return;

      var ctx = chart.ctx;
      var area = chart.chartArea;
      var xScale = chart.scales.x;
      var yScale = chart.scales.y;
      if (!area || !xScale || !yScale) return;

      ctx.save();
      lines.forEach(function (line) {
        var color = line.color || '#64748b';
        var dash = Array.isArray(line.dash) ? line.dash : [5, 4];

        if (line.axis === 'y' && typeof line.value === 'number') {
          var py = yScale.getPixelForValue(line.value);
          if (py < area.top || py > area.bottom) return;

          ctx.beginPath();
          ctx.setLineDash(dash);
          ctx.strokeStyle = color;
          ctx.lineWidth = line.width || 1.4;
          ctx.moveTo(area.left, py);
          ctx.lineTo(area.right, py);
          ctx.stroke();

          if (line.label) {
            ctx.setLineDash([]);
            ctx.font = '700 11px "Noto Sans TC", -apple-system, BlinkMacSystemFont, sans-serif';
            var align = line.labelAlign || 'right';
            var tx = align === 'left' ? area.left + 8 : area.right - 8;
            ctx.textAlign = align;
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = color;
            ctx.fillText(line.label, tx, py - 5);
          }
        } else if (line.axis === 'x' && line.value !== undefined) {
          var px = xScale.getPixelForValue(line.value);
          if (px < area.left || px > area.right) return;

          var topY = typeof line.labelYOffset === 'number' ? area.top + line.labelYOffset : area.top;
          ctx.beginPath();
          ctx.setLineDash(dash);
          ctx.strokeStyle = color;
          ctx.lineWidth = line.width || 1.4;
          ctx.moveTo(px, topY);
          ctx.lineTo(px, area.bottom);
          ctx.stroke();

          if (line.label) {
            ctx.setLineDash([]);
            ctx.font = '700 11px "Noto Sans TC", -apple-system, BlinkMacSystemFont, sans-serif';
            var textW = ctx.measureText(line.label).width;
            var pillW = textW + 16;
            var pillH = 22;
            var pillX = Math.min(Math.max(px - pillW / 2, area.left + 4), area.right - pillW - 4);
            var pillY = topY + 4;

            ctx.fillStyle = line.labelBg || '#ffffff';
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            if (ctx.roundRect) {
              ctx.roundRect(pillX, pillY, pillW, pillH, 6);
            } else {
              ctx.rect(pillX, pillY, pillW, pillH);
            }
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = line.labelColor || color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(line.label, pillX + pillW / 2, pillY + pillH / 2 + 0.5);
          }
        }
      });
      ctx.restore();
    },
  };

  // Lightweight built-in Chart.js plugin: crisp value labels on bars
  var barLabelsPlugin = {
    id: 'blogBarLabels',
    afterDatasetsDraw: function (chart, args, pluginOptions) {
      if (!pluginOptions || !pluginOptions.enabled) return;

      var ctx = chart.ctx;
      var area = chart.chartArea;
      ctx.save();
      ctx.font = '700 11px "Noto Sans TC", -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';

      var datasetCount = chart.data.datasets.length;
      chart.data.datasets.forEach(function (ds, dsIdx) {
        var meta = chart.getDatasetMeta(dsIdx);
        if (!meta || meta.hidden) return;
        meta.data.forEach(function (bar, i) {
          var raw = ds.data[i];
          if (raw === null || raw === undefined) return;
          var val = Number(raw);
          if (isNaN(val)) return;

          var label = formatNumber(val, {
            prefix: pluginOptions.prefix || '',
            suffix: pluginOptions.suffix || '',
            showPlus: Boolean(pluginOptions.showPlus),
          });
          if (val === 0 && pluginOptions.zeroLabel) {
            label = pluginOptions.zeroLabel;
          }

          var yPos;
          if (val < 0) {
            ctx.textBaseline = 'top';
            yPos = Math.min(bar.y + 4, area.bottom - 12);
          } else {
            ctx.textBaseline = 'bottom';
            // Stagger slightly if multiple small bars are right next to each other
            var staggerUp = (datasetCount > 1 && dsIdx === 1 && Math.abs(bar.base - bar.y) < 16) ? 14 : 4;
            yPos = Math.max(bar.y - staggerUp, area.top + 12);
          }

          ctx.fillStyle = (Array.isArray(ds.labelColors) && ds.labelColors[i])
            || ds.labelColor
            || (val < 0 ? '#b91c1c' : '#1e293b');
          ctx.fillText(label, bar.x, yPos);
        });
      });
      ctx.restore();
    },
  };

  function buildChartJsOptions(config) {
    var isLinearX = config.xType === 'linear';
    var yFmt = { prefix: config.yPrefix || '', suffix: config.ySuffix || '', showPlus: Boolean(config.yShowPlus) };
    var xFmt = { prefix: config.xPrefix || '', suffix: config.xSuffix || '' };

    var datasets = config.datasets.map(function (ds, idx) {
      var color = ds.color || DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length];
      var out = {
        label: ds.label || '',
        data: ds.data,
        borderColor: ds.borderColor || color,
        backgroundColor: ds.backgroundColor || (config.type === 'bar' ? color : color),
        borderWidth: typeof ds.borderWidth === 'number' ? ds.borderWidth : (config.type === 'line' ? 2.8 : 0),
        borderDash: Array.isArray(ds.dash) ? ds.dash : undefined,
        borderRadius: config.type === 'bar' ? 5 : undefined,
        barPercentage: config.type === 'bar' ? 0.82 : undefined,
        categoryPercentage: config.type === 'bar' ? 0.72 : undefined,
        tension: typeof ds.tension === 'number' ? ds.tension : 0,
        fill: Boolean(ds.fill),
        pointRadius: typeof ds.pointRadius === 'number' ? ds.pointRadius : (config.type === 'line' ? 4 : undefined),
        pointHoverRadius: config.type === 'line' ? 6.5 : undefined,
        pointBackgroundColor: ds.pointBackgroundColor || color,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 1.5,
        labelColor: ds.labelColor,
        labelColors: ds.labelColors,
      };
      return out;
    });

    var scales = {};
    if (config.type === 'bar' || config.type === 'line' || config.type === 'scatter') {
      scales.x = {
        type: isLinearX ? 'linear' : 'category',
        min: typeof config.xMin === 'number' ? config.xMin : undefined,
        max: typeof config.xMax === 'number' ? config.xMax : undefined,
        afterBuildTicks: (isLinearX && Array.isArray(config.xTicks) && config.xTicks.length)
          ? function (axis) {
            axis.ticks = config.xTicks.map(function (v) { return { value: v }; });
          }
          : undefined,
        grid: {
          color: '#f1f5f9',
          display: isLinearX,
        },
        border: { color: '#cbd5e1' },
        ticks: {
          color: '#475569',
          font: { size: 12, weight: '600' },
          stepSize: typeof config.xStep === 'number' ? config.xStep : undefined,
          callback: function (value) {
            if (isLinearX) return formatNumber(value, xFmt);
            return this.getLabelForValue(value);
          },
        },
        title: config.xLabel
          ? { display: true, text: config.xLabel, color: '#64748b', font: { size: 12, weight: '700' }, padding: { top: 8 } }
          : { display: false },
      };

      scales.y = {
        beginAtZero: config.yBeginAtZero !== false,
        min: typeof config.yMin === 'number' ? config.yMin : undefined,
        max: typeof config.yMax === 'number' ? config.yMax : undefined,
        grid: {
          color: '#e2e8f0',
          tickLength: 0,
        },
        border: { display: false, dash: [4, 4] },
        ticks: {
          color: '#64748b',
          font: { size: 12, weight: '600' },
          padding: 8,
          stepSize: typeof config.yStep === 'number' ? config.yStep : undefined,
          callback: function (value) {
            return formatNumber(value, yFmt);
          },
        },
        title: config.yLabel
          ? { display: true, text: config.yLabel, color: '#64748b', font: { size: 12, weight: '700' }, padding: { bottom: 6 } }
          : { display: false },
      };
    }

    return {
      type: config.type,
      data: {
        labels: isLinearX ? undefined : (config.labels || []),
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: config.showBarLabels ? 24 : 14,
            right: 14,
            bottom: 4,
            left: 4,
          },
        },
        interaction: {
          mode: config.type === 'line' ? 'nearest' : 'index',
          axis: 'x',
          intersect: false,
        },
        plugins: {
          legend: {
            display: config.showLegend !== false && datasets.length > 1,
            position: config.legendPosition || 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: config.type === 'bar' ? 'rectRounded' : 'circle',
              boxWidth: 10,
              boxHeight: 10,
              padding: 16,
              color: '#1e293b',
              font: { size: 12.5, weight: '700' },
            },
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(148, 163, 184, 0.35)',
            borderWidth: 1,
            padding: 11,
            cornerRadius: 8,
            boxPadding: 5,
            usePointStyle: true,
            callbacks: {
              title: function (items) {
                if (!items || !items.length) return '';
                var first = items[0];
                var titlePrefix = config.tooltipTitlePrefix || '';
                if (isLinearX && first.parsed && typeof first.parsed.x === 'number') {
                  return titlePrefix + formatNumber(first.parsed.x, xFmt);
                }
                return titlePrefix + (first.label || '');
              },
              label: function (ctx) {
                var val = ctx.parsed && typeof ctx.parsed.y === 'number' ? ctx.parsed.y : ctx.parsed;
                var name = ctx.dataset && ctx.dataset.label ? ctx.dataset.label + ': ' : '';
                return ' ' + name + formatNumber(val, yFmt);
              },
            },
          },
          blogReferenceLines: {
            lines: Array.isArray(config.referenceLines) ? config.referenceLines : [],
          },
          blogBarLabels: {
            enabled: Boolean(config.showBarLabels),
            prefix: config.yPrefix || '',
            suffix: config.ySuffix || '',
            showPlus: Boolean(config.yShowPlus),
            zeroLabel: config.zeroLabel || '',
          },
        },
        scales: scales,
      },
      plugins: [referenceLinesPlugin, barLabelsPlugin],
    };
  }

  function renderChartJsBlocks(items) {
    if (!items.length) return;
    var start = function () {
      if (!window.Chart) return;
      window.Chart.defaults.font.family = '"Noto Sans TC", "PingFang TC", "PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      items.forEach(function (item) {
        var canvas = item.figure.querySelector('canvas.blog-chart__canvas');
        if (!canvas) return;
        try {
          new window.Chart(canvas.getContext('2d'), buildChartJsOptions(item.config));
        } catch (err) {
          console.error('Chart.js render error:', err);
        }
      });
    };

    if (window.Chart) {
      start();
      return;
    }

    var script = document.createElement('script');
    script.src = CHARTJS_CDN;
    script.crossOrigin = 'anonymous';
    script.onload = start;
    script.onerror = function () {
      console.error('Failed to load Chart.js from CDN.');
    };
    document.head.appendChild(script);
  }

  function initBlogCharts() {
    var figures = document.querySelectorAll('.blog-chart');
    if (!figures || !figures.length) return;

    var chartJsQueue = [];
    figures.forEach(function (figure) {
      if (figure.dataset.chartRendered === '1') return;
      figure.dataset.chartRendered = '1';

      var config = parseConfig(figure);
      if (!config) return;

      if (config.type === 'range') {
        renderRangeChart(figure, config);
      } else {
        chartJsQueue.push({ figure: figure, config: config });
      }
    });

    if (chartJsQueue.length) {
      renderChartJsBlocks(chartJsQueue);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogCharts);
  } else {
    initBlogCharts();
  }
})();
