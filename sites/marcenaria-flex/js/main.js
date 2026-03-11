/* ============================================================
   MÓDULOS FLEX — MAIN.JS
   Header scroll, mobile nav, scroll reveal, contato form
   ============================================================ */

(function () {
  'use strict';

  // ── Header scroll behavior ─────────────────────────────────
  const header = document.getElementById('header');

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile burger menu ────────────────────────────────────
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');

  burger.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
    });
  });

  // Close nav on resize to desktop
  const mq = window.matchMedia('(min-width: 769px)');
  mq.addEventListener('change', function (e) {
    if (e.matches) {
      nav.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ── Scroll Reveal (IntersectionObserver) ─────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ── Smooth scroll offset (compensate fixed header) ────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const headerH = header.getBoundingClientRect().height;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ── Contact form (soft validation + mailto fallback) ──────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome     = form.nome.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (!nome || !mensagem) {
        showFormMsg('Por favor, preencha seu nome e mensagem.', 'error');
        return;
      }

      // Build WhatsApp message as fallback (no server needed)
      const telefone = form.telefone.value.trim();
      const email    = form.email.value.trim();
      const text = [
        `Olá! Me chamo *${nome}*.`,
        telefone ? `Telefone: ${telefone}` : '',
        email    ? `E-mail: ${email}` : '',
        '',
        mensagem
      ].filter(Boolean).join('\n');

      const waURL = 'https://wa.me/5514999090424?text=' + encodeURIComponent(text);
      window.open(waURL, '_blank', 'noopener,noreferrer');
      showFormMsg('Redirecionando para o WhatsApp… 🎉', 'success');
      form.reset();
    });
  }

  function showFormMsg(msg, type) {
    let el = document.querySelector('.form__feedback');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form__feedback';
      form.appendChild(el);
    }
    el.textContent = msg;
    el.style.cssText = [
      'padding:.75rem 1rem',
      'border-radius:6px',
      'font-size:.85rem',
      'font-weight:600',
      'text-align:center',
      type === 'success'
        ? 'background:rgba(37,211,102,.12);color:#4dde88;border:1px solid rgba(37,211,102,.25)'
        : 'background:rgba(255,80,80,.1);color:#ff7070;border:1px solid rgba(255,80,80,.2)'
    ].join(';');
    setTimeout(function () { el.textContent = ''; el.style.cssText = ''; }, 6000);
  }

  // ── Active nav link on scroll ─────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            link.style.color = href === '#' + id ? 'var(--clr-gold)' : '';
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(function (s) { sectionObserver.observe(s); });

})();
