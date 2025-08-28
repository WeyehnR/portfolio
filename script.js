// Smooth scrolling for navigation
document.addEventListener("DOMContentLoaded", function () {
  // Navigation handling
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      // Update active nav
      document
        .querySelectorAll(".nav-item")
        .forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");

      // Scroll to section
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Play button animation
  document
    .querySelector(".play-button")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const projects = document.getElementById("projects");
      projects.scrollIntoView({ behavior: "smooth" });
    });

  // Project card interactions
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", function () {
      // Simulate project view
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);
    });
  });

  // Now playing controls
  const playBtn = document.querySelector(".control-btn.play");
  let isPlaying = false;

  playBtn.addEventListener("click", function () {
    isPlaying = !isPlaying;
    this.innerHTML = isPlaying ? "⏸" : "▶";
  });
});
