# 💰 Pricing System Quick Reference

## ✅ What's Fixed

**Admin pricing rules now control ALL customer pricing across the entire app!**

---

## 🎯 How It Works

### Admin Side:
1. Go to **Admin Dashboard** → **Pricing** tab
2. Select a category (e.g., "visiting-cards")
3. Click **"+ Add"** on any orange subcategory card
4. Fill in pricing details:
   - Base Price (required)
   - Paper Types (optional)
   - Binding Types (optional)
   - Quantity Discounts (optional)
5. Click **"Add Pricing Rule"**
6. Card turns **GREEN** = configured ✅

### Customer Side:
1. Go to **Price Calculator** or **Product Configuration**
2. Select the same category/subcategory
3. Price automatically uses admin settings
4. Discounts auto-apply based on quantity
5. Paper/binding modifiers work automatically

---

## 📊 Pricing Components

### Base Price
- **What:** Starting price per unit/page
- **Example:** ₹8.00 per card
- **Required:** Yes

### Paper Type Modifiers
- **What:** Add or subtract from base price
- **Example:** "Premium" adds +₹2.00
- **Required:** No
- **Matching:** Inclusive (case-insensitive)

### Binding Types
- **What:** Fixed cost per copy
- **Example:** "Spiral" = ₹50 per copy
- **Required:** No (only for documents/books)
- **Matching:** Inclusive (case-insensitive)

### Quantity Discounts
- **What:** Percentage off at thresholds
- **Example:** 10% off at 100+ quantity
- **Required:** No
- **Tiers:** Multiple allowed (best one applies)

---

## 🧮 Calculation Examples

### Example 1: Simple Cards
```
Product: Business Cards
Base Price: ₹8.00
Quantity: 100
No discounts

Calculation:
₹8.00 × 100 = ₹800
```

### Example 2: Cards with Discount
```
Product: Business Cards
Base Price: ₹8.00
Quantity: 100
Discount: 10% at 100+

Calculation:
₹8.00 × 100 = ₹800
Discount: -₹80 (10%)
Total: ₹720
```

### Example 3: Documents Full Config
```
Product: Black & White Printing
Base Price: ₹2.50/page
Paper: 80 GSM (+₹0.50)
Pages: 50
Copies: 100
Binding: Spiral (₹50/copy)
Discount: 10% at 100+

Calculation:
Price per page: ₹2.50 + ₹0.50 = ₹3.00
Printing: 50 × 100 × ₹3.00 = ₹15,000
Discount: -₹1,500 (10%)
Subtotal: ₹13,500
Binding: 100 × ₹50 = ₹5,000
Total: ₹18,500
```

---

## 🎨 Visual Status Indicators

### Admin Dashboard Cards:

**🟢 GREEN Card**
- Pricing rule configured
- Shows base price
- Edit button visible
- Ready for customers

**🟠 ORANGE Card**
- No pricing rule
- Shows "+ Add" button
- Uses fallback pricing
- Needs configuration

---

## 🔧 Common Tasks

### Add First Pricing Rule:
1. Admin Dashboard → Pricing tab
2. Select category
3. Find orange card
4. Click "+ Add"
5. Fill form
6. Save

### Edit Existing Rule:
1. Admin Dashboard → Pricing tab
2. Select category
3. Find green card
4. Click edit icon (pencil)
5. Modify values
6. Save

### Delete Rule:
1. Open edit dialog
2. Click delete button
3. Confirm
4. Card turns orange
5. Fallback pricing applies

### View All Rules:
1. Admin Dashboard → Pricing tab
2. Category dropdown → "All Categories"
3. See complete list in table

---

## 💡 Pro Tips

### Tip 1: Start Small
- Configure 1-2 products first
- Test thoroughly
- Then expand to others

### Tip 2: Round Numbers
- Use ₹5, ₹10, ₹50 for easy verification
- Makes testing simpler

### Tip 3: Test Both Pages
- Check Price Calculator
- Check Product Configuration
- Prices should match exactly

### Tip 4: Use Discounts Wisely
- Common tiers: 50, 100, 200, 500
- Common discounts: 5%, 10%, 15%
- Don't over-discount

