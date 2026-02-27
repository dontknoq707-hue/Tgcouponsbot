"use client";

import React from "react"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Referral {
  id: string;
  name: string;
  emoji: string;
  app_name: string;
  referral_code: string;
  instructions: string;
  link: string | null;
  is_active: boolean;
}

export function ReferralsTab() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    emoji: "",
    app_name: "",
    referral_code: "",
    instructions: "",
    link: "",
    is_active: true,
  });

  useEffect(() => {
    fetchReferrals();
  }, []);

  async function fetchReferrals() {
    try {
      const res = await fetch("/api/admin/referrals");
      const data = await res.json();
      setReferrals(data.referrals || []);
    } catch (error) {
      console.error("Error fetching referrals:", error);
    } finally {
      setLoading(false);
    }
  }

  function openAddDialog() {
    setEditingReferral(null);
    setFormData({
      name: "",
      emoji: "",
      app_name: "",
      referral_code: "",
      instructions: "",
      link: "",
      is_active: true,
    });
    setDialogOpen(true);
  }

  function openEditDialog(referral: Referral) {
    setEditingReferral(referral);
    setFormData({
      name: referral.name,
      emoji: referral.emoji,
      app_name: referral.app_name,
      referral_code: referral.referral_code,
      instructions: referral.instructions,
      link: referral.link || "",
      is_active: referral.is_active,
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const url = editingReferral
      ? `/api/admin/referrals/${editingReferral.id}`
      : "/api/admin/referrals";
    const method = editingReferral ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchReferrals();
      }
    } catch (error) {
      console.error("Error saving referral:", error);
    }
  }

  async function toggleReferral(referral: Referral) {
    try {
      await fetch(`/api/admin/referrals/${referral.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...referral, is_active: !referral.is_active }),
      });
      fetchReferrals();
    } catch (error) {
      console.error("Error toggling referral:", error);
    }
  }

  async function deleteReferral(id: string) {
    if (!confirm("Are you sure you want to delete this referral?")) return;

    try {
      await fetch(`/api/admin/referrals/${id}`, { method: "DELETE" });
      fetchReferrals();
    } catch (error) {
      console.error("Error deleting referral:", error);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading referrals...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Manage Referral Offers</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>Add Referral</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingReferral ? "Edit Referral" : "Add New Referral"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Earn Cash"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Emoji</Label>
                  <Input
                    value={formData.emoji}
                    onChange={(e) =>
                      setFormData({ ...formData, emoji: e.target.value })
                    }
                    placeholder="💸"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>App Name</Label>
                  <Input
                    value={formData.app_name}
                    onChange={(e) =>
                      setFormData({ ...formData, app_name: e.target.value })
                    }
                    placeholder="PhonePe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Referral Code</Label>
                  <Input
                    value={formData.referral_code}
                    onChange={(e) =>
                      setFormData({ ...formData, referral_code: e.target.value })
                    }
                    placeholder="SUMIT123"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Link (Optional)</Label>
                <Input
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Instructions</Label>
                <Textarea
                  value={formData.instructions}
                  onChange={(e) =>
                    setFormData({ ...formData, instructions: e.target.value })
                  }
                  placeholder="Install the app, use code, and earn!"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(v) =>
                    setFormData({ ...formData, is_active: v })
                  }
                />
                <Label>Active</Label>
              </div>
              <Button type="submit" className="w-full">
                {editingReferral ? "Update Referral" : "Create Referral"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Emoji</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>App</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {referrals.map((referral) => (
            <TableRow key={referral.id}>
              <TableCell className="text-xl">{referral.emoji}</TableCell>
              <TableCell>{referral.name}</TableCell>
              <TableCell>{referral.app_name}</TableCell>
              <TableCell className="font-mono">{referral.referral_code}</TableCell>
              <TableCell>
                <Switch
                  checked={referral.is_active}
                  onCheckedChange={() => toggleReferral(referral)}
                />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(referral)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteReferral(referral.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {referrals.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No referrals found. Add your first referral offer!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
