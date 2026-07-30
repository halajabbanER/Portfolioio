const themeToggle = document.getElementById("themeToggle");
const themeIcon =
  document.getElementById("themeIcon") || themeToggle?.querySelector("i");
const savedTheme = localStorage.getItem("portfolioTheme");

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = isDark ? "dark" : "light";

  if (themeIcon) {
    themeIcon.classList.toggle("bi-moon-fill", !isDark);
    themeIcon.classList.toggle("bi-sun-fill", isDark);
  }

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme",
    );
  }
}
