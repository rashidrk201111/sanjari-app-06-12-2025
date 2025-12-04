# 🔧 FIX INFINITE RECURSION ERROR

## ⚠️ Error: "infinite recursion detected in policy for relation 'users'"

This happens when RLS policies try to check the `users` table FROM WITHIN the users table policy. It creates an infinite loop!

---

## ✅ **SOLUTION (1 Minute)**

### **Run This SQL Script:**

1. **Open Supabase SQL Editor:**
   ```
   https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
   ```

2. **Open the file:** `/FIX_RECURSION.sql`

3. **Copy EVERYTHING** from that file

4. **Paste** into Supabase SQL Editor

5. **Click RUN** button

6. **Wait** for completion (should see "Success")

7. **Refresh your app** (Ctrl+Shift+R)

8. **Try logging in** to admin panel again

---

## 🎯 **What This Fix Does:**

### **The Problem:**
Old policies looked like this:
```sql
CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users  -- ← RECURSION!
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

When you try to SELECT from `users` table:
1. RLS checks the policy
2. Policy tries to SELECT from `users` to check if you're admin
3. That SELECT triggers RLS again
4. Which checks the policy again
5. Which tries to SELECT again
6. **INFINITE LOOP!** 💥

---

### **The Solution:**
Create a `SECURITY DEFINER` function that **bypasses RLS**:

```sql
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND role IN ('admin', 'staff')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;  -- ← This bypasses RLS!
```

Now policies use this function:
```sql
CREATE POLICY "users_select_all_if_admin" ON public.users
    FOR SELECT 
    USING (public.is_admin());  -- ← No recursion!
```

**How it works:**
1. User tries to SELECT from `users`
2. RLS checks policy
3. Policy calls `is_admin()` function
4. Function runs with SECURITY DEFINER (bypasses RLS)
5. Function checks role directly (no RLS check)
6. Returns true/false
7. **No recursion!** ✅

---

## ✅ **After Running the Fix:**

The script does:
1. ✅ Drops all old recursive policies
2. ✅ Creates `is_admin()` helper function with SECURITY DEFINER
3. ✅ Creates new policies that use the helper function
4. ✅ No more infinite recursion!

---

## 🔍 **Verify It Worked:**

### **Test 1: Check function exists**
```sql
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name = 'is_admin';
```
Should return: `is_admin`

---

### **Test 2: Test the function**
```sql
SELECT public.is_admin();
```
- If you're logged in as admin: returns `true`
- If not admin: returns `false`
- If not logged in: returns `false`

---

### **Test 3: Check policies**
```sql
SELECT policyname 
FROM pg_policies 
WHERE tablename = 'users';
```
Should show:
- users_select_own
- users_select_all_if_admin
- users_update_own
- users_update_all_if_admin
- users_insert_if_admin
- users_delete_if_admin

---

### **Test 4: Try in your app**
1. Refresh the app (Ctrl+Shift+R)
2. Login to admin panel
3. Check browser console (F12)
4. Should see NO recursion errors ✅
5. User profile should load ✅
6. Orders should load ✅

---

## 🐛 **If Still Getting Errors:**

### **Error: "function is_admin does not exist"**
**Solution:**
- Script didn't run completely
- Run `/FIX_RECURSION.sql` again
- Make sure you see "CREATE FUNCTION" in the output

---

### **Error: "permission denied for function is_admin"**
**Solution:**
- The function needs SECURITY DEFINER
- Run this:
  ```sql
  ALTER FUNCTION public.is_admin() SECURITY DEFINER;
  ```

---

### **Error: Still seeing recursion**
**Solution:**
- Old policies might still exist
- Run this to drop all policies:
  ```sql
  DROP POLICY IF EXISTS "users_select_admin" ON public.users;
  DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
  ```
- Then run `/FIX_RECURSION.sql` again

---

## 📊 **How Policies Work Now:**

### **For regular users:**
```
User tries to view their profile
  ↓
Policy: "users_select_own"
  ↓
Check: auth.uid() = id?
  ↓
✅ Yes → Allow (no recursion!)
```

### **For admins viewing all users:**
```
Admin tries to view all users
  ↓
Policy: "users_select_all_if_admin"
  ↓
Call: is_admin() function
  ↓
Function runs with SECURITY DEFINER (bypasses RLS)
  ↓
Check: SELECT FROM users WHERE id = auth.uid() AND role = 'admin'
  ↓
Return: true or false
  ↓
✅ If true → Allow (no recursion!)
```

---

## ✅ **Success Checklist:**

After running the fix:

- [ ] Ran `/FIX_RECURSION.sql` successfully
- [ ] `is_admin()` function created
- [ ] New policies created (check with pg_policies)
- [ ] Refreshed app
- [ ] Can login to admin panel
- [ ] No recursion errors in console
- [ ] User profile loads
- [ ] Orders load
- [ ] Admin dashboard works

---

## 🎉 **What You Get:**

After this fix:
- ✅ No more infinite recursion errors
- ✅ RLS policies work correctly
- ✅ Admins can view all users/orders
- ✅ Regular users can only see their own data
- ✅ Fast and efficient (no loops)
- ✅ Secure (proper access control)

---

## 💡 **Technical Notes:**

**SECURITY DEFINER** means:
- Function runs with the permissions of the user who CREATED it
- It bypasses RLS policies
- It's safe because the function logic controls access
- Similar to SETUID in Unix or "Run as administrator" in Windows

**Why it's needed:**
- Without it, the function would also be subject to RLS
- That would create the same recursion problem
- With it, the function can check roles directly

**Security:**
- The function only checks if user is admin
- It doesn't expose sensitive data
- It's a simple boolean check
- It's safe to use in policies

---

**Ready to fix? Run `/FIX_RECURSION.sql` now!** 🚀
