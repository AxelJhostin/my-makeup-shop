import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Package, Search, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton"; 

export const revalidate = 0;

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

export default async function AdminProducts() {
  const { data } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants (price, stock_quantity, image_url)
    `)
    .order('created_at', { ascending: false });

  const products = data as unknown as ProductWithVariants[] | null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. ENCABEZADO (Estilo Dashboard) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Inventario</h1>
          <p className="text-slate-500 mt-1">Gestiona tu catálogo completo ({products?.length || 0} productos)</p>
        </div>
        
        <div className="flex items-center gap-3">
            {/* Botón Principal */}
            <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20 transition-all">
                <Link href="/admin/products/new">
                    <Plus className="h-5 w-5 mr-2" /> Nuevo Producto
                </Link>
            </Button>
        </div>
      </div>

      {/* 2. BARRA DE HERRAMIENTAS (Visual - Para que se vea profesional) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
                type="text" 
                placeholder="Buscar por nombre..." 
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none border-slate-200 text-slate-600 gap-2">
                <Filter className="h-4 w-4" /> Filtros
            </Button>
        </div>
      </div>

      {/* 3. TABLA CON ESTILO DE TARJETA */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-slate-900 font-semibold border-b border-slate-200">
                <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Precio Base</th>
                <th className="px-6 py-4">Stock Total</th>
                <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {products?.map((product) => {
                const mainVariant = product.variants?.[0];
                const totalStock = product.variants?.reduce((acc, v) => acc + v.stock_quantity, 0) || 0;

                return (
                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden relative">
                            {mainVariant?.image_url ? (
                            <img src={mainVariant.image_url} alt={product.name} className="h-full w-full object-cover" />
                            ) : (
                            <Package className="h-5 w-5 text-slate-300" />
                            )}
                        </div>
                        <div>
                            <span className="font-bold text-slate-900 block">{product.name}</span>
                            {/* <span className="text-xs text-slate-400">ID: {product.id.slice(0, 8)}...</span> */}
                        </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 capitalize">
                        {product.category || "General"}
                        </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-700">
                        ${mainVariant?.price?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-6 py-4">
                        {totalStock > 0 ? (
                        <div className="flex items-center text-green-700 bg-green-50 w-fit px-2 py-1 rounded-md text-xs font-bold border border-green-100">
                            {totalStock} un.
                        </div>
                        ) : (
                        <div className="flex items-center text-red-700 bg-red-50 w-fit px-2 py-1 rounded-md text-xs font-bold border border-red-100">
                            Agotado
                        </div>
                        )}
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10" asChild>
                            <Link href={`/admin/products/${product.id}`}>
                            <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                        <DeleteProductButton productId={product.id} />
                        </div>
                    </td>
                    </tr>
                );
                })}

                {(!products || products.length === 0) && (
                <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-slate-400 bg-slate-50/30">
                    <div className="flex flex-col items-center justify-center">
                        <Package className="h-10 w-10 text-slate-300 mb-3" />
                        <p className="font-medium text-slate-600">No hay productos aún</p>
                        <p className="text-sm">Empieza creando el primero para tu tienda</p>
                    </div>
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}