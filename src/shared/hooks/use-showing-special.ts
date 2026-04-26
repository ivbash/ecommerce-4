import { useCallback } from 'react';
import { useGlobalStore } from '@/shared/stores/global';

export function useShowingSpecial() {
  const { showSpecial, setShowSpecial } = useGlobalStore();
  const show = useCallback(() => setShowSpecial(true), [setShowSpecial]);
  const hide = useCallback(() => setShowSpecial(false), [setShowSpecial]);

  return { isShow: showSpecial, show, hide };
}
