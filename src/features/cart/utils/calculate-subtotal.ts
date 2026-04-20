import type { Cart } from '@/shared/types/cart';
import type { Product } from '@/shared/types/product';

export function calculateSubtotal(cart: Cart, products: Product[]) {
  return products.reduce(
    (subtotal, product) => subtotal + product.price * cart[product.id],
    0,
  );
}
