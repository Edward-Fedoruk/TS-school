// (function() {

// 	const carousel 					 = document.querySelector(".main__gallery"),
// 				prev 							 = carousel.querySelector(".prev"),
// 				next 							 = carousel.querySelector(".next"),
// 				carouselBlock 		 = carousel.querySelector(".gallery__imgs"),
// 				carouselWrap 			 = carousel.querySelector(".gallery__wrap"),
// 				allSlides 			   = carousel.querySelectorAll("img"),
// 				oneSlideWidth 		 = carousel.querySelector("img").offsetWidth,
// 				initialSlidesWidth = allSlides.length * oneSlideWidth;

// 	prev.addEventListener("click", slideLeft);
// 	next.addEventListener("click", slideRight);

// 	// make copy of slides and insert them
// 	const insertSlides = () => {
// 		allSlides.forEach(element => {
// 			carouselBlock.appendChild(element.cloneNode());
// 			carouselBlock.insertBefore(element.cloneNode(), allSlides[0]);
// 		});
// 	}
// 	insertSlides();


// 	const parsePX = elem => elem === "" ? 0 : parseFloat(elem);

// 	const incrementPos = value => parsePX(carouselBlock.style.left) + value;

// 	const transformX = width => carouselBlock.style.left = `${incrementPos(width)}px`;

// 	const unsetTrsn = () => carouselBlock.style.transition = "null";

// 	const setTrsn = () => carouselBlock.style.transition = "left 0.5s ease-in-out";


// 	function slideRight() {
// 		const counter = transformX(-oneSlideWidth);

// 		if(parsePX(counter) < -carouselBlock.offsetWidth + carouselWrap.offsetWidth) {
// 			unsetTrsn();
// 			transformX(initialSlidesWidth + oneSlideWidth);

// 			setTimeout(() => {
// 				setTrsn();
// 				transformX(-oneSlideWidth)
// 			}, 10)
// 		}
// 	}

// 	function slideLeft() {
// 		const counter = transformX(oneSlideWidth);

// 		if(parsePX(counter) > 0) {
// 			unsetTrsn();
// 			transformX(-initialSlidesWidth - oneSlideWidth);

// 			setTimeout(() => {
// 				setTrsn();
// 				transformX(oneSlideWidth);
// 			}, 10)
// 		}
// 	}

// 	slideRight();

// })();