import type { CategoryType } from './category-type';

export type Product = {
  id: number;
  category: CategoryType;
  make: string;
  model: string;
  price: number;
  images: string[];
  isSpecialOffer?: boolean;
  brand: string;
};
