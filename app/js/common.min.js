
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

		if(autoSliding.start) {
			this.startAutoSliding(autoSliding.time);
		}
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
			}, 10)

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
			}, 10)

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
						 {start: true, time: 5000});

new Carousel(".gallery__wrap", 
						 ".gallery__prev", 
						 ".gallery__next", 
						 ".gallery__imgs", 
						 "img",
						 "0.5s ease-out");

