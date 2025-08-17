// Feather Icons
        feather.replace();

        // --- Custom Cursor Logic ---
        const cursor = document.querySelector('.cursor');
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        function addCursorListeners() {
            document.querySelectorAll('a, button, input').forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
            });
        }
        addCursorListeners();


        // --- Theme Toggler ---
        const themeToggle = document.getElementById('theme-toggle');
        const htmlEl = document.documentElement;

        // Set initial theme based on localStorage or default
        if (localStorage.getItem('theme') === 'light') {
            htmlEl.classList.remove('dark');
        } else {
            htmlEl.classList.add('dark');
        }

        themeToggle.addEventListener('click', () => {
            htmlEl.classList.toggle('dark');
            if (htmlEl.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            // Re-render icons after theme change
            feather.replace();
        });

        // --- Intersection Observer for fade-in animations ---
        const sections = document.querySelectorAll('.fade-in-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        sections.forEach(section => {
            observer.observe(section);
        });