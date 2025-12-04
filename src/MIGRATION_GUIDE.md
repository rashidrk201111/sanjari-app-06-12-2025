# Migration Guide: LocalStorage to Supabase

## Overview

This guide will help you migrate your Sanjari Prints application from localStorage to Supabase backend.

## Step-by-Step Migration

### ✅ Step 1: Set Up Supabase Database

1. Open your Supabase SQL Editor: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new

2. Copy and paste the **entire** contents of `/supabase-schema.sql`

3. Click **RUN** to execute the SQL

4. Verify all tables are created in the Table Editor

### ✅ Step 2: Verify Database Setup

Check these tables exist:
- ✅ users
- ✅ products
- ✅ orders
- ✅ pricing_rules
- ✅ faqs
- ✅ reviews
- ✅ seo_settings
- ✅ payment_settings
- ✅ content_pages

### ✅ Step 3: Update Authentication System

**Option A: Full Migration (Recommended)**

Replace the old AuthContext with the new Supabase-powered version:

```bash
# Backup old AuthContext (optional)
mv /context/AuthContext.tsx /context/AuthContext.OLD.tsx

# Use new Supabase AuthContext
mv /context/AuthContextSupabase.tsx /context/AuthContext.tsx
```

**Option B: Gradual Migration**

Keep both contexts and gradually migrate pages one by one.

### ✅ Step 4: Update Login Pages

The new AuthContext has async methods with proper error handling:

**Old way:**
```tsx
login(email, name, phone);
```

**New way:**
```tsx
const { success, error } = await login(email, password);
if (success) {
  // Handle success
} else {
  // Handle error
  toast.error(error);
}
```

### ✅ Step 5: Update Signup Flow

**Old way:**
```tsx
login(email, name, phone); // Used for both login and signup
```

**New way:**
```tsx
const { success, error } = await signup(email, password, name, phone);
if (success) {
  toast.success("Account created! Please check your email to verify.");
} else {
  toast.error(error);
}
```

### ✅ Step 6: Migrate Existing Data (Optional)

If you have important data in localStorage, you can migrate it to Supabase.

#### Migrate Users:
1. Go to Table Editor → users
2. Click "Insert row"
3. Fill in the details from your localStorage users
4. Make sure to hash passwords properly

#### Migrate Orders:
1. Go to Table Editor → orders
2. Click "Insert row"
3. Copy order data from localStorage
4. Link to appropriate user_id

#### Migrate Pricing Rules:
1. Go to Table Editor → pricing_rules
2. Insert your custom pricing rules

### ✅ Step 7: Update Admin Dashboard

The admin authentication will need to be updated to use Supabase:

1. Admins should be created in the users table with role='admin'
2. Admin login will use the same Supabase auth system
3. Update AdminContext to query Supabase instead of localStorage

### ✅ Step 8: Test Everything

1. **Test User Registration:**
   - Sign up with a new email
   - Verify you receive a confirmation email (if email configured)
   - Check users table in Supabase

2. **Test User Login:**
   - Login with registered credentials
   - Verify user profile loads correctly
   - Check session persistence

3. **Test Orders:**
   - Place a test order
   - Verify it appears in orders table
   - Check order history in user dashboard

4. **Test Admin Login:**
   - Login with admin credentials
   - Email: `admin@sanjariprints.com`
   - Password: `admin123`
   - Change this password immediately!

5. **Test Admin Features:**
   - Create/update pricing rules
   - Manage users
   - Manage orders
   - Update SEO settings

## Breaking Changes

### Authentication Methods

**Old Interface:**
```tsx
interface AuthContextType {
  login: (email: string, name: string, phone?: string) => void;
  // ... other methods
}
```

**New Interface:**
```tsx
interface AuthContextType {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  // ... other methods
}
```

### Key Changes:

1. ✅ Login now requires **password** instead of name
2. ✅ All auth methods are now **async** (return Promises)
3. ✅ Added new **signup()** method
4. ✅ Added **resetPassword()** method
5. ✅ Added **loading** state for initial auth check
6. ✅ Methods return `{ success, error }` for better error handling

## Pages That Need Updates

### High Priority:
1. ✅ `/pages/LoginPage.tsx` - Update to use new login method
2. ✅ `/pages/SignupPage.tsx` - Update to use new signup method
3. ✅ `/pages/ForgotPasswordPage.tsx` - Update to use resetPassword
4. ✅ `/pages/AdminLoginPage.tsx` - Update for Supabase auth

### Medium Priority:
5. ✅ `/pages/CheckoutPage.tsx` - Update addOrder to handle async
6. ✅ `/pages/UserDashboardPage.tsx` - Handle loading state

### Low Priority:
7. All other pages using useAuth() - Add loading checks

## Common Issues & Solutions

### Issue: "User not authenticated after login"

**Solution:** Make sure you're awaiting the login promise:
```tsx
const { success } = await login(email, password);
```

### Issue: "Orders not loading"

**Solution:** Check that:
1. Orders table has correct user_id foreign key
2. RLS policies allow user to read their own orders
3. Order data structure matches expected format

### Issue: "Cannot read property of undefined"

**Solution:** Always check loading state:
```tsx
const { user, loading } = useAuth();
if (loading) return <LoadingSpinner />;
if (!user) return <Navigate to="/login" />;
```

### Issue: "Supabase connection error"

**Solution:**
1. Verify your Supabase URL and anon key in `/lib/supabase.ts`
2. Check that RLS policies are enabled
3. Make sure you ran the SQL schema

## Rollback Plan

If you need to rollback to localStorage:

```bash
# Restore old AuthContext
mv /context/AuthContext.OLD.tsx /context/AuthContext.tsx
```

## Security Improvements

✅ **Passwords are now hashed** - Supabase handles bcrypt hashing automatically
✅ **Row Level Security (RLS)** - Users can only access their own data
✅ **Session management** - Automatic token refresh and expiry
✅ **Email verification** - Built-in email verification workflow
✅ **Password reset** - Secure password reset via email

## Performance Improvements

✅ **Real-time updates** - Use Supabase real-time subscriptions
✅ **Optimistic updates** - Update UI before server response
✅ **Caching** - Supabase client caches queries automatically
✅ **Pagination** - Query large datasets efficiently

## Next Steps

After successful migration:

1. ✅ Remove localStorage fallbacks
2. ✅ Set up Supabase email templates
3. ✅ Configure email provider (SendGrid, etc.)
4. ✅ Enable real-time subscriptions for orders
5. ✅ Set up Supabase Edge Functions for complex logic
6. ✅ Add database backups
7. ✅ Monitor with Supabase Analytics

## Support

If you encounter any issues:
- Check Supabase logs: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/logs/explorer
- Review RLS policies in Table Editor
- Check browser console for errors
- Verify API keys are correct

## Default Credentials

**Default Admin:**
- Email: `admin@sanjariprints.com`
- Password: `admin123`
- ⚠️ **CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN!**

**Test User:**
You'll need to create test users through the signup form.

## Congratulations! 🎉

Once migration is complete, your application will have:
- ✅ Secure backend with Supabase
- ✅ Real user authentication
- ✅ Persistent data storage
- ✅ Role-based access control
- ✅ Professional database management
