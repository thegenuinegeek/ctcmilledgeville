document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                mainNav.classList.remove('active'); // Close mobile menu if open
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio Horizontal Carousel & Blurred-Backdrop Lightbox
    const track = document.getElementById('portfolioTrack');
    const prevCarouselBtn = document.querySelector('.carousel-btn-prev');
    const nextCarouselBtn = document.querySelector('.carousel-btn-next');
    const portfolioItems = Array.from(document.querySelectorAll('#portfolioTrack .portfolio-item'));

    if (track && prevCarouselBtn && nextCarouselBtn) {
        const getScrollStep = () => {
            const firstCard = track.querySelector('.portfolio-item');
            return firstCard ? firstCard.offsetWidth + 32 : 360;
        };

        prevCarouselBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        });

        nextCarouselBtn.addEventListener('click', () => {
            track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        });
    }

    const lightbox = document.getElementById('portfolioLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaptionText = document.getElementById('lightboxCaptionText');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentIndex = 0;

    function showSlide(index) {
        if (!portfolioItems.length) return;
        currentIndex = (index + portfolioItems.length) % portfolioItems.length;
        const item = portfolioItems[currentIndex];
        const img = item.querySelector('img');
        const heading = item.querySelector('h3');
        const caption = item.getAttribute('data-caption') || (heading ? heading.textContent : '');

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaptionText.textContent = caption;
        lightboxCounter.textContent = `${currentIndex + 1} / ${portfolioItems.length}`;
    }

    function openLightbox(index) {
        showSlide(index);
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (lightbox && portfolioItems.length) {
        portfolioItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showSlide(currentIndex - 1);
        });
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showSlide(currentIndex + 1);
        });

        // Close when clicking the blurred backdrop outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation (Esc, Left, Right)
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
            if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
        });

        // Touch swipe support inside the lightbox
        let touchStartX = 0;
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) > 50) {
                showSlide(diff > 0 ? currentIndex - 1 : currentIndex + 1);
            }
        }, { passive: true });
    }

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve so it only animates once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
