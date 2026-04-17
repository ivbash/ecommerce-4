import { Container } from '@/shared/components/ui/container';
import { Footer } from './footer';
import { Header } from './header';

export function MainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="grow pt-6 pb-14 lg:pt-8 lg:pb-16">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
}
