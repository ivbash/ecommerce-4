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
  const [pageType, setPageType] = useSyncState(loadPageType, savePageType);
  const [cart, setCart] = useSyncState(loadCart, saveCart);
  const [showSpecial, setShowSpecial] = useState(true);

  return {
    pageType,
    setPageType,
    cart,
    setCart,
    showSpecial,
    setShowSpecial,
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

type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[];

function useSyncState<T extends JSONValue>(
  initialState: () => T,
  callback: (state: T) => void,
) {
  const [state, setState] = useState(initialState);
  const setStateInternal = useCallback(
    (s) => {
      callback(typeof s === 'function' ? s(state) : s);
      setState(s);
    },
    [callback, state],
  ) satisfies typeof setState;

  return [state, setStateInternal] as const;
}
