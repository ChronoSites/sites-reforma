// Mobile Menu
(function () {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileMenuClose = document.getElementById('mobileMenuClose');

    function openMobileMenu() {
        mobileMenu.classList.add('open');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenuFn() {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Make closeMobileMenu global for inline onclick handlers
    window.closeMobileMenu = closeMobileMenuFn;

    hamburger.addEventListener('click', function () {
        if (mobileMenu.classList.contains('open')) {
            closeMobileMenuFn();
        } else {
            openMobileMenu();
        }
    });

    mobileMenuClose.addEventListener('click', closeMobileMenuFn);

    // Close on ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMobileMenuFn();
        }
    });
})();
