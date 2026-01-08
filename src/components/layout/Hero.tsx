"use client"; // <--- ESTA LÍNEA ES LA CLAVE

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-background pt-16 pb-12 md:pt-24 md:pb-20">
      {/* Fondo decorativo degradado sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/20 via-transparent to-brand-primary/5 pointer-events-none" />

      <div className="container relative px-4 md:px-6 z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* COLUMNA IZQUIERDA: Texto */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl font-heading font-bold tracking-tight text-brand-text sm:text-5xl md:text-6xl lg:text-7xl">
                Realza tu <span className="text-brand-primary">Esencia</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-brand-muted text-lg md:text-xl lg:mx-0 font-light">
                Descubre maquillaje seleccionado para resaltar la belleza natural manabita.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full px-8 h-12 text-lg shadow-lg shadow-brand-primary/20">
                <Link href="#catalogo">
                  Ver Colección <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-brand-primary/20 text-brand-text hover:bg-brand-secondary/20 rounded-full px-8 h-12 text-lg">
                <Link href="/about">
                  Nuestra Historia
                </Link>
              </Button>
            </div>
          </div>

          {/* COLUMNA DERECHA: Imagen */}
          <div className="relative mx-auto w-full max-w-[400px] lg:max-w-[500px]">
            {/* Blob decorativo detrás */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-secondary/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
            
            {/* Contenedor de imagen */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-all duration-500 ease-out bg-brand-secondary">
              <img
                // URL directa y estable
                src="https://images.unsplash.com/photo-1522335789203-abd65232a21d?q=80&w=1000&auto=format&fit=crop"
                alt="Meine Essenz Maquillaje"
                className="object-cover w-full h-full"
                // Ahora esto sí funcionará porque estamos en 'use client'
                onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                        target.parentElement.style.backgroundColor = '#DB2777';
                        target.parentElement.classList.add("flex", "items-center", "justify-center");
                        target.parentElement.innerHTML = '<span class="text-white font-heading text-xl">Meine Essenz</span>';
                    }
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}