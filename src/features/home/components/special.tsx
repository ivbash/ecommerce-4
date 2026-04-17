import { ClockIcon } from '@/shared/components/icons/clock-icon';
import { CrossIcon } from '@/shared/components/icons/cross-icon';
import { Button } from '@/shared/components/ui/button';

export function Special() {
  return (
    <div className="relative rounded-lg bg-linear-to-r from-accent to-accent/80 p-4 text-sm font-normal text-accent-foreground">
      <Button variant="ghost" size="icon-xs" className="absolute top-2 right-2">
        <CrossIcon />
      </Button>
      <h2 className="flex items-center gap-2 text-lg font-medium">
        <ClockIcon />
        <span>Special Deal!</span>
      </h2>
      <p>Register now to unlock exclusive offers and discounts</p>
      <p className="flex items-center justify-between gap-2">
        <span>Offer expires in:</span>
        <span className="font-mono text-lg font-bold">0:59:59</span>
      </p>
    </div>
  );
}
