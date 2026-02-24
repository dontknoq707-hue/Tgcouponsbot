# PWcoupons Deployment Guide 🚀

Complete step-by-step guide to deploy PWcoupons bot to production.

## Phase 1: Create Telegram Bot 🤖

### Step 1: Create Bot via BotFather

1. Open Telegram and find [@BotFather](https://t.me/BotFather)
2. Send `/start` command
3. Send `/newbot`
4. Follow prompts:
   - Enter bot name: `PWcoupons` (or your choice)
   - Enter bot username: `PWcoupons_Bot` (must end with `_Bot`)
5. **Copy and save the BOT_TOKEN** - You'll need this

### Step 2: Get Your Telegram User ID

1. Open Telegram and find [@userinfobot](https://t.me/userinfobot)
2. Send any message
3. Bot replies with your user ID - **save this as ADMIN_TELEGRAM_ID**

## Phase 2: Setup Supabase Database 🗄

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose a region (closest to you)
4. Set a strong password
5. Create project (wait 2-3 minutes)

### Step 2: Get Supabase Credentials

In Supabase Dashboard:
1. Go to **Settings → API**
2. Copy:
   - `Project URL` → Save as `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → Save as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Create Database Tables

The schema is created automatically when the app runs. But you can verify:

1. Go to **SQL Editor** in Supabase
2. You should see these tables:
   - `categories`
   - `coupons`
   - `referrals`
   - `bot_settings`
   - `user_interactions`
   - `admin_users`

## Phase 3: Deploy to Vercel 🔴

### Step 1: Push Code to GitHub

```bash
# If not already a git repo
git init

# Add files
git add .

# Commit
git commit -m "Initial PWcoupons bot setup"

# Push to GitHub
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Vercel auto-detects Next.js
5. Click "Deploy"

### Step 3: Add Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

Add these variables:

```
BOT_TOKEN = your_bot_token_from_step_1
ADMIN_TELEGRAM_ID = your_user_id_from_step_2
NEXT_PUBLIC_SUPABASE_URL = url_from_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY = key_from_supabase
```

Click "Save" and redeploy.

### Step 4: Verify Deployment

1. Visit https://pwcoupons.vercel.app
2. Should see "PW Coupons Bot is Live 🎓"
3. Check API health: https://pwcoupons.vercel.app/api/health
4. Should return: `{"status":"alive"}`

## Phase 4: Connect Telegram Webhook ⚡

This is the crucial step that makes the bot work!

### Step 1: Register Webhook

Open this URL in browser (replace `YOUR_BOT_TOKEN`):

```
https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://pwcoupons.vercel.app/api/telegram/webhook
```

Example:
```
https://api.telegram.org/bot123456789:ABCdefGHIjklmnoPQRstuvWXYZabcdefgh/setWebhook?url=https://pwcoupons.vercel.app/api/telegram/webhook
```

### Step 2: Verify Webhook Setup

Open this URL:
```
https://api.telegram.org/botYOUR_BOT_TOKEN/getWebhookInfo
```

You should see:
```json
{
  "ok": true,
  "result": {
    "url": "https://pwcoupons.vercel.app/api/telegram/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

## Phase 5: Test Your Bot 🧪

### Step 1: Start Bot in Telegram

Search for your bot username (e.g., `@PWcoupons_Bot`) and send `/start`

Bot should reply with:
```
Hello [Your Name] 👋✨
Welcome to your discounted education journey 🎓💸
Choose what you're looking for today 👇
```

### Step 2: Test Navigation

- Click "🎓 Physics Wallah (PW)"
- Click "📘 Batches"
- Click "🧠 JEE"
- Should see a coupon code

### Step 3: Access Admin Dashboard

1. Visit https://pwcoupons.vercel.app/admin
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. You should see the admin dashboard with stats

## Phase 6: Customize Your Bot 🎨

### Update Greeting Message

1. Admin Dashboard → Settings tab
2. Change "Greeting Message" to your custom text
3. Save

### Add Your Coupons

1. Admin Dashboard → Coupons tab
2. Click "Add Coupon"
3. Fill in:
   - Category (select from dropdown)
   - Code (e.g., `PWJEE20`)
   - Discount (e.g., `20%`)
   - Validity (e.g., `Limited Time`)
4. Click "Save"

### Add Categories

1. Admin Dashboard → Categories tab
2. Click "Add Category"
3. Enter name, emoji, sort order
4. Click "Save"

### Change Admin Password

Security tip: Change default password!

1. Go to Supabase Dashboard
2. SQL Editor
3. Run:
```sql
UPDATE admin_users SET password_hash = crypt('your_new_password', gen_salt('bf')) WHERE username = 'admin';
```
(Note: This requires bcrypt setup - for now, use the simple password method and update in code later)

## Phase 7: Monitoring & Maintenance 📊

### Check Bot Health

Periodically visit:
```
https://pwcoupons.vercel.app/api/health
```

### View Admin Stats

Login to Admin Dashboard and check:
- Total Coupons
- Active Coupons
- Total Users
- Today's Interactions

### Check Vercel Logs

1. Vercel Dashboard → Project → Deployments
2. Click latest deployment
3. View logs for any errors

## Troubleshooting 🐛

### Bot not responding to /start

**Problem**: Webhook not registered
**Solution**: 
- Re-run the webhook URL setup
- Check if Vercel deployment is successful
- Verify BOT_TOKEN is correct

### Admin login fails

**Problem**: Can't access dashboard
**Solution**:
- Clear browser cookies
- Check if admin_users table exists in Supabase
- Verify username is "admin"

### Coupons not showing

**Problem**: Categories and coupons not visible
**Solution**:
- Verify database migration ran
- Check Supabase SQL Editor for tables
- Ensure categories exist before adding coupons

### Webhook URL shows error

**Problem**: setWebhook returns error
**Solution**:
```
https://api.telegram.org/botYOUR_TOKEN/deleteWebhook
```
Then register again.

## Scaling Tips 📈

### If bot gets popular:

1. **Database**: Supabase handles scaling automatically
2. **Rate Limiting**: Add in `/api/telegram/webhook` for high traffic
3. **Caching**: Use Redis for frequently accessed data
4. **Analytics**: Export data periodically

## Next Steps 🎯

After successful deployment:

1. ✅ Share bot link with students: `https://t.me/YourBotUsername`
2. ✅ Market the bot on social media
3. ✅ Gather feedback and improve UX
4. ✅ Add more institutes and courses
5. ✅ Set up email notifications for deals

## Support & Resources 📚

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)

---

**Your bot is now live! 🎉**
