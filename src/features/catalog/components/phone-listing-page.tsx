import { products } from '@/data/products';
import { filterProductsByCategory } from '../utils/filter';
import { Catalog } from './catalog';

export function PhoneListingPage() {
  const filteredProducts = filterProductsByCategory(products, 'phone');
  return <Catalog products={filteredProducts} />;
}
