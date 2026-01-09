// src/app/%28shop%29/products/%5Bid%5D/page.tsx
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/products/ProductView";
import { Product, ProductVariant } from "@/types/database";

type ProductWithVariants = Product & {
  variants: ProductVariant[];
};

export default async function ProductDetailPage({ 
  params 
}: { 
  // 1. CAMBIO AQUÍ: Definimos params como una Promesa
  params: Promise<{ id: string }> 
}) {
  
  // 2. CAMBIO AQUÍ: Desempaquetamos la promesa antes de usar el ID
  const { id } = await params;

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants(*)
    `)
    .eq('id', id) // Ahora usamos la variable 'id' que sacamos del await
    .single();

  if (error || !data) {
    notFound();
  }

  const product = data as ProductWithVariants;

  return (
    <div className="container px-4 py-12 md:py-20 min-h-screen">
      <ProductView product={product} />
    </div>
  );
}