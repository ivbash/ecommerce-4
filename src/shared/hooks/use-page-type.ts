import { useGlobalStore } from '@/shared/stores/global';

export function usePageType() {
  const { pageType, setPageType } = useGlobalStore();
  return { pageType, setPageType };
}
