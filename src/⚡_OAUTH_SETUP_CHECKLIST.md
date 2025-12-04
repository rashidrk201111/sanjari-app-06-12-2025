# ⚡ GOOGLE & FACEBOOK OAUTH - QUICK SETUP

## 🎯 **3-STEP PROCESS FOR EACH PROVIDER**

---

## 🔵 **GOOGLE OAUTH (15 Minutes)**

### **Step 1: Get Keys from Google**

1. Go to: **https://console.cloud.google.com/**
2. Create/Select project
3. **APIs & Services** → **Credentials**
4. **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen (if needed):
   - App name: **Sanjari Prints**
   - Support email: **sanjariprint@gmail.com**
6. Create OAuth Client:
   - Type: **Web application**
   - Authorized redirect URIs:
     ```
     https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
     ```
7. **Copy Client ID & Secret**

---

### **Step 2: Configure in Supabase**

1. Go to: **https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/providers**
2. Find **Google** provider
3. Toggle **Enable**
4. Paste:
   - Client ID: `<paste here>`
   - Client Secret: `<paste here>`
5. **Save**

---

### **Step 3: Test**

1. Go to login page: **http://localhost:5173/login**
2. Click **"Continue with Google"**
3. Select Google account
4. **✅ Should redirect back & login**

---

## 📘 **FACEBOOK OAUTH (15 Minutes)**

### **Step 1: Get Keys from Facebook**

1. Go to: **https://developers.facebook.com/**
2. **My Apps** → **Create App**
3. Type: **Consumer**
4. App name: **Sanjari Prints**
5. Contact email: **sanjariprint@gmail.com**
6. **Settings** → **Basic**
7. **Copy App ID & App Secret**

---

### **Step 2: Configure Facebook Login**

1. Add Product: **Facebook Login**
2. **Facebook Login** → **Settings**
3. Valid OAuth Redirect URIs:
   ```
   https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
   ```
4. **Save**

---

### **Step 3: Configure in Supabase**

1. Go to: **https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/providers**
2. Find **Facebook** provider
3. Toggle **Enable**
4. Paste:
   - Client ID: `<App ID from Facebook>`
   - Client Secret: `<App Secret from Facebook>`
5. **Save**

---

### **Step 4: Test**

1. Go to login page: **http://localhost:5173/login**
2. Click **"Continue with Facebook"**
3. Login to Facebook
4. **✅ Should redirect back & login**

---

## ✅ **VERIFICATION CHECKLIST**

### **Google OAuth:**
- [ ] Client ID obtained
- [ ] Client Secret obtained
- [ ] Redirect URI added: `https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback`
- [ ] Enabled in Supabase
- [ ] Keys pasted in Supabase
- [ ] Tested from login page
- [ ] User redirects to Google
- [ ] User returns to app
- [ ] User is logged in

### **Facebook OAuth:**
- [ ] App created
- [ ] App ID obtained
- [ ] App Secret obtained
- [ ] Facebook Login product added
- [ ] Redirect URI added: `https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback`
- [ ] Enabled in Supabase
- [ ] Keys pasted in Supabase
- [ ] Tested from login page
- [ ] User redirects to Facebook
- [ ] User returns to app
- [ ] User is logged in

---

## 🚨 **COMMON ISSUES**

### **"Redirect URI mismatch"**
**Fix:** Make sure redirect URI is exactly:
```
https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
```

### **"App not verified" (Google)**
**Options:**
1. Add test users in Google Cloud Console
2. Submit for verification (for production)
3. Click "Continue" on warning (for testing)

### **"App not live" (Facebook)**
**Fix:** 
1. Go to App Dashboard → **Settings** → **Basic**
2. Add **Privacy Policy URL** (can use placeholder)
3. Switch to **Live** mode

---

## 📋 **IMPORTANT URLS**

### **Supabase Auth Providers:**
```
https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/providers
```

### **Google Cloud Console:**
```
https://console.cloud.google.com/apis/credentials
```

### **Facebook Developers:**
```
https://developers.facebook.com/apps/
```

### **Redirect URI (Copy This):**
```
https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
```

---

## 💡 **PRO TIPS**

1. **Test with personal accounts first**
2. **Add test users if app is not verified/live**
3. **Keep Client Secrets secure** (don't commit to git)
4. **Use different apps for dev/production**

---

## 🎉 **RESULT**

After setup, users can:
- ✅ Login with Google (one click)
- ✅ Login with Facebook (one click)
- ✅ No password needed
- ✅ Auto account creation
- ✅ Profile info auto-filled

---

**⚡ Quick Setup! 15 minutes per provider! Ready to test!** 🚀
