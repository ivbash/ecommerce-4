import { Filters } from './filters';
import { ProductCount } from './product-count';
import { ProductsHeader } from './products-header';
import { Sorting } from './sorting';
import { Special } from './special';

export function HomePage() {
  return (
    <div className="flex flex-col items-stretch gap-6 lg:flex-row">
      <aside className="shrink-0 space-y-4 lg:w-[256px]">
        <Filters />
        <Special />
      </aside>
      <div className="grow space-y-6">
        <ProductsHeader>
          <ProductCount count={8} />
          <Sorting />
        </ProductsHeader>
      </div>
    </div>
  );
}
