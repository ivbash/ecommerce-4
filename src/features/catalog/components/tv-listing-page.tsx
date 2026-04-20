import { products } from '@/data/products';
import { filterProductsByCategory } from '../utils/filter';
import { Catalog } from './catalog';

export function TvListingPage() {
  const filteredProducts = filterProductsByCategory(products, 'tv');
  return <Catalog products={filteredProducts} />;
}
