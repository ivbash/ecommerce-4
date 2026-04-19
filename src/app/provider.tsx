import { GlobalStoreProvider } from '@/shared/stores/global';

export function Provider({ children }: { children: React.ReactNode }) {
  return <GlobalStoreProvider>{children}</GlobalStoreProvider>;
}
