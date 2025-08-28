// Component Loader - Dynamically loads HTML components
class ComponentLoader {
  constructor() {
    this.components = [
      { id: "navigation-container", file: "navigation.html" },
      { id: "hero-container", file: "hero.html" },
      { id: "about-container", file: "about.html" },
      { id: "skills-container", file: "skills.html" },
      { id: "tools-container", file: "tools.html" },
      { id: "projects-container", file: "projects.html" },
      { id: "experience-container", file: "experience.html" },
      { id: "contact-container", file: "contact.html" },
      { id: "footer-container", file: "footer.html" },
    ];

    this.loadedComponents = 0;
    this.totalComponents = this.components.length;
  }

  async loadComponent(containerId, filename) {
    try {
      const response = await fetch(`components/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}: ${response.status}`);
      }

      const html = await response.text();
      const container = document.getElementById(containerId);

      if (container) {
        container.innerHTML = html;
        this.loadedComponents++;

        // Trigger custom event when component is loaded
        document.dispatchEvent(
          new CustomEvent("componentLoaded", {
            detail: { containerId, filename },
          })
        );

        // Check if all components are loaded
        if (this.loadedComponents === this.totalComponents) {
          document.dispatchEvent(new CustomEvent("allComponentsLoaded"));
        }
      } else {
        console.warn(`Container with id "${containerId}" not found`);
      }
    } catch (error) {
      console.error(`Error loading component ${filename}:`, error);
    }
  }

  async loadAllComponents() {
    const loadPromises = this.components.map((component) =>
      this.loadComponent(component.id, component.file)
    );

    try {
      await Promise.all(loadPromises);
      console.log("All components loaded successfully");
    } catch (error) {
      console.error("Error loading components:", error);
    }
  }

  // Method to load a single component (useful for dynamic loading)
  async loadSingleComponent(containerId, filename) {
    await this.loadComponent(containerId, filename);
  }
}

// Initialize component loader when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const loader = new ComponentLoader();
  loader.loadAllComponents();

  // Add loading indicator
  document.body.classList.add("loading");

  // Remove loading indicator when all components are loaded
  document.addEventListener("allComponentsLoaded", function () {
    document.body.classList.remove("loading");
    console.log("Portfolio fully loaded - all components ready");

    // Add a small delay to ensure DOM elements are accessible
    setTimeout(() => {
      // Verify critical elements are available
      const header = document.getElementById("header");
      const mainContent = document.getElementById("about");

      if (header) {
        console.log("✓ Navigation component loaded successfully");
      } else {
        console.warn("⚠ Navigation component may not have loaded properly");
      }

      if (mainContent) {
        console.log("✓ Main content components loaded successfully");
      }
    }, 100);
  });
});

// Optional: Add loading styles
const style = document.createElement("style");
style.textContent = `
  body.loading {
    opacity: 0.7;
    pointer-events: none;
  }
  
  body.loading::before {
    content: "Loading...";
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #22c55e;
    color: #000;
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 9999;
    font-weight: 600;
  }
`;
document.head.appendChild(style);
