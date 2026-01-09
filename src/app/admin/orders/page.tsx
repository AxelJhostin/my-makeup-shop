import { supabase } from "@/lib/supabase";
import { Package, Search, Filter, Calendar, User } from "lucide-react";
import { OrderStatusSelector } from "@/components/admin/OrderStatusSelector";

export const revalidate = 0; 

// 1. Corregimos la Interfaz (Quitamos 'username' porque no existe)
interface OrderWithProfile {
  id: string;
  created_at: string;
  status: string;
  total: number;
  profiles: {
    full_name: string | null;
    // Quitamos username de aquí
  } | null;
}

export default async function AdminOrders() {
  
  // 2. Corregimos la Consulta
  // Quitamos 'username' del select y usamos la relación simplificada
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      profiles ( full_name )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error cargando órdenes:", error);
  }

  const orders = data as unknown as OrderWithProfile[] | null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Pedidos</h1>
          <p className="text-slate-500 mt-1">Administra los envíos y estados ({orders?.length || 0})</p>
        </div>
      </div>

      {/* Filtros Visuales */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
                type="text" 
                placeholder="Buscar pedido o cliente..." 
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
            />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors">
            <Filter className="h-4 w-4" /> Filtrar Estado
        </button>
      </div>

      {/* Tabla de Pedidos */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-slate-900 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID Pedido</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders?.map((order) => {
                const date = new Date(order.created_at).toLocaleDateString('es-ES', {
                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                });
                
                // 3. Corregimos la visualización del nombre
                const clientName = order.profiles?.full_name || "Cliente Anónimo";

                return (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-primary">
                            <User className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-slate-900">{clientName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {date}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusSelector orderId={order.id} currentStatus={order.status} />
                    </td>
                  </tr>
                );
              })}

              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                        <Package className="h-10 w-10 text-slate-300 mb-3" />
                        <p>Aún no hay pedidos.</p>
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