# 🧪 Complete Test Flow Guide

## 🚪 How to Logout

You can logout in **TWO WAYS**:

### Method 1: Using Navbar (Desktop)
```
1. Look at top-right corner of navbar
2. See your avatar with initials (e.g., "DU" for Demo User)
3. Click on the avatar/profile button
4. Dropdown menu appears
5. Click "Logout" (red text at bottom)
6. ✅ You'll be logged out and redirected to home
7. Toast message: "Logged out successfully"
```

### Method 2: Using Navbar (Mobile)
```
1. Click hamburger menu (☰) in top-right
2. Scroll to bottom of menu
3. Click "Logout" button (red text)
4. ✅ You'll be logged out
5. Toast message: "Logged out successfully"
```

### Method 3: Using Browser Console (Quick)
```javascript
// Open browser console (F12)
localStorage.clear();
sessionStorage.clear();
location.reload();
// ✅ Completely logged out and reset
```

---

## 🎯 Complete Test Flow (After Logout)

### Part 1: Browse and Add to Cart (No Login)
```
1. ✅ Logout using one of the methods above
2. Click "All Products" in navbar
3. Click on any product (e.g., "Color Printing - A4")
4. Configure product:
   - Pages: 10
   - Copies: 5
   - Paper: Premium
   - Binding: Spiral
5. Click "Add to Cart"
6. See cart count badge (5 items)
7. ✅ Cart works WITHOUT login!
```

### Part 2: Go to Checkout (Triggers Login)
```
8. Click cart icon in navbar
9. See your cart items listed
10. Click "Proceed to Checkout"
11. ✅ Redirected to /login page
12. See message: "Please login to continue checkout"
```

### Part 3: Login
```
13. Enter credentials:
    Email: demo@sanjariprints.com
    Password: demo123
14. Click "Sign In"
15. ✅ Auto-redirected back to checkout
16. ✅ Form auto-filled with your details!
```

### Part 4: Complete Order
```
17. Verify/update delivery details
18. Select payment method (COD)
19. Click "Place Order"
20. ✅ Order confirmation shown
21. See "View My Orders" button
```

### Part 5: Check Profile Dropdown
```
22. Look at navbar - see your avatar (DU)
23. Click on avatar
24. ✅ Dropdown appears with:
    - Your name (Demo User)
    - Email (demo@sanjariprints.com)
    - My Dashboard (clickable)
    - My Orders (clickable)
    - Logout (red, clickable)
25. ✅ All text is VISIBLE!
```

### Part 6: View Dashboard
```
26. Click "My Dashboard" from dropdown
27. ✅ Redirected to dashboard
28. See tabs: Overview | Orders | Profile
29. See your order in orders list
30. See order status, tracking info
```

### Part 7: Logout
```
31. Click avatar in navbar
32. Click "Logout"
33. ✅ Logged out
34. ✅ Cart persists (items still there!)
35. Avatar replaced with "Sign In" button
```

---

## ✅ Checklist - What Should Work

### 🛒 Shopping Cart:
- [ ] Add items without login
- [ ] See cart count badge
- [ ] View cart page
- [ ] Update quantities
- [ ] Remove items

### 🔐 Authentication:
- [ ] Redirects to login when checking out
- [ ] Login successful
- [ ] Auto-fill checkout form
- [ ] Redirect back to checkout after login
- [ ] Avatar appears after login

### 📦 Orders:
- [ ] Place order successfully
- [ ] Order confirmation page
- [ ] Order appears in dashboard
- [ ] Order has tracking info

### 👤 Profile Dropdown:
- [ ] Avatar visible in navbar
- [ ] Click opens dropdown
- [ ] **Dropdown content VISIBLE**
- [ ] User name visible
- [ ] Email visible
- [ ] Menu items visible
- [ ] Icons visible
- [ ] Hover effects work
- [ ] Click "My Dashboard" navigates
- [ ] Click "Logout" logs out

### 📊 Dashboard:
- [ ] Overview tab shows stats
- [ ] Orders tab shows all orders
- [ ] Profile tab shows user info
- [ ] Can update profile
- [ ] Can download invoice
- [ ] Can track order

---

## 🎨 Visual Verification

### Logged Out State:
```
Navbar: [Logo] [Links] [🛒(5)] [Sign In] [Sign Up]
```

