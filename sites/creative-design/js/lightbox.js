// ========== LIGHTBOX ==========
(function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const clickableImages = document.querySelectorAll('.clickable-img');

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(function() {
            lightboxImg.src = '';
        }, 300);
    }

    clickableImages.forEach(function(img) {
        // Skip placeholder items
        if (img.hasAttribute('data-placeholder')) return;

        img.addEventListener('click', function() {
            var src = img.tagName === 'IMG' ? img.src : '';
            var alt = img.tagName === 'IMG' ? img.alt : '';
            if (src) {
                openLightbox(src, alt);
            }
        });
    });

    lightboxClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeLightbox();
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox__content')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
})();
