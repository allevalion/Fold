/* TODO: улучшить reduced motion и contrast */
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const highContrast = window.matchMedia('(prefers-contrast: more)').matches;

if (!motionOK) document.documentElement.classList.add('reduced-motion');
if (highContrast) document.documentElement.classList.add('high-contrast');

if (motionOK) {
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');

          if (
            entry.target.classList.contains('our-story') ||
            entry.target.classList.contains('team__cta')
          ) {
            entry.target.classList.add('in-view');
          }

          if (entry.target.closest('.cta')) {
            entry.target.closest('.cta').classList.add('in-view');
          }
        }
      });
    },
    { threshold: 0.2 }
  );

  const milestoneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll('.animate-on-scroll, .our-story, .team__cta')
    .forEach((el) => {
      scrollObserver.observe(el);
    });

  document.querySelectorAll('.milestone').forEach((el) => {
    milestoneObserver.observe(el);
  });
}

document.querySelectorAll('.team-card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    if (motionOK) {
      card.style.transform = highContrast ? 'none' : 'translateY(-10px)';
      card.style.boxShadow = highContrast
        ? '0 0 0 2px black'
        : '0 15px 30px rgba(0,0,0,0.15)';
    }
  });

  card.addEventListener('mouseleave', () => {
    if (motionOK) {
      card.style.transform = '';
      card.style.boxShadow = '';
    }
  });
});

if (motionOK && !highContrast) {
  window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.backgroundPositionY = window.pageYOffset * 0.5 + 'px';
    }
  });
}

if (!motionOK) {
  document
    .querySelectorAll('.animate-on-scroll, .our-story, .team__cta, .milestone')
    .forEach((el) => {
      el.classList.add('in-view');
    });

  document.documentElement.classList.add('reduced-motion');
}
