import { Footer } from './footer';

export function MainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <header>header</header>
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
