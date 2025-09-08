// ===========================
// MAIN APPLICATION CONTROLLER
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules immediately
    initializeApp();
});

function initializeApp() {
    // Mark that JavaScript is loaded
    document.documentElement.classList.add('js-loaded');
    
    // Core initializations
    initLoadingScreen();
    initSmoothScroll();
    initMobileMenu();
    initTypedText();
    initCountUpAnimations();
    initRevealAnimations();
    initTiltEffects();
    initCommandPalette();
    initContactForm();
    initBackToTop();
    initEasterEggs();
    
    // Initialize particle effects if library is loaded
    if (typeof particlesJS !== 'undefined') {
        initParticles();
    } else {
        console.log('Particles.js not loaded - continuing without particle effects');
    }
    
    // Initialize Three.js if loaded
    if (typeof THREE !== 'undefined') {
        // Three.js initialization is in 3d-effects.js
    } else {
        console.log('Three.js not loaded - continuing without 3D effects');
    }
    
    // Initialize GSAP animations if loaded
    if (typeof gsap !== 'undefined') {
        // GSAP animations are in animations.js
    } else {
        console.log('GSAP not loaded - using CSS animations');
    }
}

// ===========================
// LOADING SCREEN
// ===========================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Much shorter loading time
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        // Make sure all sections are visible immediately
        document.body.style.visibility = 'visible';
        
        // Trigger initial animations after loading
        setTimeout(() => {
            document.querySelectorAll('.reveal-text, .reveal-fade, .reveal-scale').forEach(el => {
                if (isInViewport(el)) {
                    el.classList.add('active');
                }
            });
        }, 100);
    }, 500); // Reduced from 2000ms to 500ms
}


// ===========================
// SMOOTH SCROLL
// ===========================
function initSmoothScroll() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Header height
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileNav = document.querySelector('.mobile-nav');
                const menuToggle = document.querySelector('.menu-toggle');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===========================
// MOBILE MENU
// ===========================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!menuToggle || !mobileNav) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
}



// ===========================
// TYPED TEXT ANIMATION
// ===========================
function initTypedText() {
    const typedElement = document.getElementById('typed-output');
    if (!typedElement) return;
    
    if (typeof Typed !== 'undefined') {
        // Use Typed.js if available
        new Typed('#typed-output', {
            strings: [
                'University of Manitoba Student',
                'Accounting & Finance Enthusiast',
                'Digital Innovation Explorer',
                'Future Business Leader',
                'Tech-Savvy Professional'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    } else {
        // Fallback: Just show the main title
        typedElement.textContent = 'University of Manitoba Student';
    }
}

// ===========================
// COUNT UP ANIMATIONS
// ===========================
function initCountUpAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '%';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '%';
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ===========================
// REVEAL ANIMATIONS
// ===========================
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal-text, .reveal-fade, .reveal-scale, .reveal-timeline');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    reveals.forEach(reveal => revealObserver.observe(reveal));
    
    // Skill bar animations
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
    
    // Timeline progress animation
    const timelineProgress = document.querySelector('.timeline-progress');
    if (timelineProgress) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timelineProgress.style.height = '100%';
                }
            });
        }, {
            threshold: 0.1
        });
        timelineObserver.observe(timelineProgress.parentElement);
    }
}

// ===========================
// TILT EFFECTS
// ===========================
function initTiltEffects() {
    if (typeof VanillaTilt === 'undefined') return;
    
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        perspective: 1000
    });
}

// ===========================
// COMMAND PALETTE
// ===========================
function initCommandPalette() {
    const commandPalette = document.getElementById('command-palette');
    const commandInput = document.getElementById('command-input');
    const commandClose = document.querySelector('.command-close');
    
    if (!commandPalette) return;
    
    // Open with Ctrl+K or Cmd+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openCommandPalette();
        }
        
        // Close with Escape
        if (e.key === 'Escape' && commandPalette.classList.contains('active')) {
            closeCommandPalette();
        }
    });
    
    commandClose.addEventListener('click', closeCommandPalette);
    
    // Handle command selection
    document.querySelectorAll('.command-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            const target = item.getAttribute('data-target');
            
            if (action === 'navigate' && target) {
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (action === 'effects') {
                toggleEffects();
            }
            
            closeCommandPalette();
            });
    });
    
    // Search functionality
    commandInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.command-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? 'flex' : 'none';
        });
    });
    
    function openCommandPalette() {
        commandPalette.classList.add('active');
        commandInput.value = '';
        commandInput.focus();
        document.querySelectorAll('.command-item').forEach(item => {
            item.style.display = 'flex';
        });
    }
    
    function closeCommandPalette() {
        commandPalette.classList.remove('active');
    }
}

