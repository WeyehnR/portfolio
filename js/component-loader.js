// Component Loader - Dynamically loads HTML components
class ComponentLoader {
  constructor() {
    this.components = [
      { id: "navigation-container", file: "navigation.html", name: "Navigation" },
      { id: "hero-container", file: "hero.html", name: "Hero" },
      { id: "about-container", file: "about.html", name: "About" },
      { id: "skills-container", file: "skills.html", name: "Skills" },
      { id: "projects-container", file: "projects.html", name: "Projects" },
      { id: "experience-container", file: "experience.html", name: "Experience" },
      { id: "contact-container", file: "contact.html", name: "Contact" },
      { id: "footer-container", file: "footer.html", name: "Footer" },
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

        document.dispatchEvent(
          new CustomEvent("componentLoaded", {
            detail: { containerId, filename },
          })
        );

        if (this.loadedComponents === this.totalComponents) {
          document.dispatchEvent(new CustomEvent("allComponentsLoaded"));
        }
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
    } catch (error) {
      console.error("Error loading components:", error);
    }
  }

  async loadSingleComponent(containerId, filename) {
    await this.loadComponent(containerId, filename);
  }
}

// Initialize component loader when DOM is ready
let loader;

document.addEventListener("DOMContentLoaded", function () {
  loader = new ComponentLoader();
  loader.loadAllComponents();
});
