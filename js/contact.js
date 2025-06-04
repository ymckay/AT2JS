    (() => {
      'use strict';
      const forms = document.querySelectorAll('.needs-validation');
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    })();




    // handle Navbar on Scroll
const navbar = document.querySelector('.navbar');
const handleScroll = ()=> {
  const atTop = window.scrollY === 0;
  navbar.classList.toggle('visible-bar', atTop);
  navbar.classList.toggle('hidden-bar', !atTop);
};
window.addEventListener('scroll', ()=> requestAnimationFrame(handleScroll));