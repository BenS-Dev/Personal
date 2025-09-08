// ===========================
// USER INTERACTIONS & SPECIAL EFFECTS
// ===========================

(function() {
    document.addEventListener('DOMContentLoaded', initInteractions);
    
    function initInteractions() {
        initMagneticEffect();
        initRippleEffect();
        initHoverEffects();
        initKeyboardShortcuts();
        initMobileInteractions();
        initAudioVisualizer();
        initTimeBasedThemes();
        initReducedMotion();
    }
    
    // ===========================
    // MAGNETIC EFFECT FOR BUTTONS
    // ===========================
    function initMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic-btn');
        
        magneticElements.forEach(elem => {
            const boundingBox = elem.getBoundingClientRect();
            const magneticStrength = 0.3;
            const magneticRange = 100;
            
            elem.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                if (distance < magneticRange) {
                    const force = (magneticRange - distance) / magneticRange;
                    const moveX = deltaX * force * magneticStrength;
                    const moveY = deltaY * force * magneticStrength;
                    
                    this.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.1})`;
                    
                    // Move inner text in opposite direction for parallax effect
                    const innerText = this.querySelector('span');
                    if (innerText) {
                        innerText.style.transform = `translate(${-moveX * 0.3}px, ${-moveY * 0.3}px)`;
                    }
                }
            });
            
            elem.addEventListener('mouseleave', function() {
                this.style.transform = '';
                const innerText = this.querySelector('span');
                if (innerText) {
                    innerText.style.transform = '';
                }
            });
            
            // Add elastic animation on click
            elem.addEventListener('click', function() {
                this.style.animation = 'elasticPop 0.6s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
        });
    }
    
    // ===========================
    // RIPPLE EFFECT ON CLICK
    // ===========================
    function initRippleEffect() {
        document.addEventListener('click', function(e) {
            // Don't create ripples on input elements
            if (e.target.matches('input, textarea, select')) return;
            
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            ripple.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0, 255, 204, 0.3), transparent);
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 9999;
                animation: rippleExpand 0.6s ease-out;
            `;
            
            document.body.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Add ripple animation
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes rippleExpand {
                    to {
                        width: 100px;
                        height: 100px;
                        opacity: 0;
                    }
                }
                @keyframes elasticPop {
                    0%, 100% { transform: scale(1); }
                    30% { transform: scale(1.25); }
                    40% { transform: scale(0.75); }
                    50% { transform: scale(1.15); }
                    65% { transform: scale(0.95); }
                    75% { transform: scale(1.05); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ===========================
    // HOVER EFFECTS
    // ===========================
    function initHoverEffects() {
        // Card hover effects
        const cards = document.querySelectorAll('.glass-card, .stat-card, .skill-item, .timeline-content');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 255, 204, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
        
        // Link hover sound and animation
        const links = document.querySelectorAll('a:not(.magnetic-btn)');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                if (!this.querySelector('.hover-underline')) {
                    const underline = document.createElement('span');
                    underline.className = 'hover-underline';
                    underline.style.cssText = `
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 0;
                        height: 2px;
                        background: linear-gradient(90deg, #00ffcc, #ff00ff);
                        transition: width 0.3s ease;
                    `;
                    this.style.position = 'relative';
                    this.appendChild(underline);
                    
                    setTimeout(() => {
                        underline.style.width = '100%';
                    }, 10);
                }
            });
            
            link.addEventListener('mouseleave', function() {
                const underline = this.querySelector('.hover-underline');
                if (underline) {
                    underline.style.width = '0';
                    setTimeout(() => underline.remove(), 300);
                }
            });
        });
    }
    
    // ===========================
    // KEYBOARD SHORTCUTS
    // ===========================
    function initKeyboardShortcuts() {
        const shortcuts = {
            '1': '#hero',
            '2': '#about',
            '3': '#experience',
            '4': '#skills',
            '5': '#contact',
            'h': '#hero',
            'a': '#about',
            'e': '#experience',
            's': '#skills',
            'c': '#contact'
        };
        
        document.addEventListener('keydown', function(e) {
            // Don't trigger if user is typing in an input
            if (e.target.matches('input, textarea')) return;
            
            // Check for shortcuts
            if (shortcuts[e.key]) {
                e.preventDefault();
                const target = document.querySelector(shortcuts[e.key]);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Special shortcuts
            if (e.key === 'Escape') {
                // Close any open modals/palettes
                const commandPalette = document.getElementById('command-palette');
                if (commandPalette && commandPalette.classList.contains('active')) {
                    commandPalette.classList.remove('active');
                }
            }
            
            
        });
    }
    
    // ===========================
    // MOBILE INTERACTIONS
    // ===========================
    function initMobileInteractions() {
        // Check if device has touch
        if (!('ontouchstart' in window)) return;
        
        // Swipe gestures
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const verticalSwipe = Math.abs(touchEndY - touchStartY);
            const horizontalSwipe = Math.abs(touchEndX - touchStartX);
            
            // Horizontal swipe (for mobile menu)
            if (horizontalSwipe > swipeThreshold && horizontalSwipe > verticalSwipe) {
                const mobileNav = document.querySelector('.mobile-nav');
                const menuToggle = document.querySelector('.menu-toggle');
                
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Swipe left - close menu
                    if (mobileNav?.classList.contains('active')) {
                        mobileNav.classList.remove('active');
                        menuToggle?.classList.remove('active');
                    }
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    // Swipe right - open menu
                    if (!mobileNav?.classList.contains('active')) {
                        mobileNav?.classList.add('active');
                        menuToggle?.classList.add('active');
                    }
                }
            }
        }
        
        // Haptic feedback for buttons (if supported)
        if ('vibrate' in navigator) {
            document.querySelectorAll('button, .btn, .magnetic-btn').forEach(btn => {
                btn.addEventListener('touchstart', () => {
                    navigator.vibrate(10);
                });
            });
        }
        
        // Pull to refresh
        let pullStartY = 0;
        let isPulling = false;
        
        document.addEventListener('touchstart', function(e) {
            if (window.scrollY === 0) {
                pullStartY = e.touches[0].clientY;
                isPulling = true;
            }
        });
        
        document.addEventListener('touchmove', function(e) {
            if (!isPulling) return;
            
            const pullDistance = e.touches[0].clientY - pullStartY;
            
            if (pullDistance > 0 && pullDistance < 150) {
                document.body.style.transform = `translateY(${pullDistance * 0.5}px)`;
                document.body.style.transition = 'none';
            }
        });
        
        document.addEventListener('touchend', function() {
            if (!isPulling) return;
            
            const pullDistance = parseInt(document.body.style.transform.replace(/[^\d.]/g, ''));
            
            if (pullDistance > 50) {
                // Trigger refresh
                location.reload();
            } else {
                document.body.style.transform = '';
                document.body.style.transition = 'transform 0.3s ease';
            }
            
            isPulling = false;
        });
    }
    
    // ===========================
    // AUDIO VISUALIZER
    // ===========================
    function initAudioVisualizer() {
        // Create visualizer container
        const visualizer = document.createElement('div');
        visualizer.className = 'audio-visualizer';
        visualizer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 200px;
            height: 60px;
            display: none;
            align-items: flex-end;
            gap: 2px;
            z-index: 100;
            pointer-events: none;
        `;
        
        // Create bars
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.style.cssText = `
                width: 8px;
                height: 4px;
                background: linear-gradient(to top, #00ffcc, #ff00ff);
                border-radius: 2px;
                animation: audioBar ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate;
            `;
            visualizer.appendChild(bar);
        }
        
        document.body.appendChild(visualizer);
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes audioBar {
                to {
                    height: ${20 + Math.random() * 40}px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===========================
    // TIME-BASED THEMES
    // ===========================
    function initTimeBasedThemes() {
        const hour = new Date().getHours();
        const body = document.body;
        
        // Apply time-based theme
        if (hour >= 6 && hour < 12) {
            // Morning theme
            body.classList.add('morning-theme');
        } else if (hour >= 12 && hour < 17) {
            // Afternoon theme
            body.classList.add('afternoon-theme');
        } else if (hour >= 17 && hour < 20) {
            // Evening theme
            body.classList.add('evening-theme');
        } else {
            // Night theme (default)
            body.classList.add('night-theme');
        }
        
        // Add theme styles
        const themeStyles = document.createElement('style');
        themeStyles.textContent = `
            .morning-theme {
                --theme-filter: hue-rotate(30deg) brightness(1.1);
            }
            .afternoon-theme {
                --theme-filter: hue-rotate(0deg) brightness(1);
            }
            .evening-theme {
                --theme-filter: hue-rotate(-30deg) brightness(0.9);
            }
            .night-theme {
                --theme-filter: hue-rotate(0deg) brightness(0.8);
            }
            
            .aurora-container,
            .gradient-text,
            .gradient-aurora {
                filter: var(--theme-filter, none);
            }
        `;
        document.head.appendChild(themeStyles);
    }
    
    // ===========================
    // REDUCED MOTION SUPPORT
    // ===========================
    function initReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        function handleReducedMotionChange() {
            if (prefersReducedMotion.matches) {
                // Disable animations
                document.body.classList.add('reduced-motion');
                
                // Stop particle animations
                if (window.pJSDom && window.pJSDom[0]) {
                    window.pJSDom[0].pJS.particles.move.enable = false;
                }
                
                // Reduce Three.js quality
                const canvas = document.getElementById('three-canvas');
                if (canvas) {
                    canvas.style.display = 'none';
                }
            } else {
                document.body.classList.remove('reduced-motion');
            }
        }
        
        prefersReducedMotion.addEventListener('change', handleReducedMotionChange);
        handleReducedMotionChange();
    }
    
    // ===========================
    // PERFORMANCE MONITOR
    // ===========================
    function initPerformanceMonitor() {
        let fps = 60;
        let lastTime = performance.now();
        let frames = 0;
        
        function measureFPS() {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                fps = Math.round((frames * 1000) / (currentTime - lastTime));
                
                // Reduce effects if FPS is low
                if (fps < 30) {
                    document.body.classList.add('low-performance');
                } else {
                    document.body.classList.remove('low-performance');
                }
                
                frames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        }
        
        // Start monitoring after page load
        window.addEventListener('load', () => {
            setTimeout(measureFPS, 1000);
        });
    }
    
    // Initialize performance monitor
    initPerformanceMonitor();
})();