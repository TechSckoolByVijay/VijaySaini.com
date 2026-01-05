// Theme Switcher - Light/Dark Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeLink = document.getElementById('theme-link');
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
    applyTheme(savedTheme);
    
    // Listen for theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('selectedTheme', newTheme);
        });
    }
    
    function applyTheme(theme) {
        // Update data-theme attribute on html element
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme CSS link
        if (themeLink) {
            themeLink.href = `assets/css/themes/${theme}.css`;
        }
        
        // Update icon
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    }
});
