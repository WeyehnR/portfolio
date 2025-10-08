// Configuration constants for portfolio

export const SOCIAL_LINKS = {
  github: "https://github.com/WeyehnR",
  linkedin: "https://www.linkedin.com/in/weyehnr01/",
  email: "mailto:weyehn1@gmail.com"
};

export const ASSETS = {
  resume: "assets/Weyehn_Reeves_Resume.pdf"
};

export const SCROLL_CONFIG = {
  headerChangeThreshold: 50,
  scrollToTopThreshold: 500,
  sectionOffset: 100
};

export const ANIMATION_CONFIG = {
  throttleDelay: 16, // 60fps
  typewriterDuration: 4500,
  fadeTransitionDuration: 600
};

export const CAL_CONFIG = {

  calLink: "weyehn-reeves-hnhotd",
  elementSelector: "#calendar"

};

export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Weyehn Reeves",
  "jobTitle": "Frontend Developer",
  "description": "Computer Science graduate and Frontend Developer specializing in React, JavaScript, and modern web technologies",
  "url": "https://weyehn.dev",
  "image": "https://weyehn.dev/assets/me.jpg",
  "email": "weyehn1@gmail.com",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "University of Massachusetts Amherst",
    "sameAs": "https://www.umass.edu/"
  },
  "knowsAbout": [
    "JavaScript",
    "React",
    "HTML",
    "CSS",
    "Frontend Development",
    "Web Development",
    "Computer Science",
    "Database Management",
    "Modern Web Technologies"
  ],
  "sameAs": [
    "https://github.com/WeyehnR",
    "https://www.linkedin.com/in/weyehnr01"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Available for Hire"
  }
}
