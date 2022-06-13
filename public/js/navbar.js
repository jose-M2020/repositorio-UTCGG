
//------------------ Navbar ------------------


const body = document.body,
      navbar = document.querySelector('.navbar'),
      scrollUp = "scroll-up",
      scrollDown = "scroll-down";

let lastScroll = 0;

const listenScrollEvent = () => {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
  
    if(currentScroll <= 15){
      navbar.classList.remove(scrollDown);
    }else if(currentScroll > 15){
      navbar.classList.add(scrollDown);
    }
    
    
    // Ocultar navbar al hacer scroll abajo y mostrar hacia arriba
  
    // if (currentScroll <= 0) {
    //   body.classList.remove(scrollUp);
    //   return;
    // }
  
    // if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    //   // down
    //   body.classList.remove(scrollUp);
    //   body.classList.add(scrollDown);
    // } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
    //   // up
    //   body.classList.remove(scrollDown);
    //   body.classList.add(scrollUp);
    // }
    
    // lastScroll = currentScroll;
  });
}

if(window.location.pathname === '/'){
  listenScrollEvent();
} else {
  navbar.classList.add(scrollDown);
}
