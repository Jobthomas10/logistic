import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta?.env?.VITE_SUPABASE_URL || (typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_URL : '') || 'https://rdoxrqvmbszdtbkekpyd.supabase.co'
const supabasePublishableKey = import.meta?.env?.VITE_SUPABASE_PUBLISHABLE_KEY || (typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_PUBLISHABLE_KEY : '') || 'sb_publishable_NUe41v_ktSPzASwbqLbcug_jN90uVK5'

export const supabase = (supabaseUrl && supabasePublishableKey) 
  ? createClient(supabaseUrl, supabasePublishableKey) 
  : null