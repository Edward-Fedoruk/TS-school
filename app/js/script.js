const slider = document.querySelector(".content__slider"),
			prev = slider.querySelector(".content__prev"),
			next = slider.querySelector(".content__next"),
			lArrow = slider.querySelector(".content__Larrow"),
			RArrow = slider.querySelector(".content__Rarrow"),
			sliderIMG = slider.querySelector(".content__slideIMG"),
			slideWidth = sliderIMG.clientWidth;

let widthCounter = 0;

next.addEventListener("click", slideRight);
prev.addEventListener("click", slideLeft);

prev.style.display = "none";
function slideRight() {
	if(widthCounter <= -slideWidth) {
		next.style.display = "none";
	}
	if(prev.style.display === "none")
		prev.style.display = "flex";
	
	widthCounter -= slideWidth;
	sliderIMG.style.left = `${widthCounter}px`;
}

function slideLeft() {
	if(widthCounter >= -slideWidth) {
		prev.style.display = "none";
	}
	if(next.style.display === "none")
		next.style.display = "flex";
	
	widthCounter += slideWidth;
	sliderIMG.style.left = `${widthCounter}px`;
}