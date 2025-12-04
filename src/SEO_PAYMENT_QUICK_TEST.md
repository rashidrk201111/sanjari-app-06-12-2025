# ⚡ Quick Test Guide - SEO & Payment Integration

## 🧪 5-Minute Verification

### Test 1: SEO Tab Visible (30 seconds)

1. Login to Admin Dashboard
   - Email: `admin@sanjariprints.com`
   - Password: `admin123`

2. Look for tabs at top
   - Should see: Overview, Orders, Users, Pricing, Content, **SEO**, **Payment**, Settings

3. Click "SEO" tab
   - **Expected:** SEO settings page loads
   - **Should see:** Basic SEO, Analytics, Advanced Configuration sections

**✅ Pass:** SEO tab shows settings
**❌ Fail:** Blank page or tab missing

---

### Test 2: SEO Settings Save (1 minute)

1. In SEO tab, update:
   - Default Page Title: "Test Title - Sanjari Prints"
   - Google Analytics ID: "G-TEST123456"

2. Click "Save SEO Settings" button

3. Refresh the page

4. Go back to SEO tab

5. **Expected:** 
   - Title shows "Test Title - Sanjari Prints"
   - Analytics ID shows "G-TEST123456"

**✅ Pass:** Settings persist after refresh
**❌ Fail:** Settings reset to defaults

---

### Test 3: Payment Tab Visible (30 seconds)

1. Still in Admin Dashboard

2. Click "Payment" tab

3. **Expected:** Payment Gateway Settings page loads

4. **Should see:**
   - Razorpay section with toggle
   - PhonePe section with toggle
   - COD section with toggle
   - Active Payment Methods summary at bottom

**✅ Pass:** Payment tab shows all sections
**❌ Fail:** Blank page or missing sections

---

### Test 4: Razorpay Configuration (1 minute)

1. In Payment tab

2. Toggle "Razorpay Payment Gateway" ON

3. Section expands showing:
   - Test Mode switch
   - Key ID field
   - Key Secret field (password type)

4. Enter test values:
   - Key ID: `rzp_test_1234567890`
   - Key Secret: `secret_key_test`

5. Click eye icon on Key Secret
   - **Expected:** Secret becomes visible

6. Click "Save Payment Settings"

7. Refresh page and return to Payment tab

8. **Expected:**
   - Razorpay still enabled
   - Key ID preserved
   - Key Secret preserved (but masked)

**✅ Pass:** Razorpay settings save correctly
**❌ Fail:** Settings lost after refresh

---

### Test 5: PhonePe Configuration (1 minute)

1. In Payment tab

2. Toggle "PhonePe Payment Gateway" ON

3. Enter test values:
   - Merchant ID: `M1234567890`
   - Salt Key: `test-salt-key-123`
   - Salt Index: `1`

4. Click "Save Payment Settings"

5. Refresh and verify settings persist

**✅ Pass:** PhonePe settings save correctly
**❌ Fail:** Settings lost

---

### Test 6: COD Toggle (30 seconds)

1. In Payment tab

2. Toggle "Cash on Delivery" ON

3. **Expected:** Green note appears about COD being enabled

4. Check "Active Payment Methods" section at bottom
   - Razorpay should show "Active"
   - PhonePe should show "Active"
   - COD should show "Active"

5. Save settings

**✅ Pass:** All three payment methods show as active
**❌ Fail:** Status not updating

---

### Test 7: LocalStorage Verification (30 seconds)

1. Open Browser DevTools (F12)

2. Go to Console tab

3. Type and run:
   ```javascript
   JSON.parse(localStorage.getItem('seoSettings'))
   ```

4. **Expected:** Shows SEO settings object

5. Type and run:
   ```javascript
   JSON.parse(localStorage.getItem('paymentGateway'))
   ```

6. **Expected:** Shows payment gateway object with your settings

**✅ Pass:** Both objects exist with your data
**❌ Fail:** Null or undefined

---

### Test 8: Security Features (30 seconds)

1. In Payment tab

2. Check Razorpay Key Secret field
   - **Expected:** Shows dots/asterisks (•••)

3. Check PhonePe Salt Key field
   - **Expected:** Shows dots/asterisks (•••)

4. Click eye icon on Secret field
   - **Expected:** Field changes to text, shows actual value

5. Click eye icon again
   - **Expected:** Field masks again

**✅ Pass:** Password masking works correctly
**❌ Fail:** Keys always visible or won't reveal

---

## 🎯 Full Integration Test (Advanced)

### Test 9: SEO Component Usage

1. Open `/components/SEOHead.tsx` in code editor

2. Verify it exists and has:
   - `SEOHead` component
   - `StructuredData` component

3. Check `/pages/HomePage.tsx` or any page

4. Add at top of component:
   ```tsx
   import { SEOHead } from "../components/SEOHead";
   
   // Inside component:
   <SEOHead 
     title="Test Page - Sanjari Prints"
     description="This is a test"
   />
   ```

5. Visit that page in browser

6. Right-click → View Page Source

7. Look in `<head>` section for:
   - `<title>Test Page - Sanjari Prints</title>`
   - `<meta name="description" content="This is a test">`

**✅ Pass:** Meta tags appear in page source
**❌ Fail:** No meta tags found

---

### Test 10: Analytics Script Loading

1. In Admin SEO tab, enter:
   - Google Analytics ID: `G-XXXXXXXXXX` (any format)

2. Save settings

3. Go to any page on the site

4. Right-click → View Page Source

5. Search for "gtag" or "analytics" in source

6. **Expected:** Should find Google Analytics script
   - Only if not on localhost
   - Component checks hostname

