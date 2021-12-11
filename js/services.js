let prices = [
	{
		title: 'Маникюр',
		price: 150,
		count: 1,
	},
	{
		title: 'Маникюр гель-лак',
		price: 260,
		count: 1,
	},
	{
		title: 'Парафино-терапия',
		price: 100,
		count: 1,
	},
	{
		title: 'Коррекция',
		price: 300,
		count: 1,
	},
	{
		title: 'Наращивание',
		price: 400,
		count: 1,
	},
	{
		title: 'Ремонт',
		price: 10,
		count: 10,
	},
	{
		title: 'Снятие',
		price: 70,
		count: 1,
	},
	{
		title: 'Педикюр',
		price: 300,
		count: 1,
	},
	{
		title: 'Педикюр гель-лак',
		price: 380,
		count: 1,
	},
	{
		title: 'Педикюр (покрытие)',
		price: 300,
		count: 1,
	},
	{
		title: 'Слайдер, втирка, стемпинг',
		price: 10,
		count: 10,
	},
	{
		title: 'Аэрография',
		price: 20,
		count: 10,
	},
	{
		title: 'Лепка',
		price: 20,
		count: 10,
	},
	{
		title: 'Стразы (зависит от количества)',
		price: 10,
		count: 10,
	},
	{
		title: 'Френч',
		price: 30,
		count: 10,
	},
	{
		title: 'Градиент, омбре',
		price: 50,
		count: 10,
	},
];

let order = {};

document.addEventListener("DOMContentLoaded", function (e) {

	document.querySelector('.tabs').addEventListener('click', selectTab);
	document.querySelector('#btnShowMore').addEventListener('click', addImgDesign);
	document.querySelector('.hours').addEventListener('click', selectHours);

	document.querySelector('#selectService').addEventListener('click', changeOrder);
	document.querySelector('#selectDesign').addEventListener('click', changeOrder);

	/*--------------создание элементов---------------*/
	createBlockPrices(prices);
	generateBookedHours(true);
	/*--------------создание элементов---------------*/
	resetOrder(order);
});
/*--------------- сброс заказа ------------------*/
function resetOrder(order) {
	order.date = '';
	order.time = '';
	order.services = {};
	order.design = {};
	order.design.id = '';
	order.design.value = designDef;
	order.totalSum = 0;
};
/*--------------- сброс заказа ------------------*/

/*----------------навигация по вкладкам----------*/
function selectTab(e) {
	let elem = e.target;
	//console.dir(elem.parentElement);
	if (!elem.classList.contains('tabs__title') &&
		!elem.classList.contains('tabs__text') &&
		!elem.classList.contains('btn-prev') &&
		!elem.classList.contains('btn-next')) return;
	if (elem.classList.contains('title-active') ||
		elem.parentElement.classList.contains('title-active')) return;
	if (elem.classList.contains('tabs__text')) elem = elem.parentElement;
	//console.dir(elem);
	/*current*/
	document.querySelector('.title-active').classList.remove('title-active');
	document.querySelector('.tabs-active').classList.remove('tabs-active');
	/*new tab*/
	if (elem.classList.contains('tabs__title')) {
		elem.classList.add('title-active');
	} else {
		document.querySelector('.tabs__title[data-id="' + elem.dataset.id + '"').classList.add('title-active');
	};
	//console.dir(elem.dataset);	
	document.querySelector('#' + elem.dataset.id).classList.add('tabs-active');
	window.scrollTo({
		top: 100,
		behavior: "smooth",
	});

};
/*----------------навигация по вкладкам----------*/


/*--------------- выбор услуги ------------------*/
function createBlockPrices(arr) {
	let parent = document.querySelector('#selectService .tabs__content');
	let firstGroupLength = Math.ceil(arr.length / 2);
	let secondGroupLength = arr.length - firstGroupLength;
	parent.append(createListPrices(arr, 0, firstGroupLength - 1));
	parent.append(createListPrices(arr, firstGroupLength, secondGroupLength - 1));
};
/*--------------- выбор услуги ------------------*/


