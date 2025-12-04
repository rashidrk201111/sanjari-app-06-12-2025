-- ============================================
-- MANUAL ADMIN ACCOUNT CREATION
-- ============================================
-- Run these queries STEP BY STEP in Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
-- ============================================

-- ⚠️ IMPORTANT: You CANNOT create Supabase Auth users via SQL alone!
-- You MUST use the Supabase Dashboard UI to create the auth user first.
-- Then run the SQL below to give them admin role.

-- ============================================
-- METHOD 1: USE SUPABASE DASHBOARD (RECOMMENDED)
-- ============================================

/*
STEP 1: Create Auth User in Dashboard
--------------------------------------
1. Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users
2. Click "Add user" button (green button top right)
3. Fill in the form:
   - Email: admin@sanjariprints.com
   - Password: admin123
   - ✅ CHECK "Auto Confirm User" (IMPORTANT!)
4. Click "Create user"
5. 📋 COPY THE USER ID (UUID) - You'll need it for Step 2!

STEP 2: Run SQL Below to Create Admin Profile
----------------------------------------------
After creating the auth user above, run this SQL:
*/

-- Replace 'YOUR_USER_ID_HERE' with the UUID you copied from Step 1
-- Example UUID: 550e8400-e29b-41d4-a716-446655440000

INSERT INTO public.users (
    id,
    email,
    name,
    phone,
    password_hash,
    role,
    email_verified
) VALUES (
    'YOUR_USER_ID_HERE',  -- ⚠️ REPLACE THIS with actual UUID from Step 1
    'admin@sanjariprints.com',
    'Admin User',
    '+91 7350001266',
    'handled_by_supabase_auth',  -- Password is managed by Supabase Auth
    'admin',
    true
)
ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    email_verified = true;

-- ============================================
-- VERIFY ADMIN WAS CREATED
-- ============================================

-- Run this to check if admin exists
SELECT 
    id,
    email,
    name,
    role,
    email_verified,
    created_at
FROM public.users
WHERE role = 'admin';

-- Expected result: You should see admin@sanjariprints.com with role 'admin'

-- ============================================
-- METHOD 2: CREATE ADDITIONAL ADMINS
-- ============================================

/*
To create more admin accounts, repeat the process:

STEP 1: Create Auth User in Dashboard
1. Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users
2. Click "Add user"
3. Enter new admin details:
   - Email: secondadmin@sanjariprints.com
   - Password: YourSecurePassword123!
   - ✅ CHECK "Auto Confirm User"
4. Click "Create user"
5. 📋 COPY THE NEW USER ID

STEP 2: Run this SQL with the new user ID:
*/

INSERT INTO public.users (
    id,
    email,
    name,
    phone,
    password_hash,
    role,
    email_verified
) VALUES (
    'SECOND_USER_ID_HERE',  -- Replace with new user's UUID
    'secondadmin@sanjariprints.com',
    'Second Admin',
    '+91 9323684301',
    'handled_by_supabase_auth',
    'admin',
    true
)
ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    email_verified = true;

-- ============================================
-- CONVERT EXISTING USER TO ADMIN
-- ============================================

-- If you already have a regular user account and want to make them admin:

-- Option A: If you know their email
UPDATE public.users
SET role = 'admin'
WHERE email = 'existinguser@example.com';

-- Option B: If you know their user ID
UPDATE public.users
SET role = 'admin'
WHERE id = 'user-uuid-here';

-- ============================================
-- REMOVE ADMIN ACCESS (DEMOTE TO USER)
-- ============================================

-- To remove admin privileges from a user:
UPDATE public.users
SET role = 'user'
WHERE email = 'admin@sanjariprints.com';

-- ============================================
-- CREATE STAFF USER (LIMITED ADMIN)
-- ============================================

/*
Staff users have some admin access but not full control.

STEP 1: Create Auth User in Dashboard (same as admin creation)
STEP 2: Run this SQL:
*/

INSERT INTO public.users (
    id,
    email,
    name,
    phone,
    password_hash,
    role,
    email_verified
) VALUES (
    'STAFF_USER_ID_HERE',  -- Replace with staff user's UUID
    'staff@sanjariprints.com',
    'Staff Member',
    '+91 9876543210',
    'handled_by_supabase_auth',
    'staff',  -- Staff role instead of admin
    true
)
ON CONFLICT (id) DO UPDATE SET
    role = 'staff',
    email_verified = true;

-- ============================================
-- LIST ALL USERS BY ROLE
-- ============================================

-- View all admins
SELECT id, email, name, role, created_at
FROM public.users
WHERE role = 'admin'
ORDER BY created_at DESC;

