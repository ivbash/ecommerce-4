import { cn } from '@/shared/utils/css';

const variants = {
  default: 'border-primary bg-primary text-primary-foreground',
  secondary: 'border-secondary bg-secondary text-secondary-foreground',
  ghost: 'border-transparent bg-transparent hover:opacity-50',
};

const sizes = {
  default: 'px-3 py-2',
  icon: 'size-10.5',
  'icon-sm': 'size-9',
  'icon-xs': 'size-6',
};

export function Button<T extends React.ElementType = 'button'>({
  variant = 'default',
  size = 'default',
  as,
  className,
  ...props
}: React.ComponentPropsWithoutRef<T> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  as?: T;
}) {
  const Component = as || 'button';

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center rounded-lg border text-base font-medium transition-opacity hover:opacity-80 disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
