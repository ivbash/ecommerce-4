import { createContext, useContext, useState } from 'react';
import type { Cart } from '@/shared/types/cart';
import type { PageType } from '@/shared/types/page-type';

export const GlobalStoreContext = createContext<ReturnType<
  typeof useGlobalStoreState
> | null>(null);

export function useGlobalStoreState() {
  const [pageType, setPageType] = useState<PageType>('tv');
  const [cart, setCart] = useState<Cart>({});

  return {
    pageType,
    setPageType,
    cart,
    setCart,
  };
}

export function useGlobalStore() {
  const context = useContext(GlobalStoreContext);

  if (context === null) {
    throw new Error(
      'Make sure to use `GlobalStoreProvider` before using global store context.',
    );
  }

  return context;
}
