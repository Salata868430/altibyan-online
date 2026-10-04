import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await getAdmin();
    return NextResponse.json({ isAdmin: Boolean(admin) });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
