/**
 * Scroll Animations Script
 * Handles fade-in animations and smooth scrolling using Intersection Observer API
 */

// Initialize on DOM load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScroll();
  });
}

/**
 * Initialize scroll-triggered fade-in animations
 */
function initScrollAnimations(): void {
  const animatedElements = document.querySelectorAll('.fade-in-scroll');

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class when element enters viewport
          entry.target.classList.add('visible');

          // Stop observing after animation (performance optimization)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    }
  );

  // Observe all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll(): void {
  // Handle clicks on smooth scroll triggers
  const smoothScrollTriggers = document.querySelectorAll('.smooth-scroll-trigger, a[href^="#"]');

  smoothScrollTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      const href = trigger.getAttribute('href');

      if (href && href.startsWith('#')) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Calculate offset for fixed header (if any)
          const headerOffset = 80; // Adjust based on header height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          // Smooth scroll to target
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, '', href);
          }

          // Focus target element for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
        }
      }
    });
  });
}

/**
 * Add parallax effect to hero section (optional enhancement)
 */
export function initParallaxEffect(): void {
  const heroSection = document.querySelector('section');

  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      const parallaxSpeed = 0.5;

      heroSection.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
    });
  }
}

/**
 * Add stagger animation delays to grid items
 */
export function addStaggerDelay(
  selector: string,
  baseDelay: number = 100,
  maxDelay: number = 1000
): void {
  const items = document.querySelectorAll(selector);

  items.forEach((item, index) => {
    const delay = Math.min(index * baseDelay, maxDelay);
    (item as HTMLElement).style.animationDelay = `${delay}ms`;
  });
}

// Export for use in Astro components
export { initScrollAnimations, initSmoothScroll };
