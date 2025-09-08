// ===========================
// MAIN APPLICATION CONTROLLER - PROFESSIONAL VERSION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules immediately
    initializeApp();
});

function initializeApp() {
    // Mark that JavaScript is loaded
    document.documentElement.classList.add('js-loaded');
    
    // Core initializations - professional only
    initSmoothScroll();
    initMobileMenu();
    initTypedText();
    initContactForm();
    initBackToTop();
}


// ===========================
// SMOOTH SCROLLING
// ===========================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
                'Finance & Accounting Student',
                'LLQP Licensed',
                'Insurance Representative',
                'UMMA Event Coordinator'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    } else {
        // Fallback: Just show the main title
        typedElement.textContent = 'Finance & Accounting Student';
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
        
        if (type === 'success') {
            if (successMsg) {
                successMsg.textContent = 'Your message was sent successfully! I\'ll get back to you soon.';
            }
            if (successContainer) {
                successContainer.style.display = 'flex';
                successContainer.style.opacity = '1';
                successContainer.style.transform = 'translateY(0)';
            }
        } else {
            if (errorMsg) {
                errorMsg.textContent = message;
            }
            if (errorContainer) {
                errorContainer.style.display = 'flex';
                errorContainer.style.opacity = '1';
                errorContainer.style.transform = 'translateY(0)';
            }
        }
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideAllMessages();
        }, 5000);
    }
    
    function hideAllMessages() {
        const messages = document.querySelectorAll('.success-message, .error-message');
        messages.forEach(msg => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                msg.style.display = 'none';
            }, 300);
        });
    }
    
    // Form field animations
    const formInputs = form.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        const label = input.parentElement.querySelector('.form-label');
        const line = input.parentElement.querySelector('.form-line');
        
        input.addEventListener('focus', () => {
            if (label) {
                label.style.top = '-0.5rem';
                label.style.fontSize = '0.8rem';
                label.style.color = 'var(--forest-green)';
            }
            if (line) {
                line.style.width = '100%';
            }
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                if (label) {
                    label.style.top = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-tertiary)';
                }
            }
            if (line) {
                line.style.width = input.value ? '100%' : '0%';
            }
        });
    });
}

// ===========================
// BACK TO TOP BUTTON
// ===========================
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
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