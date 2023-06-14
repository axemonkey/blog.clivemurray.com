const checkPulse = () => {
	console.log('it loads...');
};

window.addEventListener('load', checkPulse);



// from casper theme

// sticky nav
const initStickyNav = function(s, a) {

	console.log('init sticky nav');
    s.Casper || (s.Casper = {}), s.Casper.stickyNavTitle = function(e) {
        var t = a.querySelector(e.navSelector),
            i = a.querySelector(e.titleSelector),
            r = s.scrollY,
            n = !1;

        function o() {
            i.getBoundingClientRect().top + s.scrollY + (i.offsetHeight + 35) <= r ? t.classList.add(e.activeClass) : t.classList.remove(e.activeClass), n = !1
        }
        s.addEventListener("scroll", function() {
            r = s.scrollY,
                function() {
                    n || requestAnimationFrame(o);
                    n = !0
                }()
        }, {
            passive: !0
        }), o()
    }
};

const initHomepageNav = function() {

	        var nav = document.querySelector('.site-nav-main .site-nav');
	        var feed = document.querySelector('.post-feed');

	        var lastScrollY = window.scrollY;
	        var lastWindowHeight = window.innerHeight;
	        var lastDocumentHeight = getDocumentHeight();
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
	            lastWindowHeight = window.innerHeight;
	            lastDocumentHeight = getDocumentHeight();
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
	            var progressMax = lastDocumentHeight - lastWindowHeight;

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

window.addEventListener('load', function() {
	const bodyEl = document.querySelector('body');
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

