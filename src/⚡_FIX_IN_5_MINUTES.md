# ⚡ FIX ERRORS IN 5 MINUTES

## 🔥 **DO THESE 3 STEPS:**

---

### **1️⃣ RUN SQL SCRIPT** (2 min)

```
1. Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
2. Open file: /FIX_DATABASE_SCHEMA.sql
3. Copy ALL text
4. Paste in SQL Editor
5. Click RUN
6. Wait for green checkmarks ✅
```

---

### **2️⃣ CREATE ADMIN** (2 min)

```
1. Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users
2. Click "Add User"
3. Email: admin@sanjariprints.com
4. Password: Admin@123
5. ✅ CHECK "Auto Confirm User"
6. Click "Create User"
7. COPY the User ID (UUID)
```

---

### **3️⃣ SET ADMIN ROLE** (1 min)

```
1. Go to SQL Editor
2. Run this (replace YOUR_USER_ID):

   UPDATE public.users 
   SET role = 'admin' 
   WHERE id = 'YOUR_USER_ID'::uuid;

3. Click RUN
```

---

## ✅ **DONE! Now Login:**

```
1. Go to: http://localhost:5173/#/admin/login
2. Email: admin@sanjariprints.com
3. Password: Admin@123
4. ✅ Admin dashboard should load!
```

---

## 🐛 **Still Have Errors?**

### **Can't login?**
- Check password is correct
- Make sure "Auto Confirm" was checked
- Verify role='admin' in users table

### **Tables not found?**
- Go to Table Editor
- Check if 'users' table exists
- If not, run SQL script again

### **Column errors?**
- Make sure entire SQL script ran
- Check for error messages in SQL Editor
- Run script again if needed

---

## 📝 **Quick Verify:**

Run this to check admin user:
```sql
SELECT id, email, name, role 
FROM public.users 
WHERE role = 'admin';
```

Should show your admin user! ✅

---

**Read full guide:** `/FIX_ERRORS_NOW.md`

**🎉 After this, everything works from Supabase database!**
