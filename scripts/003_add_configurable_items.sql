-- Create institutes table
CREATE TABLE IF NOT EXISTS public.institutes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  section TEXT NOT NULL, -- 'batches', 'testseries', 'store', 'offline'
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create test_series table
CREATE TABLE IF NOT EXISTS public.test_series (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  institute_id UUID REFERENCES public.institutes(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create stores table
CREATE TABLE IF NOT EXISTS public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  institute_id UUID REFERENCES public.institutes(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bot_config table for support username and extras message
CREATE TABLE IF NOT EXISTS public.bot_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  support_username TEXT NOT NULL DEFAULT '@support',
  extras_message TEXT NOT NULL DEFAULT '🔥 A high discount is currently running on PW batch purchases (up to 40% off)',
  greeting_message TEXT NOT NULL DEFAULT 'Welcome to PW Coupons Bot 🎓💸',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.institutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_series ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read institutes" ON public.institutes FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read test_series" ON public.test_series FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read stores" ON public.stores FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read bot_config" ON public.bot_config FOR SELECT USING (TRUE);

CREATE POLICY "Service role full access institutes" ON public.institutes USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access test_series" ON public.test_series USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access stores" ON public.stores USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access bot_config" ON public.bot_config USING (auth.role() = 'service_role');

-- Insert sample data
INSERT INTO public.institutes (name, emoji, section, sort_order) VALUES
('Physics Wallah', '🔥', 'batches', 1),
('Unacademy', '📘', 'batches', 2),
('Motion', '🚀', 'batches', 3),
('PW RTS', '🧪', 'testseries', 1),
('Mathongo', '📊', 'testseries', 2),
('PW Store', '🛍', 'store', 1),
('PW Vidyapeeth', '🏫', 'offline', 1),
('PW Pathshala', '🏫', 'offline', 2);

INSERT INTO public.bot_config (support_username, extras_message, greeting_message) VALUES
('@pwsupport', '🔥 A high discount is currently running on PW batch purchases (up to 40% off)', 'Welcome to PW Coupons Bot 🎓💸');
