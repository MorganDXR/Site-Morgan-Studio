/* ═══════════════════════════════════════════════
   MORGAN STUDIO — loader.js
═══════════════════════════════════════════════ */
(function () {

  if (sessionStorage.getItem('ms-loaded')) return;
  sessionStorage.setItem('ms-loaded', '1');

  var style = document.createElement('style');
  style.textContent = [
    '#ms-loader{position:fixed;inset:0;z-index:99999;background:#0f0f14;display:flex;align-items:center;justify-content:center;transition:opacity .7s cubic-bezier(.4,0,.2,1)}',
    '#ms-loader.ms-loader-hide{opacity:0;pointer-events:none}',
    '.ms-loader-inner{display:flex;align-items:center;justify-content:center}',
    '.ms-loader-svg{width:min(130px,21vw);overflow:visible}',
    '.ms-loader-svg path,.ms-loader-svg polygon,.ms-loader-svg rect{fill:#f5f5fa}',
    '#ms-loader-track{fill:#f5f5fa;transition:fill .7s ease}',
    '#ms-loader-thumb{fill:#0f0f14!important;transition:cx .9s cubic-bezier(.25,.1,.25,1)}',
    '.ms-loader-group{opacity:0;transform:translateY(10px);animation:ms-group-in .55s cubic-bezier(.4,0,.2,1) forwards}',
    '#ms-g-morgan{animation-delay:.1s}',
    '#ms-g-studio{animation-delay:.45s}',
    '@keyframes ms-group-in{to{opacity:1;transform:translateY(0)}}',
    'body.ms-ready{transition:opacity .8s ease}'
  ].join('');
  document.head.appendChild(style);

  function inject() {
    var overlay = document.createElement('div');
    overlay.id = 'ms-loader';
    overlay.innerHTML = '<div class="ms-loader-inner"><svg class="ms-loader-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1009.96 474.52" aria-hidden="true"><g class="ms-loader-group" id="ms-g-morgan"><path d="M60.51.94c3.23,34.98,12.38,69.4,15.92,104.31,2.8,27.69,2.19,55.87,4.01,83.6,3.69,1.06,2.29-3.42,2.37-5.57,1.14-29.17,1.59-58.41,4.98-87.39C91.39,65.04,101.81.94,101.81.94h62.2v214.97h-42.99c-1.96-62.93,4.66-125.48,11.14-187.89-4.09-1.34-4.2,4.73-4.58,7.33-3.28,22.57-4.92,45.46-8.42,68.03-5.85,37.7-13.85,74.98-20.45,112.51l-33.53-.68c-9.82-41.35-17.23-83.91-23.51-126.17-2.74-18.43-3.89-37.15-6.57-55.53-.4-2.72-.3-5.48-4.03-5.53l10.32,113.89,1.61,74.03H0V.94h60.51Z"/><path d="M275.12,1.38c86.42-9.74,150.57,79.45,109.94,157.71-36.92,71.12-138,78.72-185.08,13.68C151.11,105.26,193.14,10.62,275.12,1.38ZM279.87,42.75c-85.21,10.88-70.93,139.75,13.9,133.32,87.15-6.6,75.78-144.77-13.9-133.32Z"/><path d="M486.47.94c37.47,5.04,53.11,54.72,35.58,84.94-2.35,4.05-4.88,7.01-7.66,9.29-8.22,6.76-17.84,8.63-21.6,9.25-.99.16-1.82.27-2.37.33,0,.96.01,1.92.02,2.87,10.04.32,20.3,6.86,24.2,16.43l23.58,91.86h-42.99l-23.96-90.69-14.26-.07v90.76h-42.99V.94c22.56,2.19,50.57-2.94,72.45,0ZM457.01,85.33c14.76.96,27.28-1.35,28.74-18.23,1.85-21.44-7.93-28.85-28.74-26.36v44.59Z"/><path d="M735.67,80.56h-42.99c-5.68-26.67-32.31-40.13-58.1-38.18-74.68,5.64-75.28,128.01,0,133.69,25.53,1.93,53.76-12.03,59.69-38.18h-54.14v-36.62h100.32v35.83c0,35.21-43.78,69.95-75.42,77.45-100,23.68-162.59-85.74-112.16-167.89,45.2-73.63,172.71-56.22,182.81,33.92Z"/><path d="M740.45,215.91L774.79.87l61.18.08,33.45,214.95h-42.99l-6.54-49.19h-29.92l-6.54,49.19h-42.99ZM807.32,35.96h-4.76l-7.96,90.76h20.69l-7.96-90.76Z"/><path d="M933.87.94s23.2,89.7,32.2,133.45c3.31,16.08,5.05,33.17,8.44,48.88.56,2.59,0,5.54,3.97,5.58-10.25-62.16-17.99-124.56-15.11-187.91h42.99v214.97h-47.77c-18.99-61.78-35.69-124.16-46.99-187.91-4.11-.6-2.11,2.82-1.92,5.12,2.65,31.84,11.91,65.28,13.86,97.62l1.61,85.18h-42.99V.94h51.7Z"/></g><g class="ms-loader-group" id="ms-g-studio"><path d="M108.28,324.19h-39.81c-.09-9.96,2.99-30.32-11.94-30.34-9.83-.01-12.32,11.02-10.97,18.89,4.37,25.56,58.74,51.63,68.33,86.26,6.37,23.03.72,55.04-22.03,67.2C54.84,485.96,0,470.22,0,422.12v-24.68h41.4v27.87c0,1.73,5.22,8.81,7.5,10.01,16.96,8.94,26.64-8.19,23.95-23.96-2.89-16.99-39.53-40.94-52.11-56.16-41.74-50.48-8.83-116.69,58.16-94.78,12.86,4.21,29.38,20.15,29.38,34.32v29.46Z"/><polygon points="230.89 257.31 230.89 297.12 197.45 297.12 197.45 472.28 154.46 472.28 154.46 297.12 121.02 297.12 121.02 257.31 230.89 257.31"/><path d="M286.63,257.31v166.4c0,10.96,27.07,10.96,27.07,0v-166.4h42.99v171.18c0,31.28-37.29,47.71-64.46,45.36-20.17-1.75-48.59-19.91-48.59-42.17v-174.36h42.99Z"/><path d="M375.8,472.28v-214.97h69.27c17.91,0,37.07,22.85,42.63,38.58,8.94,25.29,9.18,108.46,1.18,134.21-5.7,18.36-24.47,42.17-45.41,42.17h-67.68ZM418.79,432.47c14.53,1.52,24.13-2.21,29.11-16.28,4.91-13.86,4.09-71.02,2.81-88.09-1.52-20.24-9.42-33.9-31.92-30.98v135.35Z"/><rect x="512.74" y="257.31" width="42.99" height="214.97"/><path id="ms-loader-track" d="M681.56,257.01c-4.3,0-8.68.23-13.12.73-81.94,9.24-124.01,103.89-75.14,171.39,21.79,30.1,55.09,44.63,88.26,44.55h220.06c59.83,0,108.34-48.5,108.34-108.34h0c0-59.83-48.5-108.34-108.34-108.34h-220.06Z"/><circle id="ms-loader-thumb" cx="681" cy="365.34" r="67" fill="#0f0f14"/></g></svg></div>';

    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.style.overflow = 'hidden';

    /* Toggle animation */
    setTimeout(function () {
      var thumb = document.getElementById('ms-loader-thumb');
      var track = document.getElementById('ms-loader-track');
      if (thumb) thumb.setAttribute('cx', '901');
      if (track) track.style.fill = '#bbbfff';
      setTimeout(function () {
        if (thumb) thumb.setAttribute('cx', '681');
      }, 1000);
    }, 1050);

    /* Fade out loader puis apparition fondu du site */
    setTimeout(function () {
      overlay.classList.add('ms-loader-hide');
      document.body.style.overflow = '';
      setTimeout(function () {
        /* Loader retiré — site apparaît en fondu */
        overlay.parentNode && overlay.parentNode.removeChild(overlay);
        style.parentNode && style.parentNode.removeChild(style);
        document.body.classList.add('ms-ready');
      }, 750);
    }, 3200);
  }

  if (document.body) {
    inject();
  } else {
    document.addEventListener('DOMContentLoaded', inject);
  }

})();
