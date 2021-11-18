

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

document.addEventListener("DOMContentLoaded", function (e) {
	
	document.querySelector('.tabs').addEventListener('click', selectTab);		
	document.querySelector('#btnShowMore').addEventListener('click', addImgDesign);
	document.querySelector('.hours').addEventListener('click', selectHours);
	
	/*
	document.querySelector('#tabServices').addEventListener('click', clickService);
	
	
	*/
	
	/*--------------create content----------------*/
	createBlockPrices(prices);
	addImgDesign();
	generateBookedHours(true);	
	/*--------------create content----------------*/	
});

/*----------------------------navigation tabs----------------------------------*/
function selectTab(e) {
	let elem = e.target;
	console.dir(elem);
	if (!elem.classList.contains('tabs__title') &&		
		!elem.classList.contains('btn-prev') &&
		!elem.classList.contains('btn-next')) return;
	if (elem.classList.contains('title-active')) return;	
	/*current*/
	document.querySelector('.title-active').classList.remove('title-active');
	document.querySelector('.tabs-active').classList.remove('tabs-active');
	/*new tab*/
	if (elem.classList.contains('tabs__title')){
		elem.classList.add('title-active');
	}else{
		document.querySelector('.tabs__title[data-id="'+elem.dataset.id+'"').classList.add('title-active');			
	};	
	console.dir(elem.dataset);	
	document.querySelector('#'+elem.dataset.id).classList.add('tabs-active');
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
		result.innerHTML += ""+
			"<li class='price'>"+
			"<input class='price__input' type='checkbox' "+
			"data-id='" + i +
			"' id='price"+ i +
			"' data-count='"+ arr[i]['count'] +
			"'></input>"+
			"<label for='price"+ i +"' class='price__label'>"+
			"<span class='price__title'>"+arr[i]['title']+"</span>"+
			"<span class='price__value'>от " + arr[i]['price'] + " грн.</span>"+
			"<span class='price__checkbox'></span>"+
			"</label>"+
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
		let newElem = document.createElement('span');
		newElem.classList.add('design');
		newElem.innerHTML = "<input id='design" + curIndex + "' class='design__radio' type='radio' name='design' value='img/gallery/" + curIndex + ".jpg'></input>" +
			"<label class='design__label' for='design" + curIndex + "' title='Выбрать'></label>" +
			"<a class='design__item' href='img/gallery/" + curIndex + ".jpg' data-lightbox='design' data-title>" +
			"<img class='gallery__img' src='img/gallery/" + curIndex + ".jpg' alt=''></a>";
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
	if (e.target.classList.contains('hours__booked')) return;
	let prev = document.querySelector('.hours__selected');
	if (prev) prev.classList.remove('hours__selected');
	e.target.classList.add('hours__selected');
};
/*-------------------------.hours.onClick-------------------------------------*/







function clickService(e) {

	if (e.target.tagName == 'INPUT'){
		console.log(e.target.dataset.id);	
	};	
};




/*-------------------три шага-------------*/
function startProcess() {
	let titles = document.querySelectorAll('.step__title');
	let indicators = document.querySelectorAll('.step__fill');
	let countIndicators = indicators.length;
	let currentIndicator = 0;

	/*console.dir(indicators[0]);*/

	function changeIndicator(num) {
		/*console.log(indicators[currentIndicator].parentElement.clientWidth);*/
		if (currentIndicator == 0) {
			indicators[currentIndicator].classList.add('_fill');
			titles[currentIndicator].classList.add('_fill-text');
		}

		if ((indicators[currentIndicator].clientWidth >= indicators[currentIndicator].parentElement.clientWidth)) {
			if (currentIndicator == countIndicators - 1) {
				for (let el of indicators) {
					el.classList.remove('_fill');
				}
				for (let el of titles) {
					el.classList.remove('_fill-text');
				}
				currentIndicator = 0;
			} else {
				currentIndicator++;
				indicators[currentIndicator].classList.add('_fill');
				titles[currentIndicator].classList.add('_fill-text');
			};
		};
	};

	setInterval(changeIndicator, 100);
}
/*-------------------три шага-------------*/


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
			let today = new Date();
			today = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
			if (date == today) {
				generateBookedHours(true);	
				$("#todayBooked").dialog("open");
			} else {
				generateBookedHours();
			}
		},
		beforeShowDay: function (date) {
			return (date.getDay() == 0) ? [false] : [true]
		}
	});
});


