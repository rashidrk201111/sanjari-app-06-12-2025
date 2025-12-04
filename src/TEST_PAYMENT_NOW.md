# 🧪 Test Payment Integration NOW!

## ⚡ 2-Minute Test (Razorpay)

### Step 1: Get Test Keys (30 seconds)
Don't have Razorpay account? Use these test keys:

```
Key ID: rzp_test_1DP5mmOlF5G5ag
Key Secret: thisissamplekey123456789
```

**Note**: These are demo keys. Get real test keys from https://razorpay.com

### Step 2: Configure Admin (1 minute)
1. Open: `http://localhost:5173/admin/login` (or your URL)
2. Login with admin credentials
3. Click **Payment** tab
4. Find **Razorpay Payment Gateway**
5. Toggle **ON** ✅
6. Toggle **Test Mode** ON ✅
7. Paste Key ID: `rzp_test_1DP5mmOlF5G5ag`
8. Paste Key Secret: `thisissamplekey123456789`
9. Click **Save Payment Settings** 💾

### Step 3: Test Checkout (30 seconds)
1. Go to: `/all-products`
2. Click any product → **Configure & Order**
3. Select options → **Add to Cart**
4. **View Cart** → **Proceed to Checkout**
5. Fill address form → **Continue to Payment**
6. Select **Razorpay Payment Gateway**
7. Click **Place Order & Pay**

✅ **Razorpay popup should open!**

### Step 4: Complete Test Payment
Use these test credentials:

**For Card Payment:**
```
Card Number: 4111 1111 1111 1111
CVV: 123
Expiry: 12/25
Cardholder: Test User
```

**For UPI:**
```
UPI ID: success@razorpay
```

**For Net Banking:**
- Select any bank
- Click "Success" on test page

---

## 🎯 What Should Happen

### ✅ Success Flow

1. **Razorpay Popup Opens**
   - Clean modal dialog
   - Shows amount and order details
   - Multiple payment options visible

2. **Payment Completes**
   - Success message in popup
   - Popup closes automatically
   - Toast: "Payment successful!"

3. **Order Confirmation**
   - Redirects to confirmation page
   - Shows order number (SPR12345678)
   - Green checkmark displayed
   - Order details visible

4. **Dashboard Update**
   - If logged in: Order appears in `/dashboard`
   - Order status: "Processing"
   - Payment ID captured

5. **Admin Dashboard**
   - Go to `/admin/login`
   - Orders tab shows new order
   - Payment method: "Razorpay"
   - Payment ID visible

---

## 🐛 Troubleshooting

### ❌ Popup Doesn't Open

**Symptoms:**
- Button clicks but nothing happens
- No error message
- Console shows errors

**Fix:**
```
1. Check browser console for errors
2. Verify Razorpay SDK loaded:
   - Open DevTools → Network
   - Look for "checkout.razorpay.com/v1/checkout.js"
   - Should show 200 status
3. Clear browser cache
4. Try incognito mode
5. Check internet connection
```

### ❌ "Razorpay is not enabled"

**Fix:**
```
1. Go to /admin/login
2. Click Payment tab
3. Toggle Razorpay ON
4. Click Save
5. Refresh checkout page
```

### ❌ "Invalid Key ID"

**Fix:**
```
1. Check Key ID format:
   - Test: starts with rzp_test_
   - Live: starts with rzp_live_
2. No extra spaces
3. Correct key for test/live mode
4. Re-enter in admin panel
```

### ❌ Payment Succeeds but Order Not Created

**Symptoms:**
- Payment completed in Razorpay
- Money deducted
- But order not showing

**Fix:**
```
1. Check browser console
2. Look for errors after payment
3. Check server logs:
   - Supabase → Edge Functions → Logs
4. Verify database connection
5. Check if order appears after refresh
```

---

## 📱 Test on Mobile

### iPhone/Safari
```
1. Open Safari
2. Go to your site
3. Complete checkout
4. Razorpay popup should work
5. Test UPI payment (if available)
```

### Android/Chrome
```
1. Open Chrome
2. Go to your site
3. Complete checkout
4. Test UPI apps integration
5. Test Google Pay
```

---

## 💰 Test COD (Fastest Test)

### 1-Minute COD Test

1. **Enable COD**
   - Admin → Payment → COD → Toggle ON → Save

2. **Test Order**
   - Add product to cart
   - Checkout
   - Enter address
   - Select "Cash on Delivery"
   - Click "Place Order & Pay"

3. **Instant Success**
   - Order created immediately
   - No payment popup
   - Order appears in dashboard

---

## 🔍 Verify Integration

### Check Server Endpoints

**1. Payment Settings API**
```bash
curl -X GET \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-a145b27b/payment-settings' \
  -H 'Authorization: Bearer YOUR_ANON_KEY'
```

Expected response:
```json
{
  "razorpay": {
    "enabled": true,
    "testMode": true,
    "keyId": "rzp_test_xxxxx"
  },
  "phonepe": {
    "enabled": false
  },
  "codEnabled": true
}
```

**2. Create Order API**
```bash
curl -X POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-a145b27b/create-razorpay-order' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount": 100,
    "currency": "INR",
    "receipt": "test_123"
  }'
```

