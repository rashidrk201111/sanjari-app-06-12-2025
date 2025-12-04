# 🔐 Sanjari Prints - All Login Credentials

---

## 👑 ADMIN LOGIN

```
URL:      /admin/login
Email:    admin@sanjariprints.com
Password: admin123

⚠️ CHANGE PASSWORD AFTER FIRST LOGIN!
```

### Admin Features:
- Content Management
- Pricing Rules
- Order Management
- User Management
- Staff Management
- Reviews & Testimonials
- SEO Settings
- Payment Settings

---

## 👤 USER LOGIN (Demo Accounts)

```
URL: /login

Account 1:
Email:    demo@sanjariprints.com
Password: demo123

Account 2:
Email:    test@example.com
Password: test123

Account 3:
Phone:    9876543210
Password: demo123
```

### User Features:
- Browse products
- Configure & order
- Shopping cart
- Checkout
- User dashboard
- Order tracking
- Profile management

---

## 🆘 Admin Doesn't Work?

### Quick Fix - Promote Your Existing User:
```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'your@email.com';
```

Then login at `/admin/login` with your password!

---

### Create New Admin (2 steps):

**Step 1: Create in Supabase**
```
https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users
→ Add user
→ Email: admin@sanjariprints.com
→ Password: admin123
→ ✅ Auto Confirm
→ Copy User ID
```

**Step 2: Run SQL**
```sql
INSERT INTO public.users (
    id, email, name, phone, password_hash, role, email_verified
) VALUES (
    'YOUR_USER_ID_HERE',
    'admin@sanjariprints.com',
    'Admin User',
    '+91 7350001266',
    'handled_by_supabase_auth',
    'admin',
    true
);
```

---

## 📞 Contact

**Phone:** +91 7350001266 / 9323684301  
**Email:** sanjariprint@gmail.com

---

## 📚 Need More Help?

- `/HOW_TO_LOGIN_ADMIN.md` - Complete admin guide
- `/START_HERE_ADMIN.md` - Quick setup
- `/DEMO_CREDENTIALS.md` - Full testing guide

---

**Version:** 2.0 | **Updated:** December 2024
