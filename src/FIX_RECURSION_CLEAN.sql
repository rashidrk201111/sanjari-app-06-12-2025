-- ============================================
-- FIX INFINITE RECURSION ERROR (CLEAN VERSION)
-- Safe to run multiple times
-- ============================================
-- Run this in Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new

-- ============================================
-- STEP 1: Create helper function to check if user is admin
-- This bypasses RLS and prevents infinite recursion
-- ============================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.users
        WHERE id = auth.uid() 
        AND role IN ('admin', 'staff')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- STEP 2: Drop ALL existing policies on all tables
-- ============================================

-- Users table
DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'users') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.users';
    END LOOP;
END $$;

-- Products table
DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'products') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.products';
    END LOOP;
END $$;

-- Orders table
DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'orders') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.orders';
    END LOOP;
END $$;

-- Pricing rules table
DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'pricing_rules') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.pricing_rules';
    END LOOP;
END $$;

-- FAQs table
DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'faqs') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.faqs';
    END LOOP;
END $$;

-- Reviews table
DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'reviews') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.reviews';
    END LOOP;
END $$;

-- SEO settings table
DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'seo_settings') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.seo_settings';
    END LOOP;
END $$;

-- Payment settings table
DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'payment_settings') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.payment_settings';
    END LOOP;
END $$;

-- Content pages table
DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'content_pages') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.content_pages';
    END LOOP;
END $$;

-- ============================================
-- STEP 3: Create new policies (no recursion)
-- ============================================

-- ============================================
-- USERS TABLE POLICIES
-- ============================================

-- Anyone can view their own profile
CREATE POLICY "users_select_own" ON public.users
    FOR SELECT 
    USING (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "users_select_all_if_admin" ON public.users
    FOR SELECT 
    USING (public.is_admin());

-- Users can update their own profile
CREATE POLICY "users_update_own" ON public.users
    FOR UPDATE 
    USING (auth.uid() = id);

-- Admins can update all users
CREATE POLICY "users_update_all_if_admin" ON public.users
    FOR UPDATE 
    USING (public.is_admin());

-- Admins can insert users
CREATE POLICY "users_insert_if_admin" ON public.users
    FOR INSERT 
    WITH CHECK (public.is_admin());

-- Admins can delete users
CREATE POLICY "users_delete_if_admin" ON public.users
    FOR DELETE 
    USING (public.is_admin());

-- ============================================
-- PRODUCTS TABLE POLICIES
-- ============================================

CREATE POLICY "products_select_all" ON public.products
    FOR SELECT 
    USING (true);

CREATE POLICY "products_all_if_admin" ON public.products
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- ORDERS TABLE POLICIES
-- ============================================

CREATE POLICY "orders_select_own" ON public.orders
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "orders_select_all_if_admin" ON public.orders
    FOR SELECT 
    USING (public.is_admin());

CREATE POLICY "orders_insert_own" ON public.orders
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "orders_update_if_admin" ON public.orders
    FOR UPDATE 
    USING (public.is_admin());

CREATE POLICY "orders_delete_if_admin" ON public.orders
    FOR DELETE 
    USING (public.is_admin());

-- ============================================
-- PRICING RULES TABLE POLICIES
-- ============================================

CREATE POLICY "pricing_select_all" ON public.pricing_rules
    FOR SELECT 
    USING (true);

CREATE POLICY "pricing_all_if_admin" ON public.pricing_rules
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- FAQS TABLE POLICIES
-- ============================================

CREATE POLICY "faqs_select_all" ON public.faqs
    FOR SELECT 
    USING (true);

CREATE POLICY "faqs_all_if_admin" ON public.faqs
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- REVIEWS TABLE POLICIES
-- ============================================

CREATE POLICY "reviews_select_approved" ON public.reviews
    FOR SELECT 
    USING (status = 'approved' OR public.is_admin());

CREATE POLICY "reviews_insert_auth" ON public.reviews
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reviews_update_if_admin" ON public.reviews
    FOR UPDATE 
    USING (public.is_admin());

CREATE POLICY "reviews_delete_if_admin" ON public.reviews
    FOR DELETE 
    USING (public.is_admin());

-- ============================================
-- SEO SETTINGS TABLE POLICIES
-- ============================================

CREATE POLICY "seo_select_all" ON public.seo_settings
    FOR SELECT 
    USING (true);

CREATE POLICY "seo_all_if_admin" ON public.seo_settings
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- PAYMENT SETTINGS TABLE POLICIES
-- ============================================

CREATE POLICY "payment_all_if_admin" ON public.payment_settings
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- CONTENT PAGES TABLE POLICIES
-- ============================================

CREATE POLICY "content_select_all" ON public.content_pages
    FOR SELECT 
    USING (true);

CREATE POLICY "content_all_if_admin" ON public.content_pages
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- ✅ COMPLETE! Recursion fixed!
-- ============================================
