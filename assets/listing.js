/* ═══════════════════════════════════════════
   CHRONO SITES — LISTING JS
   Category filters, search, dynamic grid rendering
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  const SITES_DATA = window.SITES_DATA || [];

  /* ─── BUILD CATEGORY FILTERS ─── */
  const categories = [...new Set(SITES_DATA.map(s => s.category).filter(Boolean))].sort();
  const filterBar = document.getElementById('filterBar');
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = cat;
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    filterBar.appendChild(btn);
  });

  let activeFilter = 'all';
  let searchQuery = '';

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    renderSites();
  });

  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase();
    renderSites();
  });

  /* ─── RENDER SITES ─── */
  const grid = document.getElementById('sitesGrid');
  const countEl = document.getElementById('resultsCount');

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function renderSites() {
    let filtered = SITES_DATA;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(s => s.category === activeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(s =>
        (s.name && s.name.toLowerCase().includes(searchQuery)) ||
        (s.slug && s.slug.toLowerCase().includes(searchQuery)) ||
        (s.category && s.category.toLowerCase().includes(searchQuery)) ||
        (s.city && s.city.toLowerCase().includes(searchQuery))
      );
    }

    countEl.innerHTML = `Mostrando <strong>${filtered.length}</strong> de ${SITES_DATA.length} prévias`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <h3>Nenhum resultado</h3>
          <p>Tente buscar por outro termo ou categoria.</p>
        </div>`;
      return;
    }

    const baseUrl = window.location.origin;

    grid.innerHTML = filtered.map((site, i) => {
      const previewSrc = baseUrl + site.preview_url;
      const location = [site.city, site.state].filter(Boolean).join(', ');

      return `<div class="site-card reveal" style="transition-delay:${Math.min(i * 0.06, 0.5)}s">
        <a href="${site.preview_url}" class="site-preview" target="_blank" rel="noopener noreferrer">
          <div class="site-preview-loading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
          <iframe src="${previewSrc}" loading="lazy" sandbox="allow-same-origin" title="Preview de ${site.name}"></iframe>
          <div class="site-preview-overlay"></div>
        </a>
        <div class="site-info">
          <span class="site-name">${site.name}</span>
          <span class="site-slug">/${site.slug}/</span>
          <div class="site-meta">
            <span class="site-category">${site.category ? site.category.charAt(0).toUpperCase() + site.category.slice(1) : 'Geral'}${location ? ' · ' + location : ''}</span>
            <span class="site-date">${formatDate(site.created_at)}</span>
          </div>
          <a href="${site.preview_url}" class="site-link" target="_blank" rel="noopener noreferrer">
            Ver prévia →
          </a>
        </div>
      </div>`;
    }).join('');

    // Observe new cards for reveal animation
    if (window.revealObserver) {
      grid.querySelectorAll('.reveal').forEach(el => window.revealObserver.observe(el));
    }
  }

  renderSites();

});
