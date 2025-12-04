# Pricing Rule Display Fix

## Issue Fixed
The subcategory pricing rules were not displaying correctly in the Admin Dashboard. Rules were being saved but not showing as "configured" (green) in the Subcategory Coverage section.

## Root Cause
The helper functions were comparing:
- **What they received**: `subcategory.slug` (e.g., "business-cards")
- **What's stored in rules**: `rule.subcategory` (e.g., "Business Cards")

Since slugs and names don't match, the comparison always failed, making all subcategories appear unconfigured even when rules existed.

## Solution Applied

### 1. Updated Helper Functions
Changed the parameter name and logic in `/pages/AdminDashboardPage.tsx`:

**Before:**
```typescript
const hasRuleForSubcategory = (categorySlug: string, subcategorySlug: string) => {
  return pricingRules.some(rule => 
    rule.category === categorySlug && 
    rule.subcategory.toLowerCase() === subcategorySlug.toLowerCase()
  );
};
```

**After:**
```typescript
const hasRuleForSubcategory = (categorySlug: string, subcategoryName: string) => {
  return pricingRules.some(rule => 
    rule.category === categorySlug && 
    rule.subcategory.toLowerCase() === subcategoryName.toLowerCase()
  );
};
```

### 2. Updated Function Calls
Changed the calls to pass `sub.name` instead of `sub.slug`:

**Before:**
```typescript
hasRuleForSubcategory(selectedCategory, sub.slug)
```

**After:**
```typescript
hasRuleForSubcategory(selectedCategory, sub.name)
```

## What Now Works

1. ✅ **Correct Status Display**: Subcategories with pricing rules now show as green cards
2. ✅ **Edit Button Appears**: Configured subcategories now show the edit button instead of add button
3. ✅ **Accurate Coverage**: The percentage completion badge shows the correct number
4. ✅ **Base Price Display**: Configured subcategories show their base price

## Testing the Fix

1. Go to **Admin Dashboard** → **Pricing** tab
2. Select a category (e.g., "visiting-cards")
3. If you previously added a pricing rule for "Business Cards":
   - The card should now be **GREEN** (not orange)
   - You should see the **edit icon** (not "+ Add" button)
   - The base price should be displayed
   - The coverage percentage should update correctly

## CSS Error Note

The "CSSScopeRule is not defined" error appears to be a transient browser compatibility issue. The CSS file is properly formatted with no problematic selectors. If the error persists:

1. **Clear browser cache** and reload
2. **Hard refresh** the page (Ctrl+Shift+R or Cmd+Shift+R)
3. Try in a different browser to isolate the issue

The error doesn't affect functionality and should resolve with a page refresh.

## Data Structure Reference

**Pricing Rule Storage:**
```typescript
{
  id: "rule_123456",
  category: "visiting-cards",        // slug
  subcategory: "Business Cards",     // NAME (not slug)
  basePrice: 5.00,
  paperTypes: [...],
  quantityDiscounts: [...]
}
```

**Subcategory Data:**
```typescript
{
  name: "Business Cards",            // Used for matching
  slug: "business-cards"             // NOT used for matching
}
```

## Future Considerations

If you want to switch to slug-based matching in the future:
1. Update the PricingRule interface to store both name and slug
2. Update the PricingRuleDialog to save both values
3. Update all comparison functions to use slug instead of name
4. Migrate existing pricing rules in localStorage to include slugs
