import { showNotification } from './common/notifications.js';

document.addEventListener('DOMContentLoaded', () => {
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
});

const buyBtns = document.querySelectorAll('.buy-button');
buyBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    showNotification('Successfully added to cart!');
  })
);

document.addEventListener('DOMContentLoaded', () => {
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
});

const favoriteBtn = document.querySelector('.favorite-button');
const favoriteBtnText = document.querySelector('.favorite-button__text');
if (favoriteBtn) {
  const isFavorited = localStorage.getItem('favorite') === 'true';
  if (isFavorited) {
    favoriteBtn.classList.add('favorite-button--active');
    favoriteBtnText.textContent = 'Unfavorite';
  }

  favoriteBtn.addEventListener('click', () => {
    const isActive = favoriteBtn.classList.toggle('favorite-button--active');
    localStorage.setItem('favorite', isActive);
    if (isActive) {
      showNotification('Added to favorites!');
      favoriteBtnText.textContent = 'Unfavorite';
    } else {
      showNotification('Removed from favorites!');
      favoriteBtnText.textContent = 'Favorite';
    }
  });
}
