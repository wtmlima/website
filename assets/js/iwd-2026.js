// ================================
// IWD 2026 - Break the Pattern
// ================================

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
	const hamburger = document.querySelector('.hamburger-menu');
	const navLinks = document.querySelector('.nav-links');

	if (hamburger) {
		hamburger.addEventListener('click', () => {
			navLinks.classList.toggle('active');
		});
	}

	// Smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', (e) => {
			e.preventDefault();
			const target = document.querySelector(anchor.getAttribute('href'));
			if (target) {
				navLinks.classList.remove('active');
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});

	// Generate pixel pattern blocks
	generatePixelPattern();

	// Intersection Observer for fade-in animations
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		},
		{ threshold: 0.1 }
	);

	document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

	// Animated counters
	const counterObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateCounter(entry.target);
					counterObserver.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.5 }
	);

	document.querySelectorAll('.number[data-target]').forEach((el) => {
		counterObserver.observe(el);
	});

	// Load data
	loadData();
});

// Pixel grid pattern generator - matches IWD 2026 "Break the Pattern" branding
function generatePixelPattern() {
	const containers = document.querySelectorAll('.pixel-pattern');

	containers.forEach((container) => {
		const style = container.dataset.style || 'grid';

		if (style === 'grid') {
			generateGrid(container);
		} else {
			generateCornerBlocks(container);
		}
	});
}

// Grid of squares like the official branding background
function generateGrid(container) {
	const cellSize = 40;
	const gap = 6;
	const rect = container.parentElement.getBoundingClientRect();
	const cols = Math.ceil(rect.width / (cellSize + gap));
	const rows = Math.ceil(rect.height / (cellSize + gap));

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			// Only render ~40% of cells for organic look
			if (Math.random() > 0.4) continue;

			const block = document.createElement('div');
			block.className = 'pixel-block';
			block.style.width = cellSize + 'px';
			block.style.height = cellSize + 'px';
			block.style.left = c * (cellSize + gap) + 'px';
			block.style.top = r * (cellSize + gap) + 'px';

			// Vary opacity: mostly subtle dark-blue squares, few brighter
			const rand = Math.random();
			if (rand < 0.85) {
				// Dark blue squares (like the background pattern)
				const opacity = Math.random() * 0.25 + 0.05;
				block.style.backgroundColor = '#021d6e';
				block.style.opacity = opacity;
			} else {
				// Occasional green accent square
				block.style.backgroundColor = '#1CE9B6';
				block.style.opacity = Math.random() * 0.15 + 0.05;
			}

			block.style.borderRadius = '4px';
			container.appendChild(block);
		}
	}
}

// Corner accent blocks (green squares grouped in corners)
function generateCornerBlocks(container) {
	const positions = JSON.parse(container.dataset.blocks || '[]');
	positions.forEach((pos) => {
		const block = document.createElement('div');
		block.className = 'pixel-block';
		block.style.width = (pos.size || 30) + 'px';
		block.style.height = (pos.size || 30) + 'px';
		block.style.left = pos.x;
		block.style.top = pos.y;
		block.style.backgroundColor = pos.color || '#1CE9B6';
		block.style.opacity = pos.opacity || 0.8;
		block.style.borderRadius = '4px';
		container.appendChild(block);
	});
}

// Animate number from 0 to target
function animateCounter(el) {
	const target = parseInt(el.dataset.target);
	const duration = 1500;
	const start = performance.now();

	function update(now) {
		const elapsed = now - start;
		const progress = Math.min(elapsed / duration, 1);
		const eased = 1 - Math.pow(1 - progress, 3);
		el.textContent = Math.round(eased * target);

		if (progress < 1) {
			requestAnimationFrame(update);
		}
	}

	requestAnimationFrame(update);
}

