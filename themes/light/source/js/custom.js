/* i18n 字串由 _partial/search_modal.ejs 注入，此處僅提供繁中後備值 */
var BLOG_STRINGS = (function () {
  var i18n = window.BLOG_I18N || {};
  return {
    copyCode: i18n.copyCode || '複製',
    codeCopied: i18n.codeCopied || '已複製',
    toastCodeCopied: i18n.toastCodeCopied || '已複製程式碼至剪貼簿',
    copyLinkLabel: i18n.copyLinkLabel || '複製連結',
    linkCopied: i18n.linkCopied || '已複製文章連結',
    headingCopied: i18n.headingCopied || '已複製章節連結',
    tocTitle: i18n.tocTitle || '目次',
    searchLoading: i18n.searchLoading || '載入中...',
    searchEmpty: i18n.searchEmpty || '輸入關鍵字開始搜尋...',
    searchNoResults: i18n.searchNoResults || '找不到符合「%s」的相關文章',
    tableScrollLabel: i18n.tableScrollLabel || '表格，可左右捲動',
    tableScrollHint: i18n.tableScrollHint || '左右滑動查看完整表格；鍵盤可使用方向鍵。'
  };
})();

/* GA4 事件追蹤安全輔助函式 */
function trackGAEvent(eventName, params) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var synth = window.speechSynthesis;
  var articles = Array.from(document.querySelectorAll('article'));

  articles.forEach(function (article) {
    var link = article.querySelector('header .title a');
    var firstImage = article.querySelector('.entry p > img');

    if (link && firstImage && !firstImage.closest('a')) {
      var wrapper = document.createElement('a');
      wrapper.href = link.href;
      wrapper.className = 'topImgWrap';
      firstImage.classList.add('nofancybox');
      firstImage.parentNode.insertBefore(wrapper, firstImage);
      wrapper.appendChild(firstImage);
    }
  });

  document.querySelectorAll('span.speak').forEach(function (button) {
    button.addEventListener('click', function () {
      var text = button.dataset.text;
      if (!text || !synth) return;

      var utterance = new SpeechSynthesisUtterance(text);
      var voices = synth.getVoices();
      utterance.voice = voices.find(function (voice) {
        return voice.lang === 'ja-JP';
      }) || null;
      utterance.lang = 'ja-JP';
      synth.speak(utterance);

      trackGAEvent('play_tts', {
        text: text,
        source_path: window.location.pathname
      });
    });
  });

  initDataTables();
  initTaxonomyFilter();

  if (articles.length === 1) {
    createTOC(articles[0]);
    initRelatedPostsTracking();
  }

  initCodeCopy();
  initShareButtons();
  initIslandDemoTracking();
  initSearchModal();

  window.setTimeout(scrollToAnchor, 10);
});

function initIslandDemoTracking() {
  document.querySelectorAll('a[href*="app.6yuwei.com/island/"]').forEach(function (link) {
    link.addEventListener('click', function () {
      trackGAEvent('click_island_demo', {
        link_url: link.href,
        source_path: window.location.pathname
      });
    });
  });
}

