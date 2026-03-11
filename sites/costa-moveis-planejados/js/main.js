/* ============================================================
   MAIN — Navbar behaviour · Mobile menu · Hero parallax
   ============================================================ */
(function () {
  'use strict';

  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('navToggle');
  const menu      = document.getElementById('navMenu');
  const hero      = document.querySelector('.hero');
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

  /* ---------------------------------------------------------
     Sticky navbar — adds .scrolled class on scroll
  --------------------------------------------------------- */
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
    }
    highlightActiveLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------------------------------------------------
     Hero background transition after load
  --------------------------------------------------------- */
  if (hero) {
    if (document.readyState === 'complete') {
      hero.classList.add('loaded');
    } else {
      window.addEventListener('load', function () {
        hero.classList.add('loaded');
      });
    }
  }

  /* ---------------------------------------------------------
     Mobile menu — toggle open/close
  --------------------------------------------------------- */
  function openMenu() {
    menu.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on nav link click
  menu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('open') && !navbar.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });

  /* ---------------------------------------------------------
     Scroll-to-top button
  --------------------------------------------------------- */
  var scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     Active nav link highlight based on scroll position
  --------------------------------------------------------- */
  function highlightActiveLink() {
    var current = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  // Trigger once on load
  highlightActiveLink();

}());
