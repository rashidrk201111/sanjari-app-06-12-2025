-- ============================================
-- 🚨 FIX INFINITE RECURSION ERROR - RUN THIS NOW!
-- ============================================
-- Copy and paste this entire file into Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
-- Then click "RUN"

-- ============================================
-- STEP 1: Create helper function (bypasses RLS)
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
-- STEP 2: Drop ALL existing policies
-- ============================================

DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'users') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.users';
    END LOOP;
END $$;

-- ============================================
-- STEP 3: Create NEW policies (no recursion!)
-- ============================================

-- Users can view their own profile
CREATE POLICY "users_select_own" ON public.users
    FOR SELECT 
    USING (auth.uid() = id);

-- Admins can view all users (uses helper function - no recursion!)
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
-- ✅ DONE! Test signup now!
-- ============================================
