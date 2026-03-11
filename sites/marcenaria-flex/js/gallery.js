/* ============================================================
   MÓDULOS FLEX — GALLERY.JS
   Portfólio filter & lightbox
   ============================================================ */

(function () {
  'use strict';

  // ── Portfolio filter ──────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items      = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Active state
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(function (item, i) {
        const match = filter === 'all' || item.dataset.category === filter;
        if (match) {
          item.classList.remove('hidden');
          // Stagger re-entrance
          item.style.transitionDelay = (i * 0.05) + 's';
          item.style.opacity = '0';
          item.style.transform = 'scale(.94) translateY(12px)';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              item.style.opacity = '';
              item.style.transform = '';
              item.style.transitionDelay = '';
            });
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ── Lightbox (minimal, no deps) ───────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.innerHTML = [
    '<div class="lb-backdrop"></div>',
    '<div class="lb-box">',
    '  <div class="lb-img-wrap">',
    '    <div class="img-preview img-preview--lb">',
    '      <div class="img-preview__inner">',
    '        <svg class="preview-icon" viewBox="0 0 64 64">',
    '          <rect x="8" y="8" width="48" height="48" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>',
    '          <circle cx="22" cy="22" r="5" stroke="currentColor" stroke-width="2" fill="none"/>',
    '          <path d="M8 42 l16-14 10 10 8-8 14 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>',
    '        </svg>',
    '        <span>Preview</span>',
    '      </div>',
    '    </div>',
    '  </div>',
    '  <div class="lb-info">',
    '    <span class="lb-tag" id="lbTag"></span>',
    '    <h3 class="lb-title" id="lbTitle"></h3>',
    '  </div>',
    '  <button class="lb-close" id="lbClose" aria-label="Fechar">',
    '    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">',
    '      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    '    </svg>',
    '  </button>',
    '  <button class="lb-arrow lb-arrow--prev" id="lbPrev" aria-label="Anterior">&#8592;</button>',
    '  <button class="lb-arrow lb-arrow--next" id="lbNext" aria-label="Próximo">&#8594;</button>',
    '</div>'
  ].join('');

  // Inject lightbox styles
  const lbStyle = document.createElement('style');
  lbStyle.textContent = [
    '#lightbox{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;padding:1rem}',
    '#lightbox.open{display:flex}',
    '.lb-backdrop{position:absolute;inset:0;background:rgba(9,7,5,.92);backdrop-filter:blur(8px);cursor:pointer}',
    '.lb-box{position:relative;z-index:1;background:#211e19;border:1px solid rgba(255,255,255,.08);border-radius:16px;overflow:hidden;max-width:800px;width:100%;animation:scaleIn .25s ease}',
    '.lb-img-wrap{width:100%}',
    '.img-preview--lb{aspect-ratio:4/3;border-radius:0}',
    '.lb-info{padding:1.25rem 1.5rem;display:flex;flex-direction:column;gap:.4rem}',
    '.lb-tag{font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--clr-gold)}',
    '.lb-title{font-family:var(--ff-serif);font-size:1.2rem;color:#fff}',
    '.lb-close{position:absolute;top:.75rem;right:.75rem;width:36px;height:36px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:50%;display:grid;place-items:center;color:#fff;transition:background .2s,transform .2s}',
    '.lb-close:hover{background:rgba(255,255,255,.16);transform:rotate(90deg)}',
    '.lb-arrow{position:absolute;top:calc(50% - 20px);transform:translateY(-50%);width:40px;height:40px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:50%;color:#fff;font-size:1.1rem;display:grid;place-items:center;transition:background .2s}',
    '.lb-arrow:hover{background:rgba(201,168,76,.2);color:var(--clr-gold)}',
    '.lb-arrow--prev{left:-.5rem}',
    '.lb-arrow--next{right:-.5rem}',
    '@media(max-width:600px){.lb-arrow{display:none}.lb-box{max-width:100%}}'
  ].join('\n');

  document.head.appendChild(lbStyle);
  document.body.appendChild(overlay);

  const lbClose = document.getElementById('lbClose');
  const lbPrev  = document.getElementById('lbPrev');
  const lbNext  = document.getElementById('lbNext');
  const lbTag   = document.getElementById('lbTag');
  const lbTitle = document.getElementById('lbTitle');

  let currentIndex = 0;
  let visibleItems = [];

  function openLightbox(index) {
    visibleItems = Array.from(items).filter(function (i) { return !i.classList.contains('hidden'); });
    currentIndex = index;
    updateLightbox();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = visibleItems[currentIndex];
    if (!item) return;
    lbTag.textContent   = item.querySelector('.portfolio-item__tag')?.textContent || '';
    lbTitle.textContent = item.querySelector('h4')?.textContent || '';
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () {
      openLightbox(Array.from(items).indexOf(item));
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  overlay.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);

  lbPrev.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
  });

  lbNext.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; updateLightbox(); }
    if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % visibleItems.length; updateLightbox(); }
  });

})();
