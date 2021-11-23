/*-------------------lightbox---------------------------*/
lightbox.option({
	'resizeDuration': 200,
	'wrapAround': true,
	'alwaysShowNavOnTouchDevices': false,
	'showImageNumberLabel': true,
});
/*-------------------lightbox---------------------------*/

let animItems;
document.addEventListener("DOMContentLoaded", function (e) {
	animItems = document.querySelectorAll('._anim-items');
	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll);
		setTimeout(() => {
			animOnScroll();
		}, 1500);
	};

});


function animOnScroll() {
	
	for (let i = 0; i < animItems.length; i++) {
		let animItem = animItems[i];
		let animItemHeight = animItem.offsetHeight;
		let animItemOffset = offset(animItem).top;
		const animStart = 2;
		
		
		let animItemPoint = window.innerHeight - animItemHeight / animStart;
		
		if (animItemHeight > window.innerHeight) {
			animItemPoint = window.innerHeight - window.innerHeight / animStart;
		}

		if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
			if (animItem.classList.contains('about__second') && !animItem.classList.contains('_active')){
				animItem.classList.add('_active');
				animCounter(document.querySelector('#box1'), 10, 2000);
				animCounter(document.querySelector('#box2'), 300, 2000);
				animCounter(document.querySelector('#box3'), 10000, 3000);
				animCounter(document.querySelector('#box4'), 700, 3500);
			} else {
				animItem.classList.add('_active');	
			}				
		} else {			
			if (!animItem.classList.contains('_anim-no-repeat')) {
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


function animCounter(elem, maxValue = 0, milliseconds){
	if (!elem || elem.innerText == undefined) return;
	let iterPerSec = 10;
	let value = 0;
	let step = Math.ceil((maxValue / ((milliseconds / 1000) * 10)));
	let delay = 100;
	
	let interval = setInterval(function (){
		elem.innerText = value += step;
		if (value >= maxValue) {
			elem.innerText = maxValue;
			clearInterval(interval);
		}
	}, delay);		
};



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




