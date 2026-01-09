import { supabase } from "@/lib/supabase";
import { DollarSign, ShoppingBag, Package, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Para que los datos siempre estén frescos

export default async function AdminDashboard() {
  // 1. Consultas en paralelo para que cargue rápido
  const [productsQuery, ordersQuery] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true })
  ]);

  // 2. Extraer los conteos (si falla, ponemos 0)
  const totalProducts = productsQuery.count || 0;
  const totalOrders = ordersQuery.count || 0;
  
  // (Opcional) Calcular ventas totales si tienes órdenes reales
  // Por ahora lo dejamos en 0 hasta que tengas ventas reales
  const totalSales = 0; 

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Resumen</h1>
          <p className="text-slate-500 mt-1">Lo que está pasando hoy en Glowify.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-full border shadow-sm">
            <Clock className="h-4 w-4" /> Actualizado: Recién
        </div>
      </div>

      {/* Tarjetas de Métricas REALES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Ventas (Simulado por ahora) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-24 w-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Ventas Totales</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    ${totalSales.toFixed(2)}
                </h3>
                <div className="mt-4 flex items-center text-sm font-medium text-green-600 bg-green-50 w-fit px-2 py-1 rounded-md">
                    <TrendingUp className="h-4 w-4 mr-1" /> En crecimiento
                </div>
            </div>
        </div>

        {/* Órdenes (Dato Real) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-24 w-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pedidos</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {totalOrders}
                </h3>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded-md">
                    <ShoppingBag className="h-4 w-4 mr-1" /> Total histórico
                </div>
            </div>
        </div>

        {/* Inventario (Dato Real) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-24 w-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Inventario</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {totalProducts} <span className="text-lg text-slate-400 font-normal">prod.</span>
                </h3>
                <Link href="/admin/products" className="mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
                    Gestionar catálogo <Package className="h-4 w-4 ml-1" />
                </Link>
            </div>
        </div>
      </div>

      {/* Sección de Relleno (Feedback) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center">
        <div className="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
             <ShoppingBag className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Listo para vender</h3>
        <p className="text-slate-400 mt-2 max-w-md mx-auto">
            Tu panel administrativo está conectado a la base de datos. 
            Las métricas se actualizarán automáticamente cuando tus clientes compren.
        </p>
      </div>

    </div>
  );
}