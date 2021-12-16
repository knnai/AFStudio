"use strict"
document.addEventListener("DOMContentLoaded", function (e) {

	/*-------------------lightbox---------------------------*/
	lightbox.option({
		'resizeDuration': 200,
		'wrapAround': true,
		'alwaysShowNavOnTouchDevices': false,
		'showImageNumberLabel': true,
	});
	/*-------------------lightbox---------------------------*/


	/*-----------------отправка форм------------------------*/
	//форма отправки дизайна
	let frmDesign = document.querySelector("#frmDesign");
	if (frmDesign) frmDesign.addEventListener('submit', formSend);

	//форма отправки вопроса
	let frmQuestion = document.querySelector("#frmQuestion");
	if (frmQuestion) frmQuestion.addEventListener('submit', formSend);

	//форма отправки заявки на посещение
	let frmService = document.querySelector("#frmService");
	if (frmService) frmService.addEventListener('submit', formSend);

	//отправка формы
	async function formSend(e) {
		e.preventDefault();

		let form = e.target;
		let error = formValidate(form);


		if (!error) {

			let sended = form.parentElement.querySelector(".form-sended");
			let frmServiceServices = form.querySelector("#frmServiceServices");
			if (form.id == 'frmService') {
				sended = document.querySelector("#sendOrder").querySelector(".form-sended");
				let strListServ = frmServiceServices.value;
				frmServiceServices.value = strListServ.split('\n\n').join('\n').split('\n').join('%0A');
			};

			let formData = new FormData(form);
			if (form.id == 'frmDesign') formData.append('image', frmDesignFile.files[0]);

			sended.style.display = 'block';
			//отправка
			let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			request.open(form.method, form.action);
			request.send(formData);
			request.onload = function () {
				if (request.status != 200) {
					sended.style.display = 'none';
					showModalWindow(modalWin, "error", "Ошибка!", "Повторите еще раз...", "ОК");
					/*
					Swal.fire({
						title: 'Ошибка!',
						text: "Повторите еще раз...",
					})
					*/
				} else {
					sended.style.display = 'none';
					form.reset();
					if (form.id == 'frmService') resetTabsServices();
					if (form.id == 'frmDesign') {
						document.querySelector('#frmDesignPreview').innerHTML = '';
					};
					showModalWindow(modalWin, "success", "Спасибо, что Вы с нами!", "Мы Вам перезвоним в течение суток!", "ОК");
					/*
					Swal.fire({
						title: 'Спасибо, что Вы с нами!',
						text: 'Мы Вам перезвоним в течение суток!',
					});
					*/
				};
			};
		};
	};
	/*-----------------отправка форм------------------------*/

	/*-----------------------валидация форм--------------------------*/
	function formValidate(form) {
		let error = false;
		let reqList = form.querySelectorAll('._req');
		//console.dir(reqList);
		for (let i = 0; i < reqList.length; i++) {
			let input = reqList[i];
			input.classList.remove('_error');

			if (input.name == "date" && input.value.length == 0) {
				input.classList.add('_error');
				error = true;
			};

			if (input.name == "time" && input.value.length == 0) {
				input.classList.add('_error');
				error = true;
			};

			if (input.name == "services" && input.value.length == 0) {
				input.classList.add('_error');
				error = true;
			};

			if (input.name == "name" && input.value.length < 3) {
				input.classList.add('_error');
				error = true;
			};
			if (input.name == "tel" && input.value.length < 14) {
				input.classList.add('_error');
				error = true;
			};
			if (input.name == "userDesign" && !input.value) {
				input.classList.add('_error');
				error = true;
			};
			if (input.name == "question" && input.value.length == 0) {
				input.classList.add('_error');
				error = true;
			};

			if (input.type == "checkbox" && !input.checked) {
				input.classList.add('_error');
				error = true;
			};

		}
		return error;
	};
	/*-----------------------валидация форм--------------------------*/



	/*-------------------загрузка файла дизайна----------------------*/
	//выбор файла дизайна	
	let frmDesignFile = document.querySelector("#frmDesignFile");
	//предпросмотр файла дизайна
	let frmDesignPreview = document.querySelector("#frmDesignPreview");
	//изменили файл дизайна
	if (frmDesignPreview) frmDesignFile.addEventListener('change', () => uploadFile(frmDesignFile.files[0]));

	function uploadFile(file) {
		if (!file) return;
		let msgError = document.querySelector("#msgError");
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			msgError.innerText = 'Допускаются файлы: *.jpg, *.png, *.gif';
			frmDesignFile.classList.add('_error');
			frmDesignFile.value = '';
			return;
		};
		if (file.size > 5 * 1024 * 1024) {
			msgError.innerText = 'Размер должен быть до 5Мб';
			frmDesignFile.classList.add('_error');
			frmDesignFile.value = '';
			return;
		};

		let reader = new FileReader();
		reader.onload = (e) => {
			frmDesignPreview.innerHTML = "<img src=" + e.target.result + " alt='Ваш дизайн'>";
		};
		reader.onerror = (e) => {
			msgError.innerText = 'Невозможно загрузить файл';
			frmDesignFile.classList.add('_error');
		};
		reader.readAsDataURL(file);
		frmDesignFile.classList.remove('_error');
	};
	/*-------------------загрузка файла дизайна----------------------*/




	/*------------------- анимация при скролле ----------------------*/
	let animItems = document.querySelectorAll('._anim-items');
	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll);
		setTimeout(() => {
			animOnScroll();
		}, 100);
	};
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
				if (animItem.classList.contains('about__second') && !animItem.classList.contains('_active')) {
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
	/*------------------- анимация при скролле ----------------------*/

	/*---------------- прокрутка страницы вверх ---------------------*/
	let btnToTop = document.querySelector('.panel__to-top');
	if (btnToTop) btnToTop.addEventListener("click", scrollToTop);
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	/*---------------- прокрутка страницы вверх ---------------------*/

	/*---------------------- анимация цифр --------------------------*/
	function animCounter(elem, maxValue = 0, milliseconds) {
		if (!elem || elem.innerText == undefined) return;
		let iterPerSec = 10;
		let value = 0;
		let step = Math.ceil((maxValue / ((milliseconds / 1000) * 10)));
		let delay = 100;

		let interval = setInterval(function () {
			elem.innerText = value += step;
			if (value >= maxValue) {
				elem.innerText = maxValue;
				clearInterval(interval);
			}
		}, delay);
	};
	/*---------------------- анимация цифр ---------------------------*/

	let actionTimer = document.querySelector('#actionTimer');
	if (actionTimer) initTimer(actionTimer.id, new Date(2021, 11, 31, 24, 0, 0));
	/*------------------- таймер -------------*/
	function initTimer(idTimer, endTime = new Date()) {
		let timer = document.querySelector("#" + idTimer);
		let days = timer.querySelector(".timer__days");
		let hours = timer.querySelector(".timer__hours");
		let minutes = timer.querySelector(".timer__minutes");
		let seconds = timer.querySelector(".timer__seconds");
		//updateTimer();	
		let timerInterval = setInterval(updateTimer, 1000);

		function updateTimer() {
			let remaining = getTimeRemaining(endTime);
			if (remaining.total <= 0 && timerInterval) {
				clearInterval(timerInterval);
				return;
			};
			if (remaining.days != 0) {
				days.innerHTML = remaining.days + "<p>ДНЕЙ</p>";
			} else {
				days.style.display = 'none';
			};
			hours.innerHTML = ("0" + remaining.hours).slice(-2) + "<p>ЧАСОВ</p>";
			minutes.innerHTML = ("0" + remaining.minutes).slice(-2) + "<p>МИНУТ</p>";
			seconds.innerHTML = ("0" + remaining.seconds).slice(-2) + "<p>СЕКУНД</p>";
		};

		function getTimeRemaining(endDate) {
			let now = new Date();
			let total = +endDate - +now;
			let seconds = Math.trunc(total / 1000);
			let days = Math.trunc(seconds / 86400);
			seconds -= days * 86400;
			let hours = Math.trunc(seconds / 3600);
			seconds -= hours * 3600;
			let minutes = Math.trunc(seconds / 60);
			seconds -= minutes * 60;
			// console.log(total);
			// console.log(days);	
			// console.log(hours);
			// console.log(minutes);
			//console.log(seconds);
			return {
				'total': total,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds,
			}
		};
	};
	/*------------------- таймер -------------*/


	/*----------------страница ABOUT -------------*/

	/*------------4 этапа стерилизации -----------*/
	//этапы очистки
	let stage = document.querySelector(".stage");
	if (stage) stage.addEventListener('click', showStage);

	function showStage(e) {
		let elem = e.target;
		//console.dir(elem.tagName);
		if (!elem.classList.contains('stage__button') &&
			!elem.classList.contains('stage__btn-title')) return;

		if (elem.classList.contains('stage__btn-title')) elem = elem.parentElement;

		if (elem.classList.contains('press')) return;

		let current = document.querySelector('.press');
		current.classList.remove('press');
		document.querySelector('.stage__content[data-id=' + current.id + ']').classList.remove('stage-visible');
		document.querySelector('.stage__content[data-id=' + current.id + ']').classList.remove('_active');

		elem.classList.add('press');
		document.querySelector('.stage__content[data-id=' + elem.id + ']').classList.add('stage-visible');
		document.querySelector('.stage__content[data-id=' + elem.id + ']').classList.add('_active');
	};
	/*------------4 этапа стерилизации -----------*/

	/*------------мастера - портфолио -----------*/
	//мастера - портфолио
	let masters = document.querySelector(".masters");
	if (masters) masters.addEventListener('click', showPortfolio);

	function showPortfolio(e) {
		let elem = e.target;
		//console.dir(elem);
		if (!elem.classList.contains('master-button')) return;

		//let mastersList = masters.querySelectorAll('.master-button');
		if (elem.classList.contains('press')) {
			elem.classList.remove('press');
			masters.querySelector('.portfolio[data-id=' + elem.id + ']').style.display = 'none';
			elem.innerText = 'Смотреть работы';
			masterBlur();
			return;
		} else {
			//if (window.screen.availWidth > 425) {
			let pressedElem = masters.querySelector('.master-button.press');
			let pressedId = pressedElem?.id;
			if (pressedId) {
				pressedElem.classList.remove('press');
				pressedElem.innerText = 'Смотреть работы';
				masters.querySelector('.portfolio[data-id=' + pressedId + ']').style.display = 'none';
			};
			//};
			elem.classList.add('press');
			elem.innerText = 'Скрыть работы';
			let display = (window.screen.availWidth > 425) ? 'grid' : 'block';
			masters.querySelector('.portfolio[data-id=' + elem.id + ']').style.display = display;
		};
		masterBlur();
	};

	function masterBlur() {

		let masters = document.querySelectorAll('.master');
		let isSel = document.querySelector('.master .press');

		for (let i = 0; i < masters.length; i++) {
			//console.dir(photoList[i].nextElementSibling);
			if (isSel) {
				if (masters[i].querySelector('.press')) {
					masters[i].querySelector('.master__photo img').classList.remove('master-blur');
				} else {
					masters[i].querySelector('.master__photo img').classList.add('master-blur');
				};
			} else {
				masters[i].querySelector('.master__photo img').classList.remove('master-blur');
			};
		};
	};
	/*------------мастера - портфолио -----------*/

	/*----------маникюр со всего мира -----------*/
	let pexelItems = document.querySelectorAll('.pexels__item');
	if (pexelItems) getPhotos();

	function getPhotos() {
		let arrSearch = ['manicure', 'nails', 'nail%20art'];
		let index = Math.round((arrSearch.length - 1) * Math.random());
		let strSearch = arrSearch[index];
		let page = Math.round(10 * Math.random());
		fetch("https://api.pexels.com/v1/search?query=" + strSearch + "&page=" + page + "&per_page=8", {
			headers: {
				Authorization: "563492ad6f9170000100000124bd569eeda6474ebaf134e49f00df55"
			}
		})
			.then(resp => {
				return resp.json()
			})
			.then(data => {
				updatePhotos(data.photos);
			})
	};

	function updatePhotos(images) {
		//console.dir(images);
		if (images.length >= 8 && pexelItems.length >= 8) {
			for (let i = 0; i < 8; i++) {
				pexelItems[i].href = images[i].src.large2x;
				pexelItems[i].setAttribute('data-title', 'Фотограф: ' + images[i].photographer);
				pexelItems[i].querySelector('img').src = images[i].src.medium;
			};
		};
	};


	/*----------маникюр со всего мира -----------*/


	/*----------------страница ABOUT -------------*/
});







