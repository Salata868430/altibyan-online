export function isSupabaseConfigured() {
  return false; // Standalone mode: bypass dead Supabase to ensure lightning fast speed (<0.01s)
}

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return { url, key };
}
