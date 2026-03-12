/* =============================================
   MARCENARIA SOUZA E SOUZA — LIGHTBOX
   ============================================= */

(function () {
    'use strict';

    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var closeBtn = lightbox.querySelector('.lightbox__close');
    var overlay = lightbox.querySelector('.lightbox__overlay');
    var prevBtn = lightbox.querySelector('.lightbox__nav--prev');
    var nextBtn = lightbox.querySelector('.lightbox__nav--next');

    // Collect all lightbox-triggerable images
    var allImages = [];
    var currentIndex = 0;

    function collectImages() {
        allImages = Array.from(document.querySelectorAll('.lightbox-trigger'));
    }

    collectImages();

    function openLightbox(index) {
        if (index < 0 || index >= allImages.length) return;
        currentIndex = index;
        var src = allImages[currentIndex].src;
        lightboxImg.src = src;
        lightboxImg.alt = allImages[currentIndex].alt || 'Imagem ampliada';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        updateNavButtons();
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // Clear src after transition
        setTimeout(function () {
            if (!lightbox.classList.contains('open')) {
                lightboxImg.src = '';
            }
        }, 400);
    }

    function showPrev() {
        if (currentIndex > 0) {
            openLightbox(currentIndex - 1);
        }
    }

    function showNext() {
        if (currentIndex < allImages.length - 1) {
            openLightbox(currentIndex + 1);
        }
    }

    function updateNavButtons() {
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentIndex === allImages.length - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentIndex === allImages.length - 1 ? 'none' : 'auto';
    }

    // Click on images
    allImages.forEach(function (img, i) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openLightbox(i);
        });
    });

    // Close events
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);

    // Navigation
    prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showPrev();
    });

    nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showNext();
    });

    // Keyboard
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    // Prevent click on image from closing
    lightboxImg.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Swipe support for mobile
    var touchStartX = 0;
    var touchEndX = 0;

    lightbox.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                showNext();
            } else {
                showPrev();
            }
        }
    }, { passive: true });

})();
