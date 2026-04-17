import { HomePage } from '@/features/home';
import { MainLayout } from '@/shared/components/layouts/main-layout';

export function App() {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
}
