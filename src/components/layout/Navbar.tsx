import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface NavbarProps {
  brandName?: string;
  cartCount?: number;
  wishlistCount?: number;
  className?: string;
}

const navLinks = [
  { label: 'Inicio', href: '#' },
  { label: 'Catálogo', href: '#' },
  { label: 'Consignar', href: '#' },
  { label: 'Nosotros', href: '#' },
  { label: 'Contacto', href: '#' },
];

/* ─── Icon components ─── */
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 12L15.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M9 15.75S2.25 11.25 2.25 6.375a3.75 3.75 0 0 1 6.75-2.25A3.75 3.75 0 0 1 15.75 6.375C15.75 11.25 9 15.75 9 15.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill={filled ? 'currentColor' : 'none'}
    />
  </svg>
);
const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M2.25 2.25H3.75L5.25 11.25H13.5M5.625 4.5H15L13.5 11.25H5.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="7.5" cy="14.25" r="1" fill="currentColor" />
    <circle cx="12" cy="14.25" r="1" fill="currentColor" />
  </svg>
);
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M3 15.75a6 6 0 0 1 12 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function Navbar({
  brandName = 'VESTIRE',
  cartCount = 0,
  wishlistCount = 0,
  className,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-border',
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a
            href="#"
            className="font-heading text-xl font-medium tracking-[0.2em] text-foreground hover:text-primary transition-colors duration-200"
          >
            {brandName}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium tracking-wider uppercase text-muted hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              aria-label="Buscar"
              className="hidden sm:flex size-9 items-center justify-center rounded text-muted hover:text-foreground hover:bg-surface-alt transition-colors duration-200"
            >
              <SearchIcon />
            </button>

            <button
              aria-label={`Lista de deseos${wishlistCount > 0 ? ` (${wishlistCount})` : ''}`}
              className="relative hidden sm:flex size-9 items-center justify-center rounded text-muted hover:text-foreground hover:bg-surface-alt transition-colors duration-200"
            >
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 size-3.5 flex items-center justify-center bg-primary text-ink text-[9px] font-bold rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              aria-label={`Carrito${cartCount > 0 ? ` (${cartCount} artículos)` : ''}`}
              className="relative flex size-9 items-center justify-center rounded text-muted hover:text-foreground hover:bg-surface-alt transition-colors duration-200"
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 size-3.5 flex items-center justify-center bg-primary text-ink text-[9px] font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              aria-label="Mi cuenta"
              className="hidden sm:flex size-9 items-center justify-center rounded text-muted hover:text-foreground hover:bg-surface-alt transition-colors duration-200"
            >
              <UserIcon />
            </button>

            {/* Mobile menu toggle */}
            <button
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex md:hidden size-9 items-center justify-center rounded text-muted hover:text-foreground hover:bg-surface-alt transition-colors duration-200"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <nav className="flex flex-col py-2" aria-label="Menú móvil">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted hover:text-foreground hover:bg-surface-alt transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 px-4 py-3 border-t border-border">
            <button className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors duration-200">
              <SearchIcon />
              <span>Buscar</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors duration-200">
              <UserIcon />
              <span>Mi cuenta</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
