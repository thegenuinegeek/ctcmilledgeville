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
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Story Read More Toggle
    const storyToggleBtn = document.getElementById('storyToggleBtn');
    const storyHiddenContent = document.getElementById('storyHiddenContent');
    
    if (storyToggleBtn && storyHiddenContent) {
        storyToggleBtn.addEventListener('click', () => {
            const isExpanded = storyHiddenContent.classList.toggle('expanded');
            storyToggleBtn.textContent = isExpanded ? 'Show Less' : 'Read Full Story';
        });
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
