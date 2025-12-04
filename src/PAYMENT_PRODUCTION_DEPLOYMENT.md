# 🚀 Payment Gateway - Production Deployment Guide

## 📋 Pre-Deployment Checklist

Before deploying your payment gateway to production, complete these steps:

### ✅ Phase 1: Testing (Complete in Test Mode)

- [ ] **Razorpay Test Mode Works**
  - [ ] Test card payment successful
  - [ ] Test UPI payment successful
  - [ ] Test net banking successful
  - [ ] Order saves correctly
  - [ ] Payment ID captured
  - [ ] Order appears in dashboard

- [ ] **PhonePe Test Mode Works** (if using)
  - [ ] UAT payment successful
  - [ ] Redirect flow works
  - [ ] Callback received
  - [ ] Status check works
  - [ ] Order saves correctly

- [ ] **COD Works** (if enabled)
  - [ ] Order places immediately
  - [ ] No payment required
  - [ ] Order status is "pending"

- [ ] **Edge Cases Tested**
  - [ ] Payment cancellation handled
  - [ ] Payment failure handled
  - [ ] Multiple payment attempts work
  - [ ] Cart clears after successful payment
  - [ ] Guest checkout works
  - [ ] Logged-in user checkout works

### ✅ Phase 2: Razorpay Live Setup

#### 1. Complete KYC Verification
```
Time Required: 1-3 business days
Required Documents:
  - Business PAN card
  - Business registration certificate
  - Bank account details
  - ID proof of authorized signatory
  - Address proof of business
```

Steps:
1. Login to https://dashboard.razorpay.com
2. Go to Settings → Account
3. Click "Complete KYC"
4. Upload required documents
5. Wait for verification (1-3 days)
6. Receive email confirmation

#### 2. Generate Live API Keys
1. Login to Razorpay Dashboard
2. Go to Settings → API Keys
3. Click "Generate Live Keys"
4. Copy:
   - Live Key ID: `rzp_live_xxxxxxxxxxxxx`
   - Live Key Secret: `xxxxxxxxxxxxx`
5. Store securely (never commit to code)

#### 3. Configure Webhooks
1. Dashboard → Settings → Webhooks
2. Add webhook URL:
   ```
   https://your-project-id.supabase.co/functions/v1/make-server-a145b27b/razorpay-webhook
   ```
3. Select events:
   - payment.authorized
   - payment.captured
   - payment.failed
   - refund.created
4. Copy webhook secret
5. Save webhook

#### 4. Update Admin Panel
1. Login to `/admin/login`
2. Go to Payment tab
3. Razorpay settings:
   - Toggle **Test Mode OFF** ❌
   - Update **Key ID** (live key)
   - Update **Key Secret** (live secret)
   - Save settings

### ✅ Phase 3: PhonePe Live Setup (if using)

#### 1. Complete Merchant Verification
```
Time Required: 3-7 business days
Required:
  - Business registration
  - Bank account
  - KYC documents
  - Live website/app
```

Steps:
1. Login to https://business.phonepe.com
2. Complete merchant onboarding
3. Submit required documents
4. Wait for approval
5. Receive production credentials

#### 2. Get Production Credentials
1. Login to PhonePe merchant dashboard
2. Access production environment
3. Get credentials:
   - Merchant ID
   - Production Salt Key
   - Salt Index
4. Store securely

#### 3. Configure Webhooks
1. PhonePe Dashboard → Settings
2. Add callback URL:
   ```
   https://your-project-id.supabase.co/functions/v1/make-server-a145b27b/phonepe-callback
   ```
3. Save configuration

#### 4. Update Admin Panel
1. Login to `/admin/login`
2. Go to Payment tab
3. PhonePe settings:
   - Toggle **Test Mode OFF** ❌
   - Update **Merchant ID** (production)
   - Update **Salt Key** (production)
   - Update **Salt Index**
   - Save settings

