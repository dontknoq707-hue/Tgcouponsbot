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

    // Get recent interactions
    const { data: recentInteractions, error: recentError } = await supabase
      .from("user_interactions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (recentError) throw recentError;

    // Get action counts
    const { data: allInteractions, error: allError } = await supabase
      .from("user_interactions")
      .select("action");

    if (allError) throw allError;

    // Count actions
    const actionCounts: Record<string, number> = {};
    allInteractions?.forEach((i) => {
      actionCounts[i.action] = (actionCounts[i.action] || 0) + 1;
    });

    // Sort by count
    const topActions = Object.entries(actionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([action, count]) => ({ action, count }));

    return NextResponse.json({
      recentInteractions,
      topActions,
    });
  } catch (error) {
    console.error("[v0] Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