function initDataTables() {
  document.querySelectorAll('article .entry table').forEach(function (table) {
    if (table.closest('.highlight, .gist') || table.parentElement.closest('table')) return;
    var wrapper = table.parentElement;
    if (!wrapper.matches('.table-wrap, .tableWrap')) {
      wrapper = document.createElement('div');
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
    wrapper.classList.add('table-wrap', 'data-table-wrap');
    var columns = Array.from(table.rows[0] ? table.rows[0].cells : []).reduce(function (count, cell) {
      return count + cell.colSpan;
    }, 0);
    wrapper.style.setProperty('--table-min-width', (columns > 3 ? Math.min(columns * 140, 1120) : 0) + 'px');
    var hint = document.createElement('p');
    hint.className = 'table-scroll-hint';
    hint.textContent = BLOG_STRINGS.tableScrollHint;
    wrapper.insertAdjacentElement('afterend', hint);

    function updateOverflow() {
      var overflowing = wrapper.scrollWidth > wrapper.clientWidth + 1;
      hint.hidden = !overflowing;
      wrapper.classList.toggle('has-scroll-right', overflowing && wrapper.scrollLeft < wrapper.scrollWidth - wrapper.clientWidth - 2);
      if (overflowing) {
        wrapper.setAttribute('tabindex', '0');
        wrapper.setAttribute('role', 'region');
        wrapper.setAttribute('aria-label', table.caption ? table.caption.textContent : BLOG_STRINGS.tableScrollLabel);
      } else {
        wrapper.removeAttribute('tabindex');
        wrapper.removeAttribute('role');
        wrapper.removeAttribute('aria-label');
      }
    }
    updateOverflow();
    wrapper.addEventListener('scroll', updateOverflow, { passive: true });
    if (window.ResizeObserver) {
      var observer = new ResizeObserver(updateOverflow);
      observer.observe(wrapper);
      observer.observe(table);
    } else {
      window.addEventListener('resize', updateOverflow);
    }
  });
}

function initTaxonomyFilter() {
  var directory = document.querySelector('.taxonomy-directory');
  if (!directory) return;
  var input = directory.querySelector('#taxonomy-filter');
  var items = Array.from(directory.querySelectorAll('[data-topic]'));
  var status = directory.querySelector('[data-count-template]');
  var empty = directory.querySelector('.taxonomy-directory__empty');
  directory.querySelector('.taxonomy-directory__tools').hidden = false;
  input.addEventListener('input', function () {
    var query = input.value.trim().normalize('NFKC').toLocaleLowerCase();
    var visible = 0;
    items.forEach(function (item) {
      var matches = item.dataset.topic.normalize('NFKC').toLocaleLowerCase().includes(query);
      item.hidden = !matches;
      if (matches) visible += 1;
    });
    status.textContent = status.dataset.countTemplate.replace('%s', visible);
    empty.hidden = visible > 0;
  });
}

/* -------------------------------------------------------------
 * 1. 剪貼簿與 Toast 提示 (Toast & Clipboard)
 * ------------------------------------------------------------- */
function showToast(message) {
  var toast = document.getElementById('blog-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  if (showToast.timer) clearTimeout(showToast.timer);
  showToast.timer = setTimeout(function () {
    toast.classList.remove('is-visible');
  }, 2200);
}

function copyToClipboard(text, onSuccess) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      if (typeof onSuccess === 'function') onSuccess();
    }).catch(function () {
      fallbackCopy(text, onSuccess);
    });
  } else {
    fallbackCopy(text, onSuccess);
  }
}

function fallbackCopy(text, onSuccess) {
  var textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    if (typeof onSuccess === 'function') onSuccess();
  } catch (e) {
    console.error('Copy fallback failed:', e);
  }
  document.body.removeChild(textArea);
}

/* -------------------------------------------------------------
 * 2. 程式碼一鍵複製 (Code Block Copy Button)
 * ------------------------------------------------------------- */
function initCodeCopy() {
  var figures = document.querySelectorAll('figure.highlight');
  figures.forEach(function (figure) {
    if (figure.querySelector('.btn-copy-code')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-copy-code';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.innerHTML = [
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>',
      '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
      '</svg>',
      '<span class="btn-copy-text">' + BLOG_STRINGS.copyCode + '</span>'
    ].join('');

    btn.addEventListener('click', function () {
      var codePre = figure.querySelector('td.code pre');
      var codeText = '';
      if (codePre) {
        codeText = codePre.innerText || codePre.textContent;
      } else {
        var pre = figure.querySelector('pre');
        codeText = pre ? (pre.innerText || pre.textContent) : figure.innerText;
      }

      copyToClipboard(codeText, function () {
        btn.classList.add('is-copied');
        var textSpan = btn.querySelector('.btn-copy-text');
        textSpan.textContent = BLOG_STRINGS.codeCopied + ' ✓';
        showToast(BLOG_STRINGS.toastCodeCopied);
        setTimeout(function () {
          btn.classList.remove('is-copied');
          textSpan.textContent = BLOG_STRINGS.copyCode;
        }, 1600);

        var langClass = Array.from(figure.classList).filter(function (c) {
          return c !== 'highlight' && c !== 'table-wrap';
        })[0] || 'text';

        trackGAEvent('copy_code', {
          code_language: langClass,
          code_length: codeText.length,
          item_name: document.title,
          source_path: window.location.pathname
        });
      });
    });

    figure.appendChild(btn);
  });
}

/* -------------------------------------------------------------
 * 3. 目錄 (TOC) 支援 H2、H3 與平滑複製錨點
 * ------------------------------------------------------------- */
