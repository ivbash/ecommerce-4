import { products } from '@/data/products';
import { getProductsByCategory } from '../utils/filter';
import { Catalog } from './catalog';

export function PhoneListingPage() {
  const filteredProducts = getProductsByCategory(products, 'phone');
  return <Catalog products={filteredProducts} />;
}
