"use strict"

document.addEventListener("DOMContentLoaded", function (e) {
	
	
	const SNOW_OFF = 'snowOff';
	const SNOW_WEAK = 'snowWeak';
	const SNOW_AVERAGE = 'snowAverage';
	const SNOW_BLIZZARD = 'snowBlizzard';
	
	
	let widthSnow = window.screen.availWidth;
	let heightSnow = window.screen.availHeight;
	let snowContainer = document.querySelector('[data-snow="snow"]');
	let arrSnow = [];	
	let intervalId;
	let delay = 100;
	
	let countWeak = 50;
	let countAverage = 150;
	if (widthSnow < 768){
		countWeak = 20;
		countAverage = 60;
	}
	
	//console.dir(countWeak);

	//инпут и метки для инпута
	let snowInput = document.querySelector('#snowInput');
	if (snowInput) snowInput.addEventListener('change', changeSnowInput);
	let snowLabels = document.querySelectorAll('.snow__label');		


	//инициализация
	let myStorage = window.localStorage;
	let snowMode = myStorage.getItem('snowMode');	
	
	if (!snowMode || (snowMode && snowMode != SNOW_OFF && snowMode != SNOW_WEAK && snowMode != SNOW_AVERAGE && snowMode != SNOW_BLIZZARD)){
		snowMode = SNOW_OFF;
		myStorage.setItem('snowMode', SNOW_OFF);			
	}; 
	
	document.querySelector('#'+snowMode).checked = true;	
	initSnow(snowContainer, snowMode);
	
	let modeElem = document.querySelector('.mode');
	modeElem?.addEventListener('click', setMode);
	
	
	/*----------------setMode---------------------*/
	function setMode(e) {
		if (e.target.tagName != 'INPUT') return;
		snowMode = e.target.id;
		myStorage.setItem('snowMode', snowMode);
		initSnow(snowContainer, snowMode);
	};
	/*----------------setMode---------------------*/

	/*----------------initSnow--------------------*/
	function initSnow(snowContainer, snowMode) {
		//клик Нет при выключенном снеге
		if (snowMode == SNOW_OFF && arrSnow.length == 0) return;		
		
		//останавливаем снег
		clearInterval(intervalId);		
		
		//текущее количество снежинок
		let curCountSnow = arrSnow.length;
		
		/*----------------ЦИКЛ--------------------*/
		for (let i = 0; i <= countAverage; i++){			
			/*----------------SNOW_OFF--------------------*/
			if(snowMode == SNOW_OFF){
				if (curCountSnow == 0){
					break;//нечего чистить - выход 
				} else {
					if (i <= curCountSnow - 1){
						arrSnow[i].elem.remove();//удаляем DOM элементы
						if (i == curCountSnow - 1){
							arrSnow.length = 0;//после удаления всех DOM элементов чистим массив
						}	
					} else {						
						break;//выход
					};							
				};	
			};
			/*----------------SNOW_OFF--------------------*/
			
			/*----------------SNOW_WEAK-------------------*/
			if(snowMode == SNOW_WEAK){
				if (curCountSnow == 0){//снега нет
					if (i <= countWeak){//создаем в количестве countWeak  и режиме SNOW_WEAK
						arrSnow.push(new Snow(i, SNOW_WEAK));// в массив
						snowContainer.append(arrSnow[i].createElem());// в DOM
					} else {
						break;
					};
				} else {//снег уже есть
					if (curCountSnow == countWeak + 1){//количество снега уже столько сколько нужно
						if (i <= countWeak){
							arrSnow[i].mode = SNOW_WEAK;//меняем режим существующему снегу
						} else {
							break;//выход
						};
					} else {//количество снега больше, чем нужно
						if (i <= countWeak){
							arrSnow[i].mode = SNOW_WEAK;//меняем режим существующему снегу в кол-ве countWeak
						} else {//снег больше countWeak							
							arrSnow[i].elem.remove();//удаляем DOM элементы
							//на последней итерации чистим массив от countWeak+1 до countAverage
							if (i == countAverage) arrSnow.length = countWeak + 1;
						};
					};
				};	
			};
			/*----------------SNOW_WEAK-------------------*/

			/*-------SNOW_AVERAGE or SNOW_BLIZZARD--------*/
			if(snowMode == SNOW_AVERAGE || snowMode == SNOW_BLIZZARD){
				if (curCountSnow == 0){//снега нет - создаем
					arrSnow.push(new Snow(i, snowMode));// в массив
					snowContainer.append(arrSnow[i].createElem());// в DOM
				} else {//снег уже есть
					if (curCountSnow == countWeak + 1){//количество снега countWeak
						if (i <= countWeak){
							arrSnow[i].mode = snowMode;//меняем режим существующему снегу							
						} else {// от countWeak+1 до countAverage - создаем
							arrSnow.push(new Snow(i, snowMode));// в массив
							snowContainer.append(arrSnow[i].createElem());// в DOM							
						};
					} else {//количество снега countAverage
						arrSnow[i].mode = snowMode;//меняем режим существующему снегу
					};
				};					
			};
			/*-------SNOW_AVERAGE or SNOW_BLIZZARD--------*/
		};
		/*----------------ЦИКЛ--------------------*/	
		//console.dir(arrSnow);		

		//запуск анимации
		delay = 70;
		if(snowMode == SNOW_BLIZZARD) delay = 30;		
		if(snowMode != SNOW_OFF){
			//включаем вращение меток
			for(let label of snowLabels){				
				label.classList.add('snow-in');
			}
			//стартуем снег
			intervalId = setInterval(function () {
				for (let i = 0; i < arrSnow.length; i++) {
					arrSnow[i].moveElem();
				}
			}, delay);
		} else {
			//вЫключаем вращение меток
			for(let label of snowLabels){			
				label.classList.remove('snow-in');
			}
		};		
	};
	/*----------------initSnow--------------------*/	

	/*------------------Snow----------------------*/	
	function Snow(id, mode) {
		this.id = id;		
		this.mode = mode;
		if (mode != SNOW_BLIZZARD){
			this.mode = (id >= 0 && id <= countWeak) ? SNOW_WEAK : SNOW_AVERAGE;
		}
		this.x0 = Math.round(widthSnow * Math.random());
		this.y = Math.round(-heightSnow * Math.random());
		this.amp = 10 + Math.round(20 * Math.random());
		this.Kamp = 5 + Math.round(5 * Math.random());
		this.fi = 0;		
		this.dfi = Math.PI / (10 + Math.round(20 * Math.random()));		
		this.stepY = 2 + 2 * Math.random();
		this.createElem = function () {
			let elem = document.createElement('div');
			elem.dataset.id = id;
			//elem.dataset.mode = this.mode;
			let size = (12+Math.round(6*Math.random()));
			elem.style.width = elem.style.height = size + "px";
			elem.style.backgroundImage = "url('img/snow/00"+(1+Math.round(4*Math.random()))+".png')";
			elem.classList.add('snow__item');
			elem.style.top = this.y + 'px';
			elem.style.left = this.x0 + 'px';
			this.elem = elem;
			return this.elem;
		};
		
		this.moveElem = function () {
			this.fi += this.dfi;
			this.x = (this.mode == SNOW_BLIZZARD) ? this.x0 + this.amp * this.Kamp * Math.cos(this.fi / 3) + this.amp * Math.sin(this.fi) : this.x0 + this.amp * Math.sin(this.fi);
			if (this.y < heightSnow) {
				this.y += this.stepY;
			} else {
				this.x0 = Math.round(widthSnow * Math.random());
				this.dfi = Math.PI / (10 + Math.round(20 * Math.random()));		
				this.stepY = 2 + 2 * Math.random();
				this.y = -20;
			};
			this.elem.style.top = this.y + 'px';
			this.elem.style.left = this.x + 'px';
		}		
	};
	/*------------------Snow----------------------*/	
	
	
	function changeSnowInput(e){		
		for(let label of snowLabels){
			if (this.checked){
				label.classList.add('snow__input-checked');
			}else{
				if (snowMode == SNOW_OFF) label.classList.remove('snow__input-checked');	
			}
		}
		console.dir(this.checked);	
	};
	
	
	
	
});

