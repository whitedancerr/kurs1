import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function trimEnv(s: string | undefined): string {
  return (s ?? '').trim().replace(/\/+$/, '');
}

/**
 * Проверка «реального» проекта Supabase: https://xxx.supabase.co и длинный anon JWT.
 * Неверные/пустые значения → приложение использует локальную авторизацию без сетевых запросов.
 */
export function isSupabaseConfigured(): boolean {
  const url = trimEnv(import.meta.env.VITE_SUPABASE_URL);
  const key = trimEnv(import.meta.env.VITE_SUPABASE_ANON_KEY);
  if (!url || !key) return false;
  if (/placeholder/i.test(url) || /placeholder/i.test(key)) return false;
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:') return false;
    if (!u.hostname.endsWith('.supabase.co')) return false;
  } catch {
    return false;
  }
  if (key.length < 80) return false;
  return true;
}

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(
      trimEnv(import.meta.env.VITE_SUPABASE_URL),
      trimEnv(import.meta.env.VITE_SUPABASE_ANON_KEY),
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      }
    );
  }
  return client;
}
