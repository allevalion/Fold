document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.card');

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

document.addEventListener('click', function (event) {
  document.querySelectorAll('.dropdown.open').forEach((drop) => {
    if (!drop.contains(event.target)) {
      drop.classList.remove('open');
      drop
        .querySelector('.dropdown-button')
        .setAttribute('aria-expanded', 'false');
    }
  });

  const button = event.target.closest('.dropdown-button');

  if (button) {
    const parent = button.closest('.dropdown');
    const isOpen = parent.classList.toggle('open');
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
});

document.querySelectorAll('.dropdown').forEach((dropdown) => {
  const button = dropdown.querySelector('.dropdown-button');
  const menu = dropdown.querySelector('.dropdown-content');
  const items = dropdown.querySelectorAll('[role="option"]');

  button.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (e.key === 'ArrowDown') {
        items[0].focus();
      } else {
        items[items.length - 1].focus();
      }
    }
  });

  items.forEach((item, index) => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = items[index + 1] || items[0];
        next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = items[index - 1] || items[items.length - 1];
        prev.focus();
      } else if (e.key === 'Escape') {
        button.focus();
        dropdown.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
