import { useId } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Container } from '@/shared/components/ui/container';
import { Input } from '@/shared/components/ui/input';
import { aboutMenu, legalMenu, supportMenu } from './footer-menu';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container>
        <FooterContent>
          <FooterMenu title={aboutMenu.title} data={aboutMenu.data} />
          <FooterMenu title={supportMenu.title} data={supportMenu.data} />
          <FooterMenu title={legalMenu.title} data={legalMenu.data} />
          <FooterNewsletter />
        </FooterContent>
        <FooterCopyright />
      </Container>
    </footer>
  );
}

function FooterContent({ children }: { children?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}

function FooterMenu({
  title,
  data,
}: {
  title: string;
  data: Array<{ title: string; href: string }>;
}) {
  return (
    <div>
      <h4 className="mb-3 text-lg font-medium">{title}</h4>
      <ul className="space-y-2">
        {data.map(({ title, href }, i) => (
          <FooterMenuItem key={i} title={title} href={href} />
        ))}
      </ul>
    </div>
  );
}

function FooterMenuItem({ title, href }: { title: string; href: string }) {
  return (
    <li className="text-base font-normal text-muted">
      <a href={href} className="transition-opacity hover:opacity-80">
        {title}
      </a>
    </li>
  );
}

function FooterNewsletter() {
  const emailId = useId();

  return (
    <div>
      <h4 className="mb-3 text-lg font-medium">Newsletter</h4>
      <label
        htmlFor={emailId}
        className="mb-3 block text-base font-normal text-muted"
      >
        Subscribe for exclusive deals
      </label>
      <form action="/" method="post" className="flex items-center gap-2">
        <Input type="text" name="email" id={emailId} placeholder="Email" />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  );
}

function FooterCopyright() {
  return (
    <p className="border-t border-border py-8 text-center text-base text-muted">
      © 2026 TechStore. All rights reserved.
    </p>
  );
}
