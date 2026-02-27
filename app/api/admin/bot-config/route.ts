import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value;
}

export async function GET() {
  try {
    const adminId = await checkAuth();
    if (!adminId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("bot_config")
      .select("*")
      .eq("is_active", true)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    return NextResponse.json(data || {});
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bot config" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const adminId = await checkAuth();
    if (!adminId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const supabase = await createClient();

    // Deactivate previous config
    await supabase
      .from("bot_config")
      .update({ is_active: false })
      .neq("id", "");

    // Create new config
    const { data, error } = await supabase
      .from("bot_config")
      .insert({
        greeting_message: body.greeting_message,
        support_username: body.support_username,
        support_mode: body.support_mode,
        extras_message: body.extras_message,
        referral_code: body.referral_code,
        referral_message: body.referral_message,
        referral_instructions: body.referral_instructions,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("[v0] Bot config error:", error);
    return NextResponse.json(
      { error: "Failed to update bot config" },
      { status: 500 }
    );
  }
}
