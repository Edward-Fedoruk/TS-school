(function() {
 
  const slider		 = document.querySelector(".content__slider"),
  			control    = document.querySelectorAll(".content__slide"),
  			prev 		   = slider.querySelector(".content__prev"),
  			next       = slider.querySelector(".content__next"),
  			sliderIMG  = slider.querySelector(".content__slideIMG"),
  			imgAmount  = sliderIMG.querySelectorAll("img").length,
  			slideWidth = sliderIMG.clientWidth;
  			
  let widthCounter = 0;
  let slideCounter = 0;
  
  prev.style.display = "none";
  
  next.addEventListener("click", slideRight);
  prev.addEventListener("click", slideLeft);
  
  const checkFirstSlide = (cWidth, sWidth, p) => 
  	cWidth >= -sWidth ? p.style.display = "none" : 0
  
  const checkLastSlide = (cWidth, sWidth, sAmount, n) => 
  	cWidth <= -sWidth * (sAmount - 2) ? n.style.display = "none" : 0
  
  const displayArrow = arrow => {
 		if(arrow.style.display === "none") 
 			arrow.style.display = "flex"
  }
 
  const scroll = width => sliderIMG.style.left = `${widthCounter += width}px`
  
  function slideLeft() {
  	checkFirstSlide(widthCounter, slideWidth, prev);
 		displayArrow(next);
 		scroll(slideWidth);
 
  // selecting img number
  	control[slideCounter].classList.remove("selectedSlide");
  	slideCounter--;
 		control[slideCounter].classList.add("selectedSlide");
  }
	
  control[0].classList.add("selectedSlide");
  function slideRight() {
  	checkLastSlide(widthCounter, slideWidth, imgAmount, next);
 	  displayArrow(prev);
 	  scroll(-slideWidth);
 	
 	// selecting img number
  	slideCounter++;
  	control[slideCounter].classList.add("selectedSlide");
  	control[--slideCounter].classList.remove("selectedSlide");
 	  slideCounter++;
  } 
 
})();