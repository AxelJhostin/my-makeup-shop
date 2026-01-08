import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database' 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// El <Database> aquí es la clave mágica. Sin esto, TS no sabe qué tablas existen.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)