// Main entry point - initializes all modules
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initSkillsCarousel } from './carousel.js';
import { initFormHandling } from './forms.js';
import { initInteractions } from './interactions.js';
import { initCalendar } from './calendar.js';

// Wait for components to be fully loaded before initializing
document.addEventListener("allComponentsLoaded", function () {
  initNavigation();
  initAnimations();
  initSkillsCarousel();
  initFormHandling();
  initInteractions();
  initCalendar();
});
