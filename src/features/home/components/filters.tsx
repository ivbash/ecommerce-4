import { useId } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectOption } from '@/shared/components/ui/select';

export function Filters() {
  const brandId = useId();
  const priceId = useId();

  return (
    <div className="rounded-lg border border-border p-4">
      <h2 className="pb-4 text-xl font-medium">Filters</h2>
      <form action="/" method="post" className="space-y-6">
        <Field>
          <FieldLabel htmlFor={brandId}>Brand</FieldLabel>
          <Select name="brand" id={brandId}>
            <SelectOption value="tv">tv</SelectOption>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor={priceId}>Price Range</FieldLabel>
          <div className="flex gap-2">
            <Input type="text" name="priceMin" id={priceId} placeholder="0" />
            <Input type="text" name="priceMax" placeholder="5000" />
          </div>
        </Field>
        <Button type="submit" className="w-full">
          Apply Filters
        </Button>
      </form>
    </div>
  );
}
