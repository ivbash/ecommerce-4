import type { Product } from '@/shared/types/product';

export function getProductsByCategory(
  products: Product[],
  category: Product['category'],
) {
  return products.filter((p) => p.category === category);
}