### Logged In State:
```
Navbar: [Logo] [Links] [🛒(5)] [👤 DU ▼]
                                    └─ Click here!
```

### Dropdown Open:
```
┌──────────────────────────┐
│ Demo User               │ ← Should see this!
│ demo@sanjariprints.com  │ ← And this!
├──────────────────────────┤
│ 👤 My Dashboard          │ ← Clear text!
│ 📦 My Orders             │ ← Clear text!
├──────────────────────────┤
│ 🚪 Logout                │ ← Red text!
└──────────────────────────┘
```

---

## 🐛 Troubleshooting During Test

### Issue: Can't logout
**Try:**
1. Hard refresh (Ctrl+Shift+R)
2. Click logout multiple times
3. Use console method: `localStorage.clear(); location.reload();`

### Issue: Dropdown blank
**Try:**
1. Hard refresh page
2. Check if using latest code
3. Clear browser cache
4. Try incognito mode

### Issue: Not redirected after login
**Try:**
1. Check URL for `?redirect` parameter
2. Manually navigate to /checkout
3. Re-login

### Issue: Cart disappeared
**Try:**
1. Cart should persist in localStorage
2. Check: `localStorage.getItem("sanjari_cart")`
3. Add items again if needed

---

## 📋 Quick Test (2 Minutes)

**Speed Test:**
```
1. Logout (10 sec)
2. Add product to cart (20 sec)
3. Go to checkout → redirected to login (10 sec)
4. Login (10 sec)
5. Checkout auto-filled (5 sec)
6. Place order (10 sec)
7. Click avatar → see dropdown (5 sec)
8. Verify all content visible (10 sec)
9. Click My Dashboard → navigate (5 sec)
10. See order in dashboard (10 sec)
11. Logout (5 sec)
Total: ~100 seconds
```

---

## 🎯 Success Criteria

### ✅ Test PASSED if:
1. Can logout successfully
2. Can add to cart without login
3. Checkout redirects to login
4. Login redirects back to checkout
5. Order placed successfully
6. **Dropdown opens with VISIBLE content**
7. Dashboard accessible
8. Orders visible in dashboard
9. Can logout from dropdown
10. Cart persists after logout

### ❌ Test FAILED if:
1. Dropdown is blank/empty
2. Can't see user name/email
3. Menu items invisible
4. Can't navigate from dropdown
5. Dashboard not accessible
6. Orders not showing

---

## 💡 Tips for Testing

1. **Use Incognito Mode** - Clean slate each time
2. **Keep Console Open** - See any errors
3. **Check Network Tab** - See requests
4. **Use React DevTools** - See state
5. **Test Mobile View** - Responsive design

---

## 📸 Screenshots to Verify

Take screenshots at these points:

1. **Cart Page** - Items in cart
2. **Login Page** - Login form
3. **Checkout** - Auto-filled form
4. **Order Confirmation** - Success message
5. **Dropdown Open** - All content visible
6. **Dashboard** - Orders tab
7. **Profile Tab** - User details

---

## 🚀 Ready to Test!

**Start here:**
```
1. Click your avatar in navbar
2. Click "Logout"
3. Follow the test flow above
4. Report any issues
```

**Expected result:** Everything should work smoothly with visible dropdown content! ✅

---

## 📞 If Something Breaks

**Quick Fixes:**

```bash
# 1. Clear everything
localStorage.clear();
sessionStorage.clear();

# 2. Hard refresh
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)

# 3. Check if logged in
console.log(localStorage.getItem("sanjari_user"));

# 4. Check cart
console.log(localStorage.getItem("sanjari_cart"));

# 5. Check orders
console.log(localStorage.getItem("sanjari_orders"));
```

---

## 🎉 Final Checklist

Before considering test complete:

- [ ] Logged out successfully
- [ ] Cart persists after logout
- [ ] Login redirects back correctly
- [ ] Checkout form auto-fills
- [ ] Order placed successfully
- [ ] **Dropdown content VISIBLE**
- [ ] All menu items clickable
- [ ] Dashboard accessible
- [ ] Orders showing correctly
- [ ] Can logout from dropdown
- [ ] No console errors
- [ ] Mobile menu works

**If all checked: TEST PASSED! ✅**

---

**Happy Testing! 🧪**
