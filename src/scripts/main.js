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


let isScrollBusy = false;

function init() {
	// check the size of window 
	if (window.innerWidth < 768) {
		if (!($("header .nav-items").hasClass('wrapped'))) {
			$("header .nav-items").addClass('wrapped');
		}
	}
}

function header_wrapped() {
	$(window).resize(function () {
		let x = window.innerWidth;
		let $target = $("header .nav-items");
		if (x < 768 && !($target.hasClass('wrapped'))) {

			$target.addClass('wrapped');
		} else if (x >= 768 && ($target.hasClass('wrapped'))) {
			$target.removeClass('wrapped');
		}

	})
}

function removeCollapseMenu() {
	$('#hambuger').removeClass('close');
	$("header .nav-items").removeClass('active')
}

function toggleMenu() {
	$('#hambuger').click(function () {
		$(this).toggleClass('close');
		$("header .nav-items").toggleClass('active')
	})
}

function navItemOnlick() {
	$('header .nav-items .nav-item').each(function () {
		$(this).click(function () {
			$('header .nav-items .nav-item').removeClass('active');
			$(this).addClass('active');
			if ($("header .nav-items").hasClass('wrapped')) {
				removeCollapseMenu();
			}
		})
	})
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
		let hash = this.hash;
		if (hash != "") {
			event.preventDefault();
			isScrollBusy = true;
			smoothScroll(hash);
			
		}
	})
}

function headerOnScroll() {
	$(window).scroll(function () {
		let y = $(window).scrollTop();
		if (y !== 0) {
			$('header').addClass('scrolled');
		} else {
			$('header').removeClass('scrolled');
		}
	})
}


function menuActiveWhenScroll(){
	$(window).scroll(function () {
		if(isScrollBusy === false){
			let y = $(window).scrollTop();
			let offset = parseInt(window.innerHeight/ 4);
			// let hashList = [];
			let activeLink = null;
			let minDis = 9999999;
			$("header .nav-link").each(function(i, item){
				let diff = (y + offset) - $(item.hash).offset().top;
				if(diff > 0 && diff < minDis){
					minDis = diff;
					// get dom element
					activeLink = item;
				}
			});
			$("header .nav-item").removeClass('active');
			if(!($(activeLink).hasClass('active'))){
				// smoothScroll(activeLink.hash);
				$(activeLink).parents('.nav-item').addClass('active');
			}
		}
	})
}


function viewMyWork() {
	$('#banner-btn').on('click', function () {
		let hash = '#about-me'
		smoothScroll(hash);
	})
}
