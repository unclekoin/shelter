import { pets } from '../../data/pets.js';
import { createCard } from '../../js/card.js';

const CONTAINER = document.querySelector('.slider__container');
const CARDS_LEFT = document.querySelector('#cards-left');
const CARDS_CENTER = document.querySelector('#cards-center');
const CARDS_RIGHT = document.querySelector('#cards-right');
const BTN_LEFT = document.querySelector('#left-btn');
const BTN_RIGHT = document.querySelector('#right-btn');
const BTN_LEFT_PHONE = document.querySelector('#left-btn-phone');
const BTN_RIGHT_PHONE = document.querySelector('#right-btn-phone');

const moveLeft = () => {
  CONTAINER.classList.add('transition-left');
  setTimeout(() => {
    CARDS_CENTER.innerHTML = CARDS_LEFT.innerHTML;
  }, 900);
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
  BTN_LEFT_PHONE.removeEventListener('click', moveLeft);
  BTN_RIGHT_PHONE.removeEventListener('click', moveRight);
};

const moveRight = () => {
  CONTAINER.classList.add('transition-right');
  setTimeout(() => {
    CARDS_CENTER.innerHTML = CARDS_RIGHT.innerHTML;
  }, 900);
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
  BTN_LEFT_PHONE.removeEventListener('click', moveLeft);
  BTN_RIGHT_PHONE.removeEventListener('click', moveRight);
};

BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);
BTN_LEFT_PHONE.addEventListener('click', moveLeft);
BTN_RIGHT_PHONE.addEventListener('click', moveRight);

CONTAINER.addEventListener('animationend', (animationEvent) => {
  let changedCards;

  if (animationEvent.animationName.includes('move-left')) {
    CONTAINER.classList.remove('transition-left');
    changedCards = CARDS_LEFT;
  } else {
    CONTAINER.classList.remove('transition-right');
    changedCards = CARDS_RIGHT;
  }

  const centerIds = [...changedCards.querySelectorAll('.card')].map((card) =>
    Number(card.id)
  );

  function getUniqueId() {
    const ids = pets.map((_, index) => index + 1);
    const diff = ids.filter((item) => !centerIds.includes(item));
    const randomId = diff.sort(() => Math.random() - 0.5)[0];
    centerIds.push(randomId);
    return String(randomId);
  }

  changedCards.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    let uniqueId = getUniqueId();
    const { id, name, img } = pets.find((pet) => pet.id === uniqueId);
    const card = createCard(id, name, img);
    changedCards.appendChild(card);
  }

  if (changedCards === CARDS_RIGHT) {
    CARDS_LEFT.innerHTML = CARDS_RIGHT.innerHTML;
  } else {
    CARDS_RIGHT.innerHTML = CARDS_LEFT.innerHTML;
  }

  BTN_LEFT.addEventListener('click', moveLeft);
  BTN_RIGHT.addEventListener('click', moveRight);
  BTN_LEFT_PHONE.addEventListener('click', moveLeft);
  BTN_RIGHT_PHONE.addEventListener('click', moveRight);
});
