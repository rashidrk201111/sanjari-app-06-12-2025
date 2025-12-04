# Admin Dashboard Select Component Fix

## Error Fixed
**Error: A <Select.Item /> must have a value prop that is not an empty string.**

## Root Cause
The Radix UI Select component (used by shadcn/ui) doesn't allow `SelectItem` components to have empty string values (`value=""`). This is because the Select component reserves empty strings for clearing the selection and showing the placeholder.

## Location of Issue
In `/pages/AdminDashboardPage.tsx` on the **Pricing Management** tab, the category filter had:

```tsx
<SelectItem value="">All Categories</SelectItem>
```

## Solution Implemented

### 1. Changed SelectItem Value
**Before:**
```tsx
<SelectItem value="">All Categories</SelectItem>
```

**After:**
```tsx
<SelectItem value="all">All Categories</SelectItem>
```

### 2. Updated Initial State
**Before:**
```tsx
const [selectedCategory, setSelectedCategory] = useState("");
```

**After:**
```tsx
const [selectedCategory, setSelectedCategory] = useState("all");
```

### 3. Updated Subcategories Logic
**Before:**
```tsx
const subcategories = selectedCategory 
  ? categories.find(c => c.slug === selectedCategory)?.subcategories || []
  : [];
```

**After:**
```tsx
const subcategories = (selectedCategory && selectedCategory !== "all")
  ? categories.find(c => c.slug === selectedCategory)?.subcategories || []
  : [];
```

### 4. Updated Filter Logic
**Before:**
```tsx
.filter(rule => !selectedCategory || rule.category === selectedCategory)
```

**After:**
```tsx
.filter(rule => selectedCategory === "all" || rule.category === selectedCategory)
```

## Result
✅ The Select component error is now fixed
✅ "All Categories" option works correctly
✅ Category filtering works as expected
✅ No console errors

## Key Takeaway
When using shadcn/ui Select components, never use empty strings (`""`) as values for `SelectItem`. Instead, use meaningful values like:
- `"all"` for "All" options
- `"none"` for "None" options
- Any other non-empty string value

This ensures the Select component works properly and avoids conflicts with its internal empty string handling for clearing selections.
