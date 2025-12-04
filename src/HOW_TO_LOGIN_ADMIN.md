# 🔐 How to Login as Admin - Quick Guide

## ⚡ TL;DR - Admin Login Credentials

```
🌐 Admin Panel URL: /admin/login

📧 Email: admin@sanjariprints.com
🔑 Password: admin123

⚠️ IMPORTANT: Change this password after first login!
```

---

## 🚀 Quick Steps

1. **Go to Admin Login Page:**
   ```
   http://localhost:5173/#/admin/login
   ```

2. **Enter Credentials:**
   ```
   Email: admin@sanjariprints.com
   Password: admin123
   ```

3. **Click "Sign In"**

4. **✅ You're in the Admin Dashboard!**

---

## 🤔 Wait... Does the Admin Account Exist?

### **Check if Admin Exists:**

**Option 1: Quick SQL Check**
```sql
-- Run in Supabase SQL Editor
SELECT email, name, role 
FROM public.users 
WHERE role = 'admin';
```

**Option 2: Try to Login**
- If login works → Admin exists ✅
- If login fails → Need to create admin ❌

---

## 🆘 Admin Doesn't Exist? Create It Now!

### **Super Fast Method: Promote Existing User (30 seconds)**

Already have a regular user account? Make yourself admin:

```sql
-- Replace with YOUR email
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'your@email.com';
```

Then login at `/admin/login` with your existing password! ✅

---

### **Full Method: Create New Admin (2 minutes)**

#### **Step 1: Create Auth User in Supabase**
```
1. Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users
2. Click "Add user" button
3. Fill in:
   - Email: admin@sanjariprints.com
   - Password: admin123
4. ✅ Check "Auto Confirm User"
5. Click "Create user"
6. 📋 Copy the User ID (UUID)
```

#### **Step 2: Add to Users Table**
```sql
-- Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
-- Replace 'YOUR_USER_ID_HERE' with UUID from Step 1

INSERT INTO public.users (
    id,
    email,
    name,
    phone,
    password_hash,
    role,
    email_verified
) VALUES (
    'YOUR_USER_ID_HERE',  -- Paste UUID here
    'admin@sanjariprints.com',
    'Admin User',
    '+91 7350001266',
    'handled_by_supabase_auth',
    'admin',
    true
);
```

#### **Step 3: Login**
```
URL: /admin/login
Email: admin@sanjariprints.com
Password: admin123
```

✅ **Done! You're now logged in as admin!**

---

## 🎯 All Available Login Credentials

### **👑 Admin Account**
```
URL: /admin/login
Email: admin@sanjariprints.com
Password: admin123
Access: Full admin dashboard
```

### **👤 Regular User Accounts**
```
URL: /login

Option 1:
Email: demo@sanjariprints.com
Password: demo123

Option 2:
Email: test@example.com
Password: test123

Option 3:
Phone: 9876543210
Password: demo123
```

---

## 🔒 Security Best Practices

### **⚠️ After First Login - Change Password Immediately!**

**Method 1: Via Admin Dashboard**
```
1. Login to admin panel
2. Go to "User Management" tab
3. Find admin@sanjariprints.com
4. Click "Edit"
5. Change password
6. Click "Save"
```

**Method 2: Via Supabase Dashboard**
```
1. Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users
2. Find admin@sanjariprints.com
3. Click "..." menu → "Reset Password"
4. Enter new strong password
5. Save
```

