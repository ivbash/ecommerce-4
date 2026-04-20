import { createContext, useCallback, useContext, useState } from 'react';
import {
  loadCart,
  loadPageType,
  saveCart,
  savePageType,
} from '@/data/session-storage';

export const GlobalStoreContext = createContext<ReturnType<
  typeof useGlobalStoreState
> | null>(null);

export function useGlobalStoreState() {
  const [pageType, setPageType] = useState(() => loadPageType());
  const [cart, setCart] = useState(() => loadCart());

  const setPageTypeInternal: typeof setPageType = useCallback(
    (pt) => {
      savePageType(typeof pt === 'function' ? pt(pageType) : pt);
      setPageType(pt);
    },
    [pageType],
  );

  const setCartInternal: typeof setCart = useCallback(
    (c) => {
      saveCart(typeof c === 'function' ? c(cart) : c);
      setCart(c);
    },
    [cart],
  );

  return {
    pageType,
    setPageType: setPageTypeInternal,
    cart,
    setCart: setCartInternal,
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
