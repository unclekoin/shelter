import { pets } from '../data/pets.js';

const CARD_LIST = document.querySelector('#card-list');
const POPUP = document.querySelector('.popup');
const OVERLAY = document.querySelector('.overlay');


const popupTemplate = (data) => {
  return `
      <button class="btn btn-circle btn-outline btn-primary popup__btn">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
      </svg>
      </button>
      <div class="popup__image"><img src=${data.bigImg} alt=${data.name}></div>
      <div class="popup__content">
        <h3 class="popup__title">${data.name}</h3>
        <div class="popup__subtitle">${data.type} - ${data.breed}</div>
        <div class="popup__description">${data.description}</div>
        <ul class="popup__list">
          <li class="popup__item">
            <span class="popup__item-circle"></span>
            <span class="popup__item-title">Age:</span>
            <span class="popup__item-info">${data.age}</span>
          </li>
          <li class="popup__item">
            <span class="popup__item-circle"></span>
            <span class="popup__item-title">Inoculations:</span>
            <span class="popup__item-info">${data.inoculations.join(', ')}</span>
          </li>
          <li class="popup__item">
            <span class="popup__item-circle"></span>
            <span class="popup__item-title">Diseases:</span>
            <span class="popup__item-info">${data.diseases.join(', ')}</span>
          </li>
          <li class="popup__item">
            <span class="popup__item-circle"></span>
            <span class="popup__item-title">Parasites:</span>
            <span class="popup__item-info">${data.parasites.join(', ')}</span>
          </li>
        </ul>
      </div>
  `;
};

CARD_LIST.addEventListener('click', ({ target }) => {
  if (target.closest('.card')) {
    // POPUP.classList.remove('hidden');
    POPUP.classList.add('popup-open')
    const id = target.closest('.card').id;
    const info = pets.find((pet) => pet.id === id);
    const popup = popupTemplate(info);
    POPUP.innerHTML = popup;
    OVERLAY.classList.add('open');
    document.body.classList.add('no-scroll');

    const BUTTON = document.querySelector('.popup__btn');
    BUTTON.addEventListener('click', closePopup); 

    OVERLAY.addEventListener('mouseenter', () => {
      BUTTON.classList.add('btn-hover');
    });
    
    OVERLAY.addEventListener('mouseleave', () => {
      BUTTON.classList.remove('btn-hover');
    });
  }
});

OVERLAY.addEventListener('click', closePopup);

function closePopup() {
  // POPUP.classList.add('hidden');
  POPUP.classList.remove('popup-open');
  OVERLAY.classList.remove('open');
  document.body.classList.remove('no-scroll');
}
