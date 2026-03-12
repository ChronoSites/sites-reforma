// ========== SCROLL EFFECTS ==========
(function() {
    var header = document.getElementById('header');
    var scrollTopBtn = document.getElementById('scrollTop');
    var navLinks = document.querySelectorAll('[data-nav]');

    // Header scroll effect
    function handleScroll() {
        var scrollY = window.scrollY || window.pageYOffset;

        // Header background
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to top button
        if (scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Active nav link
        updateActiveNav();
    }

    // Scroll to top
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Active nav tracking
    function updateActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var scrollY = window.scrollY || window.pageYOffset;

        sections.forEach(function(section) {
            var top = section.offsetTop - 120;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
})();
