"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Asegúrate de que esta importación sea correcta según tu proyecto
import { Loader2, Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrderStatusSelectorProps {
  orderId: string;
  currentStatus: string;
}

export function OrderStatusSelector({ orderId, currentStatus }: OrderStatusSelectorProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Colores según el estado para feedback visual
  const getStatusColor = (s: string) => {
    switch (s) {
      case "Pendiente": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pagado": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Enviado": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Entregado": return "bg-green-100 text-green-800 border-green-200";
      case "Cancelado": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) return;
    setIsLoading(true);

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from('orders') as any)
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setStatus(newStatus);
      router.refresh(); 
    } catch (error) {
      // ... resto del código
      console.error("Error al actualizar estado:", error);
      alert("No se pudo actualizar el pedido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group">
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(status)}`}>
        {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
        
        {/* Usamos un select nativo transparente encima para simplificar la UI sin librerías extra */}
        <select 
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isLoading}
          className="appearance-none bg-transparent border-none outline-none cursor-pointer pr-4 py-0.5"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Pagado">Pagado</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregado">Entregado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        <ChevronDown className="h-3 w-3 pointer-events-none -ml-4 opacity-50" />
      </div>
    </div>
  );
}