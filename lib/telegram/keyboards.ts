import type { InlineKeyboardMarkup } from "@/lib/types/database";

// Main keyboard - uses reply keyboard (buttons below input)
export function createMainKeyboard(): any {
  return {
    keyboard: [
      [{ text: "🎓 Physics Wallah (PW)" }],
      [{ text: "🏫 Other Institutes" }],
      [{ text: "🎁 Extras" }],
      [{ text: "🛠 Support" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

// PW Category keyboard - inline buttons
export function createPWKeyboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "📘 Batches", callback_data: "pw:batches" }],
      [{ text: "🧪 Test Series", callback_data: "pw:test_series" }],
      [{ text: "🛍 Store", callback_data: "pw:store" }],
      [{ text: "🏫 Offline", callback_data: "pw:offline" }],
      [{ text: "⚡ Power Batch", callback_data: "pw:power_batch" }],
      [{ text: "🔙 Back", callback_data: "menu:main" }],
    ],
  };
}

// Batches keyboard
export function createBatchesKeyboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🧠 JEE", callback_data: "pw:exam:JEE" }],
      [{ text: "🩺 NEET", callback_data: "pw:exam:NEET" }],
      [{ text: "📖 All Exams", callback_data: "pw:exam:All" }],
      [{ text: "🔙 Back", callback_data: "menu:pw" }],
    ],
  };
}

// Exam selection keyboard
export function createExamKeyboard(type: string): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🧠 JEE", callback_data: `pw:exam:JEE` }],
      [{ text: "🩺 NEET", callback_data: `pw:exam:NEET` }],
      [{ text: "📖 All Exams", callback_data: `pw:exam:All` }],
      [{ text: "🔙 Back", callback_data: "menu:pw" }],
    ],
  };
}

// Test Series keyboard - dynamic from database
export function createTestSeriesKeyboard(testSeries: any[]): InlineKeyboardMarkup {
  const buttons = testSeries.map((ts) => [
    {
      text: `${ts.emoji} ${ts.name}`,
      callback_data: `pw:test_exam:${ts.name}`,
    },
  ]);

  return {
    inline_keyboard: [
      ...buttons,
      [{ text: "🔙 Back", callback_data: "menu:pw" }],
    ],
  };
}

// Institute keyboard - dynamic from database
export function createInstituteKeyboard(institutes: any[]): InlineKeyboardMarkup {
  const buttons = institutes.map((inst) => [
    {
      text: `${inst.emoji} ${inst.name}`,
      callback_data: `institute_select:${inst.id}`,
    },
  ]);

  return {
    inline_keyboard: [
      ...buttons,
      [{ text: "🔙 Back", callback_data: "menu:main" }],
    ],
  };
}

// Institute exam selection
export function createInstituteExamKeyboard(
  instituteName: string
): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🧠 JEE", callback_data: `institute:${instituteName}:JEE` }],
      [{ text: "🩺 NEET", callback_data: `institute:${instituteName}:NEET` }],
      [{ text: "🔙 Back", callback_data: "menu:other" }],
    ],
  };
}

// Extras keyboard - show referral
export function createExtrasKeyboard(referralCode: string): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        {
          text: "📲 Referral Offers",
          callback_data: `referral:show`,
        },
      ],
      [{ text: "🔙 Back", callback_data: "menu:main" }],
    ],
  };
}

// Support keyboard - contact admin
export function createSupportKeyboard(mode: string): InlineKeyboardMarkup {
  if (mode === "direct_message") {
    return {
      inline_keyboard: [
        [
          {
            text: "📧 Send Message to Admin",
            callback_data: "support:message",
          },
        ],
        [{ text: "🔙 Back", callback_data: "menu:main" }],
      ],
    };
  }

  return {
    inline_keyboard: [
      [{ text: "🔙 Back", callback_data: "menu:main" }],
    ],
  };
}

// Back button (inline)
export function createBackButton(
  callback: string = "menu:main"
): InlineKeyboardMarkup {
  return {
    inline_keyboard: [[{ text: "🔙 Back", callback_data: callback }]],
  };
}

// Deprecated functions kept for backward compatibility
export function createMainDashboard(): InlineKeyboardMarkup {
  return createPWKeyboard(); // Fallback
}

export function createPWDashboard(): InlineKeyboardMarkup {
  return createPWKeyboard();
}

export function createTestSeriesDashboard(): InlineKeyboardMarkup {
  return createTestSeriesKeyboard([]);
}

export function createOfflineDashboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🔙 Back", callback_data: "menu:pw" }],
    ],
  };
}

export function createOtherInstitutesDashboard(): InlineKeyboardMarkup {
  return createInstituteKeyboard([]);
}

export function createExtrasDashboard(): InlineKeyboardMarkup {
  return createExtrasKeyboard("");
}

export function createSupportDashboard(adminUsername?: string | null): InlineKeyboardMarkup {
  return createSupportKeyboard(adminUsername ? "username" : "direct_message");
}
