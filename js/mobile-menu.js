const BODY = document.body;
const HEADER = document.querySelector('.header');
const MOBILE_MENU = document.querySelector('.mobile-menu');
const OVERLAY = document.querySelector('.overlay');

BODY.addEventListener('click', (e) => {
  if (e.target.closest('.burger') || e.target.closest('.anchor')) {
    HEADER.classList.toggle('open');
    MOBILE_MENU.classList.toggle('open');
    OVERLAY.classList.toggle('open');
    BODY.classList.toggle('no-scroll');
  }
});

OVERLAY.addEventListener('click', () => {
  HEADER.classList.remove('open');
  MOBILE_MENU.classList.remove('open');
  OVERLAY.classList.remove('open');
  BODY.classList.remove('no-scroll');
});
