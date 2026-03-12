/* ═══════════════════════════════════════════
   CHRONO SITES — HOMEPAGE JS
   Mockup cycling, progress bar, site build, counters
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ─── MOCKUP STYLE CYCLING ─── */
  const mockSite = document.getElementById('mockSite');
  const styleTags = document.querySelectorAll('.style-tag');
  const styles = ['style-minimal','style-dark','style-bold','style-elegant','style-tech'];
  let currentStyle = 0;
  let cycleTimer;

  function setStyle(index) {
    mockSite.classList.remove(styles[currentStyle]);
    currentStyle = index;
    mockSite.classList.add(styles[currentStyle]);
    styleTags.forEach((tag, i) => tag.classList.toggle('active', i === currentStyle));
  }

  function startCycle() {
    cycleTimer = setInterval(() => {
      setStyle((currentStyle + 1) % styles.length);
    }, 3500);
  }

  startCycle();

  styleTags.forEach(tag => {
    tag.addEventListener('click', () => {
      clearInterval(cycleTimer);
      setStyle(parseInt(tag.dataset.index));
      startCycle();
    });
  });

  /* ─── PROGRESS BAR + SITE BUILD ANIMATION ─── */
  const speedLeft = document.getElementById('speedLeft');
  const progressFill = document.getElementById('progressFill');
  const progressPct = document.getElementById('progressPct');
  const progressTime = document.getElementById('progressTime');
  const buildUrl = document.getElementById('buildUrl');
  const siteLayers = document.querySelectorAll('.sb-layer');
  const buildChecks = document.querySelectorAll('.build-check');
  const doneBadge = document.getElementById('doneBadge');

  let buildAnimated = false;

  function runBuildAnimation() {
    if (buildAnimated) return;
    buildAnimated = true;

    // Show URL
    if (buildUrl) buildUrl.classList.add('visible');

    const totalMs = 10000;
    const start = performance.now();

    function tickProgress(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / totalMs, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      const pct = Math.round(eased * 100);
      const totalMin = Math.floor(eased * 120);
      const h = Math.floor(totalMin / 60);
      const m = totalMin % 60;
      progressFill.style.width = pct + '%';
      progressPct.textContent = pct + '%';
      progressTime.textContent = h + ':' + String(m).padStart(2,'0') + ' / 2:00h';
      if (progress < 1) requestAnimationFrame(tickProgress);
    }
    requestAnimationFrame(tickProgress);

    // Build layers sequentially
    const stepDelay = 1800;
    siteLayers.forEach((layer, i) => {
      setTimeout(() => {
        layer.classList.add('visible');
        buildChecks.forEach((chk, j) => {
          chk.classList.remove('active');
          if (j < i) chk.classList.add('done');
          if (j === i) { chk.classList.add('active'); chk.classList.remove('done'); }
        });
      }, 300 + i * stepDelay);
    });

    // Final: all done + badge
    const finalTime = 300 + siteLayers.length * stepDelay + 500;
    setTimeout(() => {
      buildChecks.forEach(s => { s.classList.remove('active'); s.classList.add('done'); });
      if (doneBadge) doneBadge.classList.add('visible');
    }, finalTime);
  }

  const buildObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { runBuildAnimation(); buildObs.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });

  if (speedLeft) buildObs.observe(speedLeft);

  /* ─── NUMBER COUNTER ─── */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(target * eased);
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target;
        }

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  /* ─── STYLES SHOWCASE SLIDER ─── */
  const showcase = document.getElementById('showcase');
  if (showcase) {
    const slides = showcase.querySelectorAll('.showcase-slide');
    const dots = showcase.querySelectorAll('.showcase-dot');
    const labels = showcase.querySelectorAll('.showcase-label');
    const urlBar = document.getElementById('showcaseUrl');
    const prevBtn = showcase.querySelector('.showcase-prev');
    const nextBtn = showcase.querySelector('.showcase-next');
    let curSlide = 0;
    let slideTimer;

    function goToSlide(i) {
      slides[curSlide].classList.remove('active');
      dots[curSlide].classList.remove('active');
      labels[curSlide].classList.remove('active');
      curSlide = i;
      slides[curSlide].classList.add('active');
      dots[curSlide].classList.add('active');
      labels[curSlide].classList.add('active');
      if (urlBar) urlBar.textContent = slides[curSlide].dataset.url;
    }

    function nextSl() { goToSlide((curSlide + 1) % slides.length); }
    function startTimer() { slideTimer = setInterval(nextSl, 5000); }
    function resetTimer() { clearInterval(slideTimer); startTimer(); }

    startTimer();
    prevBtn.addEventListener('click', () => { goToSlide((curSlide - 1 + slides.length) % slides.length); resetTimer(); });
    nextBtn.addEventListener('click', () => { nextSl(); resetTimer(); });
    dots.forEach(dot => {
      dot.addEventListener('click', () => { goToSlide(parseInt(dot.dataset.index)); resetTimer(); });
    });
  }

});
