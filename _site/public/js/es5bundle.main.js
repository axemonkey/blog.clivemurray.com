(function () {
	'use strict';

	// import {lapBanner} from './modules/lap-banner.js';

	const checkPulse = () => {
	  console.log('it loads...');
	};
	window.addEventListener('load', checkPulse);
	const initHomepageNav = function () {
	  var nav = document.querySelector('.site-nav-main .site-nav');
	  var feed = document.querySelector('.post-feed');
	  var lastScrollY = window.scrollY;
	  getDocumentHeight();
	  var ticking = false;
	  function getDocumentHeight() {
	    var cs = getComputedStyle(document.querySelector('body'));
	    var csh = cs.height;
	    console.log(csh);
	    return csh;
	  }
	  function onScroll() {
	    lastScrollY = window.scrollY;
	    requestTick();
	  }
	  function onResize() {
	    getDocumentHeight();
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

	    // show/hide nav
	    if (lastScrollY >= trigger - 20) {
	      nav.classList.add('fixed-nav-active');
	    } else {
	      nav.classList.remove('fixed-nav-active');
	    }
	    ticking = false;
	  }
	  window.addEventListener('scroll', onScroll, {
	    passive: true
	  });
	  window.addEventListener('resize', onResize, false);
	  update();
	};
	window.addEventListener('load', function () {
	  const bodyEl = document.querySelector('body');
	  if (bodyEl.classList.contains('home-template')) {
	    initHomepageNav();
	  } else if (bodyEl.classList.contains('post-template')) {
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
	const getStrapline = () => {
	  const straps = [];
	  const theDate = new Date();
	  const month = theDate.getMonth();
	  straps.push('I play guitar, you know');
	  straps.push('Now in colours!');
	  straps.push('display: bloke;');
	  straps.push('It’s good for you');
	  straps.push('HACKA LÖKEN!');
	  straps.push('Always running');
	  straps.push('Web stuff since 1997');
	  straps.push('Disinformation superlayby');
	  straps.push('At the forefront of the retreat');
	  straps.push('Humour may have settled during transit');
	  straps.push('More harmonies');
	  straps.push('Do you have any grey poupon?');
	  straps.push('He’s beginning to believe');
	  straps.push('It’s not the years, it’s the mileage');
	  straps.push('Be excellent to each other');
	  straps.push('Alsø wik');
	  straps.push('Alsø alsø wik');
	  straps.push('I know where Bruce Lee lives');
	  straps.push('It’s all relative');
	  straps.push('JEM777LNG #407');
	  straps.push('Never put a sock in a toaster');
	  straps.push('Never put jam on a magnet');
	  straps.push('Thou shalt not question Stephen Fry');
	  straps.push('Cough drop and roll');
	  straps.push('R Tape loading error, 0:1');
	  if (month === 5) {
	    // it's june
	    straps.push('HAPPY PRIDE');
	    straps.push('He/Him for now at least');
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
	    const frameParent = frame.parentNode;
	    const frameWidth = frame.width;
	    const frameHeight = frame.height;
	    let vidCaption;
	    if (frame.nextElementSibling && frame.nextElementSibling.tagName.toLowerCase() === 'figcaption') {
	      vidCaption = frame.nextElementSibling;
	    }
	    const vidFigure = document.createElement('figure');
	    vidFigure.classList.add('kg-card');
	    vidFigure.classList.add('kg-embed-card');
	    const vidDiv = document.createElement('div');
	    vidDiv.classList.add('fluid-width-video-wrapper');
	    vidDiv.style.paddingTop = `${frameHeight / frameWidth * 100}%`;
	    vidFigure.append(vidDiv);
	    frameParent.insertBefore(vidFigure, frame);
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
	  console.log(`initImageEffects`);
	  const target = document.querySelector('.aoty');
	  const opt = {
	    threshold: 1
	  };
	  const callback = (entries, observer) => {
	    if (entries[0].isIntersecting) {
	      console.log('AotY image visible');
	      observer.unobserve(entries[0].target);
	    }
	  };
	  const observer = new IntersectionObserver(callback, opt);
	  observer.observe(target);
	};
	window.addEventListener('load', initImageEffects);

})();
