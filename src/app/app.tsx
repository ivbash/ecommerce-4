import { MainLayout } from '@/shared/components/layouts/main-layout';
import { Content } from './content';
import { Provider } from './provider';

export function App() {
  return (
    <Provider>
      <MainLayout>
        <Content />
      </MainLayout>
    </Provider>
  );
}
