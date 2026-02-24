# PWcoupons - Telegram Coupon Bot 🎓

A fully-featured Telegram bot for managing and distributing coupon codes for educational platforms like Physics Wallah, Motion, Unacademy, and more. Built with Next.js and Supabase.

## Features ✨

- **Interactive Telegram Bot** with nested inline keyboard dashboards
- **Coupon Management** - Add, edit, enable/disable coupons easily
- **Category Management** - Create and organize coupon categories
- **Referral Program** - Manage referral offers and rewards
- **Admin Dashboard** - Web-based interface for full control
- **Analytics & Stats** - Track bot usage and user interactions
- **Message Reactions** - Emoji reactions on bot interactions
- **Student-Friendly UX** - Emoji-rich, engaging interface

## Tech Stack 🛠

- **Frontend**: Next.js 16 (App Router)
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## Getting Started 🚀

### Prerequisites

1. **Telegram Bot Token** - Create a bot via [@BotFather](https://t.me/BotFather)
2. **Your Telegram User ID** - Use [@userinfobot](https://t.me/userinfobot)
3. **Supabase Account** - [Create free account](https://supabase.com)
4. **Vercel Account** - [Deploy here](https://vercel.com)

### Step 1: Setup Environment Variables

Add these to your Vercel project settings:

```env
BOT_TOKEN=your_telegram_bot_token
ADMIN_TELEGRAM_ID=your_telegram_user_id
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 2: Setup Database

The database schema is automatically created when the migration runs. Tables include:

- `categories` - Coupon categories (PW, Motion, Unacademy, etc.)
- `coupons` - Individual coupon codes
- `referrals` - Referral program data
- `bot_settings` - Bot configuration
- `user_interactions` - User activity logs
- `admin_users` - Admin accounts

### Step 3: Deploy to Vercel

```bash
git push
```

The project automatically deploys to Vercel. Once deployed, access:

- **Main Site**: https://pwcoupons.vercel.app
- **Admin Dashboard**: https://pwcoupons.vercel.app/admin

### Step 4: Connect Telegram Webhook

After deployment, run this command in your browser or terminal:

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://pwcoupons.vercel.app/api/telegram/webhook
```

Replace `<YOUR_BOT_TOKEN>` with your actual bot token.

## Admin Dashboard 🔐

### Login

- **Username**: admin
- **Password**: admin123 (change this immediately!)

### Management Features

1. **Coupons Tab** - Add, edit, delete, and toggle coupon codes
2. **Categories Tab** - Create nested category hierarchies
3. **Referrals Tab** - Manage referral offers (PhonePe, Paytm, etc.)
4. **Settings Tab** - Configure bot messages, admin username, support mode
5. **Analytics Tab** - View usage statistics and user interactions

## Bot Commands 🤖

### For Users

- `/start` - Start the bot, see main dashboard
- Navigate via inline keyboard buttons

### Main Dashboard Options

```
🎓 Physics Wallah (PW)
   ├── 📘 Batches → Select exam (JEE, NEET, etc.)
   ├── 🧪 Test Series
   ├── 🛍 Store
   ├── 🏫 Offline
   └── ⚡ Power Batch

🏫 Other Institutes
   ├── 🚀 Motion
   ├── 🔵 Unacademy
   └── 🟢 Careerwill

🎁 Extras
   └── 📲 Referral Offers

🛠 Support
   └── Get help / Contact admin
```

## Database Schema 📊

### Coupons Table

```sql
id | category_id | code | discount | validity | description | is_active
```

### Categories Table

```sql
id | name | emoji | parent_id | sort_order | is_active
```

### Bot Settings Table

```sql
id | greeting_message | admin_username | support_mode | is_active
```

## Project Structure 📁

```
app/
├── page.tsx                 # Homepage
├── api/
│   ├── telegram/
│   │   └── webhook/route.ts # Telegram webhook handler
│   ├── health/route.ts      # Health check
│   └── admin/               # Admin API routes
├── admin/
│   ├── page.tsx             # Login page
│   └── dashboard/page.tsx   # Main dashboard
components/
├── ui/                      # shadcn/ui components
└── admin/                   # Admin-specific components
lib/
├── supabase/                # Supabase client setup
├── telegram/                # Telegram bot utilities
├── auth/                    # Authentication helpers
└── types/                   # TypeScript types
scripts/
├── 001_create_tables.sql    # Database schema
└── 002_add_admin_user.sql   # Initial admin user
```

## API Endpoints 🔌

### Public Endpoints

- `GET /api/health` - Health check
- `POST /api/telegram/webhook` - Telegram webhook

### Admin Endpoints (Requires Authentication)

- `GET/POST /api/admin/coupons` - Manage coupons
- `GET/POST /api/admin/categories` - Manage categories
- `GET/POST /api/admin/referrals` - Manage referrals
- `GET /api/admin/stats` - Get statistics
- `GET /api/admin/settings` - Get bot settings
- `POST /api/admin/login` - Admin login

## Customization 🎨

### Add New Categories

1. Go to Admin Dashboard → Categories tab
2. Click "Add Category"
3. Enter name and emoji
4. Set as active

### Add Coupons

1. Go to Admin Dashboard → Coupons tab
2. Click "Add Coupon"
3. Select category, enter code, discount, validity
4. Save

### Customize Bot Messages

1. Go to Admin Dashboard → Settings tab
2. Update greeting message, admin username, support mode
3. Save

## Troubleshooting 🐛

### Bot not responding

- Check if `BOT_TOKEN` is correct
- Verify webhook is registered: `https://api.telegram.org/bot<TOKEN>/getWebhookInfo`
- Check Vercel logs for errors

### Database errors

- Verify Supabase credentials in environment variables
- Check if tables exist: `Supabase Dashboard → SQL Editor`
- Re-run migration if needed

### Admin login not working

- Clear browser cookies
- Verify `admin_users` table has admin user
- Check cookies are enabled

## Future Enhancements 🚀

- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Custom admin password setup
- [ ] Bulk coupon import/export
- [ ] Advanced analytics dashboard
- [ ] User feedback system

## Support 💬

For issues or questions:

1. Check the [Telegram Bot API docs](https://core.telegram.org/bots)
2. Review [Supabase docs](https://supabase.com/docs)
3. Check [Next.js documentation](https://nextjs.org/docs)

## License 📄

MIT License - feel free to use and modify!

---

**Made with ❤️ for students seeking great deals on education**
