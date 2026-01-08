import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database' 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Usamos createBrowserClient para las Cookies, PERO mantenemos <Database> 
// para que TypeScript siga siendo inteligente.
export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)