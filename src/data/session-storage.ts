import type { Cart } from '@/shared/types/cart';
import type { PageType } from '@/shared/types/page-type';

export function savePageType(pageType: PageType) {
  sessionStorage.setItem('pageType', pageType);
}

export function loadPageType() {
  return (sessionStorage.getItem('pageType') as PageType) ?? 'tv';
}

export function saveCart(cart: Cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

export function loadCart(): Cart {
  const cart = sessionStorage.getItem('cart') ?? '{}';
  return JSON.parse(cart);
}
