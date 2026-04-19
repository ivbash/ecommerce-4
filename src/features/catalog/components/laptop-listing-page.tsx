import { products } from '@/data/products';
import { getProductsByCategory } from '../utils/filter';
import { Catalog } from './catalog';

export function LaptopListingPage() {
  const filteredProducts = getProductsByCategory(products, 'laptop');
  return <Catalog products={filteredProducts} />;
}
