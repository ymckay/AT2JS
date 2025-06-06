// File: contact.js
// Author: ymckay
// Date: 2025-06-05
// Version: 1.1
// Purpose:
//   This script handles validation and submission behavior for the contact form.
//   It applies custom validation for name, email, and message fields using Bootstrap styles,
//   including instant feedback as the user types.
//   It ensures real-time feedback and prevents form submission if inputs are invalid.
// Known Issues: None
// License: For educational use only

(() => {
  'use strict';

  // Select all forms that require validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    const nameInput = form.querySelector('#validationName');
    const emailInput = form.querySelector('#validationEmail');
    const messageInput = form.querySelector('#validationMessage');

    // Function to apply custom validation rules
    const validateInputs = () => {
      const nameValue = nameInput.value.trim();
      const emailValue = emailInput.value.trim();
      const messageValue = messageInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate email format
      if (!emailPattern.test(emailValue)) {
        emailInput.setCustomValidity('Please enter a valid email address.');
      } else {
        emailInput.setCustomValidity('');
      }

      // Validate name: at least 3 characters
      if (nameValue.length < 3) {
        nameInput.setCustomValidity('Name must be at least 3 characters.');
      } else {
        nameInput.setCustomValidity('');
      }

      // Validate message: at least 3 characters
      if (messageValue.length < 3) {
        messageInput.setCustomValidity('Message must be at least 3 characters.');
      } else {
        messageInput.setCustomValidity('');
      }
    };

    // Enable real-time validation feedback as user types
    [nameInput, emailInput, messageInput].forEach(input => {
      input.addEventListener('input', () => {
        validateInputs();
        form.classList.add('was-validated'); // Trigger Bootstrap styling
      });
    });

    // On form submission
    form.addEventListener('submit', event => {
      validateInputs();

      // Prevent submission if form is invalid
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Add Bootstrap validation styling
      form.classList.add('was-validated');
    });
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