export const createCard = (id, name, img, cls = 'slider__card') => {
  const card = document.createElement('div');
  card.classList.add('card', cls);
  card.id = id;

  const cardImag = document.createElement('div');
  cardImag.classList.add('card__image');

  const image = document.createElement('img');
  image.src = img;
  image.alt = name;

  const title = document.createElement('h4');
  title.className = 'card__title';
  title.textContent = name;

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-outline', 'btn-center', 'card-btn');
  button.textContent = 'Learn more';

  cardImag.append(image);

  card.append(cardImag, title, button);

  return card;
};
