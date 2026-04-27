document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Gyōmu: fully loaded & interactive');

    // ----- Scroll reveal animations -----
    const revealOnScroll = () => {
        const sections = document.querySelectorAll('.section');
        const cards = document.querySelectorAll('.pattern-card, .product-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add delay based on position for staggered effect
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        sections.forEach(section => observer.observe(section));
        
        cards.forEach(card => observer.observe(card));
    };
    
    revealOnScroll();

    // ----- Back to top button -----
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----- Hamburger menu -----
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    function toggleMobileMenu(forceState) {
        if (forceState !== undefined) {
            menuOpen = forceState;
        } else {
            menuOpen = !menuOpen;
        }
        if (mobileMenu) {
            mobileMenu.style.display = menuOpen ? 'block' : 'none';
        }
    }

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                if (menuOpen) toggleMobileMenu(false);
            });
        });
    }

    // ----- Smooth scroll for anchor links -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (menuOpen && mobileMenu) {
                    toggleMobileMenu(false);
                }
            }
        });
    });

    // ----- Product image slider for Kumo Hoodie -----
    const hoodieWrapper = document.getElementById('hoodie-slider');
    if (hoodieWrapper) {
        const images = hoodieWrapper.querySelectorAll('.slider-image');
        let currentIndex = 0;
        
        if (images.length > 1) {
            // Show first image, hide others using opacity
            images.forEach((img, idx) => {
                img.classList.toggle('active', idx === 0);
            });
            
            // Cycle through images every 3 seconds
            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 3000);
        }
    }

    // ----- Add to cart buttons -----
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.getAttribute('data-name') || 'Item';
            alert(`✨ ${productName} added to your cart! 🛒\n\nComplete your order soon.`);
        });
    });

    // ----- Contact form submission -----
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = contactForm.querySelector('input[placeholder="Your name"]');
            const emailInput = contactForm.querySelector('input[placeholder="Email address"]');
            if (nameInput && nameInput.value.trim() === '') {
                alert('Please enter your name.');
                return;
            }
            if (emailInput && !emailInput.value.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            alert('📩 Thank you! Your message has been sent. We’ll reply within 48h.');
            contactForm.reset();
        });
    }

    // ----- Close mobile menu on window resize above 768px -----
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menuOpen && mobileMenu) {
            toggleMobileMenu(false);
        }
    });

    // Initial state: mobile menu hidden
    if (mobileMenu) mobileMenu.style.display = 'none';
    menuOpen = false;
});
