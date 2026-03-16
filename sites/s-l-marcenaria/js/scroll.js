// Header scroll + Back to Top
(function () {
    var header = document.getElementById('header');
    var backToTop = document.getElementById('backToTop');
    var scrollThreshold = 100;

    function onScroll() {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Header style change
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top visibility
        if (scrollY > scrollThreshold) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Run on load
    onScroll();
})();
