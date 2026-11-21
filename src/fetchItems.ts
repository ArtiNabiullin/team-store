  interface Item {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    available: number,
    category: string,
    price: number,
}

function isItem(value: unknown): value is Item {
  if (typeof value !== 'object' || value === null) return false;

  return (
    'id' in value && typeof value.id === 'number' &&
    'name' in value && typeof value.name === 'string' &&
    'description' in value && typeof value.description === 'string' &&
    'imageUrl' in value && typeof value.imageUrl === 'string' &&
    'available' in value && typeof value.available === 'number' &&
    'category' in value && typeof value.category === 'string' &&
    'price' in value && typeof value.price === 'number'
  )
}

export async function fetchItems(): Promise<Item[]> {
const response = await fetch('/data/items.json');

if (!response.ok) {
  throw new Error('Data failed to load');
}

const data = await response.json();

if (!Array.isArray(data) || !data.every(isItem)) {
  throw new Error('Invalid items data');
}

return data;
}