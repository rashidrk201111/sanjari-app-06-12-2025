-- ============================================
-- 🔥 FINAL FIX FOR SIGNUP RLS POLICY ERROR
-- ============================================
-- Copy ALL of this and paste into Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
-- Then click "RUN"

-- ============================================
-- STEP 1: Drop ALL INSERT policies on users table
-- ============================================

DROP POLICY IF EXISTS "users_insert_if_admin" ON public.users;
DROP POLICY IF EXISTS "users_insert_own" ON public.users;
DROP POLICY IF EXISTS "Users can create own account" ON public.users;
DROP POLICY IF EXISTS "Allow user signup" ON public.users;

-- ============================================
-- STEP 2: Create ONE comprehensive INSERT policy
-- This allows BOTH:
-- - Users to insert their OWN profile (during signup)
-- - Admins to insert ANY user (from admin dashboard)
-- ============================================

CREATE POLICY "users_insert" ON public.users
    FOR INSERT 
    WITH CHECK (
        -- Allow if user is inserting their own profile
        (auth.uid() = id)
        OR
        -- OR if user is an admin
        (public.is_admin())
    );

-- ============================================
-- VERIFICATION - Check the policy was created
-- ============================================

SELECT 
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename = 'users'
  AND cmd = 'INSERT';

-- ============================================
-- ✅ DONE! Now test signup!
-- ============================================
-- You should see ONE policy called "users_insert"
-- It allows both self-signup and admin-created users
--
-- Test at: http://localhost:5173/signup
-- ============================================
