// Scroll-triggered animations
(function () {
    var animElements = document.querySelectorAll(
        '.service-card, .feature-card, .gallery-item, .contact-item, .about-text, .about-images, .section-header, .cta-content'
    );

    animElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animElements.forEach(function (el) {
        observer.observe(el);
    });
})();
