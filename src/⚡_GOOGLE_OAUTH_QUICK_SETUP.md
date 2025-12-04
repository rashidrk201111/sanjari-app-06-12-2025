# ⚡ GOOGLE OAUTH - QUICK SETUP (5 MINUTES)

## ✅ What I Already Did For You

1. ✅ **Removed Facebook OAuth** from signup page
2. ✅ **Removed Facebook OAuth** from login page
3. ✅ **Updated UI** - Google button now full width
4. ✅ **Code ready** - OAuth logic already works!

---

## 🎯 What You Need To Do (2 Steps)

### **STEP 1: Get Google Credentials** (3 minutes)

#### **A. Create OAuth Client**

1. **Go to:** https://console.cloud.google.com/apis/credentials

2. **Create Project** (if you don't have one):
   - Click project dropdown → **NEW PROJECT**
   - Name: `Sanjari Prints`
   - Click **CREATE**

3. **Enable Google+ API:**
   - Go to: **Library**
   - Search: `Google+ API`
   - Click **ENABLE**

4. **Configure Consent Screen:**
   - Go to: **OAuth consent screen**
   - Choose: **External**
   - Fill in:
     - App name: `Sanjari Prints`
     - Support email: `sanjariprint@gmail.com`
     - Developer email: `sanjariprint@gmail.com`
   - Click **SAVE AND CONTINUE** (3 times)

5. **Create Credentials:**
   - Go to: **Credentials** tab
   - Click: **+ CREATE CREDENTIALS** → **OAuth client ID**
   - Type: **Web application**
   - Name: `Sanjari Prints Web`
   - Authorized redirect URIs: **Add this EXACT URL:**
     ```
     https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
     ```
   - Click **CREATE**

6. **Copy Credentials:**
   - Copy **Client ID** (ends with `.apps.googleusercontent.com`)
   - Copy **Client Secret** (starts with `GOCSPX-`)

---

### **STEP 2: Add to Supabase** (2 minutes)

1. **Go to:** https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/providers

2. **Find Google Provider:**
   - Scroll to "Auth Providers"
   - Find "Google"
   - Click to expand

3. **Enable and Configure:**
   - Toggle: **Enable Sign in with Google** = ON
   - Paste **Client ID** (from Step 1)
   - Paste **Client Secret** (from Step 1)
   - Click **SAVE**

---

## 🧪 Test It (1 minute)

### **Test Signup:**
1. Go to: `http://localhost:5173/signup`
2. Click **"Continue with Google"**
3. Choose Google account
4. Should create account and log you in!

### **Test Login:**
1. Log out
2. Go to: `http://localhost:5173/login`
3. Click **"Continue with Google"**
4. Should log you in immediately!

---

## 📋 Quick Checklist

- [ ] Created Google OAuth client
- [ ] Copied Client ID
- [ ] Copied Client Secret
- [ ] Added credentials to Supabase
- [ ] Enabled Google provider
- [ ] Saved Supabase settings
- [ ] Tested signup with Google
- [ ] Tested login with Google

---

## 🎨 What Your UI Looks Like Now

### **Before (had 2 buttons):**
```
┌────────────┐ ┌────────────┐
│  Facebook  │ │   Google   │
└────────────┘ └────────────┘
```

### **After (only Google, full width):**
```
┌──────────────────────────┐
│   Continue with Google   │
└──────────────────────────┘
```

---

## 🔧 Troubleshooting

### **Error: "redirect_uri_mismatch"**
→ Check you added this EXACT URL in Google Console:
```
https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
```

### **Error: "provider is not enabled"**
→ Go to Supabase → Auth → Providers → Make sure Google is ON

### **Error: "Invalid client"**
→ Double-check Client ID and Secret in Supabase match Google Console

---

## 🎯 URLs You Need

**Google Cloud Console:**
```
https://console.cloud.google.com/apis/credentials
```

**Supabase Auth Providers:**
```
https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/providers
```

**Redirect URI (copy this exactly):**
```
https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
```

---

## 📝 Files Changed

| File | Change |
|------|--------|
| `/pages/SignupPage.tsx` | ❌ Removed Facebook, ✅ Google full width |
| `/pages/LoginPage.tsx` | ❌ Removed Facebook, ✅ Google full width |

---

## 💡 Benefits

✅ **Faster signup** - One click instead of filling form
✅ **No password to remember** - Google handles it
✅ **More secure** - Google's security
✅ **Auto-verified email** - Google emails are trusted
✅ **Better conversion** - Users trust Google login

---

## 🚀 Do This Now

1. Open: https://console.cloud.google.com/apis/credentials
2. Follow **STEP 1** above
3. Open: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/providers
4. Follow **STEP 2** above
5. Test at: http://localhost:5173/signup

**Time: 5 minutes total** ⏱️

---

## ❓ Need More Details?

See full guide: **`🔑_GOOGLE_OAUTH_SETUP_GUIDE.md`**

---

**Facebook is removed, Google is ready! Just add your credentials!** 🎉
