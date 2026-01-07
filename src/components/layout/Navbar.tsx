// src/components/layout/Navbar.tsx
import Link from "next/link";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-secondary/30 bg-brand-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-brand-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        
        {/* 1. Menú Mobile (Izquierda) */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-brand-text">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* 2. Logo MEINE ESSENZ */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading text-2xl font-bold text-brand-primary tracking-tighter">
              MEINE <span className="text-brand-text">ESSENZ</span>
            </span>
          </Link>
        </div>

        {/* 3. Navegación Desktop (Centro) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-text/80">
          <Link href="/catalog" className="hover:text-brand-primary transition-colors">
            Catálogo
          </Link>
          <Link href="/categories/lips" className="hover:text-brand-primary transition-colors">
            Labios
          </Link>
          <Link href="/categories/eyes" className="hover:text-brand-primary transition-colors">
            Ojos
          </Link>
          <Link href="/about" className="hover:text-brand-primary transition-colors">
            Sobre Nosotros
          </Link>
        </nav>

        {/* 4. Iconos de Acción (Derecha) */}
        <div className="flex items-center gap-2">
          {/* Buscador */}
          <Button variant="ghost" size="icon" className="text-brand-text hover:text-brand-primary hover:bg-brand-secondary/20">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>

          {/* Perfil */}
          <Button variant="ghost" size="icon" className="text-brand-text hover:text-brand-primary hover:bg-brand-secondary/20 hidden sm:flex">
            <User className="h-5 w-5" />
            <span className="sr-only">Perfil</span>
          </Button>

          {/* Carrito (Con badge de cantidad simulado) */}
          <Button variant="ghost" size="icon" className="relative text-brand-text hover:text-brand-primary hover:bg-brand-secondary/20">
            <ShoppingBag className="h-5 w-5" />
            {/* Badge hardcodeado por ahora */}
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-brand-accent border-2 border-brand-background"></span>
            <span className="sr-only">Carrito</span>
          </Button>
        </div>
      </div>
    </header>
  );
}