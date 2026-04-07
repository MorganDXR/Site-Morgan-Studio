/* ═══════════════════════════════════════════════
   animated-text.js — Mots rotatifs (bug corrigé)
═══════════════════════════════════════════════ */
(function () {
  const words = [ 'unique','sincère.', 'précis.', 'vivant.'];
  let current = 0;
  let animating = false;

  const container = document.querySelector('.hero-rotating-wrap');
  if (!container) return;

  // Crée et affiche le premier mot sans animation
  const firstSpan = document.createElement('span');
  firstSpan.className = 'rotating-word';
  firstSpan.textContent = words[0];
  firstSpan.style.transform = 'translateY(0)';
  firstSpan.style.opacity = '1';
  container.appendChild(firstSpan);

  function nextWord() {
    if (animating) return;
    animating = true;

    const oldSpan = container.querySelector('.rotating-word');
    current = (current + 1) % words.length;

    // Nouvelle span positionnée en bas, hors du cadre
    const newSpan = document.createElement('span');
    newSpan.className = 'rotating-word';
    newSpan.textContent = words[current];
    // Désactiver la transition le temps de la positionner
    newSpan.style.transition = 'none';
    newSpan.style.transform = 'translateY(110%)';
    newSpan.style.opacity = '0';
    container.appendChild(newSpan);

    // Forcer le reflow
    newSpan.getBoundingClientRect();

    // Réactiver les transitions
    newSpan.style.transition = '';
    oldSpan.style.transition = '';

    // Ancienne sort par le haut, nouvelle entre par le bas
    requestAnimationFrame(() => {
      oldSpan.style.transform = 'translateY(-110%)';
      oldSpan.style.opacity = '0';
      newSpan.style.transform = 'translateY(0)';
      newSpan.style.opacity = '1';
    });

    // Nettoyer l'ancienne span après la transition
    setTimeout(() => {
      if (oldSpan && oldSpan.parentNode) {
        oldSpan.parentNode.removeChild(oldSpan);
      }
      animating = false;
    }, 650);
  }

  setInterval(nextWord, 2400);
})();