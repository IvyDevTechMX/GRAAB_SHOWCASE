import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export type BadgeVariant =
  | 'new'
  | 'sale'
  | 'reserved'
  | 'sold'
  | 'featured'
  | 'excellent'
  | 'good'
  | 'fair'
  | 'consignment'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: 'bg-primary text-ink',
  sale: 'bg-error-bg text-error border border-error/20',
  reserved: 'bg-warning-bg text-warning border border-warning/20',
  sold: 'bg-surface-warm text-muted border border-border',
  featured: 'bg-primary-light text-primary border border-primary/20',
  excellent: 'bg-success-bg text-success border border-success/20',
  good: 'bg-primary-light text-primary border border-primary/20',
  fair: 'bg-warning-bg text-warning border border-warning/20',
  consignment: 'bg-surface-warm text-muted border border-border',
  success: 'bg-success-bg text-success border border-success/20',
  warning: 'bg-warning-bg text-warning border border-warning/20',
  error: 'bg-error-bg text-error border border-error/20',
  neutral: 'bg-surface-alt text-muted border border-border',
};

const variantLabels: Partial<Record<BadgeVariant, string>> = {
  new: 'Nuevo',
  sale: 'Oferta',
  reserved: 'Reservado',
  sold: 'Vendido',
  featured: 'Destacado',
  excellent: 'Excelente',
  good: 'Bueno',
  fair: 'Regular',
  consignment: 'Consigna',
};

export default function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase rounded',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export { variantLabels };
