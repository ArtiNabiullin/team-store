import type { Item } from "../fetchItems";

export function renderItemCard(item: Item): HTMLElement {
  const card = document.createElement('article');
  card.className = 'catalog__card';

  const cardImage = document.createElement('img');
  cardImage.src = item.imageUrl || `/img/id${item.id}.jpg`;
  cardImage.className = 'catalog__image'
  cardImage.alt = item.name;

  const cardName = document.createElement('h2');
  cardName.className = 'catalog__card-title';
  cardName.textContent = item.name;

  const cardDescription = document.createElement('p');
  cardDescription.className = 'catalog__description';
  cardDescription.textContent = item.description;

  const cardPrice = document.createElement('p');
  cardPrice.className = 'catalog__price';
  cardPrice.textContent = `${item.price} ₽`;

  card.append(cardImage, cardName, cardDescription, cardPrice);
  return card;
}