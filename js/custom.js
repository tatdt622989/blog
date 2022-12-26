$(function () {
  const synth = window.speechSynthesis;
  $("article").each(function () {
    if ($(this).find("header h1 a").attr("href")) {
      $(this)
        .find(".entry p>img")
        .eq(0)
        .wrap(
          `<a href="${$(this)
            .find("header h1 a")
            .attr("href")}" class="topImgWrap"></a>`
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
