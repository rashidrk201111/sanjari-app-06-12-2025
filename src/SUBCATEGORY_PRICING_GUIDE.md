# Subcategory Pricing Management Guide

## Overview
The Admin Dashboard now includes a comprehensive subcategory pricing management system that shows all available subcategories for each category and allows quick creation of pricing rules.

## New Features

### 1. Subcategory Coverage Overview
When you select a category in the Pricing Management tab, you'll see a new "Subcategory Coverage" section that displays:

- **Progress Badge**: Shows the percentage of subcategories that have pricing rules configured
- **Grid of Subcategories**: All subcategories for the selected category are displayed in a card grid
- **Visual Status Indicators**:
  - ✅ **Green Cards**: Subcategories with pricing rules configured
  - ⚠️ **Orange Cards**: Subcategories that need pricing rules

### 2. Quick Add Functionality
Each subcategory card includes action buttons:

- **Configured Subcategories** (Green):
  - ✏️ Edit button - Opens the pricing rule dialog to edit existing settings
  - Shows the current base price

- **Unconfigured Subcategories** (Orange):
  - ➕ Add button - Quickly create a new pricing rule
  - Pre-fills the category and subcategory name automatically

### 3. Enhanced Pricing Rule Dialog

#### Pre-filled Default Values
When creating a new pricing rule, the dialog now includes helpful defaults:

**Paper Types** (3 default options):
- 70 GSM - Base price + ₹0
- 80 GSM - Base price + ₹0.50
- 100 GSM - Base price + ₹1.00

**Quantity Discounts** (4 default tiers):
- 1+ units - 0% discount
- 50+ units - 5% discount
- 100+ units - 10% discount
- 500+ units - 15% discount

**Base Price**: ₹2.00 (starting value)

#### Smart Subcategory Selection
- If a category has subcategories defined in the system, you'll see a dropdown menu
- If a category has no predefined subcategories, you can enter a custom name
- When using "Quick Add", the category and subcategory are automatically selected

## How to Use

### Adding Pricing Rules for All Subcategories

1. **Navigate to Pricing Tab**
   - Go to Admin Dashboard → Pricing tab

2. **Select a Category**
   - Use the "Filter by Category" dropdown
   - Select any category (e.g., "DOCUMENTS", "BOOKS", etc.)

3. **View Coverage Status**
   - The "Subcategory Coverage" section appears
   - See which subcategories need pricing rules (orange cards)

4. **Add Pricing Rules**
   - Click the "+ Add" button on any orange card
   - The dialog opens with:
     - Category pre-selected
     - Subcategory pre-selected
     - Default values for paper types and discounts
   - Adjust the base price and other settings as needed
   - Click "Add Rule" to save

5. **Edit Existing Rules**
   - Click the edit icon on any green card
   - Modify the pricing settings
   - Click "Update Rule" to save changes

### Best Practices

1. **Start with Base Categories**
   - Configure high-volume categories first (Documents, Books, etc.)
   - Use the coverage percentage to track progress

2. **Use Default Values as Templates**
   - Default paper types and discounts are industry-standard
   - Adjust prices based on your actual costs

3. **Consistent Pricing Structure**
   - Keep similar pricing structures across related subcategories
   - Use the same paper types and discount tiers for consistency

4. **Test Pricing Rules**
   - After adding rules, test them in the Price Calculator
   - Verify calculations are correct before going live

## Available Categories & Subcategories

### Documents (12 subcategories)
- PDF Print, Annual Report Printing, Fitness Plan Printing, Legal Document Print, 
  Homework Worksheet Printing, Survey & Questionnaire Printing, Script Printing, 
  CV/Resume Print, Bills/Invoice Printing, Religious Printing & Publishing, 
  Event Programmes, Newsletter Printing

### Books (17 subcategories)
- Paperback Books, Hardbound Books, E-book Printing, Study Material Printing, 
  Comic Book Printing, School Book Printing, Training Manual Printing, 
  Family History Book Printing, Bulk Book Printing, Magazines, Portfolios, 
  Children Book, Gaming Rulebook, Yearbook Print, Presentations, Proposal Print, 
  Instructions Print

### Thesis & Dissertation (4 subcategories)
- Thesis Print, Dissertation Print, Final Major Projects, Thesis Dissertation Print

### Certificate & Cards (3 subcategories)
- Notecards, Certificate Printing, Flash Card Printing

### Marketing Materials (2 subcategories)
- Brochures, Table and Tentcards

### Posters (3 subcategories)
- Poster Printing, Framed Posters, Graphics and Art Prints

### Flyers or Leaflets (1 subcategory)
- Flyers, Pamphlet or Leaflet - Black and White Printing

### Letterhead & Stationery (2 subcategories)
- Letterhead Printing, Bill Books

### Visiting Cards (1 subcategory)
- Business Cards

### Business Stationery (0 subcategories)
- Custom entry allowed

### Personalised Gifts (5 subcategories)
- Mug Printing, Cushion Print, Photo Calendar, Canvas Print, Framed Photos

### Stickers and Labels (0 subcategories)
- Custom entry allowed

### Document Binding (7 subcategories)
- Corner Staple Binding, Staple Binding, Center Staple Binding, Spiral Binding, 
  Wiro Binding, Soft Cover Binding, Glue/Tape Binding

## Technical Details

### Helper Functions Added
```typescript
getSubcategoriesForCategory(categorySlug: string)
// Returns all subcategories for a category

hasRuleForSubcategory(categorySlug: string, subcategorySlug: string)
// Checks if a pricing rule exists

getRuleForSubcategory(categorySlug: string, subcategorySlug: string)
// Gets the pricing rule for a subcategory

handleQuickAddRule(categorySlug, categoryName, subcategoryName)
// Opens dialog with pre-filled values
```

### UI Components
- **Card Grid**: Responsive 2-3 column layout
- **Status Badges**: Color-coded for quick identification
- **Progress Indicator**: Shows completion percentage
- **Action Buttons**: Context-sensitive based on rule existence

## Troubleshooting

**Q: Subcategory coverage section not showing?**
A: Make sure you've selected a specific category (not "All Categories")

**Q: Can't see subcategories in dropdown?**
A: Some categories (Business Stationery, Stickers and Labels) have no predefined subcategories. You can enter custom names.

**Q: Default values not appearing?**
A: Default values only appear when creating a NEW rule (not editing existing ones)

**Q: Quick Add button not working?**
A: The dialog will open with pre-filled values. Wait a moment for the values to populate.

## Next Steps

1. Configure pricing rules for all subcategories
2. Test the price calculator with different products
3. Monitor which subcategories get the most orders
4. Adjust pricing based on customer feedback and costs
