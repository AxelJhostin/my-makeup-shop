// --- TUS INTERFACES ORIGINALES ---
export type UserRole = 'admin' | 'customer';
export type OrderStatus = 'pending' | 'confirmed' | 'paid' | 'shipped' | 'cancelled';

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
  loyalty_points: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  slug: string;
  main_image_url: string | null;
  is_active: boolean;
  created_at: string;
  // Relaciones
  category?: Category;
  variants?: ProductVariant[]; 
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string | null;
  color_name: string;
  color_hex: string | null;
  price: number;
  stock_quantity: number;
  image_url: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  status: OrderStatus;
  total_amount: number;
  shipping_rate_id: string | null;
  guest_info: GuestInfo | null;
  created_at: string;
  updated_at: string | null;
  items?: OrderItem[];
}

export interface GuestInfo {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  variant_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  variant?: ProductVariant & { product?: Product }; 
}

// --- EL PUENTE (DATABASE MAPPING) ---
// Esto es lo que permite que el query funcione con autocompletado

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Profile;
        Update: Partial<Profile>;
      };
      categories: {
        Row: Category;
        Insert: Category;
        Update: Partial<Category>;
      };
      products: {
        Row: Product; // Al hacer el query, Supabase mapeará aquí
        Insert: Omit<Product, 'variants' | 'category'>; // Al insertar, no enviamos variantes ni categoría anidada
        Update: Partial<Omit<Product, 'variants' | 'category'>>;
      };
      product_variants: { // <--- IMPORTANTE: Este nombre coincide con tu snippet
        Row: ProductVariant;
        Insert: ProductVariant;
        Update: Partial<ProductVariant>;
      };
      orders: {
        Row: Order;
        Insert: Order;
        Update: Partial<Order>;
      };
      order_items: {
        Row: OrderItem;
        Insert: OrderItem;
        Update: Partial<OrderItem>;
      };
    };
  };
};