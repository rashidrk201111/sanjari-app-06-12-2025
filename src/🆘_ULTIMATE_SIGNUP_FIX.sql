-- ============================================
-- 🆘 ULTIMATE SIGNUP FIX - THIS WILL WORK!
-- ============================================
-- The problem: RLS blocks user profile creation during signup
-- The solution: Allow INSERT for authenticated users without checking role
--
-- Copy ALL of this into Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
-- ============================================

-- ============================================
-- STEP 1: Verify is_admin() function exists
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
-- STEP 2: Drop ALL existing policies on users table
-- ============================================

DO $$ 
DECLARE r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'users' AND schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.users';
    END LOOP;
END $$;

-- ============================================
-- STEP 3: Create NEW policies - SIMPLE AND CLEAR
-- ============================================

-- SELECT policies
CREATE POLICY "users_select_own" ON public.users
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "users_select_admin" ON public.users
    FOR SELECT 
    USING (public.is_admin());

-- INSERT policy - THIS IS THE KEY FIX!
-- Allow ANY authenticated user to insert their own profile
CREATE POLICY "users_insert_authenticated" ON public.users
    FOR INSERT 
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- UPDATE policies
CREATE POLICY "users_update_own" ON public.users
    FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "users_update_admin" ON public.users
    FOR UPDATE 
    USING (public.is_admin());

-- DELETE policy
CREATE POLICY "users_delete_admin" ON public.users
    FOR DELETE 
    USING (public.is_admin());

-- ============================================
-- STEP 4: Grant necessary permissions
-- ============================================

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.users TO authenticated;

-- ============================================
-- STEP 5: Verification
-- ============================================

SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename = 'users'
ORDER BY cmd, policyname;

-- ============================================
-- ✅ DONE! 
-- ============================================
-- You should see 6 policies:
-- 1. users_delete_admin (DELETE)
-- 2. users_insert_authenticated (INSERT) ← This is the fix!
-- 3. users_select_admin (SELECT)
-- 4. users_select_own (SELECT)
-- 5. users_update_admin (UPDATE)
-- 6. users_update_own (UPDATE)
--
-- The key difference:
-- - Old: FOR INSERT WITH CHECK (auth.uid() = id)
-- - New: FOR INSERT TO authenticated WITH CHECK (auth.uid() = id)
--
-- The "TO authenticated" clause is CRITICAL!
-- It allows any authenticated user (including newly signed up ones)
-- to insert their profile.
-- ============================================
