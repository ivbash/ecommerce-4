import { products } from '@/data/products';
import { getProductsByCategory } from '../utils/filter';
import { Catalog } from './catalog';

export function TvListingPage() {
  const filteredProducts = getProductsByCategory(products, 'tv');
  return <Catalog products={filteredProducts} />;
}
