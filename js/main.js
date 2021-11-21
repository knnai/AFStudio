/*-------------------lightbox---------------------------*/
lightbox.option({
	'resizeDuration': 200,
	'wrapAround': true,
	'alwaysShowNavOnTouchDevices': false,
	'showImageNumberLabel': true,
});
/*-------------------lightbox---------------------------*/


let animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);

	function animOnScroll() {
		for (let i = 0; i < animItems.length; i++) {
			const animItem = animItems[i];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('anim-no-active')) {
					animItem.classList.remove('_active');
				}

			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft
		}
	}
	setTimeout(() => {
		animOnScroll();
	}, 1500);

}
























$(function () {
	/*-------------------preloader---------------------------*/
	setTimeout(function () {
		$('#preloader').fadeOut();
	}, 30);
	/*-------------------preloader---------------------------*/

	/*-------------------слайдер - первый экран -------------*/
	$('.slider').bxSlider({
		auto: true,
		mode: 'fade',
		speed: 2000,
		pause: 5000,
		//useCSS: true,
		//autoHover: true,
		//easing: 'ease-in-out',
		controls: false,
		pager: false,
	});
	/*-------------------слайдер - первый экран -------------*/

	/*-------------------слайдер - материалы -------------------*/
	$('.materials').bxSlider({
		auto: true,
		mode: 'vertical',
		//ticker: true,
		speed: 1000,
		pause: 3000,
		autoHover: true,
		//easing: 'ease-in-out',
		controls: false,
		pager: false,
	});
	/*-------------------слайдер - материалы -------------------*/

	/*-------------------слайдер - отзывы -------------------*/
	$('.reviews').bxSlider({
		auto: true,
		mode: 'fade',
		speed: 1000,
		pause: 7500,
		autoHover: true,
		//easing: 'ease-in-out',
		controls: false,
		pager: false,
	});
	/*-------------------слайдер - отзывы -------------------*/

	/*-------------фиксация главного меню при прокрутке------*/
	$(window).scroll(function () {
		if ($(this).innerWidth() > 425 && $(this).scrollTop() > 100) {
			if (!$('.header__bottom').hasClass('_fixedmenu')) {
				$('.header__bottom').addClass('_fixedmenu');
			}
			if (!$('.menu').hasClass('_noborder')) {
				$('.menu').addClass('_noborder');
			}
			if (!$('.first').hasClass('first-margin-top')) {
				$('.first-section').addClass('first-margin-top');
			}
		} else {
			$('.header__bottom').removeClass('_fixedmenu');
			$('.first-section').removeClass('first-margin-top');
			$('.menu').removeClass('_noborder');
		}
	});
	/*-------------фиксация главного меню при прокрутке------*/

});




