"use client";

import { useCartStore } from "@/store/cart";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, MessageCircle, ArrowLeft, Store } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const isMounted = useMounted();
  
  // Estado para los datos del cliente
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
    instructions: ""
  });

  if (!isMounted) return null;

  const total = items.reduce((acc, item) => acc + (item.variant.price * item.quantity), 0);

  // Manejar inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // --- LÓGICA WHATSAPP MEJORADA ---
  const handleWhatsAppOrder = () => {
    if (!customer.name || !customer.address) {
      alert("Por favor completa tu nombre y dirección para el envío.");
      return;
    }

    const phone = "593999999999"; // <--- TU NÚMERO
    
    let message = `👋 Hola *Glowify*, quiero confirmar mi pedido:\n\n`;
    message += `👤 *Cliente:* ${customer.name}\n`;
    message += `📍 *Dirección:* ${customer.address}\n`;
    if(customer.phone) message += `📱 *Teléfono:* ${customer.phone}\n`;
    if(customer.instructions) message += `📝 *Nota:* ${customer.instructions}\n`;
    
    message += `\n🛒 *RESUMEN DEL PEDIDO:*\n`;
    items.forEach(item => {
      message += `▪️ ${item.quantity}x ${item.product.name} (${item.variant.color_name}) - $${(item.variant.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n💰 *TOTAL A PAGAR: $${total.toFixed(2)}*`;
    message += `\n\n¿Me ayudan con los datos de pago? Gracias!`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
           <Store className="h-10 w-10 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-brand-text mb-2">Tu carrito está vacío</h1>
        <p className="text-brand-muted mb-8">Parece que aún no has elegido tus productos favoritos.</p>
        <Button asChild className="bg-brand-primary hover:bg-brand-primary/90">
            <Link href="/catalog">Ir al Catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:py-12 max-w-6xl">
      <div className="mb-8">
        <Link href="/catalog" className="text-sm text-brand-muted hover:text-brand-primary flex items-center gap-1 mb-2">
            <ArrowLeft className="h-4 w-4" /> Volver a la tienda
        </Link>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-text">Finalizar Compra</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* COLUMNA IZQUIERDA: RESUMEN DE PRODUCTOS */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Store className="h-5 w-5 text-brand-primary" /> Productos en tu pedido
              </h2>
              <div className="divide-y">
                {items.map((item) => (
                    <div key={`${item.product.id}-${item.variant.id}`} className="py-4 flex gap-4">
                        <div className="h-20 w-20 rounded-md border bg-slate-50 overflow-hidden shrink-0">
                            {item.variant.image_url && <img src={item.variant.image_url} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-slate-800">{item.product.name}</h3>
                                    <p className="text-sm text-slate-500">Tono: {item.variant.color_name}</p>
                                </div>
                                <p className="font-bold text-brand-primary">${(item.variant.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between items-end mt-2">
                                <div className="text-sm text-slate-500">Cant: {item.quantity}</div>
                                <button onClick={() => removeItem(item.variant.id)} className="text-red-400 hover:text-red-600">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
              <div className="border-t pt-4 mt-4 flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
              </div>
           </div>
        </div>

        {/* COLUMNA DERECHA: DATOS DE ENVÍO */}
        <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h2 className="font-bold text-lg mb-6">Datos de Envío</h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Nombre Completo</Label>
                        <Input name="name" placeholder="Ej: María Vélez" value={customer.name} onChange={handleInputChange} className="bg-white" />
                    </div>
                    <div className="space-y-2">
                        <Label>Dirección de Entrega</Label>
                        <Textarea name="address" placeholder="Ej: Calle Ricaurte y Colón, casa azul..." value={customer.address} onChange={handleInputChange} className="bg-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Teléfono</Label>
                            <Input name="phone" placeholder="099..." value={customer.phone} onChange={handleInputChange} className="bg-white" />
                        </div>
                        <div className="space-y-2">
                            <Label>Indicaciones Extra</Label>
                            <Input name="instructions" placeholder="Opcional" value={customer.instructions} onChange={handleInputChange} className="bg-white" />
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                    <Button 
                        onClick={handleWhatsAppOrder}
                        className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-green-100"
                    >
                        <MessageCircle className="mr-2 h-6 w-6" /> Confirmar Pedido por WhatsApp
                    </Button>
                    <p className="text-xs text-center text-slate-400 mt-3">
                        Al confirmar, se abrirá WhatsApp con los detalles de tu pedido y dirección listos para enviar.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}