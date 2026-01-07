import { Product, ProductVariant } from "@/types/database";

// Definimos qué datos necesita este componente para funcionar
interface ProductCardProps {
  product: Product & { variants: ProductVariant[] };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-brand-secondary/50 group">
      {/* TÍTULO */}
      <h2 className="text-2xl font-heading font-bold mb-2 text-brand-text group-hover:text-brand-primary transition-colors">
        {product.name}
      </h2>
      
      {/* DESCRIPCIÓN */}
      <p className="text-sm text-brand-muted mb-6 leading-relaxed line-clamp-2">
        {product.description}
      </p>
      
      {/* SECCIÓN VARIANTES */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase text-brand-accent tracking-widest">
          Tonos Disponibles
        </h3>
        
        {product.variants && product.variants.length > 0 ? (
          product.variants.map((variant) => (
            <div 
              key={variant.id} 
              className="flex items-center justify-between p-3 bg-brand-secondary/10 rounded-lg border border-brand-secondary/30"
            >
              <div className="flex items-center gap-3">
                {variant.color_hex && (
                  <span 
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm ring-1 ring-white"
                    style={{ backgroundColor: variant.color_hex }}
                  />
                )}
                <span className="text-sm font-medium text-brand-text">{variant.color_name}</span>
              </div>
              <span className="text-sm font-bold text-brand-primary">
                ${variant.price}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-brand-muted italic">Próximamente</p>
        )}
      </div>
    </div>
  );
}