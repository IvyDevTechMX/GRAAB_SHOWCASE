import { useState } from 'react';

/* Layout */
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* UI */
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';

/* Product */
import ProductCard from '@/components/product/ProductCard';
import CategoryCard from '@/components/product/CategoryCard';
import QuantitySelector from '@/components/product/QuantitySelector';
import SearchBar from '@/components/product/SearchBar';

/* ─── Color token data ─── */
const colorTokens = [
  { name: 'Primary', hex: '#7A6050', token: '--color-primary', dark: true },
  { name: 'Primary Dark', hex: '#5E4736', token: '--color-primary-dark', dark: true },
  { name: 'Primary Light', hex: '#F0EAE4', token: '--color-primary-light', dark: false },
  { name: 'Secondary', hex: '#B5A99A', token: '--color-secondary', dark: false },
  { name: 'Canvas', hex: '#FAF8F5', token: '--color-canvas', dark: false, border: true },
  { name: 'Surface', hex: '#FFFFFF', token: '--color-surface', dark: false, border: true },
  { name: 'Surface Alt', hex: '#F5F2EE', token: '--color-surface-alt', dark: false, border: true },
  { name: 'Surface Warm', hex: '#EDE8E3', token: '--color-surface-warm', dark: false, border: true },
  { name: 'Foreground', hex: '#1C1917', token: '--color-foreground', dark: true },
  { name: 'Muted', hex: '#78716C', token: '--color-muted', dark: true },
  { name: 'Subtle', hex: '#A8A29E', token: '--color-subtle', dark: false },
  { name: 'Faint', hex: '#C4BEB9', token: '--color-faint', dark: false },
  { name: 'Border', hex: '#E7E5E4', token: '--color-border', dark: false, border: true },
  { name: 'Success', hex: '#4A7C59', token: '--color-success', dark: true },
  { name: 'Warning', hex: '#B58B3A', token: '--color-warning', dark: false },
  { name: 'Error', hex: '#B05252', token: '--color-error', dark: true },
];

/* ─── Typography specimens ─── */
const typographyScale = [
  { name: 'H1 — Display', size: 'text-5xl', font: 'font-heading', weight: 'font-light', sample: 'Moda atemporal', meta: 'Cormorant Garamond · 48px · Light 300' },
  { name: 'H2 — Título', size: 'text-4xl', font: 'font-heading', weight: 'font-normal', sample: 'Nueva colección', meta: 'Cormorant Garamond · 36px · Regular 400' },
  { name: 'H3 — Sección', size: 'text-3xl', font: 'font-heading', weight: 'font-medium', sample: 'Prendas seleccionadas', meta: 'Cormorant Garamond · 30px · Medium 500' },
  { name: 'H4 — Tarjeta', size: 'text-xl', font: 'font-heading', weight: 'font-medium', sample: 'Blazer de lino italiano', meta: 'Cormorant Garamond · 20px · Medium 500' },
  { name: 'Body', size: 'text-base', font: 'font-sans', weight: 'font-normal', sample: 'Cada prenda tiene una historia única. Encontrá tu estilo en nuestra colección de moda en consignación.', meta: 'DM Sans · 16px · Regular 400' },
  { name: 'Small', size: 'text-sm', font: 'font-sans', weight: 'font-normal', sample: 'Talle M · Condición excelente · Marca Zara', meta: 'DM Sans · 14px · Regular 400' },
  { name: 'Button / Label', size: 'text-xs', font: 'font-sans', weight: 'font-medium', sample: 'AGREGAR AL CARRITO', meta: 'DM Sans · 12px · Medium 500 · tracking-wider', extra: 'tracking-wider uppercase' },
  { name: 'Price', size: 'text-2xl', font: 'font-heading', weight: 'font-medium', sample: '$3.200', meta: 'Cormorant Garamond · 24px · Medium 500' },
  { name: 'Caption', size: 'text-xs', font: 'font-sans', weight: 'font-normal', sample: '© 2025 · Política de privacidad · Términos de uso', meta: 'DM Sans · 12px · Regular 400', extra: 'text-subtle' },
];

