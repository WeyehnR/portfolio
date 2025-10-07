// Skills Carousel functionality

export function initSkillsCarousel() {
  const carousel = document.querySelector('.skills-carousel');
  const categories = document.querySelectorAll('.skills-category');
  const indicators = document.querySelectorAll('.indicator');
  const leftArrow = document.querySelector('.carousel-arrow-left');
  const rightArrow = document.querySelector('.carousel-arrow-right');

  if (!carousel || categories.length === 0) return;

  let currentIndex = 0;
  const totalCategories = categories.length;

  // Show first category initially
  categories[0].classList.add('active');

  function showCategory(index) {
    categories.forEach(cat => cat.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));

    categories[index].classList.add('active');
    if (indicators[index]) {
      indicators[index].classList.add('active');
    }

    if (leftArrow && rightArrow) {
      leftArrow.disabled = index === 0;
      rightArrow.disabled = index === totalCategories - 1;
    }
  }

  function nextCategory() {
    if (currentIndex < totalCategories - 1) {
      currentIndex++;
      showCategory(currentIndex);
    }
  }

  function prevCategory() {
    if (currentIndex > 0) {
      currentIndex--;
      showCategory(currentIndex);
    }
  }

  // Arrow navigation
  if (leftArrow) {
    leftArrow.addEventListener('click', prevCategory);
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', nextCategory);
  }

  // Indicator navigation
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      showCategory(currentIndex);
    });
  });

  // Touch/swipe support
  let startX = 0;
  let endX = 0;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextCategory();
      } else {
        prevCategory();
      }
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevCategory();
    } else if (e.key === 'ArrowRight') {
      nextCategory();
    }
  });

  showCategory(currentIndex);
}
