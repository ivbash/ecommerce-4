import type { Product } from '@/shared/types/product';
import { getMaxPrice, getMinPrice, getUniqueBrands } from '../utils/filter';
import { Filters } from './filters';
import { ProductCard } from './product-card';
import { ProductCount } from './product-count';
import { ProductsGrid } from './products-grid';
import { ProductsHeader } from './products-header';
import { Sorting } from './sorting';
import { Special } from './special';

export function Catalog({ products }: { products: Product[] }) {
  const brands = getUniqueBrands(products);
  const minPrice = getMinPrice(products);
  const maxPrice = getMaxPrice(products);

  return (
    <div className="flex flex-col items-stretch gap-6 lg:flex-row">
      <aside className="shrink-0 space-y-4 lg:w-[256px]">
        <Filters brands={brands} minPrice={minPrice} maxPrice={maxPrice} />
        <Special />
      </aside>
      <div className="grow space-y-6">
        <ProductsHeader>
          <ProductCount count={products.length} />
          <Sorting />
        </ProductsHeader>
        <ProductsGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsGrid>
      </div>
    </div>
  );
}
