import { useState } from 'react';
import { HeartIcon } from '@/shared/components/icons/heart-icon';
import { MinusIcon } from '@/shared/components/icons/minus-icon';
import { PlusIcon } from '@/shared/components/icons/plus-icon';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardMedia } from '@/shared/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselNext,
  CarouselPrev,
  CarouselSlide,
} from '@/shared/components/ui/carousel';
import { useCart } from '@/shared/hooks/use-cart';
import type { Product } from '@/shared/types/product';
import { cn } from '@/shared/utils/css';
import { formatPrice } from '@/shared/utils/format';

export function ProductCard({ product }: { product: Product }) {
  const [favorite, setFavorite] = useState(false);
  const { cart, add, removeOne } = useCart();
  const count = cart[product.id] ?? 0;

  return (
    <Card className="group/card relative">
      <CardMedia>
        <Carousel className="group/carousel">
          <CarouselContent>
            {product.images.map((href, i) => (
              <CarouselSlide key={href}>
                <img
                  src={href}
                  alt={`Slide ${i + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </CarouselSlide>
            ))}
          </CarouselContent>
          <CarouselPrev
            className={cn(
              'hidden group-hover/carousel:flex',
              product.images.length < 2 && 'group-hover/carousel:hidden',
            )}
          />
          <CarouselNext
            className={cn(
              'hidden group-hover/carousel:flex',
              product.images.length < 2 && 'group-hover/carousel:hidden',
            )}
          />
          <CarouselIndicator />
        </Carousel>
      </CardMedia>
      <CardContent className="flex flex-col items-stretch">
        {product.isSpecialOffer && (
          <ProductCardSpecial className="absolute top-2 left-2" />
        )}
        <ProductCardFavorite
          className="absolute top-2 right-2 hidden group-hover/card:flex"
          favorite={favorite}
          onClick={() => setFavorite((f) => !f)}
        />
        <h3 className="mb-2 flex flex-col gap-1">
          <span className="text-sm font-normal text-muted">{product.make}</span>
          <span className="line-clamp-2 min-h-14 text-lg font-medium">
            {product.model}
          </span>
        </h3>
        <div className="mt-auto mb-3 text-xl font-normal">
          {formatPrice(product.price)}
        </div>
        {count > 0 ? (
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => removeOne(product.id)}
            >
              <MinusIcon />
            </Button>
            <span>{count} in cart</span>
            <Button type="button" size="icon" onClick={() => add(product.id)}>
              <PlusIcon />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            className="w-full"
            onClick={() => add(product.id)}
          >
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function ProductCardSpecial({ className }: { className?: string }) {
  return (
    <strong
      className={cn(
        'rounded-sm bg-accent px-1.5 py-1 text-xs font-normal text-accent-foreground',
        className,
      )}
    >
      Special Offer
    </strong>
  );
}

function ProductCardFavorite({
  className,
  favorite,
  onClick,
}: {
  className?: string;
  favorite?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      type="button"
      className={cn(
        'size-8 border-background bg-background/90 p-0 text-foreground',
        favorite && 'border-accent bg-accent text-accent-foreground',
        className,
      )}
      onClick={onClick}
    >
      <HeartIcon />
    </Button>
  );
}
