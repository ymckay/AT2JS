// Contact Form Validation
// This script enables Bootstrap-style validation
// for the contact form on the page.
    (() => {
      'use strict';
      // select all forms that need validation
      const forms = document.querySelectorAll('.needs-validation');
      // add validation to each form
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          // if the form is not valid, stop submission
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          // add bootstrap class to show validation feedback
          form.classList.add('was-validated');
        }, false);
      });
    })();

// handle Navbar on Scroll
// This section updates the navbar style based on scroll position.
// When the user scrolls down, the navbar gets a different class.

const navbar = document.querySelector('.navbar');
// Toggle navbar classes based on scroll position
const handleScroll = ()=> {
  const atTop = window.scrollY === 0;
  // add "visible-bar" at the top, "hidden-bar" when scrolling
  navbar.classList.toggle('visible-bar', atTop);
  navbar.classList.toggle('hidden-bar', !atTop);
};
// Listen for scroll and apply changes using requestAnimationFrame
window.addEventListener('scroll', ()=> requestAnimationFrame(handleScroll));