"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { Package, LayoutDashboard, LogOut, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || (path !== "/admin" && pathname.startsWith(path));
  };

  return (
    <div className="flex min-h-screen bg-slate-50"> 
      
      {/* --- SIDEBAR OSCURO --- */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white hidden md:flex flex-col z-50 shadow-xl">
        
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <span className="font-heading font-bold text-2xl tracking-wide">
            Meine<span className="text-brand-primary">Admin</span>
          </span>
        </div>

        {/* Menú */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          
          <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Principal</p>
          
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all ${
              isActive("/admin") 
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Resumen
          </Link>

          <Link 
            href="/admin/products" 
            className={`flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all ${
              isActive("/admin/products")
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Package className="h-5 w-5" />
            Productos
          </Link>

          {/* Configuración (deshabilitado visualmente) */}
          <div className="opacity-50 pointer-events-none">
            <Link href="#" className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg text-slate-400">
                <Settings className="h-5 w-5" /> Configuración
            </Link>
          </div>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/30">
           <div className="flex items-center gap-3 text-slate-400 hover:text-white cursor-pointer transition-colors">
              <LogOut className="h-5 w-5" /> 
              <span className="font-medium">Cerrar Sesión</span>
           </div>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 md:ml-64 transition-all">
        {/* AQUÍ ESTÁ EL TRUCO: Usamos el contenedor gigante para que la tabla respire */}
        <div className="h-full w-full max-w-[1920px] mx-auto p-6 md:p-10 space-y-8">
            {children}
        </div>
      </main>
      
    </div>
  );
}