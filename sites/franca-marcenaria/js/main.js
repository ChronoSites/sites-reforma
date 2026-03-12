/* ========================================
   França Marcenaria — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== ELEMENTS =====
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose = document.getElementById('menuClose');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const backToTop = document.getElementById('backToTop');
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = lightbox.querySelector('.lightbox__close');
  const lightboxBackdrop = lightbox.querySelector('.lightbox__backdrop');

  // ===== HEADER SCROLL =====
  let lastScroll = 0;
  function handleHeaderScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = scrollY;
  }

  // ===== BACK TO TOP =====
  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Combined scroll handler
  window.addEventListener('scroll', () => {
    handleHeaderScroll();
    handleBackToTop();
  }, { passive: true });

  // ===== MOBILE MENU =====
  function openMenu() {
    mobileMenu.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuClose.addEventListener('click', closeMenu);
  menuBackdrop.addEventListener('click', closeMenu);

  // Close menu on nav link click
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // ===== LIGHTBOX =====
  function openLightbox(element) {
    const clone = element.querySelector('.placeholder-img').cloneNode(true);
    lightboxContent.innerHTML = '';
    lightboxContent.appendChild(clone);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxContent.innerHTML = '';
    }, 300);
  }

  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('active')) {
        closeLightbox();
      }
      if (mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    }
  });

  // ===== SCROLL ANIMATIONS =====
  function initScrollAnimations() {
    // Tag elements for animation
    const animTargets = [
      { selector: '.about__image-wrapper', class: 'fade-in-left' },
      { selector: '.about__text', class: 'fade-in-right' },
      { selector: '.service-card', class: 'fade-in' },
      { selector: '.gallery__item', class: 'fade-in' },
      { selector: '.cta-box', class: 'fade-in' },
      { selector: '.contact__card', class: 'fade-in' },
      { selector: '.contact__map', class: 'fade-in' },
      { selector: '.section__header', class: 'fade-in' },
    ];

    animTargets.forEach(({ selector, class: cls }) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        if (!el.classList.contains(cls)) {
          el.classList.add(cls);
          el.style.transitionDelay = `${i * 0.08}s`;
        }
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
      observer.observe(el);
    });
  }

  initScrollAnimations();

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav__link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Initial calls
  handleHeaderScroll();
  handleBackToTop();
  updateActiveNav();
});
