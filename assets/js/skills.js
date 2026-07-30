
/**
 * Skills Progress Bars — Single Source of Truth
 * Reads the displayed percentage from .skill-percentage and drives the
 * .skill-progress-bar width directly. Auto-updates if the text changes.
 */

function updateSkillBars() {
  const skillItems = document.querySelectorAll(".skills-section .skill-item");

  skillItems.forEach((item) => {
    const percentageEl = item.querySelector(".skill-percentage");
    const progressBar = item.querySelector(".skill-progress-bar");

    if (!percentageEl || !progressBar) return;

    const rawText = percentageEl.textContent.replace("%", "").trim();
    const percentage = Number.parseFloat(rawText);

    if (!Number.isFinite(percentage)) return;

    const normalized = Math.min(100, Math.max(0, percentage));

    // Restart the CSS animation from 0 so it always visually fills to the
    // value declared in the HTML text.
    progressBar.style.animation = "none";
    void progressBar.offsetHeight; // force reflow
    progressBar.style.width = `${normalized}%`;
    progressBar.style.animation = "";
  });
}

/* Initial run ---------------------------------------------------------- */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateSkillBars);
} else {
  updateSkillBars();
}

/* Auto-update when percentage text changes ----------------------------- */
const percentageObserver = new MutationObserver((mutations) => {
  const hasSkillChange = mutations.some((mutation) => {
    const target =
      mutation.target.nodeType === 3
        ? mutation.target.parentElement
        : mutation.target;
    return target?.closest?.(".skill-percentage");
  });

  if (hasSkillChange) updateSkillBars();
});

document.querySelectorAll(".skills-section .skill-percentage").forEach((el) => {
  percentageObserver.observe(el, {
    characterData: true,
    childList: true,
    subtree: true,
  });
});