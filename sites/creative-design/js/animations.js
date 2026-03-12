// ========== SCROLL REVEAL ANIMATIONS ==========
(function() {
    // Add reveal class to elements
    var revealElements = [
        '.about__image-wrapper',
        '.about__content',
        '.service-card',
        '.gallery__item',
        '.testimonial-card',
        '.contact__card',
        '.contact__map',
        '.cta-banner__content',
        '.cta-banner .btn'
    ];

    revealElements.forEach(function(selector) {
        document.querySelectorAll(selector).forEach(function(el, index) {
            el.classList.add('reveal');
            el.style.transitionDelay = (index * 0.08) + 's';
        });
    });

    // Intersection Observer for reveals
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.reveal').forEach(function(el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything
        document.querySelectorAll('.reveal').forEach(function(el) {
            el.classList.add('revealed');
        });
    }
})();
