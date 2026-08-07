document.addEventListener('DOMContentLoaded', function () {
    if (window.AOS) {
        AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-out-cubic',
            offset: 100
        });
    }

    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
        const target = parseInt(counter.dataset.target, 10);
        const duration = 1500;
        let start = 0;
        const stepTime = Math.max(Math.floor(duration / target), 15);

        const updateCounter = () => {
            start += Math.ceil(target / (duration / stepTime));
            if (start >= target) {
                counter.textContent = target;
            } else {
                counter.textContent = start;
                window.requestAnimationFrame(updateCounter);
            }
        };

        updateCounter();
    });
});
