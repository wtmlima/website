// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));

		if (target) {
			const offset = 80;
			const targetPosition =
				target.getBoundingClientRect().top + window.scrollY - offset;

			if ('scrollBehavior' in document.documentElement.style) {
				window.scrollTo({ top: targetPosition, behavior: 'smooth' });
			} else {
				window.scrollTo(0, targetPosition);
			}
		}
	});
});

// Animation for stats when they come into view
const stats = document.querySelectorAll('.stat-number');
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				requestAnimationFrame(() => {
					entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
				});
			}
		});
	},
	{
		threshold: 0.1,
	}
);

stats.forEach((stat) => observer.observe(stat));

// Toggle menu on mobile
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
	hamburger.addEventListener('click', () => {
		navLinks.classList.toggle('active');
		hamburger.classList.toggle('open');
	});

	// Close menu when a link is clicked
	document.querySelectorAll('.nav-links a').forEach((link) => {
		link.addEventListener('click', () => {
			navLinks.classList.remove('active');
			hamburger.classList.remove('open');
		});
	});

	// Close menu when clicking outside
	document.addEventListener('click', (e) => {
		if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
			navLinks.classList.remove('active');
			hamburger.classList.remove('open');
		}
	});
}

document.addEventListener('DOMContentLoaded', function () {
	const starContainers = document.querySelectorAll('.stars-container');
	const numStars = 6; // Number of stars to generate in each container

	starContainers.forEach((container) => {
		const starColor = container.getAttribute('data-color') || '#1a5745'; // Default color if not set

		for (let i = 0; i < numStars; i++) {
			const star = document.createElement('div');
			star.classList.add('star');
			star.textContent = '✱'; // Or replace with an image

			// Generate random positions
			const posX = Math.random() * 100; // % within section
			const posY = Math.random() * 100; // % within section
			const rotation = Math.random() * 360; // Random rotation

			// Apply styles dynamically
			star.style.left = `${posX}%`;
			star.style.top = `${posY}%`;
			star.style.transform = `rotate(${rotation}deg)`;
			star.style.color = starColor; // Assign color dynamically

			// Append to the current container
			container.appendChild(star);
		}
	});
});
