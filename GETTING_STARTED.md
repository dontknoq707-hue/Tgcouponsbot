# PWcoupons - Getting Started Guide 🎓

Welcome! This guide will walk you through setting up and launching your PWcoupons Telegram bot.

## 📚 Documentation Structure

Start reading in this order:

1. **This file (GETTING_STARTED.md)** ← You are here
   - Overview and orientation

2. **[QUICKSTART.md](./QUICKSTART.md)** (5 minutes)
   - 3-minute setup for experienced developers
   - For when you just want to deploy

3. **[DEPLOYMENT.md](./DEPLOYMENT.md)** (15 minutes)
   - Step-by-step deployment guide
   - Create bot, setup Supabase, deploy to Vercel
   - Register webhook with Telegram

4. **[CONFIG.md](./CONFIG.md)** (10 minutes)
   - How to customize your bot
   - Admin dashboard walkthrough
   - Add coupons, categories, referrals

5. **[LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)**
   - Complete pre-launch testing
   - Go live safely

6. **[README.md](./README.md)**
   - Full feature documentation
   - API endpoints reference
   - Troubleshooting guide

7. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**
   - Technical architecture
   - File structure overview
   - For developers

## 🚀 Quick Path to Launch

### New to this? Follow this path (30 minutes):

```
1. Read this file (5 min)
   ↓
2. Read QUICKSTART.md (3 min)
   ↓
3. Follow DEPLOYMENT.md (15 min)
   ↓
4. Test with LAUNCH_CHECKLIST.md (5 min)
   ↓
5. Start using CONFIG.md to add content (2 min)
```

### Experienced developer? Use this:

```
1. Skim QUICKSTART.md (1 min)
   ↓
2. Deploy using DEPLOYMENT.md (10 min)
   ↓
3. Test with LAUNCH_CHECKLIST.md (5 min)
```

## 🎯 What You'll Get

### For Users (Students)
```
/start command triggers:
┌─ 🎓 Physics Wallah (PW)
│  ├─ 📘 Batches → JEE/NEET → Coupon codes
│  ├─ 🧪 Test Series → Test codes
│  ├─ 🛍 Store → Store codes
│  ├─ 🏫 Offline → Center codes
│  └─ ⚡ Power Batch → Power batch codes
├─ 🏫 Other Institutes
│  ├─ 🚀 Motion
│  ├─ 🔵 Unacademy
│  └─ 🟢 Careerwill
├─ 🎁 Extras
│  └─ 📲 Referral Offers → PhonePe, Paytm, etc.
└─ 🛠 Support → Contact admin
```

### For You (Admin)
```
Admin Dashboard at: https://pwcoupons.vercel.app/admin
Login: admin / admin123

Manage:
├─ Coupons (Add/Edit/Delete)
├─ Categories (Create hierarchies)
├─ Referrals (Manage offers)
├─ Settings (Bot configuration)
└─ Analytics (View statistics)
```

## 📋 Prerequisites

You need:
1. **Telegram Account** - To create a bot
2. **GitHub Account** - To push code
3. **Vercel Account** - For free hosting (no card needed)
4. **Supabase Account** - Free PostgreSQL database

All are **free**! ✨

## 🔑 Key Concepts

### Telegram Bot
A bot that responds to users on Telegram. Created via @BotFather.

### Webhook
A URL that Telegram sends updates to when users interact with your bot.
Your webhook: `https://pwcoupons.vercel.app/api/telegram/webhook`

### Supabase
A free PostgreSQL database service. Stores:
- Coupon codes
- Categories
- User activity
- Admin settings

### Vercel
Free serverless hosting for Next.js apps. Your bot API runs here.

### Admin Dashboard
A website where you manage coupons without touching code.
At: `https://pwcoupons.veravel.app/admin`

## 🏗 Architecture (Simple)

```
Students on Telegram
        ↓
   Send /start
        ↓
Telegram sends to your bot
        ↓
Your bot API (Vercel)
        ↓
Database (Supabase)
        ↓
Bot replies with coupons
        ↓
Student sees coupon code! 🎉
```

## 💡 Example Flow

1. Student: `/start`
2. Bot: "Hello! Choose what you're looking for:"
   - 🎓 Physics Wallah
   - 🏫 Other Institutes
   - etc.
3. Student: Click "🎓 Physics Wallah"
4. Bot: "Choose a category:"
   - 📘 Batches
   - 🧪 Test Series
   - etc.
