/* ========================================
   Marcenaria Arte da Terra - Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navClose = document.getElementById('navClose');
  const navLinks = document.querySelectorAll('[data-nav]');
  const scrollTopBtn = document.getElementById('scrollTop');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = lightbox.querySelector('.lightbox__close');

  // ========================================
  // Header scroll effect
  // ========================================
  function handleHeaderScroll() {
    if (window.scrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  // ========================================
  // Scroll to top button
  // ========================================
  function handleScrollTopVisibility() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('scroll-top--visible');
    } else {
      scrollTopBtn.classList.remove('scroll-top--visible');
    }
  }

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Combined scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleHeaderScroll();
        handleScrollTopVisibility();
        handleScrollAnimations();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  handleHeaderScroll();
  handleScrollTopVisibility();

  // ========================================
  // Mobile menu
  // ========================================
  function openMenu() {
    nav.classList.add('nav--open');
    hamburger.classList.add('hamburger--active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('nav--open');
    hamburger.classList.remove('hamburger--active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (nav.classList.contains('nav--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navClose.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeLightbox();
    }
  });

  // ========================================
  // Lightbox
  // ========================================
  const lightboxTriggers = document.querySelectorAll('[data-lightbox]');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('lightbox--active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 400);
  }

  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const img = trigger.querySelector('img');
      if (img) {
        openLightbox(img.src, img.alt);
      }
    });
  });

  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Prevent closing when clicking the image
  lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // ========================================
  // Scroll animations (fade-up)
  // ========================================
  const animatedElements = document.querySelectorAll(
    '.servico-card, .contato__card, .galeria__item, .sobre__text, .sobre__image, .stat, .cta__inner'
  );

  animatedElements.forEach(el => el.classList.add('fade-up'));

  function handleScrollAnimations() {
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight * 0.88) {
        el.classList.add('visible');
      }
    });
  }

  // Initial check
  handleScrollAnimations();

  // ========================================
  // Active nav link on scroll
  // ========================================
  const sections = document.querySelectorAll('section[id]');

  function setActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();
});
