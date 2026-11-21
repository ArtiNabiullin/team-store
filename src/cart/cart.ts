export interface CartItem {
	id: number
	quantity: number
}

interface StockItem {
	id: number
	available: number
}

export function increaseQuantity(
	cart: CartItem[],
	product: StockItem
): CartItem[] {
	const hasItem = cart.some((item) => item.id === product.id)
	let updatedCart: CartItem[] = []

	if (hasItem) {
		updatedCart = cart.map(item => {
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
	} else {
		updatedCart = [...cart, { id: product.id, quantity: 1 }]
	}

	return updatedCart
}

export function decreaseQuantity(
	cart: CartItem[],
	id: number
): CartItem[] {
	const updatedCart = cart.map(item => {
		if (item.id === id && item.quantity > 1) {
			return { ...item, quantity: item.quantity - 1 }
		}
		return item
	})

	return updatedCart
}

export function removeFromCart(
	cart: CartItem[],
	id: number
): CartItem[] {
	const newCart = cart.filter(item => item.id !== id)
	return newCart
}