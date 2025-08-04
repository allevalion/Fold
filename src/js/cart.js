import { showNotification } from './common/notifications.js';
import { updateCartCount } from './utils/cartUtils.js';
import { initFloatingButton } from './utils/floatingButton.js';

updateCartCount();

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const discountElement = document.getElementById('discount');
  const taxElement = document.getElementById('tax');
  const totalElement = document.getElementById('total');
  const promoCodeInput = document.getElementById('promo-code');
  const promoCodeAddButton = document.getElementById('add-promo');
  const promoCodeRemoveButton = document.getElementById('remove-promo');
  const checkoutButton = document.getElementById('checkout-button');
  const favoritesItemsContainer = document.getElementById('favorites-items');

  initFloatingButton({
    mainButtonSelector: '#checkout-button',
    floatingButtonClass: 'floating-button',
    onClick: () => {
      window.location.href = 'checkout.html';
    },
  });

  checkoutButton.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let promoCode = localStorage.getItem('promoCode') || '';
  let discountRate = 0;

  const renderCart = () => {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
      return;
    }

    cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';

      const itemDiscount = item.quantity > 3 ? 0.1 : 0;
      const discountedPrice = item.price * (1 - itemDiscount);

      itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item__image">
      <div class="cart-item__info">
        <h3 class="cart-item__title">${item.name}</h3>
        <p class="cart-item__description">${item.description}</p>
        <span class="cart-item__category">${item.category}</span>
        ${itemDiscount > 0 ? `<span class="cart-item__discount">10% discount applied</span>` : ''}
      </div>
      <div class="cart-item__controls">
        <span class="cart-item__price">$${(discountedPrice * item.quantity).toFixed(2)}</span>
        <div class="quantity-controls">
          <button class="quantity-button" data-index="${index}" data-action="decrease">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-index="${index}">
          <button class="quantity-button" data-index="${index}" data-action="increase">+</button>
        </div>
        <button class="cart-item__remove" data-index="${index}">Remove</button>
      </div>
    `;

      cartItemsContainer.appendChild(itemElement);
    });

    updateSummary();
  };

  const renderFavorites = () => {
    favoritesItemsContainer.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (favorites.length === 0) {
      favoritesItemsContainer.innerHTML = '<p>Your favorites list is empty</p>';
      return;
    }

    favorites.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'favorite-item';
      const inCart = cart.some((cartItem) => cartItem.id === item.id);

      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="favorite-item__image">
        <div class="favorite-item__info">
          <h3 class="favorite-item__title">${item.name}</h3>
          <p class="favorite-item__description">${item.description}</p>
          <span class="favorite-item__category">${item.category}</span>
          <span class="favorite-item__price">$${item.price.toFixed(2)}</span>
          ${inCart ? '<span class="favorite-item__in-cart">(In cart)</span>' : ''}
        </div>
        <div class="favorite-item__actions">
          <button class="button favorite-item__visit" data-index="${index}" onclick="location.href='./product/${item.name
            .replace(/^the\s+/i, '')
            .toLowerCase()
            .replace(/\s+/g, '-')}.html'">Visit Page</button>
          <button class="favorite-item__remove" data-index="${index}">Remove</button>
        </div>
      `;
      favoritesItemsContainer.appendChild(itemElement);
    });
  };

  const updateSummary = () => {
    const quantityDiscount = cart.reduce((sum, item) => {
      return item.quantity > 3 ? sum + item.price * item.quantity * 0.1 : sum;
    }, 0);

    const subtotalWithoutDiscount = cart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const promoDiscount = subtotalWithoutDiscount * discountRate;
    const totalDiscount = quantityDiscount + promoDiscount;

    const tax = (subtotalWithoutDiscount - totalDiscount) * 0.07;
    const total = subtotalWithoutDiscount - totalDiscount + tax;

    subtotalElement.textContent = `$${subtotalWithoutDiscount.toFixed(2)}`;
    discountElement.textContent = `-$${totalDiscount.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleQuantityChange = (index, action) => {
    if (action === 'increase') {
      cart[index].quantity += 1;
    } else if (action === 'decrease') {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      }
    }
    renderCart();
  };

  const handleInputChange = (index, value) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 1 && quantity <= 99) {
      cart[index].quantity = quantity;
      renderCart();
    }
  };

  const removeItem = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
  };

  const removePromoCode = () => {
    discountRate = 0;
    promoCode = '';
    promoCodeInput.value = '';
    localStorage.removeItem('promoCode');
    renderCart();
    promoCodeRemoveButton.style.display = 'none';
    showNotification('Promo code removed!');
  };

  const applyPromoCode = () => {
    const code = promoCodeInput.value.trim();
    if (code === 'FLY10') {
      discountRate = 0.1;
      promoCode = code;
      localStorage.setItem('promoCode', code);
      renderCart();
      promoCodeRemoveButton.style.display = 'block';
      showNotification('Promo code applied!');
    } else {
      discountRate = 0;
      promoCodeInput.value = '';
      promoCodeInput.placeholder = 'Invalid code';
      showNotification('Invalid code!');
      setTimeout(() => {
        promoCodeInput.placeholder = 'Enter promo code';
      }, 2000);
    }
  };

  promoCodeRemoveButton.addEventListener('click', removePromoCode);

  const removeFavorite = (index) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (index >= 0 && index < favorites.length) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    renderFavorites();
  };

  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('quantity-button')) {
      const index = parseInt(e.target.dataset.index, 10);
      const action = e.target.dataset.action;
      handleQuantityChange(index, action);
    } else if (e.target.classList.contains('cart-item__remove')) {
      const index = parseInt(e.target.dataset.index, 10);
      removeItem(index);
    }
  });

  cartItemsContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('quantity-input')) {
      const index = parseInt(e.target.dataset.index, 10);
      handleInputChange(index, e.target.value);
    }
  });

  promoCodeAddButton.addEventListener('click', applyPromoCode);
  promoCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') applyPromoCode();
  });

  favoritesItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('favorite-item__remove')) {
      const index = parseInt(e.target.dataset.index, 10);
      removeFavorite(index);
    }
  });

  if (promoCode) {
    promoCodeInput.value = promoCode;
    applyPromoCode();
    promoCodeRemoveButton.style.display = 'block';
  }

  renderFavorites();
  renderCart();
});
