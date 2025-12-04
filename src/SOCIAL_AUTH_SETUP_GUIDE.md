# 🔐 Google & Facebook Sign-In Setup Guide - Sanjari Prints

**Complete guide to enable social authentication with Supabase**

---

## 🎯 What We're Setting Up

Users will be able to:
- ✅ Sign up with Google (one click)
- ✅ Sign up with Facebook (one click)
- ✅ Link existing accounts
- ✅ Auto-fill profile data from social accounts
- ✅ Seamless authentication experience

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│              USER CLICKS BUTTON                      │
│         "Sign in with Google/Facebook"               │
└────────────────────┬────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│         SUPABASE AUTH (OAuth Flow)                   │
├─────────────────────────────────────────────────────┤
│  1. Redirects to Google/Facebook                    │
│  2. User logs in to their account                   │
│  3. User grants permissions                         │
│  4. Redirects back with auth code                   │
│  5. Supabase exchanges code for token               │
│  6. Creates/updates user in database                │
└────────────────────┬────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│           USER LOGGED IN! ✅                         │
│  - Profile auto-filled (name, email, avatar)        │
│  - Redirected to dashboard                          │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Part 1: Google Sign-In Setup (20 minutes)

### **Step 1: Create Google OAuth App (10 min)**

**1.1 Go to Google Cloud Console**
```
https://console.cloud.google.com/
```

**1.2 Create New Project**
```
1. Click "Select a project" (top left)
2. Click "NEW PROJECT"
3. Project name: "Sanjari Prints"
4. Click "CREATE"
5. Wait for project to be created (30 seconds)
6. Select your new project
```

**1.3 Enable Google+ API**
```
1. Go to: https://console.cloud.google.com/apis/library
2. Search: "Google+ API"
3. Click "Google+ API"
4. Click "ENABLE"
5. Wait for it to enable
```

**1.4 Configure OAuth Consent Screen**
```
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Select "External" (for public users)
3. Click "CREATE"

OAuth consent screen:
- App name: Sanjari Prints
- User support email: sanjariprint@gmail.com
- App logo: (upload your logo - optional)
- Application home page: https://yourdomain.com
- Developer contact: sanjariprint@gmail.com

4. Click "SAVE AND CONTINUE"

Scopes:
5. Click "ADD OR REMOVE SCOPES"
6. Select:
   - .../auth/userinfo.email
   - .../auth/userinfo.profile
   - openid
7. Click "UPDATE"
8. Click "SAVE AND CONTINUE"

Test users (for development):
9. Click "ADD USERS"
10. Add your test email: khan191997@gmail.com
11. Click "ADD"
12. Click "SAVE AND CONTINUE"
```

**1.5 Create OAuth Credentials**
```
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "CREATE CREDENTIALS"
3. Select "OAuth client ID"

Configure:
- Application type: "Web application"
- Name: "Sanjari Prints Web App"

Authorized JavaScript origins:
- http://localhost:5173 (for development)
- https://yourdomain.com (for production)
- https://hgxhdmcqrcsjsxuaeyrl.supabase.co (Supabase)

Authorized redirect URIs:
- https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback

4. Click "CREATE"
```

**1.6 Copy Credentials**
```
You'll see a popup with:

Client ID: 
1234567890-abcdefghijklmnop.apps.googleusercontent.com

Client Secret:
GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz

⚠️ SAVE THESE - YOU'LL NEED THEM!
```

---

### **Step 2: Configure Google in Supabase (5 min)**

**2.1 Go to Supabase Auth Providers**
```
https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/providers
```

**2.2 Enable Google Provider**
```
1. Find "Google" in the list
2. Toggle it ON (switch turns green)

3. Fill in the credentials:
   - Client ID: (paste from Google Cloud Console)
   - Client Secret: (paste from Google Cloud Console)

4. Redirect URL (already shown):
   https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback

5. Click "Save"
```

**2.3 Configure Site URL**
```
Still on the Auth Providers page:

1. Scroll to "Site URL" section
2. Set:
   - Development: http://localhost:5173
   - Production: https://yourdomain.com

3. Click "Save"
```

---

### **Step 3: Test Google Sign-In (5 min)**

