import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isActive: boolean;
  joinedDate: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "manager" | "staff" | "support";
  department?: string;
  isActive: boolean;
  joinedDate: string;
  lastLogin?: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: any[];
  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
  deliveryAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

interface SiteSettings {
  siteName: string;
  logo: string;
  email: string;
  phone: string;
  phone2?: string;
  address: string;
  footerAbout: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

export interface Review {
  id: string;
  name: string;
  email?: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  date: string;
  isApproved: boolean;
  isDefault: boolean;
  productReviewed?: string;
}

export interface PageContent {
  hero: HeroContent;
  faqs: FAQ[];
  features: Feature[];
  testimonials: Testimonial[];
  aboutPage: {
    title: string;
    subtitle: string;
    description: string;
    mission: string;
    vision: string;
  };
}

export interface PricingRule {
  id: string;
  category: string;
  subcategory: string;
  basePrice: number;
  paperTypes: {
    name: string;
    priceModifier: number;
  }[];
  bindingTypes?: {
    name: string;
    price: number;
  }[];
  quantityDiscounts: {
    minQty: number;
    discount: number;
  }[];
}

export interface SEOSettings {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  ogImage?: string;
  twitterHandle?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  sitemap: boolean;
  robotsTxt: string;
  // Advanced Meta Tags
  author?: string;
  viewport?: string;
  themeColor?: string;
  canonicalUrl?: string;
  alternateLanguages?: { lang: string; url: string }[];
  customMetaTags?: { name: string; content: string }[];
  // Additional Open Graph
  ogType?: string;
  ogSiteName?: string;
  ogLocale?: string;
  // Schema.org structured data
  organizationSchema?: string;
  // Advanced SEO
  noIndexPages?: string[];
  preconnectUrls?: string[];
}

export interface PaymentGateway {
  razorpay: {
    enabled: boolean;
    keyId: string;
    keySecret: string;
    testMode: boolean;
  };
  phonepe: {
    enabled: boolean;
    merchantId: string;
    saltKey: string;
    saltIndex: string;
    testMode: boolean;
  };
  codEnabled: boolean;
}

interface AdminContextType {
  admin: Admin | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  pricingRules: PricingRule[];
  updatePricingRule: (rule: PricingRule) => Promise<void>;
  addPricingRule: (rule: PricingRule) => Promise<void>;
  deletePricingRule: (id: string) => Promise<void>;
  users: AdminUser[];
  addUser: (user: AdminUser) => void;
  updateUser: (user: AdminUser) => void;
  deleteUser: (id: string) => void;
  staff: Staff[];
  addStaff: (staff: Staff & { password?: string }) => Promise<{ success: boolean; error?: string }>;
  updateStaff: (staff: Staff & { password?: string }) => Promise<{ success: boolean; error?: string }>;
  deleteStaff: (id: string) => Promise<{ success: boolean; error?: string }>;
  orders: AdminOrder[];
  updateOrderStatus: (orderNumber: string, status: string) => Promise<void>;
  pageContent: PageContent;
  updateHeroContent: (hero: HeroContent) => Promise<void>;
  updateAboutContent: (about: Partial<PageContent['aboutPage']>) => Promise<void>;
  addFAQ: (faq: FAQ) => Promise<void>;
  updateFAQ: (faq: FAQ) => Promise<void>;
  deleteFAQ: (id: string) => Promise<void>;
  addFeature: (feature: Feature) => Promise<void>;
  updateFeature: (feature: Feature) => Promise<void>;
  deleteFeature: (id: string) => Promise<void>;
  addTestimonial: (testimonial: Testimonial) => Promise<void>;
  updateTestimonial: (testimonial: Testimonial) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  reviews: Review[];
  addReview: (review: Review) => Promise<void>;
  updateReview: (review: Review) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  approveReview: (id: string) => Promise<void>;
  seoSettings: SEOSettings;
  updateSEOSettings: (settings: Partial<SEOSettings>) => Promise<void>;
  paymentGateway: PaymentGateway;
  updatePaymentGateway: (settings: Partial<PaymentGateway>) => Promise<void>;
  loadingData: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Default values for initial state
const defaultSiteSettings: SiteSettings = {
  siteName: "Sanjari prints",
  logo: "/logo.png",
  email: "sanjariprint@gmail.com",
  phone: "+91 7350001266",
  phone2: "+91 9323684301",
  address: "Mumbai, Maharashtra, India",
  footerAbout: "Professional printing services with fast turnaround times. We deliver quality prints for all your business needs.",
  socialMedia: {
    facebook: "https://facebook.com/sanjariprints",
    instagram: "https://instagram.com/sanjariprints",
    twitter: "https://twitter.com/sanjariprints",
  }
};

const defaultPageContent: PageContent = {
  hero: {
    title: "Professional Printing Services",
    subtitle: "Quality prints delivered to your doorstep. Fast turnaround, competitive prices.",
    ctaText: "Get Started",
    ctaLink: "#/all-products",
    backgroundImage: "",
  },
  faqs: [],
  features: [],
  testimonials: [],
  aboutPage: {
    title: "About Sanjari Prints",
    subtitle: "Your Trusted Printing Partner Since 2010",
    description: "Sanjari Prints is a leading printing service provider based in Mumbai, offering comprehensive printing solutions for businesses, students, and individuals.",
    mission: "To provide high-quality, affordable printing services with exceptional customer support and fast turnaround times.",
    vision: "To become India's most trusted and innovative printing service provider, setting new standards in quality and customer satisfaction.",
  },
};

const defaultSEOSettings: SEOSettings = {
  defaultTitle: "Sanjari Prints - Professional Printing Services in India",
  defaultDescription: "Professional printing services with fast turnaround times. Documents, books, visiting cards, posters, and more. Quality prints delivered across India.",
  defaultKeywords: "printing services, online printing, business cards, document printing, book printing, poster printing, India",
  ogImage: "",
  twitterHandle: "@sanjariprints",
  googleAnalyticsId: "",
  googleTagManagerId: "",
  facebookPixelId: "",
  sitemap: true,
  robotsTxt: `User-agent: *
Allow: /
Disallow: /admin
Disallow: /checkout
Sitemap: https://sanjariprints.com/sitemap.xml`,
  author: "Sanjari Prints",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#2563eb",
  canonicalUrl: "",
  alternateLanguages: [],
  customMetaTags: [],
  ogType: "website",
  ogSiteName: "Sanjari Prints",
  ogLocale: "en_IN",
  organizationSchema: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sanjari Prints",
    "description": "Professional printing services",
    "telephone": "+91 7350001266",
    "email": "sanjariprint@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra"
    }
  }, null, 2),
  noIndexPages: ["/admin", "/checkout"],
  preconnectUrls: ["https://www.googletagmanager.com", "https://www.google-analytics.com"],
};

