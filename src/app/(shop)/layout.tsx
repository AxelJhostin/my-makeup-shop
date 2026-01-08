// src/app/(shop)/layout.tsx
import { Navbar } from "@/components/layout/Navbar";
import { CartSidebar } from "@/components/cart/CartSidebar"; // <--- 1. Importamos

// Nota: Ya no importamos globals.css ni fuentes aquí porque el Root Layout (padre) ya lo hace.

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <CartSidebar /> {/* <--- 2. Lo colocamos aquí, "flotando" sobre todo */}
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}