// Nintendo Switch Style Animation JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('mainContent');
    const gameCards = document.querySelectorAll('.game-card');
    const bottomNav = document.querySelector('.bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');

    // Loading animation sequence
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Show main content after loader fades
        setTimeout(() => {
            mainContent.classList.add('visible');
            
            // Trigger card animations with stagger
            setTimeout(() => {
                gameCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
                
                // Show bottom navigation
                setTimeout(() => {
                    bottomNav.classList.add('visible');
                }, 800);
                
            }, 300);
            
        }, 600);
        
    }, 2500); // Loader duration

    // Add click ripple effect to game cards
    gameCards.forEach(card => {
        card.addEventListener('click', (e) => {
            createRipple(e, card);
            
            // Add selection animation
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });

    // Ripple effect function
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Navigation item selection
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active to clicked
            item.classList.add('active');
            
            // Add bounce animation
            item.style.animation = 'navBounce 0.4s ease';
            setTimeout(() => {
                item.style.animation = '';
            }, 400);
        });
    });

    // Add hover sound effect simulation (visual feedback)
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    });

    // Keyboard navigation support
    let currentCardIndex = -1;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            currentCardIndex = (currentCardIndex + 1) % gameCards.length;
            highlightCard(currentCardIndex);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            currentCardIndex = (currentCardIndex - 1 + gameCards.length) % gameCards.length;
            highlightCard(currentCardIndex);
        } else if (e.key === 'Enter' && currentCardIndex >= 0) {
            gameCards[currentCardIndex].click();
        }
    });

    function highlightCard(index) {
        gameCards.forEach((card, i) => {
            if (i === index) {
                card.style.boxShadow = '0 0 30px rgba(255,255,255,0.5)';
                card.style.borderColor = 'rgba(255,255,255,0.8)';
            } else {
                card.style.boxShadow = '';
                card.style.borderColor = '';
            }
        });
    }

    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        gameCards.forEach((card, index) => {
            const depth = (index + 1) * 5;
            const x = mouseX * depth;
            const y = mouseY * depth;
            
            if (!card.matches(':hover')) {
                card.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    });

    // Add CSS for nav bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
        }
    `;
    document.head.appendChild(style);

    console.log('🎮 Nintendo Switch Style Animation Loaded!');
});
