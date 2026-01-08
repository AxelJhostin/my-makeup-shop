"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm("¿Seguro que quieres eliminar este producto? No se puede deshacer.");
    if (!confirm) return;

    setIsDeleting(true);

    // 1. Eliminamos el producto (Supabase borrará las variantes automáticamente si está configurado en cascada,
    // pero por seguridad intentamos borrar primero lo simple).
    const { error } = await supabase.from('products').delete().eq('id', productId);

    if (error) {
      alert("Error al eliminar: " + error.message);
      setIsDeleting(false);
    } else {
      router.refresh(); // Recarga la lista
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  );
}