"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh(); // Refresca para que el Middleware detecte que ya no hay usuario
  };

  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      Cerrar Sesión
    </Button>
  );
}