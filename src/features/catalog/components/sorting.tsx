import { useId } from 'react';
import { Select, SelectOption } from '@/shared/components/ui/select';

export function Sorting() {
  const sortId = useId();

  return (
    <div className="flex grow items-center justify-end gap-1">
      <label htmlFor={sortId} className="text-sm font-medium">
        Sort by:
      </label>
      <Select name="sort" id={sortId} className="max-w-44">
        <SelectOption value="price-desc">Price: High to Low</SelectOption>
        <SelectOption value="price-asc">Price: Low to High</SelectOption>
      </Select>
    </div>
  );
}
