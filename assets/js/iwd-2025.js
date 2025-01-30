// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) {
        navLinks.classList.remove('active');
    }
});

navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
});

function updateCountdown() {
    const eventDate = new Date('2025-03-22T09:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(
        2,
        '0'
    );
    document.getElementById('hours').textContent = String(hours).padStart(
        2,
        '0'
    );
    document.getElementById('minutes').textContent = String(
        minutes
    ).padStart(2, '0');
    document.getElementById('seconds').textContent = String(
        seconds
    ).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);

updateCountdown();