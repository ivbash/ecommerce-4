import { HomePage } from '@/features/home';
import { MainLayout } from '@/shared/components/layouts/main-layout';
import { Provider } from './provider';

export function App() {
  return (
    <Provider>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </Provider>
  );
}
