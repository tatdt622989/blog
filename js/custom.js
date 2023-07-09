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
});
