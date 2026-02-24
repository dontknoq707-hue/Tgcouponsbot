import { cookies } from "next/headers";

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");
  return !!adminSession;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value;
}
