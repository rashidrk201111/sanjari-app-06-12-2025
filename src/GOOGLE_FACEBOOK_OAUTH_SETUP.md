# 🔑 Google & Facebook OAuth Setup Guide

Complete step-by-step guide to get API keys for Google and Facebook sign-in and configure them in Supabase.

---

## 📋 Table of Contents

1. [Google OAuth Setup](#google-oauth-setup)
2. [Facebook OAuth Setup](#facebook-oauth-setup)
3. [Supabase Configuration](#supabase-configuration)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

---

## 🔵 Google OAuth Setup

### **Step 1: Go to Google Cloud Console**

1. **Visit:** https://console.cloud.google.com/
2. **Sign in** with your Google account
3. If you don't have a project, you'll be prompted to create one

---

### **Step 2: Create a New Project (If Needed)**

1. **Click** on the project dropdown at the top
2. **Click** "New Project"
3. **Enter details:**
   ```
   Project Name: Sanjari Prints
   Organization: (Optional)
   Location: (Optional)
   ```
4. **Click** "Create"
5. **Wait** for project creation (~10 seconds)
6. **Select** your new project from the dropdown

---

### **Step 3: Enable Google+ API**

1. **Click** the hamburger menu (☰) → **APIs & Services** → **Library**
2. **Search** for "Google+ API"
3. **Click** on "Google+ API"
4. **Click** "Enable"
5. **Wait** for it to enable

---

### **Step 4: Create OAuth Consent Screen**

1. **Go to:** **APIs & Services** → **OAuth consent screen**
2. **Select User Type:**
   - **External** (for public use) - Recommended ✅
   - Internal (only for Google Workspace users)
3. **Click** "Create"

4. **Fill in App Information:**
   ```
   App name: Sanjari Prints
   User support email: sanjariprint@gmail.com
   App logo: (Optional - upload your logo)
   ```

5. **Application home page:**
   ```
   https://your-domain.com
   (or leave blank for now)
   ```

6. **Application Privacy Policy link:**
   ```
   https://your-domain.com/privacy-policy
   (or leave blank for now)
   ```

7. **Application Terms of Service link:**
   ```
   https://your-domain.com/terms
   (or leave blank for now)
   ```

8. **Authorized domains:**
   ```
   your-domain.com
   (Add your actual domain)
   ```

9. **Developer contact information:**
   ```
   Email: sanjariprint@gmail.com
   ```

10. **Click** "Save and Continue"

---

### **Step 5: Configure Scopes**

1. **Click** "Add or Remove Scopes"
2. **Select these scopes:**
   ```
   ✅ .../auth/userinfo.email
   ✅ .../auth/userinfo.profile
   ✅ openid
   ```
3. **Click** "Update"
4. **Click** "Save and Continue"

---

### **Step 6: Add Test Users (For Development)**

1. **Click** "Add Users"
2. **Enter email addresses:**
   ```
   your-email@gmail.com
   sanjariprint@gmail.com
   (Add any test accounts)
   ```
3. **Click** "Add"
4. **Click** "Save and Continue"
5. **Review** and click "Back to Dashboard"

---

### **Step 7: Create OAuth Client ID**

1. **Go to:** **APIs & Services** → **Credentials**
2. **Click** "+ CREATE CREDENTIALS" at the top
3. **Select** "OAuth client ID"

4. **Application type:** Select **Web application**

5. **Name:**
   ```
   Sanjari Prints Web Client
   ```

6. **Authorized JavaScript origins:**
   ```
   Click "+ Add URI"
   
   For Development:
   http://localhost:5173
   http://localhost:3000
   http://127.0.0.1:5173
   
   For Production:
   https://your-actual-domain.com
   ```

7. **Authorized redirect URIs:**
   ```
   Click "+ Add URI"
   
   Format: https://[YOUR-SUPABASE-PROJECT-REF].supabase.co/auth/v1/callback
   
   Example:
   https://abcdefghijklmnop.supabase.co/auth/v1/callback
   ```

   **How to get your Supabase URL:**
   - Go to Supabase Dashboard
   - Select your project
   - Go to Settings → API
   - Copy the "Project URL" (looks like: https://xxxxx.supabase.co)
   - Add `/auth/v1/callback` to the end

8. **Click** "Create"

---

### **Step 8: Save Your Credentials** ✅

You'll see a popup with:

```
Your Client ID
Your Client Secret
```

**IMPORTANT:** Copy these immediately!

```
Client ID: 123456789-abcdefg.apps.googleusercontent.com
Client Secret: GOCSPX-aBcDeFgHiJkLmNoPqRsTuVwXyZ
```

**Save them somewhere safe!** You'll need these for Supabase.

---

## 🔷 Facebook OAuth Setup

### **Step 1: Go to Facebook Developers**

1. **Visit:** https://developers.facebook.com/
2. **Click** "My Apps" (top right)
3. **Sign in** with your Facebook account

---

### **Step 2: Create a New App**

1. **Click** "Create App"
2. **Select use case:**
   - Select **"Consumer"** or **"Other"**
   - Click "Next"

3. **App Details:**
   ```
   App Name: Sanjari Prints
   App Contact Email: sanjariprint@gmail.com
   ```

4. **Select** a Business Portfolio (or create one if needed)
5. **Click** "Create App"
6. **Complete security check** (if prompted)

---

### **Step 3: Add Facebook Login Product**

1. In your app dashboard, **scroll down** to "Add Products"
2. **Find** "Facebook Login"
3. **Click** "Set Up" on Facebook Login

---

### **Step 4: Configure Facebook Login Settings**

1. **Go to:** Dashboard → Products → Facebook Login → Settings (left sidebar)

2. **Client OAuth Settings:**
   
   **Valid OAuth Redirect URIs:**
   ```
   Format: https://[YOUR-SUPABASE-PROJECT-REF].supabase.co/auth/v1/callback
   
   Example:
   https://abcdefghijklmnop.supabase.co/auth/v1/callback
   ```

3. **Allowed Domains for the JavaScript SDK:**
   ```
   For Development:
   localhost
   
   For Production:
   your-actual-domain.com
   ```

4. **Click** "Save Changes"

---

### **Step 5: Configure App Domains**

1. **Go to:** Settings → Basic (left sidebar)

2. **App Domains:**
   ```
   For Development:
   localhost
   
   For Production:
   your-actual-domain.com
   ```

3. **Privacy Policy URL:**
   ```
   https://your-domain.com/privacy-policy
   (or leave blank for testing)
   ```

4. **Terms of Service URL:**
   ```
   https://your-domain.com/terms
   (or leave blank for testing)
   ```

5. **Click** "Save Changes"

---

### **Step 6: Get Your App Credentials** ✅

1. **Go to:** Settings → Basic
2. **You'll see:**

```
App ID: 1234567890123456
App Secret: [Click "Show" to reveal]
```

3. **Click "Show"** next to App Secret
4. **Enter your Facebook password** to confirm
5. **Copy both values:**

```
App ID: 1234567890123456
App Secret: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**Save them somewhere safe!** You'll need these for Supabase.

---

### **Step 7: Switch App to Live Mode**

**IMPORTANT:** Your app starts in "Development Mode"

1. **Go to:** Settings → Basic
2. **Look at the top** - you'll see a toggle or status
3. **To go live:**
   - Click the toggle/button to switch to "Live"
   - OR go to App Mode and switch to "Live"
   
**Note:** You may need to complete additional requirements before going live, but for testing, Development Mode works fine.

---

## ☁️ Supabase Configuration

Now that you have your credentials, let's add them to Supabase!

---

### **Step 1: Go to Supabase Dashboard**

1. **Visit:** https://supabase.com/dashboard
2. **Sign in** to your account
3. **Select** your project (Sanjari Prints)

---

### **Step 2: Navigate to Authentication Settings**

1. **Click** "Authentication" in the left sidebar
2. **Click** "Providers"
3. You'll see a list of auth providers

---

### **Step 3: Configure Google Provider**

1. **Find** "Google" in the providers list
2. **Click** on it to expand
3. **Toggle** "Enable Sign in with Google" to **ON**

4. **Enter your credentials:**
   ```
   Client ID: [Paste your Google Client ID]
   Client Secret: [Paste your Google Client Secret]
   ```

5. **Authorized Client IDs:** (Optional)
   ```
   Leave blank for now
   ```

6. **Skip if no user confirmation:** (Optional)
   ```
   Toggle ON if you want to auto-confirm emails from Google
   Recommended: ON ✅
   ```

7. **Click** "Save"

---

### **Step 4: Configure Facebook Provider**

1. **Find** "Facebook" in the providers list
2. **Click** on it to expand
3. **Toggle** "Enable Sign in with Facebook" to **ON**

4. **Enter your credentials:**
   ```
   Facebook Client ID: [Paste your Facebook App ID]
   Facebook Client Secret: [Paste your Facebook App Secret]
   ```

5. **Skip if no user confirmation:** (Optional)
   ```
   Toggle ON if you want to auto-confirm emails from Facebook
   Recommended: ON ✅
   ```

6. **Click** "Save"

---

### **Step 5: Copy Callback URL**

**IMPORTANT:** Make sure you used the correct callback URL!

1. **In Supabase**, you'll see:
   ```
   Callback URL (for OAuth):
   https://[your-project-ref].supabase.co/auth/v1/callback
   ```

2. **Verify this matches** what you entered in:
   - Google Console → Authorized redirect URIs ✅
   - Facebook → Valid OAuth Redirect URIs ✅

3. **If not matching, go back and update them!**

---

## 🧪 Testing

### **Test Google Sign-In:**

1. **Go to your app** (localhost or deployed)
2. **Go to signup/login page**
3. **Click** "Sign in with Google"
4. **Select** a Google account
5. **Grant permissions**
6. **Expected result:** 
   ```
   ✅ Redirected back to your app
   ✅ User logged in
   ✅ User created in Supabase Auth
   ✅ Profile created in users table
   ```

---

### **Test Facebook Sign-In:**

1. **Go to your app** (localhost or deployed)
2. **Go to signup/login page**
3. **Click** "Sign in with Facebook"
4. **Enter** Facebook credentials
5. **Grant permissions**
6. **Expected result:**
   ```
   ✅ Redirected back to your app
   ✅ User logged in
   ✅ User created in Supabase Auth
   ✅ Profile created in users table
   ```

---

### **Verify in Supabase:**

1. **Go to** Supabase Dashboard → Authentication → Users
2. **You should see** new users with:
   ```
   Provider: google (or facebook)
   Email: user's email
   Created: timestamp
   ```

3. **Go to** Table Editor → users
4. **You should see** profiles created with:
   ```
   id: (matches auth user id)
   email: user's email
   name: user's name
   role: 'user'
   ```

---

## 🐛 Troubleshooting

### **Common Issues:**

---

#### **1. "Redirect URI Mismatch" Error**

**Error Message:**
```
Error: redirect_uri_mismatch
The redirect URI in the request does not match the ones authorized for the OAuth client.
```

**Solution:**
```
1. Check your Supabase callback URL:
   https://[project-ref].supabase.co/auth/v1/callback

2. Make sure it's EXACTLY in:
   - Google Console → Credentials → Authorized redirect URIs
   - Facebook → Login Settings → Valid OAuth Redirect URIs

3. No trailing slashes
4. Exact match including https://
```

---

#### **2. "App Not Setup" Error (Facebook)**

**Error Message:**
```
App Not Setup: The app is still in development mode
```

**Solution:**
```
For Testing:
1. Go to Facebook App → Roles → Test Users
2. Add test users
3. Login with test user accounts

For Production:
1. Complete App Review requirements
2. Switch app to Live mode
3. Make app public
```

---

#### **3. "Access Denied" Error (Google)**

**Error Message:**
```
Access blocked: This app's request is invalid
```

**Solution:**
```
1. Check OAuth Consent Screen is configured
2. Make sure you added test users (in Development mode)
3. Verify scopes are correctly set:
   - .../auth/userinfo.email
   - .../auth/userinfo.profile
   - openid
```

---

#### **4. User Created but No Profile in Database**

**Issue:**
```
User appears in Supabase Auth
But no entry in users table
```

**Solution:**
```
This means your database trigger isn't working.

Check:
1. Does the trigger exist?
   - Go to Supabase SQL Editor
   - Run: 
     SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

2. If not, create it:
   - See supabase-schema.sql
   - Run the trigger creation SQL

3. Manually create profile:
   INSERT INTO public.users (id, email, name, role, email_verified)
   VALUES (
     'auth-user-id',
     'user@email.com',
     'User Name',
     'user',
     true
   );
```

---

#### **5. "Invalid Client" Error**

**Error Message:**
```
Error: invalid_client
Client authentication failed
```

**Solution:**
```
1. Double-check your credentials in Supabase
2. Make sure you copied:
   - Full Client ID (Google)
   - Full Client Secret (Google)
   - Full App ID (Facebook)
   - Full App Secret (Facebook)

3. No extra spaces
4. No missing characters

5. Re-copy from source and paste again
```

---

#### **6. Callback URL Not Working Locally**

**Issue:**
```
Social login works in production
But not on localhost
```

**Solution:**
```
This is expected!

OAuth providers (Google/Facebook) typically don't allow 
localhost redirect URLs for security.

Workarounds:
1. Use deployed URL for testing
2. Use ngrok to expose localhost:
   - Install ngrok
   - Run: ngrok http 5173
   - Use ngrok URL in OAuth settings
   
3. For Facebook, you can add localhost in Development Mode
```

---

## 📋 Quick Checklist

Before going live, make sure:

### **Google:**
- [ ] Project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth Client ID created
- [ ] Authorized JavaScript origins added
- [ ] Authorized redirect URIs added (Supabase callback)
- [ ] Client ID and Secret copied
- [ ] Credentials added to Supabase
- [ ] Provider enabled in Supabase
- [ ] Tested login flow

### **Facebook:**
- [ ] App created
- [ ] Facebook Login product added
- [ ] Valid OAuth Redirect URIs added (Supabase callback)
- [ ] App domains configured
- [ ] App ID and Secret copied
- [ ] Credentials added to Supabase
- [ ] Provider enabled in Supabase
- [ ] App in Live mode (or test users added)
- [ ] Tested login flow

---

## 🎯 Quick Reference

### **Supabase Callback URL Format:**
```
https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
```

### **Where to Add This URL:**

**Google:**
```
APIs & Services 
→ Credentials 
→ Your OAuth Client 
→ Authorized redirect URIs
```

**Facebook:**
```
Your App 
→ Products 
→ Facebook Login 
→ Settings 
→ Valid OAuth Redirect URIs
```

---

### **Where to Find Credentials:**

**Google:**
```
APIs & Services → Credentials → Your OAuth Client
Client ID: xxxxx.apps.googleusercontent.com
Client Secret: GOCSPX-xxxxx
```

**Facebook:**
```
Settings → Basic
App ID: 1234567890123456
App Secret: [Click Show] xxxxx
```

---

### **Where to Add in Supabase:**

```
Supabase Dashboard
→ Authentication
→ Providers
→ Google (or Facebook)
→ Enter credentials
→ Save
```

---

## 📚 Official Documentation

### **Google:**
- Console: https://console.cloud.google.com/
- Docs: https://developers.google.com/identity/protocols/oauth2
- OAuth Setup: https://support.google.com/cloud/answer/6158849

### **Facebook:**
- Developers: https://developers.facebook.com/
- Docs: https://developers.facebook.com/docs/facebook-login
- OAuth Guide: https://developers.facebook.com/docs/facebook-login/web

### **Supabase:**
- Auth Docs: https://supabase.com/docs/guides/auth
- Social Login: https://supabase.com/docs/guides/auth/social-login
- Google: https://supabase.com/docs/guides/auth/social-login/auth-google
- Facebook: https://supabase.com/docs/guides/auth/social-login/auth-facebook

---

## 🚀 Next Steps

After setup:

1. **Test thoroughly** in development
2. **Add error handling** in your app
3. **Configure consent screens** properly
4. **Add privacy policy** and terms
5. **Submit for review** (if needed)
6. **Switch to production** mode
7. **Monitor auth logs** in Supabase

---

## ⚠️ Important Notes

### **Privacy & Terms:**
```
Both Google and Facebook require:
- Privacy Policy URL
- Terms of Service URL

Make sure these are:
- Publicly accessible
- Actually describe your app
- Include data handling info
```

### **App Review:**
```
Facebook may require app review if you:
- Need certain permissions
- Want to go fully public
- Need advanced features

Plan for this in your timeline.
```

### **Rate Limits:**
```
OAuth providers have rate limits:
- Google: 10,000 requests/day (free tier)
- Facebook: Varies by app status

Monitor your usage.
```

### **Security:**
```
NEVER commit your secrets to git!
- Add .env to .gitignore
- Use environment variables
- Rotate keys if exposed
```

---

## 📞 Need Help?

If you're stuck:

1. **Check error messages** carefully
2. **Compare with this guide** step by step
3. **Check official docs** for provider-specific issues
4. **Check Supabase logs** in Dashboard → Logs
5. **Test with a fresh account** to rule out caching issues

---

## ✅ Summary

You've learned:

- ✅ How to create Google OAuth credentials
- ✅ How to create Facebook OAuth credentials
- ✅ How to configure providers in Supabase
- ✅ How to set up redirect URLs correctly
- ✅ How to test social authentication
- ✅ How to troubleshoot common issues

---

**Status:** 📖 Complete Setup Guide  
**Last Updated:** December 2024  
**Next:** Test your social login! 🚀
