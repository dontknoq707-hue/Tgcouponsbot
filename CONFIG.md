# PWcoupons Configuration Guide 🎨

Complete guide to customize your PWcoupons bot.

## Admin Dashboard Configuration

### Login to Admin

- URL: `https://pwcoupons.vercel.app/admin`
- Username: `admin`
- Password: `admin123` (Change this!)

### 1. Settings Tab ⚙️

#### Greeting Message
Custom message shown when user sends `/start`

Default:
```
Hello {name} 👋✨
Welcome to your discounted education journey 🎓💸
Choose what you're looking for today 👇
```

Change by editing the `greeting_message` field.

#### Admin Username
Your Telegram username for support (without @)

Example: `yourname_bot`

Users can click "💬 Contact Admin" to reach you.

#### Support Mode
- **Direct Contact**: Users can contact you via Telegram
- **Message Forwarding**: Messages are forwarded to your admin ID

#### Bot Status
Toggle `is_active` to enable/disable the bot

---

## 2. Categories Tab 📚

### Add New Category

1. Click "Add Category"
2. Fill fields:
   - **Name**: Category name (e.g., "JEE Batch")
   - **Emoji**: Visual icon (e.g., 🎓)
   - **Parent Category**: Leave empty for main menu, select parent for subcategories
   - **Sort Order**: Position in menu (0 = first, 1 = second, etc.)
   - **Active**: Enable/disable category

3. Click Save

### Example Category Structure

```
🎓 Physics Wallah (Parent)
├── 📘 Batches
│   ├── 🧠 JEE
│   └── 🩺 NEET
├── 🧪 Test Series
│   ├── 🧪 RTS
│   └── 📊 Online
├── 🛍 Store
├── 🏫 Offline
│   ├── 🏫 Vidyapeeth
│   └── 🏫 Pathshala
└── ⚡ Power Batch

🏫 Other Institutes (Parent)
├── 🚀 Motion
│   ├── 🧠 JEE
│   └── 🩺 NEET
├── 🔵 Unacademy
│   ├── 🧠 JEE
│   └── 🩺 NEET
└── 🟢 Careerwill
   ├── 🧠 JEE
   └── 🩺 NEET
```

### Recommended Emojis

- **Institutes**: 🎓 🏫 🚀 🔵 🟢
- **Exams**: 🧠 🩺 📖
- **Products**: 📘 🧪 🛍 ⚡
- **Locations**: 🏙 🌆
- **Actions**: 📲 💬 📞

---

## 3. Coupons Tab 🎟️

### Add New Coupon

1. Click "Add Coupon"
2. Fill fields:
   - **Category**: Select from dropdown (must exist first!)
   - **Code**: The coupon code (e.g., `PWJEE20`)
   - **Discount**: Discount info (e.g., `20%`, `₹500 off`)
   - **Validity**: When it expires (e.g., `31 Dec 2025`)
   - **Description**: Optional extra details
   - **Active**: Enable/disable coupon

3. Click Save

### Coupon Display Format

When user selects a coupon, they see:

```
🔥 Category Name Coupon 🎓
🏷 Code: PWJEE20
💸 Discount: 20%
⏳ Validity: 31 Dec 2025

Enroll smart 🚀
```

### Best Practices

- **Code**: Use clear, memorable codes (no spaces)
- **Discount**: Be specific: `20%`, `₹1000 off`, `3-month access`
- **Validity**: Always include expiry date
- **Keep Updated**: Deactivate expired coupons
- **Track Popular**: Check analytics for most viewed coupons

---

## 4. Referrals Tab 💰

### Add Referral Offer

1. Click "Add Referral"
2. Fill fields:
   - **Platform**: App name (e.g., `PhonePe`, `Paytm`)
   - **Code**: Referral code (e.g., `SUMIT123`)
   - **Link**: Direct referral link (optional)
   - **Description**: How to use (e.g., `Install app, refer & earn ₹100+`)
   - **Active**: Enable/disable

3. Click Save

### Example Referrals

```
💸 Earn ₹100+ via Referral
📱 App: PhonePe
🔗 Code: SUMIT123
Install, refer & earn 🔥
```

### Referral Tips

- Partner with apps users actually use
- Offer generous commissions (₹100+)
- Update codes when they change
- Test codes before adding

---

## 5. Analytics Tab 📊

### View Statistics

