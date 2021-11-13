window.onload = function(){		
	document.querySelector('#btnGallery').addEventListener('click', addGallery);	
};

/*-------------------галерея - смотреть еще-------------*/
function addGallery(){
	const MAX_COUNT_GALLERY_BLOCK = 4;
	let listGallery = 	document.querySelectorAll('.gallery');
	let countGallery = 	document.querySelectorAll('.gallery').length;
	
	if (countGallery < MAX_COUNT_GALLERY_BLOCK){
		let newGallery = listGallery[0].cloneNode(true);		
		let newLinks = newGallery.querySelectorAll('.gallery__item');
		for (let i=0; i < newLinks.length; i++){
			let newNum = ('0' + (12 * countGallery + i + 1)).slice(-3);			
			newLinks[i].href = newLinks[i].children[0].src = 'img/gallery/'+newNum+'.jpg';
		};		
		this.parentElement.insertBefore(newGallery, this);				
	} else{
		for (let i = 1; i < MAX_COUNT_GALLERY_BLOCK; i++){
			this.parentElement.removeChild(listGallery[i]);
		}
	};
	this.innerText = (countGallery == MAX_COUNT_GALLERY_BLOCK - 1) ? 'Скрыть' : 'Показать еще...';

};
/*-------------------галерея - смотреть еще-------------*/
