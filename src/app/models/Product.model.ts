export enum Category {
    Desktops,
    Laptops,
    Tablets,
  }

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;
}

export const CATEGORY_NAMES = ['Desktops', 'Laptops', 'Tablets'];
