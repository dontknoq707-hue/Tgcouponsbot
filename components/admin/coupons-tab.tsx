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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
  emoji: string;
}

interface Coupon {
  id: string;
  category_id: string;
  code: string;
  discount: string;
  description: string;
  validity: string;
  is_active: boolean;
  categories?: Category;
}

export function CouponsTab() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [formData, setFormData] = useState({
    category_id: "",
    code: "",
    discount: "",
    description: "",
    validity: "",
    is_active: true,
  });

  useEffect(() => {
    fetchCoupons();
    fetchCategories();
  }, []);

  async function fetchCoupons() {
    try {
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      setCoupons(data.coupons || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  function openAddDialog() {
    setEditingCoupon(null);
    setFormData({
      category_id: "",
      code: "",
      discount: "",
      description: "",
      validity: "",
      is_active: true,
    });
    setDialogOpen(true);
  }

  function openEditDialog(coupon: Coupon) {
    setEditingCoupon(coupon);
    setFormData({
      category_id: coupon.category_id,
      code: coupon.code,
      discount: coupon.discount,
      description: coupon.description,
      validity: coupon.validity,
      is_active: coupon.is_active,
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const url = editingCoupon
      ? `/api/admin/coupons/${editingCoupon.id}`
      : "/api/admin/coupons";
    const method = editingCoupon ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchCoupons();
      }
    } catch (error) {
      console.error("Error saving coupon:", error);
    }
  }

  async function toggleCoupon(coupon: Coupon) {
    try {
      await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...coupon, is_active: !coupon.is_active }),
      });
      fetchCoupons();
    } catch (error) {
      console.error("Error toggling coupon:", error);
    }
  }

  async function deleteCoupon(id: string) {
    if (!confirm("Are you sure you want to delete this coupon?")) return;

    try {
      await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      fetchCoupons();
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading coupons...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Manage Coupons</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>Add Coupon</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCoupon ? "Edit Coupon" : "Add New Coupon"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(v) =>
                    setFormData({ ...formData, category_id: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.emoji} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Coupon Code</Label>
                <Input
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  placeholder="PWJEE20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Discount</Label>
                <Input
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: e.target.value })
                  }
                  placeholder="20% off"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Validity</Label>
                <Input
                  value={formData.validity}
                  onChange={(e) =>
                    setFormData({ ...formData, validity: e.target.value })
                  }
                  placeholder="Limited Time"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enroll smart and save big!"
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
                {editingCoupon ? "Update Coupon" : "Create Coupon"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Validity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell>
                {coupon.categories?.emoji} {coupon.categories?.name}
              </TableCell>
              <TableCell className="font-mono">{coupon.code}</TableCell>
              <TableCell>{coupon.discount}</TableCell>
              <TableCell>{coupon.validity}</TableCell>
              <TableCell>
                <Switch
                  checked={coupon.is_active}
                  onCheckedChange={() => toggleCoupon(coupon)}
                />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(coupon)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteCoupon(coupon.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {coupons.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No coupons found. Add your first coupon!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
