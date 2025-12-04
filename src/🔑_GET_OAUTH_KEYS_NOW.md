# 🔑 Get Your OAuth Keys - Right Now!

**Super quick guide** to get Google & Facebook OAuth keys for Supabase.

---

## ⚡ TL;DR (Too Long; Didn't Read)

### **What You Need:**
1. Your Supabase callback URL: `https://[project-ref].supabase.co/auth/v1/callback`
2. Google account
3. Facebook account
4. 30 minutes

### **What You'll Get:**
- Google Client ID & Secret
- Facebook App ID & Secret
- Working social authentication ✅

---

## 🎯 Quick Steps

### **1. Get Supabase Callback URL** (30 seconds)
```
Supabase Dashboard → Settings → API → Copy "Project URL"
Add: /auth/v1/callback

Example: https://abc123xyz.supabase.co/auth/v1/callback

SAVE THIS: _________________________________
```

---

### **2. Google OAuth Keys** (10 minutes)

**URL:** https://console.cloud.google.com/

**Steps:**
1. Create project: "Sanjari Prints"
2. Enable "Google+ API"
3. OAuth Consent Screen → External
4. Create Credentials → OAuth Client ID → Web application
5. Add redirect URI: [Your Supabase callback URL]
6. Copy Client ID & Secret

**You'll get:**
```
Client ID: xxxxx-xxxxx.apps.googleusercontent.com
Client Secret: GOCSPX-xxxxx
```

---

### **3. Facebook OAuth Keys** (10 minutes)

**URL:** https://developers.facebook.com/

**Steps:**
1. Create App: "Sanjari Prints" → Consumer
2. Add Product: "Facebook Login"
3. Settings → Valid OAuth Redirect URIs: [Your Supabase callback URL]
4. Settings → Basic → Copy App ID & Secret

**You'll get:**
```
App ID: 1234567890123456
App Secret: xxxxx (click "Show")
```

---

### **4. Add to Supabase** (5 minutes)

**Supabase Dashboard → Authentication → Providers**

**Google:**
- Enable: ON
- Client ID: [Paste]
- Client Secret: [Paste]
- Save ✅

**Facebook:**
- Enable: ON
- Facebook Client ID: [Paste App ID]
- Facebook Secret: [Paste App Secret]
- Save ✅

---

### **5. Test** (5 minutes)

1. Go to your app login page
2. Click "Sign in with Google" → Should work ✅
3. Click "Sign in with Facebook" → Should work ✅
4. Check Supabase → Auth → Users → See new users ✅

---

## 📖 Full Guides

### **Need More Details?**

**Quick Checklist (30 min):**
→ `⚡_OAUTH_QUICK_CHECKLIST.md`

**Complete Step-by-Step Guide:**
→ `GOOGLE_FACEBOOK_OAUTH_SETUP.md`

**Overview:**
→ `SOCIAL_AUTH_QUICK_SETUP.md`

---

## 🐛 Quick Troubleshooting

### **"Redirect URI Mismatch"**
```
❌ Problem: Callback URL doesn't match

✅ Fix: Copy EXACT URL from Supabase
      Paste EXACTLY in Google/Facebook settings
      No trailing slashes, must match 100%
```

### **"Access Denied" (Google)**
```
❌ Problem: Not in test users list

✅ Fix: Google Console → OAuth Consent → Test Users
      Add your Gmail address
```

### **"App Not Setup" (Facebook)**
```
❌ Problem: App in development mode

✅ Fix: Add test users or switch to Live mode
```

---

## 📝 Credentials Template

**Save these securely! 🔒**

```
=================================
OAUTH CREDENTIALS - SANJARI PRINTS
=================================

SUPABASE CALLBACK URL:
_________________________________

GOOGLE:
Client ID: _________________________________
Client Secret: _________________________________

FACEBOOK:
App ID: _________________________________
App Secret: _________________________________

Date Obtained: _____________
Added to Supabase: [ ]

=================================
```

---

## ✅ Checklist

- [ ] Got Supabase callback URL
- [ ] Created Google project
- [ ] Got Google Client ID & Secret
- [ ] Created Facebook app
- [ ] Got Facebook App ID & Secret
- [ ] Added Google to Supabase
- [ ] Added Facebook to Supabase
- [ ] Tested Google login
- [ ] Tested Facebook login
- [ ] Users appearing in database
- [ ] DONE! 🎉

---

## 🚀 Start Now!

**Step 1:** Get your Supabase callback URL ⬆️

**Step 2:** Go to Google Console 🔵
→ https://console.cloud.google.com/

**Step 3:** Go to Facebook Developers 🔷
→ https://developers.facebook.com/

**Step 4:** Follow the steps above

**Time Required:** 30 minutes total

---

## 💡 Pro Tips

1. **Do Google first** - It's easier
2. **Save credentials immediately** - Don't lose them
3. **Copy URLs exactly** - No trailing slashes
4. **Test in development mode first** - Before going live
5. **Keep this doc open** - While setting up

---

## 🎯 Success Criteria

You're done when:
- ✅ Can click "Sign in with Google" and it works
- ✅ Can click "Sign in with Facebook" and it works
- ✅ Users appear in Supabase Auth
- ✅ User profiles created in database
- ✅ No errors in console

---

## 📞 Need Help?

**Quick Help:**
- See troubleshooting section above
- Check `⚡_OAUTH_QUICK_CHECKLIST.md`

**Detailed Help:**
- See `GOOGLE_FACEBOOK_OAUTH_SETUP.md`
- Full step-by-step with screenshots descriptions

---

## 🎓 What You're Building

Before:
```
❌ Only email/password login
❌ Users must create accounts
❌ Friction in signup process
```

After:
```
✅ Google one-click login
✅ Facebook one-click login
✅ Faster, easier signup
✅ More user conversions
```

---

## ⏱️ Time Breakdown

| Task | Time |
|------|------|
| Get Supabase URL | 1 min |
| Google Console Setup | 10 min |
| Facebook App Setup | 10 min |
| Add to Supabase | 5 min |
| Testing | 5 min |
| **TOTAL** | **30 min** |

---

## 🎉 You Got This!

It's easier than it looks. Just follow the steps, and you'll have OAuth working in 30 minutes!

**Start here:** Get your Supabase callback URL ⬆️

Then follow the numbered steps.

---

**Good luck! 🚀**

**P.S.** Once you're done, social login will be working on your site! Users will love the convenience! 😊
