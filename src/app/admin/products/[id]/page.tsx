"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { getProductById } from "@/services/products";

// Importamos nuestros nuevos componentes modulares
import { VariantsList } from "@/components/admin/VariantsList";
import { VariantForm } from "@/components/admin/VariantForm";

// 1. DEFINIMOS LA ESTRUCTURA CORRECTA (Adiós 'any')
interface Variant {
  id: string;
  color_name: string;
  color_hex: string;
  price: number;
  stock_quantity: number;
  image_url: string | null;
}

interface Product {
  id: string;
  name: string;
  variants: Variant[]; // Ahora sí está estrictamente tipado
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Cargar Datos
  const loadData = async (id: string) => {
    try {
      const data = await getProductById(id) as unknown as Product;
      setProduct(data);
    } catch (error) {
      console.error(error);
      alert("Error cargando producto");
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    params.then((p) => loadData(p.id));
  }, [params]);

  // 2. Acción de Borrar (Se la pasaremos al hijo VariantsList)
  const handleDeleteVariant = async (variantId: string) => {
    if (!confirm("¿Borrar este color?")) return;
    await supabase.from('product_variants').delete().eq('id', variantId);
    if (product) loadData(product.id); // Recargar lista
  };

  if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin" /></div>;
  if (!product) return <div>No encontrado</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Editar: {product.name}</h1>
          <p className="text-slate-500 text-sm">Gestiona colores y stock</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* COMPONENTE 1: LISTA DE COLORES */}
        <VariantsList 
          variants={product.variants} 
          onDelete={handleDeleteVariant} 
        />

        {/* COMPONENTE 2: FORMULARIO */}
        <VariantForm 
          productId={product.id} 
          defaultPrice={product.variants[0]?.price}
          onSuccess={() => loadData(product.id)}
        />

      </div>
    </div>
  );
}