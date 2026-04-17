import { CartIcon } from '@/shared/components/icons/cart-icon';
import { UserIcon } from '@/shared/components/icons/user-icon';
import { Button } from '@/shared/components/ui/button';
import { Container } from '@/shared/components/ui/container';
import { cn } from '@/shared/utils/css';

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <Container className="flex flex-wrap items-center gap-y-7 py-3.5 sm:gap-x-7 sm:gap-y-0">
        <Logo />
        <MainNav />
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

function MainNav() {
  return (
    <nav className="order-last -mb-3.5 flex w-full items-center justify-between gap-4 border-t border-border py-3 sm:order-0 sm:mb-0 sm:w-auto sm:gap-6 sm:border-none sm:py-0">
      <MainNavLink title="TV" href="#" selected />
      <MainNavLink title="Phone" href="#" />
      <MainNavLink title="Laptop" href="#" />
    </nav>
  );
}

function MainNavLink({
  title,
  href,
  selected,
}: {
  title: string;
  href: string;
  selected?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        'grow border-b-2 border-transparent p-2 text-center text-base font-medium text-muted transition-opacity hover:opacity-80 sm:border-b-0 sm:p-0',
        selected &&
          'pointer-events-none border-foreground text-foreground hover:opacity-100',
      )}
    >
      {title}
    </a>
  );
}

function UserBlock() {
  return (
    <div className="ml-auto flex gap-4">
      <Button as="a" variant="ghost" size="icon" href="#">
        <CartIcon />
      </Button>
      <Button as="a" variant="ghost" size="icon" href="#">
        <UserIcon />
      </Button>
    </div>
  );
}
