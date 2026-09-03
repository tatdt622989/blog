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
    });
  });

  document.querySelectorAll('table').forEach(function (table) {
    if (table.parentElement && table.parentElement.classList.contains('table-wrap')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'table-wrap';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  if (articles.length === 1) {
    createTOC(articles[0]);
    initRelatedPostsTracking();
  }

  window.setTimeout(scrollToAnchor, 10);
});

function createTOC(article) {
  var headings = Array.from(article.querySelectorAll('h2'));
  if (!headings.length) return;

  var toc = document.createElement('div');
  toc.className = 'toc';

  var tocTitle = document.createElement('div');
  tocTitle.className = 'toc-title';
  tocTitle.textContent = '目次';
  toc.appendChild(tocTitle);

  var tocList = document.createElement('ul');
  toc.appendChild(tocList);

  headings.forEach(function (heading) {
    if (!heading.id) return;

    var item = document.createElement('li');
    var link = document.createElement('a');
    link.href = '#' + encodeURIComponent(heading.id);
    link.textContent = heading.textContent.replace('#', '').trim();
    item.appendChild(link);
    tocList.appendChild(item);

    var copyLink = document.createElement('a');
    copyLink.href = '#' + encodeURIComponent(heading.id);
    copyLink.className = 'link-button';
    copyLink.textContent = '#';
    copyLink.addEventListener('click', copyHeadingLink);
    heading.appendChild(copyLink);
  });

  headings[0].parentNode.insertBefore(toc, headings[0]);
}

function copyHeadingLink(event) {
  event.preventDefault();

  var url = window.location.href.replace(/#.*/, '') + this.getAttribute('href');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function () {
      window.alert('複製完成');
    });
    return false;
  }

  var textArea = document.createElement('textarea');
  textArea.value = url;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
  window.alert('複製完成');

  return false;
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

function initRelatedPostsTracking() {
  var container = document.querySelector('.related-posts');
  if (!container) return;

  var sourcePath = container.getAttribute('data-rel-source') || window.location.pathname;

  // 1. 曝光追蹤（Impression Tracking via IntersectionObserver）
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

          if (typeof window.gtag === 'function') {
            window.gtag('event', 'view_related_posts', {
              item_list_name: 'related_posts',
              source_path: sourcePath,
              items: items,
            });
          }
          observer.unobserve(container);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(container);
  }

  // 2. 點擊追蹤（Click Tracking）
  container.addEventListener('click', function (event) {
    var link = event.target.closest('.related-post-link');
    if (!link) return;

    var title = link.getAttribute('data-rel-title') || '';
    var targetPath = link.getAttribute('data-rel-path') || link.getAttribute('href') || '';
    var tag = link.getAttribute('data-rel-tag') || '';
    var position = Number(link.getAttribute('data-rel-position')) || 1;

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'click_related_post', {
        item_id: targetPath,
        item_name: title,
        item_category: tag,
        item_list_name: 'related_posts',
        index: position,
        source_path: sourcePath,
      });
    }
  });
}

