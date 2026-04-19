import {
  LaptopListingPage,
  PhoneListingPage,
  TvListingPage,
} from '@/features/catalog';
import { usePageType } from '@/shared/hooks/use-page-type';

export function Content() {
  const { pageType } = usePageType();

  return (
    <>
      {pageType === 'tv' && <TvListingPage />}
      {pageType === 'phone' && <PhoneListingPage />}
      {pageType === 'laptop' && <LaptopListingPage />}
    </>
  );
}
