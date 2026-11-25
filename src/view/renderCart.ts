import { createCartElement } from "../cart/cartView"

export async function renderCartPage(container: HTMLElement): Promise<void> {
  const cartElement = await createCartElement()

  container.replaceChildren(cartElement)
}
