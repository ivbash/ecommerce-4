import { MinusIcon } from '@/shared/components/icons/minus-icon';
import { PlusIcon } from '@/shared/components/icons/plus-icon';
import { TrashIcon } from '@/shared/components/icons/trash-icon';
import { Button } from '@/shared/components/ui/button';
import { Item, ItemContent, ItemMedia } from '@/shared/components/ui/item';
import { useCart } from '@/shared/hooks/use-cart';
import type { Product } from '@/shared/types/product';
import { formatPrice } from '@/shared/utils/format';

export function CartItem({ product }: { product: Product }) {
  const { cart, add, remove, removeOne } = useCart();
  const count = cart[product.id];

  return (
    <Item>
      <ItemMedia>
        <img
          src={product.images[0]}
          alt={product.images[0]}
          className="aspect-square w-full object-cover"
        />
      </ItemMedia>
      <ItemContent className="min-w-0">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="flex min-w-0 flex-col">
            <span className="text-sm font-normal text-muted">
              {product.make}
            </span>
            <span className="overflow-hidden text-lg font-medium text-ellipsis whitespace-nowrap">
              {product.model}
            </span>
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-accent"
            onClick={() => remove(product.id)}
          >
            <TrashIcon />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="size-8"
              onClick={() => removeOne(product.id)}
            >
              <MinusIcon />
            </Button>
            <span className="text-center text-base font-medium min-[360px]:min-w-12">
              {count}
            </span>
            <Button
              type="button"
              size="icon"
              className="size-8"
              onClick={() => add(product.id)}
            >
              <PlusIcon />
            </Button>
          </div>
          <div className="text-xl font-normal">
            {formatPrice(product.price)}
          </div>
        </div>
      </ItemContent>
    </Item>
  );
}
