import { createClient } from "@/lib/supabase/server";
import { sendMessageWithMode, editMessage, setMessageReaction } from "@/lib/telegram/api";
import {
  createMainKeyboard,
  createPWKeyboard,
  createBatchesKeyboard,
  createExamKeyboard,
  createTestSeriesKeyboard,
  createInstituteKeyboard,
  createInstituteExamKeyboard,
  createExtrasKeyboard,
  createSupportKeyboard,
} from "@/lib/telegram/keyboards";
import type { Message, CallbackQuery } from "@/lib/types/database";

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const ADMIN_TELEGRAM_ID = process.env.ADMIN_TELEGRAM_ID || "";

async function getBotConfig() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("bot_config")
      .select("*")
      .eq("is_active", true)
      .single();
    return data;
  } catch {
    return null;
  }
}

async function logUserInteraction(telegramId: number, action: string) {
  try {
    const supabase = await createClient();
    await supabase.from("user_interactions").insert({
      telegram_id: telegramId,
      action,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[v0] Failed to log interaction:", error);
  }
}

export async function handleStartCommand(message: Message) {
  const chatId = message.chat.id;
  const firstName = message.from?.first_name || "there";

  // React to message
  await setMessageReaction(chatId, message.message_id, "👍");

  // Get bot config
  const config = await getBotConfig();
  const greeting =
    config?.greeting_message ||
    `Hello <b>${firstName}</b> 👋✨\n\nWelcome to your discounted education journey 🎓💸\n\nChoose what you're looking for today 👇`;

  // Send greeting with main menu
  await sendMessageWithMode(chatId, greeting, createMainKeyboard(), "HTML");

  // Log interaction
  await logUserInteraction(message.from?.id || 0, "start");
}

export async function handleCallbackQuery(query: CallbackQuery) {
  const chatId = query.message?.chat.id;
  const messageId = query.message?.message_id;
  const data = query.data;
  const userId = query.from?.id || 0;

  if (!chatId || !data) return;

  try {
    const supabase = await createClient();

    // Parse callback data: action:param:subparam
    const parts = data.split(":");
    const action = parts[0];
    const param = parts[1];
    const subparam = parts[2];

    // Log interaction
    await logUserInteraction(userId, `callback:${data}`);

    const config = await getBotConfig();

    // Handle main menu navigation
    if (action === "menu") {
      if (param === "main") {
        const text = `Choose what you're looking for today 👇`;
        await editMessage(
          chatId,
          messageId || 0,
          text,
          createMainKeyboard(),
          "HTML"
        );
      } else if (param === "pw") {
        const text = `<b>Choose a PW category</b> 📚🔥`;
        await editMessage(
          chatId,
          messageId || 0,
          text,
          createPWKeyboard(),
          "HTML"
        );
      } else if (param === "other") {
        const { data: institutes } = await supabase
          .from("institutes")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        const text = `<b>Choose an institute</b> 🎓`;
        await editMessage(
          chatId,
          messageId || 0,
          text,
          createInstituteKeyboard(institutes || []),
          "HTML"
        );
      } else if (param === "extras") {
        const text =
          config?.extras_message ||
          `<b>Earn rewards & offers</b> 💰🎁\n\nClick below to see referral opportunities`;
        await editMessage(
          chatId,
          messageId || 0,
          text,
          createExtrasKeyboard(config?.referral_code || ""),
          "HTML"
        );
      } else if (param === "support") {
        const supportText = config?.support_username
          ? `<b>Need help?</b> 🤝💬\n\n<b>Contact Admin:</b> @${config.support_username}`
          : `<b>Need help?</b> 🤝💬\n\nSend us a message!`;

        await editMessage(
          chatId,
          messageId || 0,
          supportText,
          createSupportKeyboard(config?.support_mode || "username"),
          "HTML"
        );
      }
    }

    // Handle PW submenu
    if (action === "pw") {
      if (param === "batches") {
        const text = `<b>Select your exam category</b> 🎯📖`;
        await editMessage(
          chatId,
          messageId || 0,
          text,
          createExamKeyboard("pw_batches"),
          "HTML"
        );
      } else if (param === "exam" && subparam) {
        const { data: coupons } = await supabase
          .from("coupons")
          .select("*")
          .eq("category", `PW - ${subparam} Batches`)
          .eq("is_active", true);

        let couponText = `<b>PW ${subparam} Batch Coupons</b> 🔥\n\n`;
        if (coupons && coupons.length > 0) {
          coupons.forEach((coupon) => {
            couponText += `<code>${coupon.code}</code> - <b>${coupon.discount}</b>\n`;
            couponText += `${coupon.description || ""}\n\n`;
          });
        } else {
          couponText += "No coupons available currently";
        }

        await editMessage(
          chatId,
          messageId || 0,
          couponText,
          createMainKeyboard(),
          "HTML"
        );
      } else if (param === "test_series") {
        const text = `<b>Choose Test Series Type</b> 🧪`;
        const { data: testSeries } = await supabase
          .from("test_series")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        await editMessage(
          chatId,
          messageId || 0,
          text,
          createTestSeriesKeyboard(testSeries || []),
          "HTML"
        );
      } else if (param === "test_exam" && subparam) {
        const { data: coupons } = await supabase
          .from("coupons")
          .select("*")
          .eq("category", `PW - ${subparam} Test Series`)
          .eq("is_active", true);

        let couponText = `<b>PW ${subparam} Test Series Coupons</b> 🧪\n\n`;
        if (coupons && coupons.length > 0) {
          coupons.forEach((coupon) => {
            couponText += `<code>${coupon.code}</code> - <b>${coupon.discount}</b>\n`;
            couponText += `${coupon.description || ""}\n\n`;
          });
        } else {
          couponText += "No coupons available currently";
        }

        await editMessage(
          chatId,
          messageId || 0,
          couponText,
          createMainKeyboard(),
          "HTML"
        );
      } else if (param === "store") {
        const { data: storeCoupons } = await supabase
          .from("coupons")
          .select("*")
          .eq("category", "PW - Store")
          .eq("is_active", true);

        let storeText = `<b>PW Store Coupons</b> 🛍\n\n`;
        if (storeCoupons && storeCoupons.length > 0) {
          storeCoupons.forEach((coupon) => {
            storeText += `<code>${coupon.code}</code> - <b>${coupon.discount}</b>\n`;
            storeText += `${coupon.description || ""}\n\n`;
          });
        } else {
          storeText += "No store coupons available";
        }

        await editMessage(
          chatId,
          messageId || 0,
          storeText,
          createMainKeyboard(),
          "HTML"
        );
      } else if (param === "offline") {
        const { data: stores } = await supabase
          .from("stores")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        const text = `<b>Choose PW Offline Location</b> 🏫`;
        const keyboard: any = {
          inline_keyboard: [
            ...(stores || []).map((store) => [
              {
                text: `${store.emoji} ${store.name}`,
                callback_data: `pw:offline_store:${store.id}`,
              },
            ]),
            [{ text: "🔙 Back", callback_data: "menu:pw" }],
          ],
        };

        await editMessage(
          chatId,
          messageId || 0,
          text,
          keyboard,
          "HTML"
        );
      } else if (param === "offline_store" && subparam) {
        const { data: storeCoupon } = await supabase
          .from("coupons")
          .select("*")
          .eq("store_id", subparam)
          .eq("is_active", true)
          .single();

        let storeText = `<b>PW Offline Coupon</b> 🏫\n\n`;
        if (storeCoupon) {
          storeText += `<code>${storeCoupon.code}</code>\n`;
          storeText += `<b>${storeCoupon.discount}</b>\n`;
          storeText += `${storeCoupon.description || ""}`;
        } else {
          storeText += "No coupon available for this location";
        }

        await editMessage(
          chatId,
          messageId || 0,
          storeText,
          createMainKeyboard(),
          "HTML"
        );
      } else if (param === "power_batch") {
        const { data: powerBatchCoupons } = await supabase
          .from("coupons")
          .select("*")
          .eq("category", "PW - Power Batch")
          .eq("is_active", true);

        let powerText = `<b>PW Power Batch</b> ⚡\n\n`;
        if (powerBatchCoupons && powerBatchCoupons.length > 0) {
          powerBatchCoupons.forEach((coupon) => {
            powerText += `<code>${coupon.code}</code> - <b>${coupon.discount}</b>\n`;
            powerText += `${coupon.description || ""}\n\n`;
          });
        } else {
          powerText += "No power batch coupons available";
        }

        await editMessage(
          chatId,
          messageId || 0,
          powerText,
          createMainKeyboard(),
          "HTML"
        );
      }
    }

    // Handle other institutes
    if (action === "institute" && param && subparam) {
      const { data: coupons } = await supabase
        .from("coupons")
        .select("*")
        .eq("category", `${param} - ${subparam}`)
        .eq("is_active", true);

      let instituteText = `<b>${param} ${subparam} Coupons</b> 🎓\n\n`;
      if (coupons && coupons.length > 0) {
        coupons.forEach((coupon) => {
          instituteText += `<code>${coupon.code}</code> - <b>${coupon.discount}</b>\n`;
          instituteText += `${coupon.description || ""}\n\n`;
        });
      } else {
        instituteText += "No coupons available currently";
      }

      await editMessage(
        chatId,
        messageId || 0,
        instituteText,
        createMainKeyboard(),
        "HTML"
      );
    }

    // Handle referrals
    if (action === "referral") {
      const referralText = config?.referral_message || `<b>Share & Earn</b> 💸\n\nCode: <code>${config?.referral_code || "REFERRAL"}</code>\n\n${config?.referral_instructions || ""}`;

      await editMessage(
        chatId,
        messageId || 0,
        referralText,
        createMainKeyboard(),
        "HTML"
      );
    }
  } catch (error) {
    console.error("[v0] Callback query error:", error);
  }
}

export async function handleMessage(message: Message) {
  const chatId = message.chat.id;
  const userId = message.from?.id || 0;
  const text = message.text || "";

  // Log interaction
  await logUserInteraction(userId, `message:${text}`);

  // Handle support messages (forward to admin)
  if (text.toLowerCase().startsWith("/support")) {
    const supportMessage = text.replace("/support ", "");
    const adminMessage = `<b>New Support Message</b>\n\nFrom: ${message.from?.first_name} ${message.from?.last_name || ""}\nUser ID: ${userId}\n\nMessage: ${supportMessage}`;

    await sendMessageWithMode(parseInt(ADMIN_TELEGRAM_ID), adminMessage, undefined, "HTML");
    await sendMessageWithMode(
      chatId,
      "Your message has been sent to admin. We'll get back to you soon!",
      undefined,
      "HTML"
    );
  }
}
