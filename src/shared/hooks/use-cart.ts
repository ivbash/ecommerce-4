import { useCallback } from 'react';
import { useGlobalStore } from '@/shared/stores/global';
import type { Product } from '@/shared/types/product';

export function useCart() {
  const { cart, setCart } = useGlobalStore();

  const add = useCallback(
    (id: Product['id']) => {
      setCart((c) => ({
        ...c,
        [id]: c[id] ? c[id] + 1 : 1,
      }));
    },
    [setCart],
  );

  const removeOne = useCallback(
    (id: Product['id']) => {
      setCart((c) => {
        const newCart = { ...c };

        if (newCart[id] > 1) {
          newCart[id] -= 1;
        } else {
          delete newCart[id];
        }

        return newCart;
      });
    },
    [setCart],
  );

  const remove = useCallback(
    (id: Product['id']) => {
      setCart((c) => {
        const newCart = { ...c };
        delete newCart[id];
        return newCart;
      });
    },
    [setCart],
  );

  return { cart, add, removeOne, remove };
}
