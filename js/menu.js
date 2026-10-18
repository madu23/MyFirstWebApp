document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const mobileViewport = window.matchMedia("(max-width: 860px)");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
  primaryNav.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a") && mobileViewport.matches) {
    setMenuOpen(false);
  }
});

mobileViewport.addEventListener("change", () => setMenuOpen(false));

const contactForm = document.querySelector("#contact-form");
const nameField = document.querySelector("#contact-name");
const emailField = document.querySelector("#contact-email");
const messageField = document.querySelector("#contact-message");
const submitButton = document.querySelector("#contact-submit");
const messageWordCount = document.querySelector("#message-word-count");
const touchedFields = new Set();
const wordLimit = 100;

function setFieldError(field, message) {
  const errorElement = document.querySelector(`#${field.id}-error`);
  errorElement.textContent = message;
  field.setAttribute("aria-invalid", String(Boolean(message)));
}

function validateName() {
  const isValid = nameField.value.trim().length > 0;
  setFieldError(nameField, !isValid && touchedFields.has(nameField) ? "Name is required" : "");
  return isValid;
}

function validateEmail() {
  const email = emailField.value.trim();
  let error = "";

  if (!email) {
    error = "Email is required";
  } else if (!emailField.validity.valid) {
    error = "Enter a valid email address";
  }

  setFieldError(emailField, touchedFields.has(emailField) ? error : "");
  return error === "";
}

function validateMessage() {
  const message = messageField.value.trim();
  const words = message.match(/\S+/g) || [];
  let error = "";

  if (!message) {
    error = "Message is required";
  } else if (words.length > wordLimit) {
    error = `Message must be ${wordLimit} words or fewer`;
  }

  setFieldError(messageField, touchedFields.has(messageField) ? error : "");
  messageWordCount.textContent = `${words.length} / ${wordLimit} words`;
  return error === "";
}

function updateFormState() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();
  const isFormValid = isNameValid && isEmailValid && isMessageValid;
  submitButton.disabled = !isFormValid;
}

[nameField, emailField, messageField].forEach((field) => {
  field.addEventListener("blur", () => {
    touchedFields.add(field);
    updateFormState();
  });

  field.addEventListener("input", updateFormState);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  touchedFields.add(nameField);
  touchedFields.add(emailField);
  touchedFields.add(messageField);
  updateFormState();

  if (submitButton.disabled) {
    contactForm.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  window.alert(`Hi ${nameField.value.trim()}! Thanks for your message. This form does not send messages yet.`);
  contactForm.reset();
  touchedFields.clear();
  updateFormState();
});

updateFormState();
