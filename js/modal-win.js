"use strict"

let modalWin;

document.addEventListener("DOMContentLoaded", function (e) {

	//let modal = document.querySelector('.modal');
	//showModalWindow(modal, "error", "Нам очень жаль...", "Но на сегодня записи нет", "Понятно");
	//showModalWindow(modal, "success", "Спасибо, что Вы с нами", "Мы Вам перезвоним в течение суток", "ОК");

	modalWin = document.querySelector('.modal');

	let btnModal = document.querySelector('.modal__button');
	btnModal?.addEventListener('click', hideModalWindow);

	function hideModalWindow(e) {
		let modal = document.querySelector('.modal.modal-show');
		if (!modal) return;
		modal.classList.remove('modal-show');
		modal.querySelector('.icon-show').classList.remove('icon-show');
		modal.querySelector('.modal__title').innerText = '';
		modal.querySelector('.modal__message').innerText = '';
		modal.querySelector('.modal__button').innerText = '';
	};

});

function showModalWindow(modal, icon, title, message, btnTitle) {
	if (!modal) return;
	modal.querySelector(`.icon-${icon}`).classList.add('icon-show');
	modal.querySelector('.modal__title').innerText = title;
	modal.querySelector('.modal__message').innerText = message;
	modal.querySelector('.modal__button').innerText = btnTitle;
	modal.classList.add('modal-show');
};