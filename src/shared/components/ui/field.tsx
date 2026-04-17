import { cn } from '@/shared/utils/css';

export function Field({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('space-y-2', className)} {...props} />;
}

export function FieldLabel({
  className,
  ...props
}: React.ComponentProps<'label'>) {
  return (
    <label
      className={cn('block text-base font-medium', className)}
      {...props}
    />
  );
}
