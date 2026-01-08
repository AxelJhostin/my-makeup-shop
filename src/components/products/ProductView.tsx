"use client";

import { useState } from "react";
import { Product, ProductVariant } from "@/types/database";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Share2 } from "lucide-react";

interface ProductViewProps {
  product: Product & { variants: ProductVariant[] };
}

export function ProductView({ product }: ProductViewProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );

  const currentImage = selectedVariant?.image_url || "/placeholder.png";
  const currentPrice = selectedVariant?.price || 0;
  const currentStock = selectedVariant?.stock_quantity || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      
      <div className="relative aspect-square bg-brand-secondary/10 rounded-2xl overflow-hidden border border-brand-secondary/20">
        {currentImage && (
          <img 
            src={currentImage} 
            alt={product.name}
            className="w-full h-full object-cover animate-in fade-in duration-500"
            key={selectedVariant?.id} 
          />
        )}
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/80 hover:bg-white text-brand-primary">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-8 pt-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-bold text-brand-text">
            {product.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-brand-primary">
              ${currentPrice}
            </span>
            {currentStock > 0 ? (
               <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
                 Disponible
               </span>
            ) : (
               <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full uppercase tracking-wide">
                 Agotado
               </span>
            )}
          </div>
        </div>

        <div className="prose prose-slate text-slate-600 leading-relaxed">
          <p>{product.description}</p>
        </div>

        <div className="space-y-4">
          <span className="text-sm font-bold text-brand-text uppercase tracking-widest">
            Selecciona tu tono: <span className="text-brand-primary ml-1">{selectedVariant?.color_name}</span>
          </span>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all ${
                  selectedVariant?.id === variant.id 
                    ? "border-brand-primary ring-2 ring-brand-primary/30 scale-110" 
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: variant.color_hex || "#ccc" }}
                title={variant.color_name || "Color"}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-brand-secondary/30">
          <Button size="lg" className="flex-1 bg-brand-text hover:bg-brand-primary text-white h-14 text-lg rounded-full">
            <ShoppingBag className="mr-2 h-5 w-5" /> Agregar al Carrito
          </Button>
          <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-brand-secondary">
            <Share2 className="h-5 w-5 text-brand-muted" />
          </Button>
        </div>
        
        <p className="text-xs text-center text-brand-muted">
          Envío seguro a todo Jipijapa y Manabí.
        </p>
      </div>
    </div>
  );
}