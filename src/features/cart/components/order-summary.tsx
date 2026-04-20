import { Button } from '@/shared/components/ui/button';
import { usePageType } from '@/shared/hooks/use-page-type';
import { cn } from '@/shared/utils/css';
import { formatPrice } from '@/shared/utils/format';

export function OrderSummary({ className }: { className?: string }) {
  const { setPageType } = usePageType();

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
          <span className="text-foreground">{formatPrice(1398, true)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span>Tax (8%)</span>
          <span className="text-foreground">{formatPrice(118.8568, true)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </p>
        <p className="flex items-center justify-between border-t border-border pt-3 font-medium text-foreground">
          <span>Total</span>
          <span className="text-xl">{formatPrice(1498, true)}</span>
        </p>
      </div>
      <div className="mt-6 flex flex-col items-stretch gap-3">
        <Button>Proceed to Checkout</Button>
        <Button
          as="a"
          href="/tv"
          variant="ghost"
          className="border border-border bg-background text-foreground"
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