/*--------------- создание списка услуг ---------*/
function createListPrices(arr, startIndex, length) {
	let result = document.createElement('ul');
	result.classList.add('prices');
	result.innerHTML = '';
	for (let i = startIndex; i <= (startIndex + length); i++) {
		result.innerHTML += "" +
			"<li class='price'>" +
			"<input class='price__input' type='checkbox' " +
			"data-id='" + i +
			"' id='price" + i +
			"' data-count='" + arr[i]['count'] +
			"'></input>" +
			"<label for='price" + i + "' class='price__label'>" +
			"<span class='price__title'>" + arr[i]['title'] + "</span>" +
			"<span class='price__value'>от " + arr[i]['price'] + " грн.</span>" +
			"<span class='price__checkbox'></span>" +
			"</label>" +
			"</li>";
	}
	return result;
};
/*--------------- создание списка услуг ---------*/

/*------ создание элементов выбора дизайна ------*/
function addImgDesign() {
	let parent = document.querySelector('#selectDesign .tabs__content');
	let designesList = parent.querySelectorAll('.design');
	if (designesList.length >= 48) return;
	if (designesList.length >= 42) document.querySelector('#btnShowMore').style = "visibility: hidden";
	let next = designesList.length + 1;
	for (let i = next; i < (next + 6); i++) {
		let curIndex = ("00" + i).slice(-3);
		let newElem = document.createElement('div');
		newElem.classList.add('design');
		newElem.innerHTML = "<input id='design" + curIndex + "' class='design__input' type='checkbox' value='" + curIndex + ".jpg'></input>" +
			"<label class='design__label' for='design" + curIndex + "' title='Выбрать'></label>" +
			"<div class='design__selected'><span>&#10004;</span></div>" +
			"<a class='design__zoom' href='img/gallery/" + curIndex + ".jpg' data-lightbox='" + curIndex + "' data-title=''>" +
			"<img src='img/fullscreen.svg' alt='' title='Увеличить'></a>" +
			"<img class='design__img' src='img/gallery/" + curIndex + ".jpg' alt=''>";
		parent.append(newElem);
	}
};
/*------ создание элементов выбора дизайна ------*/

/*----------- datepicker.onSelect ---------------*/
function generateBookedHours(all = false) {
	let listHours = document.querySelectorAll('.hours__item');
	for (let elem of listHours) {
		elem.classList.remove('hours__selected');
		let booked = (all) ? 1 : Math.round(Math.random());
		if (booked) {
			elem.classList.add('hours__booked');
		} else {
			elem.classList.remove('hours__booked');
		};
	}
};
/*----------- datepicker.onSelect ---------------*/

/*---------------.hours.onClick------------------*/
function selectHours(e) {
	if (e.target.tagName != 'LI') return;
	let elem = e.target;
	if (elem.classList.contains('hours__booked')) return;
	let prev = document.querySelector('.hours__selected');
	if (prev) prev.classList.remove('hours__selected');
	elem.classList.add('hours__selected');
	order.time = elem.innerText;
	changeOrderForm();

};
/*----------------.hours.onClick-----------------*/

/*------------ обновление заказа ----------------*/
function changeOrder(e) {
	if (e.target.tagName == 'INPUT' && e.target.classList.contains('price__input')) {
		let elem = e.target;
		let servId = elem.dataset.id;
		if (elem.checked) {
			order.services[servId] = prices[servId].title + '\n(от ' + prices[servId].count + 'шт. x ' + prices[servId].price + 'грн. = ' + prices[servId].count * prices[servId].price + ' грн.)\n';
			order.totalSum += prices[servId].count * prices[servId].price;
		} else {
			delete order.services[servId];
			order.totalSum -= prices[servId].count * prices[servId].price;
		}
	};
	if (e.target.tagName == 'INPUT' && e.target.classList.contains('design__input')) {

		let elem = e.target;
		let prevElem = document.querySelector('.design__input:not(#' + e.target.id + '):checked');
		if (prevElem) prevElem.checked = false;
		if (elem.checked) {
			order.design.id = elem.id;
			order.design.value = elem.value;
			//console.dir(elem.value);
		} else {
			order.design.id = '';
			order.design.value = designDef;
		}
	}
	changeOrderForm();
	//console.dir(order);
};
/*------------ обновление заказа ----------------*/


