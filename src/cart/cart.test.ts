
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
	addToCart,
	increaseQuantity,
	decreaseQuantity,
	removeFromCart
} from './cart'
import { loadCart } from './cartStorage'
import type { CartItem } from './cart'

let storageData: Map<string, string>

function setStoredCart(cart: CartItem[]): void {
	localStorage.setItem('cart', JSON.stringify(cart))
}

beforeEach(() => {
	storageData = new Map()

	vi.stubGlobal('localStorage', {
		getItem: (key: string) => storageData.get(key) ?? null,
		setItem: (key: string, value: string) => storageData.set(key, value)
	})
})

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('addToCart', () => {
	it('adds a new product to the cart with quantity 1', () => {
		addToCart({ id: 1, available: 5 })

		expect(loadCart()).toEqual([{ id: 1, quantity: 1 }])
	})

	it('increases quantity when product already exists in cart', () => {
		setStoredCart([{ id: 1, quantity: 2 }])

		addToCart({ id: 1, available: 5 })

		expect(loadCart()).toEqual([{ id: 1, quantity: 3 }])
	})

	it('does not increase quantity beyond available stock', () => {
		setStoredCart([{ id: 1, quantity: 2 }])

		addToCart({ id: 1, available: 2 })

		expect(loadCart()).toEqual([{ id: 1, quantity: 2 }])
	})
})

describe('increaseQuantity', () => {
	it('increases the quantity of an existing product', () => {
		setStoredCart([{ id: 1, quantity: 2 }])

		increaseQuantity({ id: 1, available: 5 })

		expect(loadCart()).toEqual([{ id: 1, quantity: 3 }])
	})

	it('does not change the cart when product is not found', () => {
		setStoredCart([{ id: 2, quantity: 1 }])

		increaseQuantity({ id: 1, available: 5 })

		expect(loadCart()).toEqual([{ id: 2, quantity: 1 }])
	})

	it('does not increase quantity beyond available stock', () => {
		setStoredCart([{ id: 1, quantity: 2 }])

		increaseQuantity({ id: 1, available: 2 })

		expect(loadCart()).toEqual([{ id: 1, quantity: 2 }])
	})
})

describe('decreaseQuantity', () => {
	it('decreases the quantity of a product', () => {
		setStoredCart([{ id: 1, quantity: 3 }])

		decreaseQuantity(1)

		expect(loadCart()).toEqual([{ id: 1, quantity: 2 }])
	})

	it('does not decrease quantity below 1', () => {
		setStoredCart([{ id: 1, quantity: 1 }])

		decreaseQuantity(1)

		expect(loadCart()).toEqual([{ id: 1, quantity: 1 }])
	})

	it('does not change the cart when product is not found', () => {
		setStoredCart([{ id: 1, quantity: 2 }])

		decreaseQuantity(999)

		expect(loadCart()).toEqual([{ id: 1, quantity: 2 }])
	})
})

describe('removeFromCart', () => {
	it('removes a product from the cart', () => {
		setStoredCart([
			{ id: 1, quantity: 2 },
			{ id: 2, quantity: 1 }
		])

		removeFromCart(1)

		expect(loadCart()).toEqual([{ id: 2, quantity: 1 }])
	})

	it('does not change the cart when product is not found', () => {
		setStoredCart([{ id: 1, quantity: 2 }])

		removeFromCart(999)

		expect(loadCart()).toEqual([{ id: 1, quantity: 2 }])
	})
})
