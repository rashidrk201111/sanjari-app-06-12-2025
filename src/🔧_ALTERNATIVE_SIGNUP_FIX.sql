-- ============================================
-- 🔧 ALTERNATIVE FIX: Use Database Function for Signup
-- ============================================
-- This approach uses a SECURITY DEFINER function to bypass RLS
-- Run this INSTEAD of the other fix if the first one doesn't work
--
-- Copy ALL of this into Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new
-- ============================================

-- ============================================
-- Create a function to handle user profile creation
-- SECURITY DEFINER bypasses RLS policies
-- ============================================

CREATE OR REPLACE FUNCTION public.create_user_profile(
    user_id UUID,
    user_email TEXT,
    user_name TEXT,
    user_phone TEXT DEFAULT ''
)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    -- Insert the user profile
    INSERT INTO public.users (id, email, name, phone, role, email_verified)
    VALUES (user_id, user_email, user_name, user_phone, 'user', false)
    ON CONFLICT (id) DO UPDATE
    SET 
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        phone = EXCLUDED.phone,
        updated_at = NOW();
    
    -- Return success
    RETURN jsonb_build_object(
        'success', true,
        'message', 'Profile created successfully'
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_user_profile TO authenticated;

-- ============================================
-- Verification
-- ============================================

SELECT 
    proname as function_name,
    prosecdef as is_security_definer,
    provolatile
FROM pg_proc 
WHERE proname = 'create_user_profile';

-- ============================================
-- ✅ DONE!
-- ============================================
-- Now you need to update the frontend to use this function
-- instead of directly inserting into the users table.
--
-- See the file: 🔧_UPDATE_SIGNUP_CODE.md
-- ============================================
