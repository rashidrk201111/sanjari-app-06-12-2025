-- ============================================
-- 🎯 FIX SIGNUP ERROR - ALLOW USERS TO CREATE THEIR OWN PROFILE
-- ============================================
-- Copy and paste this into Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
-- Then click "RUN"

-- ============================================
-- Drop the old INSERT policy that only allows admins
-- ============================================

DROP POLICY IF EXISTS "users_insert_if_admin" ON public.users;

-- ============================================
-- Create NEW INSERT policies
-- ============================================

-- Users can insert their OWN profile during signup
-- This is CRITICAL for signup to work!
CREATE POLICY "users_insert_own" ON public.users
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Admins can also insert users (for admin dashboard)
CREATE POLICY "users_insert_if_admin" ON public.users
    FOR INSERT 
    WITH CHECK (public.is_admin());

-- ============================================
-- ✅ DONE! Now test signup!
-- ============================================
-- Go to: http://localhost:5173/signup
-- Create an account and it should work!
-- ============================================
