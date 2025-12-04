# Sanjari Prints - Demo Credentials & Testing Guide

## ✨ NEW: User Dashboard System

After logging in, you'll be automatically redirected to your **User Dashboard** which includes:

### Dashboard Features:
- **📊 Overview Stats:** Total orders, delivered, in transit, and total spent
- **👤 Profile Management:** View and edit your profile information
- **📦 Order History:** Track all your orders with detailed status
- **📍 Saved Addresses:** Manage delivery addresses
- **🔔 Order Tracking:** Real-time order status updates

### Dashboard Tabs:
1. **Profile** - Update name, email, phone number
2. **Orders** - View all orders with status badges (Pending, Processing, Shipped, Delivered, Cancelled)
3. **Addresses** - Manage saved delivery addresses

---

## 🔐 Demo Login Credentials

### Method 1: Email/Password Login
- **Email:** `demo@sanjariprints.com`
- **Password:** `demo123`

### Method 2: Alternative Email Login
- **Email:** `test@example.com`
- **Password:** `test123`

### Method 3: Phone Login (with password)
- **Phone:** `9876543210`
- **Password:** `demo123`

### Method 4: OTP Login
- **Phone/Email:** Any 10-digit number or email
- **OTP:** `123456` (Use this demo OTP for any number)

---

## 🛒 Complete Ecommerce Flow Testing

### 1. Browse Products
- Visit the **All Products** section from the navigation menu
- Explore 13 main categories with subcategories
- Click on any product to view details

### 2. Configure & Add to Cart
- Click "Print Now" on any product
- Fill in the configuration form:
  - Select paper type, size, binding, etc.
  - Upload files (PDF, DOC, DOCX, JPG, PNG - Max 50MB each)
  - Set quantity and other options
- Review the calculated price
- Click "Add to Cart"

### 3. View Cart
- Click the cart icon (🛒) in the navigation bar
- View all items with configurations
- Update quantities using +/- buttons
- Remove items if needed
- See price breakdown:
  - Subtotal
  - GST (18%)
  - Shipping (FREE on orders ≥ ₹500, otherwise ₹50)
  - Total amount

### 4. Proceed to Checkout
- Click "Proceed to Checkout" from cart
- **Step 1: Delivery Address**
  - Fill in all required fields:
    - Full Name
    - Email Address
    - Phone Number (10 digits)
    - Complete Address
    - City, State, Pincode (6 digits)
    - Optional: Landmark
  - Option to save address for future orders
  - Click "Continue to Payment"

- **Step 2: Payment Method**
  - Choose from 4 payment options:
    1. **UPI** - Google Pay, PhonePe, Paytm
    2. **Credit/Debit Card** - Visa, Mastercard, RuPay
    3. **Net Banking** - All major banks
    4. **Cash on Delivery** - Pay when you receive
  - Review order summary
  - Click "Place Order & Pay ₹[amount]"

### 5. Order Confirmation
- View order success page with:
  - Order number (format: SPR########)
  - Complete delivery address
  - Order summary with pricing
  - Confirmation email notification
  - Estimated delivery: 3-5 business days

### 6. Access Your Dashboard
- Click on your profile avatar in the navigation bar
- Select "My Dashboard" from dropdown menu
- Or navigate directly to `/dashboard`
- View all your orders, update profile, manage addresses

---

## 🎯 Key Features to Test

### Product Configuration System
- **Documents:** Pages, copies, color options, paper type
- **Books:** Book size, pages, binding type, cover options
- **Marketing Materials:** Size, quantity, paper quality, lamination
- **Business Cards:** Quantity, card type, finish
- **Custom Products:** Dynamic forms for each category

### File Upload System
- Multiple file uploads
- Format validation (PDF, DOC, DOCX, JPG, PNG)
- Size validation (Max 50MB per file)
- Visual file list with remove option
- Upload progress indicators

### Cart Management
- Add/remove items
- Update quantities
- Real-time price calculations
- Persistent cart state
- GST calculation (18%)
- Shipping calculation (FREE above ₹500)

### Price Calculator
- Access via "Price Calculator" in navigation
- Quick price estimation without adding to cart
- Category-specific calculators

### Responsive Design
- Mobile-friendly interface
- Touch-optimized controls
- Adaptive layouts

---

## 📞 Contact Information

**Phone:** +91 7350001266 / 9323684301  
**Email:** sanjariprint@gmail.com

---

## 🔄 Complete Testing Workflow Example

### Full User Journey:

1. **Register/Login:**
   - Go to Login page
   - Use demo credentials: `demo@sanjariprints.com` / `demo123`
   - Auto-redirect to Dashboard

2. **Browse Products:**
   - Navigate to "All Products" → "Documents" → "Single Side Printing"

3. **Configure Product:**
   - Pages: 10
   - Copies: 5
   - Color: Black & White
   - Paper: A4, 80 GSM
   - Upload a PDF file

4. **Add to Cart:** Click "Add to Cart"

5. **Continue Shopping:** Add more items (optional)

6. **View Cart:** Click cart icon (shows item count badge)

7. **Proceed to Checkout:**
   - Review cart items
   - Click "Proceed to Checkout"

8. **Enter Delivery Address:**
   - Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Address: 123 Main Street
   - City: Mumbai
   - State: Maharashtra
   - Pincode: 400001

9. **Select Payment Method:** Choose UPI

10. **Place Order:** Complete checkout

11. **View Confirmation:** 
    - Note your order number (SPR########)
    - Order saved automatically

12. **Check Dashboard:**
    - Click profile avatar in navbar
    - Select "My Dashboard"
    - View your new order in "Orders" tab
    - Order status will be "Processing"

---

## 💡 Additional Notes

- All demo logins redirect authenticated users appropriately
- Cart persists across page navigation
- Order history is simulated (no backend storage)
- Payment processing is simulated (no actual charges)
- File uploads are validated but not sent to a server
- All pricing is in INR (Indian Rupees)

---

## 🚀 Quick Test Scenarios

### Scenario 1: Simple Document Printing
1. Login with demo credentials
2. Navigate to Documents → Single Side Printing
3. Configure: 5 pages, 2 copies
4. Add to cart and checkout

### Scenario 2: Multiple Products
1. Add a document print job
2. Add business cards (500 qty)
3. Add a poster
4. Review total cart value
5. Complete checkout

### Scenario 3: Price Comparison
1. Use Price Calculator for quick estimate
2. Then configure actual product
3. Compare prices
4. Add to cart if satisfied

---

**Last Updated:** January 2025  
**Version:** 1.0
