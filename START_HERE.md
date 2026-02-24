# 🎓 START HERE - PWcoupons Bot Setup

Welcome! Your PWcoupons Telegram coupon bot is ready. This file tells you exactly what to do next.

## ✨ What You Have

A complete, production-ready Telegram bot with:
- ✅ Interactive nested menus (Physics Wallah, Motion, Unacademy, etc.)
- ✅ Admin dashboard to manage coupons without coding
- ✅ Database to store all data
- ✅ Ready to deploy on Vercel (free)
- ✅ Complete documentation

## 🚀 Quick Start (15 minutes)

### Step 1: Get Your Credentials (5 min)

**Telegram Bot Token:**
1. Open Telegram
2. Find [@BotFather](https://t.me/BotFather)
3. Send `/newbot`
4. Follow prompts
5. **Save the BOT_TOKEN** you receive

**Your Telegram User ID:**
1. Find [@userinfobot](https://t.me/userinfobot)
2. Send any message
3. **Save your ADMIN_TELEGRAM_ID**

**Supabase Database:**
1. Go to [supabase.com](https://supabase.com)
2. Create account
3. Create new project
4. Go to Settings → API
5. **Copy Project URL and anon key**

### Step 2: Deploy to Vercel (5 min)

1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Connect your GitHub repo with this code
4. Click "Deploy"
5. In Project Settings → Environment Variables, add:
   ```
   BOT_TOKEN = your_bot_token
   ADMIN_TELEGRAM_ID = your_user_id
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_key
   ```
6. Redeploy

### Step 3: Connect Telegram Webhook (2 min)

Open this URL in your browser (replace YOUR_BOT_TOKEN):
```
https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://pwcoupons.vercel.app/api/telegram/webhook
```

You should see: `{"ok":true}`

### Step 4: Test Your Bot (2 min)

1. Search for your bot on Telegram
2. Send `/start`
3. Bot should reply with a menu
4. Click buttons to test navigation

### Step 5: Add Coupons (1 min)

1. Visit: `https://pwcoupons.vercel.app/admin`
2. Login: `admin` / `admin123`
3. Go to Coupons tab
4. Click "Add Coupon"
5. Fill in code, discount, validity
6. Save

Done! Your bot is live! 🎉

---

## 📖 Reading Guide

Choose based on your situation:

### I'm in a hurry! (Just deploy)
→ Read: [QUICKSTART.md](./QUICKSTART.md)
→ Time: 3-5 minutes

### I want detailed instructions
→ Read: [DEPLOYMENT.md](./DEPLOYMENT.md)
→ Time: 15-20 minutes
→ Then: [CONFIG.md](./CONFIG.md) to customize

### I want to understand everything
→ Read: [GETTING_STARTED.md](./GETTING_STARTED.md) first
→ Then: [README.md](./README.md) for features
→ Then: [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy
→ Then: [CONFIG.md](./CONFIG.md) to customize

### I'm deploying for the first time
→ Read: [GETTING_STARTED.md](./GETTING_STARTED.md)
→ Then: [DEPLOYMENT.md](./DEPLOYMENT.md) step by step
→ Use: [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) to verify

### I want to customize everything
→ Read: [CONFIG.md](./CONFIG.md)
→ You don't need to code - admin dashboard handles everything!

### I'm a developer
→ Read: [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for architecture
→ Check: `/lib/telegram/` for bot logic
→ Check: `/app/api/admin/` for API routes

---

## 🎯 The Easiest Path

If you just want to get it running ASAP:

1. **Get your 4 tokens** (the ones above)
2. **Deploy to Vercel** with those tokens
3. **Register webhook** with one URL click
4. **Login to admin** and add coupons
5. **Share bot link** with students

That's it! Everything else is optional.

---

## 📋 Document Quick Reference

| Document | What it covers | Read time |
|----------|---------------|-----------|
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Orientation & paths | 10 min |
| [QUICKSTART.md](./QUICKSTART.md) | 3-minute setup | 3 min |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Full step-by-step | 15 min |
| [CONFIG.md](./CONFIG.md) | How to customize | 15 min |
| [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) | Pre-launch testing | 20 min |
| [README.md](./README.md) | Full documentation | 20 min |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Technical details | 15 min |

---

## ⚡ Key URLs

Once deployed, you'll have these URLs:

| URL | Purpose |
|-----|---------|
| `https://pwcoupons.vercel.app/` | Homepage |
| `https://pwcoupons.vercel.app/admin` | Admin login |
| `https://pwcoupons.vercel.app/api/health` | Health check |
| `https://pwcoupons.vercel.app/api/telegram/webhook` | Telegram webhook |
| `https://t.me/YOUR_BOT_USERNAME` | Your bot link |

---

## 💬 Features at a Glance

### For Users (Students)
```
/start
  ├─ 🎓 Physics Wallah
  │  ├─ 📘 Batches → JEE/NEET codes
  │  ├─ 🧪 Test Series
  │  ├─ 🛍 Store
  │  ├─ 🏫 Offline
  │  └─ ⚡ Power Batch
  ├─ 🏫 Other Institutes
  │  ├─ 🚀 Motion
  │  ├─ 🔵 Unacademy
  │  └─ 🟢 Careerwill
  ├─ 🎁 Extras (Referrals)
  └─ 🛠 Support
```

### For You (Admin)
- Add/edit/delete coupons
- Create coupon categories
- Manage referral offers
- Configure bot messages
- View analytics
- No coding required!

---

## ✅ Before You Deploy

- [ ] You have BOT_TOKEN from @BotFather
- [ ] You have ADMIN_TELEGRAM_ID from @userinfobot
- [ ] You have Supabase URL and key
- [ ] You have a GitHub account
- [ ] You have a Vercel account (free)

Got these? → Start with [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🆘 Common Issues

### Bot not responding?
→ Check webhook registration
→ See [DEPLOYMENT.md](./DEPLOYMENT.md) Phase 4

### Can't access admin dashboard?
→ Clear browser cookies
→ Login with: `admin` / `admin123`
→ See [CONFIG.md](./CONFIG.md)

### Coupons not showing?
→ Make sure category exists first
→ Check coupon `is_active` is true
→ See [CONFIG.md](./CONFIG.md) Section 3

### Deployment failed?
→ Check all 4 environment variables are set
→ Review Vercel build logs
→ See [DEPLOYMENT.md](./DEPLOYMENT.md) Phase 3

### Database errors?
→ Verify Supabase credentials
→ Check tables exist in Supabase
→ See [README.md](./README.md) Troubleshooting

---

## 🎊 Success Checklist

- [ ] Vercel deployment completed
- [ ] Environment variables set
- [ ] Webhook registered with Telegram
- [ ] Bot responds to /start
- [ ] Admin dashboard accessible
- [ ] Can add/edit coupons
- [ ] Bot displays coupons correctly
- [ ] Ready to promote! 🚀

---

## 🚀 Your Next Step

**Pick one:**

1. **→ [QUICKSTART.md](./QUICKSTART.md)** if you just want to deploy ASAP
2. **→ [DEPLOYMENT.md](./DEPLOYMENT.md)** if you want detailed steps
3. **→ [GETTING_STARTED.md](./GETTING_STARTED.md)** if you want guidance

---

## 📞 Help

Every major document has:
- Step-by-step instructions
- Code examples
- Troubleshooting section
- Next steps

**You've got this!** 💪

---

*Questions? Read the relevant document above. Everything is documented!*

**Let's launch your bot!** 🎓🚀
