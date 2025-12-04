-- ============================================
-- CRITICAL FIX: Supabase Auth Integration Schema
-- ============================================
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new

-- ============================================
-- DROP OLD TABLES IF THEY EXIST
-- ============================================
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- ============================================
-- USERS TABLE - Links to Supabase Auth
-- ============================================
-- This table stores additional user profile information
-- The 'id' MUST match auth.users.id from Supabase Auth

CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT DEFAULT '',
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'staff')),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- AUTO-CREATE USER PROFILE ON AUTH SIGNUP
-- ============================================
-- This trigger automatically creates a user profile when someone signs up

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, phone, role, email_verified)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
        NEW.email_confirmed_at IS NOT NULL
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        email_verified = EXCLUDED.email_verified;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to run after user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    order_number TEXT UNIQUE NOT NULL,
    items JSONB NOT NULL DEFAULT '[]',
    total_amount NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'completed', 'cancelled')),
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    rules JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(category, subcategory)
);

-- ============================================
-- FAQS TABLE (with order_index)
-- ============================================
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
-- SEO SETTINGS TABLE (with page_path)
-- ============================================
CREATE TABLE IF NOT EXISTS public.seo_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    razorpay_key_id TEXT DEFAULT '',
    razorpay_key_secret TEXT DEFAULT '',
    phonepe_merchant_id TEXT DEFAULT '',
    phonepe_salt_key TEXT DEFAULT '',
    phonepe_salt_index TEXT DEFAULT '1',
    razorpay_enabled BOOLEAN DEFAULT FALSE,
    phonepe_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CONTENT PAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.content_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
CREATE INDEX IF NOT EXISTS idx_faqs_order ON public.faqs(order_index);

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

-- Drop all existing policies first
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Anyone can insert users (signup)" ON public.users;
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can view pricing rules" ON public.pricing_rules;
DROP POLICY IF EXISTS "Admins can insert pricing rules" ON public.pricing_rules;
DROP POLICY IF EXISTS "Admins can update pricing rules" ON public.pricing_rules;
DROP POLICY IF EXISTS "Admins can delete pricing rules" ON public.pricing_rules;
DROP POLICY IF EXISTS "Anyone can view FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can insert FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can update FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can delete FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can view all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can view SEO settings" ON public.seo_settings;
DROP POLICY IF EXISTS "Admins can insert SEO settings" ON public.seo_settings;
DROP POLICY IF EXISTS "Admins can update SEO settings" ON public.seo_settings;
DROP POLICY IF EXISTS "Admins can delete SEO settings" ON public.seo_settings;
DROP POLICY IF EXISTS "Admins can view payment settings" ON public.payment_settings;
DROP POLICY IF EXISTS "Admins can insert payment settings" ON public.payment_settings;
DROP POLICY IF EXISTS "Admins can update payment settings" ON public.payment_settings;
DROP POLICY IF EXISTS "Anyone can view content pages" ON public.content_pages;
DROP POLICY IF EXISTS "Admins can insert content pages" ON public.content_pages;
DROP POLICY IF EXISTS "Admins can update content pages" ON public.content_pages;
DROP POLICY IF EXISTS "Admins can delete content pages" ON public.content_pages;

-- USERS TABLE POLICIES
CREATE POLICY "Users can view their own data" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Users can update their own data" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can update all users" ON public.users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Admins can insert users" ON public.users
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Admins can delete users" ON public.users
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- PRODUCTS TABLE POLICIES (Public Read, Admin Write)
CREATE POLICY "Anyone can view products" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON public.products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- ORDERS TABLE POLICIES
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON public.orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Authenticated users can create orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update orders" ON public.orders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- PRICING RULES TABLE POLICIES (Public Read, Admin Write)
CREATE POLICY "Anyone can view pricing rules" ON public.pricing_rules
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage pricing rules" ON public.pricing_rules
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- FAQS TABLE POLICIES (Public Read, Admin Write)
CREATE POLICY "Anyone can view FAQs" ON public.faqs
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage FAQs" ON public.faqs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- REVIEWS TABLE POLICIES
CREATE POLICY "Anyone can view approved reviews" ON public.reviews
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Admins can view all reviews" ON public.reviews
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Users can create reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage reviews" ON public.reviews
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- SEO SETTINGS TABLE POLICIES (Public Read, Admin Write)
CREATE POLICY "Anyone can view SEO settings" ON public.seo_settings
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage SEO settings" ON public.seo_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- PAYMENT SETTINGS TABLE POLICIES (Admin Only)
CREATE POLICY "Admins can manage payment settings" ON public.payment_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- CONTENT PAGES TABLE POLICIES (Public Read, Admin Write)
CREATE POLICY "Anyone can view content pages" ON public.content_pages
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage content pages" ON public.content_pages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
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

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
DROP TRIGGER IF EXISTS update_pricing_rules_updated_at ON public.pricing_rules;
DROP TRIGGER IF EXISTS update_faqs_updated_at ON public.faqs;
DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
DROP TRIGGER IF EXISTS update_seo_settings_updated_at ON public.seo_settings;
DROP TRIGGER IF EXISTS update_payment_settings_updated_at ON public.payment_settings;
DROP TRIGGER IF EXISTS update_content_pages_updated_at ON public.content_pages;

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
    '1',
    false,
    false
) ON CONFLICT DO NOTHING;

-- ============================================
-- ✅ SCHEMA SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Create admin user in Supabase Auth UI
-- 2. Update the user's role to 'admin' in the users table
-- 3. Login with admin credentials
