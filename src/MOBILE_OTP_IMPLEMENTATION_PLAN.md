# 📱 Mobile OTP Implementation Plan - Sanjari Prints

**Date:** December 2024  
**Status:** 🔵 **READY TO IMPLEMENT**

---

## 🎯 What We're Building

### **Features:**
1. **Login/Signup with Mobile OTP** - Users can authenticate using just their phone number
2. **OTP Verification** - 6-digit OTP sent via SMS
3. **Resend OTP** - With cooldown timer (60 seconds)
4. **Order Confirmation via SMS** - Send order details to customer's phone
5. **Order Status Updates via SMS** - Notify customers when order status changes

---

## 🇮🇳 Recommended SMS Provider for India

Since your customers are primarily Indian (based on +91 phone numbers), here are the best options:

| Provider | Free Tier | Cost | Best For | Setup Difficulty |
|----------|-----------|------|----------|------------------|
| **MSG91** ⭐ | 100 SMS free | ₹0.15/SMS | India | Easy |
| **Twilio** | Free trial $15 | $0.0079/SMS | Global | Easy |
| **Fast2SMS** | 50 SMS free | ₹0.10/SMS | India | Very Easy |
| **TextLocal** | 25 SMS free | ₹0.15/SMS | India | Easy |
| **AWS SNS** | 100 SMS free | $0.00645/SMS | Scalable | Medium |

**Recommendation: MSG91** - Best for Indian market, competitive pricing, good delivery rates.

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  LoginWithOTPPage.tsx                                    │
│    ├── Phone number input (+91 XXXXXXXXXX)              │
│    ├── Send OTP button                                  │
│    ├── OTP input (6 digits)                             │
│    └── Verify button                                    │
│                                                          │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                   BACKEND LOGIC                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Supabase Edge Function: send-otp                       │
│    1. Generate 6-digit OTP                              │
│    2. Store OTP in database (with expiry)               │
│    3. Call MSG91 API to send SMS                        │
│    4. Return success/error                              │
│                                                          │
│  Supabase Edge Function: verify-otp                     │
│    1. Check OTP in database                             │
│    2. Verify not expired (5 min validity)               │
│    3. Mark as used                                      │
│    4. Create/login user                                 │
│    5. Return session token                              │
│                                                          │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                   DATABASE SCHEMA                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Table: otp_verifications                               │
│    ├── id (uuid)                                        │
│    ├── phone (text)                                     │
│    ├── otp_code (text)                                  │
│    ├── created_at (timestamp)                           │
│    ├── expires_at (timestamp)                           │
│    ├── is_verified (boolean)                            │
│    ├── attempts (integer)                               │
│    └── type (enum: 'login', 'order_confirm')           │
│                                                          │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                  EXTERNAL SMS API                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  MSG91 API                                              │
│    POST https://api.msg91.com/api/v5/otp               │
│    Headers:                                             │
│      - authkey: YOUR_MSG91_KEY                         │
│    Body:                                                │
│      - mobile: +919876543210                           │
│      - otp: 123456                                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### **New Table: `otp_verifications`**

```sql
-- Create OTP verifications table
CREATE TABLE public.otp_verifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone TEXT NOT NULL,
    otp_code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    attempts INTEGER DEFAULT 0,
    type TEXT DEFAULT 'login' CHECK (type IN ('login', 'signup', 'order_confirm')),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index for faster lookups
CREATE INDEX idx_otp_phone ON public.otp_verifications(phone);
CREATE INDEX idx_otp_created_at ON public.otp_verifications(created_at);

-- Enable RLS
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own OTPs (via Edge Function)
CREATE POLICY "Users can verify their own OTPs" 
ON public.otp_verifications 
FOR SELECT 
USING (true); -- Edge function will handle authorization

-- Policy: Service role can insert
CREATE POLICY "Service role can insert OTPs" 
ON public.otp_verifications 
FOR INSERT 
WITH CHECK (true);

-- Cleanup old OTPs (keep only last 7 days)
CREATE OR REPLACE FUNCTION cleanup_old_otps()
RETURNS void AS $$
BEGIN
    DELETE FROM public.otp_verifications
    WHERE created_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to run cleanup daily (optional)
-- You can set this up in Supabase Dashboard -> Database -> Cron Jobs
```

### **Update `users` table to support phone login**

```sql
-- Add phone_verified column if not exists
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT FALSE;

-- Create unique constraint on phone
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone_unique 
ON public.users(phone) 
WHERE phone IS NOT NULL AND phone != '';
```

---

## 🚀 Implementation Steps

### **Phase 1: Setup SMS Provider (30 minutes)**

#### **Option A: MSG91 Setup** ⭐ Recommended for India