const defaultPaymentGateway: PaymentGateway = {
  razorpay: {
    enabled: false,
    keyId: "",
    keySecret: "",
    testMode: true,
  },
  phonepe: {
    enabled: false,
    merchantId: "",
    saltKey: "",
    saltIndex: "1",
    testMode: true,
  },
  codEnabled: true,
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [pageContent, setPageContent] = useState<PageContent>(defaultPageContent);
  const [seoSettings, setSEOSettings] = useState<SEOSettings>(defaultSEOSettings);
  const [paymentGateway, setPaymentGateway] = useState<PaymentGateway>(defaultPaymentGateway);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Load all data from Supabase on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoadingData(true);

      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Get user profile to check if admin
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userData && (userData.role === 'admin' || userData.role === 'staff')) {
          setAdmin({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
          });
          setIsAdminAuthenticated(true);
        }
      }

      // Load pricing rules
      await loadPricingRules();

      // Load users
      await loadUsers();

      // Load staff
      await loadStaff();

      // Load orders
      await loadOrders();

      // Load FAQs
      await loadFAQs();

      // Load reviews
      await loadReviews();

      // Load SEO settings
      await loadSEOSettings();

      // Load payment gateway settings
      await loadPaymentSettings();

      // Load site settings and page content from content_pages
      await loadContentPages();

    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const loadPricingRules = async () => {
    const { data, error } = await supabase
      .from('pricing_rules')
      .select('*');

    if (error) {
      console.error("Error loading pricing rules:", error);
      return;
    }

    if (data && data.length > 0) {
      const formattedRules = data.map((rule: any) => ({
        id: rule.id,
        category: rule.category,
        subcategory: rule.subcategory,
        ...rule.rules
      }));
      setPricingRules(formattedRules);
    }
  };

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'user');

    if (error) {
      console.error("Error loading users:", error);
      return;
    }

    if (data) {
      const formattedUsers = data.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isActive: true,
        joinedDate: user.created_at?.split('T')[0] || '',
      }));
      setUsers(formattedUsers);
    }
  };

  const loadStaff = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .in('role', ['admin', 'staff']);

    if (error) {
      console.error("Error loading staff:", error);
      return;
    }

    if (data) {
      const formattedStaff = data.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role as "admin" | "staff",
        department: "operations",
        isActive: true,
        joinedDate: user.created_at?.split('T')[0] || '',
      }));
      setStaff(formattedStaff);
    }
  };

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error loading orders:", error);
      return;
    }

    if (data) {
      const formattedOrders = data.map((order: any) => ({
        id: order.id,
        orderNumber: order.order_number,
        date: order.created_at?.split('T')[0] || '',
        status: order.status,
        items: order.items || [],
        subtotal: order.total_amount * 0.82, // Rough calculation
        gst: order.total_amount * 0.18,
        shipping: 0,
        total: order.total_amount,
        deliveryAddress: order.shipping_address || {},
        paymentMethod: order.payment_method,
        trackingNumber: '',
        estimatedDelivery: '',
      }));
      setOrders(formattedOrders);
    }
  };

  const loadFAQs = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error("Error loading FAQs:", error);
      return;
    }

    if (data) {
      const formattedFAQs = data.map((faq: any) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
      }));
      setPageContent(prev => ({ ...prev, faqs: formattedFAQs }));
    }
  };

  const loadReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error loading reviews:", error);
      return;
    }

    if (data) {
      const formattedReviews = data.map((review: any) => ({
        id: review.id,
        name: review.user_name,
        email: review.user_email,
        content: review.review_text,
        rating: review.rating,
        date: review.created_at?.split('T')[0] || '',
        isApproved: review.status === 'approved',
        isDefault: false,
      }));
      setReviews(formattedReviews);
    }
  };

  const loadSEOSettings = async () => {
    const { data, error } = await supabase
      .from('seo_settings')
      .select('*')
      .eq('page_path', '/')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error("Error loading SEO settings:", error);
      return;
    }

    if (data) {
      setSEOSettings(prev => ({
        ...prev,
        defaultTitle: data.title || prev.defaultTitle,
        defaultDescription: data.description || prev.defaultDescription,
        defaultKeywords: data.keywords || prev.defaultKeywords,
        ogImage: data.og_image || prev.ogImage,
      }));
    }
  };

  const loadPaymentSettings = async () => {
    const { data, error } = await supabase
      .from('payment_settings')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error("Error loading payment settings:", error);
      return;
    }

    if (data) {
      setPaymentGateway({
        razorpay: {
          enabled: data.razorpay_enabled || false,
          keyId: data.razorpay_key_id || '',
          keySecret: data.razorpay_key_secret || '',
          testMode: true,
        },
        phonepe: {
          enabled: data.phonepe_enabled || false,
          merchantId: data.phonepe_merchant_id || '',
          saltKey: data.phonepe_salt_key || '',
          saltIndex: data.phonepe_salt_index || '1',
          testMode: true,
        },
        codEnabled: true,
      });
    }
  };

  const loadContentPages = async () => {
    const { data, error } = await supabase
      .from('content_pages')
      .select('*');

    if (error) {
      console.error("Error loading content pages:", error);
      return;
    }

    if (data && data.length > 0) {
      data.forEach((page: any) => {
        try {
          const content = JSON.parse(page.content);
          
          if (page.page_type === 'hero') {
            setPageContent(prev => ({ ...prev, hero: content }));
          } else if (page.page_type === 'features') {
            setPageContent(prev => ({ ...prev, features: content }));
          } else if (page.page_type === 'testimonials') {
            setPageContent(prev => ({ ...prev, testimonials: content }));
          } else if (page.page_type === 'about') {
            setPageContent(prev => ({ ...prev, aboutPage: content }));
          } else if (page.page_type === 'site_settings') {
            setSiteSettings(content);
          }
        } catch (e) {
          console.error("Error parsing content:", e);
        }
      });
    }
  };

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        // Check if user is admin or staff
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userData && (userData.role === 'admin' || userData.role === 'staff')) {
          setAdmin({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
          });
          setIsAdminAuthenticated(true);
          toast.success("Admin login successful!");
          
          // Reload all data after login
          await loadAllData();
          return true;
        } else {
          await supabase.auth.signOut();
          toast.error("Access denied. Admin privileges required.");
          return false;
        }
      }

      return false;
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed");
      return false;
    }
  };

  const adminLogout = async () => {
    await supabase.auth.signOut();
    setAdmin(null);
    setIsAdminAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const updateSiteSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...newSettings };
    setSiteSettings(updated);

    // Save to content_pages table
    const { error } = await supabase
      .from('content_pages')
      .upsert({
        page_type: 'site_settings',
        title: 'Site Settings',
        content: JSON.stringify(updated),
      }, {
        onConflict: 'page_type'
      });

    if (error) {
      console.error("Error saving site settings:", error);
      toast.error("Failed to save site settings");
    } else {
      toast.success("Site settings updated!");
    }
  };

  const updatePricingRule = async (rule: PricingRule) => {
    const { id, category, subcategory, ...rules } = rule;
    
    const { error } = await supabase
      .from('pricing_rules')
      .update({
        category,
        subcategory,
        rules,
      })
      .eq('id', id);

    if (error) {
      console.error("Error updating pricing rule:", error);
      toast.error("Failed to update pricing rule");
      return;
    }

    const updated = pricingRules.map(r => r.id === rule.id ? rule : r);
    setPricingRules(updated);
    toast.success("Pricing rule updated!");
  };

  const addPricingRule = async (rule: PricingRule) => {
    const { id, category, subcategory, ...rules } = rule;
    
    const { data, error } = await supabase
      .from('pricing_rules')
      .insert({
        category,
        subcategory,
        rules,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding pricing rule:", error);
      toast.error("Failed to add pricing rule");
      return;
    }

    if (data) {
      const newRule = {
        id: data.id,
        category: data.category,
        subcategory: data.subcategory,
        ...data.rules
      };
      setPricingRules([...pricingRules, newRule]);
      toast.success("Pricing rule added!");
    }
  };

  const deletePricingRule = async (id: string) => {
    const { error } = await supabase
      .from('pricing_rules')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting pricing rule:", error);
      toast.error("Failed to delete pricing rule");
      return;
    }

    const updated = pricingRules.filter(r => r.id !== id);
    setPricingRules(updated);
    toast.success("Pricing rule deleted!");
  };

  const updateOrderStatus = async (orderNumber: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('order_number', orderNumber);

    if (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
      return;
    }

    const updated = orders.map(order => 
      order.orderNumber === orderNumber 
        ? { ...order, status: newStatus as AdminOrder["status"] }
        : order
    );
    setOrders(updated);
    toast.success("Order status updated!");
  };

  // Content Management Functions
  const updateHeroContent = async (hero: HeroContent) => {
    const updated = { ...pageContent, hero };
    setPageContent(updated);

    const { error } = await supabase
      .from('content_pages')
      .upsert({
        page_type: 'hero',
        title: 'Hero Section',
        content: JSON.stringify(hero),
      }, {
        onConflict: 'page_type'
      });

    if (error) {
      console.error("Error saving hero content:", error);
      toast.error("Failed to save hero content");
    } else {
      toast.success("Hero content updated!");
    }
  };

  const updateAboutContent = async (about: Partial<PageContent['aboutPage']>) => {
    const updatedAbout = { ...pageContent.aboutPage, ...about };
    const updated = { 
      ...pageContent, 
      aboutPage: updatedAbout
    };
    setPageContent(updated);

    const { error } = await supabase
      .from('content_pages')
      .upsert({
        page_type: 'about',
        title: 'About Page',
        content: JSON.stringify(updatedAbout),
      }, {
        onConflict: 'page_type'
      });

    if (error) {
      console.error("Error saving about content:", error);
      toast.error("Failed to save about content");
    } else {
      toast.success("About content updated!");
    }
  };

  const addFAQ = async (faq: FAQ) => {
    const { data, error } = await supabase
      .from('faqs')
      .insert({
        question: faq.question,
        answer: faq.answer,
        category: faq.category || 'General',
        order_index: pageContent.faqs.length,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding FAQ:", error);
      toast.error("Failed to add FAQ");
      return;
    }

    if (data) {
      const newFAQ = {
        id: data.id,
        question: data.question,
        answer: data.answer,
        category: data.category,
      };
      setPageContent({ 
        ...pageContent, 
        faqs: [...pageContent.faqs, newFAQ] 
      });
      toast.success("FAQ added!");
    }
  };

  const updateFAQ = async (faq: FAQ) => {
    const { error } = await supabase
      .from('faqs')
      .update({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
      })
      .eq('id', faq.id);

    if (error) {
      console.error("Error updating FAQ:", error);
      toast.error("Failed to update FAQ");
      return;
    }

    const updated = { 
      ...pageContent, 
      faqs: pageContent.faqs.map(f => f.id === faq.id ? faq : f) 
    };
    setPageContent(updated);
    toast.success("FAQ updated!");
  };

  const deleteFAQ = async (id: string) => {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete FAQ");
      return;
    }

    const updated = { 
      ...pageContent, 
      faqs: pageContent.faqs.filter(f => f.id !== id) 
    };
    setPageContent(updated);
    toast.success("FAQ deleted!");
  };

  const addFeature = async (feature: Feature) => {
    const updated = { 
      ...pageContent, 
      features: [...pageContent.features, feature] 
    };
    setPageContent(updated);

    const { error } = await supabase
      .from('content_pages')
      .upsert({
        page_type: 'features',
        title: 'Features',
        content: JSON.stringify(updated.features),
      }, {
        onConflict: 'page_type'
      });

    if (error) {
      console.error("Error saving features:", error);
      toast.error("Failed to add feature");
    } else {
      toast.success("Feature added!");
    }
  };

  const updateFeature = async (feature: Feature) => {
    const updated = { 
      ...pageContent, 
      features: pageContent.features.map(f => f.id === feature.id ? feature : f) 
    };
    setPageContent(updated);

    const { error } = await supabase
      .from('content_pages')
      .upsert({
        page_type: 'features',
        title: 'Features',
        content: JSON.stringify(updated.features),
      }, {
        onConflict: 'page_type'
      });

    if (error) {
      console.error("Error saving features:", error);
      toast.error("Failed to update feature");
    } else {
      toast.success("Feature updated!");
    }
  };

  const deleteFeature = async (id: string) => {
    const updated = { 
      ...pageContent, 
      features: pageContent.features.filter(f => f.id !== id) 
    };
    setPageContent(updated);

    const { error } = await supabase
      .from('content_pages')
      .upsert({
        page_type: 'features',
        title: 'Features',
        content: JSON.stringify(updated.features),
      }, {
        onConflict: 'page_type'
      });

    if (error) {
      console.error("Error saving features:", error);
      toast.error("Failed to delete feature");
    } else {
      toast.success("Feature deleted!");
    }
  };

  const addTestimonial = async (testimonial: Testimonial) => {
    const updated = { 
      ...pageContent, 
      testimonials: [...pageContent.testimonials, testimonial] 
    };
    setPageContent(updated);

    const { error } = await supabase
      .from('content_pages')
      .upsert({
        page_type: 'testimonials',
        title: 'Testimonials',
        content: JSON.stringify(updated.testimonials),
      }, {
        onConflict: 'page_type'
      });

    if (error) {
      console.error("Error saving testimonials:", error);
      toast.error("Failed to add testimonial");
    } else {
      toast.success("Testimonial added!");
    }
  };

  const updateTestimonial = async (testimonial: Testimonial) => {
    const updated = { 
      ...pageContent, 
      testimonials: pageContent.testimonials.map(t => t.id === testimonial.id ? testimonial : t) 
    };
    setPageContent(updated);

    const { error } = await supabase
      .from('content_pages')
      .upsert({
        page_type: 'testimonials',
        title: 'Testimonials',
        content: JSON.stringify(updated.testimonials),
      }, {
        onConflict: 'page_type'
      });

    if (error) {
      console.error("Error saving testimonials:", error);
      toast.error("Failed to update testimonial");
    } else {
      toast.success("Testimonial updated!");
    }
  };

  const deleteTestimonial = async (id: string) => {
    const updated = { 
      ...pageContent, 
      testimonials: pageContent.testimonials.filter(t => t.id !== id) 
    };
    setPageContent(updated);

    const { error } = await supabase
      .from('content_pages')
      .upsert({
        page_type: 'testimonials',
        title: 'Testimonials',
        content: JSON.stringify(updated.testimonials),
      }, {
        onConflict: 'page_type'
      });

    if (error) {
      console.error("Error saving testimonials:", error);
      toast.error("Failed to delete testimonial");
    } else {
      toast.success("Testimonial deleted!");
    }
  };

  // User Management Functions (kept simple as before)
  const addUser = (user: AdminUser) => {
    setUsers([...users, user]);
  };

  const updateUser = (user: AdminUser) => {
    setUsers(users.map(u => u.id === user.id ? user : u));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // Staff Management Functions with Supabase Integration
  const addStaff = async (staffMember: Staff & { password?: string }) => {
    try {
      const password = (staffMember as any).password;
      
      if (!password) {
        toast.error("Password is required for new staff members");
        return { success: false, error: "Password is required" };
      }

      // Show loading toast
      const loadingToast = toast.loading("Creating staff account...");

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: staffMember.email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            name: staffMember.name,
            phone: staffMember.phone || '',
            role: staffMember.role,
          }
        }
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (authError) {
        console.error("Auth signup error:", authError);
        
        // Check for rate limiting error
        if (authError.message.includes("21 seconds") || authError.message.includes("security purposes")) {
          toast.error("⏱️ Rate limit reached! Please wait 30 seconds before creating another staff account.", {
            duration: 8000,
          });
          return { success: false, error: "RATE_LIMIT: Please wait 30 seconds before creating another staff account" };
        }
        
        toast.error(`Failed to create auth user: ${authError.message}`);
        return { success: false, error: authError.message };
      }

      if (!authData.user) {
        toast.error("Failed to create user");
        return { success: false, error: "No user returned from auth" };
      }

      // Map staff role to database role
      let dbRole: 'admin' | 'staff' | 'user' = 'staff';
      if (staffMember.role === 'admin' || staffMember.role === 'manager') {
        dbRole = 'admin';
      } else {
        dbRole = 'staff';
      }

      // Insert into users table
      const { error: dbError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: staffMember.email,
          name: staffMember.name,
          phone: staffMember.phone || '',
          role: dbRole,
          email_verified: false,
        });

      if (dbError) {
        console.error("Database insert error:", dbError);
        toast.error(`Failed to create user profile: ${dbError.message}`);
        return { success: false, error: dbError.message };
      }

      // Reload staff list
      await loadStaff();

      toast.success("Staff member created successfully! They can now login.");
      return { success: true };
    } catch (error: any) {
      console.error("Error adding staff:", error);
      toast.error(`Failed to add staff: ${error.message}`);
      return { success: false, error: error.message };
    }
  };

  const updateStaff = async (staffMember: Staff & { password?: string }) => {
    try {
      const password = (staffMember as any).password;

      // Map staff role to database role
      let dbRole: 'admin' | 'staff' | 'user' = 'staff';
      if (staffMember.role === 'admin' || staffMember.role === 'manager') {
        dbRole = 'admin';
      } else {
        dbRole = 'staff';
      }

      // Update in users table
      const { error: dbError } = await supabase
        .from('users')
        .update({
          name: staffMember.name,
          phone: staffMember.phone || '',
          role: dbRole,
        })
        .eq('id', staffMember.id);

      if (dbError) {
        console.error("Database update error:", dbError);
        toast.error(`Failed to update staff: ${dbError.message}`);
        return { success: false, error: dbError.message };
      }

      // If password is provided, update it
      if (password && password.length >= 6) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: password
        });

        if (passwordError) {
          console.error("Password update error:", passwordError);
          toast.error(`Profile updated but password change failed: ${passwordError.message}`);
        } else {
          toast.success("Staff updated with new password!");
        }
      } else {
        toast.success("Staff updated successfully!");
      }

      // Reload staff list
      await loadStaff();

      return { success: true };
    } catch (error: any) {
      console.error("Error updating staff:", error);
      toast.error(`Failed to update staff: ${error.message}`);
      return { success: false, error: error.message };
    }
  };

  const deleteStaff = async (id: string) => {
    try {
      // Delete from users table
      const { error: dbError } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (dbError) {
        console.error("Database delete error:", dbError);
        toast.error(`Failed to delete staff: ${dbError.message}`);
        return { success: false, error: dbError.message };
      }

      // Reload staff list
      await loadStaff();

      toast.success("Staff member removed successfully!");
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting staff:", error);
      toast.error(`Failed to delete staff: ${error.message}`);
      return { success: false, error: error.message };
    }
  };

  // SEO Settings Management
  const updateSEOSettings = async (newSettings: Partial<SEOSettings>) => {
    const updated = { ...seoSettings, ...newSettings };
    setSEOSettings(updated);

    const { error } = await supabase
      .from('seo_settings')
      .upsert({
        page_path: '/',
        title: updated.defaultTitle,
        description: updated.defaultDescription,
        keywords: updated.defaultKeywords,
        og_image: updated.ogImage || '',
      }, {
        onConflict: 'page_path'
      });

    if (error) {
      console.error("Error saving SEO settings:", error);
      toast.error("Failed to save SEO settings");
    } else {
      toast.success("SEO settings updated!");
    }
  };

  // Payment Gateway Settings Management
  const updatePaymentGateway = async (newSettings: Partial<PaymentGateway>) => {
    const updated = { ...paymentGateway, ...newSettings };
    setPaymentGateway(updated);

    const { error } = await supabase
      .from('payment_settings')
      .upsert({
        razorpay_enabled: updated.razorpay.enabled,
        razorpay_key_id: updated.razorpay.keyId,
        razorpay_key_secret: updated.razorpay.keySecret,
        phonepe_enabled: updated.phonepe.enabled,
        phonepe_merchant_id: updated.phonepe.merchantId,
        phonepe_salt_key: updated.phonepe.saltKey,
        phonepe_salt_index: updated.phonepe.saltIndex,
      });

    if (error) {
      console.error("Error saving payment settings:", error);
      toast.error("Failed to save payment settings");
    } else {
      toast.success("Payment settings updated!");
    }
  };

  // Review Management
  const addReview = async (review: Review) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        user_name: review.name,
        user_email: review.email || '',
        review_text: review.content,
        rating: review.rating,
        status: review.isApproved ? 'approved' : 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review");
      return;
    }

    if (data) {
      await loadReviews();
      toast.success("Review added!");
    }
  };

  const updateReview = async (review: Review) => {
    const { error } = await supabase
      .from('reviews')
      .update({
        user_name: review.name,
        user_email: review.email || '',
        review_text: review.content,
        rating: review.rating,
        status: review.isApproved ? 'approved' : 'pending',
      })
      .eq('id', review.id);

    if (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review");
      return;
    }

    await loadReviews();
    toast.success("Review updated!");
  };

  const deleteReview = async (id: string) => {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
      return;
    }

    await loadReviews();
    toast.success("Review deleted!");
  };

  const approveReview = async (id: string) => {
    const { error } = await supabase
      .from('reviews')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) {
      console.error("Error approving review:", error);
      toast.error("Failed to approve review");
      return;
    }

    await loadReviews();
    toast.success("Review approved!");
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        isAdminAuthenticated,
        adminLogin,
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
        addFeature,
        updateFeature,
        deleteFeature,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        approveReview,
        seoSettings,
        updateSEOSettings,
        paymentGateway,
        updatePaymentGateway,
        loadingData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
