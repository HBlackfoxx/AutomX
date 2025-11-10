/**
 * Shared Intersection Observer for scroll animations
 * Automatically observes all elements with .fade-in-scroll class
 */

export function initScrollObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after animation to improve performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-in-scroll elements
  const fadeElements = document.querySelectorAll('.fade-in-scroll');
  fadeElements.forEach(el => observer.observe(el));

  return observer;
}

// Auto-initialize on DOMContentLoaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initScrollObserver();
  });
}
