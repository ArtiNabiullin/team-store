import type { Item } from "../fetchItems"
import { loadCart, saveCart } from './cartStorage'

export interface CartItem {
	id: number
	quantity: number
}

export function addToCart(
	product: Pick<Item, "id" | "available">
): void {
	const cart = loadCart()
	const hasItem = cart.some((item) => item.id === product.id)
	if (hasItem) {
		increaseQuantity(product)
	}
	const result = [...cart, { id: product.id, quantity: 1 }]
	saveCart(result)
}

export function increaseQuantity(
	product: Pick<Item, "id" | "available">
): void {
	const cart = loadCart()
	const updatedCart = cart.map(item => {
		if (item.id === product.id) {
			if (item.quantity < product.available) {
				return { ...item, quantity: item.quantity + 1 }
			} else {
				return item
			}
		} else {
			return item
		}
	})

	saveCart(updatedCart)
}

export function decreaseQuantity(
	id: number
): void {
	const cart = loadCart()
	const updatedCart = cart.map(item => {
		if (item.id === id && item.quantity > 1) {
			return { ...item, quantity: item.quantity - 1 }
		}
		return item
	})

	saveCart(updatedCart)
}

export function removeFromCart(
	id: number
): void {
	const cart = loadCart()
	const newCart = cart.filter(item => item.id !== id)
	saveCart(newCart)
}