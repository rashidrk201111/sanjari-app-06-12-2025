# 🚀 Quick Reference Card - Sanjari Prints

## 🔐 Demo Credentials

```
Email:    demo@sanjariprints.com
Password: demo123
OTP:      123456 (if using OTP login)
```

---

## 🎯 Fast Testing Steps

### 1-Minute Test:
1. Login → Dashboard opens ✓
2. Add product → Cart updates ✓
3. Checkout → Form pre-filled ✓
4. Place order → Dashboard shows order ✓

---

## 📱 Key Pages & Routes

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Landing page |
| Login | `/login` | User authentication |
| Dashboard | `/dashboard` | User account hub |
| All Products | `/all-products` | Product catalog |
| Cart | `/cart` | Shopping cart |
| Checkout | `/checkout` | Order placement |
| Product Config | `/product/:id` | Configure products |

---

## 🎨 UI Components Used

### Shadcn Components:
- Avatar & AvatarFallback
- Badge
- Button
- Card
- Dialog & AlertDialog
- Dropdown Menu
- Input & Label
- Select
- Separator
- Switch
- Tabs
- Toast (Sonner)

### Icons (Lucide React):
- User, Mail, Phone
- ShoppingBag, Package
- MapPin, Truck
- Settings, Shield, Lock
- CheckCircle2, XCircle
- Edit2, Trash2, Plus
- Search, Filter

---

## 🔄 State Management

```typescript
// Auth Context
const { user, orders, login, logout, addOrder } = useAuth();

// Cart Context  
const { items, addToCart, removeFromCart, clearCart } = useCart();

// Local State
const [formData, setFormData] = useState({...});
```

---

## 💾 localStorage Keys

| Key | Contains |
|-----|----------|
| `sanjari_user` | User profile data |
| `sanjari_orders` | Order history array |
| `sanjari_cart` | Cart items array |

---

## 🎯 Dashboard Tabs

1. **Profile** 👤
   - View/edit user info
   - Quick actions sidebar
   - Loyalty points

2. **Orders** 📦
   - Search & filter orders
   - Download invoices
   - Track shipments
   - Reorder items

3. **Addresses** 📍
   - Saved addresses
   - Add/edit/delete
   - Set default

4. **Settings** ⚙️
   - Notification preferences
   - Email/SMS toggles

5. **Security** 🔒
   - Change password
   - 2FA toggle
   - Delete account

---

## 🔔 Order Status Colors

| Status | Color | Badge |
|--------|-------|-------|
| Pending | Yellow | 🟡 |
| Processing | Blue | 🔵 |
| Shipped | Purple | 🟣 |
| Delivered | Green | 🟢 |
| Cancelled | Red | 🔴 |

---

## ✅ Form Validations

### Email:
- Required
- Format: `user@domain.com`

### Phone:
- 10 digits
- Numbers only
- Format: `9876543210`

### Pincode:
- 6 digits
- Numbers only
- Format: `400001`

### Password:
- Minimum 6 characters
- Required for login/signup

---

## 🚀 Quick Commands

### Test Login Flow:
```
1. Go to /login
2. Use demo@sanjariprints.com / demo123
3. Should redirect to /dashboard
```

### Test Checkout Flow:
```
1. Add product to cart
2. Go to /checkout
3. If logged in → form pre-filled
4. If guest → see login banner
```

### Test Dashboard:
```
1. Login first
2. Navigate to /dashboard
3. Check all 5 tabs work
4. Try editing profile
```

---

## 🐛 Troubleshooting

### Problem: Can't see dashboard
**Solution:** Make sure you're logged in (check for avatar in navbar)

### Problem: Orders not showing
**Solution:** 
1. Check you're logged in with same email
2. Check localStorage has `sanjari_orders`
3. Try placing a new test order

### Problem: Form not auto-filling
**Solution:**
1. Confirm you're logged in
2. Check user data in localStorage
3. Refresh page after login

### Problem: Lost session
**Solution:**
1. Login again
2. Orders preserved in localStorage
3. User ID maintained

---

## 📊 Stats Calculations

