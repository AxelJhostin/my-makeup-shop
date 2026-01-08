export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          is_active: boolean
          category: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          is_active?: boolean
          category?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          is_active?: boolean
          category?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          created_at: string
          product_id: string
          sku: string | null
          color_name: string | null
          color_hex: string | null
          price: number
          stock_quantity: number
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          product_id: string
          sku?: string | null
          color_name?: string | null
          color_hex?: string | null
          price: number
          stock_quantity?: number
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          product_id?: string
          sku?: string | null
          color_name?: string | null
          color_hex?: string | null
          price?: number
          stock_quantity?: number
          image_url?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string | null
          status: string
          total: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id?: string | null
          status?: string
          total: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string | null
          status?: string
          total?: number
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helpers para usar en el frontend
export type Product = Database['public']['Tables']['products']['Row']
export type ProductVariant = Database['public']['Tables']['product_variants']['Row']