### ✅ Phase 4: Security Hardening

#### 1. Environment Variables
```bash
# These should be in Supabase Edge Function secrets
# NEVER commit these to code

RAZORPAY_LIVE_KEY_ID=rzp_live_xxxxx
RAZORPAY_LIVE_KEY_SECRET=xxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxx

PHONEPE_MERCHANT_ID=Mxxxxx
PHONEPE_SALT_KEY=xxxxx
PHONEPE_SALT_INDEX=1
```

#### 2. SSL/HTTPS Configuration
- [ ] Domain has valid SSL certificate
- [ ] All API calls use HTTPS
- [ ] Redirect URIs use HTTPS
- [ ] Webhook URLs use HTTPS
- [ ] No mixed content warnings

#### 3. CORS Configuration
```typescript
// Restrict to your domain only
cors({
  origin: "https://yourdomain.com",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
})
```

#### 4. Rate Limiting
- [ ] Implement rate limiting on payment endpoints
- [ ] Max 5 payment attempts per minute per user
- [ ] Block suspicious IPs
- [ ] Log all payment attempts

### ✅ Phase 5: Testing in Production

#### 1. Test with Real Small Payment
```
Amount: ₹1.00
Method: Razorpay
Card: Your real card
```

Steps:
1. Create test order
2. Use real payment details
3. Complete payment
4. Verify order creation
5. Check Razorpay dashboard
6. Verify webhook received (if configured)
7. Initiate refund (optional)

#### 2. Test on Different Devices
- [ ] Desktop Chrome
- [ ] Desktop Safari
- [ ] Desktop Firefox
- [ ] Mobile Chrome
- [ ] Mobile Safari
- [ ] Mobile app (if applicable)

#### 3. Test Different Payment Methods
- [ ] Credit card
- [ ] Debit card
- [ ] UPI
- [ ] Net banking
- [ ] Wallet
- [ ] PhonePe (if enabled)
- [ ] COD (if enabled)

### ✅ Phase 6: Monitoring Setup

#### 1. Enable Logging
```typescript
// Add detailed logging in server endpoints
console.log("Payment initiated:", {
  orderId,
  amount,
  method,
  timestamp: new Date().toISOString()
});
```

#### 2. Error Tracking
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor payment failures
- [ ] Track webhook failures
- [ ] Alert on critical errors

#### 3. Dashboard Monitoring
- [ ] Check Razorpay dashboard daily
- [ ] Check PhonePe dashboard daily
- [ ] Monitor order success rate
- [ ] Track failed payments
- [ ] Review refund requests

### ✅ Phase 7: Customer Communication

#### 1. Order Confirmation Emails
```
Required Information:
  - Order number
  - Payment method
  - Payment ID
  - Total amount
  - Expected delivery
  - Contact support
```

#### 2. Payment Failure Emails
```
Include:
  - Reason for failure
  - Steps to retry
  - Alternative payment methods
  - Support contact
```

#### 3. Support Documentation
- [ ] Payment FAQs
- [ ] Supported payment methods
- [ ] Refund policy
- [ ] Contact information
- [ ] Troubleshooting guide

---

## 🚨 Common Production Issues

### Issue 1: "Invalid API Key"
**Cause**: Using test keys in production
**Fix**: Update to live keys in admin panel

### Issue 2: Webhook Not Received
**Cause**: Incorrect webhook URL or signature
**Fix**: 
- Verify webhook URL in gateway dashboard
- Check server logs
- Verify signature validation code

### Issue 3: Payment Succeeds but Order Not Created
**Cause**: Webhook processing error
**Fix**:
- Check server logs
- Verify database connection
- Test order creation manually

### Issue 4: High Payment Failure Rate
**Cause**: Various (bank issues, card problems, etc.)
**Fix**:
- Analyze failure reasons in gateway dashboard
- Add clear error messages
- Offer alternative payment methods
- Contact payment gateway support

