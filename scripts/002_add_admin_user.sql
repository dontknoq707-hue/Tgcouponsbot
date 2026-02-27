-- Add default admin user for web dashboard login
-- Email: admin@pwcoupons.com / Password: admin123 (handled in code)

INSERT INTO admin_users (email, is_active)
VALUES ('admin@pwcoupons.com', true)
ON CONFLICT DO NOTHING;