// Load JSON data and render sections
async function loadData() {
	try {
		const response = await fetch('./assets/data/iwd-2026.json');
		const data = await response.json();

		renderSpeakers(data.speakers);
		renderAmbassadors(data.ambassadors);
		renderSponsors(data.sponsors);
	} catch (error) {
		console.warn(
			'Fetch failed (likely file:// protocol), using fallback:',
			error
		);
		// Fallback for local file:// testing
		renderSpeakers([]);
		renderAmbassadors([]);
		renderSponsors({
			'ada-lovelace': [],
			'grace-hopper': [],
			'margaret-hamilton': [],
			'hedy-lamarr': [
				{
					name: 'Perú .NET Development',
					image: './assets/images/communities/perunetdev.png',
					url: 'https://www.instagram.com/perunetdev',
					showName: true,
				},
				{
					name: 'GDG Cloud Lima',
					image: './assets/images/communities/gdg-cloud-lima.png',
					url: 'https://gdg.community.dev/gdg-cloud-lima/',
					showName: true,
				},
			],
			'carol-shaw': [],
		});
	}
}

function renderSpeakers(speakers) {
	const container = document.querySelector('.speakers-list');
	if (!container) return;

	if (!speakers || speakers.length === 0) {
		return;
	}

	container.innerHTML = speakers
		.map(
			(speaker) => `
		<div class="speaker-card fade-in">
			<div class="speaker-frame">
				<img class="speaker-photo" src="${speaker.image}" alt="${speaker.name}" />
			</div>
			<h3>${speaker.name}</h3>
			<p>${speaker.role}</p>
			${speaker.linkedin ? `<a href="${speaker.linkedin}" target="_blank" class="speaker-linkedin">LinkedIn</a>` : ''}
		</div>
	`
		)
		.join('');
}

function renderAmbassadors(ambassadors) {
	const container = document.querySelector('.ambassadors-list');
	if (!container) return;

	if (!ambassadors || ambassadors.length === 0) {
		container.innerHTML =
			'<p class="ambassadors-coming-soon">Muy pronto conocerás al equipo organizador</p>';
		return;
	}

	container.innerHTML = ambassadors
		.map(
			(amb) => `
		<div class="ambassador-card fade-in">
			<div class="ambassador-frame">
				<img class="ambassador-photo" src="${amb.image}" alt="${amb.name}" />
			</div>
			<h3>${amb.name}</h3>
			<p>${amb.role}</p>
		</div>
	`
		)
		.join('');
}

function renderSponsors(sponsors) {
	const container = document.getElementById('sponsors-content');
	if (!container) return;

	const tierConfig = {
		'ada-lovelace': { name: 'Plan Ada Lovelace', description: '' },
		'grace-hopper': { name: 'Plan Grace Hopper', description: '' },
		'margaret-hamilton': { name: 'Plan Margaret Hamilton', description: '' },
		'hedy-lamarr': {
			name: 'Hedy Lamarr',
			description: 'Apoyo de Comunidades Sin Fines de Lucro',
		},
		'carol-shaw': { name: 'Carol Shaw', description: 'Apoyo Individual' },
	};

	const hasSponsor = Object.values(sponsors).some(
		(tier) => tier && tier.length > 0
	);

	if (!hasSponsor) {
		container.innerHTML =
			'<p class="sponsors-coming-soon">Convocatoria de sponsors abierta. Escr\u00edbenos para ser parte.</p>';
		return;
	}

	let html = '';
	let renderedCount = 0;
	for (const [tierKey, tierSponsors] of Object.entries(sponsors)) {
		if (!tierSponsors || tierSponsors.length === 0) continue;

		if (renderedCount > 0) {
			html += '<div class="sponsors-divider"></div>';
		}

		const config = tierConfig[tierKey] || { name: tierKey, description: '' };

		html += `
		<div class="sponsor-category ${tierKey}">
			<h3 class="sponsor-tier">${config.name}</h3>
			${config.description ? `<p class="sponsor-description">${config.description}</p>` : ''}
			<div class="sponsor-logos">
				${tierSponsors
					.map(
						(s) => `
					<div class="sponsor-item">
						<a href="${s.url || '#'}" target="_blank">
							<img src="${s.image}" alt="${s.name}" />
							${s.showName ? `<span class="sponsor-name">${s.name}</span>` : ''}
						</a>
					</div>
				`
					)
					.join('')}
			</div>
		</div>
		`;
		renderedCount++;
	}
	container.innerHTML = html;
}
