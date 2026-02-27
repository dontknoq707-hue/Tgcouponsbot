import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return !!session?.value;
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = await createClient();
    const { data: settings, error } = await supabase
      .from("bot_settings")
      .select("key, value");

    if (error) throw error;

    const settingsObj: Record<string, string> = {};
    settings?.forEach((s) => {
      settingsObj[s.key] = s.value;
    });

    return NextResponse.json({ settings: settingsObj });
  } catch (error) {
    console.error("[v0] Settings fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const supabase = await createClient();

    // Update each setting
    for (const [key, value] of Object.entries(body)) {
      await supabase
        .from("bot_settings")
        .upsert(
          { key, value: value as string, updated_at: new Date().toISOString() },
          { onConflict: "key" }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[v0] Settings update error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