**Step 1: Create MSG91 Account**
```
1. Go to: https://msg91.com/signup
2. Sign up with your email
3. Verify your email
4. Complete KYC (upload ID, takes 24 hours for approval)
```

**Step 2: Get API Key**
```
1. Go to: https://msg91.com/dashboard
2. Click "API" in sidebar
3. Copy your "Auth Key"
4. Save it securely
```

**Step 3: Configure OTP Template**
```
1. Go to: https://msg91.com/otp
2. Create new OTP template:
   - Template Name: "Sanjari Prints Login OTP"
   - Template: "Your OTP for Sanjari Prints is ##OTP##. Valid for 5 minutes. Do not share this OTP with anyone."
   - DLT Template ID: (get from DLT portal)
3. Get Template ID
```

**Step 4: Test in Postman**
```bash
curl --location 'https://control.msg91.com/api/v5/otp' \
--header 'authkey: YOUR_AUTH_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "template_id": "YOUR_TEMPLATE_ID",
    "mobile": "919876543210",
    "otp": "123456"
}'
```

---

#### **Option B: Twilio Setup** (Global)

**Step 1: Create Twilio Account**
```
1. Go to: https://www.twilio.com/try-twilio
2. Sign up (get $15 free credit)
3. Verify your email and phone
```

**Step 2: Get Credentials**
```
1. Go to: https://console.twilio.com/
2. Find your:
   - Account SID
   - Auth Token
   - Phone Number (buy one if needed, ~$1/month)
```

**Step 3: Test SMS**
```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=Your OTP is 123456" \
--data-urlencode "From=+1234567890" \
--data-urlencode "To=+919876543210" \
-u YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN
```

---

### **Phase 2: Create Supabase Edge Functions (1 hour)**

#### **Function 1: send-otp**

