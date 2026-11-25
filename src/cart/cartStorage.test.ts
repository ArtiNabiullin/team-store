import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadCart, saveCart } from "./cartStorage";

let storageData: Map<string, string>;

beforeEach(() => {
  storageData = new Map();

  vi.stubGlobal("localStorage", {
    getItem: (key: string) => storageData.get(key) ?? null,
    setItem: (key: string, value: string) => storageData.set(key, value),
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("saveCart", () => {
  it("saves cart to localStorage", () => {
    const cart = [{ id: 1, quantity: 2 }];

    saveCart(cart);

    expect(localStorage.getItem("cart")).toBe(JSON.stringify(cart));
  });

  it("saves an empty cart", () => {
    saveCart([]);

    expect(localStorage.getItem("cart")).toBe("[]");
  });
});

describe("loadCart", () => {
  it("loads cart from localStorage", () => {
    const cart = [
      { id: 1, quantity: 2 },
      { id: 3, quantity: 1 },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    expect(loadCart()).toEqual(cart);
  });

  it("returns an empty array when cart is not saved", () => {
    expect(loadCart()).toEqual([]);
  });

  it("returns an empty array when stored JSON is invalid", () => {
    localStorage.setItem("cart", "invalid json");

    expect(loadCart()).toEqual([]);
  });

  it("returns an empty array when stored data has an invalid structure", () => {
    localStorage.setItem("cart", JSON.stringify([{ id: "1", quantity: 2 }]));

    expect(loadCart()).toEqual([]);
  });
});
