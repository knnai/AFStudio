document.addEventListener("DOMContentLoaded", function (e) {
	initTimer("actionTimer", new Date(2021, 11, 31, 24, 00, 00));	
});

/*------------------- таймер -------------*/
function initTimer(idTimer, endTime = new Date()){
	let timer = document.querySelector ("#"+idTimer);
	let days = timer.querySelector(".timer__days");
	let hours = timer.querySelector(".timer__hours");
	let minutes = timer.querySelector(".timer__minutes");
	let seconds = timer.querySelector(".timer__seconds");	
	//updateTimer();	
	let timerInterval = setInterval(updateTimer, 1000);	
	
	function updateTimer(){
		let remaining = getTimeRemaining(endTime);		
		if (remaining.total <= 0 && timerInterval){
			clearInterval(timerInterval);			
			return;
		};
		if (remaining.days != 0){
			days.innerHTML = remaining.days + "<p>ДНЕЙ</p>";
		} else {
			days.style.display = 'none';
		};	
		hours.innerHTML = ("0"+remaining.hours).slice(-2) + "<p>ЧАСОВ</p>";
		minutes.innerHTML = ("0"+remaining.minutes).slice(-2) + "<p>МИНУТ</p>";
		seconds.innerHTML = ("0"+remaining.seconds).slice(-2) + "<p>СЕКУНД</p>";				
	};	
	
	function getTimeRemaining(endDate){
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