/*------------ обновление формы заказа ----------*/
function changeOrderForm() {

	let date = document.querySelector('#frmServiceDate');
	let time = document.querySelector('#frmServiceTime');
	let services = document.querySelector('#frmServiceServices');
	let design = document.querySelector('#frmServiceDesign');
	let previewImg = document.querySelector('.preview img');
	let totalSum = document.querySelector('#totalSum');
	let totalSumP = document.querySelector('.total-sum');
	let totalSumPSpan = document.querySelector('.total-sum span');

	date.value = order.date;
	if (order.date != '') date.classList.remove('_error');

	time.value = order.time;
	if (order.time != '') time.classList.remove('_error');

	services.value = '';
	for (let key in order.services) {
		services.value += order.services[key] + '\n';
	};
	if (services.value != '') services.classList.remove('_error');

	design.value = (order.design.value == designDef) ? '' : order.design.value;
	previewImg.src = previewImg.alt = galleryPath + order.design.value;
	//console.dir(design.value);

	totalSum.value = order.totalSum;
	totalSumPSpan.innerText = order.totalSum + 'грн.';
	totalSumP.style = (order.totalSum == 0) ? 'display: none' : 'display: block';
};
/*------------ обновление формы заказа ----------*/

/*------- сброс выбранных элементов вкладок -----*/
function resetTabsServices() {
	let checkedPrice = document.querySelectorAll('.price__input:checked');
	for (let i = 0; i < checkedPrice.length; i++) {
		checkedPrice[i].checked = false;
	}
	let design = document.querySelector('.design__input:checked');
	if (design) design.checked = false;

	let date = document.querySelector('.ui-state-default.ui-state-active');
	if (date) {
		date.classList.remove('ui-state-active');
		$("#datepicker").datepicker("setDate", new Date());
	}

	let time = document.querySelector('.hours__item.hours__selected');
	if (time) time.classList.remove('hours__selected');

	resetOrder(order);
	changeOrderForm();
};
/*------- сброс выбранных элементов вкладок -----*/



$(function () {
	/*---------------- datepicker -----------------*/
	$("#datepicker").datepicker({
		minDate: 0,
		hideIfNoPrevNext: true,
		firstDay: 1,
		monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Иють", "Июль", "Авгус", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		dateFormat: 'dd.mm.yy',
		onSelect: function (date, inst) {
			order.date = '';
			order.time = '';
			changeOrderForm();
			let today = new Date();
			today = ('0' + today.getDate()).slice(-2) + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
			if (date == today) {
				generateBookedHours(true);
				changeOrderForm();
				Swal.fire({
					title: 'Нам очень жаль...!',
					text: 'Но, на сегодня записи нет',
					confirmButtonText: 'Понятно'
				});
			} else {
				generateBookedHours();
				order.date = date;
				changeOrderForm();
			}
		},
		beforeShowDay: function (date) {
			return (date.getDay() == 0) ? [false] : [true];
		}
	});
	/*---------------- datepicker -----------------*/

	/*---------------- имя --------------*/
	$('#frmServiceName').keydown(function () {
		this.value = this.value.replace(/[^а-яА-ЯёЁa-zA-Z]/i, "");
	});
	/*---------------- имя --------------*/

	/*----------------номер телефона --------------*/
	$('#frmServiceTel').maskInput('(999) 999-9999');
	/*----------------номер телефона --------------*/


});


