# Supabase Setup Guide for Sanjari Prints

## ✅ Step 1: Run the SQL Schema

1. Go to your Supabase SQL Editor: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/sql/new

2. Copy the ENTIRE contents of `/supabase-schema.sql` file

3. Paste it into the SQL Editor and click **RUN**

4. Wait for the execution to complete. You should see a success message.

## ✅ Step 2: Verify Tables Created

Go to your Table Editor: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/editor

You should see these tables:
- ✅ users
- ✅ products
- ✅ orders
- ✅ pricing_rules
- ✅ faqs
- ✅ reviews
- ✅ seo_settings
- ✅ payment_settings
- ✅ content_pages

## ✅ Step 3: Verify Default Admin User

1. Go to Table Editor → `users` table
2. You should see an admin user:
   - Email: `admin@sanjariprints.com`
   - Password: `admin123` (⚠️ Change this immediately after first login!)
   - Role: `admin`

## ✅ Step 4: Verify Default Reviews

1. Go to Table Editor → `reviews` table
2. You should see 3 approved reviews from Indian users

## 🔐 Security Features Enabled

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Public can read products, pricing, FAQs, approved reviews
- ✅ Users can only see their own data
- ✅ Admins have full access
- ✅ Secure password hashing with bcrypt

## 📊 What's Been Set Up

### Authentication System
- User registration and login
- Email verification tracking
- Role-based access (user, admin, staff)
- Secure password storage

### E-commerce Features
- Product catalog with categories and subcategories
- Dynamic pricing rules
- Order management
- Shopping cart (will be stored in browser localStorage for performance)

### Admin Dashboard
- User management
- Order management
- Pricing rules
- FAQs management
- Reviews moderation
- SEO settings
- Payment gateway configuration
- Content management

### Public Features
- Reviews and testimonials
- FAQ system
- SEO optimization
- Payment integration support

## 🔄 Next Steps

The following files have been created/updated:
1. ✅ `/lib/supabase.ts` - Supabase client configuration
2. ✅ `/supabase-schema.sql` - Database schema (run this in SQL Editor)
3. 🔄 Contexts will be updated to use Supabase instead of localStorage

## ⚠️ Important Notes

1. **Change the default admin password** after your first login!
2. The shopping cart will remain in localStorage for performance
3. All sensitive data is now stored securely in Supabase
4. Row Level Security ensures users can only access their own data
5. Payment keys should be added via the Admin Dashboard

## 🧪 Testing

After running the SQL schema:

1. Try logging in with:
   - Email: `admin@sanjariprints.com`
   - Password: `admin123`

2. Create a test user account
3. Test adding products (admin only)
4. Test placing an order
5. Test submitting a review

## 📞 Support

If you encounter any issues:
- Check the Supabase logs: https://supabase.com/dashboard/project/hgxhdmcqrcsjsxuaeyrl/logs/explorer
- Verify RLS policies are enabled
- Ensure all tables were created successfully
