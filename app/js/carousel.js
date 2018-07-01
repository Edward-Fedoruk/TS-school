const carousel = document.querySelector(".main__gallery"),
			prevButton = carousel.querySelector(".prev"),
			nextButton = carousel.querySelector(".next"),
			carouselBlock = carousel.querySelector(".gallery__imgs"),
			carouselWrap = carousel.querySelector(".gallery__wrap"),
			scrolWidth = carouselWrap.offsetWidth,
			imgWidth = carousel.querySelector("img").clientWidth;
			fullSize = carouselBlock.offsetWidth;
let	allSlides = carousel.querySelectorAll("img");

prevButton.addEventListener("click", slideL);
nextButton.addEventListener("click", slideR);

const parsePX = elem => elem === "" ? 0 : parseFloat(elem)

const insertSlides = position =>
	position 
	 ? allSlides.forEach(element => carouselBlock.appendChild(element.cloneNode())) 
	 : allSlides.forEach(element => carouselBlock.insertBefore(element.cloneNode(), allSlides[0]))

const takeSlidesWidth = slides => slides.length * slides[0].offsetWidth;

const incrementPos = value => parsePX(carouselBlock.style.left) + value;

const transformX = width => carouselBlock.style.left = `${incrementPos(width)}px`

//const checkPos = pos => takeSlidesWidth(docum

const initialWidth = takeSlidesWidth(allSlides);
insertSlides(true);
insertSlides(false);
transformX(-initialWidth);

function slideR() {
	const counter = transformX(-allSlides[0].offsetWidth);
	console.log(counter, takeSlidesWidth(carousel.querySelectorAll("img")) );

	if(parsePX(counter) < -takeSlidesWidth(carousel.querySelectorAll("img")) + carouselWrap.offsetWidth) {
		carouselBlock.style.transition = "null";
		transformX(initialWidth + allSlides[0].offsetWidth);
		setTimeout(() => {
			carouselBlock.style.transition = "left 0.5s";
			transformX(-allSlides[0].offsetWidth)
		}, 5)
	}
}

function slideL() {
	const counter = transformX(allSlides[0].offsetWidth);

	if(parsePX(counter) > 0) {
		carouselBlock.style.transition = "null";
		transformX(-initialWidth - allSlides[0].offsetWidth);
		setTimeout(() => {
			carouselBlock.style.transition = "left 0.5s";
			transformX(allSlides[0].offsetWidth)
		}, 5)
	}
}

// const parsPX = (elem) => elem === ""
// 	? 0
// 	: parseFloat(elem)

// let removedSlides = [];
// const removeSlide = () => {
// 	allSlides = carousel.querySelectorAll("img");
// 	for(let i = 0; i < 4; i ++) {
// 		removedSlides.push(allSlides[i].cloneNode());
// 		//allSlides[i].remove();
// 	}
// } 

// const appendSlide = () => {
// 	removedSlides.forEach(slide => {
// 		carouselBlock.appendChild(slide);
// 	});
// 	removedSlides = [];
// }

// function slideR() {
// 	carouselBlock.style.left = `${parsPX(carouselBlock.style.left) - imgWidth * 2}px`;
// 	removeSlide();
// 	appendSlide();
// }

