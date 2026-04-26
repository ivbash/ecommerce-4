import { useState } from 'react';
import { useShowingSpecial } from '@/shared/hooks/use-showing-special';
import type { Product } from '@/shared/types/product';
import {
  allBrands,
  filterProducts,
  getMaxPrice,
  getMinPrice,
  getUniqueBrands,
} from '../utils/filter';
import { sortByPrice } from '../utils/sort';
import { Filters } from './filters';
import { ProductCard } from './product-card';
import { ProductCount } from './product-count';
import { ProductsGrid } from './products-grid';
import { ProductsHeader } from './products-header';
import { Sorting } from './sorting';
import { Special } from './special';
import { WeatherWidget } from './weather-widget';

export function Catalog({ products }: { products: Product[] }) {
  const brands = [allBrands, ...getUniqueBrands(products)];
  const minPrice = getMinPrice(products);
  const maxPrice = getMaxPrice(products);

  const [filters, setFilters] = useState({
    brand: allBrands,
    minPrice,
    maxPrice,
  });
  const filteredProducts = filterProducts(products, filters);

  const [sorting, setSorting] = useState('price-asc');
  sortByPrice(filteredProducts, sorting === 'price-desc');

  const { isShow: isShowSpecial, hide: hideSpecial } = useShowingSpecial();
  const [isShowWeather, setIsShowWeather] = useState(true);

  return (
    <div className="flex flex-col items-stretch gap-6 lg:flex-row">
      <aside className="shrink-0 space-y-4 lg:w-[256px]">
        <Filters
          brands={brands}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onFilter={(filters) => setFilters(filters)}
        />
        {isShowSpecial && <Special onClose={hideSpecial} />}
        {isShowWeather && (
          <WeatherWidget onClose={() => setIsShowWeather(false)} />
        )}
      </aside>
      <div className="grow space-y-6">
        <ProductsHeader>
          <ProductCount count={filteredProducts.length} />
          <Sorting value={sorting} onChange={(value) => setSorting(value)} />
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
