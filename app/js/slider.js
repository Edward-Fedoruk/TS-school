const 	slider		 = document.querySelector(".content__slider"),
			control      = document.querySelectorAll(".content__slide"),
			prev 		    = slider.querySelector(".content__prev"),
			next         = slider.querySelector(".content__next"),
			lArrow 		 = document.querySelector(".content__Larrow"),
			RArrow	    = document.querySelector(".content__Rarrow"),
			sliderIMG 	 = slider.querySelector(".content__slideIMG"),
			sliderAmount = sliderIMG.querySelectorAll("img").length,
			slideWidth 	 = sliderIMG.clientWidth;
			//slide
let widthCounter = 0;
let slideCounter = 0;

prev.style.display = "none";

next.addEventListener("click", slideRight);
prev.addEventListener("click", slideLeft);

const checkPosRight = (cWidth, sWidth, p) => 
	cWidth >= -sWidth ? p.style.display = "none" : 0

const checkPosLeft = (cWidth, sWidth, sAmount, n) => 
	cWidth <= -sWidth * (sAmount - 2) ? n.style.display = "none" : 0

const display = arrow => arrow.style.display === "none" 
	? arrow.style.display = "flex"
	: 0

function slideLeft() {
	checkPosRight(widthCounter, slideWidth, prev);
	display(next);
	sliderIMG.style.left = `${widthCounter += slideWidth}px`;
	control[slideCounter].classList.remove("selectedSlide");
	slideCounter--;
	control[slideCounter].classList.add("selectedSlide");
}

control[0].classList.add("selectedSlide");
function slideRight() {
	checkPosLeft(widthCounter, slideWidth, sliderAmount, next);
	display(prev);
	sliderIMG.style.left = `${widthCounter -= slideWidth}px`;
	slideCounter++;
	control[slideCounter].classList.add("selectedSlide");
	control[--slideCounter].classList.remove("selectedSlide");
	slideCounter++;
} 
