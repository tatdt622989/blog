(function () {
  var root = document.querySelector('[data-dev-map]');
  if (!root) return;

  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };
  var tabs = root.querySelectorAll('.dev-map__tab');
  var panels = root.querySelectorAll('.dev-map__track');
  var stops = root.querySelectorAll('.dev-map__stop');
  var route = root.querySelector('[data-route]');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = tabs.length ? tabs[0].getAttribute('data-track') : '';
  var here = '';

  function show(track) {
    current = track;
    each(tabs, function (tab) {
      var active = tab.getAttribute('data-track') === track;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    each(panels, function (panel) { panel.hidden = panel.getAttribute('data-track') !== track; });
    each(stops, function (stop) { stop.setAttribute('href', '#' + track + '-' + stop.getAttribute('data-stop')); });
    if (here) {
      mark(here, false);
      remember();
    }
  }

  function remember() {
    if (window.history && history.replaceState) history.replaceState(null, '', '#' + current + '-' + here);
  }

  function mark(stop, scroll) {
    here = stop;
    route.classList.add('has-here');
    each(stops, function (link) {
      var active = link.getAttribute('data-stop') === stop;
      link.classList.toggle('is-here', active);
      if (active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    each(root.querySelectorAll('.dev-map__stage'), function (stage) {
      stage.classList.toggle('is-here', stage.id === current + '-' + stop);
    });
    if (scroll) {
      var target = document.getElementById(current + '-' + stop) || document.getElementById('dev-map-track-' + current);
      if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function applyHash() {
    var hash = decodeURIComponent(location.hash.slice(1)).split('-');
    var hashTrack = hash[0];
    var hashStop = hash.slice(1).join('-');
    var known = Array.prototype.some.call(tabs, function (tab) { return tab.getAttribute('data-track') === hashTrack; });

    if (known && hashStop) here = hashStop;
    show(known ? hashTrack : current);
    if (known && hashStop) mark(hashStop, true);
  }

  each(tabs, function (tab) {
    tab.addEventListener('click', function () { show(tab.getAttribute('data-track')); });
  });
  each(stops, function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      mark(link.getAttribute('data-stop'), true);
      remember();
    });
  });
  window.addEventListener('hashchange', applyHash);

  applyHash();
})();
