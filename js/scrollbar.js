/* ═══════════════════════════════════════════════
   MORGAN STUDIO — scrollbar.js
   Scrollbar custom sans fond, draggable
═══════════════════════════════════════════════ */
(function () {
  function getVH() {
    return window.visualViewport ? window.visualViewport.height : window.innerHeight;
  }

  var track = document.createElement('div');
  track.id = 'custom-scrollbar';

  var thumb = document.createElement('div');
  thumb.id = 'custom-scrollbar-thumb';

  track.appendChild(thumb);
  document.body.appendChild(track);

  var scrollTimer;
  var isDragging = false;
  var dragStartY = 0;
  var dragStartScroll = 0;

  function updateThumb() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - getVH();
    var viewHeight = getVH();

    var thumbHeight = Math.max((viewHeight / (docHeight + viewHeight)) * viewHeight, 40);
    var thumbTop = (scrollTop / docHeight) * (viewHeight - thumbHeight);

    thumb.style.height = thumbHeight + 'px';
    thumb.style.top = thumbTop + 'px';

    document.body.classList.add('scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      if (!isDragging) document.body.classList.remove('scrolling');
    }, 1000);
  }

  // Drag
  thumb.addEventListener('mousedown', function (e) {
    isDragging = true;
    dragStartY = e.clientY;
    dragStartScroll = window.scrollY;
    document.body.classList.add('scrolling');
    e.preventDefault();
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    var docHeight = document.documentElement.scrollHeight - getVH();
    var viewHeight = getVH();
    var thumbHeight = Math.max((viewHeight / (docHeight + viewHeight)) * viewHeight, 40);
    var ratio = docHeight / (viewHeight - thumbHeight);
    window.scrollTo(0, dragStartScroll + (e.clientY - dragStartY) * ratio);
  });

  document.addEventListener('mouseup', function () {
    if (!isDragging) return;
    isDragging = false;
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      document.body.classList.remove('scrolling');
    }, 1000);
  });

  // Clic sur le track pour sauter
  track.addEventListener('click', function (e) {
    if (e.target === thumb) return;
    var viewHeight = getVH();
    var docHeight = document.documentElement.scrollHeight - getVH();
    var ratio = e.clientY / viewHeight;
    window.scrollTo({ top: ratio * docHeight, behavior: 'smooth' });
  });

  window.addEventListener('scroll', updateThumb, { passive: true });
  window.addEventListener('resize', updateThumb);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateThumb);
  }
  updateThumb();
})();