import type { Item } from "./fetchItems"

interface Filters {
  search: string,
  category: string,
  minPrice: number | null,
  maxPrice: number | null,
  sort: string,
}

export function performFiltering(items: Item[], filters: Filters) {
  let values = [...items];
  const search = filters.search.toLowerCase().trim();
  const category = filters.category;
  const sort = filters.sort;
  const minPrice = filters.minPrice;
  const maxPrice = filters.maxPrice;

  if (search) {
    values = values.filter((a) => a.name.toLowerCase().includes(search));
  }

  if (category !== 'all') {
    values = values.filter((a) => a.category === category);
  }

  if (minPrice !== null) {
    values = values.filter((a) => a.price >= minPrice);
  }

  if (maxPrice !== null) {
    values = values.filter((a) => a.price <= maxPrice);
  }

  if (sort === 'asc') {
    values.sort((a, b) => a.price - b.price);
  }

  if (sort === 'desc') {
    values.sort((a, b) => b.price - a.price);
  }

  return values;
}