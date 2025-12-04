# 🔑 GOOGLE OAUTH SETUP - COMPLETE GUIDE

## 🎯 What We're Doing

1. ✅ **Removing Facebook OAuth** (not needed)
2. ✅ **Setting up Google OAuth** (for easy login/signup)
3. ✅ **Updating UI** (removed Facebook button)

---

## 📋 STEP-BY-STEP SETUP

### **STEP 1: Get Google OAuth Credentials**

#### **1A. Go to Google Cloud Console**
```
https://console.cloud.google.com/
```

#### **1B. Create a New Project (or use existing)**
1. Click on project dropdown (top left)
2. Click **"NEW PROJECT"**
3. Enter project name: `Sanjari Prints`
4. Click **"CREATE"**
5. Wait for project to be created
6. Select the new project from dropdown

#### **1C. Enable Google+ API**
1. Go to: **APIs & Services** → **Library**
2. Search for: `Google+ API`
3. Click on **Google+ API**
4. Click **"ENABLE"**

#### **1D. Create OAuth Credentials**
1. Go to: **APIs & Services** → **Credentials**
2. Click **"+ CREATE CREDENTIALS"**
3. Select **"OAuth client ID"**

#### **1E. Configure Consent Screen (if prompted)**
If you see "To create an OAuth client ID, you must first configure your consent screen":

1. Click **"CONFIGURE CONSENT SCREEN"**
2. Choose **"External"** (for public access)
3. Click **"CREATE"**
4. Fill in OAuth consent screen:
   - **App name:** `Sanjari Prints`
   - **User support email:** `sanjariprint@gmail.com`
   - **App logo:** (optional - upload your logo)
   - **Application home page:** `https://hgxhdmcqrcsjsxuaeyrl.supabase.co` (or your domain)
   - **Authorized domains:** 
     - `supabase.co`
     - Add your custom domain if you have one
   - **Developer contact email:** `sanjariprint@gmail.com`
5. Click **"SAVE AND CONTINUE"**
6. **Scopes:** Click **"SAVE AND CONTINUE"** (default scopes are fine)
7. **Test users:** Click **"SAVE AND CONTINUE"** (not required for External)
8. Click **"BACK TO DASHBOARD"**

#### **1F. Create OAuth Client ID**
1. Go back to: **Credentials** tab
2. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
3. **Application type:** `Web application`
4. **Name:** `Sanjari Prints Web Client`
5. **Authorized JavaScript origins:** (leave empty for now)
6. **Authorized redirect URIs:** Add this EXACT URL:
   ```
   https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
   ```
7. Click **"CREATE"**
8. **IMPORTANT:** Copy the credentials shown:
   - **Client ID:** (looks like: `xxxxx.apps.googleusercontent.com`)
   - **Client Secret:** (looks like: `GOCSPX-xxxxx`)
9. Click **"OK"**

---

### **STEP 2: Configure Supabase**

#### **2A. Go to Supabase Authentication Settings**
```
https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/providers
```

#### **2B. Enable Google Provider**
1. Scroll to **"Auth Providers"** section
2. Find **"Google"**
3. Click to expand
4. Toggle **"Enable Sign in with Google"** to ON
5. Paste credentials from Step 1F:
   - **Client ID:** (paste your Google Client ID)
   - **Client Secret:** (paste your Google Client Secret)
6. **Authorized Client IDs:** (leave empty)
7. Click **"SAVE"**

#### **2C. Verify Redirect URL**
Make sure this URL is in your Google Cloud Console:
```
https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
```

---

### **STEP 3: Test Google OAuth**

#### **3A. Test Signup**
1. Go to: `http://localhost:5173/signup`
2. Click **"Google"** button
3. Select your Google account
4. Grant permissions
5. You should be redirected back and logged in!

#### **3B. Test Login**
1. Go to: `http://localhost:5173/login`
2. Click **"Google"** button
3. Select same Google account
4. Should log you in immediately!

---

## 🔍 Verification Checklist

After setup, verify:

- [ ] **Google Cloud Console:**
  - [ ] Project created
  - [ ] Google+ API enabled
  - [ ] OAuth consent screen configured
  - [ ] OAuth client ID created
  - [ ] Redirect URI added: `https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback`

- [ ] **Supabase Dashboard:**
  - [ ] Google provider enabled
  - [ ] Client ID added
  - [ ] Client Secret added
  - [ ] Settings saved

