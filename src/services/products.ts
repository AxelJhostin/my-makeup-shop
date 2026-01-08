/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase";

// Definimos la estructura limpia de los datos
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

// Helper interno para subir imágenes
const uploadProductImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  
  // CORRECCIÓN 1: Quitamos la carpeta "products/" del path para no redundar
  // (El bucket ya se llama products)
  const filePath = `${fileName}`;

  // CORRECCIÓN 2: Usamos el nombre REAL de tu bucket: 'products'
  const { error: uploadError } = await supabase.storage
    .from('products') 
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // CORRECCIÓN 3: Pedimos la URL al bucket 'products'
  const { data } = supabase.storage.from('products').getPublicUrl(filePath);
  return data.publicUrl;
};

// --- FUNCIÓN PRINCIPAL DE CREACIÓN ---
export const createProduct = async (input: CreateProductInput) => {
  // 1. Subir imagen si existe
  let imageUrl = null;
  if (input.imageFile) {
    imageUrl = await uploadProductImage(input.imageFile);
  }

  // 2. Crear Producto Padre
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert({
      name: input.name,
      description: input.description,
      category: input.category,
      is_active: true
    } as any) 
    .select()
    .single();

  if (productError) throw productError;

  // 3. Crear Variante
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

// --- FUNCIÓN DE LECTURA (FILTROS) ---
export const getProducts = async (category?: string) => {
  // 1. Preparamos la consulta base
  let query = supabase
    .from('products')
    .select(`
      *,
      variants:product_variants (
        id, color_name, color_hex, price, stock_quantity, image_url
      )
    `)
    .eq('is_active', true);

  // 2. Si nos mandan una categoría, aplicamos el filtro
  if (category) {
    query = query.eq('category', category);
  }

  // 3. Ejecutamos la consulta
  const { data, error } = await query;

  if (error) {
    console.error("Error cargando productos:", error);
    return [];
  }

  return data;
};