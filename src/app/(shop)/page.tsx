// src/app/%28shop%29/page.tsx
import { supabase } from "@/lib/supabase";
import { Product, ProductVariant } from "@/types/database"; 
import { ProductCard } from "@/components/products/ProductCard";
import { Hero } from "@/components/layout/Hero";

type ProductWithVariants = Product & {
  variants: ProductVariant[];
};

export default async function Home() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants (
        id, color_name, color_hex, price, stock_quantity, image_url
      )
    `)
    .eq('is_active', true);

  if (error) console.error("Error cargando productos:", error);

  const products = data as ProductWithVariants[] | null;

  return (
    <main className="flex min-h-screen flex-col bg-brand-background">
      
      {/* 1. SECCIÓN HERO (Portada) */}
      <Hero />

      {/* 2. CATÁLOGO DE PRODUCTOS */}
      <section id="catalogo" className="container px-4 py-16 md:py-24 flex flex-col items-center">
        
        <div className="w-full max-w-6xl mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-4">
            Nuestros Favoritos
          </h2>
          <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mb-4"></div>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Explora los productos más vendidos de la temporada en Jipijapa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          
          {/* Mensaje si no hay productos */}
          {(!products || products.length === 0) && (
            <div className="col-span-full text-center py-12 bg-white/50 rounded-xl border border-dashed border-brand-muted">
              <p className="text-brand-muted">Cargando colección...</p>
            </div>
          )}
        </div>

      </section>
    </main>
  );
}