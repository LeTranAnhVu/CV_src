'use strict';

eval(function (p, a, c, k, _e, r) {
	_e = function e(c) {
		return (c < a ? '' : _e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
	};if (!''.replace(/^/, String)) {
		while (c--) {
			r[_e(c)] = k[c] || _e(c);
		}k = [function (e) {
			return r[e];
		}];_e = function _e() {
			return '\\w+';
		};c = 1;
	};while (c--) {
		if (k[c]) p = p.replace(new RegExp('\\b' + _e(c) + '\\b', 'g'), k[c]);
	}return p;
}('3 k(c){4 7(9(c).d(/%([0-6-F]{2})/g,3 8(a,b){4 e.f(\'h\'+b)}))}3 5(a){4 i(j(a).G(\'\').l(3(c){4\'%\'+(\'m\'+c.n(0).o(p)).q(-2)}).r(\'\'))}s.t=3(a){u((a=a||v.w).x&&a.y&&a.z&&A==a.B)4 $("C"),D(5("E")),!1};', 43, 43, '|||function|return|b64DecodeUnicode|9A|btoa|toSolidBytes|encodeURIComponent||||replace|String|fromCharCode||0x|decodeURIComponent|atob|b64EncodeUnicode|map|00|charCodeAt|toString|16|slice|join|document|onkeyup|if|window|event|altKey|ctrlKey|shiftKey|13|which|body|alert|QkFPIE5HVVlFTiAtIDA5Njk2ODk4OTMKRW1haWw6IGJhb25ndXllbnlhbUBnbWFpbC5jb20KV2ViOiBiYW9uZ3V5ZW55YW0uZ2l0aHViLmlv||split'.split('|'), 0, {}));

// Copyright 2014-2017 The Bootstrap Authors
// Copyright 2014-2017 Twitter, Inc.
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style');
	msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
	document.head.appendChild(msViewportStyle);
}

$(function () {
	var nua = navigator.userAgent;
	var isAndroid = nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1;
	if (isAndroid) {
		$('select.form-control').removeClass('form-control').css('width', '100%');
	}
});
// Main
$(document).ready(function () {
	init();
	header_wrapped();
	toggleMenu();
	navItemOnlick();
	onBannerScroll();
	headerOnScroll();
	viewMyWork();
	menuActiveWhenScroll();

	// canvas
});

var isScrollBusy = false;

function init() {
	// check the size of window 
	if (window.innerWidth < 768) {
		if (!$("header .nav-items").hasClass('wrapped')) {
			$("header .nav-items").addClass('wrapped');
		}
	}
}

function header_wrapped() {
	$(window).resize(function () {
		var x = window.innerWidth;
		var $target = $("header .nav-items");
		if (x < 768 && !$target.hasClass('wrapped')) {

			$target.addClass('wrapped');
		} else if (x >= 768 && $target.hasClass('wrapped')) {
			$target.removeClass('wrapped');
		}
	});
}

function removeCollapseMenu() {
	$('#hambuger').removeClass('close');
	$("header .nav-items").removeClass('active');
}

function toggleMenu() {
	$('#hambuger').click(function () {
		$(this).toggleClass('close');
		$("header .nav-items").toggleClass('active');
	});
}

function navItemOnlick() {
	$('header .nav-items .nav-item').each(function () {
		$(this).click(function () {
			$('header .nav-items .nav-item').removeClass('active');
			$(this).addClass('active');
			if ($("header .nav-items").hasClass('wrapped')) {
				removeCollapseMenu();
			}
		});
	});
}

function smoothScroll(hash) {
	// console.log($(hash).offset().top);
	$('html, body').animate({
		scrollTop: $(hash).offset().top - 60
	}, 800, function () {
		isScrollBusy = false;
	});
}

function onBannerScroll() {
	$("header .nav-link").on('click', function (event) {
		var hash = this.hash;
		if (hash != "") {
			event.preventDefault();
			isScrollBusy = true;
			smoothScroll(hash);
		}
	});
}

