# PWcoupons Launch Checklist 🚀

Complete checklist to launch your bot successfully.

## Pre-Launch (Before Deploying)

- [ ] Read QUICKSTART.md (5 minutes)
- [ ] Read DEPLOYMENT.md (10 minutes)
- [ ] Verify all code is working locally
- [ ] Create GitHub repository
- [ ] Test database migration script
- [ ] Verify environment variables are ready

## Telegram Setup

- [ ] Create bot via @BotFather
  - [ ] Get BOT_TOKEN
  - [ ] Note the bot username
  - [ ] Set bot description
  - [ ] Set bot commands

- [ ] Get your Telegram ID via @userinfobot
  - [ ] Send message to @userinfobot
  - [ ] Save ADMIN_TELEGRAM_ID
  - [ ] Test that admin ID works

- [ ] (Optional) Set up bot profile
  - [ ] Add profile picture
  - [ ] Add description
  - [ ] Set default admin rights (if needed)

## Supabase Setup

- [ ] Create Supabase account
  - [ ] Create new project
  - [ ] Wait for project to initialize (2-3 min)

- [ ] Get Supabase credentials
  - [ ] Copy NEXT_PUBLIC_SUPABASE_URL
  - [ ] Copy NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] Save securely

- [ ] Verify database
  - [ ] Check that tables exist
  - [ ] Verify admin_users table has admin user
  - [ ] Test that you can query data

## Vercel Deployment

- [ ] Push code to GitHub
  - [ ] Commit all changes
  - [ ] Push to main branch
  - [ ] Verify no merge conflicts

- [ ] Create/Import Vercel project
  - [ ] Visit vercel.com
  - [ ] Import GitHub repository
  - [ ] Auto-configure Next.js settings

- [ ] Add environment variables
  - [ ] BOT_TOKEN
  - [ ] ADMIN_TELEGRAM_ID
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] Review all variables
  - [ ] Trigger redeploy

- [ ] Verify deployment
  - [ ] Check Vercel build succeeded
  - [ ] No red errors in logs
  - [ ] Domain is accessible

## Webhook Registration

- [ ] Register Telegram webhook
  - [ ] Get bot token and project URL
  - [ ] Open webhook URL in browser
  - [ ] Verify success response

- [ ] Test webhook connection
  - [ ] Check webhook info: `https://api.telegram.org/botTOKEN/getWebhookInfo`
  - [ ] Verify URL matches deployment
  - [ ] Check `pending_update_count` is 0

## Bot Testing

- [ ] Test main functionality
  - [ ] Find your bot on Telegram
  - [ ] Send `/start` command
  - [ ] Verify greeting message appears
  - [ ] Check emoji reaction on /start

- [ ] Test navigation
  - [ ] Click "🎓 Physics Wallah (PW)"
  - [ ] Click "📘 Batches"
  - [ ] Click "🧠 JEE"
  - [ ] Verify coupon code appears
  - [ ] Click "🔙 Back" buttons work
  - [ ] Test other categories

- [ ] Test all menu options
  - [ ] 🎓 Physics Wallah (PW) - all submenu items
  - [ ] 🏫 Other Institutes - Motion, Unacademy, Careerwill
  - [ ] 🎁 Extras - Referral offers
  - [ ] 🛠 Support - Contact admin option

- [ ] Test support message
  - [ ] Send message through support
  - [ ] Verify message received by admin

## Admin Dashboard Testing

- [ ] Access admin dashboard
  - [ ] Visit https://YOUR_DOMAIN/admin
  - [ ] Page loads without errors

- [ ] Test login
  - [ ] Login with admin / admin123
  - [ ] Redirects to dashboard
  - [ ] Cookies are set

- [ ] Test dashboard features
  - [ ] View stats (should show numbers)
  - [ ] Coupons tab loads
  - [ ] Categories tab loads
  - [ ] Referrals tab loads
  - [ ] Settings tab loads
  - [ ] Analytics tab loads

- [ ] Test coupon management
  - [ ] Add new coupon
  - [ ] Edit existing coupon
  - [ ] Toggle coupon active/inactive
  - [ ] Delete coupon
  - [ ] Changes appear in bot immediately

- [ ] Test category management
  - [ ] Add new category
  - [ ] Edit category emoji
  - [ ] Change sort order
  - [ ] Toggle active status
  - [ ] Verify in bot

- [ ] Test settings
  - [ ] Edit greeting message
  - [ ] Change admin username
  - [ ] Update support mode
  - [ ] Save settings
  - [ ] Verify changes in bot

