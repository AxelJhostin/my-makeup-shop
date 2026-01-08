"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Save, Upload } from "lucide-react";
import Link from "next/link";
// Importamos solo la lógica modularizada
import { createProduct } from "@/services/products";

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "maquillaje",
    colorName: "",
    colorHex: "#DB2777",
    imageFile: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.price) {
        alert("Nombre y precio son obligatorios");
        return;
      }

      // --- LÓGICA MODULARIZADA ---
      await createProduct(formData);

      alert("¡Producto creado con éxito!");
      router.push("/admin");
      router.refresh();

    } catch (error: any) {
      console.error("Error capturado:", error);
      // Truco: Si el error tiene mensaje, úsalo. Si no, conviértelo a texto para leerlo.
      const message = error.message || error.error_description || JSON.stringify(error);
      alert("DETALLE DEL ERROR: " + message);
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <select 
                  id="category" 
                  name="category"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="maquillaje">Maquillaje</option>
                  <option value="skincare">Skincare (Cuidado Piel)</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="kits">Kits / Ofertas</option>
                </select>
             </div>
             <div className="space-y-2">
                <Label htmlFor="stock">Stock Total</Label>
                <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} />
             </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Detalles del producto..." />
          </div>
        </div>

        {/* BLOQUE 2: PRECIO Y COLOR */}
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
          <div className="space-y-2">
             <Label htmlFor="price">Precio ($)</Label>
             <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-dashed">
              <div className="space-y-2">
              <Label htmlFor="colorName">Nombre Tono (Opcional)</Label>
              <Input id="colorName" name="colorName" value={formData.colorName} onChange={handleChange} placeholder="Ej: Rojo Pasión" />
            </div>
            <div className="space-y-2">
              <Label>Color de Referencia</Label>
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
              {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" /> : <Upload className="h-8 w-8 text-slate-300" />}
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="image">Imagen Principal</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
            </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isLoading} className="bg-brand-primary hover:bg-brand-primary/90 text-white min-w-[200px]">
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...</> : <><Save className="mr-2 h-4 w-4" /> Guardar Producto</>}
          </Button>
        </div>
      </form>
    </div>
  );
}