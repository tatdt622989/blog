'use strict';

const { parseFragment } = require('parse5');
const { escapeHTML } = require('hexo-util');

// Keep the original HTML intact; parsing is only used to identify real data tables.
function wrapDataTables(html, label) {
  if (!html || !/<table\b/i.test(html)) return html;
  const document = parseFragment(html, { sourceCodeLocationInfo: true });
  const edits = [];

  function classes(node) {
    return (node.attrs?.find(attr => attr.name === 'class')?.value || '').split(/\s+/);
  }

  function firstRow(node) {
    if (node.tagName === 'tr') return node;
    for (const child of node.childNodes || []) {
      const row = firstRow(child);
      if (row) return row;
    }
  }

  function visit(node, excluded = false) {
    const skip = excluded || node.tagName === 'pre' || classes(node).some(name => (
      ['highlight', 'gist', 'table-wrap', 'tableWrap'].includes(name)
    ));
    if (node.tagName === 'table') {
      const location = node.sourceCodeLocation;
      if (!skip && location) {
        const columns = (firstRow(node)?.childNodes || []).reduce((count, cell) => {
          if (!['th', 'td'].includes(cell.tagName)) return count;
          const span = Number(cell.attrs?.find(attr => attr.name === 'colspan')?.value || 1);
          return count + (Number.isFinite(span) && span > 0 ? span : 1);
        }, 0);
        const minWidth = columns > 3 ? Math.min(columns * 140, 1120) : 0;
        const start = `<div class="table-wrap data-table-wrap" role="region" aria-label="${escapeHTML(label)}" tabindex="0" style="--table-min-width:${minWidth}px">`;
        edits.push({ start: location.startOffset, end: location.endOffset, prefix: start });
      }
      return;
    }
    for (const child of node.childNodes || []) visit(child, skip);
  }

  visit(document);
  for (const edit of edits.reverse()) {
    html = html.slice(0, edit.start) + edit.prefix + html.slice(edit.start, edit.end) + '</div>' + html.slice(edit.end);
  }
  return html;
}

module.exports = { wrapDataTables };
