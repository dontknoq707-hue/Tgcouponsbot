import { createClient } from "@/lib/supabase/server";
import { sendMessage, setReaction } from "@/lib/telegram/api";
import {
  createMainDashboard,
  createPWDashboard,
  createExamDashboard,
  createTestSeriesDashboard,
  createOfflineDashboard,
  createOtherInstitutesDashboard,
  createInstituteExamDashboard,
  createExtrasDashboard,
  createSupportDashboard,
  createBackButton,
} from "@/lib/telegram/keyboards";
import type { Message, CallbackQuery } from "@/lib/types/database";

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const ADMIN_TELEGRAM_ID = process.env.ADMIN_TELEGRAM_ID || "";

async function getBotSettings() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("bot_settings")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
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

  // Get bot settings
  const settings = await getBotSettings();
  const greeting = settings?.greeting_message || `Hello ${firstName} 👋✨\nWelcome to your discounted education journey 🎓💸\nChoose what you're looking for today 👇`;

  // Send greeting
  await sendMessage(chatId, greeting, createMainDashboard());

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

    // Parse callback data
    const parts = data.split(":");
    const action = parts[0];
    const param = parts[1];
    const subparam = parts[2];

    // Log interaction
    await logUserInteraction(userId, `callback:${data}`);

    // Handle main menu
    if (action === "menu") {
      if (param === "main") {
        await sendMessage(chatId, "Choose what you're looking for today 👇", createMainDashboard());
      } else if (param === "pw") {
        await sendMessage(
          chatId,
          "Choose a PW category 📚🔥",
          createPWDashboard()
        );
      } else if (param === "other") {
        await sendMessage(
          chatId,
          "Choose an institute 🎓",
          createOtherInstitutesDashboard()
        );
      } else if (param === "extras") {
        await sendMessage(
          chatId,
          "Earn rewards & offers 💰🎁",
          createExtrasDashboard()
        );
      } else if (param === "support") {
        const settings = await getBotSettings();
        await sendMessage(
          chatId,
          "Need help? 🤝💬",
          createSupportDashboard(settings?.admin_username)
        );
      }
    }

    // Handle PW categories
    if (action === "pw") {
      if (param === "batches") {
        await sendMessage(
          chatId,
          "Select your exam category 🎯📖",
          createExamDashboard("pw:batches")
        );
      } else if (param === "testseries") {
        await sendMessage(
          chatId,
          "Choose a test series 🧪",
          createTestSeriesDashboard()
        );
      } else if (param === "store") {
        const { data: coupons } = await supabase
          .from("coupons")
          .select("*")
          .match({ category_id: "pw_store", is_active: true });

        if (coupons && coupons.length > 0) {
          const couponText = coupons
            .map((c) => `🏷 ${c.code}\n💸 ${c.discount}\n⏳ ${c.validity}`)
            .join("\n\n");
          await sendMessage(
            chatId,
            `🛍 PW Store Coupons\n\n${couponText}`,
            createBackButton("menu:pw")
          );
        } else {
          await sendMessage(
            chatId,
            "No store coupons available right now ⏳",
            createBackButton("menu:pw")
          );
        }
      } else if (param === "offline") {
        await sendMessage(
          chatId,
          "Choose offline center 🏫",
          createOfflineDashboard()
        );
      } else if (param === "powerbatch") {
        const { data: coupons } = await supabase
          .from("coupons")
          .select("*")
          .match({ category_id: "pw_powerbatch", is_active: true })
          .limit(1)
          .single();

        if (coupons) {
          await sendMessage(
            chatId,
            `⚡ PW Power Batch Coupon ⚡\n\n🏷 Code: ${coupons.code}\n💸 Discount: ${coupons.discount}\n⏳ Validity: ${coupons.validity}\n\nEnroll smart 🚀`,
            createBackButton("menu:pw")
          );
        } else {
          await sendMessage(
            chatId,
            "No power batch coupon available right now ⏳",
            createBackButton("menu:pw")
          );
        }
      }

      // Handle exam selections for batches
      if (param === "batches" && (subparam === "jee" || subparam === "neet" || subparam === "all")) {
        const exam = subparam === "jee" ? "JEE" : subparam === "neet" ? "NEET" : "All";
        const { data: coupons } = await supabase
          .from("coupons")
          .select("*")
          .match({ category_id: "pw_batches", is_active: true })
          .filter("description", "ilike", `%${exam}%`)
          .limit(1)
          .single();

        if (coupons) {
          await sendMessage(
            chatId,
            `🔥 PW ${exam} Batch Coupon 🎓\n\n🏷 Code: ${coupons.code}\n💸 Discount: ${coupons.discount}\n⏳ Validity: ${coupons.validity}\n\nEnroll smart 🚀`,
            createBackButton("pw:batches")
          );
        } else {
          await sendMessage(
            chatId,
            `No ${exam} batch coupon available right now ⏳`,
            createBackButton("pw:batches")
          );
        }
      }
    }

    // Handle other institutes
    if (action === "other") {
      if (!param) {
        await sendMessage(
          chatId,
          "Choose an institute 🎓",
          createOtherInstitutesDashboard()
        );
      } else if (param === "motion" || param === "unacademy" || param === "careerwill") {
        if (!subparam) {
          await sendMessage(
            chatId,
            `Choose exam for ${param} 📚`,
            createInstituteExamDashboard(param)
          );
        } else {
          const exam = subparam === "jee" ? "JEE" : "NEET";
          const { data: coupons } = await supabase
            .from("coupons")
            .select("*")
            .match({ category_id: `${param}_${subparam}`, is_active: true })
            .limit(1)
            .single();

          if (coupons) {
            const instituteEmoji = param === "motion" ? "🚀" : param === "unacademy" ? "🔵" : "🟢";
            await sendMessage(
              chatId,
              `${instituteEmoji} ${param.toUpperCase()} ${exam} Coupon 🎓\n\n🏷 Code: ${coupons.code}\n💸 Discount: ${coupons.discount}\n⏳ Validity: ${coupons.validity}\n\nEnroll smart 🚀`,
              createBackButton(`other:${param}`)
            );
          } else {
            await sendMessage(
              chatId,
              `No ${param} ${exam} coupon available right now ⏳`,
              createBackButton(`other:${param}`)
            );
          }
        }
      }
    }

    // Handle extras/referrals
    if (action === "extras" && param === "referrals") {
      const { data: referrals } = await supabase
        .from("referrals")
        .select("*")
        .eq("is_active", true);

      if (referrals && referrals.length > 0) {
        const referralText = referrals
          .map((r) => `💸 ${r.platform}\n📱 Code: ${r.code}\n${r.description}`)
          .join("\n\n");
        await sendMessage(
          chatId,
          `💰 Referral Offers 💰\n\n${referralText}\n\nInstall, refer & earn 🔥`,
          createBackButton("menu:extras")
        );
      } else {
        await sendMessage(
          chatId,
          "No referral offers available right now ⏳",
          createBackButton("menu:extras")
        );
      }
    }

    // Handle support message
    if (action === "support" && param === "message") {
      await sendMessage(
        chatId,
        "Please type your message and we'll forward it to admin 💬",
        createBackButton("menu:support")
      );
    }
  } catch (error) {
    console.error("[v0] Callback query error:", error);
    await sendMessage(
      chatId,
      "Sorry, something went wrong. Please try again 😔",
      createMainDashboard()
    );
  }
}

export async function handleMessage(message: Message) {
  const chatId = message.chat.id;
  const text = message.text || "";
  const userId = message.from?.id || 0;

  try {
    // Log interaction
    await logUserInteraction(userId, `message:${text.substring(0, 50)}`);

    // If in support message mode, forward to admin
    if (text && text.length > 0) {
      await sendMessage(
        parseInt(ADMIN_TELEGRAM_ID),
        `📨 New message from @${message.from?.username || "unknown"}:\n\n${text}`,
        undefined
      );

      await sendMessage(
        chatId,
        "✅ Message sent to admin! We'll get back to you soon. 📞",
        createMainDashboard()
      );
    }
  } catch (error) {
    console.error("[v0] Message handler error:", error);
    await sendMessage(
      chatId,
      "Sorry, something went wrong. Please try again 😔",
      createMainDashboard()
    );
  }
}
