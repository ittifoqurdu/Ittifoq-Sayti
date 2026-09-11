import { createClient } from '@supabase/supabase-js'

const envUrl = import.meta.env.VITE_SUPABASE_URL
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export function getSupabaseCredentials() {
  const localUrl = typeof window !== 'undefined' ? localStorage.getItem('urdu_supabase_url') : null
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('urdu_supabase_key') : null

  const url = localUrl || envUrl || ''
  const key = localKey || envKey || ''

  return {
    url,
    key,
    isConfigured: Boolean(url && key && url.startsWith('http') && !url.includes('YOUR_')),
  }
}

export function createSupabaseInstance() {
  const { url, key, isConfigured } = getSupabaseCredentials()
  if (!isConfigured) return null

  try {
    return createClient(url, key, {
      auth: {
        persistSession: false,
      },
    })
  } catch (err) {
    console.error('Supabase initialization error:', err)
    return null
  }
}

export const supabase = createSupabaseInstance()
