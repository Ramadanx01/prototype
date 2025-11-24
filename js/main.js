document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for All Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // نتأكد أن الرابط ليس مجرد "#" فارغة
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

    // --- Simple scroll-triggered fade-in animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.fade-in-up');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // --- Chart.js instances for statistics section ---
    const barChartCtx = document.getElementById('deathsBarChart');
    if (barChartCtx) {
        new Chart(barChartCtx, {
            type: 'bar',
            data: {
                labels: ['Deaths from Water Pollution'],
                datasets: [{
                    label: 'People (in Millions)',
                    data: [12],
                    backgroundColor: ['#be123c'],
                    borderColor: ['#9f1239'],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: '12 Million Deaths Annually'
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + 'M';
                            }
                        }
                    }
                }
            }
        });
    }

    const doughnutChartCtx = document.getElementById('pollutionDoughnutChart');
    if (doughnutChartCtx) {
        new Chart(doughnutChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Polluted Water', 'Clean Water'],
                datasets: [{
                    data: [40, 60],
                    backgroundColor: ['#be123c', '#0ea5e9'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: '40% of Water Polluted by 2030'
                    }
                }
            }
        });
    }

    const pieChartCtx = document.getElementById('wastewaterPieChart');
    if (pieChartCtx) {
        new Chart(pieChartCtx, {
            type: 'pie',
            data: {
                labels: ['People Using Wastewater', 'Others'],
                datasets: [{
                    label: 'Population',
                    data: [1.7, 7.8 - 1.7], // Assuming ~7.8B world population
                    backgroundColor: ['#be123c', '#e5e7eb'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: '1.7 Billion Use Wastewater'
                    }
                }
            }
        });
    }

    // --- Floating Navigation Buttons ---
    const scrollUpBtn = document.getElementById('scroll-up');
    const scrollDownBtn = document.getElementById('scroll-down');
    const sections = Array.from(document.querySelectorAll('.scroll-section'));

    if (scrollUpBtn && scrollDownBtn && sections.length > 0) {
        const scrollToSection = (direction) => {
            const currentScroll = window.scrollY || document.documentElement.scrollTop;
            let currentSectionIndex = sections.findIndex(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                // نعتبر القسم الحالي هو الذي يحتل الجزء العلوي من الشاشة
                return currentScroll >= sectionTop - 100 && currentScroll < sectionBottom - 100;
            });

            if (currentSectionIndex === -1) {
                // إذا لم يتم العثور على قسم، ابحث عن الأقرب
                const distances = sections.map(s => Math.abs(s.offsetTop - currentScroll));
                currentSectionIndex = distances.indexOf(Math.min(...distances));
            }

            let nextSectionIndex;
            if (direction === 'down') {
                nextSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
            } else { // direction === 'up'
                nextSectionIndex = Math.max(currentSectionIndex - 1, 0);
            }

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

});
