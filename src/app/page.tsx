import { supabase } from "@/lib/supabase";
import { Product, ProductVariant } from "@/types/database"; 
import { ProductCard } from "@/components/products/ProductCard";

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
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-brand-background">
      
      {/* Título de Sección */}
      <div className="w-full max-w-6xl mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-primary tracking-tight">
          Catálogo Inicial
        </h1>
        <p className="text-brand-muted mt-2">Explora nuestra colección esencial.</p>
      </div>
      
      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}