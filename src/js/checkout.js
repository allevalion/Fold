import { showNotification } from './common/notifications.js';

document.addEventListener('DOMContentLoaded', () => {
  const saveContinueBtn = document.getElementById('save-continue');
  const reviewOrderBtn = document.getElementById('review-order');
  const submitPaymentBtn = document.getElementById('submit-payment');
  const sameBillingCheckbox = document.getElementById('same-billing-checkbox');
  const countrySelect = document.getElementById('country');
  const stateGroup = document.getElementById('state-group');
  const stateSelect = document.getElementById('state');
  const summaryItemsContainer = document.getElementById('summary-items');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryDiscount = document.getElementById('summary-discount');
  const summaryTax = document.getElementById('summary-tax');
  const summaryTotal = document.getElementById('summary-total');
  const deliveryEstimate = document.getElementById('delivery-estimate');
  const deliveryAddress = document.getElementById('delivery-address');
  const deliveryDate = document.getElementById('delivery-date');
  const paymentMethod = document.getElementById('payment-method');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let promoCode = localStorage.getItem('promoCode') || '';
  let discountRate = promoCode === 'FLY10' ? 0.1 : 0;
  let formData = JSON.parse(localStorage.getItem('checkoutFormData')) || {};

  const usStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  const populateStates = () => {
    stateSelect.innerHTML = '<option value="">Select State</option>';
    usStates.forEach((state) => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });
  };

  const loadFormData = () => {
    if (formData.email) document.getElementById('email').value = formData.email;
    if (formData.firstName)
      document.getElementById('first-name').value = formData.firstName;
    if (formData.lastName)
      document.getElementById('last-name').value = formData.lastName;
    if (formData.country) {
      document.getElementById('country').value = formData.country;
      if (formData.country === 'US') {
        stateGroup.style.display = 'block';
        if (formData.state)
          document.getElementById('state').value = formData.state;
      }
    }
    if (formData.city) document.getElementById('city').value = formData.city;
    if (formData.postalCode)
      document.getElementById('postal-code').value = formData.postalCode;
    if (formData.street)
      document.getElementById('street').value = formData.street;
    if (formData.phone) document.getElementById('phone').value = formData.phone;
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[\d\s\-()+]{10,}$/.test(phone);
  };

  const validateCardNumber = (number) => {
    return /^\d{16}$/.test(number.replace(/\s/g, ''));
  };

  const validateExpiry = (expiry) => {
    return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry);
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const calculateDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7);
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const updateMobileCartInfo = () => {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => {
      const discount = item.quantity > 3 ? 0.1 : 0;
      return sum + item.price * item.quantity * (1 - discount);
    }, 0);

    const discount = total * discountRate;
    const tax = (total - discount) * 0.07;
    const finalTotal = total - discount + tax;

    document.getElementById('mobile-cart-count').textContent =
      `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
    document.getElementById('mobile-cart-total').textContent =
      `$${finalTotal.toFixed(2)}`;
  };

  const toggleSummary = document.querySelector('.summary-header__toggle');
  const summaryContent = document.getElementById('summary-content');

  toggleSummary.addEventListener('click', () => {
    const isExpanded = toggleSummary.getAttribute('aria-expanded') === 'true';
    toggleSummary.setAttribute('aria-expanded', !isExpanded);
    summaryContent.setAttribute('aria-hidden', isExpanded);
  });

  const renderSummaryItems = () => {
    summaryItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      summaryItemsContainer.innerHTML = '<p>Your cart is empty</p>';
      return;
    }

    cart.forEach((item) => {
      const discount = item.quantity > 3 ? 0.1 : 0;
      const discountedPrice = item.price * (1 - discount);

      const itemElement = document.createElement('div');
      itemElement.className = 'summary-item';
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="summary-item__image">
        <div class="summary-item__info">
          <h3 class="summary-item__title">${item.name}</h3>
          <span class="summary-item__quantity">Quantity: ${item.quantity}</span>
        </div>
      `;

      itemElement.addEventListener('click', () => {
        window.location.href = `./product/${item.name
          .replace(/^the\s+/i, '')
          .toLowerCase()
          .replace(/\s+/g, '-')}.html`;
      });

      summaryItemsContainer.appendChild(itemElement);
    });

    const subtotal = cart.reduce((sum, item) => {
      const discount = item.quantity > 3 ? 0.1 : 0;
      return sum + item.price * item.quantity * (1 - discount);
    }, 0);

    const discount = subtotal * discountRate;
    const tax = (subtotal - discount) * 0.07;
    const total = subtotal - discount + tax;

    summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    summaryDiscount.textContent = `-$${discount.toFixed(2)}`;
    summaryTax.textContent = `$${tax.toFixed(2)}`;
    summaryTotal.textContent = `$${total.toFixed(2)}`;

    deliveryEstimate.textContent = `Estimated delivery: ${calculateDeliveryDate()}`;

    updateMobileCartInfo();
  };

  countrySelect.addEventListener('change', () => {
    if (countrySelect.value === 'US') {
      stateGroup.style.display = 'block';
      populateStates();
    } else {
      stateGroup.style.display = 'none';
    }
  });

  sameBillingCheckbox.addEventListener('change', () => {
    const billingAddress = document.getElementById('billing-address');
    billingAddress.style.display = sameBillingCheckbox.checked
      ? 'none'
      : 'block';
  });

  const setErrorState = (elementId, isValid) => {
    const input = document.getElementById(elementId);
    const formGroup = input.closest('.form-group');

    if (isValid) {
      formGroup.classList.remove('has-error');
    } else {
      formGroup.classList.add('has-error');
    }
  };

  saveContinueBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const country = document.getElementById('country').value;
    const state =
      country === 'US' ? document.getElementById('state').value : '';
    const city = document.getElementById('city').value.trim();
    const postalCode = document.getElementById('postal-code').value.trim();
    const street = document.getElementById('street').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!validateEmail(email)) {
      setErrorState('email', false);
      showNotification('Please enter a valid email');
      return;
    } else {
      setErrorState('email', true);
    }

    if (!firstName) {
      setErrorState('first-name', false);
      showNotification('Please enter your first name');
      return;
    } else {
      setErrorState('first-name', true);
    }

    if (!lastName) {
      setErrorState('last-name', false);
      showNotification('Please enter your last name');
      return;
    } else {
      setErrorState('last-name', true);
    }

    if (!country) {
      setErrorState('country', false);
      showNotification('Please select your country');
      return;
    } else {
      setErrorState('country', true);
    }

    if (country === 'US' && !state) {
      setErrorState('state', false);
      showNotification('Please select your state');
      return;
    } else {
      setErrorState('state', true);
    }

    if (!city) {
      setErrorState('city', false);
      showNotification('Please enter your city');
      return;
    } else {
      setErrorState('city', true);
    }

    if (!postalCode) {
      setErrorState('postal-code', false);
      showNotification('Please enter your postal code');
      return;
    } else {
      setErrorState('postal-code', true);
    }

    if (!street) {
      setErrorState('street', false);
      showNotification('Please enter your street address');
      return;
    } else {
      setErrorState('street', true);
    }

    if (!validatePhone(phone)) {
      setErrorState('phone', false);
      showNotification('Please enter a valid phone number');
      return;
    } else {
      setErrorState('phone', true);
    }

    formData = {
      email,
      firstName,
      lastName,
      country,
      state,
      city,
      postalCode,
      street,
      phone,
    };

    localStorage.setItem('checkoutFormData', JSON.stringify(formData));

    document.getElementById('payment-group').style.display = 'block';
    saveContinueBtn.style.display = 'none';

    window.scrollTo({
      top: document.getElementById('payment-group').offsetTop - 20,
      behavior: 'smooth',
    });
  });

  reviewOrderBtn.addEventListener('click', () => {
    const cardNumber = document.getElementById('card-number').value.trim();
    const cardExpiry = document.getElementById('card-expiry').value.trim();
    const cardCVV = document.getElementById('card-cvv').value.trim();

    if (!validateCardNumber(cardNumber)) {
      setErrorState('card-number', false);
      showNotification('Please enter a valid card number');
      return;
    } else {
      setErrorState('card-number', true);
    }

    if (!validateExpiry(cardExpiry)) {
      setErrorState('card-expiry', false);
      showNotification('Please enter a valid expiry date');
      return;
    } else {
      setErrorState('card-expiry', true);
    }

    if (!validateCVV(cardCVV)) {
      setErrorState('card-cvv', false);
      showNotification('Please enter a valid CVV');
      return;
    } else {
      setErrorState('card-cvv', true);
    }

    if (!sameBillingCheckbox.checked) {
      const billingStreet = document
        .getElementById('billing-street')
        .value.trim();
      const billingCity = document.getElementById('billing-city').value.trim();
      const billingPostal = document
        .getElementById('billing-postal')
        .value.trim();

      if (!billingStreet) {
        setErrorState('billing-street', false);
        showNotification('Please enter your billing street');
        return;
      } else {
        setErrorState('billing-street', true);
      }

      if (!billingCity) {
        setErrorState('billing-city', false);
        showNotification('Please enter your billing city');
        return;
      } else {
        setErrorState('billing-city', true);
      }

      if (!billingPostal) {
        setErrorState('billing-postal', false);
        showNotification('Please enter your billing postal code');
        return;
      } else {
        setErrorState('billing-postal', true);
      }

      formData.billingStreet = billingStreet;
      formData.billingCity = billingCity;
      formData.billingPostal = billingPostal;
    }

    formData.cardLastFour = cardNumber.slice(-4);
    formData.cardType = cardNumber.startsWith('4')
      ? 'Visa'
      : cardNumber.startsWith('5')
        ? 'Mastercard'
        : cardNumber.startsWith('3')
          ? 'American Express'
          : 'Card';

    localStorage.setItem('checkoutFormData', JSON.stringify(formData));

    document.getElementById('review-group').style.display = 'block';
    document.getElementById('payment-group').style.display = 'none';

    paymentMethod.textContent = `${formData.cardType} ending in ${formData.cardLastFour}`;
    deliveryAddress.textContent = `${formData.street}, ${formData.city}, ${formData.state || ''} ${formData.postalCode}, ${formData.country}`;
    deliveryDate.textContent = calculateDeliveryDate();

    window.scrollTo({
      top: document.getElementById('review-group').offsetTop - 20,
      behavior: 'smooth',
    });
  });

  submitPaymentBtn.addEventListener('click', () => {
    const modal = document.getElementById('payment-modal');
    const paymentStatus = modal.querySelector('.payment-status');
    const paymentSuccess = modal.querySelector('.payment-success');
    const modalClose = modal.querySelector('.modal__close');

    paymentStatus.style.display = 'block';
    paymentSuccess.style.display = 'none';
    modalClose.style.display = 'none';

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      paymentStatus.style.display = 'none';
      paymentSuccess.style.display = 'flex';
      modalClose.style.display = 'block';

      const closeModal = () => {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        submitPaymentBtn.focus();
        modalClose.removeEventListener('click', closeModal);
        modal.removeEventListener('click', handleOutsideClick);
      };

      const handleOutsideClick = (e) => {
        if (e.target === modal) {
          closeModal();
        }
      };

      modalClose.addEventListener('click', closeModal);
      modal.addEventListener('click', handleOutsideClick);
    }, 3000);
  });

  populateStates();
  loadFormData();
  renderSummaryItems();
});
