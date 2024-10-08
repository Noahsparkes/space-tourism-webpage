
const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
    nav.classList.toggle("visible");
    navToggle.classList.toggle("nav-open");
})


