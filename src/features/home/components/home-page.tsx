import { products } from '@/data/products';
import { getProductsByCategory } from '../utils/filter';
import { Filters } from './filters';
import { ProductCard } from './product-card';
import { ProductCount } from './product-count';
import { ProductsGrid } from './products-grid';
import { ProductsHeader } from './products-header';
import { Sorting } from './sorting';
import { Special } from './special';

export function HomePage() {
  const filteredProducts = getProductsByCategory(products, 'tv');

  return (
    <div className="flex flex-col items-stretch gap-6 lg:flex-row">
      <aside className="shrink-0 space-y-4 lg:w-[256px]">
        <Filters />
        <Special />
      </aside>
      <div className="grow space-y-6">
        <ProductsHeader>
          <ProductCount count={filteredProducts.length} />
          <Sorting />
        </ProductsHeader>
        <ProductsGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsGrid>
      </div>
    </div>
  );
}
