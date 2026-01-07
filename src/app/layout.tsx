// src/app/layout.tsx
import type { Metadata } from "next";
// 1. Importamos las fuentes
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

// 2. Configuramos las instancias
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair", // Esta variable se usa en tailwind.config
  display: "swap",
});

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Makeup Store",
  description: "Tienda de maquillaje premium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 3. Inyectamos las variables en el body y aplicamos colores base */}
      <body className={`${playfair.variable} ${nunito.variable} bg-brand-background text-brand-text font-body antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}