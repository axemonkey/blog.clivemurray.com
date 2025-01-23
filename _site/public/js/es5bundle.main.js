(function () {
	'use strict';

	const lapBanner = {
	  storageKey: 'loveAndPainkillers-banner-config',
	  numberOfDaysToHideBanner: 30,
	  init: () => {
	    // if not cookie
	    if (lapBanner.cookieCheck()) {
	      lapBanner.createStyles();
	      lapBanner.showBanner();
	    }
	  },
	  cookieCheck: () => {
	    const ls = localStorage.getItem(lapBanner.storageKey);
	    const lsObj = JSON.parse(ls);
	    if (lsObj && lsObj.cookieDismissed && lapBanner.isCookieStillGood(lsObj.cookieDismissed)) {
	      console.log(`LAP Banner cookie found. Banner was dismissed within the previous ${lapBanner.numberOfDaysToHideBanner} days. Do not show banner.`);
	      return false;
	    }
	    return true;
	  },
	  isCookieStillGood: cookieDismissed => {
	    const now = Date.now(); // ms since epoch to now
	    const since = now - cookieDismissed;
	    const daysToHideBannerInMs = 1000 * 60 * 60 * 24 * lapBanner.numberOfDaysToHideBanner;
	    if (since < daysToHideBannerInMs) {
	      return true;
	    }
	    return false;
	  },
	  createStyles: () => {
	    const lapStyle = document.createElement('style');
	    const styleStr = lapBanner.assembleStyles();
	    lapStyle.innerHTML = styleStr;
	    document.head.append(lapStyle);
	  },
	  showBanner: () => {
	    const lapBannerElement = document.createElement('div');
	    const inner = lapBanner.assembleBannerHTML();
	    const bannerCloser = lapBanner.getBannerCloser();
	    lapBannerElement.classList.add('c-lap-banner');
	    lapBannerElement.append(inner);
	    lapBannerElement.append(bannerCloser);
	    document.body.append(lapBannerElement);
	    lapBanner.setupCloseEvent(bannerCloser);
	  },
	  assembleStyles: () => {
	    let str = '';
	    str += '.c-lap-banner {z-index: 9999; overflow: hidden; width: 100%;position: fixed;left: 0;bottom: 0;background: rgba(0, 0, 0, 90%); padding-top: 40px; @media (min-width: 600px) {padding-top: 0;} }';
	    str += '.c-lap-banner * { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important; font-size: 22px !important; }';
	    str += '.c-lap-banner strong {font-weight: bold;}';
	    str += '.c-lap-banner p {color: #fff; margin-bottom: 1em;line-height: normal !important;}';
	    str += '.c-lap-banner-inner {max-width: 800px; margin: auto; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; align-items: center; gap: 20px;}';
	    str += '.c-lap-banner__copy {padding: 10px 0; /*background: rgba(255, 0, 0, 50%);*/}';
	    str += '.c-lap-banner-inner img {display: block; aspect-ratio: 1 / 1; width: 150px; height: 150px; flex-shrink: 0; overflow: hidden;}';
	    str += '.c-lap-banner__headline {padding: 0 10px; letter-spacing: 1px; text-shadow: 0 0 4px rgba(92, 219, 255, 80%); @media (min-width: 600px) {padding: 0;} }';
	    str += '.c-lap-banner__link {text-align: center;}';
	    str += '.c-lap-banner__link a {text-decoration: none; color: #000; font-style: normal; background-color: #5cdbff; border-radius: 100px; display: inline-block; padding: 7px 15px 5px; font-weight: bold; box-shadow: 0 0 4px rgba(255, 255, 255, 80%);}';
	    str += '.c-lap-banner__link a:hover {background: #fff;}';
	    str += '.c-lap-banner button {opacity: 1 !important; letter-spacing: normal !important;}';
	    str += '.c-lap-banner-closer {position: absolute;right: 5px;top: 5px; border: 0px solid transparent; border-radius: 100px;padding: 0 8px 2px; background: #5cdbff; color: #000; cursor: pointer;}';
	    str += '.c-lap-banner-closer:hover {background: #fff;}';
	    str += '.c-lap-banner-fadeout { animation: lpb-fade 1s forwards; }';
	    str += '@keyframes lpb-fade { 0% {opacity: 1; height: 150px; } 100% {opacity: 0; height: 0;} }';
	    return str;
	  },
	  assembleBannerHTML: () => {
	    const bannerInner = document.createElement('div');
	    bannerInner.classList.add('c-lap-banner-inner');
	    let str = '';
	    str += '<img src="https://loveandpainkillers.com/public/images/cover/cover-150.jpg" alt="Cover image for the album &ldquo;Love and Painkillers&rdquo; by Clive Murray">';
	    str += '<div class="c-lap-banner__copy">';
	    str += '<p class="c-lap-banner__headline"><strong>LOVE AND PAINKILLERS</strong> – by Clive Murray</p>';
	    str += '<p class="c-lap-banner__link"><a href="https://loveandpainkillers.com">GET IT NOW</a></p>';
	    str += '</div>';
	    bannerInner.innerHTML = str;
	    return bannerInner;
	  },
	  getBannerCloser: () => {
	    const bannerCloser = document.createElement('button');
	    bannerCloser.classList.add('c-lap-banner-closer');
	    bannerCloser.innerHTML = '&times;';
	    return bannerCloser;
	  },
	  setupCloseEvent: closeButton => {
	    closeButton.addEventListener('click', event => {
	      event.preventDefault();
	      document.querySelector('.c-lap-banner').classList.add('c-lap-banner-fadeout');

	      // set cookie
	      const storeObj = {
	        cookieDismissed: Date.now()
	      };
	      localStorage.setItem(lapBanner.storageKey, JSON.stringify(storeObj));
	    });
	  }
	};

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
	    // initStickyNav(window, document);
	    // Casper.stickyNavTitle({
	    // 	navSelector: '.site-nav-main',
	    // 	titleSelector: '.post-full-title',
	    // 	activeClass: 'nav-post-title-active'
	    // });
	  }
	  lapBanner.init();
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

})();
