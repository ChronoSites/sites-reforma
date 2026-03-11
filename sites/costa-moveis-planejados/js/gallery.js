/* ============================================================
   GALLERY — Lightbox with keyboard + swipe support
   ============================================================ */
(function () {
  'use strict';

  var lightbox    = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxLbl = document.getElementById('lightboxLabel');
  var closeBtn    = document.getElementById('lightboxClose');
  var prevBtn     = document.getElementById('lightboxPrev');
  var nextBtn     = document.getElementById('lightboxNext');

  // Only real image items (skip placeholders)
  var items = Array.from(
    document.querySelectorAll('.gallery-item:not(.gallery-placeholder)')
  );

  var currentIndex = 0;
  var touchStartX  = 0;

  /* ---------------------------------------------------------
     Open / close
  --------------------------------------------------------- */
  function open(index) {
    currentIndex = index;
    var item = items[index];
    lightboxImg.src = item.dataset.src || '';
    lightboxImg.alt = (item.querySelector('img') || {}).alt || '';
    lightboxLbl.textContent = item.dataset.label || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    // Small delay before clearing src prevents flash on reopen
    setTimeout(function () {
      if (!lightbox.classList.contains('open')) {
        lightboxImg.src = '';
      }
    }, 300);
  }

  function prev() { open((currentIndex - 1 + items.length) % items.length); }
  function next() { open((currentIndex + 1) % items.length); }

  /* ---------------------------------------------------------
     Event bindings
  --------------------------------------------------------- */
  items.forEach(function (item, i) {
    item.addEventListener('click', function () { open(i); });
    // Keyboard accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(i);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click',  prev);
  nextBtn.addEventListener('click',  next);

  // Click outside image closes
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     { close(); }
    if (e.key === 'ArrowRight') { next();  }
    if (e.key === 'ArrowLeft')  { prev();  }
  });

  // Touch swipe support
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }, { passive: true });

}());
