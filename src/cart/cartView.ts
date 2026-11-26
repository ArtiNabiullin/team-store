import type { Item } from "../fetchItems";

import { loadCart } from "./cartStorage";
import { fetchItems } from "../fetchItems";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "./cart";
import { formatCurrency } from "../formatCurrency";

function createProductElement(
  item: Item,
  itemCount: number,
  cartElement: HTMLDivElement,
): HTMLDivElement {
  const productCard = document.createElement("div");
  productCard.classList.add("cart__product_card");
  productCard.append(createProductImage(item.imageUrl));
  productCard.append(createProductInfo(item.name, item.description));
  productCard.append(createProductPricing(item, itemCount, cartElement));

  return productCard;
}

function createProductImage(imageUrl: string): HTMLImageElement {
  const image = document.createElement("img");
  image.classList.add("cart__product_image");
  image.src = imageUrl;
  image.alt = "Фото товара";

  return image;
}

function createProductInfo(title: string, desc: string): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.classList.add("cart__product_info__wrapper");

  const titleElement = document.createElement("p");
  titleElement.classList.add("cart__product_info__title");
  titleElement.textContent = title;
  wrapper.append(titleElement);

  const descElement = document.createElement("p");
  descElement.classList.add("cart__product_info__desc");
  descElement.textContent = desc;
  wrapper.append(descElement);

  return wrapper;
}

function createProductPricing(
  item: Item,
  itemCount: number,
  cartElement: HTMLDivElement,
): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.classList.add("cart__product_pricing__wrapper");

  const itemSumElement = document.createElement("p");
  itemSumElement.classList.add("cart__product_pricing__sum");
  const itemTotal = item.price * itemCount;
  itemSumElement.textContent = formatCurrency(itemTotal);
  itemSumElement.dataset.total = String(itemTotal);
  wrapper.append(itemSumElement);

  wrapper.append(createButtons(itemCount, item, itemSumElement, cartElement));

  return wrapper;
}

function createButtons(
  itemCount: number,
  item: Item,
  priceElem: HTMLParagraphElement,
  cartElement: HTMLDivElement,
): HTMLDivElement {
  let currentCount = itemCount;

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.classList.add("cart__product_pricing__btns");

  const countWrapper = document.createElement("div");
  countWrapper.classList.add("cart__product_pricing__count__wrapper");

  const itemCountDecrease = document.createElement("button");
  itemCountDecrease.type = "button";
  itemCountDecrease.textContent = "-";
  itemCountDecrease.setAttribute("aria-label", "Уменьшить количество");
  itemCountDecrease.classList.add("cart__product_pricing__count_decrease");
  countWrapper.append(itemCountDecrease);

  const itemCountNum = document.createElement("span");
  itemCountNum.classList.add("cart__product_pricing__count_num");
  itemCountNum.textContent = String(itemCount);
  countWrapper.append(itemCountNum);

  const itemCountIncrease = document.createElement("button");
  itemCountIncrease.type = "button";
  itemCountIncrease.setAttribute("aria-label", "Увеличить количество");
  itemCountIncrease.classList.add("cart__product_pricing__count_increase");
  itemCountIncrease.textContent = "+";
  countWrapper.append(itemCountIncrease);

  buttonsWrapper.append(countWrapper);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.setAttribute("aria-label", "Удалить из корзины");
  deleteButton.classList.add("cart__product_pricing__delete_btn");
  deleteButton.textContent = "🗑️";

  buttonsWrapper.append(deleteButton);

  function updateButtonsState(): void {
    itemCountDecrease.disabled = currentCount <= 1;
    itemCountIncrease.disabled = currentCount >= item.available;
  }

  updateButtonsState();

  itemCountDecrease.addEventListener("click", () => {
    if (currentCount > 1) {
      decreaseQuantity(item.id);

      currentCount -= 1;
      itemCountNum.textContent = String(currentCount);
      const itemTotal = item.price * currentCount;
      priceElem.textContent = formatCurrency(itemTotal);
      priceElem.dataset.total = String(itemTotal);

      updateSummary(cartElement);
      updateButtonsState();
    }
  });

  itemCountIncrease.addEventListener("click", () => {
    if (currentCount < item.available) {
      increaseQuantity(item);

      currentCount += 1;
      itemCountNum.textContent = String(currentCount);
      const itemTotal = item.price * currentCount;
      priceElem.textContent = formatCurrency(itemTotal);
      priceElem.dataset.total = String(itemTotal);

      updateSummary(cartElement);
      updateButtonsState();
    }
  });

  deleteButton.addEventListener("click", () => {
    const card = deleteButton.closest(".cart__product_card");
    const productsWrapper = card?.parentElement;

    if (!card || !productsWrapper) return;

    removeFromCart(item.id);
    card.remove();

    updateSummary(cartElement);

    const remainingCards = productsWrapper.querySelectorAll(
      ".cart__product_card",
    );

    if (remainingCards.length === 0) {
      productsWrapper.classList.add("empty_cart");
      productsWrapper.textContent = "Корзина пуста";
			cartElement.querySelector(".cart__pay_button")?.remove();
    }
  });

  return buttonsWrapper;
}

function createSummary(total: number): HTMLDivElement {
  const summaryElement = document.createElement("div");
  summaryElement.classList.add("cart__summary");

  const summaryText = document.createElement("span");
  summaryText.classList.add("cart__summary_text");
  summaryText.textContent = `Итого: ${formatCurrency(total)}`;
  summaryElement.append(summaryText);

  if (total > 0) {
    const payButton = document.createElement("a");
    payButton.classList.add("cart__pay_button");
    payButton.textContent = "Оплатить";
    payButton.href = "https://youtu.be/dQw4w9WgXcQ";
    payButton.target = "_blank";
    payButton.rel = "noopener noreferrer";

    summaryElement.append(payButton);
  }

  return summaryElement;
}

function calculateSummary(cartElement: HTMLDivElement): number {
  const priceElements = cartElement.querySelectorAll<HTMLParagraphElement>(
    ".cart__product_pricing__sum",
  );
  let total = 0;

  priceElements.forEach((elem) => {
    const price = Number(elem.dataset.total);

    if (Number.isFinite(price)) {
      total += price;
    }
  });

  return total;
}

function updateSummary(cartElement: HTMLDivElement): void {
  const summaryTextElem = cartElement.querySelector(".cart__summary_text");

  if (!summaryTextElem) return;

  summaryTextElem.textContent = `Итого: ${formatCurrency(calculateSummary(cartElement))}`;
}

export async function createCartElement(): Promise<HTMLDivElement> {
  const cart = loadCart();

  const cartElement = document.createElement("div");
  cartElement.classList.add("cart__wrapper");

  const productsWrapper = document.createElement("div");
  productsWrapper.classList.add("cart__products");

  if (cart.length === 0) {
    productsWrapper.classList.add("empty_cart");
    productsWrapper.textContent = "Корзина пуста";

    cartElement.append(productsWrapper);
    cartElement.append(createSummary(0));

    return cartElement;
  }

  const products = await fetchItems();

  let total = 0;

  cart.forEach((product) => {
    const item = products.find((element) => element.id === product.id);

    if (item !== undefined) {
      productsWrapper.append(
        createProductElement(item, product.quantity, cartElement),
      );

      total += item.price * product.quantity;
    }
  });

  if (productsWrapper.childElementCount === 0) {
    productsWrapper.classList.add("empty_cart");
    productsWrapper.textContent = "Корзина пуста";
  }

  cartElement.append(productsWrapper);
  cartElement.append(createSummary(total));

  return cartElement;
}
