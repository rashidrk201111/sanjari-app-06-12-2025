-- ============================================
-- ✅ VERIFICATION SCRIPT
-- ============================================
-- Run this AFTER you've run the two fix files
-- to verify everything is set up correctly
--
-- Paste this into Supabase SQL Editor and click RUN
-- ============================================

-- Check 1: Verify is_admin() function exists
SELECT 
    '✅ Check 1: is_admin() function' as check_name,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'is_admin') 
        THEN '✅ PASS - Function exists'
        ELSE '❌ FAIL - Function missing! Run 🆘_ULTIMATE_SIGNUP_FIX.sql'
    END as result;

-- Check 2: Verify create_user_profile() function exists
SELECT 
    '✅ Check 2: create_user_profile() function' as check_name,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'create_user_profile') 
        THEN '✅ PASS - Function exists'
        ELSE '❌ FAIL - Function missing! Run 🔧_ALTERNATIVE_SIGNUP_FIX.sql'
    END as result;

-- Check 3: Count policies on users table
SELECT 
    '✅ Check 3: Users table policies' as check_name,
    CASE 
        WHEN COUNT(*) >= 6 
        THEN '✅ PASS - ' || COUNT(*) || ' policies found'
        ELSE '❌ FAIL - Only ' || COUNT(*) || ' policies. Need 6! Run 🆘_ULTIMATE_SIGNUP_FIX.sql'
    END as result
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';

-- Check 4: Verify INSERT policy exists
SELECT 
    '✅ Check 4: INSERT policy' as check_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE tablename = 'users' 
            AND schemaname = 'public' 
            AND cmd = 'INSERT'
        ) 
        THEN '✅ PASS - INSERT policy exists'
        ELSE '❌ FAIL - No INSERT policy! Run 🆘_ULTIMATE_SIGNUP_FIX.sql'
    END as result;

-- Check 5: Verify RLS is enabled
SELECT 
    '✅ Check 5: RLS enabled on users table' as check_name,
    CASE 
        WHEN relrowsecurity 
        THEN '✅ PASS - RLS is enabled'
        ELSE '❌ FAIL - RLS is disabled'
    END as result
FROM pg_class 
WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');

-- ============================================
-- DETAILED POLICY LIST
-- ============================================
SELECT 
    '📋 DETAILED POLICY LIST' as section,
    '' as spacer;

SELECT 
    policyname,
    cmd,
    CASE 
        WHEN roles = '{authenticated}' THEN 'authenticated users'
        WHEN roles IS NULL THEN 'all roles'
        ELSE roles::text
    END as applies_to
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename = 'users'
ORDER BY cmd, policyname;

-- ============================================
-- ✅ RESULTS GUIDE
-- ============================================
-- All checks should show: ✅ PASS
-- 
-- Policy list should include:
-- 1. users_delete_admin (DELETE)
-- 2. users_insert_authenticated (INSERT) ← Most important!
-- 3. users_select_admin (SELECT)
-- 4. users_select_own (SELECT)
-- 5. users_update_admin (UPDATE)
-- 6. users_update_own (UPDATE)
--
-- If any check fails, run the corresponding SQL file mentioned in the error.
-- ============================================
