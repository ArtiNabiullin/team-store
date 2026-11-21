import { fetchItems, type Item } from "./fetchItems";

export async function initFetchItem() {
  try {
    const items: Item[] = await fetchItems();
    return items;
  } catch (error) {
    throw new Error('Ошибка при получении данных');
  }
}