function createTOC(article) {
  var headings = Array.from(article.querySelectorAll('h2, h3'));
  if (!headings.length) return;

  var toc = document.createElement('div');
  toc.className = 'toc';

  var tocTitle = document.createElement('div');
  tocTitle.className = 'toc-title';
  tocTitle.textContent = BLOG_STRINGS.tocTitle;
  toc.appendChild(tocTitle);

  var tocList = document.createElement('ul');
  toc.appendChild(tocList);

  headings.forEach(function (heading) {
    if (!heading.id) return;

    var cleanTitle = heading.textContent.replace(/^[#\s]+|[#\s]+$/g, '').trim();

    var item = document.createElement('li');
    item.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-level-3' : 'toc-level-2';

    var link = document.createElement('a');
    link.href = '#' + encodeURIComponent(heading.id);
    link.textContent = cleanTitle;
    link.addEventListener('click', function () {
      trackGAEvent('select_content', {
        content_type: 'toc_heading',
        item_id: heading.id,
        item_name: cleanTitle,
        heading_level: heading.tagName.toLowerCase(),
        source_path: window.location.pathname
      });
    });
    item.appendChild(link);
    tocList.appendChild(item);

    // 移除 Hexo marked 預設產生的空 .headerlink 避免重複錨點
    var existingHeaderlink = heading.querySelector('.headerlink');
    if (existingHeaderlink) {
      existingHeaderlink.remove();
    }

    var copyLink = document.createElement('a');
    copyLink.href = '#' + encodeURIComponent(heading.id);
    copyLink.className = 'link-button';
    copyLink.textContent = '#';
    copyLink.title = BLOG_STRINGS.copyLinkLabel;
    copyLink.setAttribute('aria-label', BLOG_STRINGS.copyLinkLabel);
    copyLink.addEventListener('click', function (e) {
      e.preventDefault();
      var targetUrl = window.location.href.replace(/#.*/, '') + this.getAttribute('href');
      copyToClipboard(targetUrl, function () {
        showToast(BLOG_STRINGS.headingCopied);
        trackGAEvent('copy_heading_link', {
          item_id: heading.id,
          item_name: cleanTitle,
          source_path: window.location.pathname
        });
      });
    });
    heading.insertBefore(copyLink, heading.firstChild);
  });

  headings[0].parentNode.insertBefore(toc, headings[0]);
}

function scrollToAnchor() {
  if (!window.location.hash) return;

  var id;
  try {
    id = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    id = window.location.hash.slice(1);
  }

  var target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* -------------------------------------------------------------
 * 4. 現代文章社群分享列 (Modern Article Share)
 * ------------------------------------------------------------- */
function initShareButtons() {
  function getLocale() {
    var path = window.location.pathname;
    if (path.startsWith('/zh-cn/') || path === '/zh-cn') return 'zh-CN';
    if (path.startsWith('/en/') || path === '/en') return 'en';
    return 'zh-TW';
  }

  document.querySelectorAll('.article-share').forEach(function (shareBox) {
    var locale = getLocale();
    var titleEl = document.querySelector('article header .title');
    var articleTitle = (titleEl ? titleEl.textContent : document.title).trim();

    var copyBtn = shareBox.querySelector('.share-btn-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        copyToClipboard(window.location.href, function () {
          showToast(BLOG_STRINGS.linkCopied);
        });
        trackGAEvent('share', {
          method: 'copy_link',
          content_type: 'article',
          item_id: window.location.pathname,
          item_name: articleTitle,
          locale: locale
        });
      });
    }

    var wechatBtn = shareBox.querySelector('.share-btn-wechat');
    if (wechatBtn) {
      wechatBtn.addEventListener('click', function () {
        var url = wechatBtn.getAttribute('data-url') || window.location.href;
        var title = wechatBtn.getAttribute('data-title') || articleTitle;
        if (navigator.share) {
          navigator.share({ title: title, url: url }).catch(function () {});
        } else {
          copyToClipboard(url, function () {
            showToast('已复制文章链接，可在微信中粘贴发送');
          });
        }
        trackGAEvent('share', {
          method: 'wechat',
          content_type: 'article',
          item_id: window.location.pathname,
          item_name: articleTitle,
          locale: locale
        });
      });
    }

    var nativeBtn = shareBox.querySelector('.share-btn-native');
    if (nativeBtn && navigator.share) {
      nativeBtn.style.display = 'inline-flex';
      nativeBtn.addEventListener('click', function () {
        var title = nativeBtn.getAttribute('data-title') || articleTitle;
        var url = nativeBtn.getAttribute('data-url') || window.location.href;
        navigator.share({ title: title, url: url }).catch(function () {});
        trackGAEvent('share', {
          method: 'native_share',
          content_type: 'article',
          item_id: window.location.pathname,
          item_name: articleTitle,
          locale: locale
        });
      });
    }

    // 所有第三方社群轉發按鈕 (Threads, LINE, Facebook, X, 微博, 知乎, LinkedIn, Reddit, Hacker News)
    shareBox.querySelectorAll('a.share-btn').forEach(function (link) {
      link.addEventListener('click', function () {
        var method = 'unknown';
        var classList = link.className.split(/\s+/);
        for (var i = 0; i < classList.length; i++) {
          var cls = classList[i];
          if (cls.indexOf('share-btn-') === 0 && cls !== 'share-btn-copy' && cls !== 'share-btn-native') {
            method = cls.replace('share-btn-', '');
            break;
          }
        }
        if (method === 'twitter') method = 'x';
        if (method === 'hn') method = 'hacker_news';

        trackGAEvent('share', {
          method: method,
          content_type: 'article',
          item_id: window.location.pathname,
          item_name: articleTitle,
          locale: locale
        });
      });
    });
  });
}

