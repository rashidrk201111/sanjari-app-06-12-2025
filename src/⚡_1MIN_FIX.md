# ⚡ 1-MINUTE FIX - PASSWORD_HASH ERROR

## 🎯 **THE FIX**

### **Step 1: Open Supabase SQL Editor** (10 seconds)
```
https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
```

### **Step 2: Copy & Paste This SQL** (20 seconds)
```sql
-- Make nullable first
ALTER TABLE public.users ALTER COLUMN password_hash DROP NOT NULL;

-- Drop the column
ALTER TABLE public.users DROP COLUMN IF EXISTS password_hash;
```

### **Step 3: Click "Run"** (5 seconds)

### **Step 4: Test Signup** (25 seconds)
Go to: `http://localhost:5173/signup`

Create account with:
- Name: Test User
- Email: test@example.com  
- Phone: 9876543210
- Password: Test123!@#

Click "Create Account"

---

## ✅ **EXPECTED RESULT:**

**Before:**
```
❌ Error: Could not find 'password_hash' column
```

**After:**
```
✅ Account created! Please check your email...
```

---

## 🎉 **DONE!**

**What was wrong?**
- Code tried to insert `password_hash` column
- Column doesn't exist (shouldn't exist)
- Supabase Auth handles passwords automatically

**What I fixed:**
- ✅ Removed `password_hash` from code (both signup & OAuth)
- ✅ Created SQL to remove column from database

**What you need to do:**
- ⚡ Run the 2-line SQL above
- ✅ Test signup

**Time:** 1 minute
**Result:** Signup works! ✅

---

**See full details:** `/🚨_FIX_PASSWORD_HASH_ERROR.md`
