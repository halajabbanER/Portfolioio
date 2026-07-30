const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// تحقق من الوضع المحفوظ
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);
updateIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  let theme = document.documentElement.getAttribute("data-theme");

  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateIcon(theme);
});

function updateIcon(theme) {
  if (theme === "dark") {
    // وضع ليلي → أيقونة الشمس (اضغط عليها ترجع نهار)
    themeIcon.classList.remove("fa-moon", "bi-moon-fill");
    themeIcon.classList.add("fa-sun", "bi-sun-fill");
  } else {
    // وضع نهاري → أيقونة القمر (اضغط عليها ترجع ليل)
    themeIcon.classList.remove("fa-sun", "bi-sun-fill");
    themeIcon.classList.add("fa-moon", "bi-moon-fill");
  }
}