**Testing in your app (after code update):**
```
1. Run your app: npm run dev
2. Go to: http://localhost:5173/login
3. Click "Sign in with Google"
4. Google popup should appear
5. Sign in with your Google account
6. Grant permissions
7. Should redirect back and be logged in! ✅
```

---

## 📘 Part 2: Facebook Sign-In Setup (30 minutes)

### **Step 1: Create Facebook App (15 min)**

**1.1 Go to Facebook Developers**
```
https://developers.facebook.com/
```

**1.2 Create App**
```
1. Click "My Apps" (top right)
2. Click "Create App"
3. Select "Consumer" (for login)
4. Click "Next"

App Details:
- App name: Sanjari Prints
- App contact email: sanjariprint@gmail.com
- Business account: (optional - skip for now)

5. Click "Create App"
6. Complete security check (CAPTCHA)
```

**1.3 Add Facebook Login Product**
```
1. In dashboard, find "Facebook Login"
2. Click "Set Up"
3. Select "Web"
4. Site URL: http://localhost:5173
5. Click "Save"
6. Click "Continue"
7. Skip quickstart steps
```

**1.4 Configure Facebook Login Settings**
```
1. Go to: Dashboard → Products → Facebook Login → Settings

2. Valid OAuth Redirect URIs:
   https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback

3. Deauthorize Callback URL:
   https://yourdomain.com/auth/deauthorize

4. Allowed Domains for the JavaScript SDK:
   - localhost
   - yourdomain.com
   - hgxhdmcqrcsjsxuaeyrl.supabase.co

5. Login from Devices: OFF
6. Force Web OAuth Reauthentication: OFF
7. Use Strict Mode for Redirect URIs: ON

8. Click "Save Changes"
```

**1.5 Get App Credentials**
```
1. Go to: Dashboard → Settings → Basic

You'll see:
- App ID: 1234567890123456
- App Secret: abcdef1234567890abcdef1234567890

⚠️ SAVE THESE!

2. Scroll down to "App Domains"
   Add:
   - localhost
   - yourdomain.com

3. Privacy Policy URL: https://yourdomain.com/privacy-policy
4. Terms of Service URL: https://yourdomain.com/terms

5. Click "Save Changes"
```

**1.6 Make App Live**
```
⚠️ IMPORTANT: Your app starts in "Development Mode"

For Production:
1. Top right: Toggle "App Mode" from "Development" to "Live"
2. You'll need to complete:
   - Privacy Policy URL
   - Terms of Service URL
   - App Icon (1024x1024)
   - Business verification (if applicable)

For Testing:
- Keep in Development Mode
- Add test users: Dashboard → Roles → Testers
- Add email: khan191997@gmail.com
```

---

### **Step 2: Configure Facebook in Supabase (5 min)**

**2.1 Go to Supabase Auth Providers**
```
https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/providers
```

**2.2 Enable Facebook Provider**
```
1. Find "Facebook" in the list
2. Toggle it ON (switch turns green)

3. Fill in:
   - Facebook App ID: (from Facebook Dashboard)
   - Facebook App Secret: (from Facebook Dashboard)

4. Redirect URL (shown):
   https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback

5. Click "Save"
```

---

### **Step 3: Request Permissions (10 min)**

**3.1 Configure Data Access**
```
1. In Facebook Dashboard → Settings → Advanced
2. Scroll to "Upgrade API version"
3. Select latest version (v18.0 or higher)
4. Save

5. Go to: App Review → Permissions and Features
6. Request permissions:
   - email (usually approved instantly)
   - public_profile (default)
```

**3.2 Test Facebook Login**
```
1. Run your app: npm run dev
2. Go to: http://localhost:5173/login
3. Click "Sign in with Facebook"
4. Facebook popup should appear
5. Sign in with Facebook test account
6. Grant permissions
7. Should redirect back and be logged in! ✅
```

---

## 💻 Part 3: Update Frontend Code (30 minutes)

### **Update 1: AuthContextSupabase.tsx**

Add social login functions:

```typescript
// Add this after the login function

// Social login (Google/Facebook)
const socialLogin = async (
  provider: 'google' | 'facebook'
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // OAuth will redirect to provider's login page
    // User will be redirected back after authentication
    return { success: true };
  } catch (error: any) {
    console.error('Social login error:', error);
    return { success: false, error: error.message || 'Social login failed' };
  }
};
```

