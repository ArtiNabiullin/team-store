import { describe, expect, it } from 'vitest'
import { performFiltering } from '../performFiltering'

describe('performFiltering', () => {

  it('Пустые фильтры и исходная сортировка — товары остаются в исходном порядке', () => {
    const items = [
      {
        id: 0,
        name: 'Плюшевый медведь',
        description: '',
        imageUrl: '',
        available: 8,
        category: 'soft-toys',
        price: 35.99,
      },
      {
        id: 1,
        name: 'Детское домино',
        description: '',
        imageUrl: '',
        available: 15,
        category: 'educational-toys',
        price: 9.99,
      },
    ];

    const filters = {
      search: '',
      category: 'all',
      minPrice: null,
      maxPrice: null,
      sort: 'original',
    };
    expect(performFiltering(items, filters)).toEqual(items);
  });

  it('После сортировки исходный массив items не изменился', () => {
    const items = [
      {
        id: 0,
        name: 'Плюшевый медведь',
        description: '',
        imageUrl: '',
        available: 8,
        category: 'soft-toys',
        price: 35.99,
      },
      {
        id: 1,
        name: 'Детское домино',
        description: '',
        imageUrl: '',
        available: 15,
        category: 'educational-toys',
        price: 9.99,
      },
    ];

    const original = [...items];

    const filters = {
      search: '',
      category: 'all',
      minPrice: null,
      maxPrice: null,
      sort: 'asc',
    };

    const result = performFiltering(items, filters);

    expect(items).toEqual(original);
    expect(result).toEqual([items[1], items[0]]);
  });

  it('Поиск находит часть названия без учёта регистра', () => {
    const items = [
      {
        id: 0,
        name: 'Плюшевый медведь',
        description: '',
        imageUrl: '',
        available: 8,
        category: 'soft-toys',
        price: 35.99,
      },
      {
        id: 1,
        name: 'Детское домино',
        description: '',
        imageUrl: '',
        available: 15,
        category: 'educational-toys',
        price: 9.99,
      },
    ];

    const filters = {
      search: 'МЕДВ',
      category: 'all',
      minPrice: null,
      maxPrice: null,
      sort: 'original',
    };
    expect(performFiltering(items, filters)).toEqual([items[0]]);
  });

  it('Категория и границы цены применяются вместе, причём границы включаются', () => {
    const makeItem = (id: number, category: string, price: number) => ({
      id,
      name: ``,
      description: '',
      imageUrl: '',
      available: 1,
      category,
      price
    });

    const items = [
      makeItem(0, 'soft-toys', 10),
      makeItem(1, 'educational-toys', 9.99),
      makeItem(2, 'educational-toys', 12.5),
      makeItem(3, 'educational-toys', 13),
      makeItem(4, 'educational-toys', 5),
    ];

    const filters = {
      search: '',
      category: 'educational-toys',
      minPrice: 9.99,
      maxPrice: 12.5,
      sort: 'original',
    };
    expect(performFiltering(items, filters)).toEqual([items[1], items[2]]);
  });

  it('Сортировка по цене работает для результатов фильтрации(возрастание)', () => {
    const makeItem = (id: number, category: string, price: number) => ({
      id,
      name: ``,
      description: '',
      imageUrl: '',
      available: 1,
      category,
      price
    });

    const items = [
      makeItem(0, 'soft-toys', 5),
      makeItem(1, 'educational-toys', 30),
      makeItem(2, 'educational-toys', 10),
      makeItem(3, 'educational-toys', 20),
    ];

    const filters = {
      search: '',
      category: 'educational-toys',
      minPrice: null,
      maxPrice: null,
      sort: 'asc',
    };
    expect(performFiltering(items, filters)).toEqual([items[2], items[3], items[1]]);
  });

    it('Сортировка по цене работает для результатов фильтрации(убывание)', () => {
    const makeItem = (id: number, category: string, price: number) => ({
      id,
      name: ``,
      description: '',
      imageUrl: '',
      available: 1,
      category,
      price
    });

    const items = [
      makeItem(0, 'soft-toys', 5),
      makeItem(1, 'educational-toys', 30),
      makeItem(2, 'educational-toys', 10),
      makeItem(3, 'educational-toys', 20),
    ];

    const filters = {
      search: '',
      category: 'educational-toys',
      minPrice: null,
      maxPrice: null,
      sort: 'desc',
    };
    expect(performFiltering(items, filters)).toEqual([items[1], items[3], items[2]]);
  });

  it('Если совпадений нет, функция возвращает пустой массив', () => {
    const makeItem = (id: number, category: string, price: number) => ({
      id,
      name: ``,
      description: '',
      imageUrl: '',
      available: 1,
      category,
      price
    });

    const items = [
      makeItem(0, 'soft-toys', 5),
      makeItem(1, 'educational-toys', 30),
      makeItem(2, 'educational-toys', 10),
      makeItem(3, 'educational-toys', 20),
    ];

    const filters = {
      search: '',
      category: 'vehicles',
      minPrice: null,
      maxPrice: null,
      sort: 'original',
    };
    expect(performFiltering(items, filters)).toEqual([]);
  });
});