### Tip 5: Paper Naming
- Keep names simple
- "Premium", "Standard", "Glossy"
- Avoid complex codes

---

## 🐛 Troubleshooting

### Issue: Rule saved but price doesn't change

**Check:**
- Category slug matches exactly
- Subcategory name matches (case-insensitive)
- Refresh the page
- Clear browser cache

**Fix:**
```javascript
// In browser console:
localStorage.clear()
// Then re-add the rule
```

### Issue: Discount not applying

**Check:**
- Quantity meets minimum (100 for 100+)
- Discount is whole number (10 not 0.10)
- Rule exists for that product

**Fix:**
- Edit rule
- Check minimum quantity value
- Verify discount percentage

### Issue: Paper modifier ignored

**Check:**
- Paper name in rule: "Premium"
- Paper in dropdown: "Premium 80 GSM"
- Must contain rule name

**Fix:**
- Use simpler names in rules
- Or update dropdown options

---

## 📝 Testing Checklist

Quick verification after adding a rule:

- [ ] Card turns green in admin dashboard
- [ ] Base price shows on card
- [ ] Edit button appears (not + Add)
- [ ] Coverage percentage updates
- [ ] Price calculator uses new price
- [ ] Product config uses new price
- [ ] Discounts apply at thresholds
- [ ] Modifiers work correctly

**All checked? You're good to go! ✅**

---

## 🎓 Advanced Features

### Multiple Discount Tiers:
```
50+ copies = 5% off
100+ copies = 10% off
200+ copies = 15% off
500+ copies = 20% off
```
System automatically uses best applicable discount!

### Multiple Paper Types:
```
Standard 70 GSM = +₹0.00
Premium 80 GSM = +₹0.50
Super Premium 100 GSM = +₹1.00
Glossy 170 GSM = +₹2.50
```
Matched automatically based on selection!

### Multiple Binding Options:
```
Staple = ₹10
Thermal = ₹30
Spiral = ₹50
Wiro = ₹60
Hardbound = ₹150
```
Applied per copy automatically!

---

## 🔒 Fallback Pricing

If no pricing rule exists, these defaults apply:

| Product | Default Price |
|---------|--------------|
| Documents (B&W) | ₹0.89/page |
| Documents (Color) | ₹7.12/page |
| Books | ₹1-3/page |
| Visiting Cards | ₹200/100 |
| Mugs | ₹250 each |
| Cushions | ₹400 each |
| Calendars | ₹300 each |
| Posters | ₹100 each |

**Fallback ensures app always works!**

---

## 📞 Quick Commands

### Check pricing rules in console:
```javascript
JSON.parse(localStorage.getItem('sanjari_pricing_rules'))
```

### Clear all pricing rules:
```javascript
localStorage.removeItem('sanjari_pricing_rules')
```

### Export pricing rules:
```javascript
const rules = localStorage.getItem('sanjari_pricing_rules');
console.log(rules);
// Copy and save
```

### Import pricing rules:
```javascript
const rules = '[...]'; // Your exported JSON
localStorage.setItem('sanjari_pricing_rules', rules);
// Refresh page
```

---

## 🎉 Success Indicators

You know it's working when:

✅ Green cards appear in admin dashboard
✅ Customer prices match admin settings
✅ Discounts auto-apply at thresholds
✅ Calculator and config pages match
✅ Changes reflect immediately
✅ No errors in console

**All green? Perfect! Your pricing system is live! 🚀**

---

## 📚 Documentation Files

Full details in:
- `/PRICING_INTEGRATION_COMPLETE.md` - Complete technical guide
- `/PRICING_TEST_GUIDE.md` - Step-by-step testing
- `/CRITICAL_FIX_SUMMARY.md` - What was fixed
- `/PRICING_QUICK_REFERENCE.md` - This file!

---

## 🚀 Next Steps

1. ✅ Test one product end-to-end
2. ✅ Configure all 13 categories
3. ✅ Set up quantity discount tiers
4. ✅ Add paper type modifiers
5. ✅ Configure binding options
6. ✅ Test with real user scenarios
7. ✅ Launch to production!

**Your pricing system is production-ready! 🎊**
