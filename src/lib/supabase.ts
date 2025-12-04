import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hgxhdmcqrcsjsxuaeyrl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhneGhkbWNxcmNzanN4dWFleXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MDQxNzYsImV4cCI6MjA3NjQ4MDE3Nn0.2k8Q0_MRLVVeLq557zupHKWWgsSQn55TwNAw-g6vscc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string;
          role: 'user' | 'admin' | 'staff';
          email_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          category: string;
          subcategory: string;
          name: string;
          description: string;
          base_price: number;
          image_url: string;
          specifications: any;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          order_number: string;
          items: any;
          total_amount: number;
          status: 'pending' | 'processing' | 'completed' | 'cancelled';
          shipping_address: any;
          payment_method: string;
          payment_status: 'pending' | 'completed' | 'failed';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      pricing_rules: {
        Row: {
          id: string;
          category: string;
          subcategory: string;
          rules: any;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['pricing_rules']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['pricing_rules']['Insert']>;
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['faqs']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['faqs']['Insert']>;
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          user_name: string;
          user_email: string;
          rating: number;
          review_text: string;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };
      seo_settings: {
        Row: {
          id: string;
          page_path: string;
          title: string;
          description: string;
          keywords: string;
          og_image: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['seo_settings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['seo_settings']['Insert']>;
      };
      payment_settings: {
        Row: {
          id: string;
          razorpay_key_id: string;
          razorpay_key_secret: string;
          phonepe_merchant_id: string;
          phonepe_salt_key: string;
          phonepe_salt_index: string;
          razorpay_enabled: boolean;
          phonepe_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['payment_settings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['payment_settings']['Insert']>;
      };
      content_pages: {
        Row: {
          id: string;
          page_type: string;
          title: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['content_pages']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['content_pages']['Insert']>;
      };
    };
  };
}
