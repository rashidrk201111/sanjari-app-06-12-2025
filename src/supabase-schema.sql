-- Supabase Database Schema for Sanjari Prints
-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'staff')),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    base_price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    image_url TEXT,
    specifications JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    order_number TEXT UNIQUE NOT NULL,
    items JSONB NOT NULL DEFAULT '[]',
    total_amount NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    shipping_address JSONB,
    payment_method TEXT,
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PRICING RULES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.pricing_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    rules JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(category, subcategory)
);

-- ============================================
-- FAQS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SEO SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.seo_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_path TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    keywords TEXT,
    og_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PAYMENT SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.payment_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    razorpay_key_id TEXT DEFAULT '',
    razorpay_key_secret TEXT DEFAULT '',
    phonepe_merchant_id TEXT DEFAULT '',
    phonepe_salt_key TEXT DEFAULT '',
    phonepe_salt_index TEXT DEFAULT '',
    razorpay_enabled BOOLEAN DEFAULT FALSE,
    phonepe_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CONTENT PAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.content_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_type TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON public.products(subcategory);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_pricing_rules_category ON public.pricing_rules(category, subcategory);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_seo_settings_page_path ON public.seo_settings(page_path);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;

-- USERS TABLE POLICIES
CREATE POLICY "Users can view their own data" ON public.users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Users can update their own data" ON public.users
    FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can update all users" ON public.users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Anyone can insert users (signup)" ON public.users
    FOR INSERT WITH CHECK (true);

-- PRODUCTS TABLE POLICIES (Public Read, Admin Write)
CREATE POLICY "Anyone can view products" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert products" ON public.products
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update products" ON public.products
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete products" ON public.products
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

-- ORDERS TABLE POLICIES
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can view all orders" ON public.orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Users can create their own orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can update all orders" ON public.orders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role IN ('admin', 'staff')
        )
    );

-- PRICING RULES TABLE POLICIES (Public Read, Admin Write)
CREATE POLICY "Anyone can view pricing rules" ON public.pricing_rules
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert pricing rules" ON public.pricing_rules
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update pricing rules" ON public.pricing_rules
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete pricing rules" ON public.pricing_rules
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

-- FAQS TABLE POLICIES (Public Read, Admin Write)
CREATE POLICY "Anyone can view FAQs" ON public.faqs
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert FAQs" ON public.faqs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update FAQs" ON public.faqs
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete FAQs" ON public.faqs
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

-- REVIEWS TABLE POLICIES
CREATE POLICY "Anyone can view approved reviews" ON public.reviews
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Admins can view all reviews" ON public.reviews
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Authenticated users can insert reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can update reviews" ON public.reviews
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete reviews" ON public.reviews
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

-- SEO SETTINGS TABLE POLICIES (Public Read, Admin Write)
CREATE POLICY "Anyone can view SEO settings" ON public.seo_settings
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert SEO settings" ON public.seo_settings
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update SEO settings" ON public.seo_settings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete SEO settings" ON public.seo_settings
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

-- PAYMENT SETTINGS TABLE POLICIES (Admin Only)
CREATE POLICY "Admins can view payment settings" ON public.payment_settings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert payment settings" ON public.payment_settings
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update payment settings" ON public.payment_settings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

-- CONTENT PAGES TABLE POLICIES (Public Read, Admin Write)
CREATE POLICY "Anyone can view content pages" ON public.content_pages
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert content pages" ON public.content_pages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update content pages" ON public.content_pages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete content pages" ON public.content_pages
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_rules_updated_at BEFORE UPDATE ON public.pricing_rules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_settings_updated_at BEFORE UPDATE ON public.seo_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_settings_updated_at BEFORE UPDATE ON public.payment_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_pages_updated_at BEFORE UPDATE ON public.content_pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INSERT DEFAULT ADMIN USER
-- ============================================
-- ⚠️ WARNING: This INSERT will FAIL because no auth user exists!
-- 
-- YOU MUST CREATE ADMIN MANUALLY:
-- 
-- Step 1: Create Auth User in Dashboard
-- → Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users
-- → Click "Add user"
-- → Email: admin@sanjariprints.com
-- → Password: admin123
-- → ✅ CHECK "Auto Confirm User"
-- → Copy the User ID (UUID)
-- 
-- Step 2: Run This SQL (replace YOUR_USER_ID_HERE with UUID from Step 1):
-- 
-- INSERT INTO public.users (
--     id,
--     email,
--     name,
--     phone,
--     password_hash,
--     role,
--     email_verified
-- ) VALUES (
--     'YOUR_USER_ID_HERE',
--     'admin@sanjariprints.com',
--     'Admin User',
--     '+91 7350001266',
--     'handled_by_supabase_auth',
--     'admin',
--     true
-- ) ON CONFLICT (id) DO UPDATE SET role = 'admin', email_verified = true;
-- 
-- Step 3: Verify with:
-- SELECT id, email, name, role FROM public.users WHERE role = 'admin';
-- 
-- See detailed guide in: MANUAL_ADMIN_CREATION.sql
-- Quick start guide: ADMIN_QUICK_SETUP.md
-- Step-by-step: STEP_BY_STEP_ADMIN_SETUP.md
-- 
-- NOTE: The INSERT below is COMMENTED OUT because it won't work!
-- 
-- INSERT INTO public.users (email, name, phone, password_hash, role, email_verified)
-- VALUES (
--     'admin@sanjariprints.com',
--     'Admin User',
--     '+91 7350001266',
--     '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
--     'admin',
--     true
-- ) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- INSERT DEFAULT REVIEWS
-- ============================================
INSERT INTO public.reviews (user_id, user_name, user_email, rating, review_text, status)
SELECT 
    u.id,
    'Priya Sharma',
    'priya.sharma@example.com',
    5,
    'Excellent service! The quality of printing is outstanding. Got my business cards printed and they look very professional. Quick delivery too!',
    'approved'
FROM public.users u WHERE u.email = 'admin@sanjariprints.com' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.reviews (user_id, user_name, user_email, rating, review_text, status)
SELECT 
    u.id,
    'Rajesh Kumar',
    'rajesh.kumar@example.com',
    5,
    'Very satisfied with the banner printing service. The colors came out vibrant and the material quality is top-notch. Highly recommended!',
    'approved'
FROM public.users u WHERE u.email = 'admin@sanjariprints.com' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.reviews (user_id, user_name, user_email, rating, review_text, status)
SELECT 
    u.id,
    'Anjali Patel',
    'anjali.patel@example.com',
    4,
    'Good experience overall. The packaging boxes were exactly as I wanted. Delivery was on time. Will definitely order again for my business needs.',
    'approved'
FROM public.users u WHERE u.email = 'admin@sanjariprints.com' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- INSERT DEFAULT PAYMENT SETTINGS
-- ============================================
INSERT INTO public.payment_settings (
    razorpay_key_id,
    razorpay_key_secret,
    phonepe_merchant_id,
    phonepe_salt_key,
    phonepe_salt_index,
    razorpay_enabled,
    phonepe_enabled
) VALUES (
    '',
    '',
    '',
    '',
    '',
    false,
    false
) ON CONFLICT DO NOTHING;

-- ============================================
-- COMPLETED
-- ============================================
-- Schema setup complete!
-- Next steps:
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. Verify all tables are created
-- 3. Update your application contexts to use Supabase
