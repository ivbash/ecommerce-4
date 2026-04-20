import { useId } from 'react';
import { Select, SelectOption } from '@/shared/components/ui/select';

export function Sorting({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const sortId = useId();

  return (
    <div className="flex grow items-center justify-end gap-1">
      <label htmlFor={sortId} className="text-sm font-medium">
        Sort by:
      </label>
      <Select
        name="sort"
        id={sortId}
        className="max-w-44"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <SelectOption value="price-desc">Price: High to Low</SelectOption>
        <SelectOption value="price-asc">Price: Low to High</SelectOption>
      </Select>
    </div>
  );
}
