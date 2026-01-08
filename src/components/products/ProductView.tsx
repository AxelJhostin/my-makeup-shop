"use client";

import { useState } from "react";
import { Product, ProductVariant } from "@/types/database";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Share2, Check } from "lucide-react";
// 1. IMPORTAMOS EL STORE
import { useCartStore } from "@/store/cart";

interface ProductViewProps {
  product: Product & { variants: ProductVariant[] };
}

export function ProductView({ product }: ProductViewProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );

  // 2. CONECTAMOS EL STORE
  const { addItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false); // Para un efecto visual al dar clic

  const currentImage = selectedVariant?.image_url || "/placeholder.png";
  const currentPrice = selectedVariant?.price || 0;
  const currentStock = selectedVariant?.stock_quantity || 0;

  // 3. FUNCIÓN PARA AGREGAR
  const handleAddToCart = () => {
    if (!selectedVariant) return;

    // Efecto visual de carga
    setIsAdding(true);
    
    // Agregamos al carrito global
    addItem(product, selectedVariant, 1);

    // Quitamos el efecto visual después de 500ms
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start animate-in fade-in duration-700">
      
      {/* IMAGEN IZQUIERDA */}
      <div className="relative aspect-square bg-brand-secondary/10 rounded-2xl overflow-hidden border border-brand-secondary/20 shadow-sm">
        {currentImage && (
          <img 
            src={currentImage} 
            alt={product.name}
            className="w-full h-full object-cover"
            key={selectedVariant?.id} // El key fuerza la animación al cambiar de color
          />
        )}
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/80 hover:bg-white text-brand-primary shadow-sm">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* INFORMACIÓN DERECHA */}
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

        {/* SELECTOR DE COLOR */}
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

        {/* BOTONES DE ACCIÓN */}
        <div className="flex gap-4 pt-4 border-t border-brand-secondary/30">
          <Button 
            size="lg" 
            className={`flex-1 h-14 text-lg rounded-full transition-all duration-300 ${
              isAdding 
                ? "bg-green-600 hover:bg-green-700 scale-95" 
                : "bg-brand-text hover:bg-brand-primary"
            } text-white shadow-lg`}
            onClick={handleAddToCart} // <--- 4. CONECTADO AQUÍ
            disabled={currentStock === 0 || isAdding}
          >
            {isAdding ? (
              <><Check className="mr-2 h-5 w-5" /> Agregado</>
            ) : (
              <><ShoppingBag className="mr-2 h-5 w-5" /> Agregar al Carrito</>
            )}
          </Button>
          
          <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-brand-secondary hover:bg-brand-secondary/10">
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