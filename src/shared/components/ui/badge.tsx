import { cn } from '@/shared/utils/css';

export function Badge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground',
        className,
      )}
      {...props}
    />
  );
}
