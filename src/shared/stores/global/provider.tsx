import { GlobalStoreContext, useGlobalStoreState } from './context';

export function GlobalStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = useGlobalStoreState();
  return (
    <GlobalStoreContext.Provider value={state}>
      {children}
    </GlobalStoreContext.Provider>
  );
}
