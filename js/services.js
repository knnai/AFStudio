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

let order = {
	date: '',
	time: '',
	services: {},
	design: {
		id: '',
		value: '',
	},
	totalSum: 0,
};

document.addEventListener("DOMContentLoaded", function (e) {

	document.querySelector('.tabs').addEventListener('click', selectTab);
	document.querySelector('#btnShowMore').addEventListener('click', addImgDesign);
	document.querySelector('.hours').addEventListener('click', selectHours);


	document.querySelector('#selectService').addEventListener('click', changeOrder);
	document.querySelector('#selectDesign').addEventListener('click', changeOrder);

	/*--------------create content----------------*/
	createBlockPrices(prices);
	addImgDesign();
	generateBookedHours(true);
	/*--------------create content----------------*/
});

/*----------------------------navigation tabs----------------------------------*/
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
		top: 0,
		behavior: "smooth",
	});
};
/*----------------------------navigation tabs----------------------------------*/


/*----------------------------#selectService-----------------------------------*/
function createBlockPrices(arr) {
	let parent = document.querySelector('#selectService .tabs__content');
	let firstGroupLength = Math.ceil(arr.length / 2);
	let secondGroupLength = arr.length - firstGroupLength;
	parent.append(createListPrices(arr, 0, firstGroupLength - 1));
	parent.append(createListPrices(arr, firstGroupLength, secondGroupLength - 1));
};
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
/*----------------------------#selectService-----------------------------------*/

/*----------------------------#btnShowMore.onClick-----------------------------*/
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
		newElem.innerHTML = "<input id='design" + curIndex + "' class='design__input' type='checkbox' value='img/gallery/" + curIndex + ".jpg'></input>" +
			"<label class='design__label' for='design" + curIndex + "' title='Выбрать'></label>" +
			"<div class='design__selected'><span>&#10004;</span></div>" +
			"<a class='design__zoom' href='img/gallery/" + curIndex + ".jpg' data-lightbox='" + curIndex + "' data-title=''>" +
			"<img src='img/fullscreen.svg' alt='' title='Увеличить'></a>" +
			"<img class='design__img' src='img/gallery/" + curIndex + ".jpg' alt=''>";
		parent.append(newElem);
	}
};
/*----------------------------#btnShowMore.onClick-----------------------------*/

/*------------------------------EVENTS----------------------------------------*/

/*----------------------datepicker.onSelect-----------------------------------*/
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
/*----------------------datepicker.onSelect-----------------------------------*/

/*-------------------------.hours.onClick-------------------------------------*/
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
/*-------------------------.hours.onClick-------------------------------------*/



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
		order.design.id = elem.id;
		order.design.value = elem.value;
		console.dir(elem.value);
	}
	changeOrderForm();
	console.dir(order);

};
function changeOrderForm() {

	let date = document.querySelector('#frmServiceDate');
	let time = document.querySelector('#frmServiceTime');
	let services = document.querySelector('#frmServiceServices');
	let design = document.querySelector('#frmServiceDesign');
	let prviewImg = document.querySelector('.preview img');
	let totalSum = document.querySelector('.total-sum');
	let totalSumSpan = document.querySelector('.total-sum span');

	date.value = order.date;
	time.value = order.time;

	services.value = '';
	for (let key in order.services) {
		services.value += order.services[key] + '\n';
	};

	design.value = order.design.id;
	prviewImg.src = order.design.value;

	totalSumSpan.innerText = order.totalSum + 'грн.';
	totalSum.style = (order.totalSum == 0) ? 'display: none' : 'display: block';
};






$(function () {

	$("#todayBooked").dialog({
		autoOpen: false,//автооткрытие - нет
		resizable: false,//изменять рамер - нет
		height: "auto",
		modal: true,
		buttons: [
			{
				text: "Закрыть",
				click: function () {
					$(this).dialog("close");
				}

				// Uncommenting the following line would hide the text,
				// resulting in the label being used as a tooltip
				//showText: false
			}
		],
		show: {//анимация при открытии
			effect: "bounce",
			duration: 1000
		},
		hide: {//анимация при закрытии
			effect: "scale",
			duration: 1000
		}
	});

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
			today = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
			if (date == today) {
				generateBookedHours(true);
				changeOrderForm();
				$("#todayBooked").dialog("open");
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
});


