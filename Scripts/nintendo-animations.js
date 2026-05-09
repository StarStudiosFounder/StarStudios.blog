// Nintendo-style Interactive Animations
// Adds playful, bouncy interactions inspired by Nintendo games

document.addEventListener('DOMContentLoaded', function() {
    
    // Add bounce effect to all clickable elements
    const clickables = document.querySelectorAll('a, button, .card, .social-btn');
    clickables.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('mousedown', function(e) {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        el.addEventListener('mouseup', function(e) {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        el.addEventListener('mouseleave', function(e) {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add star particle effect on click
    document.addEventListener('click', function(e) {
        createStarParticles(e.clientX, e.clientY);
    });
    
    function createStarParticles(x, y) {
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF2E63', '#08D9D6'];
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const star = document.createElement('div');
            star.innerHTML = '★';
            star.style.position = 'fixed';
            star.style.left = x + 'px';
            star.style.top = y + 'px';
            star.style.fontSize = (Math.random() * 20 + 10) + 'px';
            star.style.color = colors[Math.floor(Math.random() * colors.length)];
            star.style.pointerEvents = 'none';
            star.style.zIndex = '9999';
            star.style.textShadow = '0 0 10px currentColor';
            document.body.appendChild(star);
            
            // Animate star
            const angle = (Math.PI * 2 / particleCount) * i;
            const velocity = Math.random() * 80 + 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            star.animate([
                { 
                    transform: 'translate(0, 0) scale(1) rotate(0deg)',
                    opacity: 1 
                },
                { 
                    transform: `translate(${tx}px, ${ty}px) scale(0.5) rotate(180deg)`,
                    opacity: 0 
                }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                fill: 'forwards'
            }).onfinish = () => star.remove();
        }
    }
    
    // Add wobble effect to images on hover
    const images = document.querySelectorAll('img:not(.loader-logo)');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.animate([
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(-5deg)' },
                { transform: 'rotate(5deg)' },
                { transform: 'rotate(-3deg)' },
                { transform: 'rotate(3deg)' },
                { transform: 'rotate(0deg)' }
            ], {
                duration: 400,
                easing: 'ease-in-out'
            });
        });
    });
    
    // Add stagger animation to grid items
    const grids = document.querySelectorAll('.grid, .log-grid, .social-grid');
    grids.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.animationDelay = (index * 0.1) + 's';
            
            setTimeout(() => {
                child.classList.add('nintendo-bounce');
                child.style.opacity = '1';
            }, index * 100);
        });
    });
    
    // Konami code easter egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateKonamiMode() {
        document.body.classList.add('konami-mode');
        
        // Create celebration stars
        const interval = setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createStarParticles(x, y);
        }, 200);
        
        setTimeout(() => {
            clearInterval(interval);
            document.body.classList.remove('konami-mode');
        }, 5000);
    }
    
    // Add smooth scroll with bounce
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Add loading animation completion
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1500);
        });
    }
});

// Add CSS for Konami mode dynamically
const konamiStyle = document.createElement('style');
konamiStyle.textContent = `
    @keyframes rainbow-bg {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .konami-mode * {
        animation: rainbow-bg 2s linear infinite !important;
    }
`;
document.head.appendChild(konamiStyle);
