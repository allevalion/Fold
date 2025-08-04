import { showNotification } from './common/notifications.js';
import { updateCartCount, addToCart } from './utils/cartUtils.js';
import { initFloatingButton } from './utils/floatingButton.js';

document.addEventListener('DOMContentLoaded', () => {
  initFloatingButton({
    mainButtonSelector: '.buy-button',
    floatingButtonClass: 'floating-button',
    onClick: () => {
      const product = getProductData();
      showNotification(`${product.name} added to cart!`);
      addToCart(product);
    },
  });

  const quantityInput = document.querySelector('.quantity-input');
  const btnDecrease = document.querySelector(
    '.quantity-button[aria-label="Decrease quantity"]'
  );
  const btnIncrease = document.querySelector(
    '.quantity-button[aria-label="Increase quantity"]'
  );

  btnDecrease.addEventListener('click', () => {
    let current = parseInt(quantityInput.value, 10);
    if (current > 1) quantityInput.value = current - 1;
  });

  btnIncrease.addEventListener('click', () => {
    let current = parseInt(quantityInput.value, 10);
    if (current < 99) quantityInput.value = current + 1;
  });

  quantityInput.addEventListener('input', () => {
    let val = parseInt(quantityInput.value, 10);
    if (isNaN(val) || val < 1) quantityInput.value = 1;
    else if (val > 99) quantityInput.value = 99;
  });

  const recommendedContainer = document.querySelector(
    '.recommended__container'
  );
  if (recommendedContainer) {
    recommendedContainer.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        recommendedContainer.scrollLeft += e.deltaY;
      }
    });
  }
  const favoriteBtn = document.querySelector('.favorite-button');
  const favoriteBtnText = document.querySelector('.favorite-button__text');
  if (favoriteBtn) {
    const product = getProductData();
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorited = favorites.some((item) => item.id === product.id);

    if (isFavorited) {
      favoriteBtn.classList.add('favorite-button--active');
      favoriteBtnText.textContent = 'Unfavorite';
    }

    favoriteBtn.addEventListener('click', () => {
      const isActive = favoriteBtn.classList.toggle('favorite-button--active');
      favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      if (isActive) {
        if (!favorites.some((item) => item.id === product.id)) {
          favorites.push(product);
          showNotification('Added to favorites!');
        }
        favoriteBtnText.textContent = 'Unfavorite';
      } else {
        favorites = favorites.filter((item) => item.id !== product.id);
        showNotification('Removed from favorites!');
        favoriteBtnText.textContent = 'Favorite';
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  }
});

function getProductData() {
  const productName = document.querySelector('.section__title').textContent;
  const productDescription = document.querySelector(
    '.product__description-text'
  ).textContent;
  const productCategory = document.querySelector(
    '.product__category-name'
  ).textContent;
  const productPrice = parseFloat(
    document.querySelector('.product__price-text').textContent.replace('$', '')
  );
  const productImage = document.querySelector('.product__main-image').src;
  const quantity = parseInt(
    document.querySelector('.quantity-input').value,
    10
  );

  return {
    id: generateProductId(productName),
    name: productName,
    description: productDescription,
    category: productCategory,
    price: productPrice,
    image: productImage,
    quantity: quantity,
  };
}

function generateProductId(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

updateCartCount();
