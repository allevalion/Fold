import { showNotification } from './common/notifications.js';
import { updateCartCount, addToCart } from './utils/cartUtils.js';

document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.card');
  const cardsContainer = document.querySelector('.cards');
  const cards = Array.from(document.querySelectorAll('.card'));
  const resetButton = document.querySelector('.reset-button');
  const resetButtons = document.querySelectorAll('#reset-filters-button');
  const noResultsSection = document.getElementById('no-results');
  const urlParams = new URLSearchParams(window.location.search);
  const filters = {
    category: urlParams.get('category') || null,
    type: urlParams.get('type') || null,
    price: urlParams.get('price') || null,
  };

  applyFilters();

  ['category', 'type', 'price'].forEach((key) => {
    if (filters[key]) {
      const button = document.querySelector(
        `#dropdown-${key} .dropdown-button`
      );
      button.querySelector('.dropdown-button__text').textContent =
        `${key.charAt(0).toUpperCase() + key.slice(1)}: ${filters[key]}`;
      button.classList.add('active');
    }
  });

  if (filters.category) {
    const categoryButton = document.querySelector(
      '#dropdown-category .dropdown-button'
    );
    categoryButton.querySelector('.dropdown-button__text').textContent =
      `Category: ${filters.category}`;
    categoryButton.classList.add('active');
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  document.querySelectorAll('.card__controls-button').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const card = button.closest('.card');
      const product = {
        id: card.getAttribute('href').split('/').pop().replace('.html', ''),
        name: card.querySelector('.card__name').textContent,
        description: card.querySelector('.card__description').textContent,
        price: parseFloat(
          card.querySelector('.card__price').textContent.replace('$', '')
        ),
        image: card.querySelector('.card__image').src,
        quantity: 1,
        category:
          card.querySelector('.card__category')?.textContent || 'Uncategorized',
      };
      addToCart(product);
      showNotification(`${product.name} added to cart!`);
    });
  });

  function applyFilters() {
    const hasFilters = Object.values(filters).some((filter) => filter !== null);
    resetButton.style.display = hasFilters ? 'block' : 'none';

    const filteredCards = cards.filter((card) => {
      const categoryMatch =
        !filters.category ||
        card.querySelector('.card__category').textContent === filters.category;
      const typeMatch =
        !filters.type ||
        card.querySelector('.card__type').textContent === filters.type;
      const priceValue = parseFloat(
        card.querySelector('.card__price').textContent.replace('$', '')
      );

      let priceMatch = true;
      if (filters.price === 'High to Low') {
        priceMatch = true;
      } else if (filters.price === 'Low to High') {
        priceMatch = true;
      }

      return categoryMatch && typeMatch && priceMatch;
    });

    if (filters.price === 'High to Low') {
      filteredCards.sort((a, b) => {
        const priceA = parseFloat(
          a.querySelector('.card__price').textContent.replace('$', '')
        );
        const priceB = parseFloat(
          b.querySelector('.card__price').textContent.replace('$', '')
        );
        return priceB - priceA;
      });
    } else if (filters.price === 'Low to High') {
      filteredCards.sort((a, b) => {
        const priceA = parseFloat(
          a.querySelector('.card__price').textContent.replace('$', '')
        );
        const priceB = parseFloat(
          b.querySelector('.card__price').textContent.replace('$', '')
        );
        return priceA - priceB;
      });
    }

    cardsContainer.innerHTML = '';

    if (filteredCards.length === 0) {
      noResultsSection.style.display = 'flex';
      cardsContainer.style.display = 'none';
    } else {
      noResultsSection.style.display = 'none';
      cardsContainer.style.display = 'grid';
      filteredCards.forEach((card) => cardsContainer.appendChild(card));
    }
  }

  noResultsSection.style.display = 'none';
  cardsContainer.style.display = 'grid';

  function setupDropdown(dropdownId, filterKey) {
    const dropdown = document.getElementById(dropdownId);
    const button = dropdown.querySelector('.dropdown-button');
    const content = dropdown.querySelector('.dropdown-content');
    const options = content.querySelectorAll('a');

    options.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedValue = option.textContent;
        filters[filterKey] =
          selectedValue === filters[filterKey] ? null : selectedValue;

        button.querySelector('.dropdown-button__text').textContent = filters[
          filterKey
        ]
          ? `${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}: ${filters[filterKey]}`
          : filterKey.charAt(0).toUpperCase() + filterKey.slice(1);

        if (filters[filterKey]) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }

        dropdown.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');

        const newParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value) newParams.set(key, value);
        });

        const newUrl = `${window.location.pathname}?${newParams.toString()}`;
        window.history.replaceState({}, '', newUrl);

        applyFilters();
      });
    });
  }

  setupDropdown('dropdown-category', 'category');
  setupDropdown('dropdown-type', 'type');
  setupDropdown('dropdown-price', 'price');

  resetButtons.forEach((button) => {
    button.addEventListener('click', () => {
      Object.keys(filters).forEach((key) => {
        filters[key] = null;
      });

      document.querySelectorAll('.dropdown-button').forEach((button) => {
        const filterKey = button
          .closest('.dropdown')
          .id.replace('dropdown-', '');
        const displayText =
          filterKey.charAt(0).toUpperCase() + filterKey.slice(1);
        button.querySelector('.dropdown-button__text').textContent =
          displayText;
        button.classList.remove('active');
      });

      applyFilters();
      window.history.replaceState({}, '', window.location.pathname);
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

  updateCartCount();
});
