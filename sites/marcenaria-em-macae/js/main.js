// ===== Module Interiores — Main JS =====
(function () {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const scrollTopBtn = document.getElementById('scrollTop');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = lightbox.querySelector('.lightbox__close');

    // ===== Header scroll effect =====
    function handleHeaderScroll() {
        if (window.scrollY > 60) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    // ===== Mobile menu =====
    function openMobileMenu() {
        mobileMenu.classList.add('mobile-menu--open');
        hamburger.classList.add('hamburger--active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('mobile-menu--open');
        hamburger.classList.remove('hamburger--active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
        if (mobileMenu.classList.contains('mobile-menu--open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileMenuClose.addEventListener('click', closeMobileMenu);

    // Close on backdrop click
    mobileMenu.addEventListener('click', function (e) {
        if (e.target === mobileMenu || e.target === mobileMenu.querySelector('::before')) {
            closeMobileMenu();
        }
    });

    // Close on link click
    document.querySelectorAll('[data-mobile-nav]').forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close desktop nav links (smooth scroll)
    document.querySelectorAll('[data-nav]').forEach(function (link) {
        link.addEventListener('click', function () {
            // Just let the browser handle smooth scroll
        });
    });

    // ===== Scroll to top =====
    function handleScrollTop() {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('scroll-top--visible');
        } else {
            scrollTopBtn.classList.remove('scroll-top--visible');
        }
    }

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== Lightbox =====
    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('lightbox--open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightboxFn() {
        lightbox.classList.remove('lightbox--open');
        document.body.style.overflow = '';
        setTimeout(function () {
            lightboxImg.src = '';
        }, 300);
    }

    // Attach to all clickable images
    document.querySelectorAll('.clickable-img').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.stopPropagation();
            if (el.tagName === 'IMG') {
                openLightbox(el.src);
            }
            // Skip placeholders — no image to show
        });
    });

    lightboxClose.addEventListener('click', function (e) {
        e.stopPropagation();
        closeLightboxFn();
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightboxFn();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (lightbox.classList.contains('lightbox--open')) {
                closeLightboxFn();
            }
            if (mobileMenu.classList.contains('mobile-menu--open')) {
                closeMobileMenu();
            }
        }
    });

    // ===== Scroll-triggered animations =====
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.service-card, .process__step, .testimonial-card, .contact__card, .gallery__item');
        var windowHeight = window.innerHeight;

        reveals.forEach(function (el) {
            var top = el.getBoundingClientRect().top;
            if (top < windowHeight - 80) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .process__step, .testimonial-card, .contact__card, .gallery__item').forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // ===== Scroll event handler =====
    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                handleHeaderScroll();
                handleScrollTop();
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial calls
    handleHeaderScroll();
    handleScrollTop();

    // Trigger reveal after a slight delay for initial load
    setTimeout(revealOnScroll, 100);

})();
