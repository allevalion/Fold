document.addEventListener('DOMContentLoaded', function () {
  const secretButton = document.querySelector('.not-found__secret-button');
  const plane = document.querySelector('.not-found__plane');

  setTimeout(function () {
    secretButton.classList.add('visible');
  }, 8000);

  plane.addEventListener('click', function () {
    this.style.animation = 'none';
    void this.offsetWidth;
    this.style.animation = 'planeFall 2s ease-in forwards';
  });
});
