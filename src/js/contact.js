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

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    scrollObserver.observe(el);
  });

  document.querySelectorAll('.milestone').forEach((el) => {
    milestoneObserver.observe(el);
  });
}

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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  const sendButton = form.querySelector('.send-button');
  const buttonText = sendButton.querySelector('.button-text');

  const airplaneSvg = `
    <svg class="airplane-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
    </svg>
  `;

  const envelopeSvg = `
    <svg class="envelope-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="#0d141c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
      <polyline points="2 7 12 13 22 7"></polyline>
    </svg>
  `;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const existingIcons = sendButton.querySelectorAll(
      '.envelope-icon, .airplane-icon'
    );
    existingIcons.forEach((icon) => icon.remove());

    sendButton.disabled = true;
    sendButton.style.pointerEvents = 'none';
    buttonText.textContent = 'Sending...';

    sendButton.insertAdjacentHTML('afterbegin', envelopeSvg);
    const envelopeIcon = sendButton.querySelector('.envelope-icon');
    envelopeIcon.style.width = '24px';
    envelopeIcon.style.height = '24px';
    envelopeIcon.style.opacity = '1';
    envelopeIcon.style.transform = 'scale(1)';

    setTimeout(() => {
      envelopeIcon.style.transition = 'all 0.3s ease-in-out';
      envelopeIcon.style.opacity = '0';
      envelopeIcon.style.transform = 'scale(0.5)';

      setTimeout(() => {
        envelopeIcon.remove();
        sendButton.insertAdjacentHTML('afterbegin', airplaneSvg);
        const airplaneIcon = sendButton.querySelector('.airplane-icon');
        airplaneIcon.style.width = '24px';
        airplaneIcon.style.height = '24px';
        airplaneIcon.style.opacity = '0';
        airplaneIcon.style.transform = 'scale(0.5)';

        setTimeout(() => {
          airplaneIcon.style.transition = 'all 0.3s ease-in-out';
          airplaneIcon.style.opacity = '1';
          airplaneIcon.style.transform = 'scale(1.2) rotate(-10deg)';

          setTimeout(() => {
            airplaneIcon.style.animation =
              'planeFlyInPlace 0.8s ease-in-out infinite';

            setTimeout(() => {
              airplaneIcon.style.animation = 'none';
              airplaneIcon.style.transition = 'all 0.3s ease-in-out';
              airplaneIcon.style.transform = 'scale(0.5) rotate(0deg)';
              airplaneIcon.style.opacity = '0';

              setTimeout(() => {
                airplaneIcon.remove();
                sendButton.insertAdjacentHTML('afterbegin', envelopeSvg);
                const newEnvelope = sendButton.querySelector('.envelope-icon');
                newEnvelope.style.opacity = '0';
                newEnvelope.style.transform = 'scale(0.5)';

                setTimeout(() => {
                  newEnvelope.style.transition = 'all 0.3s ease-in-out';
                  newEnvelope.style.opacity = '1';
                  newEnvelope.style.transform = 'scale(1)';

                  buttonText.textContent = 'Sent!';

                  setTimeout(() => {
                    buttonText.textContent = 'Send';
                    sendButton.disabled = false;
                    sendButton.style.pointerEvents = 'auto';
                    form.reset();
                  }, 1000);
                }, 50);
              }, 300);
            }, 1500);
          }, 100);
        }, 50);
      }, 300);
    }, 50);
  });
});
