export function initFloatingButton(options) {
  const {
    mainButtonSelector,
    floatingButtonClass = 'floating-button',
    scrollOffset = 40,
    footerOffset = 50,
    onClick,
  } = options;

  const floatingButton = document.createElement('button');
  floatingButton.className = `button ${floatingButtonClass}`;
  floatingButton.innerHTML =
    document.querySelector(mainButtonSelector).innerHTML;

  const container = document.createElement('div');
  container.className = 'floating-button-container';
  container.appendChild(floatingButton);
  document.body.appendChild(container);

  floatingButton.addEventListener('click', onClick);

  function checkVisibility() {
    const mainButton = document.querySelector(mainButtonSelector);
    const footer = document.querySelector('footer');

    if (!mainButton || window.innerWidth > 768) {
      container.classList.remove('visible');
      return;
    }

    const buttonRect = mainButton.getBoundingClientRect();
    const isMainVisible =
      buttonRect.top >= 0 && buttonRect.bottom <= window.innerHeight;

    let isFooterNear = false;
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      isFooterNear = footerRect.top < window.innerHeight - footerOffset;
    }

    if (isMainVisible || isFooterNear) {
      container.classList.remove('visible');
    } else {
      container.classList.add('visible');
    }
  }

  let isThrottled = false;
  const throttledCheck = () => {
    if (!isThrottled) {
      isThrottled = true;
      requestAnimationFrame(() => {
        checkVisibility();
        isThrottled = false;
      });
    }
  };

  window.addEventListener('scroll', throttledCheck);
  window.addEventListener('resize', throttledCheck);

  checkVisibility();
}
