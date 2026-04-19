import { CartIcon } from '@/shared/components/icons/cart-icon';
import { UserIcon } from '@/shared/components/icons/user-icon';
import { Button } from '@/shared/components/ui/button';
import { Container } from '@/shared/components/ui/container';
import { categories } from '@/shared/config/categories';
import { usePageType } from '@/shared/hooks/use-page-type';
import type { CategoryType } from '@/shared/types/category-type';
import { cn } from '@/shared/utils/css';

export function Header() {
  const { pageType } = usePageType();
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <Container className="flex flex-wrap items-center gap-y-7 py-3.5 sm:gap-x-7 sm:gap-y-0">
        <Logo />
        {categories.includes(pageType) && <CatalogTabs />}
        <UserBlock />
      </Container>
    </header>
  );
}

function Logo() {
  return (
    <a href="/tv" className="block text-xl font-medium sm:text-2xl">
      TechStore
    </a>
  );
}

function CatalogTabs() {
  return (
    <nav className="order-last -mb-3.5 flex w-full items-center justify-between gap-4 border-t border-border py-3 sm:order-0 sm:mb-0 sm:w-auto sm:gap-6 sm:border-none sm:py-0">
      <CatalogTabsLink title="TV" href="#" category="tv" />
      <CatalogTabsLink title="Phone" href="#" category="phone" />
      <CatalogTabsLink title="Laptop" href="#" category="laptop" />
    </nav>
  );
}

function CatalogTabsLink({
  title,
  href,
  category,
}: {
  title: string;
  href: string;
  category: CategoryType;
}) {
  const { pageType, setPageType } = usePageType();

  return (
    <a
      href={href}
      className={cn(
        'grow border-b-2 border-transparent p-2 text-center text-base font-medium text-muted transition-opacity hover:opacity-80 sm:border-b-0 sm:p-0',
        pageType === category &&
          'pointer-events-none border-foreground text-foreground hover:opacity-100',
      )}
      onClick={(e) => {
        e.preventDefault();
        setPageType(category);
      }}
    >
      {title}
    </a>
  );
}

function UserBlock() {
  const { setPageType } = usePageType();

  return (
    <div className="ml-auto flex gap-4">
      <Button
        as="a"
        variant="ghost"
        size="icon"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setPageType('cart');
        }}
      >
        <CartIcon />
      </Button>
      <Button as="a" variant="ghost" size="icon" href="#">
        <UserIcon />
      </Button>
    </div>
  );
}
