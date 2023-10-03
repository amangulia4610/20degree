function loco() {

    gsap.registerPlugin(ScrollTrigger);
  
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
  
    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
  
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }
  loco()
  var index = 0;
  var slides = document.querySelectorAll(".slides");
  var dot = document.querySelectorAll(".dot");
  
  function changeSlide(){
  
    if(index<0){
      index = slides.length-1;
    }
    
    if(index>slides.length-1){
      index = 0;
    }
    
    for(let i=0;i<slides.length;i++){
      slides[i].style.display = "none";
      dot[i].classList.remove("active");
    }
    
    slides[index].style.display= "block";
    dot[index].classList.add("active");
    
    index++;
    
    setTimeout(changeSlide,2500);
    
  }
  
  changeSlide();
  

  gsap.from(".logo", {
    x: -300,
    scale:0,
    opacity: 0,
    ease: "power1",
    duration:0.5,
  });
  gsap.from(".page1-h2,.page1-h4,.page1-leftimg,.early", {
    y:50,
    opacity:0,
    ease: "easeIn",
    stagger: {
      each: 0.15,
    },
    delay:0.5,
  });
  
  gsap.from("#slider", {
    x: 200,
    opacity: 0,
    ease: "power1",
    duration:1,
    delay:0.75,
  });
  
  gsap.from("header,.page1", {
    opacity: 0,
    ease: "power1",
    duration:1,
  });
  gsap.to(".join h3", {
     scrollTrigger: {
    trigger: ".page1",
    start: 'bottom 80%',
    end: 'bottom 70%',
    scroller: ".main",
    scrub: 1,
  },
  opacity: 0.1,
  });
  
  gsap.to(".page1 .left,.page1 .right", {
    scrollTrigger: {
   trigger: ".page1",
   start: 'bottom 70%',
   end: 'bottom 60%',
   scroller: ".main",
   scrub: 1,
 },
 opacity: 0,
 });
// GSAP ScrollTrigger
// gsap.registerPlugin(ScrollTrigger);

// Scroll left pin right
// gsap.to(".page2-right", {
//     x: "-50%",
//     duration: 1,
//     ease: Power3.easeInOut,
//     scrollTrigger: {
//         trigger: ".page2",
//         pin: true,
//         scrub: true,
//         start: "top top",
//         end: "bottom bottom",
//     },
// });
ScrollTrigger.create({
    trigger: ".page2",
    start: "top top",
    end: "bottom bottom",
    pin: ".page2-right",
    pinSpacing: false, // Adjust this option if needed
  });
  