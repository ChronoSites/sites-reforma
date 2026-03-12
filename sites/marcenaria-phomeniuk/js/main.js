/* =============================================
   MARCENARIA PHOMENIUK — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // ===== ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Header background
        if (scrollY > 60) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        // Scroll to top button
        if (scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Active nav link
        updateActiveNav();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ===== SCROLL TO TOP =====
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(backdrop);

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        backdrop.classList.add('active');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        backdrop.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileMenuClose.addEventListener('click', closeMobileMenu);
    backdrop.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    function updateActiveNav() {
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    }

    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(trigger.src);
        });
    });

    // Gallery item images (wrapped in overlay div)
    document.querySelectorAll('.gallery__item img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openLightbox(img.src);
        });
    });

    // Gallery item click (whole card)
    document.querySelectorAll('.gallery__item:not(.gallery__item--placeholder)').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                openLightbox(img.src);
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox__content')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ===== LOAD MORE (Gallery) =====
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const extraImages = [
        'assets/Marcenaria_Phomeniuk___Londrin_027.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_028.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_029.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_031.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_032.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_033.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_034.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_036.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_037.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_038.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_039.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_041.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_042.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_043.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_044.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_046.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_047.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_048.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_049.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_051.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_052.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_053.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_054.jpg',
        'assets/Marcenaria_Phomeniuk___Londrin_056.jpg',
    ];

    let extraPage = 0;
    const perPage = 8;

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const grid = document.getElementById('galleryGrid');
            const start = extraPage * perPage;
            const end = start + perPage;
            const batch = extraImages.slice(start, end);

            if (batch.length === 0) {
                loadMoreBtn.textContent = 'Todos os projetos carregados';
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.opacity = '0.5';
                return;
            }

            batch.forEach(src => {
                const div = document.createElement('div');
                div.className = 'gallery__item';

                div.innerHTML = `
                    <img src="${src}" alt="Projeto Phomeniuk" class="lightbox-trigger" loading="lazy">
                    <div class="gallery__item-overlay">
                        <span>Ver Projeto</span>
                    </div>
                `;

                // Add lightbox to new items
                div.addEventListener('click', () => {
                    const img = div.querySelector('img');
                    if (img) openLightbox(img.src);
                });

                grid.appendChild(div);
            });

            extraPage++;

            if (extraPage * perPage >= extraImages.length) {
                loadMoreBtn.textContent = 'Todos os projetos carregados';
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.opacity = '0.5';
            }
        });
    }

    // ===== FADE-IN ANIMATION (Intersection Observer) =====
    const fadeElements = document.querySelectorAll(
        '.service-card, .process-step, .testimonial-card, .about__grid, .contact__grid, .section__header'
    );

    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    // ===== SMOOTH SCROLL for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== FORM "SUBMIT" =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Mensagem Enviada!';
            btn.style.background = 'linear-gradient(135deg, #2d8a4e, #34c759)';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }
});
