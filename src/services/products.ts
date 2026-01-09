/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase";

export interface CreateProductInput {
  name: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  colorName?: string;
  colorHex: string;
  imageFile: File | null;
}

const uploadProductImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('products') 
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('products').getPublicUrl(filePath);
  return data.publicUrl;
};

// --- FUNCIÓN PRINCIPAL ---
export const createProduct = async (input: CreateProductInput) => {
  // 1. Subir imagen
  let imageUrl = null;
  if (input.imageFile) {
    imageUrl = await uploadProductImage(input.imageFile);
  }

  // 2. Generar SLUG (URL amigable)
  // Convertimos "Labial Rojo Pasión" -> "labial-rojo-pasion-1234"
  const slug = input.name
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')           // Espacios por guiones
    .replace(/[^\w-]+/g, '')      // Quitar caracteres raros
    + '-' + Date.now().toString().slice(-4); // Agregamos números al final para asegurar que sea único

  // 3. Crear Producto Padre
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert({
      name: input.name,
      slug: slug, // <--- ¡AQUÍ ESTABA EL FALTANTE! ✅
      description: input.description,
      category: input.category,
      is_active: true
    } as any) 
    .select()
    .single();

  if (productError) throw productError;

  // 4. Crear Variante
  const { error: variantError } = await supabase
    .from('product_variants')
    .insert({
      product_id: (product as any).id, 
      color_name: input.colorName || "Único",
      color_hex: input.colorHex,
      price: parseFloat(input.price),
      stock_quantity: parseInt(input.stock || "0"),
      image_url: imageUrl
    } as any);

  if (variantError) throw variantError;

  return product;
};

// --- FUNCIÓN DE LECTURA ---
export const getProducts = async (category?: string) => {
  let query = supabase
    .from('products')
    .select(`
      *,
      variants:product_variants (
        id, color_name, color_hex, price, stock_quantity, image_url
      )
    `)
    .eq('is_active', true);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error cargando productos:", error);
    return [];
  }

  return data;
};

export const getProductById = async (productId: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants (*)
    `)
    .eq('id', productId)
    .single();

  if (error) throw error;
  return data;
};

// 2. Agregar una NUEVA variante (color) a un producto existente
// 2. Agregar una NUEVA variante (color) a un producto existente
export const createVariant = async (productId: string, input: any) => {
  // Subir imagen si existe (Reusamos la lógica de subida)
  let imageUrl = null;
  if (input.imageFile) {
    const fileExt = input.imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    // CORRECCIÓN: Usamos tu bucket 'products'
    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, input.imageFile);

    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('products').getPublicUrl(fileName);
    imageUrl = data.publicUrl;
  }

  // Guardar la variante
  // CORRECCIÓN AQUÍ: Agregamos 'as any' para evitar el error de tipos
  const { error } = await supabase
    .from('product_variants')
    .insert({
      product_id: productId,
      color_name: input.colorName,
      color_hex: input.colorHex,
      price: parseFloat(input.price),
      stock_quantity: parseInt(input.stock),
      image_url: imageUrl
    } as any); 

  if (error) throw error;
  return true;
};