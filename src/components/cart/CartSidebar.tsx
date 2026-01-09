// src/components/cart/CartSidebar.tsx
"use client";

import { useCartStore } from "@/store/cart";
import { useMounted } from "@/hooks/use-mounted";
import { X, Minus, Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// BORRÉ LA LÍNEA DE "formatPrice" AQUÍ PORQUE NO LA ESTAMOS USANDO AÚN

export const CartSidebar = () => {
  const { isSideMenuOpen, closeSideMenu, items, removeItem, updateQuantity } = useCartStore();
  
  const isMounted = useMounted();

  if (!isMounted) return null;

  // Calcular Total
  const total = items.reduce((acc, item) => acc + (item.variant.price * item.quantity), 0);

  // Generar Link de WhatsApp
  const generateWhatsAppLink = () => {
    const phone = "593999999999"; // ¡REEMPLAZA CON TU NÚMERO!
    let message = "Hola Meine Essenz, quiero realizar el siguiente pedido:\n\n";
    
    items.forEach(item => {
      message += `• ${item.product.name} (${item.variant.color_name}) - Cant: ${item.quantity} - $${(item.variant.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n*TOTAL: $${total.toFixed(2)}*`;
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div>
      {/* Fondo oscuro (Overlay) */}
      {isSideMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity backdrop-blur-sm"
          onClick={closeSideMenu}
        />
      )}

      {/* Menú Lateral */}
      <aside 
        className={`fixed top-0 right-0 z-50 h-screen w-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isSideMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          
          {/* Cabecera */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-heading font-bold text-brand-text">Tu Carrito ({items.length})</h2>
            <Button variant="ghost" size="icon" onClick={closeSideMenu} className="hover:bg-slate-100 rounded-full">
              <X className="h-6 w-6 text-slate-500" />
            </Button>
          </div>

          {/* Lista de Productos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="h-20 w-20 bg-brand-secondary/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-10 w-10 text-brand-muted" />
                </div>
                <p className="text-slate-500">Tu carrito está vacío.</p>
                <Button variant="outline" onClick={closeSideMenu} className="border-brand-primary text-brand-primary mt-4">
                    Seguir Explorando
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.product.id}-${item.variant.id}`} className="flex gap-4 animate-in fade-in zoom-in-95 duration-300">
                  {/* Imagen Miniatura */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-slate-50">
                    {item.variant.image_url ? (
                        <img 
                          src={item.variant.image_url} 
                          alt={item.product.name} 
                          className="h-full w-full object-cover" 
                        />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">Sin foto</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{item.product.name}</h3>
                        <p className="text-xs text-brand-muted mt-1">Tono: {item.variant.color_name}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                            <button 
                                onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                                className="px-2 py-1 hover:bg-slate-100 border-r"
                            >
                                <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-xs font-medium">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                                className="px-2 py-1 hover:bg-slate-100 border-l"
                            >
                                <Plus className="h-3 w-3" />
                            </button>
                        </div>
                        <div className="text-right">
                             <span className="block text-sm font-bold text-brand-primary">
                                ${(item.variant.price * item.quantity).toFixed(2)}
                             </span>
                             <button 
                                onClick={() => removeItem(item.variant.id)}
                                className="text-xs text-red-400 hover:text-red-600 underline mt-1"
                             >
                                Eliminar
                             </button>
                        </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer (Total y Botón) */}
          {items.length > 0 && (
            <div className="border-t p-6 bg-slate-50 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold text-brand-text">
                    <span>Total Estimado</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                
                <Button 
                    asChild 
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg shadow-lg shadow-green-200"
                >
                    <Link href={generateWhatsAppLink()} target="_blank">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Pedir por WhatsApp
                    </Link>
                </Button>
                <p className="text-[10px] text-center text-slate-400">
                    Al hacer clic, se abrirá un chat con nuestro equipo para confirmar pago y envío.
                </p>
            </div>
          )}

        </div>
      </aside>
    </div>
  );
};