```typescript
// Total Orders
orders.length

// Delivered Orders
orders.filter(o => o.status === "delivered").length

// In Transit
orders.filter(o => o.status === "shipped").length

// Total Spent
orders.reduce((sum, o) => sum + o.total, 0)
```

---

## 🎨 Color Palette

### Primary Colors:
- Blue: `#2563eb` (Blue-600)
- Purple: `#9333ea` (Purple-600)
- Green: `#16a34a` (Green-600)

### Status Colors:
- Yellow: `#facc15` (Yellow-400)
- Blue: `#3b82f6` (Blue-500)
- Purple: `#a855f7` (Purple-500)
- Green: `#22c55e` (Green-500)
- Red: `#ef4444` (Red-500)

### Neutrals:
- Gray-50 to Gray-900
- White: `#ffffff`

---

## 📱 Responsive Breakpoints

```css
Mobile:  < 768px
Tablet:  768px - 1023px
Desktop: ≥ 1024px
```

---

## 🔐 Authentication Flow

```
Login → Check localStorage → Found? Use existing : Create new
     → Save to localStorage → Update React state
     → Redirect to dashboard/checkout
```

---

## 📦 Order Flow

```
Configure → Add to Cart → Checkout → Payment → Order Created
       → Save to orders[] → Update localStorage → Show confirmation
```

---

## 🎯 Key Features Checklist

- [x] User authentication
- [x] Profile management
- [x] Order tracking
- [x] Address book
- [x] Shopping cart
- [x] Product configuration
- [x] Checkout flow
- [x] Payment methods
- [x] Order history
- [x] Search & filter
- [x] Mobile responsive
- [x] Data persistence
- [x] Toast notifications
- [x] Form validation

---

## 📞 Contact Information

**Sanjari Prints**
- Phone: +91 7350001266
- Phone: +91 9323684301
- Email: sanjariprint@gmail.com

---

## 🆘 Emergency Reset

If everything breaks:
```javascript
// Open browser console and run:
localStorage.clear();
window.location.reload();

// Then login fresh with demo credentials
```

---

## 📚 Documentation Files

1. `QUICK_START_GUIDE.md` - User guide
2. `ADVANCED_DASHBOARD_FEATURES.md` - Feature list
3. `AUTHENTICATION_FIX_SUMMARY.md` - Technical fixes
4. `TESTING_AUTHENTICATION_FIX.md` - Testing procedures
5. `COMPLETE_USER_FLOW.md` - Visual flow diagrams
6. `QUICK_REFERENCE.md` - This file!

---

## 🎓 For Developers

### Key Files:
```
/context/AuthContext.tsx     - User authentication
/context/CartContext.tsx     - Shopping cart
/pages/UserDashboardPage.tsx - Main dashboard
/pages/CheckoutPage.tsx      - Checkout flow
/pages/LoginPage.tsx         - Login page
/components/Navbar.tsx       - Navigation
```

### Key Functions:
```typescript
// Auth
login(email, name, phone)
logout()
updateProfile(updates)
addOrder(order)

// Cart
addToCart(item)
removeFromCart(id)
updateQuantity(id, quantity)
clearCart()
```

---

## ⚡ Performance Tips

1. Data persists in localStorage
2. React Context for global state
3. Component-level state for forms
4. useEffect for side effects
5. Controlled inputs for forms

---

## 🎉 Success Indicators

### User is logged in when:
✅ Avatar appears in navbar
✅ Dropdown shows name/email
✅ Checkout form pre-filled
✅ Dashboard accessible

### Order is saved when:
✅ Order number generated
✅ Toast shows confirmation
✅ Appears in Orders tab
✅ Stats update correctly

---

## 🚦 Status Codes

```
✅ Working correctly
⚠️ Needs attention
❌ Not working
🔄 In progress
📝 To be implemented
```

---

## 🎯 Current Status: ✅ ALL SYSTEMS OPERATIONAL

- Authentication: ✅
- Dashboard: ✅
- Orders: ✅
- Cart: ✅
- Checkout: ✅
- Profile: ✅
- Mobile: ✅

---

**Last Updated:** January 2025
**Version:** 3.1
**Status:** Production Ready 🚀
