import type { Cart } from '@/shared/types/cart';
import type { Product } from '@/shared/types/product';

export function filterCartProducts(cart: Cart, products: Product[]) {
  const ids = Object.keys(cart).map((id) => +id);
  return products.filter((product) => ids.includes(product.id));
}
