"use client";

import React from "react"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Settings {
  greeting_message: string;
  admin_username: string;
  support_mode: string;
}

export function SettingsTab() {
  const [settings, setSettings] = useState<Settings>({
    greeting_message: "",
    admin_username: "",
    support_mode: "forward",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data.settings || {
        greeting_message: "",
        admin_username: "",
        support_mode: "forward",
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage("Settings saved successfully!");
      } else {
        setMessage("Failed to save settings.");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage("Error saving settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Bot Settings</h3>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Greeting Message</CardTitle>
            <CardDescription>
              Customize the message users see when they start the bot.
              Use {"{first_name}"} to include their name.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={settings.greeting_message}
              onChange={(e) =>
                setSettings({ ...settings, greeting_message: e.target.value })
              }
              placeholder="Hello {first_name}! Welcome to PW Coupons Bot..."
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Support Settings</CardTitle>
            <CardDescription>
              Configure how users can contact support.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Admin Telegram Username</Label>
              <Input
                value={settings.admin_username}
                onChange={(e) =>
                  setSettings({ ...settings, admin_username: e.target.value })
                }
                placeholder="your_username (without @)"
              />
              <p className="text-xs text-muted-foreground">
                Users can click to message this username directly.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Support Mode</Label>
              <Select
                value={settings.support_mode}
                onValueChange={(v) =>
                  setSettings({ ...settings, support_mode: v })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="forward">Forward messages to admin</SelectItem>
                  <SelectItem value="link">Show admin link only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Webhook Information</CardTitle>
            <CardDescription>
              Your Telegram webhook URL for setting up the bot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <code className="block bg-muted p-3 rounded text-sm break-all">
              https://pwcoupons.vercel.app/api/telegram/webhook
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Set this URL using the Telegram Bot API setWebhook method.
            </p>
          </CardContent>
        </Card>

        {message && (
          <p className={`text-sm ${message.includes("success") ? "text-green-600" : "text-destructive"}`}>
            {message}
          </p>
        )}

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
