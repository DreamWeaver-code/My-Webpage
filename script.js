// Enhanced JavaScript with interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initScrollAnimations();
    initContactForm();
    initInteractiveElements();
    initTypingEffect();
    initParallaxEffect();
    initImageGallery();
    initSkillBars();
    initStatsCounter();
    initLoadingScreen();
    
    // Add smooth scrolling for navigation links
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
});

// Loading screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
}

// Animate skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const animateSkillBar = (bar) => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Animate stats counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and images
    document.querySelectorAll('section, img, #about, #quote, .skill-card, .interest-card').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Contact form handling
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });
}

// Field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
    } else {
        clearFieldError(field);
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearValidation(e) {
    if (e.target.classList.contains('error')) {
        clearFieldError(e.target);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    });
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Interactive elements
function initInteractiveElements() {
    // Add hover effects to images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add click effects to sections
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add interactive effects to skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add interactive effects to interest cards
    document.querySelectorAll('.interest-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Typing effect for the main heading
function initTypingEffect() {
    const heading = document.querySelector('header h1');
    if (!heading) return;
    
    const text = heading.textContent;
    heading.textContent = '';
    heading.style.borderRight = '2px solid #90ee90';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heading.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heading.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax effect for background
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Image gallery with lightbox effect
function initImageGallery() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
}

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    // Style the lightbox
    Object.assign(lightbox.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10000',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    const content = lightbox.querySelector('.lightbox-content');
    Object.assign(content.style, {
        position: 'relative',
        maxWidth: '90%',
        maxHeight: '90%'
    });
    
    const img = lightbox.querySelector('img');
    Object.assign(img.style, {
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    });
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    Object.assign(closeBtn.style, {
        position: 'absolute',
        top: '-40px',
        right: '0',
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '2rem',
        cursor: 'pointer',
        padding: '0',
        width: '40px',
        height: '40px'
    });
    
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Add some dynamic content
function addDynamicContent() {
    // Add a visitor counter (stored in localStorage)
    const visitorCount = localStorage.getItem('visitorCount') || 0;
    const newCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', newCount);
    
    // Note: Time/date bar removed as requested
}

// Initialize dynamic content
addDynamicContent();

// Add some fun Easter eggs
document.addEventListener('keydown', function(e) {
    // Konami code easter egg
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        showNotification('🎮 Gaming mode activated!', 'info');
    }
});

// Add a floating action button for quick navigation
function addFloatingActionButton() {
    const fab = document.createElement('div');
    fab.className = 'floating-action-button';
    fab.innerHTML = '⬆️';
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #2d5a27, #4a7c59);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        transform: scale(0);
    `;
    
    fab.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    fab.addEventListener('mouseenter', () => {
        fab.style.transform = 'scale(1.1)';
        fab.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
    });
    
    fab.addEventListener('mouseleave', () => {
        fab.style.transform = 'scale(1)';
        fab.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });
    
    document.body.appendChild(fab);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            fab.style.opacity = '1';
            fab.style.transform = 'scale(1)';
        } else {
            fab.style.opacity = '0';
            fab.style.transform = 'scale(0)';
        }
    });
}

// Initialize floating action button
addFloatingActionButton();

// Add particle effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(144, 238, 144, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float 6s ease-in-out infinite;
            animation-delay: ${Math.random() * 6}s;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particlesContainer.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();


