import type { Product } from '@/shared/types/product';

export function sortByPrice(products: Product[], desc: boolean = false) {
  products.sort(desc ? comparePriceDesc : comparePriceAsc);
}

function comparePriceAsc(a: Product, b: Product) {
  return a.price - b.price;
}

function comparePriceDesc(a: Product, b: Product) {
  return b.price - a.price;
}
