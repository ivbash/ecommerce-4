import { cn } from '@/shared/utils/css';

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col items-stretch rounded-lg border border-border bg-background text-foreground transition-shadow hover:shadow-card',
        className,
      )}
      {...props}
    />
  );
}

export function CardMedia({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('aspect-square overflow-hidden rounded-t-lg', className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('grow p-4', className)} {...props} />;
}
