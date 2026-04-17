import type { Product } from '@/shared/types/product';

export function getProductsByCategory(
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