Add to context interface:

```typescript
interface AuthContextType {
  // ... existing properties
  socialLogin: (provider: 'google' | 'facebook') => Promise<{ success: boolean; error?: string }>;
}
```

Add to context provider:

```typescript
<AuthContext.Provider
  value={{
    // ... existing values
    socialLogin,
  }}
>
```

---

### **Update 2: SignupPage.tsx**

Update the social signup handlers:

```typescript
const handleSocialSignup = async (provider: 'google' | 'facebook') => {
  try {
    const { socialLogin } = useAuth(); // Get from context
    
    toast.info(`Signing up with ${provider}...`);
    
    const result = await socialLogin(provider);
    
    if (!result.success) {
      toast.error(result.error || `Failed to sign up with ${provider}`);
    }
    // Note: User will be redirected to provider's site
    // They'll come back via callback URL
  } catch (error) {
    console.error('Social signup error:', error);
    toast.error('An error occurred during signup');
  }
};
```

Update button handlers:

```typescript
// Google button
onClick={() => handleSocialSignup('google')}

// Facebook button
onClick={() => handleSocialSignup('facebook')}
```

---

### **Update 3: LoginPage.tsx**

Same updates as SignupPage:

```typescript
const handleSocialLogin = async (provider: 'google' | 'facebook') => {
  try {
    const { socialLogin } = useAuth();
    
    toast.info(`Logging in with ${provider}...`);
    
    const result = await socialLogin(provider);
    
    if (!result.success) {
      toast.error(result.error || `Failed to login with ${provider}`);
    }
  } catch (error) {
    console.error('Social login error:', error);
    toast.error('An error occurred during login');
  }
};
```

---

### **Update 4: Create OAuth Callback Page**

Create new file: `/pages/AuthCallbackPage.tsx`

```typescript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner@2.0.3';

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from URL hash
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Callback error:', error);
          toast.error('Authentication failed. Please try again.');
          navigate('/login');
          return;
        }

        if (session) {
          // Check if user profile exists
          const { data: userProfile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (!userProfile) {
            // Create user profile from OAuth data
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata.full_name || 
                      session.user.user_metadata.name || 
                      'User',
                phone: session.user.user_metadata.phone || '',
                password_hash: 'oauth',
                role: 'user',
                email_verified: true,
              });

            if (insertError) {
              console.error('Profile creation error:', insertError);
            }
          }

          toast.success('Login successful! Welcome back.');
          navigate('/dashboard');
        } else {
          toast.error('No session found. Please try again.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Callback handling error:', error);
        toast.error('An error occurred. Please try again.');
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}
```

---

### **Update 5: App.tsx Routing**

Add the callback route:

```typescript
import { AuthCallbackPage } from './pages/AuthCallbackPage';

// In your routes:
<Route path="/auth/callback" element={<AuthCallbackPage />} />
```

---

## 🗄️ Database Schema Update

### **Update users table for OAuth**

```sql
-- Add OAuth fields to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS oauth_provider TEXT,
ADD COLUMN IF NOT EXISTS oauth_uid TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Create index for OAuth lookups
CREATE INDEX IF NOT EXISTS idx_users_oauth 
ON public.users(oauth_provider, oauth_uid);
```

---

## 🧪 Testing Checklist

### **Google Sign-In Tests**
- [ ] Development: Sign up with Google works
- [ ] Development: Sign in with Google works
- [ ] Profile data auto-filled (name, email)
- [ ] Avatar image loaded (if available)
- [ ] User redirected to dashboard
- [ ] Session persists after refresh
- [ ] Logout works
- [ ] Can sign in again

### **Facebook Sign-In Tests**
- [ ] Development: Sign up with Facebook works
- [ ] Development: Sign in with Facebook works
- [ ] Profile data auto-filled (name, email)
- [ ] Avatar image loaded
- [ ] User redirected to dashboard
- [ ] Session persists after refresh
- [ ] Logout works
- [ ] Can sign in again

### **Edge Cases**
- [ ] Existing email user tries OAuth with same email (should link)
- [ ] User denies permissions (graceful error)
- [ ] Network error during OAuth (retry works)
- [ ] User cancels OAuth popup (back to login page)

---

## 🔒 Security Best Practices

