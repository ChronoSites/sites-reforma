// Lightbox
(function () {
    var lightbox = document.getElementById('lightbox');
    var lightboxImage = document.getElementById('lightboxImage');
    var lightboxClose = lightbox.querySelector('.lightbox-close');
    var images = document.querySelectorAll('.lightbox-img');

    images.forEach(function (img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function (e) {
            e.stopPropagation();
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', function (e) {
        e.stopPropagation();
        closeLightbox();
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
})();
