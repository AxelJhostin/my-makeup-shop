// src/app/page.tsx
import { supabase } from "@/lib/supabase";
import { Product, ProductVariant } from "@/types/database"; 

// --- DEFINICIÓN DE TIPOS ---
// Extendemos el tipo Product para incluir el array de variantes que trae el join
type ProductWithVariants = Product & {
  variants: ProductVariant[];
};

export default async function Home() {
  // --- 1. CONSULTA A SUPABASE ---
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants (
        id, color_name, color_hex, price, stock_quantity, image_url
      )
    `)
    .eq('is_active', true);

  if (error) {
    console.error("Error cargando productos:", error);
  }

  // --- 2. CASTING DE TIPOS ---
  // Forzamos a TS a entender que la respuesta incluye las variantes
  const products = data as ProductWithVariants[] | null;

  return (
    // CAMBIO: Usamos el fondo crema (brand-background) y texto morado (brand-text)
    <main className="flex min-h-screen flex-col items-center p-12 bg-brand-background text-brand-text font-body">
      
      {/* CAMBIO: Fuente 'Playfair' (heading) y color Rosa Fuerte (brand-primary) */}
      <h1 className="text-5xl font-heading font-bold mb-12 text-brand-primary tracking-tight">
        Catálogo Inicial
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {products?.map((product) => (
          <div 
            key={product.id} 
            // CAMBIO: Borde lila suave y redondeado XL para estética orgánica
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-brand-secondary/50"
          >
            {/* TÍTULO PRODUCTO: Fuente Serif elegante */}
            <h2 className="text-2xl font-heading font-bold mb-2 text-brand-text">
              {product.name}
            </h2>
            
            {/* DESCRIPCIÓN: Texto secundario (muted) */}
            <p className="text-sm text-brand-muted mb-6 leading-relaxed">
              {product.description}
            </p>
            
            <div className="space-y-3">
              {/* ETIQUETA: Color Durazno (accent) */}
              <h3 className="text-xs font-bold uppercase text-brand-accent tracking-widest">
                Tonos Disponibles
              </h3>
              
              {product.variants && product.variants.length > 0 ? (
                product.variants.map((variant) => (
                  <div 
                    key={variant.id} 
                    // CAMBIO: Fondo lila muy sutil para las variantes
                    className="flex items-center justify-between p-3 bg-brand-secondary/10 rounded-lg border border-brand-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      {/* Círculo de color */}
                      {variant.color_hex && (
                        <span 
                          className="w-5 h-5 rounded-full border border-black/10 shadow-sm ring-1 ring-white"
                          style={{ backgroundColor: variant.color_hex }}
                        />
                      )}
                      <span className="text-sm font-medium">{variant.color_name}</span>
                    </div>
                    {/* PRECIO: En rosa fuerte */}
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
        ))}
      </div>
    </main>
  );
}