/* ─── Mock product data ─── */
const mockProducts = [
  {
    id: 1,
    name: 'Vestido midi floral con volados',
    brand: 'Zara',
    price: 2500,
    originalPrice: undefined,
    condition: 'excellent' as const,
    size: 'M',
    imagePlaceholder: 'linear-gradient(145deg, #f5e6e8 0%, #e8c8d0 60%, #d9b0bb 100%)',
    badge: 'new' as const,
  },
  {
    id: 2,
    name: 'Blusa de seda manga larga',
    brand: 'Massimo Dutti',
    price: 1800,
    originalPrice: 4200,
    condition: 'good' as const,
    size: 'S',
    imagePlaceholder: 'linear-gradient(145deg, #e8e4df 0%, #d4cfc9 60%, #c0b8af 100%)',
    badge: 'sale' as const,
  },
  {
    id: 3,
    name: 'Blazer oversize gris perla',
    brand: 'Mango',
    price: 3200,
    originalPrice: undefined,
    condition: 'excellent' as const,
    size: 'L',
    imagePlaceholder: 'linear-gradient(145deg, #e6e0d8 0%, #cec6bb 60%, #b8b0a4 100%)',
    badge: undefined,
  },
  {
    id: 4,
    name: 'Jeans tiro alto cropped',
    brand: "Levi's",
    price: 2100,
    originalPrice: 3500,
    condition: 'fair' as const,
    size: '28',
    imagePlaceholder: 'linear-gradient(145deg, #dce8f0 0%, #b8d0e0 60%, #96b8cc 100%)',
    badge: 'sale' as const,
  },
];

const mockCategories = [
  { name: 'Vestidos', count: 48, placeholder: 'linear-gradient(145deg, #f5e6e8 0%, #c8a0a8 100%)' },
  { name: 'Blazers', count: 23, placeholder: 'linear-gradient(145deg, #e8e0d5 0%, #b4a090 100%)' },
  { name: 'Blusas', count: 67, placeholder: 'linear-gradient(145deg, #ede8e3 0%, #c4b4a4 100%)' },
  { name: 'Accesorios', count: 35, placeholder: 'linear-gradient(145deg, #ede4c8 0%, #c0a870 100%)' },
];

/* ─── Section wrapper ─── */
function Section({ id, title, subtitle, children }: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-12 border-b border-border last:border-0">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-8 bg-primary" />
          <span className="text-xs font-medium tracking-widest uppercase text-primary">
            {id.toString().padStart(2, '0')}
          </span>
        </div>
        <h2 className="font-heading text-3xl font-light text-foreground">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

/* ─── Demo box ─── */
function DemoBox({ label, children, className = '' }: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-medium tracking-widest uppercase text-subtle">{label}</p>
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>{children}</div>
    </div>
  );
}

