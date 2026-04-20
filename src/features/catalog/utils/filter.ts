import type { Product } from '@/shared/types/product';

export function filterProductsByCategory(
  products: Product[],
  category: Product['category'],
) {
  return products.filter((p) => p.category === category);
}

export function getUniqueBrands(products: Product[]) {
  return products.reduce((brands, { brand }, i) => {
    if (products.findIndex((p) => p.brand === brand) === i) {
      brands.push(brand);
    }
    return brands;
  }, [] as string[]);
}

export function getMinPrice(products: Product[]) {
  return products.length
    ? products.reduce(
        (minPrice, { price }) => Math.min(price, minPrice),
        products[0].price,
      )
    : 0;
}

export function getMaxPrice(products: Product[]) {
  return products.reduce((maxPrice, { price }) => Math.max(price, maxPrice), 0);
}

export type FiltersData = {
  brand: string;
  minPrice: number;
  maxPrice: number;
};

export const allBrands = 'All Brands';

export function filterProducts(products: Product[], filters: FiltersData) {
  const filteredProductsByBrand =
    filters.brand === allBrands
      ? [...products]
      : filterProductsByBrand(products, filters.brand);

  const filteredProducts = filterProductsByPrice(
    filteredProductsByBrand,
    filters.minPrice,
    filters.maxPrice,
  );

  return filteredProducts;
}

export function filterProductsByBrand(products: Product[], brand: string) {
  return products.filter((p) => p.brand === brand);
}

export function filterProductsByPrice(
  products: Product[],
  minPrice: number,
  maxPrice: number,
) {
  return products.filter(({ price }) => price >= minPrice && price <= maxPrice);
}
