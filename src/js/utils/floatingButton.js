export function initFloatingButton(options) {
  const {
    mainButtonSelector,
    floatingButtonClass = 'floating-button',
    scrollOffset = 40,
    footerOffset = 50,
    onClick,
  } = options;

  const container = document.createElement('div');
  container.className = 'floating-button-container';
  document.body.appendChild(container);

  const floatingButton = document.createElement('button');
  floatingButton.className = `button ${floatingButtonClass}`;
  container.appendChild(floatingButton);

  floatingButton.addEventListener('click', onClick);

  function checkVisibility() {
    const mainButtons = document.querySelectorAll(mainButtonSelector);
    const footer = document.querySelector('footer');

    if (mainButtons.length === 0 || window.innerWidth > 768) {
      container.classList.remove('visible');
      return;
    }

    let anyButtonVisible = false;
    let allButtonsAboveFold = true;

    mainButtons.forEach((button) => {
      const buttonRect = button.getBoundingClientRect();
      const isVisible =
        buttonRect.top >= 0 && buttonRect.bottom <= window.innerHeight;

      if (isVisible) {
        anyButtonVisible = true;
      }

      if (buttonRect.bottom > window.innerHeight) {
        allButtonsAboveFold = false;
      }
    });

    let isFooterNear = false;
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      isFooterNear = footerRect.top < window.innerHeight - footerOffset;
    }

    let targetButton = null;
    for (const button of mainButtons) {
      const rect = button.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        targetButton = button;
        break;
      }
    }
    if (!targetButton && mainButtons.length > 0) {
      targetButton = mainButtons[mainButtons.length - 1];
    }
    if (targetButton) {
      floatingButton.innerHTML = targetButton.innerHTML;
    }

    if (anyButtonVisible || isFooterNear) {
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
