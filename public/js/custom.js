$(function () {
  const synth = window.speechSynthesis;
  $("article").each(function () {
    const href = $(this).find("header .title a").attr("href");
    if (href) {
      $(this)
        .find(".entry p>img")
        .eq(0)
        .addClass('nofancybox')
        .wrap(
          `<a href="${href}" class="topImgWrap"></a>`
        );
    }
  });
  $('span.speak').on('click', function() {
    const text = $(this).data('text');
    console.log('speak:' + text);
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = synth.getVoices().find((voice) => voice.lang === 'ja-JP')
    utterThis.lang = 'ja-JP';
    synth.speak(utterThis);
  });

  $('table').wrap('<div class="table-wrap"></div>');

  // auto table of contents generation
  function createTOC() {
    var toc = $('<div class="toc"></div>');
    var tocTitle = $('<div class="toc-title">目次</div>');
    toc.append(tocTitle);
    var tocList = $('<ul></ul>');
    toc.append(tocList);
    // h2 to link
    $('article h2').each(function () {
      var title = $(this).text();
      var id = $(this).attr('id');
      var li = $('<li><a href="#' + id + '">' + title + '</a></li>');
      tocList.append(li);
    });
    $('article h2:first').before(toc);

    // h2 add link button
    $('article h2').each(function () {
      var id = $(this).attr('id');
      var link = $('<a href="#' + id + '" class="link-button">#</a>');
      $(this).append(link);
    });

    // copy link
    $('.link-button').on('click', function (e) {
      e.preventDefault();
      var url = location.href;
      var hash = $(this).attr('href');
      url = url.replace(/#.*/, '');
      var link = url + hash;
      var textArea = $('<textarea></textarea>');
      textArea.text(link);
      $('body').append(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      alert('複製完成');
      return false;
    });
  }

  if ($('article').length === 1) {
    createTOC();
  }

  function scrollToAnchor() {
    // if has hash, scroll to hash
    if (location.hash) {
      const hash = decodeURIComponent(location.hash);
      var target = $(hash);
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    }
  }
  setTimeout(scrollToAnchor, 10);
});

