-- ============================================
-- FIX INFINITE RECURSION ERROR
-- ============================================
-- Run this in Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new

-- ============================================
-- DROP ALL EXISTING POLICIES TO START FRESH
-- ============================================

-- Drop users policies
DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "users_select_admin" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;
DROP POLICY IF EXISTS "users_update_admin" ON public.users;
DROP POLICY IF EXISTS "users_insert_admin" ON public.users;
DROP POLICY IF EXISTS "users_delete_admin" ON public.users;

-- Drop products policies
DROP POLICY IF EXISTS "products_select_all" ON public.products;
DROP POLICY IF EXISTS "products_all_admin" ON public.products;

-- Drop orders policies
DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
DROP POLICY IF EXISTS "orders_select_admin" ON public.orders;
DROP POLICY IF EXISTS "orders_insert_own" ON public.orders;
DROP POLICY IF EXISTS "orders_update_admin" ON public.orders;

-- Drop pricing_rules policies
DROP POLICY IF EXISTS "pricing_select_all" ON public.pricing_rules;
DROP POLICY IF EXISTS "pricing_all_admin" ON public.pricing_rules;

-- Drop faqs policies
DROP POLICY IF EXISTS "faqs_select_all" ON public.faqs;
DROP POLICY IF EXISTS "faqs_all_admin" ON public.faqs;

-- Drop reviews policies
DROP POLICY IF EXISTS "reviews_select_approved" ON public.reviews;
DROP POLICY IF EXISTS "reviews_select_admin" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert_auth" ON public.reviews;
DROP POLICY IF EXISTS "reviews_all_admin" ON public.reviews;

-- Drop seo_settings policies
DROP POLICY IF EXISTS "seo_select_all" ON public.seo_settings;
DROP POLICY IF EXISTS "seo_all_admin" ON public.seo_settings;

-- Drop payment_settings policies
DROP POLICY IF EXISTS "payment_all_admin" ON public.payment_settings;

-- Drop content_pages policies
DROP POLICY IF EXISTS "content_select_all" ON public.content_pages;
DROP POLICY IF EXISTS "content_all_admin" ON public.content_pages;

-- ============================================
-- CREATE HELPER FUNCTION TO CHECK IF USER IS ADMIN
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
-- CREATE NEW POLICIES WITHOUT RECURSION
-- ============================================

-- ============================================
-- USERS TABLE POLICIES (Fixed - No Recursion)
-- ============================================

-- Anyone can view their own profile
CREATE POLICY "users_select_own" ON public.users
    FOR SELECT 
    USING (auth.uid() = id);

-- Admins can view all users (uses security definer function)
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

-- Admins can insert users (for staff creation)
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

-- Anyone can view products
CREATE POLICY "products_select_all" ON public.products
    FOR SELECT 
    USING (true);

-- Admins can manage products
CREATE POLICY "products_all_if_admin" ON public.products
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- ORDERS TABLE POLICIES
-- ============================================

-- Users can view their own orders
CREATE POLICY "orders_select_own" ON public.orders
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Admins can view all orders
CREATE POLICY "orders_select_all_if_admin" ON public.orders
    FOR SELECT 
    USING (public.is_admin());

-- Authenticated users can create their own orders
CREATE POLICY "orders_insert_own" ON public.orders
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Admins can update orders
CREATE POLICY "orders_update_if_admin" ON public.orders
    FOR UPDATE 
    USING (public.is_admin());

-- Admins can delete orders
CREATE POLICY "orders_delete_if_admin" ON public.orders
    FOR DELETE 
    USING (public.is_admin());

-- ============================================
-- PRICING RULES TABLE POLICIES
-- ============================================

-- Anyone can view pricing rules
CREATE POLICY "pricing_select_all" ON public.pricing_rules
    FOR SELECT 
    USING (true);

-- Admins can manage pricing rules
CREATE POLICY "pricing_all_if_admin" ON public.pricing_rules
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- FAQS TABLE POLICIES
-- ============================================

-- Anyone can view FAQs
CREATE POLICY "faqs_select_all" ON public.faqs
    FOR SELECT 
    USING (true);

-- Admins can manage FAQs
CREATE POLICY "faqs_all_if_admin" ON public.faqs
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- REVIEWS TABLE POLICIES
-- ============================================

-- Anyone can view approved reviews
CREATE POLICY "reviews_select_approved" ON public.reviews
    FOR SELECT 
    USING (status = 'approved' OR public.is_admin());

-- Authenticated users can create reviews
CREATE POLICY "reviews_insert_auth" ON public.reviews
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Admins can manage all reviews
CREATE POLICY "reviews_update_if_admin" ON public.reviews
    FOR UPDATE 
    USING (public.is_admin());

CREATE POLICY "reviews_delete_if_admin" ON public.reviews
    FOR DELETE 
    USING (public.is_admin());

-- ============================================
-- SEO SETTINGS TABLE POLICIES
-- ============================================

-- Anyone can view SEO settings
CREATE POLICY "seo_select_all" ON public.seo_settings
    FOR SELECT 
    USING (true);

-- Admins can manage SEO settings
CREATE POLICY "seo_all_if_admin" ON public.seo_settings
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- PAYMENT SETTINGS TABLE POLICIES
-- ============================================

-- Admins can manage payment settings
CREATE POLICY "payment_all_if_admin" ON public.payment_settings
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- CONTENT PAGES TABLE POLICIES
-- ============================================

-- Anyone can view content pages
CREATE POLICY "content_select_all" ON public.content_pages
    FOR SELECT 
    USING (true);

-- Admins can manage content pages
CREATE POLICY "content_all_if_admin" ON public.content_pages
    FOR ALL 
    USING (public.is_admin());

-- ============================================
-- ✅ RECURSION FIX COMPLETE!
-- ============================================
-- The is_admin() function uses SECURITY DEFINER which bypasses RLS
-- This prevents the infinite recursion problem