// ===========================
// CONTACT FORM
// ===========================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Hide any existing messages
        hideAllMessages();
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form)
            });
            
            if (response.ok) {
                console.log('Form submission successful!');
                showFormMessage('success', 'Message sent successfully!');
                form.reset();
                
                // Reset form labels
                const labels = form.querySelectorAll('.form-label');
                labels.forEach(label => {
                    label.style.top = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-tertiary)';
                });
                
                // Reset form lines
                const lines = form.querySelectorAll('.form-line');
                lines.forEach(line => {
                    line.style.width = '0%';
                });
                
            } else {
                showFormMessage('error', 'Something went wrong.');
            }
        } catch (error) {
            showFormMessage('error', 'Network error. Please try again.');
        } finally {
            // Restore button after a short delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 1000);
        }
    });
    
    function showFormMessage(type, message) {
        const successContainer = document.querySelector('.success-message');
        const errorContainer = document.querySelector('.error-message');
        const successMsg = document.querySelector('.success-message span');
        const errorMsg = document.querySelector('.error-message span');
        
        console.log('Showing message:', type, message);
        console.log('Success container:', successContainer);
        console.log('Error container:', errorContainer);
        
        if (type === 'success') {
            if (successMsg) {
                successMsg.textContent = '🎉 Your message was sent successfully! I\'ll get back to you soon.';
            }
            if (successContainer) {
                successContainer.style.display = 'flex';
                successContainer.style.opacity = '1';
                successContainer.style.transform = 'translateY(0)';
            }
            if (errorContainer) {
                errorContainer.style.display = 'none';
            }
            
            // Auto-hide after 8 seconds
            setTimeout(() => {
                if (successContainer) {
                    successContainer.style.display = 'none';
                }
            }, 8000);
        } else {
            if (errorMsg) {
                errorMsg.textContent = '❌ Oops! Something went wrong. Please try again.';
            }
            if (errorContainer) {
                errorContainer.style.display = 'flex';
                errorContainer.style.opacity = '1';
                errorContainer.style.transform = 'translateY(0)';
            }
            if (successContainer) {
                successContainer.style.display = 'none';
            }
            
            // Auto-hide after 6 seconds
            setTimeout(() => {
                if (errorContainer) {
                    errorContainer.style.display = 'none';
                }
            }, 6000);
        }
        
        // Scroll to message
        setTimeout(() => {
            const messageElement = type === 'success' ? successContainer : errorContainer;
            if (messageElement) {
                messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
    
    function hideAllMessages() {
        const successContainer = document.querySelector('.success-message');
        const errorContainer = document.querySelector('.error-message');
        if (successContainer) successContainer.style.display = 'none';
        if (errorContainer) errorContainer.style.display = 'none';
    }
}

// ===========================
// BACK TO TOP
// ===========================
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });
}

// ===========================
// EASTER EGGS
// ===========================
function initEasterEggs() {
    // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        // Create confetti effect
        createConfetti();
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
    
    function createConfetti() {
        const colors = ['#00ffcc', '#ff00ff', '#ffff00', '#00bfff', '#ff1493'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: 50%;
                z-index: 9999;
                animation: confettiFall ${2 + Math.random() * 2}s linear;
            `;
            document.body.appendChild(confetti);
            
            confetti.addEventListener('animationend', () => confetti.remove());
        }
    }
    
    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===========================
// PARTICLE EFFECTS
// ===========================
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#00ffcc', '#ff00ff', '#ffff00', '#00bfff']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ffcc',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ===========================
// TOGGLE EFFECTS
// ===========================
function toggleEffects() {
    const particles = document.getElementById('particles-js');
    const aurora = document.querySelector('.aurora-container');
    const threeCanvas = document.getElementById('three-canvas');
    
    if (particles) particles.style.display = particles.style.display === 'none' ? 'block' : 'none';
    if (aurora) aurora.style.display = aurora.style.display === 'none' ? 'block' : 'none';
    if (threeCanvas) threeCanvas.style.display = threeCanvas.style.display === 'none' ? 'block' : 'none';
}

// ===========================
// UTILITY FUNCTIONS
// ===========================
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}