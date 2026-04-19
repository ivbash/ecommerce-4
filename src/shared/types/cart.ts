import type { Product } from './product';

export type Cart = {
  [id: Product['id']]: number;
};
