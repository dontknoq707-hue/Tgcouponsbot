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
  createBackButton,
} from "@/lib/telegram/keyboards";

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_TELEGRAM_ID;

// ==================== START COMMAND ====================
export async function handleStartCommand(message: any) {
  const chatId = message.chat.id;
  const firstName = message.from?.first_name || "User";

  // React with emoji

  // Send welcome message with bold formatting
  const welcomeText = `<b>Hello ${firstName} 👋✨</b>

<b>Welcome to PW Coupons Bot 🎓💸</b>

Your discounted education journey starts here! Choose what you're looking for 👇`;

  await sendMessageWithMode(
    chatId,
    welcomeText,
    createMainKeyboard(),
    "HTML"
  );

  // Log interaction
  try {
    const supabase = await createClient();
    await supabase.from("user_interactions").insert({
      user_id: message.from?.id,
      action: "start_command",
      data: { first_name: firstName },
    });
  } catch (error) {
    console.error("[v0] Failed to log interaction:", error);
  }
}

// ==================== HANDLE MESSAGE TEXT (Reply Keyboard Buttons) ====================
export async function handleMessage(message: any) {
  const chatId = message.chat.id;
  const text = message.text?.trim() || "";

  console.log("[v0] Message received:", text);

  // ===== MAIN MENU BUTTONS =====
  if (text === "🎓 Physics Wallah (PW)") {
    await handlePWMenu(chatId, message.message_id);
  } else if (text === "🏫 Other Institutes") {
    await handleOtherInstitutesMenu(chatId, message.message_id);
  } else if (text === "🎁 Extras") {
    await handleExtrasMenu(chatId, message.message_id);
  } else if (text === "🛠 Support") {
    await handleSupportMenu(chatId, message.message_id);
  }
  // ===== PW SUB-MENU BUTTONS (Reply Keyboard) =====
  else if (text === "📘 Batches") {
    await handleBatches(chatId, message.message_id);
  } else if (text === "🧪 Test Series") {
    await handleTestSeries(chatId, message.message_id);
  } else if (text === "🛍 Store") {
    await handleStore(chatId, message.message_id);
  } else if (text === "🏫 Offline") {
    await handleOffline(chatId, message.message_id);
  } else if (text === "⚡ Power Batch") {
    await handlePowerBatch(chatId, message.message_id);
  }
  // ===== BACK BUTTON =====
  else if (text === "🔙 Back") {
    const welcomeText = `<b>Welcome Back! 👋</b>

<b>PW Coupons Bot 🎓💸</b>

Choose what you're looking for 👇`;

    await sendMessageWithMode(
      chatId,
      welcomeText,
      createMainKeyboard(),
      "HTML"
    );
  } else {
    // Unknown command
    await sendMessageWithMode(
      chatId,
      `<b>Sorry! 😕</b>\n\nI didn't understand that command.\n\nUse the buttons below to navigate.`,
      createMainKeyboard(),
      "HTML"
    );
  }
}

// ==================== PW MENU ====================
async function handlePWMenu(chatId: number, messageId: number) {
  const text = `<b>Physics Wallah Categories 🎓🔥</b>

Choose a category below to see coupons 👇`;

  await sendMessageWithMode(
    chatId,
    text,
    createPWKeyboardWithReplyButtons(),
    "HTML"
  );
}

