// Wait for components to be fully loaded before initializing
document.addEventListener("allComponentsLoaded", function () {
  // Initialize all functionality after components are loaded
  initNavigation();
  initScrollEffects();
  initFormHandling();
  initAnimations();
});

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for navigation links
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

    // Handle hero CTA buttons
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

    // Handle download resume button
    const downloadBtn = document.querySelector(".primary-btn");
    if (downloadBtn && downloadBtn.textContent.includes("Download Resume")) {
      downloadBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Create a temporary anchor element for download
        const link = document.createElement("a");
        link.href = "assets/Weyehn_Reeves_Resume.pdf";
        link.download = "Weyehn_Reeves_Resume.pdf";
        link.target = "_blank";

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    // Handle hire me buttons
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

  // Scroll effects and active navigation
  function initScrollEffects() {
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
        if (
          linkText === current ||
          (current === "home" && linkText === "home")
        ) {
          link.classList.add("active");
        }
      });
    }

    // Update active nav on scroll
    window.addEventListener("scroll", updateActiveNav);

    // Initial call
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

  // Form handling
  function initFormHandling() {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const formValues = {};

        // Get all form inputs
        const inputs = contactForm.querySelectorAll("input, select, textarea");
        inputs.forEach((input) => {
          if (input.name) {
            formValues[input.name] = input.value;
          }
        });

        // Basic validation
        const requiredFields = contactForm.querySelectorAll("[required]");
        let isValid = true;

        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = "#ef4444";

            // Reset border color after 3 seconds
            setTimeout(() => {
              field.style.borderColor = "#3f3f46";
            }, 3000);
          }
        });

        if (isValid) {
          // Simulate form submission
          const submitBtn = contactForm.querySelector(".form-submit");
          const originalText = submitBtn.innerHTML;

          submitBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
          submitBtn.disabled = true;

          // Simulate API call
          setTimeout(() => {
            alert("Thank you for your message! I'll get back to you soon.");
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 2000);
        } else {
          alert("Please fill in all required fields.");
        }
      });
    }
  }

  // Animation and interaction effects
  function initAnimations() {
    // Project card hover effects
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });

    // Skill card hover effects
    const skillCards = document.querySelectorAll(".skill-card");
    skillCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-12px)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });

    // Social link interactions
    const socialLinks = document.querySelectorAll(".social-link, .social-icon");
    socialLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const icon = this.querySelector("i");
        if (icon) {
          const iconClass = icon.className;

          // Simulate social media links
          let url = "#";
          if (iconClass.includes("github")) {
            url = "https://github.com/WeyehnR";
          } else if (iconClass.includes("linkedin")) {
            url = "https://www.linkedin.com/in/weyehnr01/";
          } else if (iconClass.includes("envelope")) {
            url = "mailto:weyehn1@gmail.com";
          }

          if (url !== "#") {
            window.open(url, "_blank");
          }
        }
      });
    });

    // Project button interactions
    const projectBtns = document.querySelectorAll(
      ".project-btn, .featured-btn"
    );
    projectBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const url = this.dataset.url;
        if (url) {
          window.open(url, "_blank", "noopener,noreferrer");
        }
      });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      ".skill-card, .project-card, .timeline-item, .stat-card, .service-item"
    );

    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

    // Typewriter effect completion handler
    const typewriterElement = document.querySelector(".typewriter");
    if (typewriterElement) {
      // Remove typewriter border after animation completes
      setTimeout(() => {
        typewriterElement.style.borderRight = "none";
      }, 4500);
    }
  }

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("mobile-active");

      // Toggle hamburger icon
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("mobile-active");
        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });
  }

  // Scroll to top functionality
  let scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #22c55e;
        color: #000;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 18px;
    `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.visibility = "visible";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.visibility = "hidden";
    }
  });

  // Scroll to top when clicked
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Preloader (optional)
  const preloader = document.createElement("div");
  preloader.id = "preloader";
  preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
  preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;

  const preloaderContent = preloader.querySelector(".preloader-content");
  if (preloaderContent) {
    preloaderContent.style.cssText = `
            text-align: center;
            color: #fff;
        `;
  }

  // Add spinner styles
  const spinnerStyle = document.createElement("style");
  spinnerStyle.textContent = `
        .preloader-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #333;
            border-top: 4px solid #22c55e;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(spinnerStyle);
  document.body.appendChild(preloader);

  // Hide preloader when page loads
  window.addEventListener("load", function () {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.remove();
        spinnerStyle.remove();
      }, 500);
    }, 1000);
  });

  // Performance optimization - lazy loading images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }


// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Export functions for external use if needed
window.portfolioJS = {
  debounce,
  throttle,
};
