import { cn } from '@/shared/utils/css';

export function Item({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex gap-4 rounded-lg border border-border bg-background p-4 text-foreground',
        className,
      )}
      {...props}
    />
  );
}

export function ItemMedia({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'aspect-square w-24 shrink-0 overflow-hidden rounded-lg',
        className,
      )}
      {...props}
    />
  );
}

export function ItemContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('grow', className)} {...props} />;
}
