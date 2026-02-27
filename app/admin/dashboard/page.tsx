"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CouponsTab } from "@/components/admin/coupons-tab";
import { CategoriesTab } from "@/components/admin/categories-tab";
import { ReferralsTab } from "@/components/admin/referrals-tab";
import { SettingsTab } from "@/components/admin/settings-tab";
import { StatsTab } from "@/components/admin/stats-tab";

interface Stats {
  totalCoupons: number;
  activeCoupons: number;
  totalUsers: number;
  todayInteractions: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/admin");
          return;
        }
        throw new Error("Failed to fetch stats");
      }
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-pulse">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎓</span>
            <h1 className="text-xl font-bold">PW Coupons Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              View Site
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Coupons</CardDescription>
              <CardTitle className="text-3xl">{stats?.totalCoupons || 0}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Coupons</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats?.activeCoupons || 0}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-3xl">{stats?.totalUsers || 0}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Today&apos;s Interactions</CardDescription>
              <CardTitle className="text-3xl">{stats?.todayInteractions || 0}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Management Tabs */}
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="coupons">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="coupons">Coupons</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="referrals">Referrals</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="stats">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="coupons">
                <CouponsTab />
              </TabsContent>
              <TabsContent value="categories">
                <CategoriesTab />
              </TabsContent>
              <TabsContent value="referrals">
                <ReferralsTab />
              </TabsContent>
              <TabsContent value="settings">
                <SettingsTab />
              </TabsContent>
              <TabsContent value="stats">
                <StatsTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
