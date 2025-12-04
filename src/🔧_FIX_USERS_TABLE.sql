-- 🔧 FIX USERS TABLE - REMOVE password_hash COLUMN
-- Run this in Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new

-- ============================================
-- PROBLEM:
-- The 'password_hash' column is NOT NEEDED because:
-- 1. Supabase Auth handles password hashing automatically
-- 2. Passwords are stored securely in auth.users (internal table)
-- 3. Our public.users table only stores profile data
-- ============================================

-- SOLUTION: Drop the password_hash column
-- ============================================

-- Step 1: Make password_hash nullable (if it has NOT NULL constraint)
ALTER TABLE public.users 
ALTER COLUMN password_hash DROP NOT NULL;

-- Step 2: Drop the password_hash column completely
ALTER TABLE public.users 
DROP COLUMN IF EXISTS password_hash;

-- ============================================
-- VERIFICATION
-- ============================================

-- Check the updated table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'users'
ORDER BY ordinal_position;

-- ============================================
-- SUCCESS!
-- ============================================
-- Now your users table should have:
-- - id (UUID, PK)
-- - email (TEXT, NOT NULL, UNIQUE)
-- - name (TEXT, NOT NULL)
-- - phone (TEXT, nullable)
-- - role (TEXT, NOT NULL, default 'user')
-- - email_verified (BOOLEAN, default false)
-- - created_at (TIMESTAMP)
-- - updated_at (TIMESTAMP)
-- ============================================

-- ✅ DONE! Signup and login should now work!
