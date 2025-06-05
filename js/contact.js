// File: contact.js
// Author: ymckay
// Date: 2025-06-04
// Version: 1.0
// Purpose: This script handles validation and submission of the contact form. It validates inputs using Bootstrap classes and downloads the form content as a .txt file. It also manages navbar behavior on scroll.
// Known bugs: None
// License: For educational use only



// Contact Form Validation
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

// Handle contact form submission and save data as a .txt file    
document.querySelector('form').addEventListener('submit', (e) => {
  // stop the form from refreshing the page
  e.preventDefault();
  // get input values from the form
  const name = document.getElementById('validationName').value;
  const email = document.getElementById('validationEmail').value;
  const message = document.getElementById('validationMessage').value;
  // format the content to be saved
  const content = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
  // create a plain text file using Blob
  const blob = new Blob([content], { type: 'text/plain' });
  // generate a download link for the file
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  // file name for download
  a.download = 'contact-message.txt';
  // trigger the download
  a.click();
  // clean up the temporary URL
  URL.revokeObjectURL(url);
});


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