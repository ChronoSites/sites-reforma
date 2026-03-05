/* ═══════════════════════════════════════════════════════════════
   J&D Marcenaria — Scripts
   Vanilla JS · No dependencies
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──────────────────────────────────────
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load

  // ── Mobile menu ───────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  const toggleMenu = () => {
    const isActive = mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('menu-open', isActive);
  };

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // ── Smooth scroll for anchor links ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // ── Reveal on scroll (IntersectionObserver) ───────────────────
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -48px 0px'
    });

    reveals.forEach((el) => {
      // Hero elements are already visible — trigger instantly
      const inHero = el.closest('.hero');
      if (inHero) {
        // Small artificial delay so CSS transition plays on page load
        const delay = parseFloat(getComputedStyle(el).transitionDelay) * 1000 || 0;
        setTimeout(() => el.classList.add('visible'), 80 + delay);
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    // Fallback: show everything
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // ── Lightbox ──────────────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxClose = lightbox.querySelector('.lightbox__close');
  const galleryItems = document.querySelectorAll('.gallery-item[data-img]');

  galleryItems.forEach(item => {
    const imgSrc = item.getAttribute('data-img');
    if (!imgSrc) return; // Skip placeholders

    item.addEventListener('click', () => {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = 'J&D Marcenaria — trabalho de marcenaria';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 350);
  };

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // ── Hero parallax scroll ──────────────────────────────────────
  const heroBgImg = document.querySelector('.hero__bg img');

  if (heroBgImg) {
    const handleHeroParallax = () => {
      const scrolled = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      if (scrolled < heroHeight) {
        const offset = scrolled * 0.3;
        heroBgImg.style.transform = `scale(1.07) translateY(calc(-3% + ${offset}px))`;
      }
    };

    window.addEventListener('scroll', handleHeroParallax, { passive: true });
  }

  // ── Active nav link on scroll ─────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  const activateNavLink = () => {
    const scrollY = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activateNavLink, { passive: true });

});
