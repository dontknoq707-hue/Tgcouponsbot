# PWcoupons Quick Start 🚀

## 3-Minute Setup

### 1. Get Your Credentials

**Telegram Bot Token:**
- Go to [@BotFather](https://t.me/BotFather) on Telegram
- Send `/newbot`
- Follow prompts, save the token

**Your Telegram ID:**
- Go to [@userinfobot](https://t.me/userinfobot)
- Send any message, save your user ID

**Supabase:**
- Create account at [supabase.com](https://supabase.com)
- Create new project
- Go to Settings → API
- Copy Project URL and anon key

### 2. Add Environment Variables to Vercel

In Vercel project settings, add:
```
BOT_TOKEN=your_token_here
ADMIN_TELEGRAM_ID=your_id_here
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### 3. Redeploy

Vercel automatically redeploys when you add env vars.

### 4. Connect Webhook

Open this URL (replace YOUR_BOT_TOKEN):
```
https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://pwcoupons.vercel.app/api/telegram/webhook
```

### 5. Test Your Bot

Search for your bot on Telegram and send `/start`

You should see the main menu!

## Admin Dashboard

- URL: `https://pwcoupons.vercel.app/admin`
- Username: `admin`
- Password: `admin123`

## Add Your First Coupon

1. Login to Admin Dashboard
2. Go to Coupons tab
3. Click "Add Coupon"
4. Fill in:
   - Category: Physics Wallah > Batches
   - Code: PWJEE20
   - Discount: 20%
   - Validity: Limited Time
5. Click Save
6. Test in Telegram!

## Common Issues

**Bot not responding?**
- Check webhook URL: `https://api.telegram.org/botYOUR_TOKEN/getWebhookInfo`

**Admin login fails?**
- Clear cookies
- Check Supabase has admin_users table

**Coupons not showing?**
- Make sure category exists first
- Check `is_active` is true

## Next Steps

1. ✅ Add more coupons
2. ✅ Create more categories
3. ✅ Set custom greeting
4. ✅ Add referral offers
5. ✅ Share bot link with students

---

**Full docs:** See [README.md](./README.md) and [DEPLOYMENT.md](./DEPLOYMENT.md)
