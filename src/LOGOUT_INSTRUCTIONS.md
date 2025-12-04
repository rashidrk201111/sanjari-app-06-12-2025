# 🚪 How to Logout - Quick Guide

## 🖥️ Desktop (Easy Way)

### Visual Guide:
```
Look at navbar top-right corner:
┌────────────────────────────────┐
│              🛒  [👤 DU ▼]    │ ← Your Avatar
└─────────────────┬──────────────┘
                  │
                  │ CLICK HERE!
                  ▼
        ┌──────────────────────┐
        │ Demo User           │
        │ demo@...            │
        ├──────────────────────┤
        │ 👤 My Dashboard      │
        │ 📦 My Orders         │
        ├──────────────────────┤
        │ 🚪 Logout           │ ← CLICK HERE!
        └──────────────────────┘
```

### Steps:
1. **Find** your avatar in top-right corner (shows your initials)
2. **Click** on the avatar button
3. **Wait** for dropdown to appear
4. **Click** "Logout" (red text at bottom)
5. ✅ **Done!** You're logged out

---

## 📱 Mobile (Alternative)

### Visual Guide:
```
┌──────────────────────┐
│ [S] Sanjari  ☰     │ ← Click hamburger
└──────────────────────┘
         │
         ▼ Opens menu
┌──────────────────────┐
│ Home                │
│ All Products        │
│ ...                 │
│ Cart                │
├──────────────────────┤
│ ┌────────────────┐  │
│ │ 👤 Demo User  │  │
│ │ demo@...      │  │
│ └────────────────┘  │
│ [My Dashboard]      │
│ [My Orders]         │
│ [🚪 Logout]        │ ← Click here!
└──────────────────────┘
```

### Steps:
1. **Click** hamburger menu (☰) in top-right
2. **Scroll** to bottom of menu
3. **Click** "Logout" button (red)
4. ✅ **Done!** Menu closes, you're logged out

---

## ⚡ Super Quick Method (Console)

**For developers/testing:**

```javascript
// Open browser console (F12 or Ctrl+Shift+I)
// Paste this and press Enter:

localStorage.clear();
sessionStorage.clear();
location.reload();

// ✅ Instantly logged out and page refreshed!
```

---

## 🎯 What Happens After Logout?

### Immediate Changes:
```
BEFORE LOGOUT:
Navbar: [Logo] [Links] [🛒] [👤 Demo User ▼]

AFTER LOGOUT:
Navbar: [Logo] [Links] [🛒] [Sign In] [Sign Up]
```

### What Persists:
- ✅ **Cart items** - Your cart stays intact!
- ✅ **Page location** - Stay on current page
- ❌ **User session** - Removed
- ❌ **Profile access** - Need to login

### Toast Message:
```
┌─────────────────────────┐
│ ✓ Logged out successfully │
└─────────────────────────┘
```

---

## 🔄 Re-Login

After logout, to login again:

1. **Click** "Sign In" in navbar
2. **Enter** credentials:
   - Email: `demo@sanjariprints.com`
   - Password: `demo123`
3. **Click** "Sign In" button
4. ✅ **Logged in!** Redirected to dashboard

---

## 🧪 Testing Full Flow

**Recommended Test Sequence:**

```
1. Logout                    (5 sec)
2. Browse products           (10 sec)
3. Add to cart               (10 sec)
4. Go to checkout            (5 sec)
5. Redirected to login       (auto)
6. Login                     (10 sec)
7. Back to checkout          (auto)
8. Place order               (15 sec)
9. Check profile dropdown    (5 sec)
10. View dashboard           (5 sec)
11. Logout again             (5 sec)

Total time: ~70 seconds
```

---

## ✅ Verification Checklist

After logout, verify:
- [ ] Avatar removed from navbar
- [ ] "Sign In" and "Sign Up" buttons appear
- [ ] Cart icon still shows item count
- [ ] Can still browse products
- [ ] Can still add to cart
- [ ] Checkout redirects to login
- [ ] Dashboard not accessible
- [ ] Toast message shows "Logged out successfully"

---

## 🐛 Troubleshooting

### Problem: Logout button not working

**Try this:**
1. Click logout again (multiple times if needed)
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Use console method above
4. Close browser and reopen

### Problem: Still see avatar after logout

**Solution:**
```javascript
// Console:
localStorage.removeItem("sanjari_user");
location.reload();
```

### Problem: Dropdown doesn't open

**Solution:**
1. Hard refresh the page
2. Try clicking different parts of the avatar button
3. Use mobile menu method instead
4. Use console method to logout

---

## 📋 Quick Reference Card

```
╔═══════════════════════════════════╗
║     LOGOUT QUICK REFERENCE        ║
╠═══════════════════════════════════╣
║                                   ║
║  Desktop:                         ║
║  Click Avatar → Click Logout      ║
║                                   ║
║  Mobile:                          ║
║  Menu (☰) → Scroll → Logout       ║
║                                   ║
║  Console:                         ║
║  localStorage.clear();            ║
║  location.reload();               ║
║                                   ║
║  After Logout:                    ║
║  • Avatar disappears              ║
║  • "Sign In" appears              ║
║  • Cart persists                  ║
║                                   ║
╚═══════════════════════════════════╝
```

---

## 🎯 Current Status

You are currently **LOGGED IN** as:
- Name: Demo User
- Email: demo@sanjariprints.com

**To logout:** Click your avatar (top-right) → Click Logout

---

## 💡 Pro Tips

1. **Test in Incognito** - Clean state for testing
2. **Keep Cart** - Cart survives logout for convenience
3. **Quick Logout** - Use keyboard shortcut (if you set one)
4. **Mobile Testing** - Test both desktop and mobile logout
5. **Clear Cache** - If weird behavior, clear browser cache

---

## 🔐 Security Note

Logout will:
- ✅ Clear user session
- ✅ Remove authentication token
- ✅ Clear user data from memory
- ✅ Prevent dashboard access
- ❌ NOT clear cart (intentional UX)
- ❌ NOT clear order history (stored separately)

---

## 🆘 Need Help?

**Contact:**
- Email: sanjariprint@gmail.com
- Phone: +91 7350001266 / 9323684301

**Demo Credentials:**
- Email: demo@sanjariprints.com
- Password: demo123

---

## ✨ Ready to Test!

**Your action:**
```
1. Look at top-right corner of navbar
2. See your avatar/profile button
3. Click it
4. Click "Logout"
5. ✅ You're logged out!
```

**Then follow TEST_FLOW.md for complete testing!**

---

**Status:** Ready for logout testing! 🚀
