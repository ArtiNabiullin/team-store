import type { Item } from "../fetchItems";
import { renderItemCard } from "./renderItemCard";
import { performFiltering } from "../catalog/performFiltering";
import { loadCart } from '../cart/cartStorage';

export function renderCatalogPage(container: HTMLElement, items: Item[], onBuy: (item: Item) => void): void {
  const heading = document.createElement("h1");
  heading.className = "catalog__title";
  heading.textContent = "Каталог товаров";

  const filters = document.createElement("section");
  filters.className = "catalog__filters";
  filters.setAttribute("aria-label", "Фильтры товаров");

  const searchLabel = document.createElement("label");
  searchLabel.textContent = "Поиск";

  const searchInput = document.createElement("input");
  searchInput.className = "catalog__search";
  searchInput.type = "search";
  searchInput.name = "search";
  searchInput.placeholder = "Название товара";
  searchLabel.append(searchInput);

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Категория";

  const categorySelect = document.createElement("select");
  categorySelect.className = "catalog__category";
  categorySelect.name = "category";

  const allCategoriesOption = document.createElement("option");
  allCategoriesOption.value = "all";
  allCategoriesOption.textContent = "Все категории";
  categorySelect.append(allCategoriesOption);

  const categoryLabels: Record<string, string> = {
    "soft-toys": "Мягкие игрушки",
    "educational-toys": "Развивающие игрушки",
    vehicles: "Машинки",
  };

  const categories = [...new Set(items.map((item) => item.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = categoryLabels[category] ?? category;
    categorySelect.append(option);
  });
  categoryLabel.append(categorySelect);

  const minPriceLabel = document.createElement("label");
  minPriceLabel.textContent = "Цена от";

  const minPriceInput = document.createElement("input");
  minPriceInput.className = "catalog__price-from";
  minPriceInput.type = "number";
  minPriceInput.name = "minPrice";
  minPriceInput.min = "0";
  minPriceInput.step = "any";
  minPriceLabel.append(minPriceInput);

  const maxPriceLabel = document.createElement("label");
  maxPriceLabel.textContent = "Цена до";

  const maxPriceInput = document.createElement("input");
  maxPriceInput.className = "catalog__price-to";
  maxPriceInput.type = "number";
  maxPriceInput.name = "maxPrice";
  maxPriceInput.min = "0";
  maxPriceInput.step = "any";
  maxPriceLabel.append(maxPriceInput);

  const sortLabel = document.createElement("label");
  sortLabel.textContent = "Сортировка";

  const sortSelect = document.createElement("select");
  sortSelect.className = "catalog__sort";
  sortSelect.name = "sort";

  const sortOptions = [
    { value: "original", label: "Исходный порядок" },
    { value: "asc", label: "Сначала дешевле" },
    { value: "desc", label: "Сначала дороже" },
  ];

  sortOptions.forEach(({ value, label }) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    sortSelect.append(option);
  });
  sortLabel.append(sortSelect);

  const resetButton = document.createElement("button");
  resetButton.className = "catalog__reset";
  resetButton.type = "button";
  resetButton.textContent = "Сбросить фильтры";

  filters.append(
    searchLabel,
    categoryLabel,
    minPriceLabel,
    maxPriceLabel,
    sortLabel,
    resetButton,
  );

  const emptyMessage = document.createElement("p");
  emptyMessage.className = "catalog__empty";
  emptyMessage.textContent = "Ничего не найдено";
  emptyMessage.hidden = true;

  const cardsGrid = document.createElement("div");
  cardsGrid.className = "catalog__grid";

  container.replaceChildren(heading, filters, emptyMessage, cardsGrid);

  function updateCards() {
    const filters = {
      search: searchInput.value,
      category: categorySelect.value,
      minPrice: minPriceInput.value.trim() === '' ? null : Number(minPriceInput.value),
      maxPrice: maxPriceInput.value.trim() === '' ? null : Number(maxPriceInput.value),
      sort: sortSelect.value,
    };

    const filteredItems = performFiltering(items, filters);

    emptyMessage.hidden = filteredItems.length !== 0;

    cardsGrid.replaceChildren();

    const cartIds = new Set(loadCart().map((cartItem) => cartItem.id));

    filteredItems.forEach((item) => {
      cardsGrid.append(renderItemCard(item, onBuy, cartIds.has(item.id)));
    })
  }
  
  searchInput.addEventListener('input', updateCards);
  minPriceInput.addEventListener('input', updateCards);
  maxPriceInput.addEventListener('input', updateCards);
  categorySelect.addEventListener('change', updateCards);
  sortSelect.addEventListener('change', updateCards);

  resetButton.addEventListener('click', () => {
    searchInput.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    categorySelect.value = 'all';
    sortSelect.value = 'original';

    updateCards();
  })

  updateCards();
}

