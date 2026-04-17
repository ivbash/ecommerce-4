import { ChevronDownIcon } from '@/shared/components/icons/chevron-down-icon';
import { cn } from '@/shared/utils/css';

export function Select({
  className,
  ...props
}: React.ComponentProps<'select'>) {
  return (
    <div className={cn('relative w-full', className)}>
      <select
        className="w-full min-w-0 appearance-none rounded-lg border border-border bg-input py-2 pr-6 pl-3 text-base font-medium text-input-foreground"
        {...props}
      />
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2" />
    </div>
  );
}

export function SelectOption(props: React.ComponentProps<'option'>) {
  return <option {...props} />;
}
