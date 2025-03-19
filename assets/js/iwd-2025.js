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
	const numStars = 12; // Number of stars to generate in each container

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

document.addEventListener('DOMContentLoaded', async function () {
	try {
		const response = await fetch('assets/data/iwd-2025.json');
		const data = await response.json();

		renderSpeakers(data.speakers);
		renderAmbassadors(data.ambassadors);
		renderSponsors(data.sponsors);
	} catch (error) {
		console.error('Error loading JSON:', error);
	}
});

function renderSpeakers(speakers) {
	const container = document.querySelector('.speakers-list');
	container.innerHTML = '';

	speakers.forEach((speaker) => {
		const speakerHTML = `
        <div class="speaker-card">
            <div class="speaker-frame">
                <img class="speaker-border" src="https://i.ibb.co/NdmjzHw0/bg-speakers-iwd-2025.png" alt="Speaker Border">
                <img class="speaker-photo" src="${speaker.image}" alt="${
			speaker.name
		}">
            </div>
            <h3>${speaker.name}</h3>
            <p>${speaker.role}</p>
            ${
							speaker.linkedin
								? `<a href="${speaker.linkedin}" target="_blank" class="linkedin-link">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="20">
            </a>`
								: ''
						}
        </div>
        `;
		container.innerHTML += speakerHTML;
	});
}

function renderAmbassadors(ambassadors) {
	const container = document.querySelector('.ambassadors-list');
	container.innerHTML = '';

	ambassadors.forEach((ambassador) => {
		const ambassadorHTML = `
		<div class="ambassador-card">
			<div class="ambassador-frame">
				<div class="ambassador-border"></div>
				<img class="ambassador-photo" src="${ambassador.image}" alt="${ambassador.name}">
			</div>
			<h3>${ambassador.name}</h3>
			<p>${ambassador.role}</p>
			<a href="${ambassador.linkedin}" target="_blank">
				<img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="20">
			</a>
		</div>
		`;
		container.innerHTML += ambassadorHTML;
	});
}

function renderSponsors(sponsors) {
	const container = document.querySelector('#sponsors-content');
	container.innerHTML = '';

	const plans = {
		'ada-lovelace': 'Plan Ada Lovelace',
		'grace-hopper': 'Plan Grace Hopper',
		'margaret-hamilton': 'Plan Margaret Hamilton',
	};

	Object.keys(plans).forEach((planKey) => {
		if (sponsors[planKey] && sponsors[planKey].length > 0) {
			let planHTML = `
            <div class="sponsor-category ${planKey}">
                <h3 class="sponsor-tier">${plans[planKey]}</h3>
                <div class="sponsor-logos">
            `;

			sponsors[planKey].forEach((sponsor) => {
				planHTML += `
                <div class="sponsor-item">
                    <a href="${sponsor.website}" target="_blank">
                        <img src="${sponsor.logo}" alt="${sponsor.name}">
                        <span class="sponsor-name">${sponsor.name}</span>
                    </a>
                </div>
                `;
			});

			planHTML += `</div></div>`;
			container.innerHTML += planHTML;

			if (planKey === 'ada-lovelace') {
				container.innerHTML += `<div class="sponsors-divider"></div>`;
			}
		}
	});

	container.innerHTML += `<div class="sponsors-divider"></div>`;

	if (sponsors['hedy-lamarr'] && sponsors['hedy-lamarr'].length > 0) {
		let communityHTML = `
        <div class="sponsor-category hedy-lamarr">
            <h3 class="sponsor-tier">Hedy Lamarr</h3>
            <p class="sponsor-description">Apoyo de Comunidades Sin Fines de Lucro</p>
            <div class="sponsor-logos">
        `;

		sponsors['hedy-lamarr'].forEach((community) => {
			communityHTML += `
            <div class="sponsor-item">
                <a href="${community.website}" target="_blank">
                    <img src="${community.logo}" alt="${community.name}">
                    <span class="sponsor-name">${community.name}</span>
                </a>
            </div>
            `;
		});

		communityHTML += `</div></div>`;
		container.innerHTML += communityHTML;
	}

	if (sponsors['carol-shaw'] && sponsors['carol-shaw'].length > 0) {
		let individualHTML = `
        <div class="sponsor-category carol-shaw">
            <h3 class="sponsor-tier">Carol Shaw</h3>
            <p class="sponsor-description">Apoyo Individual</p>
            <div class="sponsor-logos">
        `;

		sponsors['carol-shaw'].forEach((individual) => {
			individualHTML += `
            <div class="sponsor-item">
                <a href="${individual.website}" target="_blank">
                    <img src="${individual.logo}" alt="${individual.name}">
                    <span class="sponsor-name">${individual.name}</span>
                </a>
            </div>
            `;
		});

		individualHTML += `</div></div>`;
		container.innerHTML += individualHTML;
	}
}