---

## 📊 Performance Optimization

### 1. Reduce Payment Latency
```typescript
// Parallel API calls where possible
const [orderResult, settingsResult] = await Promise.all([
  createOrder(),
  fetchSettings()
]);
```

### 2. Cache Payment Settings
```typescript
// Cache payment settings for 5 minutes
let cachedSettings = null;
let cacheTime = 0;

if (Date.now() - cacheTime > 300000) {
  cachedSettings = await fetchSettings();
  cacheTime = Date.now();
}
```

### 3. Optimize Database Queries
- [ ] Index order_number field
- [ ] Index payment_id field
- [ ] Optimize order queries
- [ ] Use connection pooling

---

## 🔒 Security Best Practices

### Critical Rules
1. **NEVER** expose API secrets in frontend
2. **ALWAYS** verify payment signatures on server
3. **ALWAYS** use HTTPS for all payment pages
4. **NEVER** trust client-side payment status
5. **ALWAYS** verify payment status from server
6. **NEVER** commit secrets to git
7. **ALWAYS** validate payment amounts on server
8. **NEVER** allow amount manipulation from frontend

### Security Checklist
- [ ] API secrets stored server-side only
- [ ] Signature verification enabled
- [ ] HTTPS enforced
- [ ] Amount validation on server
- [ ] Payment status verified from gateway
- [ ] Rate limiting enabled
- [ ] Input sanitization
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection

---

## 📈 Go-Live Plan

### Week Before Launch
- [ ] Complete all testing
- [ ] Get live API keys
- [ ] Configure webhooks
- [ ] Update admin panel
- [ ] Test with ₹1 payment
- [ ] Train support team
- [ ] Prepare FAQs
- [ ] Set up monitoring

### Launch Day
- [ ] Deploy to production
- [ ] Test all payment methods
- [ ] Monitor first 10 orders closely
- [ ] Be available for support
- [ ] Watch error logs
- [ ] Check gateway dashboards

### Week After Launch
- [ ] Review payment success rate
- [ ] Analyze failed payments
- [ ] Collect customer feedback
- [ ] Fix any issues
- [ ] Optimize based on data
- [ ] Document learnings

---

## 📞 Support Contacts

### Razorpay Support
- **Email**: support@razorpay.com
- **Phone**: 1800-120-654321
- **Dashboard**: https://dashboard.razorpay.com
- **Docs**: https://razorpay.com/docs

### PhonePe Support
- **Email**: merchantsupport@phonepe.com
- **Dashboard**: https://business.phonepe.com
- **Docs**: https://developer.phonepe.com

### Your Support
- **Email**: sanjariprint@gmail.com
- **Phone**: +91 7350001266 / 9323684301

---

## ✅ Final Checklist

Before going live, ensure:

### Technical
- [ ] Live API keys configured
- [ ] Test mode disabled
- [ ] Webhooks configured
- [ ] SSL certificate active
- [ ] Monitoring enabled
- [ ] Error tracking set up
- [ ] Backup system in place

### Business
- [ ] KYC completed
- [ ] Settlement account verified
- [ ] Refund policy defined
- [ ] Support team trained
- [ ] FAQs prepared
- [ ] Terms & conditions updated

### Testing
- [ ] Live ₹1 payment successful
- [ ] All payment methods tested
- [ ] Mobile testing complete
- [ ] Error handling tested
- [ ] Edge cases covered

### Documentation
- [ ] Customer guide ready
- [ ] Support documentation
- [ ] Internal processes documented
- [ ] Troubleshooting guide

---

## 🎉 You're Ready for Production!

**Congratulations!** You've completed all the steps to deploy your payment gateway to production.

**Remember:**
- Start small and monitor closely
- Be available for first few orders
- Learn from initial feedback
- Iterate and improve
- Scale gradually

**You're now ready to accept real payments and grow your business! 🚀**

**Good luck with your launch! 💰**
