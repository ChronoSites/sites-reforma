/* =====================================================
   FLORICULTURA VIDA EM FLORES — JavaScript
   ===================================================== */

// ---- Header scroll effect ----
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- Hamburger / mobile nav ----
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

function closeNav() {
  nav.classList.remove('open');
  hamburger.classList.remove('active');
}

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
});

// Close nav when a link is clicked
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    closeNav();
  }
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll(
  '.sobre__img-wrap, .sobre__text, .servico-card, .avaliacao-card, ' +
  '.galeria__item, .contato__info, .contato__map, .footer__brand, ' +
  '.footer__links, .footer__contact, .section-header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ---- Google Maps iframe fallback ----
// If the iframe fails to load (API key issue), show the fallback image
const mapFrame = document.querySelector('.contato__map iframe');
const mapFallback = document.querySelector('.contato__map-fallback');

if (mapFrame && mapFallback) {
  mapFrame.addEventListener('error', () => {
    mapFrame.style.display = 'none';
    mapFallback.style.display = 'block';
  });

  // Also handle cases where the iframe loads an error page
  setTimeout(() => {
    try {
      if (mapFrame.contentDocument && mapFrame.contentDocument.body.innerHTML.includes('error')) {
        mapFrame.style.display = 'none';
        mapFallback.style.display = 'block';
      }
    } catch (_) {
      // Cross-origin — iframe likely loaded fine
    }
  }, 4000);
}

// ---- Active nav highlight on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--pink-500)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ---- Staggered animation for grid items ----
document.querySelectorAll('.galeria__grid, .servicos__grid, .avaliacoes__grid').forEach(grid => {
  const children = grid.querySelectorAll('.reveal');
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 60}ms`;
  });
});

// ---- Lightbox ----
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');
const lbCounter = document.getElementById('lb-counter');
const lbInner = document.getElementById('lb-inner');

const galleryItems = [...document.querySelectorAll('.galeria__item:not(.galeria__item--placeholder)')];
let currentLbIndex = 0;

function openLightbox(index) {
  currentLbIndex = index;
  const img = galleryItems[index].querySelector('img');
  lbImg.classList.add('loading');
  lbImg.alt = img.alt;
  lbImg.src = '';
  requestAnimationFrame(() => {
    lbImg.src = img.src;
    lbImg.onload = () => lbImg.classList.remove('loading');
  });
  lbCounter.textContent = `${index + 1} / ${galleryItems.length}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  updateLbArrows();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function lbShowPrev() { if (currentLbIndex > 0) openLightbox(currentLbIndex - 1); }
function lbShowNext() { if (currentLbIndex < galleryItems.length - 1) openLightbox(currentLbIndex + 1); }

function updateLbArrows() {
  lbPrev.style.opacity = currentLbIndex === 0 ? '.25' : '1';
  lbPrev.style.pointerEvents = currentLbIndex === 0 ? 'none' : '';
  lbNext.style.opacity = currentLbIndex === galleryItems.length - 1 ? '.25' : '1';
  lbNext.style.pointerEvents = currentLbIndex === galleryItems.length - 1 ? 'none' : '';
}

galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', (e) => { e.stopPropagation(); lbShowPrev(); });
lbNext.addEventListener('click', (e) => { e.stopPropagation(); lbShowNext(); });

// Close on backdrop click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lbInner) closeLightbox();
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbShowPrev();
  if (e.key === 'ArrowRight') lbShowNext();
});

// Swipe (touch)
let lbTouchX = 0;
lightbox.addEventListener('touchstart', (e) => { lbTouchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - lbTouchX;
  if (Math.abs(dx) > 50) dx < 0 ? lbShowNext() : lbShowPrev();
});
