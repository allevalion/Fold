import { updateCartCount } from '../utils/cartUtils.js';

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  const burger = document.querySelector('.header__burger');
  const mobileNav = document.querySelector('.header__mobile-nav');
  const mobileNavList = document.querySelector('.header__mobile-nav-list');

  function openMenu() {
    burger.setAttribute('aria-expanded', 'true');
    burger.classList.add('active');
    mobileNav.classList.add('active');
    mobileNavList.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    burger.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileNavList.classList.remove('active');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-modal-input');
  const searchForm = document.getElementById('search-modal-form');
  const closeButton = document.getElementById('search-modal-close');
  const popularProductsContainer = document.getElementById('popular-products');
  const searchSuggestionsContainer =
    document.getElementById('search-suggestions');

  let products = [];
  let popularProducts = [];

  const fetchProducts = async () => {
    try {
      const response = await fetch(getBaseUrl() + '/products.json');
      products = await response.json();
      popularProducts = products.filter((product) => product.popular);
      displayPopularProducts();
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const getBaseUrl = () => {
    return window.location.pathname.includes('/product/') ? '../' : './';
  };

  const displayPopularProducts = () => {
    if (!popularProducts.length) return;

    popularProductsContainer.innerHTML = popularProducts
      .map(
        (product) => `
      <a href="${getBaseUrl()}${product.url}" class="search-modal__popular-item" tabindex="0">
        ${product.name}
      </a>
    `
      )
      .join('');
  };

  const showSearchModal = () => {
    searchModal.removeAttribute('aria-hidden');
    searchModal.removeAttribute('inert');
    searchModal.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';
    searchInput.focus();
  };

  const hideSearchModal = () => {
    searchModal.setAttribute('inert', '');
    searchModal.setAttribute('aria-modal', 'false');
    document.body.style.overflow = '';
    searchInput.value = '';
    searchSuggestionsContainer.innerHTML = '';
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      searchSuggestionsContainer.innerHTML = '';
      return;
    }

    const suggestions = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    if (suggestions.length) {
      searchSuggestionsContainer.innerHTML = suggestions
        .map(
          (product) => `
        <a href="${getBaseUrl()}${product.url}" class="search-suggestion" tabindex="0">
          ${highlightMatch(product.name, query)}
        </a>
      `
        )
        .join('');
    } else {
      searchSuggestionsContainer.innerHTML = `
        <div class="search-suggestion search-suggestion--empty">
          No products found
        </div>
      `;
    }
  };

  const highlightMatch = (text, query) => {
    const regex = new RegExp(query, 'gi');
    return text.replace(regex, (match) => `<strong>${match}</strong>`);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedSearch = debounce(handleSearch, 300);

  document
    .querySelectorAll(
      '.header__search, .header__search-input, #header-search-button'
    )
    .forEach((el) => {
      el.addEventListener('click', showSearchModal);
    });

  searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchInput.value.trim()) {
      handleSearch(searchInput.value.trim());
    }
  });

  closeButton.addEventListener('click', hideSearchModal);

  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      searchModal.getAttribute('aria-hidden') === 'false'
    ) {
      hideSearchModal();
    }
  });

  fetchProducts();
});

console.log(`
 █████╗ ██╗     ██╗     ███████╗██╗   ██╗ █████╗ ██╗     ██╗ ██████╗ ███╗   ██╗
██╔══██╗██║     ██║     ██╔════╝██║   ██║██╔══██╗██║     ██║██╔═══██╗████╗  ██║
███████║██║     ██║     █████╗  ██║   ██║███████║██║     ██║██║   ██║██╔██╗ ██║
██╔══██║██║     ██║     ██╔══╝  ╚██╗ ██╔╝██╔══██║██║     ██║██║   ██║██║╚██╗██║
██║  ██║███████╗███████╗███████╗ ╚████╔╝ ██║  ██║███████╗██║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝

https://github.com/allevalion/Fold
`);
