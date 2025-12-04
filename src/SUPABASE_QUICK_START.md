# 🚀 Supabase Quick Start - 5 Minutes Setup

## Step 1: Run the SQL (2 minutes)

1. **Open this link in a new tab:**  
   https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new

2. **Open the file:** `/supabase-schema.sql` in your project

3. **Copy ALL the text** from that file (Ctrl+A, Ctrl+C)

4. **Paste it** into the Supabase SQL Editor

5. **Click the green "RUN" button**

6. **Wait** for the success message (about 10 seconds)

---

## Step 2: Verify Setup (1 minute)

1. **Open this link:**  
   https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/editor

2. **You should see 9 tables:**
   - users ✅
   - products ✅
   - orders ✅
   - pricing_rules ✅
   - faqs ✅
   - reviews ✅
   - seo_settings ✅
   - payment_settings ✅
   - content_pages ✅

3. **Click on "users" table**

4. **You should see 1 row** (the default admin user)

---

## Step 3: Test Admin Login (1 minute)

Your default admin account is ready:

**Email:** `admin@sanjariprints.com`  
**Password:** `admin123`

**⚠️ IMPORTANT:** This is the password stored in the database. You should change it after first login!

---

## Step 4: Update Your App (Optional)

You have two options:

### Option A: Keep Current System (No Code Changes)
- Your app will continue using localStorage
- Supabase is ready when you want to switch
- No immediate changes needed

### Option B: Switch to Supabase Now
Your old auth context uses localStorage.  
The new one uses Supabase backend.

**To switch:**
1. Rename `/context/AuthContext.tsx` → `/context/AuthContext.OLD.tsx`
2. Rename `/context/AuthContextSupabase.tsx` → `/context/AuthContext.tsx`
3. Update login pages to use async methods (see MIGRATION_GUIDE.md)

---

## ✅ What's Working Right Now

After running the SQL:

✅ **Database Tables:** All created with proper structure  
✅ **Security Policies:** Row Level Security enabled  
✅ **Admin Account:** Ready to use  
✅ **Sample Reviews:** 3 approved reviews in database  
✅ **Default Settings:** Payment & SEO settings initialized  

---

## 🔧 What You Can Do Next

### Immediately (No Code Changes):
1. ✅ Browse the Supabase dashboard
2. ✅ View the users table
3. ✅ Check the reviews
4. ✅ Explore the database structure
5. ✅ Add test data manually

### After Updating Code:
6. ✅ Create real user accounts
7. ✅ Place real orders
8. ✅ Admin can manage everything
9. ✅ Users can track orders
10. ✅ Reviews get saved to database

---

## 📱 Test the Integration

Once you switch to the new AuthContext:

### Create a Test User:
```
Go to your signup page
Email: test@example.com
Password: test123
Name: Test User
Phone: 9876543210
```

### Login as Admin:
```
Go to /admin/login
Email: admin@sanjariprints.com
Password: admin123
```

### Place a Test Order:
```
Login as test user
Add products to cart
Complete checkout
Check order appears in Supabase orders table
```

---

## 🎯 Key Files Reference

| File | Purpose |
|------|---------|
| `/lib/supabase.ts` | Supabase connection |
| `/supabase-schema.sql` | Database structure (RUN THIS) |
| `/context/AuthContextSupabase.tsx` | New auth system |
| `/utils/auth.ts` | Helper functions |
| `/MIGRATION_GUIDE.md` | Full migration guide |
| `/SUPABASE_INTEGRATION_SUMMARY.md` | Complete overview |

---

## ⚡ Quick Commands

### View Your Database:
```
Open: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/editor
```

### Run SQL Queries:
```
Open: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
```

### Check Logs:
```
Open: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/logs/explorer
```

### View Security Policies:
```
Open: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/policies
```

---

## 🚨 Important Security Reminder

### ✅ Safe (Already Done):
- Anon key is configured in `/lib/supabase.ts`
- This is safe for frontend code
- It respects Row Level Security

### ⚠️ Action Required:
- Rotate the service_role key you shared earlier
- Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/settings/api
- Click "Reset" next to service_role key
- This invalidates the old key

### 🔒 Never Share:
- service_role key (has full admin access)
- Keep it secret, don't put in frontend code

---

## 🎉 You're All Set!

After running Step 1 (the SQL), you have:

✅ A professional Supabase backend  
✅ Secure user authentication system  
✅ Database with proper security  
✅ Admin account ready to use  
✅ Sample data to test with  

**The integration is complete and ready!**

When you're ready to switch from localStorage to Supabase, follow the **MIGRATION_GUIDE.md**.

For now, your app will continue working exactly as before, but with a powerful Supabase backend ready to use! 🚀

---

## Need Help?

1. Check `/SUPABASE_INTEGRATION_SUMMARY.md` for full details
2. Read `/MIGRATION_GUIDE.md` for step-by-step migration
3. View `/SUPABASE_SETUP_GUIDE.md` for setup instructions
4. Look at Supabase logs if something doesn't work

**Questions?** Check the Supabase dashboard logs for any errors.