- **Total Coupons**: All coupons in system
- **Active Coupons**: Currently enabled
- **Total Users**: Unique Telegram users
- **Today's Interactions**: Actions taken today

### Track What Users Like

- Most viewed categories
- Popular coupons
- Peak usage times
- Conversion rates

---

## Advanced Customization

### Change Default Admin Password

**Security First!** Change `admin123` immediately.

**Option 1: Simple (Current Setup)**
- Update in code before deployment
- Edit `/app/api/admin/login/route.ts`
- Change `"admin123"` string

**Option 2: Hashed Password (Recommended)**
- Use Supabase SQL:
```sql
UPDATE admin_users 
SET password_hash = crypt('your_new_password', gen_salt('bf')) 
WHERE username = 'admin';
```

Then update login API to use `crypt()` for verification.

### Add Multiple Admin Users

In Supabase SQL:
```sql
INSERT INTO admin_users (username, telegram_id, is_active)
VALUES ('admin2', 123456789, true);
```

### Customize Emoji Reactions

Edit `/lib/telegram/handlers.ts`:
```typescript
// Change from 👍 to other emojis
await setReaction(chatId, message.message_id, "🔥");
```

Available emojis: 👍 🎉 🔥 ❤️ 😍 🎓 ✨

### Change Bot Commands

Edit keyboard builders in `/lib/telegram/keyboards.ts`:
```typescript
export function createMainDashboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🎓 Physics Wallah (PW)", callback_data: "menu:pw" }],
      // Add more buttons here
    ],
  };
}
```

---

## Environment Variables

### Required

```
BOT_TOKEN=your_telegram_bot_token
ADMIN_TELEGRAM_ID=your_user_id
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Optional (Future)

```
# Coming Soon
STRIPE_PUBLIC_KEY=pk_test_xxx
REDIS_URL=redis://xxx
SENDGRID_API_KEY=SG.xxx
```

---

## Branding

### Update Bot Name

In Telegram, message @BotFather:
```
/setname

Select your bot → enter new name
```

### Update Bot Description

```
/setdescription

Select your bot → enter description
```

Example:
```
Get verified discount codes for educational platforms:
Physics Wallah, Motion, Unacademy, Careerwill & more

🎓 Exclusive Student Discounts
💰 Referral Rewards
📲 Easy Navigation
```

### Update Bot Commands

```
/setcommands

Select your bot → add commands
```

Example:
```
start - Get coupon codes
help - Get help
menu - Show main menu
```

---

## Monitoring & Analytics

### Check Bot Activity

Admin Dashboard → Analytics Tab:
- View daily/weekly user trends
- Most popular categories
- Coupon redemption rates
- User retention

### Monitor Errors

Vercel Dashboard → Logs:
```
https://vercel.com/dashboard/your-project/logs
```

Look for `[v0]` tagged errors.

### Database Queries

Supabase Dashboard → SQL Editor:

Get top coupons:
```sql
SELECT code, discount, COUNT(*) as views
FROM user_interactions
WHERE action LIKE 'coupon:%'
GROUP BY code
ORDER BY views DESC
LIMIT 10;
```

Get active users:
```sql
SELECT DISTINCT telegram_id, COUNT(*) as interactions
FROM user_interactions
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY telegram_id
ORDER BY interactions DESC;
```

---

## Troubleshooting Configuration

### Settings not saving?
- Check if admin is logged in
- Verify `is_active` is true in admin_users

### Categories not showing in dropdown?
- Must have `is_active = true`
- Check `sort_order` field

### Coupons not displaying?
- Verify category exists and is active
- Check `is_active = true` for coupon
- Ensure code and discount are filled

### Webhook issues?
- Re-register: `https://api.telegram.org/botTOKEN/setWebhook?url=...`
- Check error: `https://api.telegram.org/botTOKEN/getWebhookInfo`

---

## Best Practices 💡

1. **Update Regularly**: Add new coupons weekly
2. **Remove Expired**: Deactivate old coupons
3. **Test Changes**: Use test bot account
4. **Backup Data**: Export coupons monthly
5. **Security**: Change passwords, use HTTPS
6. **Engagement**: Add seasonal offers
7. **Feedback**: Check user interactions
8. **Analytics**: Review stats weekly

---

**For more help, see [README.md](./README.md) and [DEPLOYMENT.md](./DEPLOYMENT.md)**