**Strong Password Guidelines:**
- ✅ At least 12 characters
- ✅ Mix of uppercase and lowercase
- ✅ Include numbers
- ✅ Include special characters (!@#$%^&*)
- ✅ Example: `Admin@Sanjari2025!`

---

## 📊 Admin Dashboard Features

After logging in, you'll have access to:

### **1. Content Management**
- Manage homepage sections
- Edit FAQs
- Update company information

### **2. Pricing Rules**
- Configure product pricing
- Set category-specific rules
- Manage discounts

### **3. Order Management**
- View all orders
- Update order status
- Track deliveries
- Manage order details

### **4. User Management**
- View all users
- Edit user details
- Change user roles (user/staff/admin)
- Manage user access

### **5. Staff Management**
- Add/remove staff members
- Assign roles and permissions
- View staff activity

### **6. Reviews & Testimonials**
- Approve/reject reviews
- Manage testimonials
- Respond to feedback

### **7. SEO Settings**
- Configure meta tags
- Set page titles and descriptions
- Manage keywords
- Update Open Graph images

### **8. Payment Settings**
- Configure Razorpay
- Set up PhonePe
- Manage payment gateways
- View API keys (securely)

---

## 🔍 Troubleshooting

### **Problem: "Invalid credentials"**

**Solutions:**
1. **Check if admin exists:**
   ```sql
   SELECT * FROM public.users WHERE email = 'admin@sanjariprints.com';
   ```
   - If empty → Admin doesn't exist, create it
   - If exists → Check password

2. **Check auth user exists:**
   ```
   Supabase Dashboard → Auth → Users
   Look for admin@sanjariprints.com
   ```
   - If missing → Create auth user
   - If exists → Password might be wrong

3. **Reset password:**
   ```
   Supabase Dashboard → Auth → Users → admin@sanjariprints.com
   Click "..." → "Reset Password"
   ```

---

### **Problem: "Role is not admin"**

**Solution:**
```sql
-- Ensure role is set to 'admin'
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@sanjariprints.com';
```

---

### **Problem: "User not found"**

**Solution:**
You need to create the admin account. Follow the "Full Method" above.

---

### **Problem: "Foreign key constraint error"**

**Solution:**
Auth user doesn't exist. Create it first in Supabase Dashboard, then run the SQL.

---

## 📋 Complete Setup Checklist

- [ ] **Check if admin exists** (run SQL query)
- [ ] **Create auth user** (if needed)
- [ ] **Add to users table** (if needed)
- [ ] **Test login** at `/admin/login`
- [ ] **Access admin dashboard** successfully
- [ ] **Change default password** immediately
- [ ] **Create additional admin/staff** accounts (optional)
- [ ] **Set up security settings**

---

## 📚 Related Documentation

```
Need more details? Check these files:

├── START_HERE_ADMIN.md ................... Quick admin setup
├── ADMIN_QUICK_SETUP.md .................. 2-minute guide
├── STEP_BY_STEP_ADMIN_SETUP.md ........... Detailed walkthrough
├── MANUAL_ADMIN_CREATION.sql ............. SQL queries
├── ADMIN_ACCOUNT_SETUP.md ................ Complete guide
├── ADMIN_DASHBOARD_GUIDE.md .............. Dashboard features
├── DEMO_CREDENTIALS.md ................... All test accounts
└── YES_RUN_MANUALLY.md ................... Why manual setup
```

---

## 🎯 Quick Decision Tree

```
Do you have an existing user account?
│
├─ YES → Run: UPDATE public.users SET role = 'admin' WHERE email = 'your@email.com';
│        Then login at /admin/login with your password
│        ✅ FASTEST METHOD!
│
└─ NO  → Does admin@sanjariprints.com exist in database?
         │
         ├─ YES → Try login with admin123
         │        │
         │        ├─ Works? → ✅ You're done! Change password.
         │        └─ Fails? → Reset password in Supabase
         │
         └─ NO  → Follow "Full Method" to create admin account
                  ⏱️ Takes 2 minutes
```

---

## 🎉 Summary

**Fastest Way:**
```bash
# If you already have a user account:
1. Run SQL: UPDATE public.users SET role = 'admin' WHERE email = 'your@email.com';
2. Login at /admin/login
3. Done! ✅ (30 seconds)
```

**Standard Way:**
```bash
# If admin@sanjariprints.com doesn't exist:
1. Create auth user in Supabase Dashboard
2. Run SQL to add to users table
3. Login at /admin/login
4. Done! ✅ (2 minutes)
```

**Try First:**
```bash
# Just try logging in:
Email: admin@sanjariprints.com
Password: admin123

If it works → ✅ You're golden!
If it fails → Follow one of the methods above
```

---

## 🚀 Next Steps After Login

1. ✅ **Change password** (Security first!)
2. ✅ **Explore admin dashboard** (Familiarize yourself)
3. ✅ **Create staff accounts** (If you have team members)
4. ✅ **Configure pricing rules** (Set up your products)
5. ✅ **Set up SEO settings** (Optimize for search)
6. ✅ **Configure payment gateways** (Razorpay/PhonePe)
7. ✅ **Test complete workflow** (Place a test order)

---

**Last Updated:** December 2024  
**Version:** 2.0

---

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  🎯 QUICK START:                                         ║
║                                                           ║
║  1. Go to: /admin/login                                  ║
║  2. Email: admin@sanjariprints.com                       ║
║  3. Password: admin123                                    ║
║  4. Click "Sign In"                                       ║
║                                                           ║
║  If it works → ✅ Change password immediately!           ║
║  If it fails → Read "Admin Doesn't Exist?" section       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```
