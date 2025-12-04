import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedDate: string;
}

export interface Order {
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

interface AuthContextType {
  user: User | null;
  orders: Order[];
  login: (email: string, name: string, phone?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addOrder: (order: Order) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load user and orders from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("sanjari_user");
    const savedOrders = localStorage.getItem("sanjari_orders");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("sanjari_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("sanjari_user");
    }
  }, [user]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("sanjari_orders", JSON.stringify(orders));
    }
  }, [orders]);

  const login = (email: string, name: string, phone?: string) => {
    // Check if user already exists in localStorage
    const savedUser = localStorage.getItem("sanjari_user");
    let existingUser: User | null = null;
    
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.email === email) {
        existingUser = parsed;
      }
    }

    // Use existing user data or create new user
    const newUser: User = existingUser || {
      id: "user_" + Date.now(),
      name,
      email,
      phone: phone || "",
      joinedDate: new Date().toISOString(),
    };

    // Update name and phone if provided
    if (existingUser) {
      newUser.name = name;
      if (phone) {
        newUser.phone = phone;
      }
    }

    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sanjari_user");
    // Don't clear orders - keep order history even after logout
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        login,
        logout,
        updateProfile,
        addOrder,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
