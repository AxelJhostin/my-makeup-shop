import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-brand-secondary/30 via-brand-background to-brand-background pt-16 pb-12 md:pt-24 md:pb-20">
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* COLUMNA IZQUIERDA: Texto y Llamada a la acción */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl font-heading font-bold tracking-tight text-brand-text sm:text-5xl md:text-6xl lg:text-7xl">
                Realza tu <span className="text-brand-primary">Esencia</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-brand-muted text-lg md:text-xl lg:mx-0 font-light">
                Descubre maquillaje seleccionado para resaltar la belleza natural manabita. Tonos vibrantes, texturas suaves y calidad premium.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full px-8 h-12 text-lg">
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

          {/* COLUMNA DERECHA: Imagen Decorativa */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            {/* Círculo decorativo de fondo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-brand-primary/10 rounded-full blur-3xl -z-10"></div>
            
            {/* Imagen con borde orgánico */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              <img
                src="https://pixabay.com/es/images/download/woman-1361904_1920.jpg"
                alt="Colección de maquillaje Meine Essenz"
                className="object-cover w-full h-auto aspect-[4/3]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}