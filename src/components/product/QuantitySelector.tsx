import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface QuantitySelectorProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function QuantitySelector({
  value: controlledValue,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
  className,
}: QuantitySelectorProps) {
  const [internalValue, setInternalValue] = useState(min);
  const value = controlledValue ?? internalValue;

  const set = (next: number) => {
    const clamped = Math.min(Math.max(next, min), max);
    if (controlledValue === undefined) setInternalValue(clamped);
    onChange?.(clamped);
  };

  return (
    <div
      className={cn(
        'inline-flex items-center border border-border rounded overflow-hidden bg-surface',
        disabled && 'opacity-50',
        className,
      )}
      role="group"
      aria-label="Cantidad"
    >
      <button
        type="button"
        onClick={() => set(value - 1)}
        disabled={disabled || value <= min}
        aria-label="Disminuir cantidad"
        className="flex size-9 items-center justify-center text-muted hover:text-foreground hover:bg-surface-alt transition-colors duration-200 disabled:cursor-not-allowed disabled:text-faint border-r border-border"
      >
        <MinusIcon />
      </button>

      <span
        className="w-10 text-center text-sm font-medium text-foreground select-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => set(value + 1)}
        disabled={disabled || value >= max}
        aria-label="Aumentar cantidad"
        className="flex size-9 items-center justify-center text-muted hover:text-foreground hover:bg-surface-alt transition-colors duration-200 disabled:cursor-not-allowed disabled:text-faint border-l border-border"
      >
        <PlusIcon />
      </button>
    </div>
  );
}
