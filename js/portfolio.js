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

  /* ── Menu mobile — géré par main.js ── */

  /* ══════════════════════════════════════
     REVEAL — scroll fluide
     will-change activé juste avant, retiré après
  ══════════════════════════════════════ */
  const cards = document.querySelectorAll('.project-card');

  function animateIn(el, delay) {
    // Active le layer GPU juste avant
    el.classList.add('animating');
    setTimeout(() => {
      el.classList.add('visible');
      // Retire will-change après la fin de la transition (600ms max)
      setTimeout(() => el.classList.remove('animating'), 750);
    }, delay);
  }

  // Reveal éléments simples
  const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-stagger');
  const ioReveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        ioReveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => ioReveal.observe(el));

  // Cartes — vague par position verticale, will-change géré proprement
  const ioCards = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting);
    if (!visible.length) return;

    visible
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      .forEach((entry, i) => {
        animateIn(entry.target, 100 + i * 80);
        ioCards.unobserve(entry.target);
      });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  // Double rAF : attend que le navigateur ait peint opacity:0 avant d'observer
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cards.forEach(card => ioCards.observe(card));
    });
  });

  /* ── Filtres ── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const filterTimers = new Map();
  const gridEl       = document.getElementById('grid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      gridEl.classList.toggle('is-filtered', filter !== 'all');

      cards.forEach(card => {
        if (filterTimers.has(card)) {
          clearTimeout(filterTimers.get(card));
          filterTimers.delete(card);
        }
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('filtering', 'hidden-card');
          card.classList.add('visible');
          const t = setTimeout(() => {
            card.classList.add('visible');
            filterTimers.delete(card);
          }, 60);
          filterTimers.set(card, t);
        } else {
          card.classList.add('filtering');
          const t = setTimeout(() => {
            card.classList.add('hidden-card');
            filterTimers.delete(card);
          }, 350);
          filterTimers.set(card, t);
        }
      });
    });
  });

  /* ── Préchargement ── */
  cards.forEach(card => {
    const img = card.querySelector('.card-img');
    if (img) card._imgSrc = img.src;
  });

  /* ── Carousel ── */
  let carouselIndex  = 0;
  let carouselImages = [];

  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots  = document.getElementById('carouselDots');
  const carouselPrev  = document.getElementById('carouselPrev');
  const carouselNext  = document.getElementById('carouselNext');
  const modalImgPanel = document.querySelector('.modal-img-panel');

  function buildCarousel(srcs) {
    carouselImages = srcs;
    carouselIndex  = 0;
    carouselTrack.innerHTML = '';
    carouselDots.innerHTML  = '';

    const trackFrag = document.createDocumentFragment();
    const dotsFrag  = document.createDocumentFragment();

    srcs.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      const img = document.createElement('img');
      img.src = src; img.alt = '';
      if (i > 0) img.loading = 'lazy';
      slide.appendChild(img);
      trackFrag.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsFrag.appendChild(dot);
    });

    carouselTrack.appendChild(trackFrag);
    carouselDots.appendChild(dotsFrag);
    goToSlide(0);
  }

  function goToSlide(idx) {
    carouselIndex = idx;
    carouselTrack.style.transform = `translateX(-${idx * 100}%)`;
    carouselDots.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  if (carouselPrev) carouselPrev.addEventListener('click', () => goToSlide((carouselIndex - 1 + carouselImages.length) % carouselImages.length));
  if (carouselNext) carouselNext.addEventListener('click', () => goToSlide((carouselIndex + 1) % carouselImages.length));

  let touchStartX = 0;
  if (carouselTrack) {
    carouselTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carouselTrack.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goToSlide(diff > 0
        ? (carouselIndex + 1) % carouselImages.length
        : (carouselIndex - 1 + carouselImages.length) % carouselImages.length);
    });
  }

  /* ── Modale ── */
  const modal         = document.getElementById('modal');
  const modalImg      = document.getElementById('modalImg');
  const modalTag      = document.getElementById('modalTag');
  const modalTitle    = document.getElementById('modalTitle');
  const modalDesc     = document.getElementById('modalDesc');
  const modalClient   = document.getElementById('modalClient');
  const modalYear     = document.getElementById('modalYear');
  const modalRole     = document.getElementById('modalRole');
  const modalNum      = document.getElementById('modalNum');
  const modalClose    = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const grid          = document.getElementById('grid');

  if (grid) {
    grid.addEventListener('click', e => {
      const cta = e.target.closest('.card-cta');
      if (!cta) return;
      e.preventDefault();
      const card = cta.closest('.project-card');
      if (!card) return;

      modalTag.textContent    = card.dataset.category;
      modalTitle.textContent  = card.dataset.title;
      modalDesc.textContent   = card.dataset.desc;
      modalClient.textContent = card.dataset.client;
      modalYear.textContent   = card.dataset.year;
      modalRole.textContent   = card.dataset.role;
      if (modalNum) modalNum.textContent = card.querySelector('.card-number')?.textContent || '';

      const carouselData = card.dataset.carousel;
      if (carouselData) {
        modalImgPanel.classList.add('has-carousel');
        buildCarousel(carouselData.split('|'));
      } else {
        modalImgPanel.classList.remove('has-carousel');
        const src = card._imgSrc || '';
        if (modalImg.getAttribute('src') !== src) {
          modalImg.style.opacity = '0';
          modalImg.src = src;
          if (modalImg.complete && modalImg.naturalWidth > 0) {
            modalImg.style.opacity = '1';
          } else {
            modalImg.onload = () => {
              modalImg.style.transition = 'opacity .2s ease';
              modalImg.style.opacity = '1';
            };
          }
        }
      }

      rx = mx; ry = my;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        const mc = modal.querySelector('.modal-content');
        if (mc) mc.scrollTop = 0;
      }, 50);
    });
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (modalClose)    modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  if ('ontouchstart' in window && grid) {
    grid.addEventListener('touchstart', e => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const isActive = card.classList.contains('touch-hover');
      cards.forEach(c => c.classList.remove('touch-hover'));
      if (!isActive) card.classList.add('touch-hover');
    }, { passive: true });
  }

  /* ── Protection des images ── */
  document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

})();