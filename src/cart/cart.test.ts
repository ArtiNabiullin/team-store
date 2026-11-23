
import { describe, expect, it } from 'vitest'
import {
	decreaseQuantity,
	increaseQuantity,
	removeFromCart,
	addToCart
} from './cart'

describe('addToCart', () => {
	it('adds a new product to the cart with quantity 1', () => {
		const result = addToCart([], { id: 1, available: 5 })

		expect(result).toEqual([{ id: 1, quantity: 1 }])
	})

	it('increases quantity when product already exists in cart', () => {
		const cart = [{ id: 1, quantity: 2 }]

		const result = addToCart(cart, { id: 1, available: 5 })

		expect(result).toEqual([{ id: 1, quantity: 3 }])
	})
})

describe('increaseQuantity', () => {
	it('increases the quantity of an existing product', () => {
		const cart = [{ id: 1, quantity: 2 }]

		const result = increaseQuantity(cart, { id: 1, available: 5 })

		expect(result).toEqual([{ id: 1, quantity: 3 }])
	})

	it('does not add a product that is not in the cart', () => {
		const result = increaseQuantity([], { id: 1, available: 5 })

		expect(result).toEqual([])
	})

	it('does not increase quantity beyond available stock', () => {
		const cart = [{ id: 1, quantity: 2 }]

		const result = increaseQuantity(cart, { id: 1, available: 2 })

		expect(result).toEqual([{ id: 1, quantity: 2 }])
	})
})

describe('decreaseQuantity', () => {
	it('decreases the quantity of a product', () => {
		const cart = [{ id: 1, quantity: 3 }]

		const result = decreaseQuantity(cart, 1)

		expect(result).toEqual([{ id: 1, quantity: 2 }])
	})

	it('does not decrease quantity below 1', () => {
		const cart = [{ id: 1, quantity: 1 }]

		const result = decreaseQuantity(cart, 1)

		expect(result).toEqual([{ id: 1, quantity: 1 }])
	})

	it('does not mutate the original cart', () => {
		const cart = [{ id: 1, quantity: 2 }]

		decreaseQuantity(cart, 1)

		expect(cart).toEqual([{ id: 1, quantity: 2 }])
	})
})

describe('removeFromCart', () => {
	it('removes a product from the cart', () => {
		const cart = [
			{ id: 1, quantity: 2 },
			{ id: 2, quantity: 1 },
		]

		const result = removeFromCart(cart, 1)

		expect(result).toEqual([{ id: 2, quantity: 1 }])
	})

	it('does not change the cart when the product is not found', () => {
		const cart = [{ id: 1, quantity: 2 }]

		const result = removeFromCart(cart, 999)

		expect(result).toEqual([{ id: 1, quantity: 2 }])
	})
})
