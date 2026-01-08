"use client";

import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// Importamos el Store del carrito y el hook para evitar errores
import { useCartStore } from "@/store/cart";
import { useMounted } from "@/hooks/use-mounted";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Conectamos con el Carrito
  const { openSideMenu, items } = useCartStore();
  const isMounted = useMounted();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-brand-secondary/20 bg-brand-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-bold tracking-tight text-brand-primary">
            Meine<span className="text-brand-text">Essenz</span>
          </span>
        </Link>

        {/* MENÚ ESCRITORIO (Aquí están los nuevos links) */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link href="/" className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors">
            Inicio
          </Link>
          <Link href="/catalog" className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors">
            Todo el Catálogo
          </Link>
          <Link href="/catalog?category=maquillaje" className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors">
            Maquillaje
          </Link>
          <Link href="/catalog?category=skincare" className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors">
            Skincare
          </Link>
        </div>

        {/* ICONOS Y CARRITO */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-brand-text hover:text-brand-primary hover:bg-brand-secondary/10">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          
          {/* BOTÓN DEL CARRITO */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-brand-text hover:text-brand-primary hover:bg-brand-secondary/10 relative"
            onClick={openSideMenu}
          >
            <ShoppingBag className="h-5 w-5" />
            
            {/* Contador rojo del carrito */}
            {isMounted && items.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white animate-in zoom-in">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
            
            <span className="sr-only">Carrito</span>
          </Button>

          {/* Botón Menú Móvil */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-brand-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* MENÚ MÓVIL (Actualizado también) */}
      {isMenuOpen && (
        <div className="border-t md:hidden bg-brand-background">
          <div className="flex flex-col space-y-4 p-4">
             <Link href="/catalog" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Ver Todo
             </Link>
             <Link href="/catalog?category=maquillaje" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Maquillaje
             </Link>
             <Link href="/catalog?category=skincare" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Skincare
             </Link>
          </div>
        </div>
      )}
    </nav>
  );
}