5. Student: Click "📘 Batches"
6. Bot: "Choose exam:"
   - 🧠 JEE
   - 🩺 NEET
   - etc.
7. Student: Click "🧠 JEE"
8. Bot: "🔥 PW JEE Batch Coupon 🎓
          🏷 Code: PWJEE20
          💸 Discount: 20%
          ⏳ Validity: 31 Dec 2025"

## 🛠 What's Already Built

This project comes with:

✅ **Bot logic** - All handlers and keyboards
✅ **Admin dashboard** - Full UI for management
✅ **Database schema** - 6 tables with security
✅ **API routes** - All CRUD operations
✅ **Documentation** - 5 guides + README
✅ **Deployment ready** - Just add env vars
✅ **Security** - Auth, HTTPS, RLS policies
✅ **Styling** - Tailwind CSS + shadcn/ui

You just need to:
1. Get credentials (5 minutes)
2. Deploy to Vercel (5 minutes)
3. Register webhook (1 minute)
4. Add your coupons (5 minutes)

## 🎓 Learning Path

### Absolute Beginner?
1. Read QUICKSTART.md
2. Follow DEPLOYMENT.md step-by-step
3. Watch for confirmation messages
4. Use admin dashboard to add coupons

### Already know Telegram bots?
1. Skim QUICKSTART.md
2. Use DEPLOYMENT.md as checklist
3. Review code in `/lib/telegram/`

### Full stack developer?
1. Review PROJECT_SUMMARY.md for architecture
2. Check `/lib/` for implementation details
3. Review API routes in `/app/api/`

## ❓ Common Questions

**Q: Do I need to code?**
A: No! Just follow deployment guide. Admin dashboard handles everything else.

**Q: Is it free?**
A: Yes! Vercel, Supabase, Telegram are all free (with limits).

**Q: Can I customize it?**
A: Yes! Use CONFIG.md for all customization options.

**Q: How many users can I support?**
A: Hundreds of thousands. Scales automatically.

**Q: Can I add more institutes?**
A: Yes! Just add categories and coupons in admin dashboard.

**Q: Is my data safe?**
A: Yes! Supabase uses industry-standard encryption. No data sold or shared.

## 🎯 Your Next Step

Choose your path:

### Path A: Deploy Now (15 min)
→ Go to [DEPLOYMENT.md](./DEPLOYMENT.md)
→ Follow steps 1-4
→ Test your bot
→ You're live!

### Path B: Understand First (30 min)
→ Read [QUICKSTART.md](./QUICKSTART.md)
→ Then go to [DEPLOYMENT.md](./DEPLOYMENT.md)
→ Follow full checklist
→ Then read [CONFIG.md](./CONFIG.md)

### Path C: Deep Dive (1 hour)
→ Read [README.md](./README.md) first
→ Then [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
→ Then [DEPLOYMENT.md](./DEPLOYMENT.md)
→ Then explore the code
→ Then launch with [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)

## 📞 Need Help?

1. **Setup issues?** → Check [DEPLOYMENT.md](./DEPLOYMENT.md)
2. **Customization?** → Check [CONFIG.md](./CONFIG.md)
3. **Technical details?** → Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
4. **Full docs?** → Check [README.md](./README.md)
5. **Pre-launch?** → Use [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)

## 🎉 Success!

Once you're launched:

1. ✅ Share bot link on social media
2. ✅ Add coupon codes in admin dashboard
3. ✅ Monitor user interactions
4. ✅ Update codes regularly
5. ✅ Gather feedback from students
6. ✅ Continuously improve

## 📊 Example Timeline

**Day 1:**
- Set up credentials (15 min)
- Deploy to Vercel (10 min)
- Register webhook (2 min)
- Add first 5 coupons (5 min)
- Test bot (5 min)

**Day 2-7:**
- Add more coupons daily
- Promote on social media
- Monitor analytics
- Fix any issues
- Gather user feedback

**Week 2+:**
- Add new institutes
- Create seasonal offers
- Expand categories
- Optimize based on data
- Scale to more students

## 🚀 You're Ready!

Pick a path above and start:

- **Want to be live in 15 minutes?** → [QUICKSTART.md](./QUICKSTART.md)
- **Want detailed instructions?** → [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Want to understand everything?** → Start with [README.md](./README.md)

---

**Questions? Check the relevant guide above. Everything is documented!**

Let's build something great for students! 🎓💪
