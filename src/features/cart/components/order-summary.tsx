import { Button } from '@/shared/components/ui/button';
import { useCart } from '@/shared/hooks/use-cart';
import { usePageType } from '@/shared/hooks/use-page-type';
import type { Product } from '@/shared/types/product';
import { cn } from '@/shared/utils/css';
import { formatPrice } from '@/shared/utils/format';
import { round } from '@/shared/utils/math';
import { calculateSubtotal } from '../utils/calculate-subtotal';

export function OrderSummary({
  className,
  products,
}: {
  className?: string;
  products: Product[];
}) {
  const { setPageType } = usePageType();
  const { cart } = useCart();

  const subtotal = round(calculateSubtotal(cart, products), 2);
  const tax = round(subtotal * 0.08, 2);
  const total = round(subtotal + tax, 2);

  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-background p-6',
        className,
      )}
    >
      <h2 className="mb-4 text-xl font-medium">Order Summary</h2>
      <div className="space-y-3 text-base font-normal text-muted">
        <p className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="text-foreground">{formatPrice(subtotal, true)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span>Tax (8%)</span>
          <span className="text-foreground">{formatPrice(tax, true)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </p>
        <p className="flex items-center justify-between border-t border-border pt-3 font-medium text-foreground">
          <span>Total</span>
          <span className="text-xl">{formatPrice(total, true)}</span>
        </p>
      </div>
      <div className="mt-6 flex flex-col items-stretch gap-3">
        <Button className="py-3">Proceed to Checkout</Button>
        <Button
          as="a"
          href="/tv"
          variant="ghost"
          className="border border-border bg-background py-3 text-foreground"
          onClick={(e) => {
            e.preventDefault();
            setPageType('tv');
          }}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
