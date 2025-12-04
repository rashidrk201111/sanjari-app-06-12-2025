# Custom Domain Setup Guide for Sanjari Prints

This guide will help you connect your custom domain to your Supabase project for the Sanjari Prints ecommerce website.

## Overview

After deploying your Edge Functions to Supabase, you can connect a custom domain to make your API endpoints and authentication work seamlessly with your own domain.

---

## Part 1: Configure Custom Domain in Supabase Dashboard

### Step 1: Access Custom Domains Settings

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your **Sanjari Prints** project
3. Click on **Settings** in the left sidebar
4. Click on **Custom Domains** under the Settings section

### Step 2: Add Your Custom Domain

1. Click **"Add custom domain"** button
2. Enter your domain name (e.g., `sanjariprints.com` or `api.sanjariprints.com`)
3. Click **"Add domain"**

**Important Domain Choices:**
- **Option A: Subdomain** (Recommended for API)
  - Use `api.sanjariprints.com` for your Supabase backend
  - Your main website can be on `sanjariprints.com` or `www.sanjariprints.com`
  
- **Option B: Main Domain**
  - Use `sanjariprints.com` directly for your Supabase backend
  - Less common, usually not recommended

### Step 3: Get DNS Configuration Details

After adding the domain, Supabase will provide you with DNS records to configure. You'll see:

1. **CNAME Record** or **A Record** details
2. **Verification TXT Record** (for domain ownership verification)

**Example DNS Records Provided by Supabase:**
```
Type: CNAME
Name: api (or your chosen subdomain)
Value: [your-project-ref].supabase.co

Type: TXT
Name: _supabase-challenge.api
Value: [verification-token]
```

---

## Part 2: Configure DNS Records with Your Domain Registrar

You need to add these DNS records at your domain registrar (where you purchased your domain).

### Common Domain Registrars:

