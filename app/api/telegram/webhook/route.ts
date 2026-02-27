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
      } else if (update.message.text === "🎓 Physics Wallah (PW)") {
        // Handle PW menu button
        await handleMenuText(update.message, "pw");
      } else if (update.message.text === "🏫 Other Institutes") {
        // Handle Other Institutes menu button
        await handleMenuText(update.message, "other");
      } else if (update.message.text === "🎁 Extras") {
        // Handle Extras menu button
        await handleMenuText(update.message, "extras");
      } else if (update.message.text === "🛠 Support") {
        // Handle Support menu button
        await handleMenuText(update.message, "support");
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

async function handleMenuText(message: any, action: string) {
  // Convert text menu clicks to callback query events
  const fakeCallbackQuery = {
    id: `text_${Date.now()}`,
    from: message.from,
    message: message,
    data: `menu:${action}`,
  };
  await handleCallbackQuery(fakeCallbackQuery);
}

export async function GET() {
  return NextResponse.json({
    status: "Webhook endpoint active",
    message: "Send POST requests from Telegram",
  });
}
