// File: contact.js
// Author: ymckay
// Date: 2025-06-05
// Version: 1.2
// Purpose:
//   This script handles validation and submission behavior for the contact form.
//   It applies custom validation for name, email, and message fields using Bootstrap styles,
//   including instant feedback as the user types.
//   It ensures real-time feedback and prevents form submission if inputs are invalid.
//   Also shows a thank-you message upon successful submission.
// Known Issues: None
// License: For educational use only

(() => {
  'use strict';

  // Select all forms that require validation
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    const nameInput = form.querySelector("#validationName");
    const emailInput = form.querySelector("#validationEmail");
    const messageInput = form.querySelector("#validationMessage");

    // Function to apply custom validation rules
    const validateInputs = () => {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      nameInput.setCustomValidity(name.length < 3 ? "Name must be at least 3 characters." : "");
      emailInput.setCustomValidity(!emailPattern.test(email) ? "Enter valid email." : "");
      messageInput.setCustomValidity(message.length < 3 ? "Message must be at least 3 characters." : "");
    };

    // Real-time validation feedback
    [nameInput, emailInput, messageInput].forEach((input) => {
      input.addEventListener("input", () => {
        validateInputs();
        form.classList.add("was-validated");
      });
    });

    // On form submission
    form.addEventListener("submit", (event) => {
      validateInputs();

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();

        // Hide the form
        form.style.display = "none";

        // Create message container
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("thank-you-wrapper");

        // Create the thank you message
        const thankYouMessage = document.createElement("div");
        thankYouMessage.classList.add("alert", "alert-light", "text-center", "p-4");
        thankYouMessage.innerText = "Message sent! Thank you!!";

        // Insert thank-you message just before the footer
        const footer = document.querySelector("footer");
        footer.parentNode.insertBefore(messageContainer, footer);
        messageContainer.appendChild(thankYouMessage);
      }

      form.classList.add("was-validated");
    });
  });
})();