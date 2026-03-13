import {
	confettiSetti,
	// render,
	initBurst,
} from './modules/confetti.js';

const checkPulse = () => {
	console.log('it loads...');
	document.body.classList.add('js');
};

window.addEventListener('load', checkPulse);

// from casper theme

// sticky nav
/*
const initStickyNav = function (s, a) {
	console.log('init sticky nav');
	(s.Casper || (s.Casper = {}),
		(s.Casper.stickyNavTitle = function (e) {
			var t = a.querySelector(e.navSelector);
			var index = a.querySelector(e.titleSelector);
			var r = s.scrollY;
			var n = !1;

			function o() {
				(index.getBoundingClientRect().top +
					s.scrollY +
					(index.offsetHeight + 35) <=
				r
					? t.classList.add(e.activeClass)
					: t.classList.remove(e.activeClass),
					(n = !1));
			}
			(s.addEventListener(
				'scroll',
				function () {
					((r = s.scrollY),
						(function () {
							n || requestAnimationFrame(o);
							n = !0;
						})());
				},
				{
					passive: !0,
				},
			),
				o());
		}));
};
*/

const initHomepageNav = function () {
	var nav = document.querySelector('.site-nav-main .site-nav');
	var feed = document.querySelector('.post-feed');

	var lastScrollY = window.scrollY;
	// var lastWindowHeight = window.innerHeight;
	// var lastDocumentHeight = getDocumentHeight();
	var ticking = false;

	// function getDocumentHeight() {
	// 	var cs = getComputedStyle(document.querySelector('body'));
	// 	var csh = cs.height;
	// 	return csh;
	// }

	function onScroll() {
		lastScrollY = window.scrollY;
		requestTick();
	}

	function onResize() {
		// lastWindowHeight = window.innerHeight;
		// lastDocumentHeight = getDocumentHeight();
		requestTick();
	}

	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(update);
		}
		ticking = true;
	}

	function update() {
		var trigger = feed.getBoundingClientRect().top + window.scrollY;
		// var progressMax = lastDocumentHeight - lastWindowHeight;

		// show/hide nav
		if (lastScrollY >= trigger - 20) {
			nav.classList.add('fixed-nav-active');
		} else {
			nav.classList.remove('fixed-nav-active');
		}

		ticking = false;
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onResize, false);

	update();
};

window.addEventListener('load', function () {
	const bodyElement = document.querySelector('body');
	if (bodyElement.classList.contains('home-template')) {
		initHomepageNav();
	} else if (bodyElement.classList.contains('post-template')) {
		console.log('about to init sticky nav');

		// commented this out, as decided not to use sticky nav.
		// it should just work again by uncommenting the initStickyNav() call

		// initStickyNav(window, document);
		// Casper.stickyNavTitle({
		// 	navSelector: '.site-nav-main',
		// 	titleSelector: '.post-full-title',
		// 	activeClass: 'nav-post-title-active'
		// });
	}

	// lapBanner.init();
});

const mentionEffect = (element) => {
	element.classList.add('mention-visible');
};

const winnerEffect = (element, index) => {
	element.classList.add('winner-visible');
	console.log(`AotY winner ${index} visible`);
	initBurst(index);
};

const getStrapline = () => {
	const straps = [];
	const theDate = new Date();
	const month = theDate.getMonth();

	straps.push(
		'I play guitar, you know',
		'Now in colours!',
		'display: bloke;',
		'It’s good for you',
		'HACKA LÖKEN!',
		'Always running',
		'Web stuff since 1997',
		'Disinformation superlayby',
		'At the forefront of the retreat',
		'Humour may have settled during transit',
		'More harmonies',
		'Do you have any grey poupon?',
		'He’s beginning to believe',
		'It’s not the years, it’s the mileage',
		'Be excellent to each other',
		'Alsø wik',
		'Alsø alsø wik',
		'I know where Bruce Lee lives',
		'It’s all relative',
		'JEM777LNG #407',
		'Never put a sock in a toaster',
		'Never put jam on a magnet',
		'Thou shalt not question Stephen Fry',
		'Cough drop and roll',
		'R Tape loading error, 0:1',
	);

	if (month === 5) {
		// it's june
		straps.push('HAPPY PRIDE', 'He/Him for now at least');
	}

	const rStrap = straps[Math.floor(Math.random() * straps.length)];
	return rStrap;
};

const initStrapline = () => {
	const strapSelector = document.querySelector('.site-description');
	const isHomepage = document.body.classList.contains('home-template');

	if (strapSelector && isHomepage) {
		strapSelector.innerHTML = getStrapline();
	}
};

window.addEventListener('load', initStrapline);

const fitVids = () => {
	const frames = document.querySelectorAll('iframe[src*="youtube.com"]');

	let currentVid = 0;

	for (const frame of frames) {
		const frameWidth = frame.width;
		const frameHeight = frame.height;
		let vidCaption;

		if (
			frame.nextElementSibling &&
			frame.nextElementSibling.tagName.toLowerCase() === 'figcaption'
		) {
			vidCaption = frame.nextElementSibling;
		}

		const vidFigure = document.createElement('figure');
		vidFigure.classList.add('kg-card', 'kg-embed-card');
		const vidDiv = document.createElement('div');
		vidDiv.classList.add('fluid-width-video-wrapper');
		vidDiv.style.paddingTop = `${(frameHeight / frameWidth) * 100}%`;
		vidFigure.append(vidDiv);
		frame.before(vidFigure);
		vidDiv.append(frame);
		if (vidCaption) {
			vidFigure.append(vidCaption);
		}
		frame.setAttribute('name', `fitvid${currentVid}`);

		currentVid++;
	}
};

window.addEventListener('load', fitVids);

const initImageEffects = () => {
	// AotY winners
	const aotyWinners = document.querySelectorAll('.aoty-winner');
	if (aotyWinners.length > 0) {
		const opt = {
			threshold: 1,
		};
		for (const [index, winnerNode] of aotyWinners.entries()) {
			// console.log(`winner found, init confetti canvas ${index}`);
			confettiSetti(index);
			const callback = (entries, observer) => {
				if (entries[0].isIntersecting) {
					winnerEffect(entries[0].target, index);
					observer.unobserve(entries[0].target);
				}
			};
			const observer = new IntersectionObserver(callback, opt);
			observer.observe(winnerNode);
		}
	}

	// AotY mentions
	const aotyMentions = document.querySelectorAll('.aoty-mention');
	// console.log(`aotyMentions.length: ${aotyMentions.length}`);
	if (aotyMentions.length > 0) {
		const opt = {
			threshold: 1,
		};
		const callback = (entries, observer) => {
			// console.log(`mentions callback`);
			if (entries[0].isIntersecting) {
				mentionEffect(entries[0].target);
				observer.unobserve(entries[0].target);
			}
		};
		for (const mentionNode of aotyMentions) {
			const observer = new IntersectionObserver(callback, opt);
			observer.observe(mentionNode);
		}
	}
};

window.addEventListener('load', initImageEffects);
