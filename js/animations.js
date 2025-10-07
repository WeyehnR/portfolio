// Animation and fade effects
import { throttle } from './utils.js';

export function initAnimations() {
  initHeroFadeEffect();
  initSectionFadeEffect(["about", "experience", "projects", "skills", "tools"]);
  initCardAnimations();
  initScrollToTop();
  initLazyLoading();
}

function initHeroFadeEffect() {
  initSectionFadeEffect(["home"]);
}

function initSectionFadeEffect(sectionIds) {
  sectionIds.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const updateSectionOpacity = throttle(() => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      let visibilityRatio;

      if (rect.top >= 0) {
        visibilityRatio = Math.min(1, rect.bottom / viewportHeight);
      } else if (rect.bottom <= viewportHeight) {
        visibilityRatio = Math.max(0, rect.bottom / viewportHeight);
      } else {
        visibilityRatio = 1;
      }

      visibilityRatio = Math.max(0, Math.min(1, visibilityRatio));

      let opacity;
      if (sectionId === 'skills') {
        opacity = Math.max(0.3, visibilityRatio);
      } else {
        opacity = Math.pow(visibilityRatio, 3);
      }

      section.style.opacity = opacity;
    }, 16);

    window.addEventListener("scroll", updateSectionOpacity);
    updateSectionOpacity();
  });
}

function initCardAnimations() {
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

  const animatedElements = document.querySelectorAll(
    ".skill-card, .project-card, .timeline-item, .stat-card, .service-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Typewriter effect completion
  const typewriterElement = document.querySelector(".typewriter");
  if (typewriterElement) {
    setTimeout(() => {
      typewriterElement.style.borderRight = "none";
    }, 4500);
  }
}

function initScrollToTop() {
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

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.visibility = "visible";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.visibility = "hidden";
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function initLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
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
}
