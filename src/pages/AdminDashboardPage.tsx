import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  FileText,
  Edit2,
  Trash2,
  Plus,
  Search,
  LogOut,
  Shield,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  Truck,
  Eye,
  Ban,
  UserCheck,
  Calculator,
  Image,
  AlertCircle,
  List,
  Upload,
  X,
  Check
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { categories } from "../data/categories";
import { PricingRuleDialog } from "../components/PricingRuleDialog";
import { FAQDialog } from "../components/FAQDialog";
import { UserDialog } from "../components/UserDialog";
import { StaffDialog } from "../components/StaffDialog";
import { SEOSettingsTab } from "../components/admin/SEOSettingsTab";
import { PaymentSettingsTab } from "../components/admin/PaymentSettingsTab";
import { ReviewsTab } from "../components/admin/ReviewsTab";
import { PricingRule, FAQ, AdminUser, Staff } from "../context/AdminContext";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { 
    admin, 
    isAdminAuthenticated, 
    adminLogout, 
    siteSettings, 
    updateSiteSettings, 
    pricingRules, 
    updatePricingRule, 
    addPricingRule, 
    deletePricingRule, 
    users,
    addUser,
    updateUser,
    deleteUser,
    staff,
    addStaff,
    updateStaff,
    deleteStaff,
    orders, 
    updateOrderStatus,
    pageContent,
    updateHeroContent,
    updateAboutContent,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    seoSettings,
    updateSEOSettings,
    paymentGateway,
    updatePaymentGateway,
  } = useAdmin();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  
  // Site Settings State
  const [editedSettings, setEditedSettings] = useState(siteSettings);
  
  // Pricing Rule State
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [pricingDialogOpen, setPricingDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<PricingRule | null>(null);
  
  // Content Management State
  const [faqDialogOpen, setFaqDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [editingHero, setEditingHero] = useState(false);
  const [heroData, setHeroData] = useState(pageContent.hero);
  const [editingAbout, setEditingAbout] = useState(false);
  const [aboutData, setAboutData] = useState(pageContent.aboutPage);
  
  // User Management State
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  
  // Staff Management State
  const [staffDialogOpen, setStaffDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [staffFilter, setStaffFilter] = useState("all");
  
  // SEO Settings State
  const [editedSEO, setEditedSEO] = useState(seoSettings);
  
  // Payment Gateway State
  const [editedPayment, setEditedPayment] = useState(paymentGateway);
  
  // Logo Upload State
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [currentLogo, setCurrentLogo] = useState("");

  // Redirect if not authenticated
  if (!isAdminAuthenticated || !admin) {
    navigate("/admin/login");
    return null;
  }

  // Calculate statistics
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "processing").length;
  const deliveredOrders = orders.filter(o => o.status === "delivered").length;

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesFilter = orderFilter === "all" || order.status === orderFilter;
    const matchesSearch = searchQuery === "" || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesFilter = userFilter === "all" || 
      (userFilter === "active" && user.isActive) || 
      (userFilter === "inactive" && !user.isActive);
    const matchesSearch = searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleLogout = () => {
    adminLogout();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  // Fetch current logo on mount
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-a145b27b/logo`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.logo) {
            setCurrentLogo(data.logo);
            setLogoPreview(data.logo);
          }
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();
  }, []);

  const handleLogoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }

    setLogoFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = async () => {
    if (!logoFile) {
      toast.error("Please select a file first");
      return;
    }

    setUploadingLogo(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        
        // Upload to server
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-a145b27b/upload-logo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              file: base64,
              fileName: logoFile.name,
              fileType: logoFile.type,
            }),
          }
        );

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || "Failed to upload logo");
        }

        const data = await response.json();
        
        // Update current logo
        setCurrentLogo(data.url);
        setLogoPreview(data.url);
        setLogoFile(null);
        
        toast.success("Logo uploaded successfully! It will appear on your website shortly.");
      };
      
      reader.readAsDataURL(logoFile);
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Failed to upload logo. Please try again.");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleLogoRemove = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a145b27b/logo`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        setCurrentLogo("");
        setLogoPreview("");
        setLogoFile(null);
        toast.success("Logo removed successfully!");
      } else {
        throw new Error("Failed to remove logo");
      }
    } catch (error) {
      console.error("Error removing logo:", error);
      toast.error("Failed to remove logo");
    }
  };

  const handleLogoReset = () => {
    setLogoFile(null);
    setLogoPreview(currentLogo);
  };

  const handleSaveSettings = () => {
    updateSiteSettings(editedSettings);
    toast.success("Site settings updated successfully!");
  };

  const handleUpdateOrderStatus = (orderNumber: string, newStatus: string) => {
    updateOrderStatus(orderNumber, newStatus);
    toast.success(`Order ${orderNumber} status updated to ${newStatus}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "processing": return <Package className="w-4 h-4" />;
      case "shipped": return <Truck className="w-4 h-4" />;
      case "delivered": return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "processing": return "bg-blue-100 text-blue-700 border-blue-300";
      case "shipped": return "bg-purple-100 text-purple-700 border-purple-300";
      case "delivered": return "bg-green-100 text-green-700 border-green-300";
      case "cancelled": return "bg-red-100 text-red-700 border-red-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const handleSavePricingRule = (rule: PricingRule) => {
    if (editingRule) {
      updatePricingRule(rule);
    } else {
      addPricingRule(rule);
    }
  };

  const handleEditRule = (rule: PricingRule) => {
    setEditingRule(rule);
    setPricingDialogOpen(true);
  };

  const handleAddRule = () => {
    setEditingRule(null);
    setPricingDialogOpen(true);
  };

  const handleDeleteRule = (id: string) => {
    if (confirm("Are you sure you want to delete this pricing rule?")) {
      deletePricingRule(id);
      toast.success("Pricing rule deleted");
    }
  };

  // Content Management Handlers
  const handleSaveFAQ = (faq: FAQ) => {
    if (editingFAQ) {
      updateFAQ(faq);
    } else {
      addFAQ(faq);
    }
  };

  const handleEditFAQ = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFaqDialogOpen(true);
  };

  const handleAddFAQ = () => {
    setEditingFAQ(null);
    setFaqDialogOpen(true);
  };

  const handleDeleteFAQ = (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      deleteFAQ(id);
      toast.success("FAQ deleted");
    }
  };

  const handleSaveHero = () => {
    updateHeroContent(heroData);
    setEditingHero(false);
    toast.success("Hero content updated!");
  };

  const handleSaveAbout = () => {
    updateAboutContent(aboutData);
    setEditingAbout(false);
    toast.success("About page updated!");
  };

  // User Management Handlers
  const handleSaveUser = (user: AdminUser) => {
    if (editingUser) {
      updateUser(user);
    } else {
      addUser(user);
    }
  };

  const handleEditUser = (user: AdminUser) => {
    setEditingUser(user);
    setUserDialogOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setUserDialogOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
      toast.success("User deleted");
    }
  };

  // Staff Management Handlers
  const handleSaveStaff = async (staffMember: Staff & { password?: string }) => {
    if (editingStaff) {
      return await updateStaff(staffMember);
    } else {
      return await addStaff(staffMember);
    }
  };

  const handleEditStaff = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setStaffDialogOpen(true);
  };

  const handleAddStaff = () => {
    setEditingStaff(null);
    setStaffDialogOpen(true);
  };

  const handleDeleteStaff = async (id: string) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      await deleteStaff(id);
    }
  };

  // Helper functions for subcategory management
  const getSubcategoriesForCategory = (categorySlug: string) => {
    if (categorySlug === "all") {
      return categories.flatMap(cat => 
        cat.subcategories.map(sub => ({
          ...sub,
          categoryName: cat.name,
          categorySlug: cat.slug
        }))
      );
    }
    const category = categories.find(cat => cat.slug === categorySlug);
    return category ? category.subcategories.map(sub => ({
      ...sub,
      categoryName: category.name,
      categorySlug: category.slug
    })) : [];
  };

  const hasRuleForSubcategory = (categorySlug: string, subcategoryName: string) => {
    return pricingRules.some(rule => 
      rule.category === categorySlug && 
      rule.subcategory.toLowerCase() === subcategoryName.toLowerCase()
    );
  };

  const getRuleForSubcategory = (categorySlug: string, subcategoryName: string) => {
    return pricingRules.find(rule => 
      rule.category === categorySlug && 
      rule.subcategory.toLowerCase() === subcategoryName.toLowerCase()
    );
  };

  const handleQuickAddRule = (categorySlug: string, categoryName: string, subcategoryName: string) => {
    setEditingRule(null);
    setPricingDialogOpen(true);
    // The dialog will be pre-filled with this category/subcategory
    setTimeout(() => {
      const event = new CustomEvent('prefillPricingRule', {
        detail: { categorySlug, categoryName, subcategoryName }
      });
      window.dispatchEvent(event);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your printing service platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-900">{admin.name}</p>
                <p className="text-xs text-gray-600">{admin.role}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-9 lg:w-auto">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="pricing" className="gap-2">
              <Calculator className="w-4 h-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <FileText className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <List className="w-4 h-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2">
              <Globe className="w-4 h-4" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="payment" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Payment
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm text-blue-900 mb-1">Total Revenue</p>
                <p className="text-3xl text-blue-900">₹{totalRevenue.toLocaleString()}</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-green-900 mb-1">Total Orders</p>
                <p className="text-3xl text-green-900">{totalOrders}</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-purple-900 mb-1">Total Users</p>
                <p className="text-3xl text-purple-900">{totalUsers}</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-orange-900 mb-1">Pending Orders</p>
                <p className="text-3xl text-orange-900">{pendingOrders}</p>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <h2 className="text-xl text-gray-900 mb-4">Recent Orders</h2>
              <div className="space-y-3">
                {orders.slice(0, 5).map(order => (
                  <div key={order.orderNumber} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Package className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-900">Order #{order.orderNumber}</p>
                        <p className="text-xs text-gray-600">{order.deliveryAddress.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </Badge>
                      <p className="text-sm text-gray-900">₹{order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Orders Management Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl text-gray-900">Order Management</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search orders..."
                      className="pl-10 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={orderFilter} onValueChange={setOrderFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map(order => (
                      <TableRow key={order.orderNumber}>
                        <TableCell className="font-mono text-sm">{order.orderNumber}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm text-gray-900">{order.deliveryAddress.fullName}</p>
                            <p className="text-xs text-gray-600">{order.deliveryAddress.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.items.length}</TableCell>
                        <TableCell>₹{order.total}</TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleUpdateOrderStatus(order.orderNumber, value)}
                          >
                            <SelectTrigger className={`w-32 ${getStatusColor(order.status)}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{order.date}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Users Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl text-gray-900">Customer Management</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(user => {
                      const userOrders = orders.filter(o => o.deliveryAddress.phone === user.phone);
                      return (
                        <TableRow key={user.id}>
                          <TableCell className="text-gray-900">{user.name}</TableCell>
                          <TableCell className="text-sm text-gray-600">{user.email}</TableCell>
                          <TableCell className="text-sm text-gray-600">{user.phone || "N/A"}</TableCell>
                          <TableCell>{userOrders.length}</TableCell>
                          <TableCell className="text-sm text-gray-600">{user.joinedDate}</TableCell>
                          <TableCell>
                            <Badge className={user.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                              {user.isActive ? <UserCheck className="w-3 h-3 mr-1" /> : <Ban className="w-3 h-3 mr-1" />}
                              {user.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Staff Management Section */}
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl text-gray-900">Staff Management</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage team members with role-based access</p>
                </div>
                <div className="flex gap-3">
                  <Select value={staffFilter} onValueChange={setStaffFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Staff</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddStaff} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Staff
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff
                      .filter(s => {
                        if (staffFilter === "all") return true;
                        if (staffFilter === "active") return s.isActive;
                        if (staffFilter === "inactive") return !s.isActive;
                        return s.role === staffFilter;
                      })
                      .map(staffMember => (
                        <TableRow key={staffMember.id}>
                          <TableCell className="text-gray-900">{staffMember.name}</TableCell>
                          <TableCell className="text-sm text-gray-600">{staffMember.email}</TableCell>
                          <TableCell className="text-sm text-gray-600">{staffMember.phone || "N/A"}</TableCell>
                          <TableCell>
                            <Badge className={
                              staffMember.role === "admin" ? "bg-red-100 text-red-700" :
                              staffMember.role === "manager" ? "bg-blue-100 text-blue-700" :
                              staffMember.role === "staff" ? "bg-purple-100 text-purple-700" :
                              "bg-green-100 text-green-700"
                            }>
                              {staffMember.role.charAt(0).toUpperCase() + staffMember.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600 capitalize">
                            {staffMember.department?.replace("-", " ") || "N/A"}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">{staffMember.joinedDate}</TableCell>
                          <TableCell className="text-sm text-gray-600">{staffMember.lastLogin || "Never"}</TableCell>
                          <TableCell>
                            <Badge className={staffMember.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                              {staffMember.isActive ? <UserCheck className="w-3 h-3 mr-1" /> : <Ban className="w-3 h-3 mr-1" />}
                              {staffMember.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditStaff(staffMember)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteStaff(staffMember.id)}>
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* User Dialog */}
            <UserDialog
              open={userDialogOpen}
              onOpenChange={setUserDialogOpen}
              user={editingUser}
              onSave={handleSaveUser}
            />

            {/* Staff Dialog */}
            <StaffDialog
              open={staffDialogOpen}
              onOpenChange={setStaffDialogOpen}
              staff={editingStaff}
              onSave={handleSaveStaff}
            />
          </TabsContent>

          {/* Pricing Management Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-gray-900">Price Calculator Management</h2>
                <Button onClick={handleAddRule} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Pricing Rule
                </Button>
              </div>

              <Alert className="mb-6">
                <Calculator className="h-4 w-4" />
                <AlertDescription>
                  Configure pricing rules for different product categories. These rules will be used in the price calculator.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label>Filter by Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Subcategory Coverage Overview */}
              {selectedCategory !== "all" && (
                <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg text-gray-900 mb-1">Subcategory Coverage</h3>
                      <p className="text-sm text-gray-600">
                        {getSubcategoriesForCategory(selectedCategory).filter(sub => 
                          hasRuleForSubcategory(selectedCategory, sub.name)
                        ).length} of {getSubcategoriesForCategory(selectedCategory).length} subcategories configured
                      </p>
                    </div>
                    <Badge className="bg-blue-600 text-white">
                      {Math.round((getSubcategoriesForCategory(selectedCategory).filter(sub => 
                        hasRuleForSubcategory(selectedCategory, sub.name)
                      ).length / Math.max(getSubcategoriesForCategory(selectedCategory).length, 1)) * 100)}% Complete
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {getSubcategoriesForCategory(selectedCategory).map(subcategory => {
                      const hasRule = hasRuleForSubcategory(selectedCategory, subcategory.name);
                      const rule = getRuleForSubcategory(selectedCategory, subcategory.name);
                      
                      return (
                        <Card 
                          key={subcategory.slug} 
                          className={`p-3 border-2 transition-all ${
                            hasRule 
                              ? 'bg-green-50 border-green-300 hover:border-green-400' 
                              : 'bg-white border-orange-300 hover:border-orange-400'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {hasRule ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                )}
                                <p className="text-sm text-gray-900 truncate" title={subcategory.name}>
                                  {subcategory.name}
                                </p>
                              </div>
                              {hasRule && rule && (
                                <p className="text-xs text-gray-600">Base: ₹{rule.basePrice}</p>
                              )}
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              {hasRule && rule ? (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 w-7 p-0"
                                  onClick={() => handleEditRule(rule)}
                                >
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 px-2 text-xs bg-orange-100 hover:bg-orange-200 text-orange-700"
                                  onClick={() => handleQuickAddRule(
                                    selectedCategory,
                                    categories.find(c => c.slug === selectedCategory)?.name || '',
                                    subcategory.name
                                  )}
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                  
                  {getSubcategoriesForCategory(selectedCategory).length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-gray-600">No subcategories available for this category</p>
                    </div>
                  )}
                </Card>
              )}

              {pricingRules.length === 0 ? (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl text-gray-900 mb-2">No Pricing Rules</h3>
                  <p className="text-gray-600 mb-6">Add your first pricing rule to get started</p>
                  <Button onClick={handleAddRule} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Pricing Rule
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {pricingRules
                    .filter(rule => selectedCategory === "all" || rule.category === selectedCategory)
                    .map(rule => (
                      <Card key={rule.id} className="p-4 border-2 hover:border-blue-200 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg text-gray-900">{rule.subcategory}</h3>
                              <Badge variant="outline">{rule.category}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">Base Price: ₹{rule.basePrice}</p>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-700 mb-1">Paper Types:</p>
                                <div className="space-y-1">
                                  {rule.paperTypes.map((paper, idx) => (
                                    <p key={idx} className="text-gray-600">• {paper.name} (+₹{paper.priceModifier})</p>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-gray-700 mb-1">Quantity Discounts:</p>
                                <div className="space-y-1">
                                  {rule.quantityDiscounts.map((discount, idx) => (
                                    <p key={idx} className="text-gray-600">• {discount.minQty}+ units: {discount.discount}% off</p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditRule(rule)}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteRule(rule.id)}>
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </Card>

            {/* Pricing Rule Dialog */}
            <PricingRuleDialog
              open={pricingDialogOpen}
              onOpenChange={setPricingDialogOpen}
              rule={editingRule}
              onSave={handleSavePricingRule}
            />
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            {/* Hero Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl text-gray-900">Homepage Hero Section</h2>
                {!editingHero ? (
                  <Button onClick={() => setEditingHero(true)} variant="outline">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Hero
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSaveHero} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={() => {
                      setEditingHero(false);
                      setHeroData(pageContent.hero);
                    }} variant="outline">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {editingHero ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="heroTitle">Hero Title</Label>
                    <Input
                      id="heroTitle"
                      value={heroData.title}
                      onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                    <Textarea
                      id="heroSubtitle"
                      value={heroData.subtitle}
                      onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="heroCta">CTA Button Text</Label>
                      <Input
                        id="heroCta"
                        value={heroData.ctaText}
                        onChange={(e) => setHeroData({ ...heroData, ctaText: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroCtaLink">CTA Button Link</Label>
                      <Input
                        id="heroCtaLink"
                        value={heroData.ctaLink}
                        onChange={(e) => setHeroData({ ...heroData, ctaLink: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl text-gray-900">{pageContent.hero.title}</h3>
                  <p className="text-gray-600">{pageContent.hero.subtitle}</p>
                  <p className="text-sm text-gray-500">CTA: {pageContent.hero.ctaText} → {pageContent.hero.ctaLink}</p>
                </div>
              )}
            </Card>

            {/* About Page */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl text-gray-900">About Page Content</h2>
                {!editingAbout ? (
                  <Button onClick={() => setEditingAbout(true)} variant="outline">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit About
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSaveAbout} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={() => {
                      setEditingAbout(false);
                      setAboutData(pageContent.aboutPage);
                    }} variant="outline">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {editingAbout ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aboutTitle">Page Title</Label>
                    <Input
                      id="aboutTitle"
                      value={aboutData.title}
                      onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aboutSubtitle">Subtitle</Label>
                    <Input
                      id="aboutSubtitle"
                      value={aboutData.subtitle}
                      onChange={(e) => setAboutData({ ...aboutData, subtitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aboutDescription">Description</Label>
                    <Textarea
                      id="aboutDescription"
                      value={aboutData.description}
                      onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aboutMission">Mission Statement</Label>
                    <Textarea
                      id="aboutMission"
                      value={aboutData.mission}
                      onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aboutVision">Vision Statement</Label>
                    <Textarea
                      id="aboutVision"
                      value={aboutData.vision}
                      onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl text-gray-900">{pageContent.aboutPage.title}</h3>
                  <p className="text-gray-700">{pageContent.aboutPage.subtitle}</p>
                  <p className="text-sm text-gray-600">{pageContent.aboutPage.description}</p>
                </div>
              )}
            </Card>

            {/* FAQs Management */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl text-gray-900">FAQs Management</h2>
                <Button onClick={handleAddFAQ} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add FAQ
                </Button>
              </div>

              <div className="space-y-3">
                {pageContent.faqs.map(faq => (
                  <Card key={faq.id} className="p-4 border-2 hover:border-blue-200 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-700">{faq.category}</Badge>
                          <h3 className="text-gray-900">{faq.question}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditFAQ(faq)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteFAQ(faq.id)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* FAQ Dialog */}
            <FAQDialog
              open={faqDialogOpen}
              onOpenChange={setFaqDialogOpen}
              faq={editingFAQ}
              onSave={handleSaveFAQ}
            />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-gray-900">Site Settings</h2>
                <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={editedSettings.siteName}
                        onChange={(e) => setEditedSettings({ ...editedSettings, siteName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-4 col-span-2">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                        <Label className="text-base mb-3 block">Website Logo</Label>
                        
                        {/* Current Logo Preview */}
                        {logoPreview ? (
                          <div className="mb-4">
                            <div className="relative inline-block">
                              <img
                                src={logoPreview}
                                alt="Logo preview"
                                className="max-w-[200px] max-h-[120px] object-contain border-2 border-gray-200 rounded-lg p-2 bg-white"
                              />
                              {logoFile && (
                                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-1 text-xs">
                                  Preview
                                </Badge>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4 text-center py-8 border-2 border-gray-200 rounded-lg bg-white">
                            <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">No logo uploaded</p>
                            <p className="text-xs text-gray-500 mt-1">Default icon will be shown</p>
                          </div>
                        )}

                        {/* Upload Section */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleLogoFileSelect}
                              className="flex-1"
                              disabled={uploadingLogo}
                            />
                            
                            {logoFile && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handleLogoReset}
                                title="Cancel selection"
                                disabled={uploadingLogo}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>

                          {logoFile && (
                            <Alert className="bg-blue-50 border-blue-200">
                              <AlertDescription className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-blue-900">
                                    <strong>Selected:</strong> {logoFile.name}
                                  </p>
                                  <p className="text-xs text-blue-700 mt-1">
                                    Size: {(logoFile.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                                <Check className="w-5 h-5 text-blue-600" />
                              </AlertDescription>
                            </Alert>
                          )}

                          <div className="flex gap-2">
                            <Button
                              onClick={handleLogoUpload}
                              disabled={!logoFile || uploadingLogo}
                              className="flex-1"
                            >
                              {uploadingLogo ? (
                                <>
                                  <Upload className="w-4 h-4 mr-2 animate-spin" />
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4 mr-2" />
                                  Upload Logo
                                </>
                              )}
                            </Button>

                            {currentLogo && (
                              <Button
                                onClick={handleLogoRemove}
                                variant="destructive"
                                disabled={uploadingLogo}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Remove
                              </Button>
                            )}
                          </div>

                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-xs">
                              <strong>Recommended:</strong> 200x200px or larger. Max 2MB. 
                              Formats: PNG, JPG, SVG, WebP. Transparent background (PNG) works best.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedSettings.email}
                        onChange={(e) => setEditedSettings({ ...editedSettings, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Primary Phone
                      </Label>
                      <Input
                        id="phone"
                        value={editedSettings.phone}
                        onChange={(e) => setEditedSettings({ ...editedSettings, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Secondary Phone (Optional)
                      </Label>
                      <Input
                        id="phone2"
                        value={editedSettings.phone2 || ""}
                        onChange={(e) => setEditedSettings({ ...editedSettings, phone2: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={editedSettings.address}
                        onChange={(e) => setEditedSettings({ ...editedSettings, address: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg text-gray-900 mb-4">Footer Content</h3>
                  <div className="space-y-2">
                    <Label htmlFor="footerAbout">About Text</Label>
                    <Textarea
                      id="footerAbout"
                      rows={3}
                      value={editedSettings.footerAbout}
                      onChange={(e) => setEditedSettings({ ...editedSettings, footerAbout: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg text-gray-900 mb-4">
                    <Globe className="w-5 h-5 inline mr-2" />
                    Social Media Links
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={editedSettings.socialMedia.facebook || ""}
                        onChange={(e) => setEditedSettings({
                          ...editedSettings,
                          socialMedia: { ...editedSettings.socialMedia, facebook: e.target.value }
                        })}
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={editedSettings.socialMedia.instagram || ""}
                        onChange={(e) => setEditedSettings({
                          ...editedSettings,
                          socialMedia: { ...editedSettings.socialMedia, instagram: e.target.value }
                        })}
                        placeholder="https://instagram.com/yourpage"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={editedSettings.socialMedia.twitter || ""}
                        onChange={(e) => setEditedSettings({
                          ...editedSettings,
                          socialMedia: { ...editedSettings.socialMedia, twitter: e.target.value }
                        })}
                        placeholder="https://twitter.com/yourpage"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={editedSettings.socialMedia.linkedin || ""}
                        onChange={(e) => setEditedSettings({
                          ...editedSettings,
                          socialMedia: { ...editedSettings.socialMedia, linkedin: e.target.value }
                        })}
                        placeholder="https://linkedin.com/company/yourpage"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <ReviewsTab />
          </TabsContent>

          {/* SEO Settings Tab */}
          <TabsContent value="seo" className="space-y-6">
            <SEOSettingsTab 
              seoSettings={seoSettings}
              updateSEOSettings={updateSEOSettings}
            />
          </TabsContent>

          {/* Payment Gateway Settings Tab */}
          <TabsContent value="payment" className="space-y-6">
            <PaymentSettingsTab 
              paymentGateway={paymentGateway}
              updatePaymentGateway={updatePaymentGateway}
            />
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <PricingRuleDialog
          open={pricingDialogOpen}
          onOpenChange={setPricingDialogOpen}
          onSave={handleSavePricingRule}
          editingRule={editingRule}
        />

        <FAQDialog
          open={faqDialogOpen}
          onOpenChange={setFaqDialogOpen}
          onSave={handleSaveFAQ}
          editingFAQ={editingFAQ}
        />

        <UserDialog
          open={userDialogOpen}
          onOpenChange={setUserDialogOpen}
          onSave={handleSaveUser}
          editingUser={editingUser}
        />

        <StaffDialog
          open={staffDialogOpen}
          onOpenChange={setStaffDialogOpen}
          staff={editingStaff}
          onSave={handleSaveStaff}
        />
      </div>
    </div>
  );
}