**✅ Pass:** Analytics script present (or skipped on localhost)
**❌ Fail:** Script not loading

---

## 🐛 Common Issues & Fixes

### Issue 1: SEO/Payment tabs show blank

**Cause:** Component files not found or import error

**Fix:**
1. Check `/components/admin/SEOSettingsTab.tsx` exists
2. Check `/components/admin/PaymentSettingsTab.tsx` exists
3. Check browser console for import errors
4. Refresh page

---

### Issue 2: Settings don't save

**Cause:** LocalStorage error or context not updating

**Fix:**
1. Open console
2. Check for errors
3. Try: `localStorage.clear()`
4. Refresh and retry
5. Check if localStorage is disabled in browser

---

### Issue 3: Tabs not showing

**Cause:** Admin dashboard tab list not updated

**Fix:**
1. Check AdminDashboardPage.tsx has 8 tabs (not 6)
2. Verify `grid-cols-8` in TabsList
3. Look for SEO and Payment TabsTrigger components

---

### Issue 4: Import errors

**Cause:** Path issues

**Fix:**
```tsx
// In AdminDashboardPage.tsx, verify imports:
import { SEOSettingsTab } from "../components/admin/SEOSettingsTab";
import { PaymentSettingsTab } from "../components/admin/PaymentSettingsTab";
```

---

## ✅ Success Criteria

All tests pass when:

- [x] SEO tab visible and loads
- [x] SEO settings save and persist
- [x] Payment tab visible and loads
- [x] Razorpay config saves and persists
- [x] PhonePe config saves and persists
- [x] COD toggle works
- [x] LocalStorage contains settings
- [x] Password fields mask/unmask
- [x] SEOHead component exists
- [x] Analytics scripts load (when configured)

**Score: ___/10 tests passed**

- **10/10** - Perfect! Ready for production
- **8-9/10** - Excellent! Minor tweaks needed
- **6-7/10** - Good! Some fixes required
- **<6/10** - Needs debugging

---

## 🔍 Debug Commands

### Check SEO Settings:
```javascript
// In browser console
const seo = JSON.parse(localStorage.getItem('seoSettings'));
console.table(seo);
```

### Check Payment Settings:
```javascript
const payment = JSON.parse(localStorage.getItem('paymentGateway'));
console.log('Razorpay:', payment.razorpay);
console.log('PhonePe:', payment.phonepe);
console.log('COD:', payment.codEnabled);
```

### Reset Everything:
```javascript
localStorage.removeItem('seoSettings');
localStorage.removeItem('paymentGateway');
location.reload();
```

### Check Context:
```javascript
// In AdminDashboardPage component, add console.log
console.log('SEO Settings:', seoSettings);
console.log('Payment Gateway:', paymentGateway);
```

---

## 📊 Expected Results

### SEO Tab Should Show:

```
┌─────────────────────────────────────┐
│ SEO Settings                        │
│ Optimize your website for search... │
│                         [Save SEO]  │
├─────────────────────────────────────┤
│ 🌐 Basic SEO Configuration          │
│                                     │
│ Default Page Title                  │
│ [Sanjari Prints - Professional...] │
│                                     │
│ Default Meta Description            │
│ [Professional printing services...] │
│                                     │
│ ... more fields ...                 │
├─────────────────────────────────────┤
│ ✅ Analytics & Tracking              │
│                                     │
│ Google Analytics ID                 │
│ [G-XXXXXXXXXX]                      │
│                                     │
│ ... more fields ...                 │
├─────────────────────────────────────┤
│ ⚠️ Advanced Configuration            │
│                                     │
│ [✓] Enable XML Sitemap              │
│                                     │
│ Robots.txt Content                  │
│ [User-agent: *...]                  │
└─────────────────────────────────────┘
```

### Payment Tab Should Show:

```
┌─────────────────────────────────────┐
│ Payment Gateway Settings            │
│ Configure payment methods...        │
│                    [Save Payment]   │
├─────────────────────────────────────┤
│ ⚠️ Security Note: Never share API... │
├─────────────────────────────────────┤
│ 💳 Razorpay Payment Gateway   [OFF]│
│                                     │
│ When enabled:                       │
│ - Test Mode [ON]                    │
│ - Key ID [rzp_test_xxx]            │
│ - Key Secret [••••••••] 👁️          │
├─────────────────────────────────────┤
│ 💵 PhonePe Payment Gateway    [OFF]│
│                                     │
│ When enabled:                       │
│ - Test Mode [ON]                    │
│ - Merchant ID [M123...]             │
│ - Salt Key [••••••••] 👁️            │
│ - Salt Index [1]                    │
├─────────────────────────────────────┤
│ ✅ Cash on Delivery            [ON]│
├─────────────────────────────────────┤
│ Active Payment Methods              │
│                                     │
│ 💳 Razorpay          [Disabled]     │
│ 💵 PhonePe           [Disabled]     │
│ ✅ Cash on Delivery  [Active]       │
└─────────────────────────────────────┘
```

---

## 🎉 If All Tests Pass

**Congratulations!** 🎊

Your SEO and Payment Gateway integration is:
- ✅ Fully functional
- ✅ Saving correctly
- ✅ Persisting data
- ✅ Security features working
- ✅ Ready for use!

**Next Steps:**
1. Configure real SEO settings for your site
2. Set up actual payment gateway accounts
3. Get real API keys
4. Test with small transactions
5. Go live! 🚀

---

**Quick Test Complete!** ⚡

Total time: ~5-10 minutes
Success rate: High if all files created correctly
