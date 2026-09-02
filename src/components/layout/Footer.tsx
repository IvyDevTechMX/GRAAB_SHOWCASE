import { cn } from '@/lib/utils';

export interface FooterProps {
  brandName?: string;
  className?: string;
}

const footerLinks = {
  tienda: [
    { label: 'Catálogo', href: '#' },
    { label: 'Novedades', href: '#' },
    { label: 'Ofertas', href: '#' },
    { label: 'Marcas', href: '#' },
  ],
  consigna: [
    { label: '¿Cómo consignar?', href: '#' },
    { label: 'Condiciones', href: '#' },
    { label: 'Mis consignaciones', href: '#' },
    { label: 'Precios y comisiones', href: '#' },
  ],
  ayuda: [
    { label: 'Preguntas frecuentes', href: '#' },
    { label: 'Envíos y entregas', href: '#' },
    { label: 'Devoluciones', href: '#' },
    { label: 'Contacto', href: '#' },
  ],
};

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2.25" y="2.25" width="13.5" height="13.5" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="13.5" cy="4.5" r="0.75" fill="currentColor" />
  </svg>
);
const WhatsappIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M9 2.25A6.75 6.75 0 0 1 15.75 9c0 3.728-3.022 6.75-6.75 6.75a6.72 6.72 0 0 1-3.375-.906L2.25 15.75l.913-3.556A6.72 6.72 0 0 1 2.25 9 6.75 6.75 0 0 1 9 2.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M6.75 7.5c0 3 3.75 5.25 4.5 5.25.75 0 1.5-1.5 1.5-1.5s-1.5-.75-1.5-1.5c0-.5.75-1.5.75-1.5C11.25 7.5 10.5 6.75 9 7.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M15 2.25H3A.75.75 0 0 0 2.25 3v12A.75.75 0 0 0 3 15.75h6.75V10.5H8.25V8.25h1.5V7.125C9.75 5.714 10.66 4.5 12.375 4.5H14.25v2.25h-1.5c-.414 0-.75.336-.75.75v.75h2.25L14.25 10.5H12V15.75h3a.75.75 0 0 0 .75-.75V3A.75.75 0 0 0 15 2.25Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Footer({ brandName = 'VESTIRE', className }: FooterProps) {
  return (
    <footer className={cn('bg-surface-warm border-t border-border', className)}>
      {/* Newsletter */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl font-medium text-foreground">
                Novedades en tu bandeja
              </h3>
              <p className="mt-1 text-sm text-muted">
                Recibe primero las nuevas incorporaciones y ofertas exclusivas.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 sm:min-w-[340px]"
            >
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 h-10 px-3 text-sm bg-surface border border-border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 placeholder:text-subtle transition-colors duration-200"
              />
              <button
                type="submit"
                className="h-10 px-5 bg-primary text-ink text-sm font-medium tracking-wider rounded hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-heading text-xl font-medium tracking-[0.2em] text-foreground">
              {brandName}
            </span>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Moda de calidad en consignación y segunda mano. Prendas únicas con historia.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: <InstagramIcon />, label: 'Instagram' },
                { icon: <WhatsappIcon />, label: 'WhatsApp' },
                { icon: <FacebookIcon />, label: 'Facebook' },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-full border border-border text-muted hover:text-primary hover:border-primary transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-foreground mb-4">
              Tienda
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.tienda.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Consigna */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-foreground mb-4">
              Consignar
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.consigna.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-foreground mb-4">
              Ayuda
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.ayuda.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} {brandName}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {['Privacidad', 'Términos', 'Cookies'].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-subtle hover:text-muted transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