/* -------------------------------------------------------------
 * 5. Command Palette 彈窗搜尋 (Modal Search with Cmd+K)
 * ------------------------------------------------------------- */
function initSearchModal() {
  var modal = document.getElementById('search-modal');
  if (!modal) return;

  var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  if (!isMac) {
    document.querySelectorAll('[data-kbd-shortcut]').forEach(function (kbd) {
      kbd.textContent = 'Ctrl K';
    });
  }

  var input = document.getElementById('search-input');
  var resultsContainer = document.getElementById('search-results');
  var triggers = document.querySelectorAll('.search-trigger');
  var closeBtns = modal.querySelectorAll('[data-action="close-search"]');
  var searchIndex = null;
  var isLoading = false;
  var selectedIndex = -1;
  var searchDebounceTimer = null;

  function getLocale() {
    var path = window.location.pathname;
    if (path.startsWith('/zh-cn/') || path === '/zh-cn') return 'zh-cn';
    if (path.startsWith('/en/') || path === '/en') return 'en';
    return 'zh-tw';
  }

  function getIndexUrl() {
    var locale = getLocale();
    if (locale === 'zh-cn') return '/zh-cn/content.json';
    if (locale === 'en') return '/en/content.json';
    return '/content.json';
  }

  function loadSearchIndex(callback) {
    if (searchIndex) {
      if (callback) callback(searchIndex);
      return;
    }
    if (isLoading) return;
    isLoading = true;

    fetch(getIndexUrl())
      .then(function (res) { return res.json(); })
      .then(function (data) {
        isLoading = false;
        searchIndex = (data && data.posts) ? data.posts : [];
        if (callback) callback(searchIndex);
      })
      .catch(function (err) {
        isLoading = false;
        console.error('Search index load failed:', err);
      });
  }

  function openModal(triggerType) {
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    loadSearchIndex();
    setTimeout(function () {
      if (input) {
        input.focus();
        input.select();
      }
    }, 50);

    trackGAEvent('search_modal_open', {
      trigger_type: triggerType || 'click',
      source_path: window.location.pathname
    });
  }

  function closeModal() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    selectedIndex = -1;
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openModal('click');
    });
  });

  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });

  window.addEventListener('keydown', function (e) {
    var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    var isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

    if (isCmdOrCtrl && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (modal.classList.contains('is-active')) {
        closeModal();
      } else {
        openModal('shortcut');
      }
    } else if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      e.preventDefault();
      closeModal();
    }
  });

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, function (tag) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag);
    });
  }

  function highlightMatches(text, query) {
    if (!query || !text) return escapeHtml(text || '');
    var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
  }

  function renderResults(query) {
    if (!searchIndex) {
      resultsContainer.innerHTML = '<div class="search-modal__empty-hint">' + BLOG_STRINGS.searchLoading + '</div>';
      loadSearchIndex(function () { renderResults(query); });
      return;
    }

    var trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      resultsContainer.innerHTML = '<div class="search-modal__empty-hint">' + BLOG_STRINGS.searchEmpty + '</div>';
      selectedIndex = -1;
      return;
    }

    var matches = searchIndex.filter(function (post) {
      var title = (post.title || '').toLowerCase();
      var excerpt = (post.excerpt || '').toLowerCase();
      return title.indexOf(trimmed) >= 0 || excerpt.indexOf(trimmed) >= 0;
    });

    // GA4 搜尋事件 (防抖 600ms，輸入至少 2 個字元時記錄)
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    if (trimmed.length >= 2) {
      searchDebounceTimer = setTimeout(function () {
        trackGAEvent('search', {
          search_term: trimmed,
          results_count: matches.length,
          locale: getLocale()
        });
      }, 600);
    }

    if (!matches.length) {
      resultsContainer.innerHTML = '<div class="search-modal__empty-hint">' + BLOG_STRINGS.searchNoResults.replace('%s', escapeHtml(query)) + '</div>';
      selectedIndex = -1;
      return;
    }

    var sliced = matches.slice(0, 10);
    var html = sliced.map(function (post, index) {
      var dateStr = '';
      if (post.date) {
        var d = new Date(post.date);
        dateStr = d.toISOString().slice(0, 10);
      }
      var cleanExcerpt = (post.excerpt || '').replace(/<[^>]+>/g, '').trim().slice(0, 90);

      return [
        '<a href="' + post.permalink + '" class="search-result-item ' + (index === 0 ? 'is-selected' : '') + '" data-index="' + index + '" data-title="' + escapeHtml(post.title || '') + '" data-url="' + escapeHtml(post.permalink || '') + '">',
        '  <div class="search-result-item__header">',
        '    <span class="search-result-title">' + highlightMatches(post.title, trimmed) + '</span>',
        dateStr ? ('    <span class="search-result-meta">' + dateStr + '</span>') : '',
        '  </div>',
        cleanExcerpt ? ('  <div class="search-result-excerpt">' + highlightMatches(cleanExcerpt, trimmed) + '...</div>') : '',
        '</a>'
      ].join('');
    }).join('');

    resultsContainer.innerHTML = html;
    selectedIndex = 0;
  }

  // 點擊搜尋結果追蹤 (GA4 select_content)
  resultsContainer.addEventListener('click', function (e) {
    var item = e.target.closest('.search-result-item');
    if (!item) return;

    var targetUrl = item.getAttribute('data-url') || item.getAttribute('href');
    var targetTitle = item.getAttribute('data-title') || '';
    var itemIndex = Number(item.getAttribute('data-index')) + 1;
    var currentQuery = input ? input.value.trim() : '';

    trackGAEvent('select_content', {
      content_type: 'search_result',
      item_id: targetUrl,
      item_name: targetTitle,
      search_term: currentQuery,
      index: itemIndex,
      source_path: window.location.pathname
    });
  });

  if (input) {
    input.addEventListener('input', function () {
      renderResults(input.value);
    });

    input.addEventListener('keydown', function (e) {
      var items = resultsContainer.querySelectorAll('.search-result-item');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        updateSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        updateSelection(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          items[selectedIndex].click();
        }
      }
    });
  }

  function updateSelection(items) {
    items.forEach(function (item, idx) {
      if (idx === selectedIndex) {
        item.classList.add('is-selected');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('is-selected');
      }
    });
  }
}

