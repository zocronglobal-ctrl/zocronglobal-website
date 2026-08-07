document.addEventListener('DOMContentLoaded', function () {
    const loadFragment = (selector, url) => {
        const container = document.querySelector(selector);
        if (!container) return Promise.resolve();
        return fetch(url, { cache: 'no-store' })
            .then(resp => {
                if (!resp.ok) throw new Error('Failed to load ' + url);
                return resp.text();
            })
            .then(html => { container.innerHTML = html; })
            .catch(err => { console.warn(err); });
    };

    // Load header and footer fragments
    Promise.all([
        loadFragment('#site-header', 'includes/header.html'),
        loadFragment('#site-footer', 'includes/footer.html')
    ]).then(() => {
        // After injecting header, mark the active nav link
        const path = location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('#site-header .nav a.nav-link');
        links.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === path);
        });
    });
});
