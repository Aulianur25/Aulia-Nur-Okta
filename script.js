const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const currentYear = document.getElementById("currentYear");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);

  if (theme === "dark") {
    themeIcon.textContent = "☀";
    themeToggle.setAttribute("aria-label", "Aktifkan light mode");
  } else {
    themeIcon.textContent = "☾";
    themeToggle.setAttribute("aria-label", "Aktifkan dark mode");
  }
}

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

setTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  const activeTheme = root.getAttribute("data-theme");
  setTheme(activeTheme === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
  );
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
  });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

currentYear.textContent = new Date().getFullYear();