/* -------------------------------------------------------------
 * 6. 相關文章曝光與點擊追蹤 (GA4 Related Posts Tracking)
 * ------------------------------------------------------------- */
function initRelatedPostsTracking() {
  var container = document.querySelector('.related-posts');
  if (!container) return;

  var sourcePath = container.getAttribute('data-rel-source') || window.location.pathname;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var items = [];
          container.querySelectorAll('.related-post-link').forEach(function (link) {
            items.push({
              item_id: link.getAttribute('data-rel-path') || link.getAttribute('href') || '',
              item_name: link.getAttribute('data-rel-title') || '',
              item_category: link.getAttribute('data-rel-tag') || '',
              index: Number(link.getAttribute('data-rel-position')) || 1,
            });
          });

          trackGAEvent('view_related_posts', {
            item_list_name: 'related_posts',
            source_path: sourcePath,
            items: items,
          });
          observer.unobserve(container);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(container);
  }

  container.addEventListener('click', function (event) {
    var link = event.target.closest('.related-post-link');
    if (!link) return;

    var title = link.getAttribute('data-rel-title') || '';
    var targetPath = link.getAttribute('data-rel-path') || link.getAttribute('href') || '';
    var tag = link.getAttribute('data-rel-tag') || '';
    var position = Number(link.getAttribute('data-rel-position')) || 1;

    trackGAEvent('click_related_post', {
      item_id: targetPath,
      item_name: title,
      item_category: tag,
      item_list_name: 'related_posts',
      index: position,
      source_path: sourcePath,
    });
  });
}
