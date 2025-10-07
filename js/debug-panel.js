// Debug Panel - Optional development tool for testing components
// Usage: Type 'enableDebugMode()' in console or press Ctrl+Shift+D

class DebugPanel {
  constructor(componentLoader) {
    this.loader = componentLoader;
    this.debugMode = false;
  }

  enable() {
    this.debugMode = true;
    this.createPanel();
  }

  disable() {
    this.debugMode = false;
    const debugPanel = document.getElementById("debug-panel");
    if (debugPanel) {
      debugPanel.remove();
    }
  }

  createPanel() {
    const existingPanel = document.getElementById("debug-panel");
    if (existingPanel) {
      existingPanel.remove();
    }

    const debugPanel = document.createElement("div");
    debugPanel.id = "debug-panel";
    debugPanel.innerHTML = `
      <div class="debug-header">
        <h3>🛠️ Section Debug Panel</h3>
        <button id="debug-close" onclick="debugPanel.disable()">✕</button>
      </div>
      <div class="debug-content">
        <div class="debug-actions">
          <button onclick="debugPanel.showAll()">Show All</button>
          <button onclick="debugPanel.hideAll()">Hide All</button>
          <button onclick="debugPanel.showOnlyNavAndHero()">Nav + Hero Only</button>
        </div>
        <div class="debug-sections">
          ${this.loader.components
            .map(
              (component) => `
            <label class="debug-checkbox">
              <input type="checkbox" id="debug-${component.id}" checked onchange="debugPanel.toggleSection('${component.id}')">
              <span>${component.name}</span>
            </label>
          `
            )
            .join("")}
        </div>
        <div class="debug-screen-sizes">
          <h4>Quick Screen Size Tests:</h4>
          <button onclick="debugPanel.setViewport(375, 812)">Mobile (375x812)</button>
          <button onclick="debugPanel.setViewport(768, 1024)">Tablet (768x1024)</button>
          <button onclick="debugPanel.setViewport(1440, 900)">Desktop (1440x900)</button>
          <button onclick="debugPanel.resetViewport()">Reset</button>
        </div>
      </div>
    `;

    this.addStyles();
    document.body.appendChild(debugPanel);
  }

  addStyles() {
    if (document.getElementById("debug-panel-styles")) return;

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

    const styleElement = document.createElement("style");
    styleElement.id = "debug-panel-styles";
    styleElement.textContent = debugStyles;
    document.head.appendChild(styleElement);
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

  showAll() {
    this.loader.components.forEach((component) => {
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

  hideAll() {
    this.loader.components.forEach((component) => {
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
    this.hideAll();

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
    const body = document.body;
    body.style.maxWidth = width + "px";
    body.style.margin = "0 auto";
    body.style.border = "2px solid #22c55e";
    body.style.boxSizing = "border-box";

    this.showViewportInfo(width, height);
  }

  resetViewport() {
    const body = document.body;
    body.style.maxWidth = "";
    body.style.margin = "";
    body.style.border = "";
    body.style.boxSizing = "";

    const viewportInfo = document.getElementById("viewport-info");
    if (viewportInfo) {
      viewportInfo.remove();
    }
  }

  showViewportInfo(width, height) {
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

    setTimeout(() => {
      if (document.getElementById("viewport-info")) {
        viewportInfo.remove();
      }
    }, 3000);
  }
}

// Initialize debug panel when component loader is ready
let debugPanel;

document.addEventListener("DOMContentLoaded", function () {
  if (typeof loader !== 'undefined') {
    debugPanel = new DebugPanel(loader);

    // Make it globally accessible
    window.enableDebugMode = () => debugPanel.enable();
    window.disableDebugMode = () => debugPanel.disable();
  }
});

// Keyboard shortcut (Ctrl+Shift+D)
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.shiftKey && event.code === "KeyD") {
    event.preventDefault();
    if (debugPanel) {
      if (debugPanel.debugMode) {
        debugPanel.disable();
      } else {
        debugPanel.enable();
      }
    }
  }
});