/*------------------------JQUERY-----------------------------*/
$(function () {
	/*-------------------preloader---------------------------*/
	setTimeout(function () {
		$('#preloader').fadeOut();
	}, 2000);
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
			$('.header__bottom').addClass('_fixedmenu');
			$('.menu').addClass('_noborder');
			$('.section:first-child').addClass('first-margin-top');
		} else {
			$('.header__bottom').removeClass('_fixedmenu');
			$('.menu').removeClass('_noborder');
			$('.section:first-child').removeClass('first-margin-top');
		}

		if ($(this).scrollTop() > 100) {
			$('.panel').css('display', 'flex');
		} else {
			$('.panel').css('display', 'none');
		};
	});
	/*-------------фиксация главного меню при прокрутке------*/

	/*-----------------форма - акции ----------*/
	$('#frmDesignTel').maskInput('(999) 999-9999');
	$('#frmDesignName').keydown(function () {
		this.value = this.value.replace(/[^а-яА-ЯёЁa-zA-Z]/i, "");
	});
	/*-----------------форма - акции ----------*/


	/*-----------------форма - футер ----------*/
	$('#frmQuestionTel').maskInput('(999) 999-9999');
	$('#frmQuestionName').keydown(function () {
		this.value = this.value.replace(/[^а-яА-ЯёЁa-zA-Z]/i, "");
	});
	/*-----------------форма - футер ----------*/


});






