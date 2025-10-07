// Navigation functionality

export function initNavigation() {
  setupSmoothScrolling();
  setupHeroButtons();
  setupMobileMenu();
  setupScrollEffects();
}

function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link, .footer-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const text = this.textContent.toLowerCase();
      let targetId = "";

      switch (text) {
        case "home":
          targetId = "home";
          break;
        case "about":
          targetId = "about";
          break;
        case "skills":
          targetId = "skills";
          break;
        case "projects":
          targetId = "projects";
          break;
        case "experience":
          targetId = "experience";
          break;
        case "contact":
          targetId = "contact";
          break;
        default:
          return;
      }

      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

function setupHeroButtons() {
  // Handle "View Work" button
  const viewWorkBtn = document.querySelector(".secondary-btn");
  if (viewWorkBtn) {
    viewWorkBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Handle "Download Resume" button
  const downloadBtn = document.querySelector(".primary-btn");
  if (downloadBtn && downloadBtn.textContent.includes("Download Resume")) {
    downloadBtn.addEventListener("click", function (e) {
      if (this.tagName === 'A' && this.hasAttribute('download')) {
        return;
      }

      e.preventDefault();

      const link = document.createElement("a");
      link.href = "assets/Weyehn_Reeves_Resume.pdf";
      link.download = "Weyehn_Reeves_Resume.pdf";
      link.target = "_blank";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Handle "Hire Me" buttons
  const hireBtns = document.querySelectorAll(".hire-btn, .cta-btn");
  hireBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNavLinks = document.querySelector(".nav-links");

  if (!mobileMenuBtn || !mobileNavLinks) return;

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const icon = this.querySelector("i");

    mobileNavLinks.classList.toggle("mobile-active");

    if (mobileNavLinks.classList.contains("mobile-active")) {
      icon.className = "fa-solid fa-times";
      this.setAttribute("aria-expanded", "true");
    } else {
      icon.className = "fa-solid fa-bars";
      this.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu when clicking nav links
  const navLinkElements = document.querySelectorAll(".nav-link");
  navLinkElements.forEach((link) => {
    link.addEventListener("click", function () {
      if (
        window.innerWidth <= 767 &&
        mobileNavLinks.classList.contains("mobile-active")
      ) {
        closeMobileMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (mobileNavLinks.classList.contains("mobile-active")) {
      const nav = document.querySelector(".nav-header");
      if (!nav.contains(event.target)) {
        closeMobileMenu();
      }
    }
  });

  // Close menu on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 767 && mobileNavLinks.classList.contains("mobile-active")) {
      closeMobileMenu();
    }
  });

  function closeMobileMenu() {
    mobileNavLinks.classList.remove("mobile-active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.className = "fa-solid fa-bars";
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  }
}

function setupScrollEffects() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const linkText = link.textContent.toLowerCase();
      if (linkText === current || (current === "home" && linkText === "home")) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // Header background on scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.style.backgroundColor = "rgba(0, 0, 0, 0.98)";
    } else {
      header.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
    }
  });
}
