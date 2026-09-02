import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  wrapperClassName?: string;
}

const ChevronIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3.5 5.25L7 8.75L10.5 5.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, hint, options, placeholder, wrapperClassName, className, id, ...props },
    ref,
  ) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-medium tracking-wider uppercase text-muted"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full h-10 bg-surface border rounded px-3 pr-9 text-sm text-foreground appearance-none',
              'transition-colors duration-200',
              'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20',
              'disabled:bg-surface-alt disabled:text-faint disabled:cursor-not-allowed',
              error
                ? 'border-error focus:border-error focus:ring-error/20'
                : 'border-border hover:border-border-strong',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="absolute right-3 text-subtle pointer-events-none">
            <ChevronIcon />
          </span>
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        {!error && hint && <p className="text-xs text-subtle">{hint}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;
