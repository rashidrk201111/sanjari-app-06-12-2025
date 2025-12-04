# 📧 Supabase Email Setup Guide - Sanjari Prints

**Quick setup guide to enable email verification for user signups**

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Enable Email Confirmation

1. **Go to Supabase Auth Settings:**
   ```
   https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/providers
   ```

2. **Click on "Email" provider** (should already be enabled)

3. **Enable these toggles:**
   - ✅ **"Confirm email"** - This makes users verify their email before they can use the account
   - ✅ **"Secure email change"** - Users must verify when changing their email

4. **Click "Save"** at the bottom

---

### Step 2: Configure Email Templates (Optional)

1. **Go to Email Templates:**
   ```
   https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/templates
   ```

2. **Customize the "Confirm signup" template:**
   
   **Current default template:**
   ```html
   <h2>Confirm your signup</h2>
   <p>Follow this link to confirm your user:</p>
   <p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
   ```

   **Suggested custom template:**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <style>
       body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
       .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
       .header { background: #1e40af; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
       .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
       .button { 
         display: inline-block; 
         background: #f97316; 
         color: white; 
         padding: 14px 30px; 
         text-decoration: none; 
         border-radius: 6px; 
         margin: 20px 0;
       }
       .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
     </style>
   </head>
   <body>
     <div class="container">
       <div class="header">
         <h1>🎉 Welcome to Sanjari Prints!</h1>
       </div>
       <div class="content">
         <h2>Verify Your Email Address</h2>
         <p>Thank you for creating an account with Sanjari Prints!</p>
         <p>To complete your registration and start ordering, please verify your email address by clicking the button below:</p>
         
         <a href="{{ .ConfirmationURL }}" class="button">Verify Email Address</a>
         
         <p><small>Or copy and paste this link into your browser:</small></p>
         <p><small>{{ .ConfirmationURL }}</small></p>
         
         <hr style="margin: 30px 0; border: 0; border-top: 1px solid #e5e7eb;">
         
         <p><strong>What's next?</strong></p>
         <ul>
           <li>Browse our wide range of printing services</li>
           <li>Calculate prices instantly with our Price Calculator</li>
           <li>Place orders and track them in real-time</li>
           <li>Get exclusive offers and updates</li>
         </ul>
         
         <p>If you didn't create this account, you can safely ignore this email.</p>
       </div>
       <div class="footer">
         <p><strong>Sanjari Prints</strong></p>
         <p>📧 sanjariprint@gmail.com | 📞 +91 7350001266 / 9323684301</p>
         <p>&copy; 2024 Sanjari Prints. All rights reserved.</p>
       </div>
     </div>
   </body>
   </html>
   ```

3. **Click "Save"**

---

### Step 3: Configure Redirect URLs

1. **Go to URL Configuration:**
   ```
   https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/auth/url-configuration
   ```

2. **Add your site URL:**
   - Development: `http://localhost:5173`
   - Production: `https://yourdomain.com`

3. **Add redirect URLs (one per line):**
   ```
   http://localhost:5173/**
   https://yourdomain.com/**
   ```

4. **Click "Save"**

---

## 🧪 Testing Email Verification

### Test 1: Sign up with a real email

1. Go to your website: `http://localhost:5173/signup`
2. Fill in the form with a **real email address** you have access to
3. Click "Create Account"
4. You should be redirected to the "Verify Email" page
5. **Check your email inbox** for the verification email

### Test 2: Click verification link

1. Open the verification email
2. Click the "Verify Email Address" button
3. You should be redirected to your website
4. Try logging in - it should work now!

### Test 3: Resend verification email

1. On the "Verify Email" page, wait for 60 seconds countdown
2. Click "Resend Verification Email"
3. Check your inbox again - you should receive another email

---

## ⚠️ Important: Configure SMTP for Production

**Current Setup:** Uses Supabase's default email service  
**Limitation:** Only **3 emails per hour** (not suitable for production!)

### Recommended: Set up Custom SMTP

**Step 1: Choose an email provider:**
- **Gmail** (free, limited)
- **SendGrid** (free tier: 100 emails/day)
- **Resend** (free tier: 100 emails/day)
- **AWS SES** (pay as you go, very cheap)
- **Mailgun** (pay as you go)

**Step 2: Configure SMTP in Supabase:**

1. Go to SMTP Settings:
   ```
   https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/settings/auth
   ```

2. Scroll to **"SMTP Settings"**

3. Enable **"Enable Custom SMTP"**

4. Fill in your SMTP details:

   **Example for Gmail:**
   ```
   Host: smtp.gmail.com
   Port: 587
   Sender email: your-email@gmail.com
   Sender name: Sanjari Prints
   Username: your-email@gmail.com
   Password: your-app-password (NOT your Gmail password!)
   ```

   **How to get Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Create new app password for "Mail"
   - Use that password in Supabase SMTP settings

5. **Click "Save"**

6. **Test the connection** by clicking "Send test email"

---

## 🎯 Current Implementation Status

### ✅ What's Working Now:

1. **Signup Flow:**
   - User signs up → Redirected to "Verify Email" page
   - Supabase sends verification email automatically
   - User clicks link → Email verified
   - User can login

2. **Resend Email:**
   - If user doesn't receive email, they can resend it
   - 60-second cooldown between resends

3. **Email Verification UI:**
   - Professional "Verify Email" page
   - Clear instructions
   - Countdown timer for resend button

### ❌ What's NOT Implemented Yet:

1. **Email Verification Enforcement:**
   - Users can currently login WITHOUT verifying email
   - Need to add check in login flow

2. **Order Confirmation Emails:**
   - NOT IMPLEMENTED - Shows UI message only
   - Need to set up email service (Resend/SendGrid)
   - Need to create order email template
   - Estimated effort: 2-3 hours

3. **Order Status Update Emails:**
   - When order status changes (processing → shipped → delivered)
   - Need to implement webhook/trigger system

---

## 🔒 Enforce Email Verification (Optional)

If you want to **force users to verify email before they can login:**

**Option 1: Block login for unverified users**

Edit `/context/AuthContextSupabase.tsx` - Add this after line 246:

```tsx
// Login user
const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: "Login failed" };
    }

    // ⭐ NEW: Check if email is verified
    if (!data.user.email_confirmed_at) {
      await supabase.auth.signOut(); // Log them out
      return { 
        success: false, 
        error: "Please verify your email before logging in. Check your inbox." 
      };
    }

    // User profile and orders will be fetched automatically by onAuthStateChange
    return { success: true };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
};
```

**Option 2: Show warning but allow login**

Add a banner in the user dashboard showing "Please verify your email" if not verified.

---

## 🐛 Troubleshooting

### "Email not received"

**Check:**
1. Spam/junk folder
2. Email address is correct
3. Supabase email quota not exceeded (3/hour with default)
4. Wait a few minutes - emails can be delayed

**Solutions:**
- Set up custom SMTP (unlimited emails)
- Check Supabase logs for errors
- Use a different email provider (Gmail, Outlook)

### "Verification link expired"

**Cause:** Links expire after 24 hours by default

**Solution:**
- Click "Resend Verification Email" on the verify page
- User will get a new link

### "Can't configure SMTP"

**Common issues:**
- Wrong password (use app password, not account password)
- Wrong port (use 587 for TLS, 465 for SSL)
- Firewall blocking SMTP connection
- Need to enable "Less secure apps" (Gmail)

---

## 📊 Email Deliverability Best Practices

### 1. Use a Custom Domain

Instead of sending from `noreply@supabase.co`, send from your own domain:
- `noreply@sanjariprints.com`
- `orders@sanjariprints.com`
- `support@sanjariprints.com`

**Benefits:**
- Better deliverability
- More professional
- Less likely to be marked as spam

### 2. Set up SPF, DKIM, DMARC

These are DNS records that prove you own the domain:

**SPF Record:**
```
v=spf1 include:_spf.google.com ~all
```

**DKIM:** Configured by your email provider

**DMARC Record:**
```
v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
```

### 3. Warm up your email account

- Don't send 1000 emails on day 1
- Gradually increase volume over 2-4 weeks
- Start with 10-20/day, increase slowly

### 4. Monitor bounce rates

- Keep bounce rate < 2%
- Remove invalid email addresses
- Use email validation on signup

---

## 📋 Quick Checklist

- [ ] Enable "Confirm email" in Supabase Auth settings
- [ ] Test signup with real email address
- [ ] Receive and verify email works
- [ ] Test resend email functionality
- [ ] Customize email template (optional)
- [ ] Set up custom SMTP for production
- [ ] Add redirect URLs for production domain
- [ ] Test with different email providers (Gmail, Yahoo, Outlook)
- [ ] Decide if you want to enforce email verification
- [ ] Plan order confirmation email implementation

---

## 🚀 Next Steps

### Immediate (Today):
1. ✅ Enable email confirmation in Supabase
2. ✅ Test signup and email verification
3. ✅ Customize email template

### Short-term (This Week):
1. Set up custom SMTP (SendGrid/Resend)
2. Test email deliverability
3. Plan order confirmation emails

### Long-term (Next Week):
1. Implement order confirmation emails
2. Implement order status update emails
3. Add email preferences in user dashboard
4. Consider SMS notifications for orders

---

## 📞 Support

**Supabase Email Auth Docs:**  
https://supabase.com/docs/guides/auth/auth-email

**Supabase SMTP Configuration:**  
https://supabase.com/docs/guides/auth/auth-smtp

**Email Template Variables:**  
https://supabase.com/docs/guides/auth/auth-email-templates

**Need Help?**  
- Supabase Discord: https://discord.supabase.com
- Supabase Support: support@supabase.com

---

**Status:** ✅ **READY TO CONFIGURE**  
**Time Required:** 5-10 minutes  
**Priority:** HIGH - Do this now!
