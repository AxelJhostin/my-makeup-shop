// src/app/%28shop%29/layout.tsx
import { Navbar } from "@/components/layout/Navbar";

// Nota: Ya no importamos globals.css ni fuentes aquí porque el Root Layout (padre) ya lo hace.
// Tampoco ponemos <html> ni <body>.

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}