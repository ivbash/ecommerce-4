import { products } from '@/data/products';
import { filterProductsByCategory } from '../utils/filter';
import { Catalog } from './catalog';

export function LaptopListingPage() {
  const filteredProducts = filterProductsByCategory(products, 'laptop');
  return <Catalog products={filteredProducts} />;
}