- [ ] **Website:**
  - [ ] Facebook button removed ✅ (already done)
  - [ ] Google button visible ✅ (already there)
  - [ ] Google button works (test it!)

---

## 🎨 What Changed in Your Code

### **Files Modified:**
1. ✅ `/pages/SignupPage.tsx` - Removed Facebook button
2. ✅ `/pages/LoginPage.tsx` - Removed Facebook button

### **What Was Removed:**
```tsx
// ❌ REMOVED - Facebook button
<Button onClick={() => handleSocialLogin("facebook")}>
  <Facebook /> Facebook
</Button>
```

### **What Remains:**
```tsx
// ✅ KEPT - Google button (now full width)
<Button onClick={() => handleSocialLogin("google")}>
  <GoogleIcon /> Sign in with Google
</Button>
```

---

## 🔧 Troubleshooting

### **Problem: "redirect_uri_mismatch" error**

**Solution:**
1. Go to Google Cloud Console → Credentials
2. Edit your OAuth 2.0 Client ID
3. Make sure **Authorized redirect URIs** includes:
   ```
   https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
   ```
4. Save and try again

### **Problem: "Access blocked: This app's request is invalid"**

**Solution:**
1. Check OAuth consent screen is published
2. Make sure you added authorized domain: `supabase.co`
3. Try clearing browser cache

### **Problem: Google login works but user not created in database**

**Solution:**
This is handled automatically! When a user signs in with Google:
1. Supabase creates auth user
2. Our app creates profile in `users` table
3. Check `/pages/AuthCallbackPage.tsx` for the logic

### **Problem: "provider is not enabled" error**

**Solution:**
1. Go to Supabase → Authentication → Providers
2. Make sure Google toggle is **ON**
3. Make sure Client ID and Secret are saved

---

## 📊 How Google OAuth Works

```
User clicks "Google" button
  ↓
Redirects to Google login
  ↓
User logs in with Google
  ↓
Google redirects to: /auth/v1/callback
  ↓
Supabase validates and creates session
  ↓
Redirects to: /auth/callback (your app)
  ↓
AuthCallbackPage creates user profile
  ↓
Redirects to: / (home) or /user/dashboard
  ↓
✅ User logged in!
```

---

## 🎉 Benefits of Google OAuth

✅ **No password needed** - Users don't need to remember another password
✅ **Faster signup** - One click to create account
✅ **More secure** - Google handles authentication
✅ **Auto-verified email** - Google email is already verified
✅ **Better UX** - Familiar Google login screen

---

## 📝 Important Notes

1. **Production Domain:**
   - When you deploy to production, add your domain to:
     - Google Cloud Console → Authorized domains
     - Google Cloud Console → Authorized redirect URIs (update to your domain)

2. **Email Verification:**
   - Google OAuth users have auto-verified emails
   - Regular signup users need email verification

3. **User Data:**
   - Google provides: name, email, profile picture
   - Our app stores: name, email, role='user'

4. **Privacy:**
   - Make sure your Privacy Policy mentions Google OAuth
   - Update Terms to include third-party authentication

---

## 🚀 Next Steps

After Google OAuth is working:

1. **Test thoroughly:**
   - [ ] Sign up with Google
   - [ ] Log out
   - [ ] Log in with Google
   - [ ] Check user dashboard
   - [ ] Check admin panel (if admin)

2. **Production setup:**
   - [ ] Add production domain to Google Console
   - [ ] Update redirect URIs for production
   - [ ] Test on production

3. **Optional enhancements:**
   - [ ] Add Google profile picture to user profile
   - [ ] Auto-fill user data from Google
   - [ ] Link Google account to existing email account

---

## ✅ Summary

**What you need to do:**
1. Create Google OAuth credentials (Step 1)
2. Add credentials to Supabase (Step 2)
3. Test Google login (Step 3)

**What I already did:**
- ✅ Removed Facebook OAuth from signup page
- ✅ Removed Facebook OAuth from login page
- ✅ Updated UI to show only Google
- ✅ Auth logic already supports Google OAuth

**Time required:** 10-15 minutes

---

## 🎯 Quick Reference

**Google Cloud Console:**
```
https://console.cloud.google.com/apis/credentials
```

**Supabase Auth Settings:**
```
https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/providers
```

**Redirect URI (copy this):**
```
https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
```

**Contact Emails:**
```
sanjariprint@gmail.com
```

---

**Ready to set up Google OAuth? Follow Step 1 above!** 🚀
