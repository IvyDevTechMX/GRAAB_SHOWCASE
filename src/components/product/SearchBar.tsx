import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  defaultValue?: string;
  className?: string;
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export default function SearchBar({
  placeholder = 'Buscar prendas, marcas…',
  onSearch,
  defaultValue = '',
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={cn('relative flex items-center', className)}
    >
      <span className="absolute left-3.5 text-subtle pointer-events-none">
        <SearchIcon />
      </span>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          'w-full h-10 pl-10 pr-10 text-sm bg-surface border border-border rounded-full',
          'text-foreground placeholder:text-subtle',
          'transition-colors duration-200',
          'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20',
          'hover:border-border-strong',
        )}
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          className="absolute right-10 text-subtle hover:text-muted transition-colors duration-200"
        >
          <ClearIcon />
        </button>
      )}

      <button
        type="submit"
        aria-label="Buscar"
        className="absolute right-3 text-subtle hover:text-primary transition-colors duration-200"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cn('transition-transform duration-200', query && 'text-primary')}
        >
          <path
            d="M3 8h10M9.5 4.5L13 8l-3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}
