const carousel = document.querySelector(".main__gallery"),
			prevButton = carousel.querySelector(".prev"),
			nextButton = carousel.querySelector(".next"),
			carouselBlock = carousel.querySelector(".gallery__imgs"),
			carouselWrap = carousel.querySelector(".gallery__wrap"),
			scrolWidth = carouselWrap.offsetWidth,
			fullSize = carouselBlock.offsetWidth,
			allSlides = carousel.querySelectorAll("img");

prevButton.addEventListener("click", slideL);
nextButton.addEventListener("click", slideR);

const takePX = () => carouselBlock.style.left === "" 
	? +carouselBlock.style.left
	: parseInt(carouselBlock.style.left)

// return true if it will reach uttermost slide
const checkEnd = () => fullSize + takePX() < carouselWrap.offsetWidth

const checkStart = () => takePX() > 0

const append = () => [...allSlides].some((elem, i) => {
	const slide = allSlides[i].cloneNode(true);
	carouselBlock.appendChild(slide);
	return i <= 4 ? false : true;
})

const remove = () => [...allSlides].some((elem, i) => {
	const slide = allSlides[i].remove();
	return i <= 4 ? false : true;
})

function slideR() {
	carouselBlock.style.left = `${takePX() - scrolWidth / 2}px`;
	append();
	remove();
}

function slideL() {
	carouselBlock.style.left = `${takePX() + scrolWidth / 2}px`;
	//checkStart() 
}