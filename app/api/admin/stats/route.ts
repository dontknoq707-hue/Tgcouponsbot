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

    // Get total coupons
    const { count: totalCoupons } = await supabase
      .from("coupons")
      .select("*", { count: "exact", head: true });

    // Get active coupons
    const { count: activeCoupons } = await supabase
      .from("coupons")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // Get unique users
    const { data: users } = await supabase
      .from("user_interactions")
      .select("telegram_id");
    const uniqueUsers = new Set(users?.map((u) => u.telegram_id) || []);

    // Get today's interactions
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: todayInteractions } = await supabase
      .from("user_interactions")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today.toISOString());

    return NextResponse.json({
      totalCoupons: totalCoupons || 0,
      activeCoupons: activeCoupons || 0,
      totalUsers: uniqueUsers.size,
      todayInteractions: todayInteractions || 0,
    });
  } catch (error) {
    console.error("[v0] Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
