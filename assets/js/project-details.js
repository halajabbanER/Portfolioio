const detailsCard = document.getElementById("projectDetails");
const statusMessage = document.getElementById("projectStatus");
const projectMedia = document.getElementById("projectMedia");
const projectIcon = document.getElementById("projectIcon");
const projectTags = document.getElementById("projectTags");
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");
const projectLinks = document.getElementById("projectLinks");

function createProjectLink(href, className, iconName, label) {
  if (!href || href === "#") return null;
  const link = document.createElement("a");
  const icon = document.createElement("i");
  link.href = href;
  link.className = `project-btn ${className}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  icon.className = `bi ${iconName}`;
  icon.setAttribute("aria-hidden", "true");
  link.append(icon, document.createTextNode(label));
  return link;
}

function showProjectImage(project) {
  if (!project.image) return;
  const image = document.createElement("img");
  image.src = project.image;
  image.alt = `${project.title} preview`;
  image.addEventListener("load", () => projectIcon.remove());
  image.addEventListener("error", () => image.remove());
  projectMedia.prepend(image);
}

function showProject(project) {
  document.title = `${project.title} | Hala Jabban`;
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  showProjectImage(project);
  projectTags.replaceChildren(
    ...project.tags.map((tag) => {
      const item = document.createElement("span");
      item.textContent = tag;
      return item;
    }),
  );

  const links = [
    createProjectLink(project.githubLink, "github-btn", "bi-github", "GitHub"),
    createProjectLink(project.demoLink, "demo-btn", "bi-box-arrow-up-right", "Live Demo"),
  ].filter(Boolean);
  projectLinks.replaceChildren(...links);
  detailsCard.hidden = false;
  statusMessage.hidden = true;
}

async function loadProject() {
  const projectId = Number(new URLSearchParams(window.location.search).get("id"));
  if (!Number.isInteger(projectId) || projectId < 1) {
    statusMessage.textContent = "No project was selected.";
    return;
  }

  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) throw new Error("Projects could not be loaded.");
    const projects = await response.json();
    const project = projects.find((item) => item.id === projectId);
    if (!project) {
      statusMessage.textContent = "Project not found.";
      return;
    }
    showProject(project);
  } catch (error) {
    console.error(error);
    statusMessage.textContent = "Project details could not be loaded.";
  }
}

loadProject();