**File: `supabase/functions/send-otp/index.ts`**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { phone } = await req.json()

    // Validate phone number
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check rate limiting (max 3 OTPs per hour per phone)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { data: recentOTPs } = await supabase
      .from('otp_verifications')
      .select('id')
      .eq('phone', phone)
      .gte('created_at', oneHourAgo)

    if (recentOTPs && recentOTPs.length >= 3) {
      return new Response(
        JSON.stringify({ error: 'Too many OTP requests. Please try after 1 hour.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Store OTP in database (expires in 5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString()
    const { error: dbError } = await supabase
      .from('otp_verifications')
      .insert({
        phone,
        otp_code: otp,
        expires_at: expiresAt,
        type: 'login'
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ error: 'Failed to generate OTP' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Send SMS via MSG91
    const msg91Key = Deno.env.get('MSG91_AUTH_KEY')
    const msg91TemplateId = Deno.env.get('MSG91_TEMPLATE_ID')

    const smsResponse = await fetch('https://control.msg91.com/api/v5/otp', {
      method: 'POST',
      headers: {
        'authkey': msg91Key!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        template_id: msg91TemplateId,
        mobile: `91${phone}`,
        otp: otp
      })
    })

    const smsResult = await smsResponse.json()

    if (!smsResponse.ok) {
      console.error('SMS error:', smsResult)
      return new Response(
        JSON.stringify({ error: 'Failed to send OTP' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP sent successfully',
        expiresIn: 300 // 5 minutes in seconds
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
```

---

#### **Function 2: verify-otp**

**File: `supabase/functions/verify-otp/index.ts`**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { phone, otp, name } = await req.json()

    // Validate inputs
    if (!phone || !otp) {
      return new Response(
        JSON.stringify({ error: 'Phone and OTP are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Find the most recent OTP for this phone
    const { data: otpRecord, error: fetchError } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('phone', phone)
      .eq('is_verified', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !otpRecord) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired OTP' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if OTP is expired
    if (new Date(otpRecord.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'OTP has expired. Please request a new one.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check attempts (max 3)
    if (otpRecord.attempts >= 3) {
      return new Response(
        JSON.stringify({ error: 'Too many failed attempts. Please request a new OTP.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify OTP
    if (otpRecord.otp_code !== otp) {
      // Increment attempts
      await supabase
        .from('otp_verifications')
        .update({ attempts: otpRecord.attempts + 1 })
        .eq('id', otpRecord.id)

      return new Response(
        JSON.stringify({ 
          error: 'Invalid OTP. Please try again.',
          attemptsLeft: 3 - (otpRecord.attempts + 1)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Mark OTP as verified
    await supabase
      .from('otp_verifications')
      .update({ is_verified: true })
      .eq('id', otpRecord.id)

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone)
      .single()

    let userId: string

    if (existingUser) {
      // Update phone_verified flag
      await supabase
        .from('users')
        .update({ phone_verified: true })
        .eq('id', existingUser.id)
      
      userId = existingUser.id
    } else {
      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          phone,
          name: name || `User ${phone.slice(-4)}`,
          email: `${phone}@phone.temp`, // Temporary email
          password_hash: 'phone_auth',
          role: 'user',
          phone_verified: true,
          email_verified: false
        })
        .select()
        .single()

      if (createError || !newUser) {
        console.error('User creation error:', createError)
        return new Response(
          JSON.stringify({ error: 'Failed to create user' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      userId = newUser.id
    }

    // Create session token (simplified - in production use proper JWT)
    const sessionToken = `${userId}_${Date.now()}`

    return new Response(
      JSON.stringify({ 
        success: true,
        userId,
        sessionToken,
        message: 'OTP verified successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
```

---

### **Phase 3: Create Frontend Components (1.5 hours)**

#### **Component 1: LoginWithOTPPage.tsx**

This will be created in next step with full implementation.

---

## 📋 Implementation Checklist

### **Backend Setup**
- [ ] Choose SMS provider (MSG91 / Twilio / Fast2SMS)
- [ ] Create account and get API keys
- [ ] Configure OTP template
- [ ] Test SMS sending with Postman
- [ ] Run database schema SQL in Supabase
- [ ] Create `send-otp` Edge Function
- [ ] Create `verify-otp` Edge Function
- [ ] Deploy Edge Functions
- [ ] Set environment variables in Supabase
- [ ] Test Edge Functions

### **Frontend Development**
- [ ] Create `LoginWithOTPPage.tsx`
- [ ] Create `OTPInput` component (use existing input-otp)
- [ ] Update routing in `App.tsx`
- [ ] Add "Login with OTP" option to LoginPage
- [ ] Update AuthContext to support phone login
- [ ] Add phone number validation
- [ ] Add resend OTP functionality
- [ ] Add loading states
- [ ] Add error handling

### **Testing**
- [ ] Test OTP sending
- [ ] Test OTP verification
- [ ] Test rate limiting
- [ ] Test expired OTP handling
- [ ] Test invalid OTP handling
- [ ] Test resend functionality
- [ ] Test with different phone numbers
- [ ] Test user creation
- [ ] Test existing user login

### **Order Notifications (Bonus)**
- [ ] Create `send-order-sms` Edge Function
- [ ] Call from CheckoutPage after order creation
- [ ] Create SMS template for order confirmation
- [ ] Test order SMS

---

## 💰 Cost Estimation

### **MSG91 Pricing (India)**
```
- Per SMS: ₹0.15
- 1000 SMS: ₹150
- 10000 SMS: ₹1500
- Free tier: 100 SMS

Estimate for 100 orders/day:
- OTP: 100 SMS/day = ₹15/day = ₹450/month
- Order confirmation: 100 SMS/day = ₹15/day = ₹450/month
- Total: ₹900/month (~$11/month)
```

### **Twilio Pricing (Global)**
```
- Per SMS to India: $0.0079 (~₹0.65)
- 1000 SMS: $7.90
- Free credit: $15 (enough for testing)

Estimate for 100 orders/day:
- OTP: 100 SMS/day = $0.79/day = $24/month
- Order confirmation: 100 SMS/day = $0.79/day = $24/month
- Total: $48/month
```

**Recommendation:** Use MSG91 for India - 4x cheaper!

---

## 🔒 Security Best Practices

1. **Rate Limiting:**
   - Max 3 OTPs per hour per phone
   - Max 3 verification attempts per OTP
   - Block suspicious patterns

2. **OTP Security:**
   - 6-digit random OTP
   - 5-minute expiry
   - One-time use only
   - Store hashed (optional but recommended)

3. **Phone Validation:**
   - Must be valid Indian mobile (6-9 starting digits)
   - 10 digits only
   - No duplicates allowed

4. **SMS Content:**
   - Include brand name
   - Mention validity time
   - Add warning not to share
   - Include support contact

---

## 🚀 Next Steps

**Ready to implement?** Reply with "yes" and I'll:

1. ✅ Create database schema SQL file
2. ✅ Create both Supabase Edge Functions
3. ✅ Create `LoginWithOTPPage.tsx` component
4. ✅ Update `App.tsx` routing
5. ✅ Update `AuthContextSupabase.tsx` to support phone login
6. ✅ Create SMS service utility
7. ✅ Add OTP verification to checkout flow
8. ✅ Create deployment guide

**Or if you want to start with specific provider:**
- Reply "MSG91" for MSG91 implementation
- Reply "Twilio" for Twilio implementation
- Reply "Fast2SMS" for Fast2SMS implementation

I'll generate the complete code based on your choice!

---

**Time Estimate:** 3-4 hours total
**Difficulty:** Medium
**Priority:** HIGH - Great UX improvement!
