// src/app/admin/page.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Package } from "lucide-react"; // Borré Trash2 porque lo usa el botón componente
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton"; 

export const revalidate = 0;

// 1. DEFINIMOS EL TIPO DE DATO (El mapa para TypeScript)
interface ProductWithVariants {
  id: string;
  name: string;
  category: string;
  variants: {
    price: number;
    stock_quantity: number;
    image_url: string | null;
  }[];
}

export default async function AdminDashboard() {
  // 2. HACEMOS LA CONSULTA Y APLICAMOS EL TIPO
  const { data } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants (price, stock_quantity, image_url)
    `)
    .order('created_at', { ascending: false });

  // "Casteamos" los datos: Le decimos a TS "Confía en mí, esto es un array de productos"
  const products = data as unknown as ProductWithVariants[] | null;

  return (
    <div className="space-y-8">
      
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inventario</h1>
          <p className="text-slate-500">Gestiona tus productos ({products?.length || 0})</p>
        </div>
        <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 text-white gap-2">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" /> Nuevo Producto
          </Link>
        </Button>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Precio</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products?.map((product) => {
              // Tomamos la primera variante para mostrar datos de resumen
              const mainVariant = product.variants?.[0];
              
              // 3. ARREGLAMOS EL REDUCE (Quitamos el 'any')
              const totalStock = product.variants?.reduce((acc, v) => acc + v.stock_quantity, 0) || 0;

              return (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg border bg-slate-100 flex items-center justify-center overflow-hidden">
                        {mainVariant?.image_url ? (
                          <img src={mainVariant.image_url} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <Package className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                      <span className="font-medium text-slate-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize">
                    <span className="px-2 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                      {product.category || "General"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono">
                    ${mainVariant?.price?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-6 py-4">
                    {totalStock > 0 ? (
                      <span className="text-green-600 font-bold">{totalStock} un.</span>
                    ) : (
                      <span className="text-red-500 font-bold">Agotado</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-brand-primary">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      
                      {/* Botón de Eliminar */}
                      <DeleteProductButton productId={product.id} />
                    </div>
                  </td>
                </tr>
              );
            })}

            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  No hay productos aún. ¡Crea el primero!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}