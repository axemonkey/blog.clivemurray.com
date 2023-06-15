(function () {
  'use strict';

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var checkPulse = function checkPulse() {
    console.log('it loads...');
  };
  window.addEventListener('load', checkPulse);

  // from casper theme

  // sticky nav
  var initStickyNav = function initStickyNav(s, a) {
    console.log('init sticky nav');
    s.Casper || (s.Casper = {}), s.Casper.stickyNavTitle = function (e) {
      var t = a.querySelector(e.navSelector),
        i = a.querySelector(e.titleSelector),
        r = s.scrollY,
        n = !1;
      function o() {
        i.getBoundingClientRect().top + s.scrollY + (i.offsetHeight + 35) <= r ? t.classList.add(e.activeClass) : t.classList.remove(e.activeClass), n = !1;
      }
      s.addEventListener("scroll", function () {
        r = s.scrollY, function () {
          n || requestAnimationFrame(o);
          n = !0;
        }();
      }, {
        passive: !0
      }), o();
    };
  };
  var initHomepageNav = function initHomepageNav() {
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
    var bodyEl = document.querySelector('body');
    if (bodyEl.classList.contains('home-template')) {
      initHomepageNav();
    } else if (bodyEl.classList.contains('post-template')) {
      initStickyNav(window, document);
      Casper.stickyNavTitle({
        navSelector: '.site-nav-main',
        titleSelector: '.post-full-title',
        activeClass: 'nav-post-title-active'
      });
    }
  });
  var getStrapline = function getStrapline() {
    var straps = [];
    var theDate = new Date();
    var month = theDate.getMonth();
    straps.push('I play guitar, you know');
    straps.push('Now in colours!');
    straps.push('display: bloke;');
    straps.push('It’s good for you');
    straps.push('HACKA LÖKEN!');
    straps.push('Always running');
    straps.push('Web stuff since 1997');
    straps.push('Disinformation superlayby');
    straps.push('At the forefront of the retreat');
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
    if (month === 5) {
      // it's june
      straps.push('HAPPY PRIDE');
      straps.push('He/Him for now at least');
    }
    var rStrap = straps[Math.floor(Math.random() * straps.length)];
    return rStrap;
  };
  var initStrapline = function initStrapline() {
    var strapSelector = document.querySelector('.site-description');
    if (strapSelector) {
      strapSelector.innerHTML = getStrapline();
    }
  };
  window.addEventListener('load', initStrapline);
  var fitVids = function fitVids() {
    var frames = document.querySelectorAll('iframe[src*="youtube.com"]');
    var currentVid = 0;
    var _iterator = _createForOfIteratorHelper(frames),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var frame = _step.value;
        var frameParent = frame.parentNode;
        var frameWidth = frame.width;
        var frameHeight = frame.height;
        var vidFigure = document.createElement('figure');
        vidFigure.classList.add('kg-card');
        vidFigure.classList.add('kg-embed-card');
        var vidDiv = document.createElement('div');
        vidDiv.classList.add('fluid-width-video-wrapper');
        vidDiv.style.paddingTop = "".concat(frameHeight / frameWidth * 100, "%");
        vidFigure.append(vidDiv);
        frameParent.insertBefore(vidFigure, frame);
        vidDiv.append(frame);
        frame.setAttribute('name', "fitvid".concat(currentVid));
        currentVid++;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  window.addEventListener('load', fitVids);

})();
