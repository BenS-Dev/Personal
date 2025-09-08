// ===========================
// GSAP ANIMATIONS & SCROLL EFFECTS
// ===========================

(function() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded, using fallback animations');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize animations after DOM is loaded
    document.addEventListener('DOMContentLoaded', initAnimations);
    
    function initAnimations() {
        heroAnimations();
        parallaxEffects();
        magneticButtons();
        textAnimations();
        timelineAnimations();
        skillAnimations();
        contactAnimations();
        headerAnimations();
    }
    
    // ===========================
    // HERO ANIMATIONS
    // ===========================
    function heroAnimations() {
        // Hero title animation
        gsap.from('.hero-title', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 2.5
        });
        
        // Hero subtitle animation
        gsap.from('.hero-subtitle', {
            duration: 1.5,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 2.7
        });
        
        // Hero location animation
        gsap.from('.hero-location', {
            duration: 1.5,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 2.9
        });
        
        // Hero CTA buttons animation
        gsap.from('.hero-cta button', {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 3.1
        });
        
        // Profile image animation
        gsap.from('.profile-container', {
            duration: 1.5,
            scale: 0.8,
            opacity: 0,
            ease: 'power3.out',
            delay: 3.3
        });
        
        // Profile rings rotation
        gsap.to('.ring-1', {
            rotation: 360,
            duration: 30,
            repeat: -1,
            ease: 'none'
        });
        
        gsap.to('.ring-2', {
            rotation: -360,
            duration: 35,
            repeat: -1,
            ease: 'none'
        });
        
        gsap.to('.ring-3', {
            rotation: 360,
            duration: 40,
            repeat: -1,
            ease: 'none'
        });
        
        // Scroll indicator animation
        gsap.to('.scroll-indicator', {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }
    
    // ===========================
    // PARALLAX EFFECTS
    // ===========================
    function parallaxEffects() {
        // Hero parallax
        gsap.to('.hero-visual', {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        
        // Aurora background parallax
        gsap.to('.aurora-1', {
            yPercent: -20,
            xPercent: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        
        gsap.to('.aurora-2', {
            yPercent: -15,
            xPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        
        gsap.to('.aurora-3', {
            yPercent: -25,
            xPercent: 5,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        
        gsap.to('.aurora-4', {
            yPercent: -10,
            xPercent: -5,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        
        // Section titles parallax
        document.querySelectorAll('.section-title').forEach(title => {
            gsap.from(title, {
                yPercent: 30,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: true
                }
            });
        });
    }
    
    // ===========================
    // MAGNETIC BUTTONS
    // ===========================
    function magneticButtons() {
        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        
        magneticBtns.forEach(btn => {
            const boundingBox = btn.getBoundingClientRect();
            const centerX = boundingBox.left + boundingBox.width / 2;
            const centerY = boundingBox.top + boundingBox.height / 2;
            
            btn.addEventListener('mousemove', (e) => {
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    gsap.to(btn, {
                        x: deltaX * force * 0.3,
                        y: deltaY * force * 0.3,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }
    
    // ===========================
    // TEXT ANIMATIONS
    // ===========================
    function textAnimations() {
        // Split text animations for section headers
        const splitTexts = document.querySelectorAll('.reveal-text');
        
        splitTexts.forEach(text => {
            const spans = text.querySelectorAll('span');
            
            gsap.from(spans, {
                duration: 0.8,
                y: 100,
                opacity: 0,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: text,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
        
        // Fade in animations
        const fadeElements = document.querySelectorAll('.reveal-fade');
        
        fadeElements.forEach(element => {
            gsap.from(element, {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
        
        // Scale animations
        const scaleElements = document.querySelectorAll('.reveal-scale');
        
        scaleElements.forEach(element => {
            gsap.from(element, {
                duration: 1,
                scale: 0.8,
                opacity: 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
    
    // ===========================
    // TIMELINE ANIMATIONS
    // ===========================
    function timelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            const isLeft = index % 2 === 0;
            
            gsap.from(item, {
                duration: 1,
                x: isLeft ? -100 : 100,
                opacity: 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
            
            // Animate timeline dot
            const dot = item.querySelector('.dot-inner');
            if (dot) {
                gsap.to(dot, {
                    scale: 1.5,
                    duration: 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play pause resume pause'
                    }
                });
            }
        });
        
        // Timeline progress line animation
        const timelineProgress = document.querySelector('.timeline-progress');
        if (timelineProgress) {
            gsap.to(timelineProgress, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.timeline-container',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: true
                }
            });
        }
    }
    
    // ===========================
    // SKILL ANIMATIONS
    // ===========================
    function skillAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            
            gsap.fromTo(bar, 
                { width: '0%' },
                {
                    width: width + '%',
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: bar,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
        
        // Skill items hover effect
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    x: 10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    x: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    // ===========================
    // CONTACT ANIMATIONS
    // ===========================
    function contactAnimations() {
        // Social links hover animation
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    y: -5,
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                // Animate tooltip
                const tooltip = link.querySelector('.social-tooltip');
                if (tooltip) {
                    gsap.to(tooltip, {
                        opacity: 1,
                        y: 5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                // Hide tooltip
                const tooltip = link.querySelector('.social-tooltip');
                if (tooltip) {
                    gsap.to(tooltip, {
                        opacity: 0,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
        
        // Form input animations
        const formInputs = document.querySelectorAll('.form-input');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                const line = input.nextElementSibling.nextElementSibling;
                if (line && line.classList.contains('form-line')) {
                    gsap.to(line, {
                        width: '100%',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    const line = input.nextElementSibling.nextElementSibling;
                    if (line && line.classList.contains('form-line')) {
                        gsap.to(line, {
                            width: '0%',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                }
            });
        });
    }
    
    // ===========================
    // HEADER ANIMATIONS
    // ===========================
    function headerAnimations() {
        const header = document.querySelector('.glass-header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        function updateHeader() {
            const scrollY = window.scrollY;
            
            if (scrollY > lastScrollY && scrollY > 100) {
                // Scrolling down - hide header
                gsap.to(header, {
                    y: -100,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
            } else {
                // Scrolling up - show header
                gsap.to(header, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
            }
            
            // Add background blur on scroll
            if (scrollY > 50) {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.8)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // ===========================
    // SMOOTH SCROLL WITH GSAP
    // ===========================
    function smoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                }
            });
        });
    }
    
    // Initialize smooth scroll if ScrollToPlugin is available
    if (gsap.plugins && gsap.plugins.scrollTo) {
        smoothScroll();
    }
})();