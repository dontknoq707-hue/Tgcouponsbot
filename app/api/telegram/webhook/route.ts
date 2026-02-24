import { NextResponse } from "next/server";
import type { TelegramUpdate } from "@/lib/types/database";
import {
  handleStartCommand,
  handleCallbackQuery,
  handleMessage,
} from "@/lib/telegram/handlers";

export async function POST(request: Request) {
  try {
    const update: TelegramUpdate = await request.json();

    // Handle callback queries (inline keyboard buttons)
    if (update.callback_query) {
      await handleCallbackQuery(update.callback_query);
    }
    // Handle messages
    else if (update.message) {
      if (update.message.text === "/start") {
        await handleStartCommand(update.message);
      } else {
        await handleMessage(update.message);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[v0] Telegram webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Webhook endpoint active",
    message: "Send POST requests from Telegram",
  });
}
