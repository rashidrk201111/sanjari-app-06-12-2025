# ⚡ Payment Gateway - Quick Start Guide

## 🚀 Get Started in 5 Minutes!

### Option 1: Enable Razorpay (Recommended)

#### Step 1: Get Razorpay Keys (2 minutes)
1. Go to https://razorpay.com and sign up
2. Click "Generate Test Keys" (no KYC needed for testing)
3. Copy:
   - **Key ID**: `rzp_test_xxxxxxxxxxxxx`
   - **Key Secret**: `xxxxxxxxxxxxx`

#### Step 2: Configure in Admin (1 minute)
1. Login: `/admin/login`
2. Go to **Payment** tab
3. Find "Razorpay Payment Gateway"
4. Toggle **ON** ✅
5. Toggle **Test Mode** ON ✅
6. Paste **Key ID**
7. Paste **Key Secret**
8. Click **Save Payment Settings** 💾

#### Step 3: Test It! (2 minutes)
1. Go to `/all-products`
2. Add product to cart
3. Go to checkout
4. Enter address details
5. Select "Razorpay Payment Gateway"
6. Click "Place Order & Pay"
7. Use test card:
   - **Card**: 4111 1111 1111 1111
   - **CVV**: 123
   - **Expiry**: 12/25

✅ **Done! You're accepting payments!**

---

### Option 2: Enable Cash on Delivery (30 seconds)

#### Super Quick Setup
1. Login: `/admin/login`
2. Go to **Payment** tab
3. Find "Cash on Delivery"
4. Toggle **ON** ✅
5. Click **Save Payment Settings** 💾

✅ **Done! Customers can order with COD!**

---

### Option 3: Enable PhonePe

#### Requirements
- PhonePe merchant account
- Merchant ID, Salt Key, Salt Index
- UAT or Production credentials

#### Setup Steps
1. Login: `/admin/login`
2. Go to **Payment** tab
3. Find "PhonePe Payment Gateway"
4. Toggle **ON** ✅
5. Toggle **Test Mode** ON (for UAT) ✅
6. Enter **Merchant ID**
7. Enter **Salt Key**
8. Enter **Salt Index** (usually 1)
9. Click **Save Payment Settings** 💾

✅ **Done! PhonePe is active!**

---

## 🧪 Testing Payments

### Test Razorpay
```
Card Number: 4111 1111 1111 1111
CVV: 123
Expiry: Any future date (e.g., 12/25)
Name: Test User
```

Or use test UPI:
```
UPI ID: success@razorpay
```

### Test PhonePe
- Use PhonePe UAT environment
- Follow PhonePe sandbox instructions
- Use test merchant credentials

### Test COD
- Just place order
- No payment required
- Order created immediately

---

## 🎯 What Customers See

### Checkout Flow
1. **Add to Cart** → Product added
2. **Checkout** → Enter address
3. **Payment** → See available methods:
   - 💳 Razorpay (if enabled)
   - 📱 PhonePe (if enabled)
   - 💰 Cash on Delivery (if enabled)
4. **Select Method** → Click payment option
5. **Pay** → Complete payment
6. **Confirmation** → Order placed!

---

## 📊 Check Your Orders

### Admin Dashboard
1. Login: `/admin/login`
2. Go to **Orders** tab
3. See all orders with:
   - Order number
   - Payment method
   - Payment status
   - Customer details

### Customer Dashboard
1. Customer logs in
2. Goes to `/dashboard`
3. Sees their orders
4. Can track status

---

## 🔥 Go Live Checklist

### Before Going Live:
- [ ] Get LIVE Razorpay keys (after KYC)
- [ ] Replace test keys with live keys
- [ ] Toggle OFF "Test Mode"
- [ ] Test with real small payment (₹1)
- [ ] Verify order saves correctly
- [ ] Enable SSL/HTTPS
- [ ] Test on mobile device

### Going Live:
1. Admin → Payment → Razorpay
2. Toggle "Test Mode" OFF
3. Update **Key ID** (live key starts with `rzp_live_`)
4. Update **Key Secret** (live secret)
5. Save settings
6. Test with real ₹1 payment
7. Start accepting orders! 🎉

---

## 🆘 Quick Troubleshooting

### "No payment methods available"
**Fix**: Enable at least one payment method in admin panel

### "Razorpay credentials not configured"
**Fix**: Add Key ID and Key Secret in Payment tab

### Payment popup doesn't open
**Fix**: Check internet connection, refresh page

### Order not saving
**Fix**: Check browser console, verify server is running

---

## 💡 Pro Tips

1. **Start with Test Mode**: Always test before going live
2. **Enable COD First**: Easiest to set up, works immediately
3. **Use Razorpay for All**: Razorpay handles UPI, cards, wallets in one
4. **Monitor Orders**: Check admin dashboard regularly
5. **Test Mobile**: 70% of orders come from mobile

---

## 📞 Need Help?

### Razorpay Support
- Dashboard: https://dashboard.razorpay.com
- Docs: https://razorpay.com/docs
- Support: https://razorpay.com/support

### PhonePe Support
- Dashboard: https://business.phonepe.com
- Docs: https://developer.phonepe.com/docs

---

## ✅ Success Checklist

You're ready when you see:

- ✅ Payment method enabled in admin
- ✅ Green "Active" badge in Payment Settings
- ✅ Payment option shows on checkout
- ✅ Test payment completes successfully
- ✅ Order appears in admin dashboard
- ✅ Order appears in customer dashboard (if logged in)

---

## 🎉 You're All Set!

**Your payment gateway is configured and ready to accept orders!**

**Next Steps:**
1. Test with small order
2. Share checkout link with friends
3. Monitor first few orders
4. Go live when confident
5. Start making money! 💰

**Happy Selling! 🚀**
