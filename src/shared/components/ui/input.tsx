import { cn } from '@/shared/utils/css';

export function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        'w-full min-w-0 rounded-lg border border-border bg-input px-3 py-2 text-base font-medium text-input-foreground disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
