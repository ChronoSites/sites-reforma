/* ════════════════════════════════════════════════════════
   SERRALHERIA ÉDER SOLDAS — JavaScript
   ════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Navbar scroll state ──────────────────────────────────
  const navbar = document.getElementById('navbar');
  function handleNavScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── Hamburger menu ───────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ── Scroll-reveal ────────────────────────────────────────
  var revealEls = document.querySelectorAll('.reveal');
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function (el) { revealObs.observe(el); });

  // ── Hero particles ───────────────────────────────────────
  var particleContainer = document.getElementById('particles');
  var NUM_PARTICLES = 22;
  for (var i = 0; i < NUM_PARTICLES; i++) {
    var p = document.createElement('div');
    p.classList.add('particle');
    var size = Math.random() * 6 + 3;
    p.style.cssText = [
      'width:'  + size + 'px',
      'height:' + size + 'px',
      'left:'   + Math.random() * 100 + '%',
      'animation-duration:' + (Math.random() * 18 + 10) + 's',
      'animation-delay:'    + (Math.random() * 12)       + 's'
    ].join(';');
    particleContainer.appendChild(p);
  }

  // ── Hero geometric lines ─────────────────────────────────
  var hero = document.querySelector('.hero');
  [1, 2, 3].forEach(function () {
    var l = document.createElement('div');
    l.className = 'hero-line';
    hero.appendChild(l);
  });
  [4, 5].forEach(function () {
    var v = document.createElement('div');
    v.className = 'hero-vline';
    hero.appendChild(v);
  });

  // ── Lightbox ─────────────────────────────────────────────
  var realImages = [];
  document.querySelectorAll('.gallery-item:not(.gallery-placeholder)').forEach(function (item) {
    var img = item.querySelector('img');
    if (img) realImages.push(img.src);
  });

  var lightbox     = document.getElementById('lightbox');
  var lightboxImg  = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev  = document.getElementById('lightboxPrev');
  var lightboxNext  = document.getElementById('lightboxNext');
  var currentIdx   = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    lightboxImg.src = realImages[currentIdx];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }
  function showNext() {
    currentIdx = (currentIdx + 1) % realImages.length;
    lightboxImg.src = realImages[currentIdx];
  }
  function showPrev() {
    currentIdx = (currentIdx - 1 + realImages.length) % realImages.length;
    lightboxImg.src = realImages[currentIdx];
  }

  document.querySelectorAll('.gallery-item:not(.gallery-placeholder)').forEach(function (item, idx) {
    item.addEventListener('click', function () { openLightbox(idx); });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNext);
  lightboxPrev.addEventListener('click', showPrev);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight')  showNext();
    if (e.key === 'ArrowLeft')   showPrev();
  });

  // ── Scroll-to-top button ─────────────────────────────────
  var scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top';
  scrollTopBtn.setAttribute('aria-label', 'Voltar ao topo');
  scrollTopBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  document.body.appendChild(scrollTopBtn);
  window.addEventListener('scroll', function () {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Animate stat counters ────────────────────────────────
  var statsAnimated = false;
  var sobreSection  = document.getElementById('sobre');
  var statsObs      = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateStats();
      statsObs.disconnect();
    }
  }, { threshold: 0.3 });
  if (sobreSection) statsObs.observe(sobreSection);

  function animateStats() {
    document.querySelectorAll('.stat-number').forEach(function (el) {
      var raw = el.textContent.trim();
      var num = parseFloat(raw);
      if (isNaN(num)) return;
      var suffix  = raw.replace(/[\d.]/g, '');
      var start   = 0;
      var duration = 1200;
      var startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased    = 1 - Math.pow(1 - progress, 3);
        var value    = start + eased * (num - start);
        el.textContent = (Number.isInteger(num) ? Math.round(value) : value.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

})();
