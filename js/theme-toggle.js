/* ═══════════════════════════════════════════════
   MORGAN STUDIO — theme-toggle.js
   SVG logo natif dans le HTML — pas d'injection
═══════════════════════════════════════════════ */
(function () {
  var STORAGE_KEY = 'ms-theme';

  function applyTheme(theme) {
    var root  = document.documentElement;

    // Navbar
    var thumb = document.getElementById('logo-thumb');
    var track = document.getElementById('toggle-track');
    var moon  = document.getElementById('logo-moon');
    var sun   = document.getElementById('logo-sun');

    // Footer
    var thumbF = document.getElementById('logo-thumb-footer');
    var trackF = document.getElementById('toggle-track-footer');
    var moonF  = document.getElementById('logo-moon-footer');
    var sunF   = document.getElementById('logo-sun-footer');

    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      if (thumb)  thumb.setAttribute('cx', '901');
      if (thumbF) thumbF.setAttribute('cx', '901');
      if (track)  { track.style.fill = '#BBBFFF'; track.style.opacity = '1'; }
      if (trackF) { trackF.style.fill = '#BBBFFF'; trackF.style.opacity = '1'; }
      if (moon)   { moon.style.opacity = '0'; moon.classList.remove('active'); }
      if (moonF)  moonF.style.opacity = '0';
      if (sun)    { sun.style.opacity = ''; sun.classList.add('active'); }
      if (sunF)   sunF.style.opacity = '';
    } else {
      root.setAttribute('data-theme', 'dark');
      if (thumb)  thumb.setAttribute('cx', '681');
      if (thumbF) thumbF.setAttribute('cx', '681');
      if (track)  { track.style.fill = '#BBBFFF'; track.style.opacity = '1'; }
      if (trackF) { trackF.style.fill = '#BBBFFF'; trackF.style.opacity = '1'; }
      if (moon)   { moon.style.opacity = ''; moon.classList.add('active'); }
      if (moonF)  moonF.style.opacity = '';
      if (sun)    { sun.style.opacity = '0'; sun.classList.remove('active'); }
      if (sunF)   sunF.style.opacity = '0';
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function init() {
    var btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var cur = document.documentElement.getAttribute('data-theme') || 'dark';
        applyTheme(cur === 'dark' ? 'light' : 'dark');
      });
    }

    var saved = localStorage.getItem(STORAGE_KEY) || 'dark';
    document.documentElement.classList.add('no-transition');
    applyTheme(saved);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.documentElement.classList.remove('no-transition');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();