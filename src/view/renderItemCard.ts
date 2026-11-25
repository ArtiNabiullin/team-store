import type { Item } from "../fetchItems";

export function renderItemCard(item: Item, onBuy: (item: Item) => void, isInCart: boolean): HTMLElement {
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

  const cardButton = document.createElement('button');
  cardButton.className = 'catalog__button';
  cardButton.textContent = isInCart ? 'В корзине' : 'Купить';
  cardButton.disabled = isInCart;

  cardButton.addEventListener('click', () => {
    onBuy(item);
    cardButton.textContent = 'В корзине';
    cardButton.disabled = true;
  })

  card.append(cardImage, cardName, cardDescription, cardPrice, cardButton);
  return card;
}