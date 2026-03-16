/* ===========================================
   MJB Marcenaria – Main JavaScript
   =========================================== */

(function () {
  'use strict';

  /* ============================
     ELEMENTS
     ============================ */
  const header       = document.getElementById('header');
  const hamburger    = document.getElementById('hamburger');
  const mobileMenu   = document.getElementById('mobileMenu');
  const mobileClose  = document.getElementById('mobileClose');
  const mobileOverlay = document.getElementById('mobileMenuOverlay');
  const mobileLinks  = document.querySelectorAll('.mobile-nav a');
  const scrollTopBtn = document.getElementById('scrollTop');
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  /* ============================
     HERO LOAD ANIMATION
     ============================ */
  window.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.hero');
    if (hero) {
      requestAnimationFrame(function () {
        hero.classList.add('loaded');
      });
    }
  });

  /* ============================
     HEADER SCROLL STATE
     ============================ */
  function onScroll() {
    const y = window.scrollY;

    // Header
    if (header) header.classList.toggle('scrolled', y > 40);

    // Scroll-to-top button
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 350);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial run

  /* ============================
     MOBILE MENU
     ============================ */
  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (mobileMenu && mobileMenu.classList.contains('open')) closeMenu();
      if (lightbox && lightbox.classList.contains('open')) closeLightbox();
    }
  });

  /* ============================
     SCROLL TO TOP
     ============================ */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================
     LIGHTBOX
     ============================ */
  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Imagem ampliada';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!lightbox.classList.contains('open')) {
        lightboxImg.src = '';
        lightboxImg.alt = '';
      }
    }, 320);
  }

  // ---- Event delegation: one listener catches clicks on any [data-lightbox] ----
  function attachLightboxTriggers() {
    // Mark all [data-lightbox] elements as keyboard-accessible
    document.querySelectorAll('[data-lightbox]').forEach(function (el) {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    });

    // Delegated click on document — works regardless of nested elements
    document.addEventListener('click', function (e) {
      var target = e.target;
      // Walk up until we find an element with data-lightbox or hit the document
      while (target && target !== document) {
        if (target.dataset && target.dataset.lightbox) {
          e.stopPropagation();
          openLightbox(target.dataset.lightbox, target.dataset.lightboxAlt || '');
          return;
        }
        // Stop climbing if we hit the lightbox itself (avoid re-triggering)
        if (target === lightbox) return;
        target = target.parentElement;
      }
    });

    // Keyboard: Enter / Space on [data-lightbox]
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var target = document.activeElement;
      if (target && target.dataset && target.dataset.lightbox) {
        e.preventDefault();
        openLightbox(target.dataset.lightbox, target.dataset.lightboxAlt || '');
      }
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', function (e) {
    e.stopPropagation();
    closeLightbox();
  });
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ============================
     SCROLL REVEAL (Intersection Observer)
     ============================ */
  function initScrollReveal() {
    const els = document.querySelectorAll('[data-animate]');
    if (!els.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================
     FILTER BUTTONS
     ============================ */
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });
  }

  /* ============================
     INIT
     Script is at bottom of <body>: DOM is already ready, no need to wait.
     ============================ */
  attachLightboxTriggers();
  initScrollReveal();
  initFilters();

})();
