# 🚀 Admin Account - Quick Setup (2 Minutes)

## ✅ Option 1: Use Default Admin (Fastest - 30 seconds)

**Already created by your SQL schema!**

```
Email:    admin@sanjariprints.com
Password: admin123
```

**Steps:**
1. Go to: `/admin/login`
2. Enter above credentials
3. Click "Sign In"
4. ✅ You're in!
5. ⚠️ Change password immediately!

---

## 🆕 Option 2: Create Your Own Admin (2 minutes)

### Step 1: Create Auth User (1 minute)
Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users

1. Click **"Add user"** button
2. Fill in:
   - Email: `your@email.com`
   - Password: `YourSecurePass123!`
3. ✅ Check **"Auto Confirm User"**
4. Click **"Create user"**
5. 📋 **Copy the User ID** (long UUID string)

### Step 2: Run SQL (1 minute)
Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new

**Copy this, replace YOUR_USER_ID_HERE, then run:**

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
    'YOUR_USER_ID_HERE',
    'your@email.com',
    'Your Name',
    '+919876543210',
    'handled_by_supabase_auth',
    'admin',
    true
);
```

### Step 3: Login
1. Go to: `/admin/login`
2. Use your email and password
3. ✅ Done!

---

## 🔄 Change Admin Password

### Method 1: In Admin Dashboard
1. Login to admin panel
2. Go to: **User Management** tab
3. Find your admin user
4. Click **"Edit"** button
5. Enter new password
6. Click **"Save"**

### Method 2: In Supabase
1. Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users
2. Find your admin user
3. Click **"..."** menu → **"Reset Password"**
4. Enter new password
5. Save

---

## 📊 Verify Admin Exists

Run this SQL to check:

```sql
SELECT email, name, role 
FROM public.users 
WHERE role = 'admin';
```

You should see:
- `admin@sanjariprints.com` (default)
- Your custom admin (if created)

---

## 🔐 Security Tips

✅ **DO:**
- Use strong passwords (12+ characters)
- Mix upper, lower, numbers, symbols
- Change default password immediately
- Keep credentials private

❌ **DON'T:**
- Use "admin123" in production
- Share admin access
- Use simple passwords

---

## 🆘 Problems?

### "Invalid credentials"
- Double-check email and password
- Try default admin first
- Clear browser cache

### "Can't create admin"
- Make sure you copied full User ID
- Check SQL query has no typos
- Verify auth user was created first

### "Access denied"
- Check role is 'admin' not 'user'
- Run verify query above
- Try logging out and back in

---

## 📱 Quick Links

| What | Link |
|------|------|
| Admin Login | `/admin/login` |
| Create Auth User | [Supabase Auth](https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users) |
| Run SQL | [SQL Editor](https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new) |
| View Users Table | [Table Editor](https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/editor?table=users) |

---

## ✅ Summary

**Credential displays removed:** ✅  
**Default admin exists:** ✅ `admin@sanjariprints.com` / `admin123`  
**Can create custom admin:** ✅ See Option 2 above  
**Admin dashboard ready:** ✅ Access at `/admin/login`

---

**Ready to go! Try logging in now!** 🚀

**Full details in:** `ADMIN_ACCOUNT_SETUP.md`
