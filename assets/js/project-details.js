const projectDetailsContainer = document.getElementById("projectDetails");

async function loadProjectDetails() {
  // التأكد من وجود العنصر في الصفحة أولاً
  if (!projectDetailsContainer) return;

  try {
    const params = new URLSearchParams(window.location.search);
    const rawId = params.get("id");

    // التحقق من وجود المعرّف وصحته (بما في ذلك المعرّف الرقمي 0)
    if (rawId === null || rawId.trim() === "" || isNaN(Number(rawId))) {
      projectDetailsContainer.innerHTML = `
        <h2 class="text-center text-danger">
          Project ID is missing or invalid.
        </h2>
      `;
      return;
    }

    const projectId = Number(rawId);

    const response = await fetch("data/projects.json");

    if (!response.ok) {
      throw new Error(`JSON file error: ${response.status}`);
    }

    const projects = await response.json();
    const project = projects.find((item) => Number(item.id) === projectId);

    if (!project) {
      projectDetailsContainer.innerHTML = `
        <h2 class="text-center text-danger">
          Project not found.
        </h2>
      `;
      return;
    }

    displayProjectDetails(project);
  } catch (error) {
    console.error("Details Error:", error);

    projectDetailsContainer.innerHTML = `
      <div class="text-center">
        <h2 class="text-danger">
          Project details could not be loaded.
        </h2>
        <p>${error.message}</p>
      </div>
    `;
  }
}

function displayProjectDetails(project) {
  const technologies = project.technologies || project.tags || [];

  const technologiesHTML = technologies
    .map(
      (item) => `
        <span class="details-tag">
          ${item}
        </span>
      `,
    )
    .join("");

  const features = project.features || [];
  const featuresHTML =
    features.length > 0
      ? features
          .map(
            (feature) => `
              <li>
                <i class="bi bi-check-circle-fill"></i>
                ${feature}
              </li>
            `,
          )
          .join("")
      : "<li>No additional features were added.</li>";

  projectDetailsContainer.innerHTML = `
    <a href="projects.html" class="back-projects-link">
      <i class="bi bi-arrow-left"></i>
      Back to Projects
    </a>

    <article class="project-details-card">
      <div class="details-image-wrapper">
        <img
          src="${project.image}"
          alt="${project.title}"
          class="details-image"
        />
      </div>

      <div class="details-content">
        <span class="details-category">
          ${project.category}
        </span>

        <h1>${project.title}</h1>

        <p class="details-description">
          ${project.description}
        </p>

        <section class="details-block">
          <h2>Project Overview</h2>
          <p>${project.overview || project.description}</p>
        </section>

        <section class="details-block">
          <h2>Technologies</h2>

          <div class="details-tags">
            ${technologiesHTML}
          </div>
        </section>

        <section class="details-block">
          <h2>Features</h2>
          <ul class="details-features">
            ${featuresHTML}
          </ul>
        </section>

        <div class="details-buttons">
          ${
            project.githubLink && project.githubLink !== "#"
              ? `
                <a
                  href="${project.githubLink}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="details-btn github-details-btn"
                >
                  <i class="bi bi-github"></i>
                  GitHub
                </a>
              `
              : ""
          }

          ${
            project.demoLink && project.demoLink !== "#"
              ? `
                <a
                  href="${project.demoLink}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="details-btn demo-details-btn"
                >
                  <i class="bi bi-box-arrow-up-right"></i>
                  Live Demo
                </a>
              `
              : ""
          }
        </div>
      </div>
    </article>
  `;
}
loadProjectDetails();
