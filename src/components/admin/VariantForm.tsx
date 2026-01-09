"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { createVariant } from "@/services/products";

interface VariantFormProps {
  productId: string;
  defaultPrice?: number;
  onSuccess: () => void;
}

export function VariantForm({ productId, defaultPrice, onSuccess }: VariantFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    colorName: "",
    colorHex: "#000000",
    price: defaultPrice?.toString() || "",
    stock: "",
    imageFile: null as File | null,
    previewUrl: null as string | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ 
        ...prev, 
        imageFile: file, 
        previewUrl: URL.createObjectURL(file) 
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parseFloat(formData.price) < 0 || parseInt(formData.stock) < 0) {
        alert("El precio y el stock deben ser positivos.");
        return;
    }

    setLoading(true);
    try {
      await createVariant(productId, formData);
      alert("¡Variante agregada!");
      
      setFormData({
        colorName: "",
        colorHex: "#000000",
        price: defaultPrice?.toString() || "",
        stock: "",
        imageFile: null,
        previewUrl: null
      });
      
      onSuccess();
    
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Ocurrió un error desconocido";
      alert("Error: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 h-fit">
      <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <Plus className="h-5 w-5 text-brand-primary" /> Agregar Nuevo Color
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nombre Color</Label>
            <Input name="colorName" placeholder="Ej: Rosa" value={formData.colorName} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label>Selector</Label>
            <div className="flex gap-2">
              <input type="color" name="colorHex" className="h-10 w-10 cursor-pointer border rounded" value={formData.colorHex} onChange={handleChange} />
              <Input name="colorHex" value={formData.colorHex} onChange={handleChange} className="uppercase font-mono text-xs" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Precio ($)</Label>
            <Input name="price" type="number" step="0.01" min="0" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label>Stock</Label>
            <Input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Foto</Label>
          <div className="flex gap-4 items-center">
            <div className="h-16 w-16 bg-white border rounded flex items-center justify-center overflow-hidden">
              {formData.previewUrl ? <img src={formData.previewUrl} className="w-full h-full object-cover" /> : <span className="text-xs text-slate-300">Foto</span>}
            </div>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800" disabled={loading}>
          {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Guardar Nuevo Color"}
        </Button>
      </form>
    </div>
  );
}