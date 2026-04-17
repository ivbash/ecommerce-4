export type Product = {
  id: number;
  category: 'tv' | 'phone' | 'laptop';
  make: string;
  model: string;
  price: number;
  images: string[];
  isSpecialOffer?: boolean;
  brand: string;
};
