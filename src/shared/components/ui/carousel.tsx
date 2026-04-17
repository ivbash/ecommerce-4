import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ChevronDownIcon } from '@/shared/components/icons/chevron-down-icon';
import { cn } from '@/shared/utils/css';
import { Button } from './button';

const CarouselContext = createContext<ReturnType<
  typeof useCarouselState
> | null>(null);

export function Carousel({ className, ...props }: React.ComponentProps<'div'>) {
  const state = useCarouselState();

  return (
    <CarouselContext.Provider value={state}>
      <div className={cn('relative overflow-hidden', className)} {...props} />
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { currentSlide, setSlideCount } = useCarouselContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSlideCount(ref.current?.children.length ?? 0);
  }, [setSlideCount]);

  return (
    <div
      ref={ref}
      className={cn('flex transition-transform', className)}
      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
    >
      {children}
    </div>
  );
}

export function CarouselSlide({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('w-full shrink-0', className)} {...props} />;
}

export function CarouselPrev({ className }: { className?: string }) {
  const { prevSlide } = useCarouselContext();

  return (
    <CarouselButton className={cn('left-2', className)} onClick={prevSlide}>
      <ChevronDownIcon className="size-5 rotate-90" />
    </CarouselButton>
  );
}

export function CarouselNext({ className }: { className?: string }) {
  const { nextSlide } = useCarouselContext();

  return (
    <CarouselButton className={cn('right-2', className)} onClick={nextSlide}>
      <ChevronDownIcon className="size-5 -rotate-90" />
    </CarouselButton>
  );
}

function CarouselButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const { slideCount } = useCarouselContext();

  return (
    <Button
      type="button"
      size="icon-sm"
      className={cn(
        'absolute top-1/2 -translate-y-1/2 rounded-full border-background/90 bg-background/90 text-foreground',
        slideCount < 2 && 'hidden',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function CarouselIndicator({ className }: { className?: string }) {
  const { currentSlide, slideCount } = useCarouselContext();

  return (
    <div
      className={cn(
        'absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5',
        slideCount < 2 && 'hidden',
        className,
      )}
    >
      {Array.from({ length: slideCount }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'size-1.5 shrink-0 rounded-full bg-background/60 transition-[width,background-color] ease-linear',
            currentSlide === i && 'w-4 bg-primary',
          )}
        />
      ))}
    </div>
  );
}

function useCarouselContext() {
  const context = useContext(CarouselContext);

  if (context === null) {
    throw new Error(
      'Make sure to use `CarouselContext.Provider` before using carousel context.',
    );
  }

  return context;
}

function useCarouselState() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentSlide((currentSlide) =>
      currentSlide === 0 ? slideCount - 1 : currentSlide - 1,
    );
  }, [slideCount]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((currentSlide) =>
      currentSlide === slideCount - 1 ? 0 : currentSlide + 1,
    );
  }, [slideCount]);

  return {
    currentSlide,
    slideCount,
    prevSlide,
    nextSlide,
    setSlideCount,
  };
}
