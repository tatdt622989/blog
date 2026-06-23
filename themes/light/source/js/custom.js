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
