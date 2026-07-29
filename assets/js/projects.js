const projectsContainer = document.getElementById("projectsContainer");
const searchInput = document.getElementById("projectSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const noProjectsMessage = document.getElementById("noProjectsMessage");

let projects = [];
let selectedCategory = "all";

function createLink(href, className, iconName, label) {
  if (!href || href === "#") return null;

  const link = document.createElement("a");
  const icon = document.createElement("i");
  link.href = href;
  link.className = `project-btn ${className}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `${label} for this project`);
  icon.className = `bi ${iconName}`;
  icon.setAttribute("aria-hidden", "true");
  link.append(icon, document.createTextNode(label));
  return link;
}

function createProjectImage(project) {
  const media = document.createElement("div");
  const fallback = document.createElement("i");
  media.className = "project-card-image";
  fallback.className = "bi bi-code-square project-image-fallback";
  fallback.setAttribute("aria-hidden", "true");
  media.append(fallback);

  if (project.image) {
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = `${project.title} preview`;
    image.loading = "lazy";
    image.addEventListener("load", () => fallback.remove());
    image.addEventListener("error", () => image.remove());
    media.prepend(image);
  }

  return media;
}
function createProjectCard(project) {
  const column = document.createElement("div");
  const card = document.createElement("article");
  const content = document.createElement("div");
  const tags = document.createElement("div");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const buttons = document.createElement("div");

  column.className = "col-md-6 col-lg-4";
  card.className = "project-card";
  content.className = "project-card-content";
  tags.className = "project-tags";
  buttons.className = "project-buttons";

  title.textContent = project.title;
  description.textContent = project.description;

  tags.append(
    ...project.tags.map((tag) => {
      const item = document.createElement("span");
      item.textContent = tag;
      return item;
    }),
  );

  // Details button
  const detailsLink = document.createElement("a");
  const detailsIcon = document.createElement("i");

  detailsLink.href = `project-details.html?id=${project.id}`;
  detailsLink.className = "project-btn details-btn";
  detailsLink.setAttribute("aria-label", `View details for ${project.title}`);

  detailsIcon.className = "bi bi-eye";
  detailsIcon.setAttribute("aria-hidden", "true");

  detailsLink.append(detailsIcon, document.createTextNode("Details"));

  const links = [
    createLink(project.githubLink, "github-btn", "bi-github", "GitHub"),

    createLink(
      project.demoLink,
      "demo-btn",
      "bi-box-arrow-up-right",
      "Live Demo",
    ),

    detailsLink,
  ].filter(Boolean);

  buttons.append(...links);

  content.append(tags, title, description, buttons);

  card.append(createProjectImage(project), content);

  column.append(card);

  return column;
}

function displayProjects(projectList) {
  projectsContainer.replaceChildren(...projectList.map(createProjectCard));
  noProjectsMessage.style.display = projectList.length ? "none" : "block";
}

function filterProjects() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchValue);
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  displayProjects(filteredProjects);
}

async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) throw new Error("Projects could not be loaded.");
    projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error(error);
    projectsContainer.innerHTML = `
      <div class="col-12">
        <p class="text-center text-danger">Projects could not be loaded.</p>
      </div>
    `;
  }
}

searchInput?.addEventListener("input", filterProjects);
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedCategory = button.dataset.filter;
    filterProjects();
  });
});

if (projectsContainer && searchInput && noProjectsMessage) loadProjects();
document.documentElement.setAttribute("data-theme", "dark");