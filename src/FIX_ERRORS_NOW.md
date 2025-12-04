# 🔧 FIX DATABASE ERRORS - DO THIS NOW

## ⚠️ Current Errors:
- ❌ Table 'public.users' not found
- ❌ Column 'faqs.order_index' does not exist
- ❌ Column 'seo_settings.page_path' does not exist
- ❌ Invalid login credentials

---

## ✅ SOLUTION (5 Minutes)

### **Step 1: Run the Fix SQL Script** (2 minutes)

1. **Open Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
   ```

2. **Copy the ENTIRE contents** of the file: `/FIX_DATABASE_SCHEMA.sql`

3. **Paste it** into the SQL Editor

4. **Click RUN** (or press Ctrl+Enter)

5. **Wait** for all queries to complete (should see green checkmarks)

---

### **Step 2: Create Admin User in Supabase Auth** (1 minute)

1. **Go to Authentication:**
   ```
   https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users
   ```

2. **Click "Add User" button** (top right)

3. **Fill in:**
   - Email: `admin@sanjariprints.com`
   - Password: `Admin@123` (or your choice)
   - Auto Confirm User: ✅ **CHECK THIS BOX**

4. **Click "Create User"**

5. **COPY the User ID** (UUID) that appears - you'll need it!
   - Example: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

---

### **Step 3: Set Admin Role in Database** (1 minute)

1. **Go to SQL Editor again:**
   ```
   https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
   ```

2. **Run this query** (replace YOUR_USER_ID with the UUID you copied):

   ```sql
   UPDATE public.users 
   SET role = 'admin' 
   WHERE id = 'YOUR_USER_ID'::uuid;
   ```

   **Example:**
   ```sql
   UPDATE public.users 
   SET role = 'admin' 
   WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid;
   ```

3. **Click RUN**

4. **Verify it worked:**
   ```sql
   SELECT id, email, name, role FROM public.users WHERE role = 'admin';
   ```

---

### **Step 4: Test Admin Login** (1 minute)

1. **Go to your app:**
   ```
   http://localhost:5173/#/admin/login
   ```

2. **Login with:**
   - Email: `admin@sanjariprints.com`
   - Password: (whatever you set in Step 2)

3. **✅ You should see the admin dashboard!**

---

## 🎯 What Just Happened?

### **The Fix:**

1. **Created `users` table** properly linked to Supabase Auth
2. **Added `order_index` column** to `faqs` table
3. **Added `page_path` column** to `seo_settings` table
4. **Set up auto-trigger** to create user profiles on signup
5. **Fixed all RLS policies** for proper permissions
6. **Created admin user** with correct role

---

## 🐛 If You Still Get Errors:

### **Error: "Invalid login credentials"**

**Solution:**
- Make sure you're using the password you set in Step 2
- Make sure "Auto Confirm User" was checked
- Try resetting password in Supabase Auth UI

---

### **Error: "Users table not found"**

**Solution:**
1. Check if SQL script ran successfully
2. Go to Table Editor: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/editor
3. You should see these tables:
   - ✅ users
   - ✅ products
   - ✅ orders
   - ✅ pricing_rules
   - ✅ faqs
   - ✅ reviews
   - ✅ seo_settings
   - ✅ payment_settings
   - ✅ content_pages

If tables are missing, run `/FIX_DATABASE_SCHEMA.sql` again.

---

### **Error: "Access denied"**

**Solution:**
1. Go to Table Editor → users table
2. Find your user
3. Make sure `role` = `admin`
4. Try logging in again

---

## ✅ Success Checklist:

- [ ] Ran `/FIX_DATABASE_SCHEMA.sql` in SQL Editor
- [ ] All tables created (check Table Editor)
- [ ] Created admin user in Auth UI
- [ ] Set role to 'admin' in users table
- [ ] Can login to admin panel
- [ ] No console errors
- [ ] Dashboard loads data from Supabase

---

## 📊 Verify Everything Works:

### **1. Check Tables Exist:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Expected tables:**
- content_pages
- faqs
- orders
- payment_settings
- pricing_rules
- products
- reviews
- seo_settings
- users

---

### **2. Check Users Table Structure:**
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users'
ORDER BY ordinal_position;
```

**Expected columns:**
- id (uuid)
- email (text)
- name (text)
- phone (text)
- role (text)
- email_verified (boolean)
- created_at (timestamp)
- updated_at (timestamp)

---

### **3. Check FAQs Table:**
```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'faqs';
```

**Must include:** `order_index`

---

### **4. Check SEO Settings Table:**
```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'seo_settings';
```

**Must include:** `page_path`

---

### **5. Check Admin User:**
```sql
SELECT id, email, name, role, email_verified 
FROM public.users 
WHERE role = 'admin';
```

**Should return:** Your admin user with role = 'admin'

---

## 🎉 Once Fixed:

After completing all steps:

1. **Refresh your app** (Ctrl+Shift+R)
2. **Login to admin panel**
3. **Check browser console** - no errors!
4. **All data loads from Supabase** ✅

---

## 💡 Important Notes:

- **The trigger is automatic:** When you create users in Supabase Auth, they automatically get a profile in the `users` table
- **Role defaults to 'user':** You must manually change to 'admin' or 'staff'
- **First time only:** This setup only needs to be done once
- **Data persists:** Everything saves to Supabase, not localStorage

---

## 📞 Quick Help:

**Still stuck?** Check these in order:

1. ✅ SQL script ran without errors?
2. ✅ Tables exist in Table Editor?
3. ✅ Admin user created in Auth?
4. ✅ Role set to 'admin' in users table?
5. ✅ Using correct password?
6. ✅ Auto Confirm was checked?

If all ✅ and still errors, check browser console for specific error message.

---

## 🚀 After Success:

Your admin system will now:
- ✅ Login with Supabase Auth
- ✅ Load all data from database
- ✅ Save changes to Supabase
- ✅ Work across all devices
- ✅ Persist data permanently

**No more localStorage! Everything is in the cloud! 🎉**
