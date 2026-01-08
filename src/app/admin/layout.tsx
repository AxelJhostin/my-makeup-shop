import Link from "next/link";
import { Package, LayoutDashboard } from "lucide-react";
import { SignOutButton } from "@/components/admin/SignOutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* SIDEBAR (Barra Lateral Izquierda) */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        
        {/* Logo Admin */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <span className="font-heading font-bold text-xl text-slate-800">
            Meine<span className="text-brand-primary">Admin</span>
          </span>
        </div>

        {/* Menú de Navegación */}
        <nav className="flex-1 p-4 space-y-1">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Resumen
          </Link>
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-brand-primary/10 text-brand-primary rounded-md transition-colors"
          >
            <Package className="h-4 w-4" />
            Productos
          </Link>
        </nav>

        {/* Footer del Sidebar con Logout */}
        <div className="p-4 border-t border-slate-100">
          <SignOutButton />
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-5xl mx-auto">
            {children}
        </div>
      </main>
      
    </div>
  );
}