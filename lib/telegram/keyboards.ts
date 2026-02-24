import type { InlineKeyboardMarkup, InlineKeyboardButton, Category } from "@/lib/types/database";

export function createMainDashboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🎓 Physics Wallah (PW)", callback_data: "menu:pw" }],
      [{ text: "🏫 Other Institutes", callback_data: "menu:other" }],
      [{ text: "🎁 Extras", callback_data: "menu:extras" }],
      [{ text: "🛠 Support", callback_data: "menu:support" }],
    ],
  };
}

export function createPWDashboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "📘 Batches", callback_data: "pw:batches" }],
      [{ text: "🧪 Test Series", callback_data: "pw:testseries" }],
      [{ text: "🛍 Store", callback_data: "pw:store" }],
      [{ text: "🏫 Offline", callback_data: "pw:offline" }],
      [{ text: "⚡ Power Batch", callback_data: "pw:powerbatch" }],
      [{ text: "🔙 Back", callback_data: "menu:main" }],
    ],
  };
}

export function createExamDashboard(parentCallback: string): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🧠 JEE", callback_data: `${parentCallback}:jee` }],
      [{ text: "🩺 NEET", callback_data: `${parentCallback}:neet` }],
      [{ text: "📖 All Exams", callback_data: `${parentCallback}:all` }],
      [{ text: "🔙 Back", callback_data: parentCallback.split(":")[0] === "pw" ? "menu:pw" : `menu:${parentCallback.split(":")[0]}` }],
    ],
  };
}

export function createTestSeriesDashboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🧪 PW RTS (Real Test Series)", callback_data: "pw:testseries:rts" }],
      [{ text: "📊 Mathongo / Quizzr (Online)", callback_data: "pw:testseries:online" }],
      [{ text: "🔙 Back", callback_data: "menu:pw" }],
    ],
  };
}

export function createOfflineDashboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🏫 Vidyapeeth", callback_data: "pw:offline:vidyapeeth" }],
      [{ text: "🏫 Pathshala", callback_data: "pw:offline:pathshala" }],
      [{ text: "🔙 Back", callback_data: "menu:pw" }],
    ],
  };
}

export function createOtherInstitutesDashboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🚀 Motion", callback_data: "other:motion" }],
      [{ text: "🔵 Unacademy", callback_data: "other:unacademy" }],
      [{ text: "🟢 Careerwill", callback_data: "other:careerwill" }],
      [{ text: "🔙 Back", callback_data: "menu:main" }],
    ],
  };
}

export function createInstituteExamDashboard(institute: string): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🧠 JEE", callback_data: `other:${institute}:jee` }],
      [{ text: "🩺 NEET", callback_data: `other:${institute}:neet` }],
      [{ text: "🔙 Back", callback_data: "menu:other" }],
    ],
  };
}

export function createExtrasDashboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "📲 Referral Offers", callback_data: "extras:referrals" }],
      [{ text: "🔙 Back", callback_data: "menu:main" }],
    ],
  };
}

export function createSupportDashboard(adminUsername: string | null): InlineKeyboardMarkup {
  const keyboard: InlineKeyboardButton[][] = [];
  
  if (adminUsername) {
    keyboard.push([{ text: "💬 Contact Admin", url: `https://t.me/${adminUsername}` }]);
  }
  keyboard.push([{ text: "📝 Send Message to Admin", callback_data: "support:message" }]);
  keyboard.push([{ text: "🔙 Back", callback_data: "menu:main" }]);
  
  return { inline_keyboard: keyboard };
}

export function createBackButton(callback: string): InlineKeyboardMarkup {
  return {
    inline_keyboard: [[{ text: "🔙 Back", callback_data: callback }]],
  };
}

export function createDynamicCategoryKeyboard(
  categories: Category[],
  backCallback: string
): InlineKeyboardMarkup {
  const buttons: InlineKeyboardButton[][] = categories.map((cat) => [
    { text: `${cat.emoji} ${cat.name}`, callback_data: `cat:${cat.id}` },
  ]);
  buttons.push([{ text: "🔙 Back", callback_data: backCallback }]);
  return { inline_keyboard: buttons };
}
