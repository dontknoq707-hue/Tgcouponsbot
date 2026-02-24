-- PWcoupons Database Schema

-- Bot settings table for admin configuration
CREATE TABLE IF NOT EXISTS bot_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table (PW, Other Institutes, Extras, Support)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  discount TEXT NOT NULL,
  description TEXT,
  validity TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referrals table for Extras section
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  link TEXT,
  instructions TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User analytics (optional, for tracking)
CREATE TABLE IF NOT EXISTS user_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_user_id BIGINT NOT NULL,
  telegram_username TEXT,
  first_name TEXT,
  action TEXT NOT NULL,
  category_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id BIGINT UNIQUE NOT NULL,
  username TEXT,
  is_super_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_coupons_category ON coupons(category_id);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_user_interactions_telegram ON user_interactions(telegram_user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_created ON user_interactions(created_at);

-- Insert default bot settings
INSERT INTO bot_settings (key, value) VALUES
  ('greeting_message', '"Hello {name} 👋✨\nWelcome to your discounted education journey 🎓💸\nChoose what you''re looking for today 👇"'),
  ('support_mode', '"username"'),
  ('admin_username', '"@PWcouponsAdmin"'),
  ('start_reaction', '"🔥"')
ON CONFLICT (key) DO NOTHING;

-- Insert main categories
INSERT INTO categories (id, name, emoji, parent_id, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Physics Wallah (PW)', '🎓', NULL, 1),
  ('22222222-2222-2222-2222-222222222222', 'Other Institutes', '🏫', NULL, 2),
  ('33333333-3333-3333-3333-333333333333', 'Extras', '🎁', NULL, 3),
  ('44444444-4444-4444-4444-444444444444', 'Support', '🛠', NULL, 4)
ON CONFLICT DO NOTHING;

-- Insert PW subcategories
INSERT INTO categories (id, name, emoji, parent_id, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111112', 'Batches', '📘', '11111111-1111-1111-1111-111111111111', 1),
  ('11111111-1111-1111-1111-111111111113', 'Test Series', '🧪', '11111111-1111-1111-1111-111111111111', 2),
  ('11111111-1111-1111-1111-111111111114', 'Store', '🛍', '11111111-1111-1111-1111-111111111111', 3),
  ('11111111-1111-1111-1111-111111111115', 'Offline', '🏫', '11111111-1111-1111-1111-111111111111', 4),
  ('11111111-1111-1111-1111-111111111116', 'Power Batch', '⚡', '11111111-1111-1111-1111-111111111111', 5)
ON CONFLICT DO NOTHING;

-- Insert PW Batches exam categories
INSERT INTO categories (id, name, emoji, parent_id, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111121', 'JEE', '🧠', '11111111-1111-1111-1111-111111111112', 1),
  ('11111111-1111-1111-1111-111111111122', 'NEET', '🩺', '11111111-1111-1111-1111-111111111112', 2),
  ('11111111-1111-1111-1111-111111111123', 'All Exams', '📖', '11111111-1111-1111-1111-111111111112', 3)
ON CONFLICT DO NOTHING;

-- Insert PW Test Series subcategories
INSERT INTO categories (id, name, emoji, parent_id, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111131', 'PW RTS (Real Test Series)', '🧪', '11111111-1111-1111-1111-111111111113', 1),
  ('11111111-1111-1111-1111-111111111132', 'Mathongo / Quizzr (Online)', '📊', '11111111-1111-1111-1111-111111111113', 2)
ON CONFLICT DO NOTHING;

-- Insert PW RTS exam categories
INSERT INTO categories (id, name, emoji, parent_id, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111141', 'JEE', '🧠', '11111111-1111-1111-1111-111111111131', 1),
  ('11111111-1111-1111-1111-111111111142', 'NEET', '🩺', '11111111-1111-1111-1111-111111111131', 2)
ON CONFLICT DO NOTHING;

-- Insert PW Mathongo exam categories
INSERT INTO categories (id, name, emoji, parent_id, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111151', 'JEE', '🧠', '11111111-1111-1111-1111-111111111132', 1),
  ('11111111-1111-1111-1111-111111111152', 'NEET', '🩺', '11111111-1111-1111-1111-111111111132', 2)
ON CONFLICT DO NOTHING;

-- Insert PW Offline subcategories
INSERT INTO categories (id, name, emoji, parent_id, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111161', 'Vidyapeeth', '🏫', '11111111-1111-1111-1111-111111111115', 1),
  ('11111111-1111-1111-1111-111111111162', 'Pathshala', '🏫', '11111111-1111-1111-1111-111111111115', 2)
ON CONFLICT DO NOTHING;

-- Insert Other Institutes subcategories
INSERT INTO categories (id, name, emoji, parent_id, sort_order) VALUES
  ('22222222-2222-2222-2222-222222222221', 'Motion', '🚀', '22222222-2222-2222-2222-222222222222', 1),
  ('22222222-2222-2222-2222-222222222222', 'Unacademy', '🔵', '22222222-2222-2222-2222-222222222222', 2),
  ('22222222-2222-2222-2222-222222222223', 'Careerwill', '🟢', '22222222-2222-2222-2222-222222222222', 3)
ON CONFLICT DO NOTHING;

-- Insert exam categories for Other Institutes
INSERT INTO categories (id, name, emoji, parent_id, sort_order) VALUES
  -- Motion exams
  ('22222222-2222-2222-2222-222222222231', 'JEE', '🧠', '22222222-2222-2222-2222-222222222221', 1),
  ('22222222-2222-2222-2222-222222222232', 'NEET', '🩺', '22222222-2222-2222-2222-222222222221', 2),
  -- Unacademy exams
  ('22222222-2222-2222-2222-222222222241', 'JEE', '🧠', '22222222-2222-2222-2222-222222222222', 1),
  ('22222222-2222-2222-2222-222222222242', 'NEET', '🩺', '22222222-2222-2222-2222-222222222222', 2),
  -- Careerwill exams
  ('22222222-2222-2222-2222-222222222251', 'JEE', '🧠', '22222222-2222-2222-2222-222222222223', 1),
  ('22222222-2222-2222-2222-222222222252', 'NEET', '🩺', '22222222-2222-2222-2222-222222222223', 2)
ON CONFLICT DO NOTHING;

-- Insert Extras subcategories
INSERT INTO categories (id, name, emoji, parent_id, sort_order) VALUES
  ('33333333-3333-3333-3333-333333333331', 'Referral Offers', '📲', '33333333-3333-3333-3333-333333333333', 1)
ON CONFLICT DO NOTHING;

-- Insert sample coupons (based on deal4u.in research)
INSERT INTO coupons (category_id, code, discount, description, validity) VALUES
  -- PW JEE Batch coupons
  ('11111111-1111-1111-1111-111111111121', 'JEECOUPON', '10% OFF', '🔥 PW JEE Batch Coupon 🎓', 'Limited Time'),
  ('11111111-1111-1111-1111-111111111121', 'PWJEE2025', '15% OFF', '🎯 Special JEE Discount 🚀', 'Valid till March 2025'),
  -- PW NEET Batch coupons
  ('11111111-1111-1111-1111-111111111122', 'NEETCOUPON', '10% OFF', '🩺 PW NEET Batch Coupon 🎓', 'Limited Time'),
  ('11111111-1111-1111-1111-111111111122', 'PWNEET2025', '15% OFF', '🎯 Special NEET Discount 🚀', 'Valid till March 2025'),
  -- PW All Exams
  ('11111111-1111-1111-1111-111111111123', 'PWBATCH', '10% OFF', '📖 PW All Batches Coupon 🎓', 'Limited Time'),
  -- PW RTS JEE
  ('11111111-1111-1111-1111-111111111141', 'RTSJEE', '20% OFF', '🧪 PW RTS JEE Test Series 🎯', 'Limited Time'),
  -- PW RTS NEET
  ('11111111-1111-1111-1111-111111111142', 'RTSNEET', '20% OFF', '🧪 PW RTS NEET Test Series 🎯', 'Limited Time'),
  -- PW Mathongo JEE
  ('11111111-1111-1111-1111-111111111151', 'MATHONGOJEE', '15% OFF', '📊 Mathongo JEE Test Series 🎯', 'Limited Time'),
  -- PW Mathongo NEET
  ('11111111-1111-1111-1111-111111111152', 'MATHONGONEET', '15% OFF', '📊 Mathongo NEET Test Series 🎯', 'Limited Time'),
  -- PW Store
  ('11111111-1111-1111-1111-111111111114', 'PWSTORE10', '10% OFF', '🛍 PW Store Discount 🎁', 'Limited Time'),
  -- PW Vidyapeeth
  ('11111111-1111-1111-1111-111111111161', 'VIDYAPEETH', '5% OFF', '🏫 PW Vidyapeeth Offline 📚', 'Limited Time'),
  -- PW Pathshala
  ('11111111-1111-1111-1111-111111111162', 'PATHSHALA', '5% OFF', '🏫 PW Pathshala Offline 📚', 'Limited Time'),
  -- PW Power Batch
  ('11111111-1111-1111-1111-111111111116', 'POWERBATCH', '10% OFF', '⚡ PW Power Batch Special 🔥', 'Limited Time'),
  -- Motion JEE
  ('22222222-2222-2222-2222-222222222231', 'MOTIONJEE', '15% OFF', '🚀 Motion JEE Coupon 🎓', 'Limited Time'),
  -- Motion NEET
  ('22222222-2222-2222-2222-222222222232', 'MOTIONNEET', '15% OFF', '🚀 Motion NEET Coupon 🎓', 'Limited Time'),
  -- Unacademy JEE
  ('22222222-2222-2222-2222-222222222241', 'UNACADEMYJEE', '10% OFF', '🔵 Unacademy JEE Coupon 🎓', 'Limited Time'),
  -- Unacademy NEET
  ('22222222-2222-2222-2222-222222222242', 'UNACADEMYNEET', '10% OFF', '🔵 Unacademy NEET Coupon 🎓', 'Limited Time'),
  -- Careerwill JEE
  ('22222222-2222-2222-2222-222222222251', 'CAREERWILLJEE', '12% OFF', '🟢 Careerwill JEE Coupon 🎓', 'Limited Time'),
  -- Careerwill NEET
  ('22222222-2222-2222-2222-222222222252', 'CAREERWILLNEET', '12% OFF', '🟢 Careerwill NEET Coupon 🎓', 'Limited Time')
ON CONFLICT DO NOTHING;

-- Insert sample referrals
INSERT INTO referrals (app_name, emoji, code, description, link, instructions) VALUES
  ('PhonePe', '📱', 'SUMIT123', '💸 Earn ₹100+ via Referral', 'https://phon.pe/referral', 'Install PhonePe, use code & earn cashback 🔥'),
  ('Paytm', '💳', 'PAYTM100', '💰 Get ₹100 Cashback', 'https://paytm.com/refer', 'Sign up on Paytm, complete KYC & earn 💵'),
  ('Google Pay', '🟢', 'GPAY50', '🎁 Earn ₹50+ Rewards', 'https://gpay.app.goo.gl/', 'Download GPay, make first payment & earn 🚀')
ON CONFLICT DO NOTHING;

-- Enable RLS on all tables (no restrictions for now - admin controlled)
ALTER TABLE bot_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (bot needs to read without auth)
CREATE POLICY "Allow public read bot_settings" ON bot_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read coupons" ON coupons FOR SELECT USING (true);
CREATE POLICY "Allow public read referrals" ON referrals FOR SELECT USING (true);

-- Create policies for insert (for tracking)
CREATE POLICY "Allow public insert user_interactions" ON user_interactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read user_interactions" ON user_interactions FOR SELECT USING (true);

-- Admin users policies
CREATE POLICY "Allow public read admin_users" ON admin_users FOR SELECT USING (true);

-- Service role can do everything (for admin panel)
CREATE POLICY "Service role full access bot_settings" ON bot_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access coupons" ON coupons FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access referrals" ON referrals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access admin_users" ON admin_users FOR ALL USING (true) WITH CHECK (true);
