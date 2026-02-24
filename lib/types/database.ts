export interface Category {
  id: string;
  name: string;
  emoji: string;
  parent_id: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface Coupon {
  id: string;
  category_id: string;
  code: string;
  discount: string;
  description: string;
  validity: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  name: string;
  emoji: string;
  app_name: string;
  referral_code: string;
  instructions: string;
  link: string | null;
  is_active: boolean;
  created_at: string;
}

export interface BotSettings {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface UserInteraction {
  id: string;
  telegram_id: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  action: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

// Telegram API Types
export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface TelegramChat {
  id: number;
  type: string;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
}

export interface TelegramCallbackQuery {
  id: string;
  from: TelegramUser;
  message?: TelegramMessage;
  chat_instance: string;
  data?: string;
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
}

export interface InlineKeyboardButton {
  text: string;
  callback_data?: string;
  url?: string;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}
