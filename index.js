/*.........toggle icon  navbar........*/

window.onscroll = () =>{

    let header = document.querySelector('header');

    header.classList.toggle('sticky' , window.scrollY > 100);
}

/*.........toggle icon  navbar........*/

let menuIcon=document.querySelector('#menu-icon');
let navBar=document.querySelector('.link');

menuIcon.onclick =() => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
}

// scroll section
 let section=document.querySelectorAll('section');
 let navLink=document.querySelectorAll('header nav a');

 window.onscroll = () => {
    section.forEach(sec =>{
        let top = window.scrollY;
        let offset= sec.offsetTop - 100;
        let height= sec.offsetHeight;
        let id =sec.getAttribute('id');

        if(top >= offset && top < offset + height) {

            navLink.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            sec.classList.add('show-animate');
        }
else{
    sec.classList.remove('show-animate');
}
});
    let header =document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navBar.classList.remove('active');
 }



const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth= carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children]

let isDragging=false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
})

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
})


arrowBtns.forEach(btn => {
    btn.addEventListener("click",() => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth :  firstCardWidth
    })
})

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging=false;
    carousel.classList.remove("dragging");
}

const autoPlay = () =>{
    if(window.innerWidth < 800)
    return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const InfiniteScroll = () =>{
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - ( 2*carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if(Math.ceil(carousel.scrollLeft)===carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
   }

   clearTimeout(timeoutId);
   if(!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", InfiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

