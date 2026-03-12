/* ═══════════════════════════════════════════
   CHRONO SITES — SHARED JS
   Hamburger, nav scroll, reveal, smooth scroll
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ─── HAMBURGER MOBILE MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ─── NAV SCROLL STATE + SCROLL PROGRESS ─── */
  const nav = document.getElementById('nav');
  const scrollProgress = document.getElementById('scrollProgress');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      scrollProgress.style.width = (window.scrollY / maxScroll * 100) + '%';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── SCROLL REVEAL (IntersectionObserver) ─── */
  window.revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        window.revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => window.revealObserver.observe(el));

  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
