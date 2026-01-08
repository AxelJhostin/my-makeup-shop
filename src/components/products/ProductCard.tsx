"use client";

import { Product, ProductVariant } from "@/types/database";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link"; // 1. Importamos Link

interface ProductCardProps {
  product: Product & { variants: ProductVariant[] };
}

export function ProductCard({ product }: ProductCardProps) {
  // Lógica para determinar la imagen inicial
  const firstVariant = product.variants?.[0];
  const initialImage = firstVariant?.image_url || null;

  // Estado para manejar si la imagen falla al cargar
  const [imageError, setImageError] = useState(false);

  return (
    // 2. Envolvemos TODO en Link para que sea cliqueable
    <Link href={`/products/${product.id}`} className="block h-full">
      <div className="group relative flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-secondary/40 overflow-hidden h-full cursor-pointer">
        
        {/* --- ZONA DE IMAGEN --- */}
        <div className="relative aspect-square w-full overflow-hidden bg-brand-secondary/5">
          
          {initialImage && !imageError ? (
              <img 
                src={initialImage} 
                alt={product.name}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
          ) : (
              // --- PLACEHOLDER ---
              <div className="flex h-full w-full flex-col items-center justify-center bg-brand-secondary/10 p-4 text-center">
                  <span className="font-heading text-4xl font-bold text-brand-secondary/40">ME</span>
                  <p className="mt-2 text-xs font-medium text-brand-muted uppercase tracking-widest">Sin imagen</p>
              </div>
          )}

          {/* Badge de "Nuevo" */}
          <div className="absolute top-3 left-3 bg-brand-background/90 backdrop-blur-sm px-2 py-1 rounded-md border border-brand-secondary/20 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary">Nuevo</span>
          </div>
        </div>

        {/* --- ZONA DE INFORMACIÓN --- */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-xl font-heading font-bold text-brand-text group-hover:text-brand-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          <p className="mt-2 text-sm text-brand-muted line-clamp-2 leading-relaxed mb-4 flex-1">
            {product.description}
          </p>

          {/* Precios y Variantes */}
          <div className="space-y-4">
              {/* Lista de tonos */}
              <div className="flex flex-wrap gap-2">
                  {product.variants?.slice(0, 4).map((variant) => (
                      variant.color_hex && (
                          <div 
                              key={variant.id}
                              className="h-5 w-5 rounded-full border border-black/10 shadow-sm ring-1 ring-white"
                              style={{ backgroundColor: variant.color_hex }}
                              title={variant.color_name || "Color"}
                          />
                      )
                  ))}
                  {product.variants?.length > 4 && (
                      <span className="text-xs text-brand-muted flex items-center">+ {product.variants.length - 4}</span>
                  )}
              </div>

              <div className="flex items-center justify-between border-t border-brand-secondary/20 pt-4">
                  <div className="flex flex-col">
                      <span className="text-xs text-brand-muted font-medium">Desde</span>
                      <span className="text-lg font-bold text-brand-primary">
                          ${firstVariant?.price || "0.00"}
                      </span>
                  </div>
                  
                  {/* Nota: En el futuro pondremos e.preventDefault() aquí para que el botón no abra la página del producto, sino que añada al carrito */}
                  <Button size="icon" className="rounded-full bg-brand-text text-white hover:bg-brand-primary shadow-md hover:shadow-lg transition-all">
                      <ShoppingBag className="h-4 w-4" />
                  </Button>
              </div>
          </div>
        </div>
      </div>
    </Link>
  );
}