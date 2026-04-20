import { useId } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectOption } from '@/shared/components/ui/select';
import { parseNumber } from '@/shared/utils/parse';
import type { FiltersData } from '../utils/filter';

export function Filters({
  brands,
  minPrice,
  maxPrice,
  onFilter,
}: {
  brands: string[];
  minPrice: number;
  maxPrice: number;
  onFilter: (filters: FiltersData) => void;
}) {
  const brandId = useId();
  const priceId = useId();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const filters = Object.fromEntries(formData.entries()) as {
      brand: string;
      minPrice: string;
      maxPrice: string;
    };

    onFilter({
      brand: filters.brand,
      minPrice: parseNumber(filters.minPrice, minPrice),
      maxPrice: parseNumber(filters.maxPrice, maxPrice),
    });
  };

  return (
    <div className="rounded-lg border border-border p-4">
      <h2 className="pb-4 text-xl font-medium">Filters</h2>
      <form
        action="/"
        method="post"
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        <Field>
          <FieldLabel htmlFor={brandId}>Brand</FieldLabel>
          <Select name="brand" id={brandId}>
            {brands.map((brand) => (
              <SelectOption key={brand} value={brand}>
                {brand}
              </SelectOption>
            ))}
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor={priceId}>Price Range</FieldLabel>
          <div className="flex gap-2">
            <Input
              type="number"
              name="minPrice"
              id={priceId}
              placeholder={minPrice + ''}
            />
            <Input type="number" name="maxPrice" placeholder={maxPrice + ''} />
          </div>
        </Field>
        <Button type="submit" className="w-full">
          Apply Filters
        </Button>
      </form>
    </div>
  );
}
