import { pets } from '../../data/pets.js';
import { createCard } from '../../js/card.js';

const CARD_LIST = document.querySelector('.our-friends__list');
const START = document.querySelector('#start');
const LEFT = document.querySelector('#left');
const NUMBER = document.querySelector('#number');
const RIGHT = document.querySelector('#right');
const END = document.querySelector('#end');

let width = window.innerWidth;
const data = new Array(6)
  .fill('')
  .reduce(
    (item) => [
      ...item,
      ...pets.map((pet) => pet).sort(() => Math.random() - 0.5),
    ],
    []
  );
let pageCounter = 1;
let cardsNumber = width > 1279 ? 8 : width > 767 ? 6 : 3;
let start = 0;
let end = cardsNumber;
const pages = Math.ceil(data.length / cardsNumber);

const CARDS = data.map(({ id, name, img }) => createCard(id, name, img));
NUMBER.textContent = pageCounter;
CARD_LIST.append(...CARDS.slice(start, end));

const stepToRight = () => {
  pageCounter++;
  NUMBER.textContent = pageCounter;
  RIGHT.disabled = pageCounter < pages ? false : true;
  END.disabled = pageCounter < pages ? false : true;

  if (pageCounter <= pages) {
    CARD_LIST.classList.add('fade');

    start += cardsNumber;
    end += cardsNumber;

    CARD_LIST.innerHTML = '';
    CARD_LIST.append(...CARDS.slice(start, end));

    LEFT.disabled = false;
    START.disabled = false;
    LEFT.addEventListener('click', stepToLeft);
  } else {
    RIGHT.removeEventListener('click', stepToRight);
  }
};

const stepToLeft = () => {
  pageCounter--;
  NUMBER.textContent = pageCounter;
  LEFT.disabled = pageCounter > 1 ? false : true;
  START.disabled = pageCounter > 1 ? false : true;

  if (pageCounter >= 1) {
    CARD_LIST.classList.add('fade');

    start -= cardsNumber;
    end -= cardsNumber;

    CARD_LIST.innerHTML = '';
    CARD_LIST.append(...CARDS.slice(start, end));

    RIGHT.disabled = false;
    END.disabled = false;
    RIGHT.addEventListener('click', stepToRight);
  } else {
    LEFT.removeEventListener('click', stepToLeft);
  }
};

const toStart = () => {
  CARD_LIST.classList.add('fade');
  pageCounter = 1;
  start = 0;
  end = cardsNumber;
  CARD_LIST.innerHTML = '';
  CARD_LIST.append(...CARDS.slice(start, end));
  LEFT.disabled = true;
  START.disabled = true;
  RIGHT.disabled = false;
  END.disabled = false;
  NUMBER.textContent = pageCounter;
};

const toEnd = () => {
  CARD_LIST.classList.add('fade');
  pageCounter = pages;
  start = data.length - cardsNumber;
  end = data.length;
  CARD_LIST.innerHTML = '';
  CARD_LIST.append(...CARDS.slice(start, end));
  RIGHT.disabled = true;
  END.disabled = true;
  LEFT.disabled = false;
  START.disabled = false;
  NUMBER.textContent = pageCounter;
};

RIGHT.addEventListener('click', stepToRight);
LEFT.addEventListener('click', stepToLeft);
START.addEventListener('click', toStart);
END.addEventListener('click', toEnd);

CARD_LIST.addEventListener('animationstart', (e) => {
  if (e.animationName === 'fade') {
    RIGHT.removeEventListener('click', stepToRight);
    LEFT.removeEventListener('click', stepToLeft);
    START.removeEventListener('click', toStart);
    END.removeEventListener('click', toEnd);
  }
});

CARD_LIST.addEventListener('animationend', (e) => {
  if (e.animationName === 'fade') {
    CARD_LIST.classList.remove('fade');
    RIGHT.addEventListener('click', stepToRight);
    LEFT.addEventListener('click', stepToLeft);
    START.addEventListener('click', toStart);
    END.addEventListener('click', toEnd);
  }
});
