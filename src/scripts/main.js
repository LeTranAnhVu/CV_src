// Main
$(document).ready(function () {
	init();
	header_wrapped();
	toggleMenu();
	navItemOnlick();
	smoothScroll();
});



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


function smoothScroll() {
	$("header .nav-link").on('click', function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			// Store hash
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () {
				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		} // End if
	});
}
