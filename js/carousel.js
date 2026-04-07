/* ═══════════════════════════════════════════════
   MORGAN STUDIO — carousel.js
═══════════════════════════════════════════════ */
(function () {
  'use strict';

  var section  = document.getElementById('hc-section');
  var sticky   = section && section.querySelector('.hc-sticky');
  var track    = document.getElementById('hc-track');
  var progFill = document.getElementById('hc-progress-fill');
  var counter  = document.getElementById('hc-counter');
  var hint     = document.getElementById('hc-scroll-hint');

  if (!section || !sticky || !track) return;

  var cards    = track.querySelectorAll('.hc-card:not(.hc-card--portfolio-intro)');
  var total    = cards.length;
  var allCards = Array.prototype.slice.call(track.querySelectorAll('.hc-card'));
  var cardVisible   = allCards.map(function () { return false; });
  var sectionActive = false;

  sticky.style.position = 'relative';
  sticky.style.top      = 'auto';
  sticky.style.height   = 'auto';

  /* ── Hauteur viewport fiable (tient compte des barres navigateur mobile) ── */
  function getVH() {
    /* visualViewport est la vraie hauteur visible (exclut les barres browser) */
    if (window.visualViewport) return window.visualViewport.height;
    return window.innerHeight;
  }

  function getAbsoluteTop(el) {
    var top = 0;
    while (el) { top += el.offsetTop; el = el.offsetParent; }
    return top;
  }

  function getRange() {
    return Math.max(track.scrollWidth - window.innerWidth, 0);
  }

  var sectionAbsTop = 0;
  var sectionH      = 0;

  function measure() {
    sectionAbsTop = getAbsoluteTop(section);
    sectionH      = section.offsetHeight;
  }

  function revealCard(card, i, delay) {
    if (cardVisible[i]) return;
    cardVisible[i] = true;
    setTimeout(function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          card.classList.add('hc-card--visible');
        });
      });
    }, delay || 0);
  }

  function updateCardReveal(progress) {
    if (!sectionActive) return;
    /* Carte 0 déjà révélée par IntersectionObserver — on part de 1 */
    allCards.forEach(function (card, i) {
      if (i === 0) return;
      /* Chaque carte apparaît à intervalles réguliers du scroll */
      var threshold = (i / allCards.length) * 0.85;
      if (!cardVisible[i] && progress >= threshold) {
        revealCard(card, i, 0);
      }
    });
  }

  function onScroll() {
    var vh        = getVH();
    var scrollY   = window.scrollY || window.pageYOffset;
    var maxScroll = sectionH - vh;
    var scrolled  = scrollY - sectionAbsTop;
    var progress  = maxScroll > 0
      ? Math.min(Math.max(scrolled / maxScroll, 0), 1)
      : 0;

    var inSection   = scrolled >= 0 && scrolled <= maxScroll;
    var pastSection = scrolled > maxScroll;

    if ((inSection || pastSection) && !sectionActive) {
      sectionActive = true;
    }

    if (inSection) {
      sticky.style.position = 'fixed';
      sticky.style.top      = '0';
      sticky.style.left     = '0';
      sticky.style.width    = '100%';
      sticky.style.height   = vh + 'px';
      section.style.paddingBottom = vh + 'px';
    } else if (pastSection) {
      sticky.style.position = 'absolute';
      sticky.style.top      = 'auto';
      sticky.style.bottom   = '0';
      sticky.style.left     = '0';
      sticky.style.width    = '100%';
      sticky.style.height   = vh + 'px';
      section.style.paddingBottom = '0';
    } else {
      sticky.style.position = 'relative';
      sticky.style.top      = 'auto';
      sticky.style.bottom   = 'auto';
      sticky.style.width    = '';
      sticky.style.height   = vh + 'px';
      section.style.paddingBottom = '0';
    }

    track.style.transform = 'translateX(' + (-(getRange() * progress)) + 'px)';

    if (progFill) progFill.style.width = (progress * 100) + '%';

    if (counter) {
      var current = Math.min(Math.floor(progress * total) + 1, total);
      counter.textContent = pad(current) + ' / ' + pad(total);
    }

    if (hint) hint.classList.toggle('hidden', progress > 0.04);

    updateCardReveal(progress);
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ── Resize + visualViewport resize (barres navigateur mobile) ── */
  function onResize() {
    clearTimeout(window._hcResize);
    window._hcResize = setTimeout(function () { measure(); onScroll(); }, 150);
  }

  window.addEventListener('resize', onResize);

  /* visualViewport se redimensionne quand les barres du browser apparaissent/disparaissent */
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onScroll);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Révèle la carte 0 dès que la section entre dans le viewport ── */
  var ioFirstCard = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        revealCard(allCards[0], 0, 0);
        ioFirstCard.disconnect();
      }
    });
  }, { threshold: 0.1 });

  function init() {
    measure();
    sticky.style.height = getVH() + 'px';
    ioFirstCard.observe(section);
    onScroll();
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }

})();
