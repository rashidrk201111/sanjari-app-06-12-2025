# 🎯 Supabase Cheat Sheet - Quick Reference

## 🚀 5-Second Quick Start

1. Open: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
2. Copy: `/supabase-schema.sql` (entire file)
3. Paste: Into SQL Editor
4. Click: RUN button
5. Done: Database ready! ✅

---

## 📚 Documentation Quick Links

| I want to... | Read this |
|--------------|-----------|
| **Get started NOW** | [START_HERE_SUPABASE.md](START_HERE_SUPABASE.md) |
| **5-min setup** | [SUPABASE_QUICK_START.md](SUPABASE_QUICK_START.md) |
| **Migrate code** | [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) |
| **See everything** | [SUPABASE_INTEGRATION_SUMMARY.md](SUPABASE_INTEGRATION_SUMMARY.md) |
| **Visual guide** | [SUPABASE_VISUAL_GUIDE.md](SUPABASE_VISUAL_GUIDE.md) |
| **Overview** | [SUPABASE_README.md](SUPABASE_README.md) |

---

## 🔗 Supabase Dashboard Links

| What | Link |
|------|------|
| **Run SQL** | https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new |
| **View Tables** | https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/editor |
| **Check Logs** | https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/logs/explorer |
| **Security** | https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/policies |
| **Settings** | https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/settings/api |

---

## 🔐 Default Credentials

```
Admin Login:
Email: admin@sanjariprints.com
Password: admin123

⚠️ CHANGE THIS IMMEDIATELY!
```

---

## 💻 Code Files

```
/lib/supabase.ts              ✅ Supabase client (ready)
/supabase-schema.sql          ⚠️ Run this in Supabase!
/context/AuthContextSupabase.tsx  ✅ New auth (rename to use)
/utils/auth.ts                ✅ Helpers (ready)
```

---

## 🗄️ Database Tables

```
✅ users              User accounts
✅ products           Product catalog
✅ orders             Order management
✅ pricing_rules      Dynamic pricing
✅ faqs               FAQ system
✅ reviews            Customer reviews
✅ seo_settings       SEO config
✅ payment_settings   Payment gateways
✅ content_pages      CMS content
```

---

## 🔄 Migration Quick Guide

### Old Way (localStorage):
```tsx
login(email, name, phone);
```

### New Way (Supabase):
```tsx
const { success, error } = await login(email, password);
if (success) {
  // Handle success
} else {
  toast.error(error);
}
```

---

## ⚡ Quick Commands

### Test Database:
```
1. Go to Table Editor
2. Click "users"
3. See admin user
4. Try adding data manually
```

### Test Admin Login:
```
1. Go to /admin/login
2. Email: admin@sanjariprints.com
3. Password: admin123
4. Should work!
```

### Switch AuthContext:
```
mv /context/AuthContext.tsx /context/AuthContext.OLD.tsx
mv /context/AuthContextSupabase.tsx /context/AuthContext.tsx
```

---

## 🎯 What to Update

### High Priority:
- [ ] LoginPage.tsx - Add `await` to login
- [ ] SignupPage.tsx - Use new signup method
- [ ] ForgotPasswordPage.tsx - Add resetPassword
- [ ] AdminLoginPage.tsx - Update auth

### Medium Priority:
- [ ] CheckoutPage.tsx - Handle async addOrder
- [ ] UserDashboardPage.tsx - Add loading state

---

## 🔐 Security Checklist

- [x] Anon key configured
- [ ] Rotate service_role key (you shared it!)
- [ ] Change admin password
- [x] RLS policies enabled
- [ ] Configure email provider
- [ ] Test all permissions

---

## 🧪 Testing Checklist

### After SQL Setup:
- [ ] Tables appear in dashboard
- [ ] Admin user exists
- [ ] Sample reviews present
- [ ] Can add data manually

### After Code Migration:
- [ ] User can signup
- [ ] User can login
- [ ] User can place order
- [ ] Admin can login
- [ ] Admin can manage data

---

## 🚨 Common Errors

| Error | Solution |
|-------|----------|
| Tables not found | Run SQL schema |
| Login fails | Check credentials, verify SQL ran |
| Permission denied | Check RLS policies |
| Connection error | Verify keys in /lib/supabase.ts |

---

## 📊 Quick Comparison

| Feature | Before | After |
|---------|--------|-------|
| Storage | localStorage | Supabase DB |
| Auth | Demo | Real passwords |
| Security | None | RLS |
| Persistence | Lost on clear | Permanent |

---

## ⏱️ Time Estimates

```
SQL Setup:       2 minutes
Verify:          1 minute
Read Docs:      20 minutes
Code Update:    30 minutes
Testing:        10 minutes
---
Total:          ~1 hour
```

---

## 🎯 Success Indicators

**Database Setup Complete:**
- ✅ SQL runs without errors
- ✅ 9 tables in Table Editor
- ✅ Admin user in users table

**Code Migration Complete:**
- ✅ AuthContext switched
- ✅ Pages updated
- ✅ All tests pass
- ✅ Ready to launch!

---

## 🆘 Need Help?

1. Check the error message
2. Look at Supabase logs
3. Read relevant guide:
   - Setup issue? → SETUP_GUIDE.md
   - Migration issue? → MIGRATION_GUIDE.md
   - Understanding issue? → INTEGRATION_SUMMARY.md

---

## 💡 Pro Tips

1. **Test database first** - Run SQL, explore dashboard
2. **Keep old context** - Don't delete until tested
3. **Use logs** - Supabase logs show everything
4. **Test manually** - Add data in dashboard to verify
5. **Read examples** - Guides have all code you need

---

## 🎊 Quick Wins

**In 5 minutes you can:**
- ✅ Run SQL schema
- ✅ See your database working
- ✅ Browse tables in dashboard
- ✅ Add test data manually

**In 1 hour you can:**
- ✅ Complete full migration
- ✅ Test all features
- ✅ Be ready for production
- ✅ Launch with real backend!

---

## 🚀 Your Next 3 Steps

```
1. Open START_HERE_SUPABASE.md
   └─ Read it (5 minutes)

2. Run SQL schema
   └─ In Supabase SQL Editor (2 minutes)

3. Verify it worked
   └─ Check Table Editor (1 minute)
```

**Then decide:** Test more or migrate code?

---

## 📱 Bookmark These

- ⭐ [SQL Editor](https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new)
- ⭐ [Table Editor](https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/editor)
- ⭐ START_HERE_SUPABASE.md
- ⭐ MIGRATION_GUIDE.md

---

## 🎯 Current Status

```
✅ Supabase client configured
✅ Database schema ready
✅ Auth system built
✅ Documentation complete
⏳ SQL needs to be run
⏳ Code migration pending
⏳ Testing needed
```

---

## 🎉 Remember

**You have everything you need:**
- ✅ Complete backend ready
- ✅ Full documentation
- ✅ Code examples
- ✅ Step-by-step guides
- ✅ Professional database
- ✅ Enterprise security

**Just need to:**
1. Run the SQL (2 min)
2. Update the code (30 min)
3. Test (10 min)
4. Launch! 🚀

---

**You got this! 💪**

Print this page and keep it handy! 📄✨
