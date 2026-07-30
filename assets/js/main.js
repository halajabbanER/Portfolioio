
applyTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  localStorage.setItem("portfolioTheme", nextTheme);
});
const languageBtn = document.getElementById("languageBtn");
const languageMenu = document.getElementById("languageMenu");

languageBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  languageMenu.classList.toggle("show");
});

document.addEventListener("click", function () {
  languageMenu.classList.remove("show");
});
