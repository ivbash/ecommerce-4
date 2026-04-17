import { cn } from '@/shared/utils/css';

export function Container({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-360', className)}
      {...props}
    />
  );
}
