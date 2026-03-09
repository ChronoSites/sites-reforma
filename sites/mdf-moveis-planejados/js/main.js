/* =============================================
   MDF MÓVEIS PLANEJADOS — MAIN JS
   ============================================= */

(function () {
  'use strict';

  /* ---- HEADER SCROLL ---- */
  const header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- HERO Ken Burns ---- */
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => hero.classList.add('visible'), 100);
  }

  /* ---- MOBILE NAV TOGGLE ---- */
  const navToggle = document.getElementById('navToggle');
  const nav       = document.getElementById('nav');

  navToggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  // Close nav on link click
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- ACTIVE NAV LINK ON SCROLL ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

  const observerOpts = { rootMargin: '-40% 0px -40% 0px', threshold: 0 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(lnk => {
          lnk.classList.toggle(
            'active',
            lnk.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, observerOpts);

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---- REVEAL ON SCROLL ---- */
  const revealEls = document.querySelectorAll(
    '.servico-card, .gal-item, .sobre__text, .sobre__media, ' +
    '.contato__info, .contato__map, .cta-banner h2, .cta-banner p, .cta-banner .btn'
  );

  // Add base class for animation
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger cards by their index within parent
          const siblings = Array.from(entry.target.parentElement.children);
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = (idx * 60) + 'ms';
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- GALLERY LIGHTBOX (simple) ---- */
  const galItems = document.querySelectorAll('.gal-item:not(.gal-preview)');

  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.innerHTML = `
    <div class="lb-backdrop"></div>
    <button class="lb-close" aria-label="Fechar">
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="lb-content">
      <img class="lb-img" src="" alt="" />
    </div>
  `;
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.lb-img');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt;
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
  }

  galItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    });
  });

  overlay.querySelector('.lb-close').addEventListener('click', closeLightbox);
  overlay.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

})();
