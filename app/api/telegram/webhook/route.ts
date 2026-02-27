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

    console.log("[v0] Webhook received update:", update);

    // Handle callback queries (inline keyboard buttons)
    if (update.callback_query) {
      console.log("[v0] Processing callback query:", update.callback_query.data);
      await handleCallbackQuery(update.callback_query);
    }
    // Handle messages (text buttons and commands)
    else if (update.message) {
      console.log("[v0] Processing message:", update.message.text);
      
      if (update.message.text === "/start") {
        await handleStartCommand(update.message);
      } else {
        // handleMessage will route to appropriate handler based on text content
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
