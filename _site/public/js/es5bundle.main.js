(function () {
	'use strict';

	/* eslint no-mixed-operators: 0 */
	/* eslint no-unused-expressions: 0 */
	/* eslint no-sequences: 0 */
	/* eslint no-unused-vars: 0 */

	/*

	All the hard stuff here was inspired (i.e. copied) from a
	CodePen by Cooper Goeke here:
	https://codepen.io/coopergoeke/pen/wvaYMbJ

	Thanks for that Cooper!

	*/

	const cc = {}; // confetti config
	cc.canvases = [];

	// colors, back side is darker for confetti flipping
	const colors = [{
	  front: '#7b5cff',
	  back: '#6245e0'
	},
	// Purple
	{
	  front: '#b3c7ff',
	  back: '#8fa5e5'
	},
	// Light Blue
	{
	  front: '#5c86ff',
	  back: '#345dd1'
	},
	// Darker Blue
	{
	  front: '#aa0000',
	  back: '#330000'
	},
	// Red
	{
	  front: '#dddd00',
	  back: '#666600'
	},
	// Yellow
	{
	  front: '#ffffff',
	  back: '#cccccc'
	} // White
	];

	// helper function to pick a random number within a range
	const randomRange = (min, max) => Math.random() * (max - min) + min;

	// helper function to get initial velocities for confetti
	// this weighted spread helps the confetti look more realistic
	const initConfettoVelocity = (xRange, yRange) => {
	  const x = randomRange(xRange[0], xRange[1]);
	  const range = yRange[1] - yRange[0] + 1;
	  let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range);
	  if (y >= yRange[1] - 1) {
	    // Occasional confetto goes higher than the max
	    y += Math.random() < 0.25 ? randomRange(1, 3) : 0;
	  }
	  return {
	    x: x,
	    y: -y
	  };
	};

	// Confetto Class
	function Confetto() {
	  this.randomModifier = randomRange(0, 99);
	  this.color = colors[Math.floor(randomRange(0, colors.length))];
	  this.dimensions = {
	    x: randomRange(5, 9),
	    y: randomRange(8, 15)
	  };
	  this.position = {
	    x: randomRange(cc.canvasSize.width / 2 - cc.canvasSize.width / 4, cc.canvasSize.width / 2 + cc.canvasSize.width / 4),
	    y: randomRange(cc.canvasSize.height / 3, cc.canvasSize.height / 2)
	  };
	  this.rotation = randomRange(0, 2 * Math.PI);
	  this.scale = {
	    x: 1,
	    y: 1
	  };
	  this.velocity = initConfettoVelocity([-9, 9], [6, 11]);
	}
	Confetto.prototype.update = function () {
	  // apply forces to velocity
	  this.velocity.x -= this.velocity.x * cc.dragConfetti;
	  this.velocity.y = Math.min(this.velocity.y + cc.gravityConfetti, cc.terminalVelocity);
	  this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

	  // set position
	  this.position.x += this.velocity.x;
	  this.position.y += this.velocity.y;

	  // spin confetto by scaling y and set the color, .09 just slows cosine frequency
	  this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
	};

	// Sequin Class
	function Sequin() {
	  const wCol = colors[Math.floor(randomRange(0, colors.length))];
	  this.color = wCol.back, this.radius = randomRange(1, 2), this.position = {
	    x: randomRange(cc.canvasSize.width / 2 - cc.canvasSize.width / 4, cc.canvasSize.width / 2 + cc.canvasSize.width / 4),
	    y: randomRange(cc.canvasSize.height / 3, cc.canvasSize.height / 2)
	  }, this.velocity = {
	    x: randomRange(-6, 6),
	    y: randomRange(-8, -12)
	  };
	}
	Sequin.prototype.update = function () {
	  // apply forces to velocity
	  this.velocity.x -= this.velocity.x * cc.dragSequins;
	  this.velocity.y += cc.gravitySequins;

	  // set position
	  this.position.x += this.velocity.x;
	  this.position.y += this.velocity.y;
	};
	const tearDown = canvasIndex => {
	  console.log(`finished with canvas ${canvasIndex}`);
	  document.querySelector(`#canvas${canvasIndex}`).remove();
	};

	// add elements to arrays to be drawn
	const initBurst = canvasIndex => {
	  for (let i = 0; i < cc.confettiCount; i++) {
	    cc.canvases[canvasIndex].confetti.push(new Confetto());
	  }
	  for (let i = 0; i < cc.sequinCount; i++) {
	    cc.canvases[canvasIndex].sequins.push(new Sequin());
	  }
	  render(canvasIndex);
	};

	// draws the elements on the canvas
	const render = canvasIndex => {
	  const thisContext = cc.canvases[canvasIndex].context;
	  const thisCanvas = cc.canvases[canvasIndex].canvas;
	  const thisConfetti = cc.canvases[canvasIndex].confetti;
	  const thisSequins = cc.canvases[canvasIndex].sequins;

	  // console.log(`render. confetti.length=${confetti.length}, sequins.length=${sequins.length}`);
	  thisContext.clearRect(0, 0, thisCanvas.width, thisCanvas.height);
	  for (const [index, confetto] of thisConfetti.entries()) {
	    const width = confetto.dimensions.x * confetto.scale.x;
	    const height = confetto.dimensions.y * confetto.scale.y;

	    // console.log(`confetto.position.x: ${confetto.position.x}, confetto.position.y: ${confetto.position.y}`);

	    // move canvas to position and rotate
	    thisContext.translate(confetto.position.x, confetto.position.y);
	    thisContext.rotate(confetto.rotation);

	    // update confetto "physics" values
	    confetto.update();

	    // get front or back fill color
	    thisContext.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

	    // draw confetto
	    thisContext.fillRect(-width / 2, -height / 2, width, height);

	    // reset transform matrix
	    thisContext.setTransform(1, 0, 0, 1, 0, 0);

	    // clear rectangle where button cuts off
	    // if (confetto.velocity.y < 0) {
	    // 	thisContext.clearRect(thisCanvas.width / 2 - cc.winner.offsetWidth / 2, thisCanvas.height / 2 + cc.winner.offsetHeight / 2, cc.winner.offsetWidth, cc.winner.offsetHeight);
	    // }
	  }
	  for (const [index, sequin] of thisSequins.entries()) {
	    // move canvas to position
	    thisContext.translate(sequin.position.x, sequin.position.y);

	    // update sequin "physics" values
	    sequin.update();

	    // set the color
	    thisContext.fillStyle = sequin.color;

	    // draw sequin
	    thisContext.beginPath();
	    thisContext.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
	    thisContext.fill();

	    // reset transform matrix
	    thisContext.setTransform(1, 0, 0, 1, 0, 0);

	    // clear rectangle where button cuts off
	    // if (sequin.velocity.y < 0) {
	    // 	thisContext.clearRect(thisCanvas.width / 2 - cc.winner.offsetWidth / 2, thisCanvas.height / 2 + cc.winner.offsetHeight / 2, cc.winner.offsetWidth, cc.winner.offsetHeight);
	    // }
	  }

	  // remove confetti and sequins that fall off the screen
	  // must be done in seperate loops to avoid noticeable flickering
	  for (const [index, confetto] of thisConfetti.entries()) {
	    if (confetto.position.y >= thisCanvas.height) {
	      thisConfetti.splice(index, 1);
	    }
	  }
	  for (const [index, sequin] of thisSequins.entries()) {
	    if (sequin.position.y >= thisCanvas.height) {
	      thisSequins.splice(index, 1);
	    }
	  }

	  // console.log(`conf: ${cc.confetti.length}, seq: ${cc.sequins.length}`);

	  if (thisConfetti.length > 0 || thisSequins.length > 0) {
	    window.requestAnimationFrame(() => {
	      render(canvasIndex);
	    });
	  } else {
	    console.log('it is done');
	    tearDown(canvasIndex);
	  }
	};
	const confettiSetti = index => {
	  // amount to add on each button press
	  cc.confettiCount = 150;
	  cc.sequinCount = 100;

	  // "physics" variables
	  cc.gravityConfetti = 0.3;
	  cc.gravitySequins = 0.55;
	  cc.dragConfetti = 0.075;
	  cc.dragSequins = 0.02;
	  cc.terminalVelocity = 3;

	  // init other global elements
	  cc.disabled = false;
	  const canvasElement = document.createElement('canvas');
	  canvasElement.id = `canvas${index}`;
	  canvasElement.classList.add('confettiCanvas');
	  document.body.append(canvasElement);
	  const thisCanvas = document.querySelector(`#canvas${index}`);
	  const thisContext = thisCanvas.getContext('2d');
	  thisCanvas.width = window.innerWidth;
	  thisCanvas.height = window.innerHeight;
	  cc.canvasSize = {
	    width: window.innerWidth,
	    height: window.innerHeight
	  };
	  cc.canvases.push({
	    canvas: thisCanvas,
	    context: thisContext,
	    confetti: [],
	    sequins: []
	  });
	};

	// import {lapBanner} from './modules/lap-banner.js';
	const checkPulse = () => {
	  console.log('it loads...');
	  document.body.classList.add('js');
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
	const mentionEffect = element => {
	  element.classList.add('mention-visible');
	};
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

	  // AotY winners
	  const aotyWinners = document.querySelectorAll('.aoty-winner');
	  if (aotyWinners.length > 0) {
	    const opt = {
	      threshold: 1
	    };
	    aotyWinners.forEach((winnerNode, index) => {
	      console.log(`winner found, init confetti canvas ${index}`);
	      confettiSetti(index);
	      const callback = (entries, observer) => {
	        if (entries[0].isIntersecting) {
	          console.log(`AotY winner ${index} visible`);
	          initBurst(index);
	          observer.unobserve(entries[0].target);
	        }
	      };
	      const observer = new IntersectionObserver(callback, opt);
	      observer.observe(winnerNode);
	    });
	  }

	  // AotY mentions
	  const aotyMentions = document.querySelectorAll('.aoty-mention');
	  console.log(`aotyMentions.length: ${aotyMentions.length}`);
	  if (aotyMentions.length > 0) {
	    const opt = {
	      threshold: 1
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

})();
