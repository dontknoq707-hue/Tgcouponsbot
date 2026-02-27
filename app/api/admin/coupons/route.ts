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
    const { data: coupons, error } = await supabase
      .from("coupons")
      .select("*, categories(*)")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ coupons });
  } catch (error) {
    console.error("[v0] Coupons fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("coupons")
      .insert({
        category_id: body.category_id,
        code: body.code,
        discount: body.discount,
        description: body.description || "",
        validity: body.validity,
        is_active: body.is_active ?? true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ coupon: data });
  } catch (error) {
    console.error("[v0] Coupon create error:", error);
    return NextResponse.json(
      { error: "Failed to create coupon" },
      { status: 500 }
    );
  }
}