### **1. Validate OAuth Responses**
```typescript
// Always check session exists
if (!session || !session.user) {
  throw new Error('Invalid session');
}

// Verify email exists
if (!session.user.email) {
  throw new Error('Email not provided by OAuth provider');
}
```

### **2. Handle Account Linking**
```typescript
// Check if email already exists
const { data: existingUser } = await supabase
  .from('users')
  .select('*')
  .eq('email', session.user.email)
  .single();

if (existingUser && existingUser.password_hash !== 'oauth') {
  // Email/password account exists
  // Option 1: Link accounts
  // Option 2: Show error asking user to login with password
}
```

### **3. Secure Redirect URLs**
```typescript
// Whitelist allowed redirect domains
const allowedDomains = [
  'localhost:5173',
  'yourdomain.com',
];

// Validate redirect URL
if (!allowedDomains.some(domain => redirectUrl.includes(domain))) {
  throw new Error('Invalid redirect URL');
}
```

---

## 🚨 Troubleshooting

### **Google: "Error 400: redirect_uri_mismatch"**

**Cause:** Redirect URI not whitelisted in Google Cloud Console

**Solution:**
```
1. Go to Google Cloud Console → Credentials
2. Edit your OAuth client
3. Add to Authorized redirect URIs:
   https://hgxhdmcqrcsjsxuaeyrl.supabase.co/auth/v1/callback
4. Save
5. Wait 5 minutes for changes to propagate
6. Try again
```

---

### **Facebook: "Can't Load URL: The domain is not included in the app's domains"**

**Cause:** Domain not added to Facebook app settings

**Solution:**
```
1. Facebook Dashboard → Settings → Basic
2. Add to "App Domains":
   - localhost
   - hgxhdmcqrcsjsxuaeyrl.supabase.co
3. Save
4. Try again
```

---

### **"User profile not created after OAuth"**

**Cause:** Database trigger or manual insert failing

**Solution:**
```typescript
// Check Supabase logs
https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/logs/postgres-logs

// Manually create profile if needed
const { error } = await supabase.from('users').insert({
  id: session.user.id,
  email: session.user.email,
  name: session.user.user_metadata.full_name,
  // ... other fields
});
```

---

### **"Session not persisting after redirect"**

**Cause:** Storage not configured properly

**Solution:**
```typescript
// In supabase.ts, ensure localStorage is used:
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: window.localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
```

---

## 📋 Complete Setup Checklist

### **Google OAuth**
- [ ] Created Google Cloud Project
- [ ] Enabled Google+ API
- [ ] Configured OAuth consent screen
- [ ] Created OAuth credentials
- [ ] Copied Client ID and Secret
- [ ] Enabled Google in Supabase
- [ ] Added credentials to Supabase
- [ ] Tested Google sign-in

### **Facebook OAuth**
- [ ] Created Facebook Developer account
- [ ] Created Facebook App
- [ ] Added Facebook Login product
- [ ] Configured OAuth redirect URIs
- [ ] Added app domains
- [ ] Copied App ID and Secret
- [ ] Enabled Facebook in Supabase
- [ ] Added credentials to Supabase
- [ ] Made app live (for production)
- [ ] Tested Facebook sign-in

### **Frontend Code**
- [ ] Updated AuthContextSupabase.tsx
- [ ] Updated SignupPage.tsx
- [ ] Updated LoginPage.tsx
- [ ] Created AuthCallbackPage.tsx
- [ ] Updated App.tsx routing
- [ ] Tested all flows

### **Database**
- [ ] Added OAuth fields to users table
- [ ] Created indexes
- [ ] Tested profile creation

---

## 🎯 Quick Summary

**Time to Complete:** 1-2 hours total

**Google Setup:** 20 minutes
**Facebook Setup:** 30 minutes  
**Code Updates:** 30 minutes
**Testing:** 15 minutes

**Result:**
- ✅ One-click Google sign-in
- ✅ One-click Facebook sign-in
- ✅ Auto-filled user profiles
- ✅ Professional authentication experience
- ✅ Better conversion rates!

---

**Ready to implement?** I can:
1. ✅ Update all the code files
2. ✅ Create the callback page
3. ✅ Update the database schema
4. ✅ Test the implementation

**Let me know when you're ready and I'll update the code!** 🚀