-- View all staff
SELECT id, email, name, role, created_at
FROM public.users
WHERE role = 'staff'
ORDER BY created_at DESC;

-- View all regular users
SELECT id, email, name, role, created_at
FROM public.users
WHERE role = 'user'
ORDER BY created_at DESC;

-- View all users with role counts
SELECT 
    role,
    COUNT(*) as user_count
FROM public.users
GROUP BY role;

-- ============================================
-- TROUBLESHOOTING QUERIES
-- ============================================

-- Check if user exists in auth.users but not in public.users
-- (This means you created auth user but forgot to run the INSERT SQL)
SELECT 
    au.id,
    au.email,
    pu.id as public_user_id,
    pu.role
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

-- If you see results, it means these auth users don't have public profiles
-- Run the INSERT query above for each of them

-- Check for mismatched emails between auth.users and public.users
SELECT 
    au.id,
    au.email as auth_email,
    pu.email as public_email,
    pu.role
FROM auth.users au
INNER JOIN public.users pu ON au.id = pu.id
WHERE au.email != pu.email;

-- Delete a user completely (both auth and public)
-- ⚠️ WARNING: This is irreversible!
-- First delete from public.users
DELETE FROM public.users WHERE email = 'user-to-delete@example.com';
-- Then delete from Supabase Dashboard > Authentication > Users

-- ============================================
-- SECURITY BEST PRACTICES
-- ============================================

/*
✅ DO:
- Use strong passwords (12+ characters, mixed case, numbers, symbols)
- Change default admin password immediately
- Use unique email for each admin
- Regularly review admin users (run "View all admins" query)
- Enable 2FA in Supabase if available
- Use "Auto Confirm User" when creating admins (to skip email verification)

❌ DON'T:
- Use weak passwords like "admin123" in production
- Share admin credentials
- Create multiple admins with same email
- Leave default passwords unchanged
- Grant admin access unnecessarily

🔒 PRODUCTION CHECKLIST:
1. Change default admin password
2. Create personal admin account
3. Delete or disable default admin
4. Review all users with admin/staff roles
5. Set up monitoring for admin actions
*/

-- ============================================
-- QUICK REFERENCE
-- ============================================

/*
╔════════════════════════════════════════════════════════════╗
║                    ADMIN CREATION STEPS                     ║
╠════════════════════════════════════════════════════════════╣
║ 1. Create Auth User in Dashboard                           ║
║    → https://supabase.com/.../auth/users                   ║
║    → Click "Add user"                                       ║
║    → Enter email, password                                  ║
║    → ✅ Check "Auto Confirm User"                          ║
║    → Copy User ID (UUID)                                    ║
║                                                             ║
║ 2. Run INSERT SQL (see above)                              ║
║    → Replace 'YOUR_USER_ID_HERE' with copied UUID          ║
║    → Set role = 'admin'                                     ║
║    → Execute query                                          ║
║                                                             ║
║ 3. Verify                                                   ║
║    → Run verification query                                 ║
║    → Check email, role are correct                          ║
║                                                             ║
║ 4. Test Login                                               ║
║    → Go to /admin/login                                     ║
║    → Use email and password                                 ║
║    → Should access admin dashboard ✅                       ║
╚════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════╗
║                       USER ROLES                            ║
╠════════════════════════════════════════════════════════════╣
║ admin  → Full access to admin dashboard & all features     ║
║ staff  → Limited admin access (orders, content)            ║
║ user   → Regular customer, no admin access                 ║
╚════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════╗
║                     IMPORTANT LINKS                         ║
╠════════════════════════════════════════════════════════════╣
║ Supabase Dashboard                                          ║
║ → https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl ║
║                                                             ║
║ Create Auth Users                                           ║
║ → .../auth/users                                            ║
║                                                             ║
║ Run SQL Queries                                             ║
║ → .../sql/new                                               ║
║                                                             ║
║ View Users Table                                            ║
║ → .../editor?table=users                                    ║
║                                                             ║
║ Admin Login Page                                            ║
║ → /admin/login                                              ║
╚════════════════════════════════════════════════════════════╝
*/

-- ============================================
-- END OF MANUAL ADMIN CREATION GUIDE
-- ============================================

-- Summary:
-- 1. You MUST create auth users in Supabase Dashboard UI first
-- 2. Then run INSERT SQL to add them to public.users with admin role
-- 3. Verify with SELECT queries
-- 4. Test login at /admin/login
-- 5. Change default passwords immediately!

-- Questions? Check the detailed guides:
-- - ADMIN_ACCOUNT_SETUP.md (complete guide)
-- - ADMIN_QUICK_SETUP.md (quick reference)
-- - CREDENTIAL_CLEANUP_SUMMARY.md (what was changed)
