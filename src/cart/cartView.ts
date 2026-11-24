import type { Item } from '../fetchItems'
// import type { CartItem } from './cart'

import { loadCart/*, saveCart*/ } from './cartStorage'
import { fetchItems } from '../fetchItems'

function createProductElement(item: Item, itemCount: number): HTMLDivElement {
	const productCard = document.createElement('div')
	productCard.classList.add('cart__product_card')
	productCard.append(createProductImage(item.imageUrl))
	productCard.append(createProductInfo(item.name, item.description))
	productCard.append(createProductPricing(item.price, itemCount, item.available))

	return productCard
}

function createProductImage(imageUrl: string): HTMLImageElement {
	const image = document.createElement('img')
	image.classList.add('cart__product_image')
	image.src = imageUrl
	image.alt = 'Фото товара'

	return image
}

function createProductInfo(title: string, desc: string): HTMLDivElement {
	const wrapper = document.createElement('div')
	wrapper.classList.add('cart__product_info__wrapper')

	const titleElement = document.createElement('p')
	titleElement.classList.add('cart__product_info__title')
	titleElement.textContent = title
	wrapper.append(titleElement)

	const descElement = document.createElement('p')
	descElement.classList.add('cart__product_info__desc')
	descElement.textContent = desc
	wrapper.append(descElement)

	return wrapper
}

function createProductPricing(itemPrice: number, itemCount: number, itemAvailable: number): HTMLDivElement {
	const wrapper = document.createElement('div')
	wrapper.classList.add('cart__product_pricing__wrapper')

	const itemSumElement = document.createElement('p')
	itemSumElement.classList.add('cart__product_pricing__sum')
	itemSumElement.textContent = `$${itemPrice * itemCount}`
	wrapper.append(itemSumElement)

	const countWrapper = document.createElement('div')
	countWrapper.classList.add('cart__product_pricing__count__wrapper')
	wrapper.append(countWrapper)

	const itemCountDecrease = document.createElement('button')
	itemCountDecrease.type = 'button'
	itemCountDecrease.textContent = '-'
	itemCountDecrease.setAttribute('aria-label', 'Уменьшить количество')
	itemCountDecrease.disabled = itemCount <= 1
	itemCountDecrease.classList.add('cart__product_pricing__count_decrease')
	countWrapper.append(itemCountDecrease)

	const itemCountNum = document.createElement('div')
	itemCountNum.classList.add('cart__product_pricing__count_num')
	itemCountNum.textContent = `${String(itemCount)}`
	countWrapper.append(itemCountNum)

	const itemCountIncrease = document.createElement('button')
	itemCountIncrease.type = 'button'
	itemCountIncrease.setAttribute('aria-label', 'Увеличить количество')
	itemCountIncrease.disabled = itemCount >= itemAvailable
	itemCountIncrease.classList.add('cart__product_pricing__count_increase')
	itemCountIncrease.textContent = '+'
	countWrapper.append(itemCountIncrease)

	// добавить кнопку удаления

	return wrapper
}

function createSummary(total: number): HTMLDivElement {
	const summaryElement = document.createElement('div')
	summaryElement.classList.add('cart__summary')

	const summaryText = document.createElement('span')
	summaryText.classList.add('cart__summary_text')
	summaryText.textContent = `Итого: $${total}`
	summaryElement.append(summaryText)

	return summaryElement
}

export async function createCartElement(): Promise<HTMLDivElement> {
	const cart = loadCart()
	if (cart.length === 0) {
		const cartElement = document.createElement('div')
		cartElement.classList.add('cart__wrapper')

		const productsWrapper = document.createElement('div')
		productsWrapper.classList.add('cart__products')
		productsWrapper.classList.add('empty_cart')
		productsWrapper.textContent = 'Корзина пуста'

		cartElement.append(productsWrapper)
		cartElement.append(createSummary(0))

		return cartElement
	}

	const products = await fetchItems()

	let total = 0

	const cartElement = document.createElement('div')
	cartElement.classList.add('cart__wrapper')

	const productsWrapper = document.createElement('div')
	productsWrapper.classList.add('cart__products')

	cart.forEach(product => {
		const item = products.find(element => element.id === product.id)

		if (item !== undefined) {
			productsWrapper.append(createProductElement(item, product.quantity))
			total += item.price * product.quantity
		}
	})

	cartElement.append(productsWrapper)
	cartElement.append(createSummary(total))

	return cartElement
}