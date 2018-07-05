// (function() {
 
//   const slider		 = document.querySelector(".content__slider"),
//   			control    = document.querySelectorAll(".content__slide"),
//   			prev 		   = slider.querySelector(".content__prev"),
//   			next       = slider.querySelector(".content__next"),
//   			sliderIMG  = slider.querySelector(".content__slideIMG"),
//   			imgAmount  = sliderIMG.querySelectorAll("img").length,
//   			slideWidth = sliderIMG.clientWidth;
  			
//   let widthCounter = 0;
//   let slideCounter = 0;
  
//   //prev.style.display = "none";
  
//   next.addEventListener("click", slideRight);
//   prev.addEventListener("click", slideLeft);
  
//   const checkFirstSlide = (cWidth, sWidth, p) => 
//   	cWidth >= -sWidth ? p.style.display = "none" : 0
  
//   const checkLastSlide = (cWidth, sWidth, sAmount, n) => 
//   	cWidth <= -sWidth * (sAmount - 2) ? n.style.display = "none" : 0
  
//   const displayArrow = arrow => {
//  		if(arrow.style.display === "none") 
//  			arrow.style.display = "flex"
//   }
 
//   const scroll = width => sliderIMG.style.left = `${widthCounter += width}px`
  
//   function slideLeft() {
//   	checkFirstSlide(widthCounter, slideWidth, prev);
//  		displayArrow(next);
//  		scroll(slideWidth);
 
//   // selecting img number
//   	control[slideCounter].classList.remove("selectedSlide");
//   	slideCounter--;
//  		control[slideCounter].classList.add("selectedSlide");
//   }
	
//   function slideRight() {
//   	checkLastSlide(widthCounter, slideWidth, imgAmount, next);
//  	  displayArrow(prev);
//  	  scroll(-slideWidth);
 	
//  	// selecting img number
//   	slideCounter++;
//   	control[slideCounter].classList.add("selectedSlide");
//   	control[--slideCounter].classList.remove("selectedSlide");
//  	  slideCounter++;
//   } 
 
// })();

// (function() {

// 	const carousel 					 = document.querySelector(".slide__wrapper"),
// 				prev 							 = carousel.querySelector(".content__prev"),
// 				next 							 = carousel.querySelector(".content__next"),
// 				carouselBlock 		 = carousel.querySelector(".content__slideIMG"),
// 				carouselWrap 			 = carousel.querySelector(".content__slider"),
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

// 	//slideRight();

// })();

class Carousel {
	constructor(wrapper, prevButton, nextButton, imageWrapper, slides, timeFunction, autoSliding = {}) {
		this.wrapper 				= document.querySelector(wrapper);
		this.prevButton 		= this.wrapper.querySelector(prevButton);
		this.nextButton 		= this.wrapper.querySelector(nextButton);
		this.imageWrapper 	= this.wrapper.querySelector(imageWrapper);
		this.allSlides 			= this.imageWrapper.querySelectorAll(slides);
		this.oneSlideWidth 	= this.allSlides[0].offsetWidth;
		this.allSlidesWidth = this.oneSlideWidth * this.allSlides.length;
		this.timeFunction 	= `left ${timeFunction}`;
		this.rightCounter 	= this.allSlides.length;

		this.insertSlides();
		this.setInitialPosition();
		this.setEvent();

		if(autoSliding.start) this.startAutoSliding(autoSliding.time);
	}

	setEvent() {
		this.prevButton.addEventListener("click", this.slideLeft.bind(this));
		this.nextButton.addEventListener("click", this.slideRight.bind(this));
	}

	setNextPosition(width) {
		this.nextLeftValue = width + parseFloat(this.imageWrapper.style.left);
		this.imageWrapper.style.left = `${this.nextLeftValue}px`;
	}

	unsetPosition() {
		this.imageWrapper.style.transition = "null";
		this.imageWrapper.style.left = `-${this.allSlidesWidth}px`;
	}

	slideLeft() {
		this.setNextPosition(this.oneSlideWidth);
		
		if(this.nextLeftValue > 0) {
			this.unsetPosition();
			setTimeout(() => {
				this.imageWrapper.style.transition = this.timeFunction;
				this.slideLeft();
			}, 50)

			this.rightCounter = this.allSlides.length + 1;
		}
		this.rightCounter--;
	}

	slideRight() {
		this.setNextPosition(-this.oneSlideWidth);
		this.rightCounter++;										

		if(this.rightCounter > this.allSlides.length * 2) {
			this.unsetPosition();
			setTimeout(() => {
				this.imageWrapper.style.transition = this.timeFunction;
				this.slideRight();
			}, 50)

			this.rightCounter = this.allSlides.length;
		}
	}

	setInitialPosition() {
		this.imageWrapper.style.transition = "null";
		this.imageWrapper.style.left = `-${this.allSlidesWidth}px`;
		setTimeout(() => this.imageWrapper.style.transition = this.timeFunction);
	}

	insertSlides() {
		this.allSlides.forEach(element => {
			this.imageWrapper.appendChild(element.cloneNode());
			this.imageWrapper.insertBefore(element.cloneNode(), this.allSlides[0]);
		});
	}

	startAutoSliding(time) {
		setInterval(() => this.slideRight(), time);
	}
}

new Carousel(".content__slider", 
						 ".content__prev", 
						 ".content__next", 
						 ".content__slideIMG", 
						 "img",
						 "0.5s ease-out",
						 {start: true, time: 3000});

new Carousel(".gallery__wrap", 
						 ".gallery__prev", 
						 ".gallery__next", 
						 ".gallery__imgs", 
						 "img",
						 "0.5s ease-out");


//car.nextButton.addEventListener("click", car.slideRight);

// class User {
// 	constructor(firstName, lastName) {
// 		this.firstName = firstName;
// 		this.lastName = lastName;
// 	}

// 	createGuest() {
// 		return this.firstName;
// 	}
// };

// let user = new User("s", "b");

// console.log( user.createGuest() ); // Гость

// console.log( User.createGuest ); // createGuest ... (функция)