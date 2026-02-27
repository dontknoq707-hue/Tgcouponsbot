"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Interaction {
  id: string;
  telegram_id: string;
  username: string | null;
  first_name: string | null;
  action: string;
  created_at: string;
}

interface TopAction {
  action: string;
  count: number;
}

export function StatsTab() {
  const [recentInteractions, setRecentInteractions] = useState<Interaction[]>([]);
  const [topActions, setTopActions] = useState<TopAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const res = await fetch("/api/admin/analytics");
      const data = await res.json();
      setRecentInteractions(data.recentInteractions || []);
      setTopActions(data.topActions || []);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Actions</CardTitle>
            <CardDescription>Most popular bot interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topActions.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm truncate max-w-[200px]">{item.action}</span>
                  <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {item.count}
                  </span>
                </div>
              ))}
              {topActions.length === 0 && (
                <p className="text-sm text-muted-foreground">No data yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Latest user interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInteractions.slice(0, 10).map((interaction) => (
                  <TableRow key={interaction.id}>
                    <TableCell>
                      {interaction.first_name || interaction.username || "Unknown"}
                    </TableCell>
                    <TableCell className="text-xs truncate max-w-[100px]">
                      {interaction.action}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(interaction.created_at).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
                {recentInteractions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No interactions yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
