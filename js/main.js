const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");

  themeIcon.classList.remove("bi-moon-fill");
  themeIcon.classList.add("bi-sun-fill");
}

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  const isDarkMode = document.body.classList.contains("dark-mode");

  if (isDarkMode) {
    themeIcon.classList.remove("bi-moon-fill");
    themeIcon.classList.add("bi-sun-fill");

    localStorage.setItem("portfolioTheme", "dark");
  } else {
    themeIcon.classList.remove("bi-sun-fill");
    themeIcon.classList.add("bi-moon-fill");

    localStorage.setItem("portfolioTheme", "light");
  }
});
const searchInput = document.getElementById("projectSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");
const noProjectsMessage = document.getElementById("noProjectsMessage");

let selectedCategory = "all";

function filterProjects() {
  const searchValue = searchInput.value.toLowerCase().trim();

  let visibleProjects = 0;

  projectItems.forEach((project) => {
    const projectTitle = project.dataset.title.toLowerCase();
    const projectCategory = project.dataset.category;

    const matchesSearch = projectTitle.includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" || projectCategory === selectedCategory;

    if (matchesSearch && matchesCategory) {
      project.classList.remove("hide-project");
      visibleProjects++;
    } else {
      project.classList.add("hide-project");
    }
  });

  if (visibleProjects === 0) {
    noProjectsMessage.style.display = "block";
  } else {
    noProjectsMessage.style.display = "none";
  }
}

searchInput.addEventListener("input", filterProjects);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    selectedCategory = button.dataset.filter;

    filterProjects();
  });
});
const searchInput = document.getElementById("projectSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");
const noProjectsMessage = document.getElementById("noProjectsMessage");

let selectedCategory = "all";

function filterProjects() {
  const searchValue = searchInput.value.toLowerCase().trim();

  let visibleProjects = 0;

  projectItems.forEach((project) => {
    const projectTitle = project.dataset.title.toLowerCase();
    const projectCategory = project.dataset.category;

    const matchesSearch = projectTitle.includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" || projectCategory === selectedCategory;

    if (matchesSearch && matchesCategory) {
      project.classList.remove("hide-project");
      visibleProjects++;
    } else {
      project.classList.add("hide-project");
    }
  });

  if (visibleProjects === 0) {
    noProjectsMessage.style.display = "block";
  } else {
    noProjectsMessage.style.display = "none";
  }
}

searchInput.addEventListener("input", filterProjects);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    selectedCategory = button.dataset.filter;

    filterProjects();
  });
});