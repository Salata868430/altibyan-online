import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function GET() {
  if (!isSupabaseConfigured()) return NextResponse.json({ isAdmin: false });
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ isAdmin: false });
  return NextResponse.json({ isAdmin: Boolean(await getAdmin()) });
}
