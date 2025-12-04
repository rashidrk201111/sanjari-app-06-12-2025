# 🔐 Admin Account Setup Guide

## Option 1: Use Existing Admin (Already Created by Schema)

Your SQL schema already created a default admin account!

**Default Admin Credentials:**
- Email: `admin@sanjariprints.com`
- Password: `admin123`

**⚠️ IMPORTANT:** Change this password immediately after first login!

---

## Option 2: Create New Admin Account via SQL

If you want to create a **new admin account**, follow these steps:

### Step 1: Create Supabase Auth User

1. Go to your **Supabase Dashboard**
2. Navigate to: **Authentication → Users**
3. Click **"Add user"** button
4. Fill in:
   - **Email:** `youremail@sanjariprints.com`
   - **Password:** `YourSecurePassword123!`
   - Check **"Auto Confirm User"** (so you don't need email verification)
5. Click **"Create user"**
6. **Copy the User ID** (you'll need it for Step 2)

### Step 2: Run SQL Query to Create Admin Profile

Go to **SQL Editor** in Supabase and run this query:

```sql
-- Replace 'YOUR_USER_ID_HERE' with the UUID you copied from Step 1
-- Replace email, name, phone with your actual details

INSERT INTO public.users (
    id,
    email,
    name,
    phone,
    password_hash,
    role,
    email_verified
) VALUES (
    'YOUR_USER_ID_HERE',  -- Paste the UUID from Step 1 here
    'youremail@sanjariprints.com',  -- Your email
    'Your Name',  -- Your name
    '+919876543210',  -- Your phone (optional)
    'handled_by_supabase_auth',  -- Leave this as is
    'admin',  -- This makes you an admin
    true  -- Email verified
);
```

**Example with real values:**
```sql
INSERT INTO public.users (
    id,
    email,
    name,
    phone,
    password_hash,
    role,
    email_verified
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',  -- Your actual UUID
    'john@sanjariprints.com',
    'John Doe',
    '+919876543210',
    'handled_by_supabase_auth',
    'admin',
    true
);
```

### Step 3: Test Your New Admin Login

1. Go to `/admin/login`
2. Login with your new credentials
3. You should access the admin dashboard! ✅

---

## Option 3: Quick Admin Creation (All-in-One Query)

If you want Supabase to handle everything, use this advanced query:

```sql
-- This creates both auth user and profile in one go
-- Replace email, password, name, phone with your details

DO $$
DECLARE
    new_user_id UUID;
BEGIN
    -- Note: You'll still need to create the auth user manually first
    -- This query only creates the profile in public.users
    
    -- Replace this with the actual user ID from Supabase Auth
    new_user_id := 'YOUR_USER_ID_HERE';
    
    INSERT INTO public.users (
        id,
        email,
        name,
        phone,
        password_hash,
        role,
        email_verified
    ) VALUES (
        new_user_id,
        'admin@yourdomain.com',
        'Admin User',
        '+919876543210',
        'handled_by_supabase_auth',
        'admin',
        true
    )
    ON CONFLICT (id) DO UPDATE SET
        role = 'admin';
END $$;
```

---

## Verify Admin Account

Check if admin exists:

```sql
-- Check all admin users
SELECT id, email, name, role, created_at 
FROM public.users 
WHERE role = 'admin';
```

---

## Change Admin Password

### Method 1: Via Admin Dashboard (Recommended)
1. Login to admin panel
2. Go to **User Management** tab
3. Find your admin user
4. Click **"Edit"**
5. Change password
6. Save

### Method 2: Via Supabase Dashboard
1. Go to **Authentication → Users**
2. Find your admin user
3. Click the **"..."** menu
4. Select **"Reset Password"**
5. Enter new password
6. Save

---

## Create Multiple Admin Accounts

You can have multiple admins! Just repeat the steps above for each admin.

**Example: Create a second admin**

```sql
-- Step 1: Create auth user in Supabase Dashboard first
-- Step 2: Run this SQL with the new user's ID

INSERT INTO public.users (
    id,
    email,
    name,
    phone,
    password_hash,
    role,
    email_verified
) VALUES (
    'SECOND_USER_ID_HERE',
    'admin2@sanjariprints.com',
    'Second Admin',
    '+919876543211',
    'handled_by_supabase_auth',
    'admin',
    true
);
```

---

## Convert Existing User to Admin

If you have a regular user account and want to make them admin:

```sql
-- Replace with the user's email
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'user@sanjariprints.com';
```

---

## Role Types

Your system supports 3 roles:

| Role | Access Level |
|------|-------------|
| `admin` | Full access to admin dashboard, all features |
| `staff` | Limited admin access (can be customized) |
| `user` | Regular customer, no admin access |

---

## Security Best Practices

✅ **DO:**
- Use strong passwords (min 12 characters, mix of upper/lower/numbers/symbols)
- Change default `admin123` password immediately
- Use unique emails for each admin
- Enable 2FA in Supabase (if available)
- Regularly review admin user list

❌ **DON'T:**
- Use simple passwords like "admin123" in production
- Share admin credentials
- Create admins with public email addresses
- Leave default accounts unchanged

---

## Troubleshooting

### "Invalid credentials" error
- Make sure you created the auth user in Supabase Authentication first
- Check that the user ID in `public.users` matches the auth user ID
- Verify the email matches exactly (case-sensitive)

### "Access denied" error
- Check the `role` field is set to `'admin'` (not `'user'`)
- Run the verify query to check role

### Can't login to admin panel
- Clear browser cache
- Try incognito/private browsing
- Check browser console for errors

---

## Quick Reference

| Task | Where |
|------|-------|
| Create auth user | Supabase Dashboard → Authentication → Users |
| Run SQL queries | Supabase Dashboard → SQL Editor |
| Check users table | Supabase Dashboard → Table Editor → users |
| Admin login page | `/admin/login` |
| Change password | Admin Dashboard → User Management |

---

## Summary

**Easiest Method:**
1. Use the default admin: `admin@sanjariprints.com` / `admin123`
2. Login to admin panel
3. Change password immediately

**Custom Admin:**
1. Create auth user in Supabase Dashboard
2. Copy the user ID
3. Run SQL INSERT query with user ID
4. Login with your credentials

---

**Need help? Check the troubleshooting section or create a GitHub issue!** 🚀
