import { cn } from '@/lib/utils';

export interface CategoryCardProps {
  name: string;
  count?: number;
  imageUrl?: string;
  imagePlaceholder?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const inner = (name: string, count: number | undefined) => (
  <>
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="flex items-end justify-between gap-2">
        <div>
          <h3 className="font-heading text-xl font-medium text-ink leading-tight">{name}</h3>
          {count !== undefined && (
            <p className="text-xs text-ink/70 mt-0.5">
              {count} {count === 1 ? 'prenda' : 'prendas'}
            </p>
          )}
        </div>
        <span className="flex items-center justify-center size-8 rounded-full bg-ink/20 text-ink backdrop-blur-sm transition-transform duration-200 group-hover:translate-x-1 shrink-0">
          <ArrowIcon />
        </span>
      </div>
    </div>
  </>
);

const sharedClass = (className?: string) =>
  cn(
    'group relative block aspect-[3/4] rounded-xl overflow-hidden bg-surface-alt',
    'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
    className,
  );

export default function CategoryCard({
  name,
  count,
  imageUrl,
  imagePlaceholder = 'linear-gradient(135deg, #ede8e3 0%, #d9d0c7 100%)',
  href = '#',
  onClick,
  className,
}: CategoryCardProps) {
  const style = { background: imageUrl ? undefined : imagePlaceholder };
  const img = imageUrl ? (
    <img
      src={imageUrl}
      alt={name}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  ) : null;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(sharedClass(className), 'w-full')}
        style={style}
      >
        {img}
        {inner(name, count)}
      </button>
    );
  }

  return (
    <a href={href} className={sharedClass(className)} style={style}>
      {img}
      {inner(name, count)}
    </a>
  );
}
