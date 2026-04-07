/* ═══════════════════════════════════════════════
   MORGAN STUDIO — offre-lancement.js
   Badge flottant + carte offre de lancement
═══════════════════════════════════════════════ */
(function () {
  'use strict';

  var SESSION_KEY = 'ms-offre-seen';

  var style = document.createElement('style');
  style.textContent = [

    /* ── Carte ── */
    '#ms-offre-card{',
      'position:fixed;bottom:32px;right:32px;z-index:9998;',
      'width:clamp(280px,88vw,340px);',
      'background:var(--bleu-nuit);',
      'border:1px solid var(--gris-fin);',
      'border-radius:16px;padding:24px 24px 20px;',
      'box-shadow:0 24px 60px rgba(0,0,0,.55);',
      'transform:translateY(20px);opacity:0;',
      'transition:transform .5s cubic-bezier(.22,1,.36,1),opacity .5s cubic-bezier(.22,1,.36,1);',
      'pointer-events:none;',
    '}',
    '#ms-offre-card.ms-offre-visible{',
      'transform:translateY(0);opacity:1;pointer-events:all;',
    '}',
    '#ms-offre-card.ms-footer-hide{',
      'opacity:0!important;pointer-events:none!important;transform:translateY(20px)!important;',
    '}',
   

    /* Header carte */
    '.ms-offre-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}',
    '.ms-offre-pill{',
      'display:inline-flex;align-items:center;gap:6px;',
      'font-family:var(--font-body);font-size:.62rem;font-weight:700;',
      'letter-spacing:.16em;text-transform:uppercase;',
      'color:var(--bleu-clair);',
      'background:rgba(91,91,214,.14);',
      'border:1px solid rgba(91,91,214,.28);',
      'padding:5px 12px;border-radius:100px;',
    '}',
    '.ms-offre-pill::before{',
      'content:"";width:5px;height:5px;border-radius:50%;',
      'background:var(--bleu-violet);',
      'animation:ms-offre-pulse 2s infinite;',
    '}',
    '@keyframes ms-offre-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}',

    '.ms-offre-close{',
      'width:28px;height:28px;border-radius:50%;border:1px solid var(--gris-fin);',
      'background:transparent;color:var(--gris);',
      'display:flex;align-items:center;justify-content:center;',
      'cursor:pointer;transition:all .25s;flex-shrink:0;',
    '}',
    '.ms-offre-close:hover{border-color:var(--blanc);color:var(--blanc);}',
    '.ms-offre-close svg{width:12px;height:12px;}',

    '.ms-offre-title{',
      'font-family:var(--font-display);font-size:1.15rem;',
      'color:var(--blanc);line-height:1.3;margin-bottom:8px;',
    '}',
    '.ms-offre-title span{color:var(--bleu-clair);}',
    '.ms-offre-desc{',
      'font-family:var(--font-body);font-size:.82rem;',
      'line-height:1.55;color:var(--gris);margin-bottom:0;',
    '}',

    /* ── Badge ── */
    '#ms-offre-badge{',
      'position:fixed;bottom:32px;right:32px;z-index:9997;',
      'display:inline-flex;align-items:center;gap:8px;',
      'font-family:var(--font-body);font-size:.7rem;font-weight:700;',
      'letter-spacing:.12em;text-transform:uppercase;',
      'color:var(--bleu-clair);',
      'background:var(--bleu-nuit);',
      'border:1px solid rgba(91,91,214,.35);',
      'height:44px;padding:0 16px 0 12px;',
      'border-radius:100px;',
      'box-shadow:0 8px 24px rgba(0,0,0,.4);',
      'cursor:pointer;',
      'opacity:0;transform:translateY(12px);',
      'transition:opacity .35s ease, transform .35s cubic-bezier(.22,1,.36,1), background .25s, border-color .25s;',
      'pointer-events:none;',
      'white-space:nowrap;',
    '}',
    '#ms-offre-badge.ms-badge-visible{',
      'opacity:1;transform:translateY(0);pointer-events:all;',
    '}',
    '#ms-offre-badge.ms-badge-hidden{',
      'opacity:0;transform:translateY(12px);pointer-events:none;',
    '}',
    '#ms-offre-badge:hover{background:rgba(91,91,214,.18);border-color:var(--bleu-clair);}',

    '.ms-badge-dot{',
      'width:7px;height:7px;min-width:7px;border-radius:50%;',
      'background:var(--bleu-violet);',
      'animation:ms-offre-pulse 2s infinite;',
    '}',

    /* Mobile */
    '@media(max-width:480px){',
      '#ms-offre-card{bottom:20px;right:16px;left:16px;width:auto;}',
      '#ms-offre-badge{bottom:20px;right:16px;}',
    '}',

  ].join('');
  document.head.appendChild(style);

  /* ── DOM ── */
  function buildCard() {
    var card = document.createElement('div');
    card.id = 'ms-offre-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-label', 'Offre de lancement');
    card.innerHTML = [
      '<div class="ms-offre-header">',
        '<span class="ms-offre-pill">Offre de lancement</span>',
        '<button class="ms-offre-close" id="ms-offre-close" aria-label="Fermer">',
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">',
            '<path d="M18 6L6 18M6 6l12 12"/>',
          '</svg>',
        '</button>',
      '</div>',
      '<p class="ms-offre-title">Tout commence <span><br>quelque part.</span></p>',
      '<p class="ms-offre-desc">Je me lance avec des tarifs accessibles et beaucoup d\'envie. Votre projet mérite d\'être bien fait — Parlons-en !</p>',
    ].join('');
    return card;
  }

  function buildBadge() {
    var badge = document.createElement('button');
    badge.id = 'ms-offre-badge';
    badge.setAttribute('aria-label', 'Voir l\'offre de lancement');
    badge.innerHTML = '<span class="ms-badge-dot"></span><span>Offre de lancement</span>';
    return badge;
  }

  /* ── Logique ── */
  function init() {
    var alreadySeen = sessionStorage.getItem(SESSION_KEY);

    var card  = buildCard();
    var badge = buildBadge();
    document.body.appendChild(card);
    document.body.appendChild(badge);

    var closeBtn   = document.getElementById('ms-offre-close');
    var scrollTimer;
    var isScrolling = false;
    var badgeActive = false; /* true quand le badge doit être montré */

    /* ── Scroll : cache le badge pendant le scroll, le remet après ── */
    /* + cache badge ET carte quand le footer est visible              */
    function isFooterVisible() {
      var footer = document.getElementById('footer');
      if (!footer) return false;
      var rect = footer.getBoundingClientRect();
      return rect.top < window.innerHeight;
    }

    /* ── Scroll : cache le badge pendant le scroll, le remet après ── */
    /* + cache badge ET carte quand le footer est visible              */
    function isFooterVisible() {
      var footer = document.getElementById('footer');
      if (!footer) return false;
      return footer.getBoundingClientRect().top < window.innerHeight;
    }

    /* État footer : true = footer visible en ce moment */
    var footerVisible = false;

    function onScroll() {
      var nowVisible = isFooterVisible();

      if (nowVisible !== footerVisible) {
        footerVisible = nowVisible;
        if (nowVisible) {
          /* Footer entre dans le viewport — tout masquer */
          clearTimeout(scrollTimer);
          isScrolling = false;
          badge.classList.add('ms-badge-hidden');
          card.classList.add('ms-footer-hide');
        } else {
          /* Footer sort du viewport — restaurer */
          card.classList.remove('ms-footer-hide');
          if (badgeActive) badge.classList.remove('ms-badge-hidden');
        }
        return;
      }

      /* Comportement scroll normal sur le badge (footer non visible) */
      if (footerVisible || !badgeActive) return;
      if (!isScrolling) {
        isScrolling = true;
        badge.classList.add('ms-badge-hidden');
      }
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        isScrolling = false;
        badge.classList.remove('ms-badge-hidden');
      }, 800);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Afficher / masquer la carte ── */
    function showBadge() {
      badgeActive = true;
      badge.style.display = '';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          badge.classList.add('ms-badge-visible');
        });
      });
    }

    function showCard() {
      badgeActive = false;
      badge.classList.remove('ms-badge-visible');
      badge.classList.remove('ms-badge-hidden');
      setTimeout(function () { badge.style.display = 'none'; }, 400);
      card.classList.add('ms-offre-visible');
    }

    function hideCard() {
      card.classList.remove('ms-offre-visible');
      setTimeout(function () { showBadge(); }, 350);
    }

    closeBtn.addEventListener('click', function () {
      hideCard();
      sessionStorage.setItem(SESSION_KEY, '1');
    });

    badge.addEventListener('click', showCard);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && card.classList.contains('ms-offre-visible')) {
        hideCard();
      }
    });

    /* ── Menu mobile : cache badge + carte à l'ouverture, restaure à la fermeture ── */
    var header = document.getElementById('header');
    if (header) {
      var menuObserver = new MutationObserver(function () {
        var isMenuOpen = header.classList.contains('menu-open');
        if (isMenuOpen) {
          card.style.opacity       = '0';
          card.style.pointerEvents = 'none';
          badge.style.opacity      = '0';
          badge.style.pointerEvents = 'none';
        } else {
          card.style.opacity       = '';
          card.style.pointerEvents = '';
          badge.style.opacity      = '';
          badge.style.pointerEvents = '';
        }
      });
      menuObserver.observe(header, { attributes: true, attributeFilter: ['class'] });
    }

    if (alreadySeen) {
      /* Session déjà vue — badge direct */
      setTimeout(showBadge, 600);
    } else {
      /* Première visite — carte d'abord */
      var delay = sessionStorage.getItem('ms-loaded') ? 800 : 3600;
      setTimeout(function () {
        card.classList.add('ms-offre-visible');
      }, delay);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
