/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase";

// Definimos qué datos necesita este servicio para trabajar
export interface ProductInput {
  name: string;
  description: string;
  price: string;
  stock: string;
  colorName: string;
  colorHex: string;
  imageFile: File | null;
}

export const createProductWithVariant = async (input: ProductInput) => {
  // 1. SUBIR IMAGEN (Si existe)
  let finalImageUrl = null;
  if (input.imageFile) {
    const fileExt = input.imageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, input.imageFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    finalImageUrl = data.publicUrl;
  }

  // 2. CREAR PRODUCTO
  const { data: productData, error: productError } = await supabase
    .from('products')
    .insert([{
      name: input.name,
      description: input.description,
      is_active: true
    }] as any)
    .select()
    .single();

  if (productError) throw productError;

  // 3. CREAR VARIANTE
  const { error: variantError } = await supabase
    .from('product_variants')
    .insert([{
      product_id: (productData as any).id,
      price: parseFloat(input.price),
      stock_quantity: parseInt(input.stock) || 0,
      color_name: input.colorName || "Único",
      color_hex: input.colorHex,
      image_url: finalImageUrl
    }] as any);

  if (variantError) throw variantError;

  return true;
};