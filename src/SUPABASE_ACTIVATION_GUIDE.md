# 🚀 Supabase Activation Guide

## ✅ Step 1: Database Setup (COMPLETED!)

You've successfully run the SQL schema in Supabase! Your database now has 9 tables ready to use.

**Tables Created:**
- ✅ `users` - Authentication & profiles
- ✅ `products` - Product catalog
- ✅ `orders` - Order management
- ✅ `pricing_rules` - Dynamic pricing
- ✅ `faqs` - FAQ system
- ✅ `reviews` - Customer reviews
- ✅ `seo_settings` - SEO configuration
- ✅ `payment_settings` - Payment gateway config
- ✅ `content_pages` - CMS content

**Default Data Inserted:**
- ✅ Admin user: `admin@sanjariprints.com` / Password: `admin123`
- ✅ 3 approved customer reviews
- ✅ Empty payment settings (ready for configuration)

---

## 🔄 Step 2: Activate Supabase in Your App

Your app currently uses **localStorage** for data. To switch to **Supabase**, I'll update one line in `App.tsx`.

### Before (localStorage):
```tsx
import { AuthProvider } from "./context/AuthContext";
```

### After (Supabase):
```tsx
import { AuthProvider } from "./context/AuthContextSupabase";
```

That's it! This single change will make your app use Supabase instead of localStorage.

---

## 🧪 Step 3: Test Your Integration

### 3.1 Test User Signup
1. Go to your app
2. Click "Sign Up"
3. Create a new account
4. **Verify**: Check Supabase Dashboard → Table Editor → `users` table
5. You should see your new user!

### 3.2 Test Admin Login
1. Go to `/admin/login`
2. Login with:
   - Email: `admin@sanjariprints.com`
   - Password: `admin123`
3. You should see the admin dashboard!

### 3.3 Test Order Creation
1. Add a product to cart
2. Complete checkout
3. **Verify**: Check Supabase Dashboard → Table Editor → `orders` table

---

## 📊 Verify Your Database

**Check Tables in Supabase:**
1. Go to: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/editor
2. You should see all 9 tables on the left sidebar
3. Click on `users` → You should see the default admin user
4. Click on `reviews` → You should see 3 sample reviews

---

## 🔐 Change Default Admin Password

**IMPORTANT:** After first login, change the admin password!

1. Login to admin panel
2. Go to **User Management** tab
3. Find `admin@sanjariprints.com`
4. Click "Edit" → Change password
5. Save!

---

## 🎯 What Changed?

### Before (localStorage):
- ❌ Data lost on browser clear
- ❌ No real authentication
- ❌ Single browser only
- ❌ No backend security

### After (Supabase):
- ✅ Persistent cloud database
- ✅ Secure authentication with JWT
- ✅ Access from any device
- ✅ Row Level Security (RLS)
- ✅ Real-time capabilities
- ✅ Admin panel with real data

---

## 📁 Files You Have

### Supabase Configuration:
- `/lib/supabase.ts` - Supabase client & types
- `/context/AuthContextSupabase.tsx` - Supabase authentication
- `/supabase-schema.sql` - Database schema (already run)

### Documentation:
- `SUPABASE_QUICK_START.md` - Quick reference
- `SUPABASE_SETUP_GUIDE.md` - Detailed setup
- `MIGRATION_GUIDE.md` - Migration details

---

## 🆘 Troubleshooting

### Problem: "Can't login"
**Solution:** Make sure you ran the SQL schema in Supabase. The admin user is created by the schema.

### Problem: "RLS policy error"
**Solution:** The schema includes all necessary RLS policies. Make sure the entire schema ran successfully.

### Problem: "Connection error"
**Solution:** Check that your Supabase URL and keys in `/lib/supabase.ts` are correct.

### Problem: Tables not showing
**Solution:** 
1. Go to Supabase SQL Editor
2. Run this to check: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
3. You should see 9 tables

---

## 🎉 Next Steps After Activation

1. **Test all features** - Signup, login, add to cart, checkout
2. **Configure payment gateways** - Add Razorpay/PhonePe keys in admin panel
3. **Add your products** - Use admin panel to add real products
4. **Set up pricing rules** - Configure dynamic pricing
5. **Customize content** - Update About, Terms, Privacy pages
6. **Add SEO settings** - Configure meta tags for each page

---

## 📞 Support Resources

- **Supabase Dashboard:** https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl
- **SQL Editor:** https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
- **Table Editor:** https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/editor
- **Authentication:** https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/users

---

## ✅ Activation Checklist

- [x] SQL schema run in Supabase
- [x] 9 tables created successfully
- [x] Default admin user inserted
- [x] Sample reviews inserted
- [ ] Update App.tsx to use AuthContextSupabase ← **YOU ARE HERE**
- [ ] Test user signup
- [ ] Test admin login
- [ ] Test order creation
- [ ] Change admin password
- [ ] Configure payment gateways

---

**Ready to activate? Say "activate supabase" and I'll make the switch!** 🚀
