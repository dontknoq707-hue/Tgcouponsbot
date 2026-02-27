"use client";

import React from "react"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface Category {
  id: string;
  name: string;
  emoji: string;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
}

export function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    emoji: "",
    sort_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  function openAddDialog() {
    setEditingCategory(null);
    setFormData({
      name: "",
      emoji: "",
      sort_order: categories.length,
      is_active: true,
    });
    setDialogOpen(true);
  }

  function openEditDialog(category: Category) {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      emoji: category.emoji,
      sort_order: category.sort_order,
      is_active: category.is_active,
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const url = editingCategory
      ? `/api/admin/categories/${editingCategory.id}`
      : "/api/admin/categories";
    const method = editingCategory ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchCategories();
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  }

  async function toggleCategory(category: Category) {
    try {
      await fetch(`/api/admin/categories/${category.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...category, is_active: !category.is_active }),
      });
      fetchCategories();
    } catch (error) {
      console.error("Error toggling category:", error);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading categories...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Manage Categories</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="PW Batches JEE"
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
                  placeholder="📘"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sort_order: parseInt(e.target.value),
                    })
                  }
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
                {editingCategory ? "Update Category" : "Create Category"}
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
            <TableHead>Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="text-xl">{category.emoji}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.sort_order}</TableCell>
              <TableCell>
                <Switch
                  checked={category.is_active}
                  onCheckedChange={() => toggleCategory(category)}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(category)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