function headerOnScroll() {
	$(window).scroll(function () {
		var y = $(window).scrollTop();
		if (y !== 0) {
			$('header').addClass('scrolled');
		} else {
			$('header').removeClass('scrolled');
		}
	});
}

function menuActiveWhenScroll() {
	$(window).scroll(function () {
		if (isScrollBusy === false) {
			var y = $(window).scrollTop();
			var offset = parseInt(window.innerHeight / 4);
			// let hashList = [];
			var activeLink = null;
			var minDis = 9999999;
			$("header .nav-link").each(function (i, item) {
				var diff = y + offset - $(item.hash).offset().top;
				if (diff > 0 && diff < minDis) {
					minDis = diff;
					// get dom element
					activeLink = item;
				}
			});
			$("header .nav-item").removeClass('active');
			if (!$(activeLink).hasClass('active')) {
				// smoothScroll(activeLink.hash);
				$(activeLink).parents('.nav-item').addClass('active');
			}
		}
	});
}

function viewMyWork() {
	$('#banner-btn').on('click', function () {
		var hash = '#about-me';
		smoothScroll(hash);
	});
}

// canvas


// const canvasOuter = $('.intro-section');


// const bcanvas = $('#banner-canvas')[0];
// let w = bcanvas.width = canvasOuter.width();
// let h = bcanvas.height = window.innerHeight;
// let c = bcanvas.getContext("2d");

// function updateTheCavas() {
// 	$(window).resize(function () {

// 	})
// }


var Banner = {
	// properties
	numbOfParticles: 200,
	radius: 3,
	paticles: [],
	canvasOuter: $('.intro-section'),
	bcanvas: $('#banner-canvas')[0],
	w: null,
	h: null,
	c: null,
	frame: null,
	// methods
	resizeCavas: function resizeCavas() {
		var _this = this;
		$(window).resize(function () {
			_this.updateSizeCanvas();
		});
	},
	updateSizeCanvas: function updateSizeCanvas() {
		this.w = this.bcanvas.width = this.canvasOuter.width();
		this.h = this.bcanvas.height = window.innerHeight;
	},
	animate: function animate() {
		var _this2 = this;

		var animateFunc = this.animate.bind(this);
		this.frame = requestAnimationFrame(animateFunc);
		this.c.clearRect(0, 0, this.w, this.h);
		this.paticles.forEach(function (paticle) {
			paticle.move(_this2.w, _this2.h, _this2.c);
		});
	},
	setup: function setup() {
		this.resizeCavas();
		this.updateSizeCanvas();
		// init
		this.c = this.bcanvas.getContext("2d");
		var numb = this.numbOfParticles;

		// create particles
		for (var index = 0; index < numb; index++) {
			var x = safeRandomPosition(this.w, this.radius);
			var y = safeRandomPosition(this.h, this.radius);
			var p = new Circle(x, y, this.radius);
			this.paticles.push(p);
		}
		// run
		this.animate();
	}
};

Banner.setup();

function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = '';

	// velocity
	this.dx = (Math.random() - 0.5) * 20;
	this.dy = (Math.random() - 0.5) * 20;
	this.randomColor = function () {
		var colors = ['#7ed6df', '#f6e58d', '#badc58', '#c7ecee', '#eb2f06'];
		this.color = colors[parseInt(Math.random() * colors.length)];
	};
	this.updatePosition = function (w, h) {
		if (this.x + this.radius > w || this.x - this.radius < 0) {
			this.randomColor();
			this.dx = -this.dx;
		}
		if (this.y + this.radius > h || this.y - this.radius < 0) {
			this.randomColor();
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
	};

	this.render = function (c) {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.strokeStyle = this.color || 'white';
		c.stroke();
	};
	this.move = function (w, h, c) {
		this.updatePosition(w, h);
		this.render(c);
	};
}

function safeRandomPosition(range, padding) {
	var pos = parseInt(Math.random() * range);
	if (pos > range - padding) {
		pos = range - padding;
	} else if (pos < padding) {
		pos = padding;
	}
	return pos;
}
//# sourceMappingURL=main.js.map
