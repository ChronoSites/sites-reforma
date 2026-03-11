/* ============================================================
   SCROLL — IntersectionObserver reveal for .reveal elements
   ============================================================ */
(function () {
  'use strict';

  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  // Fallback for old browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -48px 0px'
    }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

}());