function createPWKeyboardWithReplyButtons(): any {
  return {
    keyboard: [
      [{ text: "📘 Batches" }, { text: "🧪 Test Series" }],
      [{ text: "🛍 Store" }, { text: "🏫 Offline" }],
      [{ text: "⚡ Power Batch" }],
      [{ text: "🔙 Back" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

// ==================== BATCHES ====================
async function handleBatches(chatId: number, messageId: number) {
  const text = `<b>PW Batches 📘</b>

Select your exam category to see available batches 👇`;

  await sendMessageWithMode(
    chatId,
    text,
    createBatchesKeyboardWithReplyButtons(),
    "HTML"
  );
}

function createBatchesKeyboardWithReplyButtons(): any {
  return {
    keyboard: [
      [{ text: "🧠 JEE" }, { text: "🩺 NEET" }],
      [{ text: "📖 All Exams" }],
      [{ text: "🔙 Back" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

// Handle JEE Batches
async function handleJEEBatches(chatId: number) {
  const text = `<b>🔥 PW JEE Batch Coupon 🎓</b>

<code>PWJEE2025</code>

<b>Details:</b>
💸 <b>Discount:</b> 20%
⏳ <b>Validity:</b> Limited Time
📚 <b>Batch:</b> JEE Foundation + Advanced

Enroll smart 🚀`;

  await sendMessageWithMode(
    chatId,
    text,
    createBackButton("back"),
    "HTML"
  );
}

// ==================== TEST SERIES ====================
async function handleTestSeries(chatId: number, messageId: number) {
  const text = `<b>Test Series 🧪</b>

Choose your test series provider 👇`;

  await sendMessageWithMode(
    chatId,
    text,
    createTestSeriesKeyboardWithReply(),
    "HTML"
  );
}

function createTestSeriesKeyboardWithReply(): any {
  return {
    keyboard: [
      [{ text: "🧠 JEE" }, { text: "🩺 NEET" }],
      [{ text: "🔙 Back" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

// ==================== STORE ====================
async function handleStore(chatId: number, messageId: number) {
  const text = `<b>PW Store 🛍</b>

<b>Store Coupon Available! 🎉</b>

<code>PWSTORE2025</code>

<b>Details:</b>
💸 <b>Discount:</b> 15% OFF
⏳ <b>Validity:</b> Ongoing
📦 <b>Includes:</b> All study materials & books

Shop now 🛒`;

  await sendMessageWithMode(
    chatId,
    text,
    createBackButton("back"),
    "HTML"
  );
}

// ==================== OFFLINE ====================
async function handleOffline(chatId: number, messageId: number) {
  const text = `<b>PW Offline Centers 🏫</b>

Choose your offline center location 👇`;

  await sendMessageWithMode(
    chatId,
    text,
    createOfflineKeyboardWithReply(),
    "HTML"
  );
}

function createOfflineKeyboardWithReply(): any {
  return {
    keyboard: [
      [{ text: "🏫 Vidyapeeth" }, { text: "🏫 Pathshala" }],
      [{ text: "🔙 Back" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

// ==================== POWER BATCH ====================
async function handlePowerBatch(chatId: number, messageId: number) {
  const text = `<b>⚡ PW Power Batch</b>

<b>Premium Batch Coupon! 🏆</b>

<code>PWPOWER2025</code>

<b>Details:</b>
💸 <b>Discount:</b> 25% OFF
⏳ <b>Validity:</b> Limited Time
🎯 <b>Includes:</b> 1-on-1 mentorship + crash course

Enroll in power batch 🚀`;

  await sendMessageWithMode(
    chatId,
    text,
    createBackButton("back"),
    "HTML"
  );
}

// ==================== OTHER INSTITUTES ====================
async function handleOtherInstitutesMenu(chatId: number, messageId: number) {
  const text = `<b>Other Educational Institutes 🏫</b>

Choose an institute to see available coupons 👇`;

  await sendMessageWithMode(
    chatId,
    text,
    createOtherInstitutesKeyboardWithReply(),
    "HTML"
  );
}

function createOtherInstitutesKeyboardWithReply(): any {
  return {
    keyboard: [
      [{ text: "🚀 Motion" }, { text: "🔵 Unacademy" }],
      [{ text: "🟢 Careerwill" }],
      [{ text: "🔙 Back" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

// Handle Motion
async function handleMotion(chatId: number) {
  const text = `<b>🚀 Motion Institute Coupons</b>

Choose exam category 👇`;

  await sendMessageWithMode(
    chatId,
    text,
    createInstituteExamKeyboardWithReply("Motion"),
    "HTML"
  );
}

function createInstituteExamKeyboardWithReply(institute: string): any {
  return {
    keyboard: [
      [{ text: "🧠 JEE" }, { text: "🩺 NEET" }],
      [{ text: "🔙 Back" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

// ==================== EXTRAS (REFERRALS) ====================
async function handleExtrasMenu(chatId: number, messageId: number) {
  const text = `<b>Earn Rewards & Offers 💰🎁</b>

Get exclusive referral bonuses and earn rewards! 👇`;

  await sendMessageWithMode(
    chatId,
    text,
    createExtrasKeyboardWithReply(),
    "HTML"
  );
}

function createExtrasKeyboardWithReply(): any {
  return {
    keyboard: [
      [{ text: "📲 Referral Offers" }],
      [{ text: "🔙 Back" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

// Handle Referral Offers
async function handleReferralOffers(chatId: number) {
  const text = `<b>💸 Earn ₹100+ via Referral</b>

<b>Available Apps:</b>

📱 <b>PhonePe</b>
🔗 Code: <code>SUMIT123</code>
Install, refer & earn 🔥

📱 <b>Paytm</b>
🔗 Code: <code>PAYTM456</code>
Share your referral link 💸`;

  await sendMessageWithMode(
    chatId,
    text,
    createBackButton("back"),
    "HTML"
  );
}

// ==================== SUPPORT ====================
async function handleSupportMenu(chatId: number, messageId: number) {
  const text = `<b>Need Help? 🤝💬</b>

Contact our admin team for support 👇`;

  await sendMessageWithMode(
    chatId,
    text,
    createSupportKeyboardWithReply(),
    "HTML"
  );
}

function createSupportKeyboardWithReply(): any {
  return {
    keyboard: [
      [{ text: "📧 Contact Admin" }],
      [{ text: "🔙 Back" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

// ==================== CALLBACK QUERY HANDLER ====================
export async function handleCallbackQuery(callbackQuery: any) {
  const chatId = callbackQuery.message?.chat.id;
  const messageId = callbackQuery.message?.message_id;
  const data = callbackQuery.data;

  if (!chatId || !messageId) return;

  console.log("[v0] Callback query:", data);

  // Route to appropriate handler based on callback data
  if (data?.startsWith("pw:exam:")) {
    const exam = data.split(":")[2];
    await handleExamCoupon(chatId, exam, "PW");
  } else if (data?.startsWith("institute:")) {
    const parts = data.split(":");
    const institute = parts[1];
    const exam = parts[2];
    await handleExamCoupon(chatId, exam, institute);
  } else if (data === "menu:main") {
    const welcomeText = `<b>Welcome Back! 👋</b>

<b>PW Coupons Bot 🎓💸</b>

Choose what you're looking for 👇`;

    await sendMessageWithMode(
      chatId,
      welcomeText,
      createMainKeyboard(),
      "HTML"
    );
  } else if (data === "menu:pw") {
    const text = `<b>Physics Wallah Categories 🎓🔥</b>

Choose a category 👇`;

    await sendMessageWithMode(
      chatId,
      text,
      createPWKeyboardWithReplyButtons(),
      "HTML"
    );
  }
}

// Handle exam-specific coupons
async function handleExamCoupon(chatId: number, exam: string, institute: string) {
  let text = "";

  if (institute === "PW") {
    if (exam === "JEE") {
      text = `<b>🔥 ${institute} ${exam} Batch Coupon 🎓</b>

<code>PWJEE2025</code>

<b>Details:</b>
💸 <b>Discount:</b> 20%
⏳ <b>Validity:</b> Limited Time
📚 <b>Batch:</b> Foundation + Advanced

Enroll smart 🚀`;
    } else if (exam === "NEET") {
      text = `<b>🔥 ${institute} ${exam} Batch Coupon 🎓</b>

<code>PWNEET2025</code>

<b>Details:</b>
💸 <b>Discount:</b> 20%
⏳ <b>Validity:</b> Limited Time
📚 <b>Batch:</b> Medical + Foundation

Enroll smart 🚀`;
    }
  } else if (institute === "Motion") {
    if (exam === "JEE") {
      text = `<b>🚀 Motion ${exam} Coupon</b>

<code>MOTIONJEE2025</code>

<b>Details:</b>
💸 <b>Discount:</b> 18%
⏳ <b>Validity:</b> Limited Time

Enroll now 🎯`;
    }
  }

  if (text) {
    await sendMessageWithMode(
      chatId,
      text,
      createBackButton("menu:main"),
      "HTML"
    );
  }
}
