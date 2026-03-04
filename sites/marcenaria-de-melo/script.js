/* ===================================
   Marcenaria DeMelo — Scripts
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });

    // Fallback: hide preloader after 3s
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // --- Navbar Scroll ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        navbar.classList.toggle('scrolled', scrollY > 80);
        backToTop.classList.toggle('visible', scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Back to Top ---
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Mobile Navigation ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navBackdrop = document.getElementById('navBackdrop');

    const openMenu = () => {
        navToggle.classList.add('active');
        navMenu.classList.add('active');
        navBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', () => {
        navMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Backdrop click closes menu without triggering elements behind it
    navBackdrop.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
    });

    // Close menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveNav = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- Stat Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    function animateStats() {
        if (statsCounted) return;

        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsCounted = true;

            statNumbers.forEach(num => {
                const target = parseFloat(num.dataset.target);
                const isDecimal = target % 1 !== 0;
                const duration = 2000;
                const steps = 60;
                const increment = target / steps;
                let current = 0;
                const step = () => {
                    current += increment;
                    if (current >= target) {
                        num.textContent = isDecimal ? target.toFixed(1) : Math.floor(target).toLocaleString('pt-BR');
                        return;
                    }
                    num.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString('pt-BR');
                    requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            });
        }
    }

    window.addEventListener('scroll', animateStats, { passive: true });
    animateStats();

    // --- Portfolio Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            portfolioItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'todos' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease both';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    let lightboxItems = [];
    let lightboxIndex = 0;

    function updateLightboxItems() {
        lightboxItems = Array.from(document.querySelectorAll('.portfolio-item:not(.hidden)'));
    }

    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            updateLightboxItems();
            lightboxIndex = lightboxItems.indexOf(item);
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.querySelector('.lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
        lightboxImg.src = lightboxItems[lightboxIndex].querySelector('img').src;
    });

    document.querySelector('.lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
        lightboxImg.src = lightboxItems[lightboxIndex].querySelector('img').src;
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') {
            lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
            lightboxImg.src = lightboxItems[lightboxIndex].querySelector('img').src;
        }
        if (e.key === 'ArrowLeft') {
            lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
            lightboxImg.src = lightboxItems[lightboxIndex].querySelector('img').src;
        }
    });

    // --- Reviews Slider ---
    const reviewsTrack = document.querySelector('.reviews-track');
    const reviewCards = document.querySelectorAll('.review-card');
    let reviewIndex = 0;

    function getReviewsPerView() {
        return window.innerWidth >= 768 ? 2 : 1;
    }

    function updateReviewSlider() {
        const perView = getReviewsPerView();
        const maxIndex = Math.max(0, reviewCards.length - perView);
        if (reviewIndex > maxIndex) reviewIndex = maxIndex;

        const card = reviewCards[0];
        if (!card) return;
        const cardWidth = card.offsetWidth;
        const gap = 24;
        const offset = reviewIndex * (cardWidth + gap);
        reviewsTrack.style.transform = `translateX(-${offset}px)`;
    }

    document.querySelector('.review-nav-btn.next').addEventListener('click', () => {
        const perView = getReviewsPerView();
        const maxIndex = Math.max(0, reviewCards.length - perView);
        reviewIndex = Math.min(reviewIndex + 1, maxIndex);
        updateReviewSlider();
    });

    document.querySelector('.review-nav-btn.prev').addEventListener('click', () => {
        reviewIndex = Math.max(reviewIndex - 1, 0);
        updateReviewSlider();
    });

    window.addEventListener('resize', updateReviewSlider);

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll(
        '.sobre-content, .sobre-image, .material-card, .servico-card, .portfolio-item, .review-card, .info-card, .contato-form-wrapper, .map-wrapper'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;

        // Build WhatsApp message
        let whatsappMsg = `Olá! Meu nome é ${nome}.`;
        if (assunto) whatsappMsg += `\n\nAssunto: ${assunto}`;
        whatsappMsg += `\n\n${mensagem}`;
        if (email) whatsappMsg += `\n\nE-mail: ${email}`;
        if (telefone) whatsappMsg += `\nTelefone: ${telefone}`;

        const whatsappUrl = `https://wa.me/551137428167?text=${encodeURIComponent(whatsappMsg)}`;
        window.open(whatsappUrl, '_blank');

        // Show success feedback
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Mensagem Enviada!</span> <i class="fas fa-check"></i>';
        btn.style.background = '#25d366';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 10;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // --- Touch swipe for Reviews ---
    let touchStartX = 0;
    let touchEndX = 0;

    reviewsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    reviewsTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                const perView = getReviewsPerView();
                const maxIndex = Math.max(0, reviewCards.length - perView);
                reviewIndex = Math.min(reviewIndex + 1, maxIndex);
            } else {
                reviewIndex = Math.max(reviewIndex - 1, 0);
            }
            updateReviewSlider();
        }
    }, { passive: true });

});
