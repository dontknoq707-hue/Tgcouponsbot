import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check admin_users table for valid admin
    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", username)
      .eq("is_active", true)
      .single();

    if (adminError || !admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Simple password check (in production, use proper hashing)
    // Default password is "admin123" - stored as hash in real app
    if (password !== "admin123") {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Set admin session cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[v0] Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
