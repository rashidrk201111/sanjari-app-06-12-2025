# ⚡ Staff Management - Quick Reference Card

**Keep this handy!** Everything you need to know about staff management in one page.

---

## 🚀 Quick Start (30 seconds)

```bash
1. Login: admin@sanjariprints.com / admin123
2. Go to "Staff Management" tab
3. Click "Add Staff"
4. Fill form → Save
5. Staff can now login!
```

---

## 📝 Create Staff

### **Form Fields:**
```
✅ Name: [Full name]
✅ Email: [email@domain.com]
✅ Phone: [+91 9876543210]
✅ Role: [Admin/Manager/Staff/Support]
✅ Department: [Operations/Sales/etc]
✅ Password: [min 6 chars]
```

### **Behind the Scenes:**
```
✓ Creates in Supabase Auth
✓ Creates in users table
✓ Ready to login immediately
```

---

## 🎭 Roles Explained

| Role | Access | Login URL |
|------|--------|-----------|
| **Admin** | Full admin dashboard | /admin/login |
| **Manager** | Full admin dashboard | /admin/login |
| **Staff** | User dashboard | /login |
| **Support** | User dashboard | /login |

---

## ✏️ Update Staff

```bash
1. Find staff in list
2. Click "Edit"
3. Change details
4. (Optional) Enter new password
5. Save
```

**Updates:**
- ✅ Name, phone, role, department
- ✅ Password (if provided)
- ✅ Both Supabase Auth & database

---

## 🗑️ Delete Staff

```bash
1. Find staff in list
2. Click "Delete"
3. Confirm
4. Done!
```

**What happens:**
- ✅ Removed from users table
- ✅ Can't login anymore
- ⚠️ Auth user remains (use Edge Function to fully delete)

---

## 🧪 Quick Test

### **Test 1: Create & Login (2 min)**
```
1. Create staff: test@sanjariprints.com / test123 / Admin
2. Logout
3. Login at /admin/login with test credentials
4. ✅ Should work!
```

### **Test 2: Update Password (1 min)**
```
1. Edit test staff
2. New password: test456
3. Logout and login with new password
4. ✅ Should work!
```

---

## 🐛 Common Issues

### **"User already registered"**
```
→ Email exists in Supabase
→ Go to Supabase → Auth → Users → Delete it
→ OR use different email
```

### **"Failed to create profile"**
```sql
-- Check and delete existing
DELETE FROM public.users WHERE email = 'staff@email.com';
-- Try again
```

### **Can't login after creation**
```sql
-- Check if profile exists
SELECT * FROM public.users WHERE email = 'staff@email.com';
-- If missing, create manually:
INSERT INTO public.users (id, email, name, phone, role, email_verified)
VALUES ('auth-user-id', 'email', 'name', 'phone', 'admin', true);
```

---

## 💡 Pro Tips

### **Email Confirmation:**
```
Default: Confirmation email sent
To disable: Supabase → Auth → Email → Uncheck "Confirm email"
```

### **Password Reset:**
```
Staff can use "Forgot Password" on login page
Receives reset email automatically
```

### **Bulk Creation:**
```
Not yet implemented
For now: Create one by one
Or: Use SQL inserts in Supabase
```

---

## 📊 What Gets Created

### **In Supabase Auth:**
```json
{
  "id": "uuid-here",
  "email": "staff@email.com",
  "user_metadata": {
    "name": "Staff Name",
    "phone": "+91 9876543210",
    "role": "admin"
  }
}
```

### **In users table:**
```sql
INSERT INTO users VALUES (
  'same-uuid',
  'staff@email.com',
  'Staff Name',
  '+91 9876543210',
  'admin', -- or 'staff'
  false, -- email_verified
  now(),
  now()
);
```

---

## 🔍 Debug Checklist

When something goes wrong:

- [ ] Check console for errors
- [ ] Check Supabase Dashboard → Auth → Users
- [ ] Check Supabase Dashboard → Table Editor → users
- [ ] Verify email not already used
- [ ] Verify password is 6+ characters
- [ ] Check if email confirmation is blocking login

---

## 📁 Key Files

```
/context/AdminContext.tsx ........... Staff logic
/components/StaffDialog.tsx ......... Staff form
/pages/AdminDashboardPage.tsx ....... Admin panel
```

---

## 📚 More Info

**Quick Guides:**
- `STAFF_INTEGRATION_COMPLETE.md` - Summary
- `STAFF_PRODUCTION_READY.md` - Complete guide
- `STAFF_CREATION_EXPLAINED.md` - How it works

**General:**
- `LOGIN_CREDENTIALS.md` - All credentials
- `HOW_TO_LOGIN_ADMIN.md` - Admin login
- `📚_DOCUMENTATION_INDEX.md` - All docs

---

## ⚡ Commands Cheat Sheet

### **SQL Queries:**
```sql
-- List all staff
SELECT * FROM public.users WHERE role IN ('admin', 'staff');

-- Find specific staff
SELECT * FROM public.users WHERE email = 'staff@email.com';

-- Delete staff
DELETE FROM public.users WHERE email = 'staff@email.com';

-- Create staff manually
INSERT INTO public.users (id, email, name, phone, role, email_verified)
VALUES (
  'get-from-auth-users',
  'staff@email.com',
  'Staff Name',
  '+91 9876543210',
  'admin',
  true
);

-- Update staff role
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'staff@email.com';
```

---

## 🎯 Status Indicators

### **✅ Working:**
- Create staff
- Staff login
- Update staff
- Delete staff
- Password changes
- Role mapping
- Error handling

### **⚠️ Limitations:**
- Department not in database (localStorage only)
- Auth user not deleted (only profile)
- No bulk operations yet

### **🔮 Future:**
- Bulk staff import
- Advanced permissions
- Activity tracking
- Staff analytics

---

## 🆘 Emergency Fixes

### **Reset Everything:**
```sql
-- Delete all non-admin staff
DELETE FROM public.users WHERE role != 'user' AND email != 'admin@sanjariprints.com';
```

### **Create Admin Manually:**
```sql
-- See MANUAL_ADMIN_CREATION.sql
```

### **Fix Duplicate Staff:**
```sql
-- Find duplicates
SELECT email, COUNT(*) FROM public.users GROUP BY email HAVING COUNT(*) > 1;

-- Delete duplicates (keep one)
DELETE FROM public.users WHERE id NOT IN (
  SELECT MIN(id) FROM public.users GROUP BY email
);
```

---

## 📞 Quick Links

- **Admin Login:** `/admin/login`
- **User Login:** `/login`
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Auth Users:** https://supabase.com/dashboard/project/YOUR_PROJECT/auth/users
- **Users Table:** https://supabase.com/dashboard/project/YOUR_PROJECT/editor

---

## ✨ Remember

```
✅ Staff creation = Auto Supabase integration
✅ Immediate login after creation
✅ Full authentication out of the box
✅ Production ready!
```

---

**Print this card and keep it handy! 📋**

**Last Updated:** December 2024  
**Version:** 2.0 - Full Supabase Integration