#### For GoDaddy:
1. Log in to [GoDaddy](https://www.godaddy.com/)
2. Go to **My Products** → **Domains**
3. Click **DNS** next to your domain
4. Click **Add** to add new records
5. Add the CNAME and TXT records provided by Supabase

#### For Namecheap:
1. Log in to [Namecheap](https://www.namecheap.com/)
2. Go to **Domain List** → Click **Manage** next to your domain
3. Go to **Advanced DNS** tab
4. Click **Add New Record**
5. Add the CNAME and TXT records provided by Supabase

#### For Cloudflare:
1. Log in to [Cloudflare](https://www.cloudflare.com/)
2. Select your domain
3. Go to **DNS** tab
4. Click **Add record**
5. Add the CNAME and TXT records provided by Supabase
6. **Important:** Turn OFF the orange cloud (Proxy) for Supabase records - it should be "DNS only" (gray cloud)

#### For Google Domains (now Squarespace):
1. Log in to your domain manager
2. Go to **DNS** settings
3. Add **Custom resource records**
4. Add the CNAME and TXT records provided by Supabase

### Generic Steps for Any Registrar:

1. **Add CNAME Record:**
   - Type: `CNAME`
   - Name/Host: `api` (or your chosen subdomain)
   - Value/Points to: `[your-project-ref].supabase.co`
   - TTL: `3600` (or Auto)

2. **Add TXT Record:**
   - Type: `TXT`
   - Name/Host: `_supabase-challenge.api` (or as provided)
   - Value/Text: `[verification-token-from-supabase]`
   - TTL: `3600` (or Auto)

### DNS Propagation Time

- DNS changes can take **15 minutes to 48 hours** to propagate globally
- Usually takes 15-30 minutes for most providers
- You can check DNS propagation at: https://dnschecker.org/

---

## Part 3: Verify Domain in Supabase

1. Return to **Supabase Dashboard** → **Settings** → **Custom Domains**
2. Wait for DNS records to propagate (15-30 minutes)
3. Click **"Verify"** or **"Check DNS"** button
4. If verification succeeds, Supabase will automatically provision an SSL certificate
5. SSL certificate provisioning takes **5-10 minutes**

**Status Indicators:**
- 🟡 **Pending Verification** - Waiting for DNS propagation
- 🟡 **Provisioning SSL** - Creating SSL certificate
- 🟢 **Active** - Domain is ready to use

---

## Part 4: Update Your Application Code

Once your custom domain is verified and active, update your application to use the custom domain.

### Step 1: Update Environment Variables

Update your Supabase URL to use your custom domain:

**Before:**
```
VITE_SUPABASE_URL=https://[your-project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**After:**
```
VITE_SUPABASE_URL=https://api.sanjariprints.com
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 2: Update Supabase Client Configuration

The Supabase client will automatically use the custom domain from the environment variable:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL // Now points to api.sanjariprints.com
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Step 3: Update Edge Function URLs

Your Edge Functions will now be accessible at:

**Before:**
```
https://[your-project-ref].supabase.co/functions/v1/server
```

**After:**
```
https://api.sanjariprints.com/functions/v1/server
```

No code changes needed if you're using the Supabase client correctly!

---

## Part 5: Configure OAuth Redirect URLs

Update your OAuth provider redirect URLs to use the custom domain.

### Google OAuth Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Update **Authorized redirect URIs**:

**Add:**
```
https://api.sanjariprints.com/auth/v1/callback
```

**Keep the old one temporarily:**
```
https://[your-project-ref].supabase.co/auth/v1/callback
```

5. Click **Save**

### Supabase Auth Configuration:

1. Go to **Supabase Dashboard** → **Authentication** → **URL Configuration**
2. Update **Site URL** to your frontend domain:
   ```
   https://sanjariprints.com
   ```
   or
   ```
   https://www.sanjariprints.com
   ```

3. Add **Redirect URLs** (allowed redirect URLs after authentication):
   ```
   https://sanjariprints.com/**
   https://www.sanjariprints.com/**
   https://api.sanjariprints.com/**
   ```

---

## Part 6: Update Payment Gateway Webhooks

Update webhook URLs in Razorpay and PhonePe dashboards to use your custom domain.

### Razorpay Webhooks:

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings** → **Webhooks**
3. Update webhook URL to:
   ```
   https://api.sanjariprints.com/functions/v1/server/webhooks/razorpay
   ```

### PhonePe Webhooks:

1. Log in to PhonePe Merchant Dashboard
2. Go to webhook configuration settings
3. Update callback URL to:
   ```
   https://api.sanjariprints.com/functions/v1/server/webhooks/phonepe
   ```

---

## Part 7: Testing Your Custom Domain Setup

### Test 1: Verify DNS Resolution

Open terminal and run:
```bash
# Check CNAME record
nslookup api.sanjariprints.com

# Check TXT record
nslookup -type=TXT _supabase-challenge.api.sanjariprints.com
```

### Test 2: Test SSL Certificate

Visit in browser:
```
https://api.sanjariprints.com
```

You should see a valid SSL certificate (green padlock in browser).

### Test 3: Test Edge Functions

```bash
curl https://api.sanjariprints.com/functions/v1/server/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2025-11-20T..."
}
```

### Test 4: Test Authentication

Try logging in with Google OAuth. The redirect should work seamlessly with your custom domain.

### Test 5: Test Payment Integration

1. Add items to cart
2. Proceed to checkout
3. Complete payment with Razorpay or PhonePe
4. Verify webhook is received at custom domain URL

---

## Troubleshooting

### Issue 1: DNS Not Resolving

**Symptoms:** `nslookup` returns no results or NXDOMAIN

**Solutions:**
1. Double-check DNS records in your registrar dashboard
2. Wait longer for DNS propagation (up to 48 hours)
3. Clear your local DNS cache:
   ```bash
   # Windows
   ipconfig /flushdns
   
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

### Issue 2: SSL Certificate Not Provisioning

**Symptoms:** Domain shows "Provisioning SSL" for too long

**Solutions:**
1. Ensure DNS records are correctly configured
2. Remove and re-add the custom domain in Supabase
3. Check that you're not using Cloudflare proxy (must be DNS only)
4. Contact Supabase support if issue persists

### Issue 3: OAuth Not Working with Custom Domain

**Symptoms:** Authentication redirects fail or show errors

**Solutions:**
1. Verify redirect URLs are updated in Google Cloud Console
2. Check Supabase Auth URL Configuration
3. Ensure both old and new redirect URLs are added temporarily
4. Clear browser cache and cookies

### Issue 4: Webhooks Not Received

**Symptoms:** Payments complete but order status not updated

**Solutions:**
1. Verify webhook URLs are updated in Razorpay/PhonePe dashboards
2. Check Edge Function logs in Supabase Dashboard
3. Test webhook endpoint manually with curl
4. Verify signature verification is working correctly

### Issue 5: CORS Errors

**Symptoms:** API calls from frontend fail with CORS errors

**Solutions:**
1. Update CORS configuration in Edge Functions
2. Ensure `Access-Control-Allow-Origin` header is set correctly
3. Add your frontend domain to allowed origins

---

## Production Checklist

Before going live with your custom domain:

- [ ] DNS records added and verified in Supabase
- [ ] SSL certificate is active (green lock icon)
- [ ] Environment variables updated with custom domain
- [ ] Google OAuth redirect URLs updated
- [ ] Razorpay webhook URL updated
- [ ] PhonePe webhook URL updated
- [ ] Supabase Auth URL configuration updated
- [ ] All Edge Functions tested with custom domain
- [ ] Authentication flow tested end-to-end
- [ ] Payment flow tested end-to-end
- [ ] Admin panel accessible and functional
- [ ] All API endpoints responding correctly

---

## Additional Resources

### Documentation Links:
- [Supabase Custom Domains](https://supabase.com/docs/guides/platform/custom-domains)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Razorpay Webhooks](https://razorpay.com/docs/webhooks/)
- [Google OAuth Setup](https://support.google.com/cloud/answer/6158849)

### Support Contacts:
- **Supabase Support:** https://supabase.com/support
- **Domain Registrar:** Contact your registrar's support
- **Razorpay Support:** https://razorpay.com/support/
- **PhonePe Merchant Support:** Contact PhonePe merchant support

---

## Important Notes

1. **Keep Both URLs Temporarily:**
   - Keep both the default Supabase URL and custom domain active during transition
   - This ensures no downtime during DNS propagation
   - Remove old URLs from OAuth providers only after confirming everything works

2. **SSL/HTTPS Only:**
   - Supabase custom domains only support HTTPS
   - All traffic is automatically encrypted
   - Payment gateways require HTTPS for webhooks

3. **Email Configuration:**
   - Update email templates to use custom domain URLs
   - Go to **Supabase Dashboard** → **Authentication** → **Email Templates**
   - Replace `{{ .SiteURL }}` references if needed

4. **Monitoring:**
   - Monitor Edge Function logs after custom domain setup
   - Check for any authentication or payment errors
   - Set up alerts for failed webhooks

---

## Example: Complete Setup for sanjariprints.com

### Scenario:
- Main website: `sanjariprints.com`
- API/Backend: `api.sanjariprints.com`
- Supabase project: `abcdefghijklmnop`

### DNS Records at Registrar:

```
Type: CNAME
Name: api
Value: abcdefghijklmnop.supabase.co
TTL: 3600

Type: TXT  
Name: _supabase-challenge.api
Value: abc123verification456token
TTL: 3600
```

### Environment Variables:

```env
VITE_SUPABASE_URL=https://api.sanjariprints.com
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Google OAuth Redirect URLs:

```
https://api.sanjariprints.com/auth/v1/callback
```

### Razorpay Webhook URL:

```
https://api.sanjariprints.com/functions/v1/server/webhooks/razorpay
```

### PhonePe Callback URL:

```
https://api.sanjariprints.com/functions/v1/server/webhooks/phonepe
```

---

## Next Steps After Domain Setup

1. **Deploy Frontend:**
   - Deploy your React application to hosting (Vercel, Netlify, etc.)
   - Configure frontend domain (sanjariprints.com)
   - Update environment variables on hosting platform

2. **Test Everything:**
   - Complete end-to-end testing
   - Test on multiple devices and browsers
   - Verify all payments are processing correctly

3. **Monitor and Optimize:**
   - Set up monitoring and analytics
   - Monitor Edge Function performance
   - Track payment success rates

4. **Go Live:**
   - Announce launch
   - Monitor for any issues
   - Provide customer support

---

**Need Help?**

If you encounter any issues during custom domain setup, check the Troubleshooting section or contact:
- Supabase Support: https://supabase.com/support
- Your domain registrar support team

Good luck with your Sanjari Prints launch! 🚀
