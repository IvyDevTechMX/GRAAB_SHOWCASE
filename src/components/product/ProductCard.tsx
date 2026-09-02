import { useState } from 'react';
import { cn } from '@/lib/utils';
import Badge, { type BadgeVariant } from '@/components/ui/Badge';

export type Condition = 'excellent' | 'good' | 'fair';

export interface ProductCardProps {
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  condition?: Condition;
  size?: string;
  imageUrl?: string;
  imagePlaceholder?: string;
  badge?: 'new' | 'sale' | 'reserved' | 'sold' | 'featured';
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onQuickView?: () => void;
  onClick?: () => void;
  className?: string;
}

const conditionLabels: Record<Condition, string> = {
  excellent: 'Excelente',
  good: 'Bueno',
  fair: 'Regular',
};

const conditionBadge: Record<Condition, BadgeVariant> = {
  excellent: 'excellent',
  good: 'good',
  fair: 'fair',
};

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 14S1.75 10 1.75 5.75a3.25 3.25 0 0 1 6.25-1.25A3.25 3.25 0 0 1 14.25 5.75C14.25 10 8 14 8 14Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill={filled ? 'currentColor' : 'none'}
    />
  </svg>
);

const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path
      d="M1.5 7.5S3.5 3 7.5 3s6 4.5 6 4.5-2 4.5-6 4.5-6-4.5-6-4.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <circle cx="7.5" cy="7.5" r="1.75" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const formatPrice = (price: number) =>
  `$${price.toLocaleString('es-AR')}`;

const discountPercent = (original: number, current: number) =>
  Math.round(((original - current) / original) * 100);

export default function ProductCard({
  name,
  brand,
  price,
  originalPrice,
  condition,
  size,
  imageUrl,
  imagePlaceholder = 'linear-gradient(135deg, #f0eae4 0%, #e4d8ce 100%)',
  badge,
  isFavorite = false,
  onFavoriteToggle,
  onQuickView,
  onClick,
  className,
}: ProductCardProps) {
  const [favored, setFavored] = useState(isFavorite);

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavored((v) => !v);
    onFavoriteToggle?.();
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView?.();
  };

  const isSold = badge === 'sold';
  const isReserved = badge === 'reserved';
  const blocked = isSold || isReserved;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={!blocked ? onClick : undefined}
      onKeyDown={(e) => !blocked && e.key === 'Enter' && onClick?.()}
      className={cn(
        'group relative bg-surface rounded-xl overflow-hidden border border-border',
        'transition-shadow duration-300 hover:shadow-card',
        !blocked && 'cursor-pointer',
        blocked && 'cursor-default',
        className,
      )}
    >
      {/* Image */}
      <div
        className="relative aspect-[3/4] overflow-hidden bg-surface-alt"
        style={{ background: imageUrl ? undefined : imagePlaceholder }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Sold/Reserved overlay */}
        {blocked && (
          <div className="absolute inset-0 bg-surface/60 backdrop-blur-[2px] flex items-center justify-center">
            <Badge variant={badge as BadgeVariant} className="text-sm px-4 py-1.5">
              {badge === 'sold' ? 'Vendido' : 'Reservado'}
            </Badge>
          </div>
        )}

        {/* Top-left badge */}
        {badge && !blocked && (
          <div className="absolute top-3 left-3">
            <Badge variant={badge as BadgeVariant}>
              {badge === 'new' ? 'Nuevo' : badge === 'sale' ? 'Oferta' : badge === 'featured' ? 'Destacado' : badge}
            </Badge>
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={handleFav}
          aria-label={favored ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className={cn(
            'absolute top-3 right-3 size-8 flex items-center justify-center rounded-full bg-surface/80 backdrop-blur-sm',
            'transition-all duration-200',
            favored ? 'text-error' : 'text-muted opacity-0 group-hover:opacity-100',
            'hover:scale-110',
          )}
        >
          <HeartIcon filled={favored} />
        </button>

        {/* Quick view */}
        {!blocked && onQuickView && (
          <button
            onClick={handleQuickView}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 h-8 px-4 bg-surface/90 backdrop-blur-sm text-xs font-medium tracking-wider text-foreground rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap"
          >
            <EyeIcon />
            Ver detalles
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5">
        {brand && (
          <p className="text-[10px] font-medium tracking-widest uppercase text-subtle mb-0.5">
            {brand}
          </p>
        )}
        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 font-sans">
          {name}
        </h3>

        <div className="flex items-center justify-between mt-2.5">
          <div className="flex flex-col">
            <span
              className={cn(
                'font-heading text-lg font-medium',
                blocked ? 'text-muted' : 'text-foreground',
              )}
            >
              {formatPrice(price)}
            </span>
            {originalPrice && !blocked && (
              <span className="text-xs text-subtle line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            {condition && (
              <Badge variant={conditionBadge[condition]}>
                {conditionLabels[condition]}
              </Badge>
            )}
            {size && (
              <span className="text-[10px] font-medium tracking-wider text-subtle uppercase">
                Talle {size}
              </span>
            )}
          </div>
        </div>

        {originalPrice && !blocked && (
          <p className="mt-1.5 text-[10px] font-medium text-error">
            {discountPercent(originalPrice, price)}% de descuento
          </p>
        )}
      </div>
    </article>
  );
}
