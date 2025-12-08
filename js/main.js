document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for All Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside of it
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Scroll-triggered Animations & Lazy Loading ---
    // Uses a single Intersection Observer for efficiency.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle lazy loading for images
                if (entry.target.classList.contains('lazy')) {
                    entry.target.src = entry.target.dataset.src;
                    // Once the image is loaded, add the visible class for animation
                    entry.target.onload = () => {
                        entry.target.classList.add('visible');
                        entry.target.classList.remove('lazy');
                    };
                } else {
                    // Handle animations for other elements
                    entry.target.classList.add('visible');
                }
                // Stop observing the element once it's visible/loaded
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all elements that need animation or lazy loading
    const elementsToAnimate = document.querySelectorAll('.fade-in-up, .zoom-in, .slide-in-left, .slide-in-right, .lazy');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });


    // --- Floating Navigation Buttons (Scroll to Next/Previous Section) ---
    const scrollUpBtn = document.getElementById('scroll-up');
    const scrollDownBtn = document.getElementById('scroll-down');
    const sections = Array.from(document.querySelectorAll('.scroll-section'));

    if (scrollUpBtn && scrollDownBtn && sections.length > 0) {
        const scrollToSection = (direction) => {
            const currentScroll = window.scrollY || document.documentElement.scrollTop;
            let currentSectionIndex = sections.findIndex(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                // Identify current section by checking if the viewport top is within the section boundaries (with offset)
                return currentScroll >= sectionTop - 150 && currentScroll < sectionBottom - 150;
            });

            // Fallback if no section is perfectly matched (e.g., in a transition area)
            if (currentSectionIndex === -1) {
                const distances = sections.map(s => Math.abs(s.offsetTop - currentScroll));
                currentSectionIndex = distances.indexOf(Math.min(...distances));
            }

            let nextSectionIndex;
            if (direction === 'down') {
                nextSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
            } else { // direction === 'up'
                nextSectionIndex = Math.max(currentSectionIndex - 1, 0);
            }

            // Scroll to the target section
            sections[nextSectionIndex].scrollIntoView({ behavior: 'smooth' });
        };

        scrollDownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection('down');
        });

        scrollUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection('up');
        });
    }
    
    // تم إزالة جميع أكواد الكاروسيل (Carousel) من هذا الملف لضمان عرض الصور ككروت رأسية على الهواتف
    // ولحل مشكلة تداخل التمرير وأخطاء JavaScript.

});