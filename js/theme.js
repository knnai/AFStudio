"use strict"
document.addEventListener("DOMContentLoaded", function (e) {

	/*-------------------цветовая тема---------------------------*/
	//обработчик события 
	let themeInput = document.querySelector("#themeInput");
	if (themeInput) themeInput.addEventListener('change', changeTheme);
	
	//<link id="linkTheme" rel="stylesheet" href="css/variables_{  ...  }.css">
	let linkTheme =  document.querySelector("#linkTheme");
	
	//инициализация
	let myStorage = window.localStorage;		
	let colorTheme = myStorage.getItem('theme');	
	if (!colorTheme){
		colorTheme = 'dark';
		myStorage.setItem('theme', colorTheme);		
	};	
	linkTheme.href = 'css/variables_'+colorTheme+'.css'
	themeInput.checked = (colorTheme == 'light') ? true : false;	
	changePage(colorTheme);
	//console.dir('init > '+colorTheme+' > '+themeInput.checked);
	
	//изменение темы
	function changeTheme(e){
		colorTheme = (e.target.checked) ? 'light' : 'dark';
		myStorage.setItem('theme', colorTheme);			
		linkTheme.href = 'css/variables_'+colorTheme+'.css'		
		changePage(colorTheme);
		//console.dir('change > '+e.target.checked+' > '+colorTheme);
	};
	
	function changePage(colorTheme){
		//метки выбора темы
		let labelsTheme = document.querySelectorAll(".theme__label");
		if (labelsTheme){
			for (let elem of labelsTheme){
				console.dir(elem.style.backgroundImage);
				elem.style.backgroundImage = (colorTheme == 'light') ? "url('img/dark-mode.svg')" : "url('img/light-mode.svg')";
				elem.title = (colorTheme == 'light') ? "Темная тема" : "Светлая тема";
				console.dir(elem.style.backgroundImage);
			};			
		}		
		//декор на слайдах главной страницы
		let slideDecors = document.querySelectorAll('.slide__decor');
		if (slideDecors){
			for (let elem of slideDecors){
				elem.src = (colorTheme == 'light') ? "img/light-decor.png" : "img/dark-decor.png";
			};
		};
	};
	
	
	/*-------------------цветовая тема---------------------------*/	
});	