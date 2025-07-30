
 <script>
        // Enhanced JavaScript functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Header scroll effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Intersection Observer for reveal animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            document.querySelectorAll('.reveal').forEach(el => {
                observer.observe(el);
            });

            // Enhanced property card interactions
            document.querySelectorAll('.property-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-12px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Type card hover effects with enhanced animations
            document.querySelectorAll('.type-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const icon = this.querySelector('i');
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                });
                
                card.addEventListener('mouseleave', function() {
                    const icon = this.querySelector('i');
                    icon.style.transform = 'scale(1) rotate(0deg)';
                });
            });

            // Enhanced search form handling
            document.querySelector('.search-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const searchBtn = this.querySelector('.search-btn');
                const originalHTML = searchBtn.innerHTML;
                
                // Add loading state
                searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching Properties...';
                searchBtn.disabled = true;
                searchBtn.style.opacity = '0.7';
                
                // Simulate search with realistic delay
                setTimeout(() => {
                    searchBtn.innerHTML = '<i class="fas fa-check"></i> Search Complete!';
                    searchBtn.style.background = '#10b981';
                    
                    setTimeout(() => {
                        searchBtn.innerHTML = originalHTML;
                        searchBtn.disabled = false;
                        searchBtn.style.opacity = '1';
                        searchBtn.style.background = '';
                        
                        // Show results notification
                        showNotification('Found 25 properties matching your criteria!', 'success');
                    }, 1500);
                }, 2000);
            });

            // Property action buttons with enhanced feedback
            document.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.textContent.trim();
                    const originalText = this.textContent;
                    
                    // Add click animation
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                    
                    if (action === 'View Details') {
                        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            showNotification('Property details would open in a modal!', 'info');
                        }, 1000);
                    } else if (action.includes('Contact')) {
                        this.innerHTML = '<i class="fas fa-phone fa-pulse"></i> Connecting...';
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            showNotification('Contact form would open here!', 'info');
                        }, 1000);
                    } else if (action.includes('Visit') || action.includes('Schedule')) {
                        this.innerHTML = '<i class="fas fa-calendar fa-spin"></i> Scheduling...';
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            showNotification('Site visit scheduled successfully!', 'success');
                        }, 1000);
                    }
                });
            });

            // Enhanced parallax effect for hero section
            let ticking = false;
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    requestAnimationFrame(function() {
                        const scrolled = window.pageYOffset;
                        const hero = document.querySelector('.hero');
                        const rate = scrolled * -0.3;
                        hero.style.transform = `translateY(${rate}px)`;
                        ticking = false;
                    });
                    ticking = true;
                }
            });

            // Animated counter for trust indicators
            function animateCounter(element, target, duration = 2000) {
                let start = 0;
                const increment = target / (duration / 16);
                
                function updateCounter() {
                    start += increment;
                    if (start < target) {
                        element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                    }
                }
                updateCounter();
            }

            // Trigger counter animation when trust section is visible
            const trustObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const numbers = entry.target.querySelectorAll('.trust-number');
                        numbers.forEach(num => {
                            const text = num.textContent;
                            const value = parseInt(text.replace(/\D/g, ''));
                            animateCounter(num, value);
                        });
                        trustObserver.unobserve(entry.target);
                    }
                });
            });

            const trustSection = document.querySelector('.trust-indicators');
            if (trustSection) {
                trustObserver.observe(trustSection);
            }

            // Mobile menu functionality
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navMenu = document.querySelector('.nav-menu');
            
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    this.classList.toggle('active');
                });
            }

            // Notification system
            function showNotification(message, type = 'info') {
                const notification = document.createElement('div');
                notification.className = `notification notification-${type}`;
                notification.innerHTML = `
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                    <span>${message}</span>
                    <button class="notification-close">&times;</button>
                `;
                
                // Add notification styles
                Object.assign(notification.style, {
                    position: 'fixed',
                    top: '100px',
                    right: '20px',
                    background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0066cc',
                    color: 'white',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    zIndex: '10000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    maxWidth: '350px',
                    transform: 'translateX(400px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                });
                
                document.body.appendChild(notification);
                
                // Animate in
                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                }, 100);
                
                // Close functionality
                notification.querySelector('.notification-close').addEventListener('click', () => {
                    notification.style.transform = 'translateX(400px)';
                    setTimeout(() => notification.remove(), 300);
                });
                
                // Auto remove
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.style.transform = 'translateX(400px)';
                        setTimeout(() => notification.remove(), 300);
                    }
                }, 5000);
            }

            // Contact button pulse effect
            const contactBtn = document.querySelector('.contact-btn');
            setInterval(() => {
                contactBtn.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    contactBtn.style.transform = 'scale(1)';
                }, 200);
            }, 4000);

            // Add loading states to page elements
            setTimeout(() => {
                document.querySelectorAll('.loading').forEach(el => {
                    el.classList.add('loaded');
                });
            }, 500);
        });

        // Additional CSS for mobile menu and notifications
        const additionalStyles = document.createElement('style');
        additionalStyles.textContent = `
            @media (max-width: 768px) {
                .nav-menu.active {
                    display: flex;
                    position: fixed;
                    top: 80px;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: var(--shadow-lg);
                    border-top: 1px solid var(--border-light);
                }
                
                .mobile-menu-btn.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .mobile-menu-btn.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu-btn.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
            }
            
            /* Enhanced hover effects */
            .btn-primary::before, .btn-secondary::before, .contact-btn::before, .search-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.6s;
            }
            
            .btn-primary:hover::before, .btn-secondary:hover::before, .search-btn:hover::before {
                left: 100%;
            }
        `;
        document.head.appendChild(additionalStyles);
    </script>