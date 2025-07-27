document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.airplane-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--active');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});
