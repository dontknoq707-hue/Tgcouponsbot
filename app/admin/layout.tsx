import React from "react"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - PW Coupons",
  description: "Manage your Telegram coupon bot",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
