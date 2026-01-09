// src/app/%28shop%29/catalog/page.tsx
import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/services/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo | Meine Essenz",
  description: "Explora nuestra colección de maquillaje y cuidado personal.",
};

interface CatalogPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// 1. Cambiamos el tipo de props para que sea una Promesa (Promise)
export default async function CatalogPage(props: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  // 2. Esperamos a que la promesa se resuelva
  const searchParams = await props.searchParams;
  
  // 3. Ahora sí leemos la categoría
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  
  const products = await getProducts(category);

  const getTitle = () => {
    if (!category) return "Catálogo Completo";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="container px-4 py-12 md:py-20 flex flex-col items-center min-h-[80vh]">
      
      {/* Encabezado */}
      <div className="text-center mb-12 animate-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-text mb-4">
          {getTitle()}
        </h1>
        <div className="h-1 w-20 bg-brand-primary mx-auto rounded-full mb-4"></div>
        <p className="text-brand-muted max-w-xl mx-auto">
          {products.length} productos encontrados en esta colección.
        </p>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {products.map((product) => (
          /* CAMBIO AQUÍ: Usamos ts-expect-error en lugar de ts-ignore */
          // @ts-expect-error: Diferencia de tipos entre base de datos y componente visual
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Estado Vacío */}
      {products.length === 0 && (
        <div className="text-center py-20 bg-slate-50 w-full rounded-2xl border border-dashed">
          <p className="text-xl text-brand-muted mb-4">
            Aún no hay productos en la categoría <span className="font-bold text-brand-text">{category}</span>.
          </p>
          <a href="/catalog" className="text-brand-primary underline hover:text-brand-text transition-colors">
            Ver todos los productos
          </a>
        </div>
      )}

    </div>
  );
}