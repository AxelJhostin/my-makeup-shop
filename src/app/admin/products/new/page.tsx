"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
// Importamos nuestro nuevo servicio
import { createProductWithVariant } from "@/services/products";

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // ESTADO
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", stock: "",
    colorName: "", colorHex: "#DB2777",
    imageFile: null as File | null,
  });

  // HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // --- LÓGICA SIMPLIFICADA ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.price) {
        alert("Nombre y precio son obligatorios");
        setIsLoading(false);
        return;
      }

      // ¡MIRA QUÉ LIMPIO! Una sola línea hace todo el trabajo sucio
      await createProductWithVariant(formData);

      alert("¡Producto creado con éxito!");
      router.push("/admin");
      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Error al crear el producto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="text-2xl font-bold text-slate-900">Nuevo Producto</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* BLOQUE 1: INFO BÁSICA */}
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Ej: Labial Matte" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Detalles del producto..." />
          </div>
        </div>

        {/* BLOQUE 2: PRECIO Y COLOR */}
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Precio ($)</Label>
              <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-dashed">
             <div className="space-y-2">
              <Label htmlFor="colorName">Nombre Tono</Label>
              <Input id="colorName" name="colorName" value={formData.colorName} onChange={handleChange} placeholder="Ej: Rojo Pasión" />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex items-center gap-3">
                <input type="color" name="colorHex" value={formData.colorHex} onChange={handleChange} className="h-10 w-10 rounded cursor-pointer border-0" />
                <span className="text-sm text-slate-500 font-mono">{formData.colorHex}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 3: IMAGEN */}
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
              {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <span className="text-xs text-slate-400">Sin foto</span>}
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="image">Imagen</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
            </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isLoading} className="bg-brand-primary hover:bg-brand-primary/90 text-white min-w-[200px]">
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...</> : <><Save className="mr-2 h-4 w-4" /> Guardar</>}
          </Button>
        </div>
      </form>
    </div>
  );
}