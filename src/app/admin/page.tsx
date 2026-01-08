/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const { data } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants (
        price, stock_quantity, image_url
      )
    `)
    .order('created_at', { ascending: false });

  const products = data as any[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold tracking-tight text-slate-900">Inventario</h2>
           <p className="text-slate-500">Administra tu catálogo y existencias.</p>
        </div>
        <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 text-white gap-2">
            <Link href="/admin/products/new">
                <Plus className="h-4 w-4" /> Nuevo Producto
            </Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                <tr>
                    <th className="px-6 py-4">Producto</th>
                    <th className="px-6 py-4">Precio</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {products?.map((product) => {
                    const firstVariant = product.variants?.[0];
                    const totalStock = product.variants?.reduce((acc: any, curr: any) => acc + (curr.stock_quantity || 0), 0) || 0;

                    return (
                        <tr key={product.id} className="hover:bg-slate-50/50">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg border bg-slate-100 overflow-hidden flex-shrink-0">
                                        {firstVariant?.image_url ? (
                                            <img src={firstVariant.image_url} className="h-full w-full object-cover" alt="" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-xs font-bold text-slate-400">ME</div>
                                        )}
                                    </div>
                                    <span className="font-semibold text-slate-900">{product.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">${firstVariant?.price || "0.00"}</td>
                            <td className="px-6 py-4">{totalStock} un.</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-slate-100'}`}>
                                    {product.is_active ? 'Activo' : 'Borrador'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-brand-primary">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
      </div>
    </div>
  );
}