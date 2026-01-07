import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database' // Asegúrate que la ruta sea correcta

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// El cliente ahora sabe que .from('products') devuelve un Product
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)