/* ─── App ─── */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('');

  const SearchIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 9L12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className="min-h-full flex flex-col">
      {/* ── Navbar preview ── */}
      <Navbar brandName="VESTIRE" cartCount={3} wishlistCount={5} />

      {/* ── Hero ── */}
      <div className="bg-surface-warm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
            Design System v1.0
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl font-light text-foreground leading-tight">
            VESTIRE
          </h1>
          <p className="mt-3 text-base text-muted max-w-lg leading-relaxed">
            Sistema de diseño para plataforma de moda en consignación y segunda mano.
            Minimalista, cálido y centrado en la fotografía.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Badge variant="consignment">Consignación</Badge>
            <Badge variant="new">Nuevo</Badge>
            <Badge variant="excellent">Excelente estado</Badge>
            <Badge variant="neutral">Segunda mano</Badge>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── 01 Colors ── */}
          <Section id="01" title="Paleta de colores" subtitle="Tonos neutros y cálidos que dejan protagonismo a las fotografías.">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {colorTokens.map((c) => (
                <div key={c.token} className="flex flex-col gap-2">
                  <div
                    className={`h-16 rounded-lg ${c.border ? 'border border-border' : ''}`}
                    style={{ backgroundColor: c.hex }}
                  />
                  <div>
                    <p className="text-xs font-medium text-foreground">{c.name}</p>
                    <p className="text-[10px] text-subtle font-mono">{c.hex}</p>
                    <p className="text-[10px] text-faint font-mono leading-tight">{c.token}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Status colors */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Éxito', bg: 'bg-success-bg', border: 'border-success/20', text: 'text-success', hex: '#4A7C59', sample: 'Prenda disponible' },
                { label: 'Advertencia', bg: 'bg-warning-bg', border: 'border-warning/20', text: 'text-warning', hex: '#B58B3A', sample: 'Último disponible' },
                { label: 'Error', bg: 'bg-error-bg', border: 'border-error/20', text: 'text-error', hex: '#B05252', sample: 'No disponible' },
              ].map((s) => (
                <div key={s.label} className={`flex items-center gap-3 p-4 rounded-lg border ${s.bg} ${s.border}`}>
                  <div
                    className="size-8 rounded-full shrink-0"
                    style={{ backgroundColor: s.hex }}
                  />
                  <div>
                    <p className={`text-sm font-medium ${s.text}`}>{s.label}</p>
                    <p className={`text-xs ${s.text} opacity-80`}>{s.sample}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 02 Typography ── */}
          <Section id="02" title="Tipografía" subtitle="Cormorant Garamond para títulos — elegante y editorial. DM Sans para cuerpo — limpio y moderno.">
            <div className="flex flex-col divide-y divide-border">
              {typographyScale.map((t) => (
                <div key={t.name} className="py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="w-36 shrink-0">
                    <p className="text-[10px] font-medium tracking-wider uppercase text-subtle">{t.name}</p>
                    <p className="text-[10px] text-faint mt-0.5">{t.meta}</p>
                  </div>
                  <p className={`flex-1 text-foreground ${t.size} ${t.font} ${t.weight} ${t.extra ?? ''}`}>
                    {t.sample}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 03 Buttons ── */}
          <Section id="03" title="Botones" subtitle="Cuatro variantes con tres tamaños. Tracking ancho para elegancia boutique.">
            <div className="flex flex-col gap-8">
              <DemoBox label="Primary">
                <Button variant="primary" size="sm">Pequeño</Button>
                <Button variant="primary" size="md">Mediano</Button>
                <Button variant="primary" size="lg">Agregar al carrito</Button>
                <Button variant="primary" size="md" loading>Cargando…</Button>
                <Button variant="primary" size="md" disabled>Deshabilitado</Button>
              </DemoBox>

              <DemoBox label="Secondary">
                <Button variant="secondary" size="sm">Pequeño</Button>
                <Button variant="secondary" size="md">Ver detalles</Button>
                <Button variant="secondary" size="lg">Consignar prenda</Button>
                <Button variant="secondary" size="md" disabled>Deshabilitado</Button>
              </DemoBox>

              <DemoBox label="Ghost">
                <Button variant="ghost" size="sm">Pequeño</Button>
                <Button variant="ghost" size="md">Cancelar</Button>
                <Button variant="ghost" size="lg">Ver más</Button>
                <Button variant="ghost" size="md" disabled>Deshabilitado</Button>
              </DemoBox>

              <DemoBox label="Destructive">
                <Button variant="destructive" size="sm">Eliminar</Button>
                <Button variant="destructive" size="md">Quitar artículo</Button>
                <Button variant="destructive" size="md" disabled>Deshabilitado</Button>
              </DemoBox>

              <DemoBox label="Full Width">
                <div className="w-full max-w-sm flex flex-col gap-3">
                  <Button variant="primary" size="md" fullWidth>Finalizar compra</Button>
                  <Button variant="secondary" size="md" fullWidth>Continuar comprando</Button>
                </div>
              </DemoBox>
            </div>
          </Section>

          {/* ── 04 Form Elements ── */}
          <Section id="04" title="Elementos de formulario" subtitle="Inputs, selects y controles con estados focus, hover, error y disabled.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
              <Input
                label="Nombre"
                placeholder="Ingresá tu nombre"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                hint="Tal como aparece en tu DNI"
              />

              <Input
                label="Email"
                type="email"
                placeholder="hola@ejemplo.com"
                leftIcon={<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M1.5 5l5.5 3.5L12.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>}
              />

              <Input
                label="Búsqueda"
                placeholder="Buscar prendas…"
                leftIcon={<SearchIcon />}
              />

              <Input
                label="Con error"
                placeholder="Ingresá un valor"
                error="Este campo es obligatorio"
                defaultValue="valor inválido"
              />

              <Input
                label="Deshabilitado"
                placeholder="No disponible"
                disabled
                defaultValue="Campo deshabilitado"
              />

              <Select
                label="Talle"
                placeholder="Seleccioná un talle"
                value={selectVal}
                onChange={(e) => setSelectVal(e.target.value)}
                options={[
                  { value: 'xs', label: 'XS' },
                  { value: 's', label: 'S' },
                  { value: 'm', label: 'M' },
                  { value: 'l', label: 'L' },
                  { value: 'xl', label: 'XL' },
                  { value: 'xxl', label: 'XXL' },
                ]}
                hint="Medidas estándar argentinas"
              />

              <Select
                label="Categoría"
                placeholder="Todas las categorías"
                options={[
                  { value: 'vestidos', label: 'Vestidos' },
                  { value: 'blazers', label: 'Blazers y sacos' },
                  { value: 'blusas', label: 'Blusas y camisas' },
                  { value: 'pantalones', label: 'Pantalones y jeans' },
                  { value: 'accesorios', label: 'Accesorios' },
                ]}
              />

              <Select
                label="Estado deshabilitado"
                placeholder="No disponible"
                options={[{ value: '', label: 'N/A' }]}
                disabled
              />
            </div>
          </Section>

          {/* ── 05 Badges ── */}
          <Section id="05" title="Badges" subtitle="Etiquetas de estado para productos, condiciones y clasificaciones.">
            <div className="flex flex-col gap-6">
              <DemoBox label="Estado del producto">
                <Badge variant="new">Nuevo</Badge>
                <Badge variant="sale">Oferta</Badge>
                <Badge variant="featured">Destacado</Badge>
                <Badge variant="reserved">Reservado</Badge>
                <Badge variant="sold">Vendido</Badge>
                <Badge variant="consignment">Consigna</Badge>
              </DemoBox>

              <DemoBox label="Condición de la prenda">
                <Badge variant="excellent">Excelente</Badge>
                <Badge variant="good">Bueno</Badge>
                <Badge variant="fair">Regular</Badge>
              </DemoBox>

              <DemoBox label="Estados del sistema">
                <Badge variant="success">Disponible</Badge>
                <Badge variant="warning">Último disponible</Badge>
                <Badge variant="error">Sin stock</Badge>
                <Badge variant="neutral">Sin categoría</Badge>
              </DemoBox>
            </div>
          </Section>

          {/* ── 06 Quantity & Search ── */}
          <Section id="06" title="Controles de producto" subtitle="Selector de cantidad y barra de búsqueda.">
            <div className="flex flex-col gap-8">
              <DemoBox label="Selector de cantidad">
                <QuantitySelector min={1} max={10} />
                <QuantitySelector min={1} max={10} value={5} />
                <QuantitySelector disabled />
              </DemoBox>

              <DemoBox label="Barra de búsqueda">
                <div className="w-full max-w-md">
                  <SearchBar
                    placeholder="Buscar vestidos, blazers, accesorios…"
                    onSearch={(q) => console.log('Search:', q)}
                  />
                </div>
              </DemoBox>
            </div>
          </Section>

          {/* ── 07 Product Cards ── */}
          <Section id="07" title="Tarjetas de producto" subtitle="Componente central del catálogo. Condición, precio, descuento y estados visuales.">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  brand={p.brand}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  condition={p.condition}
                  size={p.size}
                  imagePlaceholder={p.imagePlaceholder}
                  badge={p.badge}
                  onQuickView={() => setModalOpen(true)}
                />
              ))}
            </div>

            {/* States */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ProductCard
                name="Camisa reservada"
                brand="Zara"
                price={1200}
                condition="good"
                size="M"
                imagePlaceholder="linear-gradient(145deg, #ede8e3 0%, #c4b4a4 100%)"
                badge="reserved"
              />
              <ProductCard
                name="Vestido vendido"
                brand="H&M"
                price={800}
                condition="fair"
                size="S"
                imagePlaceholder="linear-gradient(145deg, #e8e4df 0%, #d4cfc9 100%)"
                badge="sold"
              />
            </div>
          </Section>

          {/* ── 08 Category Cards ── */}
          <Section id="08" title="Tarjetas de categoría" subtitle="Grid de categorías con overlay de gradiente y efecto de hover.">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {mockCategories.map((cat) => (
                <CategoryCard
                  key={cat.name}
                  name={cat.name}
                  count={cat.count}
                  imagePlaceholder={cat.placeholder}
                />
              ))}
            </div>
          </Section>

          {/* ── 09 Modal ── */}
          <Section id="09" title="Modal" subtitle="Superposición con backdrop, cierre por tecla Escape y clic exterior.">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                Abrir modal — Ver detalles
              </Button>
              <Button variant="secondary" onClick={() => setModalOpen(true)}>
                Modal pequeño
              </Button>
            </div>

            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Blazer oversize gris perla"
              footer={
                <>
                  <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>
                    Agregar al carrito
                  </Button>
                </>
              }
            >
              <div className="flex flex-col gap-5">
                {/* Mock image */}
                <div
                  className="w-full aspect-video rounded-lg"
                  style={{ background: 'linear-gradient(145deg, #e6e0d8 0%, #cec6bb 60%, #b8b0a4 100%)' }}
                />

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium tracking-widest uppercase text-subtle mb-1">Mango</p>
                    <h4 className="font-heading text-2xl font-medium text-foreground">
                      Blazer oversize gris perla
                    </h4>
                  </div>
                  <span className="font-heading text-2xl text-foreground">$3.200</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="excellent">Excelente estado</Badge>
                  <Badge variant="consignment">Consigna</Badge>
                </div>

                <p className="text-sm text-muted leading-relaxed">
                  Blazer en perfecto estado, usado solo una vez. Tela de lana fría con forro
                  interior. Ideal para looks de oficina o casual chic.
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-subtle">Talle</span>
                    <p className="font-medium text-foreground mt-0.5">L (42 AR)</p>
                  </div>
                  <div>
                    <span className="text-subtle">Color</span>
                    <p className="font-medium text-foreground mt-0.5">Gris perla</p>
                  </div>
                  <div>
                    <span className="text-subtle">Marca</span>
                    <p className="font-medium text-foreground mt-0.5">Mango</p>
                  </div>
                  <div>
                    <span className="text-subtle">Categoría</span>
                    <p className="font-medium text-foreground mt-0.5">Blazers y sacos</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <span className="text-sm text-muted">Cantidad</span>
                  <QuantitySelector min={1} max={1} />
                  <span className="text-xs text-subtle">(solo 1 disponible)</span>
                </div>
              </div>
            </Modal>
          </Section>

          {/* ── 10 Spacing & Shadows ── */}
          <Section id="10" title="Espaciado y sombras" subtitle="Escala de espaciado estándar Tailwind (base 4px) y sistema de sombras cálidas.">
            <div className="flex flex-col gap-10">
              {/* Spacing */}
              <div>
                <p className="text-[10px] font-medium tracking-widest uppercase text-subtle mb-5">Espaciado</p>
                <div className="flex flex-wrap items-end gap-4">
                  {[
                    { label: '4px', class: 'w-1 h-1', value: '1' },
                    { label: '8px', class: 'w-2 h-2', value: '2' },
                    { label: '12px', class: 'w-3 h-3', value: '3' },
                    { label: '16px', class: 'w-4 h-4', value: '4' },
                    { label: '24px', class: 'w-6 h-6', value: '6' },
                    { label: '32px', class: 'w-8 h-8', value: '8' },
                    { label: '48px', class: 'w-12 h-12', value: '12' },
                    { label: '64px', class: 'w-16 h-16', value: '16' },
                    { label: '80px', class: 'w-20 h-20', value: '20' },
                    { label: '96px', class: 'w-24 h-24', value: '24' },
                  ].map((s) => (
                    <div key={s.value} className="flex flex-col items-center gap-2">
                      <div className={`${s.class} bg-primary rounded`} />
                      <p className="text-[10px] text-subtle">{s.label}</p>
                      <p className="text-[10px] text-faint font-mono">·{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Border radius */}
              <div>
                <p className="text-[10px] font-medium tracking-widest uppercase text-subtle mb-5">Radios de borde</p>
                <div className="flex flex-wrap items-end gap-4">
                  {[
                    { label: 'sm', class: 'rounded-sm', r: '2px' },
                    { label: 'md', class: 'rounded-md', r: '6px' },
                    { label: 'lg', class: 'rounded-lg', r: '8px' },
                    { label: 'xl', class: 'rounded-xl', r: '12px' },
                    { label: '2xl', class: 'rounded-2xl', r: '16px' },
                    { label: 'full', class: 'rounded-full', r: '999px' },
                  ].map((r) => (
                    <div key={r.label} className="flex flex-col items-center gap-2">
                      <div className={`size-16 bg-primary-light border border-primary/30 ${r.class}`} />
                      <p className="text-[10px] text-subtle">{r.r}</p>
                      <p className="text-[10px] text-faint font-mono">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shadows */}
              <div>
                <p className="text-[10px] font-medium tracking-widest uppercase text-subtle mb-5">Sombras</p>
                <div className="flex flex-wrap gap-6">
                  {[
                    { label: 'soft', class: 'shadow-soft', token: '--shadow-soft' },
                    { label: 'card', class: 'shadow-card', token: '--shadow-card' },
                    { label: 'dropdown', class: 'shadow-dropdown', token: '--shadow-dropdown' },
                    { label: 'modal', class: 'shadow-modal', token: '--shadow-modal' },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-3">
                      <div className={`w-24 h-16 bg-surface rounded-xl ${s.class}`} />
                      <p className="text-xs font-medium text-muted">{s.label}</p>
                      <p className="text-[10px] text-faint font-mono">{s.token}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

        </div>
      </main>

      {/* ── Footer ── */}
      <Footer brandName="VESTIRE" />
    </div>
  );
}
