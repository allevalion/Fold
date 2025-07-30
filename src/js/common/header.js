document.addEventListener('DOMContentLoaded', () => {
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

// console.log(`
//  █████╗ ██╗     ██╗     ███████╗██╗   ██╗ █████╗ ██╗     ██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██║     ██║     ██╔════╝██║   ██║██╔══██╗██║     ██║██╔═══██╗████╗  ██║
// ███████║██║     ██║     █████╗  ██║   ██║███████║██║     ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║     ██║     ██╔══╝  ╚██╗ ██╔╝██╔══██║██║     ██║██║   ██║██║╚██╗██║
// ██║  ██║███████╗███████╗███████╗ ╚████╔╝ ██║  ██║███████╗██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝

// https://github.com/allevalion/Fold
// `);