Expected response:
```json
{
  "success": true,
  "orderId": "order_xxxxx",
  "amount": 10000,
  "currency": "INR",
  "keyId": "rzp_test_xxxxx"
}
```

---

## 📊 Test Scenarios

### Scenario 1: Happy Path
```
✅ Enable Razorpay in admin
✅ Add product to cart
✅ Complete checkout form
✅ Select Razorpay
✅ Pay with test card
✅ Payment succeeds
✅ Order created
✅ Confirmation shown
```

### Scenario 2: Payment Cancellation
```
✅ Start checkout
✅ Open Razorpay popup
❌ Click "X" to close popup
✅ Should show "Payment cancelled" toast
✅ Should stay on payment page
✅ Can retry payment
```

### Scenario 3: Payment Failure
```
✅ Start checkout
✅ Use failure test card: 4000 0000 0000 0002
❌ Payment fails
✅ Should show error message
✅ Should stay on payment page
✅ Can retry with different card
```

### Scenario 4: Multiple Payment Methods
```
✅ Enable Razorpay
✅ Enable COD
✅ Checkout should show both options
✅ Can switch between them
✅ Both work correctly
```

---

## 🎓 Advanced Testing

### Test with Real Money (₹1)

**Only after test mode works perfectly!**

1. **Get Live Keys**
   - Complete Razorpay KYC
   - Generate live keys
   - Update admin panel
   - Disable test mode

2. **Test Transaction**
   - Create order for ₹1
   - Use your real card
   - Complete payment
   - Verify in Razorpay dashboard

3. **Initiate Refund**
   - Razorpay Dashboard → Payments
   - Find ₹1 payment
   - Click "Refund"
   - Full refund
   - Verify refund received

---

## ✅ Success Indicators

You'll know it's working when:

### Admin Panel
- [x] Can toggle payment methods
- [x] Can save API keys
- [x] Shows "Active" badge
- [x] No error messages

### Checkout Page
- [x] Shows enabled payment methods
- [x] Test mode badge visible (if test mode)
- [x] Button enabled and clickable
- [x] Loading states work

### Payment Flow
- [x] Razorpay popup opens
- [x] Can select payment method
- [x] Test credentials work
- [x] Payment completes
- [x] Success toast shows

### Order Creation
- [x] Confirmation page shows
- [x] Order number displayed
- [x] Order in customer dashboard
- [x] Order in admin dashboard
- [x] Payment ID saved

---

## 📸 Visual Checklist

### What You Should See:

**Admin Payment Tab:**
```
┌─────────────────────────────────────┐
│ Payment Gateway Settings             │
├─────────────────────────────────────┤
│ Razorpay Payment Gateway             │
│ [ON] ✅                     [Active] │
│                                      │
│ Test Mode: [ON] ✅                   │
│ Key ID: rzp_test_xxxxx               │
│ Key Secret: ••••••••••               │
└─────────────────────────────────────┘
```

**Checkout Payment Step:**
```
┌─────────────────────────────────────┐
│ Payment Method                       │
├─────────────────────────────────────┤
│ ○ Razorpay Payment Gateway           │
│   UPI, Cards, Net Banking     [Test] │
│                                      │
│ ○ Cash on Delivery                   │
│   Pay when you receive               │
│                                      │
│ [Place Order & Pay ₹500]             │
└─────────────────────────────────────┘
```

**Razorpay Popup:**
```
┌─────────────────────────────────────┐
│ Pay ₹500 to Sanjari Prints      [X] │
├─────────────────────────────────────┤
│                                      │
│ [UPI] [Cards] [Netbanking] [Wallet] │
│                                      │
│ Card Number                          │
│ [4111 1111 1111 1111]                │
│                                      │
│ Expiry         CVV                   │
│ [12/25]        [123]                 │
│                                      │
│           [Pay ₹500]                 │
│                                      │
└─────────────────────────────────────┘
```

**Confirmation Page:**
```
┌─────────────────────────────────────┐
│         ✅ Order Placed!             │
│                                      │
│  Order Number: SPR12345678           │
│  Payment: Razorpay                   │
│  Total: ₹500                         │
│                                      │
│  [Continue Shopping]                 │
└─────────────────────────────────────┘
```

---

## 🚀 Quick Test Commands

### Full Test Flow (Copy-Paste)
```bash
# 1. Enable Razorpay in admin panel

# 2. Run this test
# Open: http://localhost:5173/all-products
# Add product to cart
# Checkout
# Fill form:
  Name: Test User
  Email: test@example.com  
  Phone: 9876543210
  Address: 123 Test St
  City: Mumbai
  State: Maharashtra
  Pincode: 400001

# Continue to payment
# Select: Razorpay
# Card: 4111 1111 1111 1111
# CVV: 123
# Expiry: 12/25
# Pay

# ✅ Should see success!
```

---

## 🎉 You're Ready!

If all tests pass, your payment integration is **WORKING PERFECTLY**!

**Next Steps:**
1. ✅ Test with team members
2. ✅ Test on different devices
3. ✅ Test different payment methods
4. ✅ Prepare for production launch

**Happy Testing! 🚀**
