// File: contact.js
// Author: ymckay
// Date: 2025-06-05
// Version: 1.2
// Purpose:
//   This script handles validation and submission behavior for the contact form.
//   It applies Bootstrap validation and shows a thank-you message after successful submission.
// Known bugs: None
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

// Get all buttons for toggling dark mode (both mobile and desktop)
const toggles = document.querySelectorAll("#toggleDarkMode, #toggleDarkModeDesktop");

// Get body element
const body = document.body;

// Get all cocktail logo icons (both mobile and desktop)
const cocktailIcons = document.querySelectorAll(".cocktail-icon");

// Function to update cocktail icon based on theme
function updateCocktailIcons() {
  const isDark = body.classList.contains("dark-mode");
  cocktailIcons.forEach(icon => {
    icon.src = isDark ? "./img/local_bar_white.svg" : "./img/local_bar.svg";
  });
}

// Keep the saved theme even after reloading
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggles.forEach(btn => btn.textContent = "☀️");
  updateCocktailIcons();
}

// Toggle dark mode on all matching buttons
toggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");
    toggles.forEach(btn => btn.textContent = isDark ? "☀️" : "🌙");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateCocktailIcons();
  });
});