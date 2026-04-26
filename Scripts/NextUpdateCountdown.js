// Star Studios - Multi-language & Logic System

document.addEventListener('DOMContentLoaded', () => {

    /* --- 0. Ocultar Loader --- */
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader-wrapper');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500); // Pequeño retraso para que se vea el logo pulsando
        }
    });

    /* --- 1. Sistema de Idioma --- */
    const langSelectors = document.querySelectorAll('.lang-select-field');

    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
        langSelectors.forEach(sel => sel.value = lang);
    }

    langSelectors.forEach(sel => {
        sel.addEventListener('change', (e) => setLanguage(e.target.value));
    });

    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

    /* --- 2. Sistema de Tema --- */
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    const html = document.documentElement;

    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        });
    }

    themeButtons.forEach(btn => btn.addEventListener('click', toggleTheme));
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        themeButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            icon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        });
    }

    /* --- 3. Menú Móvil --- */
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
    }

    /* --- 4. Interacción del Update Log --- */
    const bakeryCard = document.querySelector('.bakery-card');
    const logDetails = document.getElementById('log-details-area');

    if (bakeryCard && logDetails) {
        bakeryCard.addEventListener('click', () => {
            logDetails.classList.toggle('active');
            // Scroll suave hacia los detalles al abrir
            if (logDetails.classList.contains('active')) {
                setTimeout(() => {
                    logDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        });
    }

    /* --- 5. Sistema de Countdown --- */
    const timerDisplay = document.getElementById('timer');
    const countdownSubtext = document.querySelector('.countdown-subtext');
    const targetDate = new Date("2026-05-26T17:57:00").getTime();

    function updateTimer() {
        if (!timerDisplay) return;

        const now = Date.now();
        const distance = targetDate - now;
        const currentLang = localStorage.getItem('language') || 'en';

        if (distance <= 0) {
            timerDisplay.innerText = translations[currentLang]["happy-update"];
            timerDisplay.classList.add('rainbow-text');
            if (countdownSubtext) {
                countdownSubtext.innerText = translations[currentLang]["update-desc"];
                countdownSubtext.style.opacity = "1";
            }
            return;
        }

        timerDisplay.classList.remove('rainbow-text');

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        const pad = (n) => n.toString().padStart(2, '0');
        timerDisplay.innerHTML = `${pad(d)}d : ${pad(h)}h : ${pad(m)}m : ${pad(s)}s`;
    }

    setInterval(updateTimer, 1000);
    updateTimer();
});
