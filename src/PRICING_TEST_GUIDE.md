# Quick Pricing Integration Test Guide

## ⚡ 5-Minute Verification Test

### Step 1: Add a Pricing Rule (2 minutes)

1. Navigate to **Admin Login** page
2. Login with demo credentials:
   - Email: `admin@sanjariprints.com`
   - Password: `admin123`

3. Go to **Pricing** tab in Admin Dashboard

4. Select **Category:** "visiting-cards"

5. Find **"Business Cards"** subcategory (should be orange/unconfigured)

6. Click **"+ Add"** button on Business Cards

7. Fill in the pricing form:
   ```
   Base Price: 8.00
   
   Paper Type 1:
   - Name: Premium
   - Price Modifier: 2.00
   
   Quantity Discount 1:
   - Minimum Quantity: 100
   - Discount: 10
   ```

8. Click **"Add Pricing Rule"**

9. **Verify:** Business Cards card turns **GREEN** ✅

---

### Step 2: Test Price Calculator (1 minute)

1. Navigate to **Price Calculator** page (main menu)

2. Select:
   - **Category:** Visiting Cards
   - **Subcategory:** Business Cards
   - **Paper:** Premium (or any paper with "Premium" in name)
   - **Quantity:** 100

3. Click **"Calculate Price"**

4. **Expected Result:**
   ```
   Base Price: ₹8.00 per card
   Paper Modifier: +₹2.00 (Premium)
   Subtotal: ₹10.00 × 100 = ₹1,000
   Discount (10%): -₹100
   Final Total: ₹900
   ```

5. **Verify:** Price reflects your admin settings! ✅

---

### Step 3: Test Product Configuration (1 minute)

1. Navigate to **All Products** → **Visiting Cards** → **Business Cards**

2. Click **"Configure & Order"**

3. Set:
   - **Quantity:** 100
   - **Paper:** Premium (if available in dropdown)

4. **Verify:** 
   - Price shown at bottom: **₹900** (or similar based on configuration)
   - Matches the price calculator! ✅

---

### Step 4: Test Quantity Discount Tiers (1 minute)

**In Price Calculator or Product Configuration:**

1. Set quantity to **99** → No discount applied
2. Set quantity to **100** → 10% discount shows!
3. Set quantity to **150** → Still 10% discount (same tier)

**Verify:** Discount applies at correct threshold! ✅

---

## 🎯 What You Should See

### ✅ SUCCESS Indicators:

1. **Admin Dashboard:**
   - Business Cards card is **GREEN**
   - Shows "Base: ₹8" in the card
   - Edit icon appears (not "+ Add" button)
   - Coverage shows "1 of X subcategories configured"

2. **Price Calculator:**
   - Calculated price uses **₹8 base** (not default ₹5)
   - Premium paper adds **₹2** modifier
   - 100+ quantity applies **10% discount**
   - All modifiers work correctly

3. **Product Configuration:**
   - Price matches calculator exactly
   - Updates dynamically as you change options
   - Discount applies at correct thresholds

---

## ❌ Troubleshooting

### Issue: Pricing rule saved but price calculator shows old price

**Solution:**
- Refresh the page
- Clear browser localStorage: `localStorage.clear()` in console
- Re-add the pricing rule

### Issue: Green card shows but price doesn't update

**Solution:**
- Check category slug matches (e.g., "visiting-cards" not "visitingcards")
- Check subcategory name matches exactly (case-insensitive)
- Verify pricing rule was saved: Check Admin Dashboard → Pricing tab

### Issue: Paper modifier not applying

**Solution:**
- Paper type name must be **contained** in selection
- Example: Rule "Premium" matches "Premium 80 GSM"
- Check paper dropdown values in the form

### Issue: Discount not applying

**Solution:**
- Ensure quantity meets minimum (>=100 for 10% off)
- Discount is percentage (10 = 10%, not 0.10)
- Check quantity field is a number, not string

---

## 🔥 Advanced Test: Documents with Full Configuration

### Admin Setup:

```
Category: documents
Subcategory: Black and White Printing
Base Price: 2.50

Paper Types:
1. Name: 70 GSM
   Modifier: 0.00
   
2. Name: 80 GSM
   Modifier: 0.50
   
3. Name: 100 GSM
   Modifier: 1.00

Binding Types:
1. Name: Spiral
   Price: 50.00
   
2. Name: Thermal
   Price: 30.00

Quantity Discounts:
1. Min Qty: 50
   Discount: 5
   
2. Min Qty: 100
   Discount: 10
   
3. Min Qty: 200
   Discount: 15
```

### Test Calculation:

**Inputs:**
- Pages: 50
- Copies: 100
- Paper: 80 GSM
- Binding: Spiral

**Expected Math:**
```
Base per page: ₹2.50
Paper modifier: +₹0.50
Price per page: ₹3.00

Pages × Copies × Price: 50 × 100 × 3.00 = ₹15,000
Quantity discount (10%): -₹1,500
Subtotal: ₹13,500

Binding: ₹50 × 100 copies = ₹5,000

TOTAL: ₹18,500
```

**Verify:** Calculator shows exactly ₹18,500! ✅

---

## 📊 Full Category Coverage Test

Test pricing rules across all 13 categories:

1. ✅ Documents
2. ✅ Books  
3. ✅ Thesis & Dissertation
4. ✅ Certificate & Cards
5. ✅ Marketing Materials
6. ✅ Posters
7. ✅ Flyers/Leaflets
8. ✅ Letterhead & Stationery
9. ✅ Visiting Cards
10. ✅ Business Stationery
11. ✅ Personalised Gifts
12. ✅ Stickers and Labels
13. ✅ Document Binding

**Goal:** Add at least one pricing rule per category and verify it works in both Price Calculator and Product Configuration!

---

## 🎉 Success Criteria

You'll know the integration is working when:

✅ Admin pricing rules save correctly
✅ Green/orange cards show accurate status
✅ Price calculator uses admin base prices
✅ Paper modifiers apply correctly
✅ Binding costs come from admin settings
✅ Quantity discounts auto-apply at thresholds
✅ Product configuration matches calculator
✅ Prices update immediately when rules change
✅ Fallback pricing works for unconfigured products

---

## 💡 Pro Tips

1. **Start with one category** (like Visiting Cards) to test thoroughly
2. **Use round numbers** for easier verification (₹5, ₹10, etc.)
3. **Test edge cases:**
   - Quantity just below discount threshold (99 vs 100)
   - Multiple discount tiers
   - Products with no pricing rule (should use defaults)
4. **Check both calculator and product pages** for consistency
5. **Verify in browser console** if needed:
   ```javascript
   // Check pricing rules
   JSON.parse(localStorage.getItem('sanjari_pricing_rules'))
   ```

---

## 📝 Expected Timeline

- ⏱️ **2 min:** Add first pricing rule
- ⏱️ **1 min:** Test price calculator
- ⏱️ **1 min:** Test product configuration
- ⏱️ **1 min:** Test discount tiers
- ⏱️ **5 min:** Test advanced documents scenario

**Total:** ~10 minutes for complete verification! 🚀

Happy Testing! Your pricing system is now fully integrated! 🎊