- [ ] Test logout
  - [ ] Click logout
  - [ ] Redirected to login page
  - [ ] Cannot access dashboard without login

## Data Verification

- [ ] Check database
  - [ ] Supabase SQL editor
  - [ ] Count records in each table
  - [ ] Verify no errors in logs

- [ ] Test data persistence
  - [ ] Add coupon in admin
  - [ ] Restart bot (clear state)
  - [ ] Verify coupon still appears

- [ ] Check user tracking
  - [ ] Send some /start commands
  - [ ] Check user_interactions table
  - [ ] Verify interactions logged

## Security Checks

- [ ] Verify auth is working
  - [ ] Cannot access /admin/dashboard without login
  - [ ] Cannot access /api/admin/* without session

- [ ] Check environment variables
  - [ ] No secrets in code/logs
  - [ ] Only env vars used for tokens
  - [ ] NEXT_PUBLIC_* only for safe values

- [ ] Verify HTTPS
  - [ ] All URLs use HTTPS
  - [ ] No mixed content warnings
  - [ ] Cookies have secure flag

- [ ] Test with incorrect credentials
  - [ ] Wrong password shows error
  - [ ] Wrong username shows error
  - [ ] No SQL injection possible

## Documentation Review

- [ ] README.md is accurate
- [ ] QUICKSTART.md has correct URLs
- [ ] DEPLOYMENT.md instructions work
- [ ] CONFIG.md covers customization
- [ ] All links are correct

## Performance Check

- [ ] Homepage loads in < 2 seconds
- [ ] Admin dashboard loads in < 3 seconds
- [ ] API responses are < 1 second
- [ ] No console errors in browser

## Error Handling

- [ ] Bot handles missing coupons gracefully
- [ ] Admin handles deleted categories
- [ ] API returns proper error codes
- [ ] Errors don't expose sensitive info

## Analytics & Monitoring

- [ ] Check Vercel logs
  - [ ] Visit Vercel dashboard
  - [ ] No error logs
  - [ ] Check API response times

- [ ] Monitor bot activity
  - [ ] Check user_interactions table
  - [ ] Track popular coupons
  - [ ] Monitor daily users

## Final Checklist

- [ ] All tests passed
- [ ] No known bugs
- [ ] Documentation complete
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Team reviewed
- [ ] Ready for promotion

## Go Live!

- [ ] Announce bot on social media
  - [ ] Share bot link: `https://t.me/YOUR_BOT_USERNAME`
  - [ ] Post on Instagram/Facebook
  - [ ] Share on WhatsApp/Telegram groups
  - [ ] Email to students

- [ ] Monitor first 24 hours
  - [ ] Check bot responses
  - [ ] Monitor error logs
  - [ ] Respond to feedback
  - [ ] Add coupon codes

- [ ] Scale as needed
  - [ ] Add more institutes
  - [ ] Add seasonal offers
  - [ ] Update regularly
  - [ ] Gather feedback

## Post-Launch (First Week)

- [ ] Daily monitoring
  - [ ] Check user count
  - [ ] Review interactions
  - [ ] Fix any issues
  - [ ] Add new coupons

- [ ] Engagement
  - [ ] Respond to support messages
  - [ ] Fix reported bugs
  - [ ] Add requested features
  - [ ] Share feedback on progress

- [ ] Analytics
  - [ ] Review which coupons are popular
  - [ ] Check which categories are used most
  - [ ] Optimize based on data

- [ ] Improvements
  - [ ] Add more coupons
  - [ ] Improve messages
  - [ ] Fix typos
  - [ ] Update validity dates

## Post-Launch (Monthly)

- [ ] Remove expired coupons
- [ ] Add new offers
- [ ] Update referral codes
- [ ] Respond to feature requests
- [ ] Monitor performance
- [ ] Backup database
- [ ] Review analytics
- [ ] Plan next improvements

---

## Quick Issue Fixes

### Bot not responding
```bash
# Check webhook
https://api.telegram.org/botTOKEN/getWebhookInfo

# Re-register webhook
https://api.telegram.org/botTOKEN/setWebhook?url=https://pwcoupons.vercel.app/api/telegram/webhook
```

### Admin can't login
```bash
# Clear cookies in browser
# Check BOT_TOKEN and credentials are correct
# Verify admin_users table in Supabase
```

### Coupons not showing
```bash
# Verify category is created and active
# Check coupon is_active = true
# Reload dashboard and bot
```

### Database errors
```bash
# Check Supabase connection
# Verify tables exist in SQL Editor
# Check RLS policies are correct
```

---

**Print this checklist and check items as you complete them!**

Good luck with your launch! 🚀
