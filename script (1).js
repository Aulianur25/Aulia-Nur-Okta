const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const currentYear = document.getElementById("year");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.innerHTML = "<span class='icon'>☀️</span>";
} else {
  themeToggle.innerHTML = "<span class='icon'>🌙</span>";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.innerHTML = isDark
    ? "<span class='icon'>☀️</span>"
    : "<span class='icon'>🌙</span>";
});

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

currentYear.textContent = new Date().getFullYear();