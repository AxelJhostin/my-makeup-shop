"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Definimos qué forma tienen los datos que recibimos
interface Variant {
  id: string;
  color_name: string;
  color_hex: string;
  price: number;
  stock_quantity: number;
  image_url: string | null;
}

interface VariantsListProps {
  variants: Variant[];
  onDelete: (id: string) => void;
}

export function VariantsList({ variants, onDelete }: VariantsListProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Colores Actuales ({variants.length})</h2>
      <div className="space-y-3">
        {variants.map((v) => (
          <div key={v.id} className="flex items-center gap-4 p-3 bg-white border rounded-lg shadow-sm">
            {/* FOTO */}
            <div className="h-12 w-12 rounded bg-slate-100 overflow-hidden shrink-0 border">
              {v.image_url && <img src={v.image_url} alt={v.color_name} className="h-full w-full object-cover" />}
            </div>
            
            {/* INFO */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{v.color_name}</span>
                <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: v.color_hex }}></div>
              </div>
              <div className="text-xs text-slate-500">
                ${v.price} • Stock: {v.stock_quantity}
              </div>
            </div>

            {/* BOTÓN BORRAR */}
            <Button 
              variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50"
              onClick={() => onDelete(v.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {variants.length === 0 && (
          <p className="text-sm text-slate-400 italic">No hay variantes extra agregadas.</p>
        )}
      </div>
    </div>
  );
}