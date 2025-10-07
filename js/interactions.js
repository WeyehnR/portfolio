// User interaction effects
import { SOCIAL_LINKS } from './config.js';

export function initInteractions() {
  initProjectCardHovers();
  initSkillCardHovers();
  initSocialLinks();
  initProjectButtons();
  initSeeMoreButtons();
}

function initProjectCardHovers() {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

function initSkillCardHovers() {
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-12px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

function initSocialLinks() {
  const socialLinks = document.querySelectorAll(".social-link, .social-icon");
  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const icon = this.querySelector("i");
      if (icon) {
        const iconClass = icon.className;

        let url = "#";
        if (iconClass.includes("github")) {
          url = SOCIAL_LINKS.github;
        } else if (iconClass.includes("linkedin")) {
          url = SOCIAL_LINKS.linkedin;
        } else if (iconClass.includes("envelope")) {
          url = SOCIAL_LINKS.email;
        }

        if (url !== "#") {
          window.open(url, "_blank");
        }
      }
    });
  });
}

function initProjectButtons() {
  const projectBtns = document.querySelectorAll(".project-btn, .featured-btn");
  projectBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const url = this.dataset.url;
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  });
}

function initSeeMoreButtons() {
  const seeMoreBtns = document.querySelectorAll(".see-more-btn");
  seeMoreBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const projectContent = this.closest(".project-content");
      const whySection = projectContent.querySelector(".project-why");

      if (whySection) {
        if (whySection.style.display === "none") {
          whySection.style.display = "block";
          this.textContent = "See Less";
          this.classList.add("active");
        } else {
          whySection.style.display = "none";
          this.textContent = "See More";
          this.classList.remove("active");
        }
      }
    });
  });
}
