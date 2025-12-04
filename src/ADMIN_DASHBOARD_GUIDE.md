# Admin Dashboard Guide

## 🔐 Admin Access

### Login Credentials
- **URL**: `#/admin/login`
- **Email**: `admin@sanjariprints.com`
- **Password**: `admin123`

## 📊 Admin Dashboard Features

### 1. **Overview Tab**
- Real-time statistics dashboard
- Total revenue, orders, and users
- Pending orders count
- Recent orders list with quick status view

### 2. **Orders Management**
- View all customer orders
- Search orders by order number or customer name
- Filter orders by status (All, Pending, Processing, Shipped, Delivered, Cancelled)
- Update order status directly from the dashboard
- View order details including:
  - Customer information
  - Items ordered
  - Delivery address
  - Total amount
  - Order date

### 3. **Users Management**
- View all registered users
- Search users by name or email
- Filter users by status (All, Active, Inactive)
- View user statistics:
  - Name, email, phone
  - Number of orders placed
  - Join date
  - Account status
- Quick actions: View details, Edit user

### 4. **Pricing Management**
- Configure pricing rules for different product categories
- Add new pricing rules with:
  - Category and subcategory selection
  - Base price configuration
  - Paper type options with price modifiers
  - Binding types with prices
  - Quantity-based discounts
- Edit existing pricing rules
- Delete pricing rules
- Filter pricing rules by category
- These rules power the Price Calculator feature

### 5. **Content Management**
- Manage website content (Coming soon)
- Edit homepage hero section
- Update product categories
- Modify About page content
- Manage FAQs

### 6. **Site Settings**
- **Basic Information**
  - Site name
  - Logo URL
  
- **Contact Information**
  - Email address
  - Primary phone
  - Secondary phone (optional)
  - Business address
  
- **Footer Content**
  - About text for footer
  
- **Social Media Links**
  - Facebook
  - Instagram
  - Twitter
  - LinkedIn

All settings changes are saved to localStorage and persist across sessions.

## 🎯 Key Features

### Data Persistence
- All admin changes are saved to localStorage
- Settings persist across browser sessions
- No backend required for demo/testing

### Security
- Separate admin authentication system
- Admin routes are protected
- Admin session management
- Hardcoded credentials (for demo - should be backend authenticated in production)

### User Interface
- Modern, responsive design
- Clean dashboard layout
- Real-time statistics
- Quick action buttons
- Search and filter functionality
- Status badges with color coding

## 📝 Common Tasks

### Updating Order Status
1. Go to "Orders" tab
2. Find the order you want to update
3. Click the status dropdown
4. Select new status (Pending → Processing → Shipped → Delivered)
5. Changes are reflected immediately

### Adding a Pricing Rule
1. Go to "Pricing" tab
2. Click "Add Pricing Rule"
3. Fill in:
   - Select category and subcategory
   - Set base price
   - Add paper types with price modifiers
   - Add quantity discounts
4. Save the rule

### Updating Site Settings
1. Go to "Settings" tab
2. Edit any fields (site name, contact info, social media links)
3. Click "Save Changes" button
4. Settings are updated across the website

## 🚀 Future Enhancements

- [ ] Content management for all pages
- [ ] Bulk order actions
- [ ] Export orders to CSV/Excel
- [ ] Analytics and reports
- [ ] Email notifications
- [ ] Product inventory management
- [ ] Customer communication tools
- [ ] Revenue charts and graphs
- [ ] Advanced filtering options
- [ ] Backend integration with Supabase

## 🔒 Production Notes

For production deployment:
- Replace hardcoded credentials with secure backend authentication
- Implement role-based access control
- Add audit logs for admin actions
- Use secure database for settings storage
- Implement email notifications for order updates
- Add file upload for logo management
- Enable HTTPS and secure session management

## 💡 Tips

- Use the search functionality to quickly find orders or users
- Filter by status to focus on pending/processing orders
- Regularly update site settings to keep information current
- Configure pricing rules for all product categories
- Monitor the overview dashboard for business insights
