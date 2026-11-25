import type { CartItem } from "./cart";

export function saveCart(newCart: CartItem[]): void {
  localStorage.setItem("cart", JSON.stringify(newCart));
}

export function loadCart(): CartItem[] {
  const result = localStorage.getItem("cart") ?? "[]";
  try {
    const parsed: unknown = JSON.parse(result);
    if (!Array.isArray(parsed) || !parsed.every(isCartItem)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "quantity" in value &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.id) &&
    value.id >= 0 &&
    Number.isInteger(value.quantity) &&
    value.quantity >= 1
  );
}
