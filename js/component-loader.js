// Component Loader - Dynamically loads HTML components
class ComponentLoader {
  constructor() {
    this.components = [
      {
        id: "navigation-container",
        file: "navigation.html",
        name: "Navigation",
      },
      { id: "hero-container", file: "hero.html", name: "Hero" },
      { id: "about-container", file: "about.html", name: "About" },
      { id: "skills-container", file: "skills.html", name: "Skills" },
      { id: "projects-container", file: "projects.html", name: "Projects" },
      {
        id: "experience-container",
        file: "experience.html",
        name: "Experience",
      },
      { id: "contact-container", file: "contact.html", name: "Contact" },
      { id: "footer-container", file: "footer.html", name: "Footer" },
    ];

    this.loadedComponents = 0;
    this.totalComponents = this.components.length;
    this.debugMode = false;
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
        // console.warn(`Container with id "${containerId}" not found`);
      }
    } catch (error) {
      // console.error(`Error loading component ${filename}:`, error);
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

  // Debug Methods for testing different sections
  enableDebugMode() {
    this.debugMode = true;
    this.createDebugPanel();
  }

  disableDebugMode() {
    this.debugMode = false;
    const debugPanel = document.getElementById("debug-panel");
    if (debugPanel) {
      debugPanel.remove();
    }
  }

  createDebugPanel() {
    // Remove existing debug panel if it exists
    const existingPanel = document.getElementById("debug-panel");
    if (existingPanel) {
      existingPanel.remove();
    }

    const debugPanel = document.createElement("div");
    debugPanel.id = "debug-panel";
    debugPanel.innerHTML = `
      <div class="debug-header">
        <h3>🛠️ Section Debug Panel</h3>
        <button id="debug-close" onclick="loader.disableDebugMode()">✕</button>
      </div>
      <div class="debug-content">
        <div class="debug-actions">
          <button onclick="loader.showAllSections()">Show All</button>
          <button onclick="loader.hideAllSections()">Hide All</button>
          <button onclick="loader.showOnlyNavAndHero()">Nav + Hero Only</button>
        </div>
        <div class="debug-sections">
          ${this.components
            .map(
              (component) => `
            <label class="debug-checkbox">
              <input type="checkbox" id="debug-${component.id}" checked onchange="loader.toggleSection('${component.id}')">
              <span>${component.name}</span>
            </label>
          `
            )
            .join("")}
        </div>
        <div class="debug-screen-sizes">
          <h4>Quick Screen Size Tests:</h4>
          <button onclick="loader.setViewport(375, 812)">Mobile (375x812)</button>
          <button onclick="loader.setViewport(768, 1024)">Tablet (768x1024)</button>
          <button onclick="loader.setViewport(1440, 900)">Desktop (1440x900)</button>
          <button onclick="loader.resetViewport()">Reset</button>
        </div>
      </div>
    `;

    // Add styles for debug panel
    const debugStyles = `
      #debug-panel {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 280px;
        background: rgba(0, 0, 0, 0.95);
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        backdrop-filter: blur(10px);
      }
      
      .debug-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .debug-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }
      
      #debug-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
      }
      
      .debug-content {
        padding: 16px;
      }
      
      .debug-actions {
        margin-bottom: 16px;
      }
      
      .debug-actions button {
        background: #22c55e;
        color: black;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        margin-right: 8px;
        margin-bottom: 8px;
      }
      
      .debug-actions button:hover {
        background: #16a34a;
      }
      
      .debug-sections {
        margin-bottom: 16px;
      }
      
      .debug-checkbox {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        cursor: pointer;
        user-select: none;
      }
      
      .debug-checkbox input {
        margin-right: 8px;
        cursor: pointer;
      }
      
      .debug-screen-sizes h4 {
        margin: 0 0 8px 0;
        font-size: 14px;
        font-weight: 500;
        color: #22c55e;
      }
      
      .debug-screen-sizes button {
        background: #374151;
        color: white;
        border: none;
        padding: 6px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 11px;
        margin-right: 6px;
        margin-bottom: 6px;
      }
      
      .debug-screen-sizes button:hover {
        background: #4b5563;
      }
      
      @media (max-width: 768px) {
        #debug-panel {
          width: calc(100vw - 40px);
          right: 20px;
          left: 20px;
        }
      }
    `;

    // Add styles to document
    const styleElement = document.createElement("style");
    styleElement.textContent = debugStyles;
    document.head.appendChild(styleElement);

    document.body.appendChild(debugPanel);
  }

  toggleSection(containerId) {
    const container = document.getElementById(containerId);
    const checkbox = document.getElementById(`debug-${containerId}`);

    if (container && checkbox) {
      if (checkbox.checked) {
        container.style.display = "";
        container.classList.remove("debug-hidden");
      } else {
        container.style.display = "none";
        container.classList.add("debug-hidden");
      }
    }
  }

  showAllSections() {
    this.components.forEach((component) => {
      const container = document.getElementById(component.id);
      const checkbox = document.getElementById(`debug-${component.id}`);

      if (container) {
        container.style.display = "";
        container.classList.remove("debug-hidden");
      }
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }

  hideAllSections() {
    this.components.forEach((component) => {
      const container = document.getElementById(component.id);
      const checkbox = document.getElementById(`debug-${component.id}`);

      if (container) {
        container.style.display = "none";
        container.classList.add("debug-hidden");
      }
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  }

  showOnlyNavAndHero() {
    this.hideAllSections();

    // Show navigation and hero
    const navContainer = document.getElementById("navigation-container");
    const heroContainer = document.getElementById("hero-container");
    const navCheckbox = document.getElementById("debug-navigation-container");
    const heroCheckbox = document.getElementById("debug-hero-container");

    if (navContainer) {
      navContainer.style.display = "";
      navContainer.classList.remove("debug-hidden");
    }
    if (heroContainer) {
      heroContainer.style.display = "";
      heroContainer.classList.remove("debug-hidden");
    }
    if (navCheckbox) navCheckbox.checked = true;
    if (heroCheckbox) heroCheckbox.checked = true;
  }

  setViewport(width, height) {
    // This simulates viewport changes for testing (visual feedback)
    const body = document.body;
    body.style.maxWidth = width + "px";
    body.style.margin = "0 auto";
    body.style.border = "2px solid #22c55e";
    body.style.boxSizing = "border-box";

    // Add viewport info
    this.showViewportInfo(width, height);
  }

  resetViewport() {
    const body = document.body;
    body.style.maxWidth = "";
    body.style.margin = "";
    body.style.border = "";
    body.style.boxSizing = "";

    // Remove viewport info
    const viewportInfo = document.getElementById("viewport-info");
    if (viewportInfo) {
      viewportInfo.remove();
    }
  }

  showViewportInfo(width, height) {
    // Remove existing viewport info
    const existingInfo = document.getElementById("viewport-info");
    if (existingInfo) {
      existingInfo.remove();
    }

    const viewportInfo = document.createElement("div");
    viewportInfo.id = "viewport-info";
    viewportInfo.innerHTML = `📱 Testing: ${width}x${height}px`;
    viewportInfo.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      background: #22c55e;
      color: black;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 14px;
      z-index: 9999;
      font-family: 'Inter', sans-serif;
    `;

    document.body.appendChild(viewportInfo);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (document.getElementById("viewport-info")) {
        viewportInfo.remove();
      }
    }, 3000);
  }
}

// Initialize component loader when DOM is ready
let loader; // Global variable for debug access

document.addEventListener("DOMContentLoaded", function () {
  loader = new ComponentLoader();
  loader.loadAllComponents();

  // Remove loading indicator when all components are loaded
  document.addEventListener("allComponentsLoaded", function () {
    // console.log("Portfolio fully loaded - all components ready");

    // Add a small delay to ensure DOM elements are accessible
    setTimeout(() => {
      // Verify critical elements are available
      const header = document.getElementById("header");
      const mainContent = document.getElementById("about");

      if (header) {
        // console.log("✓ Navigation component loaded successfully");
      } else {
        // console.warn("⚠ Navigation component may not have loaded properly");
      }

      if (mainContent) {
        // console.log("✓ Main content components loaded successfully");
      }

      // Show debug instructions in console
      // console.log("🛠️ Debug Mode Available!");
      // console.log(
      //   "Type 'loader.enableDebugMode()' in console to start debugging sections"
      // );
      // console.log("Or press Ctrl+Shift+D to toggle debug mode");
    }, 100);
  });
});

// Keyboard shortcut for debug mode (Ctrl+Shift+D)
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.shiftKey && event.code === "KeyD") {
    event.preventDefault();
    if (loader && loader.debugMode) {
      loader.disableDebugMode();
      // console.log("Debug mode disabled");
    } else if (loader) {
      loader.enableDebugMode();
      // console.log("Debug mode enabled");
    }
  }
});

