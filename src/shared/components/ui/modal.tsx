import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CrossIcon } from '@/shared/components/icons/cross-icon';
import { Button } from './button';

export function Modal({
  children,
  open,
  onClose,
}: {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    if (open) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  return (
    open &&
    createPortal(
      <>
        <ModalOverlay onClick={onClose} />
        <ModalContent onClose={onClose}>{children}</ModalContent>
      </>,
      document.getElementById('modal'),
    )
  );
}

function ModalOverlay({ onClick }: { onClick?: () => void }) {
  return <div className="fixed inset-0 z-50 bg-black/15" onClick={onClick} />;
}

function ModalContent({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-1/2 rounded-lg border border-border bg-background p-4 shadow-card sm:max-w-lg">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="absolute top-2 right-2 z-10"
        onClick={onClose}
      >
        <CrossIcon />
      </Button>
      {children}
    </div>
  );
}
