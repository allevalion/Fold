export function showNotification(message) {
  const container = document.querySelector('.notification-container');
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.setAttribute('role', 'status');
  notif.innerText = message;

  container.appendChild(notif);

  setTimeout(() => {
    notif.classList.add('hide');
    notif.addEventListener('transitionend', () => notif.remove());
  }, 3000);
}
