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