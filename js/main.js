/* ═══════════════════════════════════════════════
   MORGAN STUDIO — main.js
═══════════════════════════════════════════════ */

(function () {

  /* ── Curseur ── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (cursor && ring) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    }, { passive: true });

    function animateRing() {
      rx += (mx - rx) * .22;
      ry += (my - ry) * .22;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
  }

  /* ── Header hide on scroll ── */
  const header = document.getElementById('header');
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    // header.classList.toggle('hidden', y > lastY && y > 80); // Désactivé - header reste fixe
    lastY = y;
  }, { passive: true });

  /* ── Menu mobile ── */
  const menuToggle = document.getElementById('menuToggle');

  function openMenu() {
    header.classList.add('menu-open');
    menuToggle.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    header.classList.remove('menu-open');
    menuToggle.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      header.classList.contains('menu-open') ? closeMenu() : openMenu();
    });
    document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── Touch services ── */
  const serviceItems = document.querySelectorAll('.service-item');
  if ('ontouchstart' in window && serviceItems.length) {
    serviceItems.forEach(item => {
      item.addEventListener('touchstart', () => {
        const isActive = item.classList.contains('touch-active');
        serviceItems.forEach(i => i.classList.remove('touch-active'));
        if (!isActive) item.classList.add('touch-active');
      }, { passive: true });
    });
  }

  /* ── Reveal IntersectionObserver ── */
  const revealEls = document.querySelectorAll('.reveal, .stat-item, .process-step');
  const hasHash = window.location.hash && window.location.hash.length > 1;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = hasHash ? 0 : i * 40;
        setTimeout(() => {
          entry.target.classList.add('visible');
          // Stagger sur les enfants service-item si c'est la services-list
          if (entry.target.classList.contains('services-list')) {
            entry.target.querySelectorAll('.service-item').forEach((item, idx) => {
              setTimeout(() => item.classList.add('visible'), idx * 80);
            });
          }
        }, delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    if (hasHash) {
      el.classList.add('visible');
      if (el.classList.contains('services-list')) {
        el.querySelectorAll('.service-item').forEach(item => item.classList.add('visible'));
      }
    } else io.observe(el);
  });

  /* Stagger service-item individuel */
  document.querySelectorAll('.service-item').forEach(item => {
    if (!item.classList.contains('reveal')) item.classList.add('reveal');
  });

  /* ── Smooth scroll ancres avec offset pour header fixe ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // scrollIntoView respecte le scroll-margin-top défini en CSS
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Protection des images ── */
  document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

})();