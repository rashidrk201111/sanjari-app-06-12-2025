# ⚡ OAuth Setup - Quick Checklist

**30-minute setup guide** for Google & Facebook authentication in Supabase.

---

## 🎯 What You Need

Before starting, have these ready:
- [ ] Supabase account & project
- [ ] Google account
- [ ] Facebook account
- [ ] Your app's domain (or use localhost for testing)

---

## 🔵 GOOGLE SETUP (15 minutes)

### **1. Get Your Supabase Callback URL First** ⭐
```
Go to: Supabase → Settings → API
Copy: Project URL (looks like: https://xxxxx.supabase.co)
Your callback: https://xxxxx.supabase.co/auth/v1/callback
```

**Write it down:** `_________________________________`

---

### **2. Google Cloud Console**
```
URL: https://console.cloud.google.com/
```

- [ ] **Create Project**
  - Name: `Sanjari Prints`
  
- [ ] **Enable API**
  - Search: `Google+ API`
  - Click: Enable

- [ ] **OAuth Consent Screen**
  - Type: External
  - App name: `Sanjari Prints`
  - Email: `sanjariprint@gmail.com`
  - Scopes: `email`, `profile`, `openid`

- [ ] **Create Credentials**
  - Type: OAuth Client ID
  - Application: Web application
  - Name: `Sanjari Prints Web`
  
  **Authorized JavaScript origins:**
  ```
  http://localhost:5173
  https://your-domain.com (if deployed)
  ```
  
  **Authorized redirect URIs:**
  ```
  [Paste your Supabase callback URL from step 1]
  ```

- [ ] **Copy Credentials** ✅
  ```
  Client ID: _________________________________
  Client Secret: _________________________________
  ```

---

### **3. Add to Supabase**
```
Go to: Supabase → Authentication → Providers → Google
```

- [ ] Toggle: **Enable Sign in with Google** = ON
- [ ] Paste: Client ID
- [ ] Paste: Client Secret
- [ ] Toggle: **Skip if no user confirmation** = ON
- [ ] Click: **Save**

---

## 🔷 FACEBOOK SETUP (15 minutes)

### **1. Facebook Developers**
```
URL: https://developers.facebook.com/
```

- [ ] **Create App**
  - Click: My Apps → Create App
  - Type: Consumer (or Other)
  - Name: `Sanjari Prints`
  - Email: `sanjariprint@gmail.com`

- [ ] **Add Facebook Login**
  - Find: Facebook Login in Products
  - Click: Set Up

- [ ] **Configure Settings**
  ```
  Go to: Products → Facebook Login → Settings
  ```
  
  **Valid OAuth Redirect URIs:**
  ```
  [Paste your Supabase callback URL]
  ```
  
  Click: Save Changes

- [ ] **App Domains**
  ```
  Go to: Settings → Basic
  ```
  
  **App Domains:**
  ```
  localhost (for testing)
  your-domain.com (for production)
  ```
  
  Click: Save Changes

- [ ] **Copy Credentials** ✅
  ```
  Go to: Settings → Basic
  
  App ID: _________________________________
  App Secret: [Click Show] _________________________________
  ```

---

### **2. Add to Supabase**
```
Go to: Supabase → Authentication → Providers → Facebook
```

- [ ] Toggle: **Enable Sign in with Facebook** = ON
- [ ] Paste: Facebook Client ID (App ID)
- [ ] Paste: Facebook Client Secret (App Secret)
- [ ] Toggle: **Skip if no user confirmation** = ON
- [ ] Click: **Save**

---

## 🧪 TESTING (5 minutes)

### **Test Google:**
- [ ] Go to your app login page
- [ ] Click "Sign in with Google"
- [ ] Select Google account
- [ ] Expected: Logged in ✅

### **Test Facebook:**
- [ ] Go to your app login page
- [ ] Click "Sign in with Facebook"
- [ ] Enter Facebook credentials
- [ ] Expected: Logged in ✅

### **Verify in Supabase:**
- [ ] Go to: Authentication → Users
- [ ] See new users with provider: google/facebook ✅
- [ ] Go to: Table Editor → users
- [ ] See user profiles created ✅

---

## 🐛 Quick Fixes

### **"Redirect URI Mismatch"**
```
❌ Problem: Callback URL doesn't match

✅ Fix:
1. Copy EXACT URL from Supabase
2. Paste in Google/Facebook settings
3. No trailing slashes
4. Must be exact match
```

---

### **"Access Denied" (Google)**
```
❌ Problem: App in development mode

✅ Fix:
1. Google Console → OAuth Consent → Test Users
2. Add your Gmail address
3. Try again with that account
```

---

### **"App Not Setup" (Facebook)**
```
❌ Problem: Facebook app in dev mode

✅ Fix (for testing):
1. Facebook App → Roles → Test Users
2. Add test users or use your account
3. Keep app in Development Mode

✅ Fix (for production):
1. Complete app requirements
2. Switch to Live mode
```

---

### **User Not in Database**
```
❌ Problem: User in Auth but not in users table

✅ Fix:
1. Check if trigger exists:
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

2. If missing, run from supabase-schema.sql:
   - Find the trigger creation code
   - Run it in SQL Editor

3. Or manually create profile:
   INSERT INTO public.users (id, email, name, role, email_verified)
   VALUES ('user-id', 'email', 'name', 'user', true);
```

---

## 📝 Credentials Summary

Keep this safe! 🔒

### **Google:**
```
Client ID: _________________________________
Client Secret: _________________________________
Added to Supabase: [ ]
```

### **Facebook:**
```
App ID: _________________________________
App Secret: _________________________________
Added to Supabase: [ ]
```

### **Supabase:**
```
Callback URL: _________________________________
Google Enabled: [ ]
Facebook Enabled: [ ]
```

---

## ✅ Final Checklist

Before going live:

### **Configuration:**
- [ ] Google OAuth configured
- [ ] Facebook OAuth configured
- [ ] Both enabled in Supabase
- [ ] Callback URLs match exactly
- [ ] Test users added (if in dev mode)

### **Testing:**
- [ ] Google login works
- [ ] Facebook login works
- [ ] Users created in Auth
- [ ] Profiles created in database
- [ ] No console errors

### **Documentation:**
- [ ] Credentials saved securely
- [ ] Privacy policy created
- [ ] Terms of service created
- [ ] Callback URLs documented

### **Production (when ready):**
- [ ] Add production domain
- [ ] Update redirect URIs
- [ ] Switch apps to Live mode
- [ ] Test from production URL
- [ ] Monitor auth logs

---

## 🚀 You're Done!

If all checkboxes are ticked:
- ✅ Google sign-in is working
- ✅ Facebook sign-in is working
- ✅ Users are being created
- ✅ Everything is configured

**Next steps:**
1. Test thoroughly
2. Add to production when ready
3. Monitor for issues
4. Enjoy social authentication! 🎉

---

## 📚 More Help

**Full Guide:** See `GOOGLE_FACEBOOK_OAUTH_SETUP.md`

**Quick Links:**
- Google Console: https://console.cloud.google.com/
- Facebook Developers: https://developers.facebook.com/
- Supabase Dashboard: https://supabase.com/dashboard

**Documentation:**
- `SOCIAL_AUTH_QUICK_SETUP.md` - Overview
- `SOCIAL_AUTH_SETUP_GUIDE.md` - Detailed guide
- `GOOGLE_FACEBOOK_OAUTH_SETUP.md` - Complete guide (new!)

---

**Print this and check off as you go! 📋**

**Estimated Time:** 30 minutes  
**Difficulty:** Easy to Medium  
**Status:** Production Ready when complete ✅
