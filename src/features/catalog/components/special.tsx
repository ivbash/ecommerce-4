import { ClockIcon } from '@/shared/components/icons/clock-icon';
import { CrossIcon } from '@/shared/components/icons/cross-icon';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/css';
import { useTimer } from '../hooks/use-timer';
import { formatTime } from '../utils/format';

export function Special({ onClose }: { onClose?: () => void }) {
  const { time, isRunning, start, stop, restart } = useTimer();
  const timeIsUp = !time;

  return (
    <div className="relative rounded-lg bg-linear-to-r from-accent to-accent/80 p-4 text-sm font-normal text-accent-foreground">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="absolute top-2 right-2 z-10"
        onClick={onClose}
      >
        <CrossIcon />
      </Button>
      <h2 className="flex items-center gap-2 text-lg font-medium">
        <ClockIcon />
        <span>Special Deal!</span>
      </h2>
      <p>Register now to unlock exclusive offers and discounts</p>
      <p className="flex items-center justify-between gap-2">
        <span>Offer expires in:</span>
        <span
          className={cn(
            'font-mono text-lg font-bold',
            timeIsUp && 'text-sm/loose',
          )}
        >
          {timeIsUp ? 'Таймер истек' : formatTime(time)}
        </span>
      </p>
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          className="px-1 py-0.5 text-sm"
          onClick={() => {
            if (isRunning) stop();
            else start();
          }}
          disabled={timeIsUp}
        >
          {isRunning ? 'Стоп' : 'Возобновить'}
        </Button>
        <Button
          type="button"
          variant={timeIsUp ? 'default' : 'secondary'}
          className="px-1 py-0.5 text-sm"
          onClick={restart}
        >
          Рестарт
        </Button>
      </div>
    </div>
  );
}
