import { Menu, ShoppingCart, User, X, ChevronDown, LogOut, Package, UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { categories } from "../data/categories";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContextSupabase";
import { useAdmin } from "../context/AdminContext";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { siteSettings } = useAdmin();
  const cartCount = getCartCount();

  // Fetch logo from server
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
            setLogoUrl(data.logo);
          }
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();
    
    // Poll for logo updates every 10 seconds
    const interval = setInterval(fetchLogo, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-2">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={siteSettings.siteName}
                  className="h-10 w-auto object-contain max-w-[120px]"
                  onError={(e) => {
                    // Fallback to default icon if image fails to load
                    console.error("Logo failed to load, using fallback");
                    setLogoUrl("");
                  }}
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white">{siteSettings.siteName.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <span className="text-xl">{siteSettings.siteName}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Home
            </Link>

            {/* All Products Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600">
                    All Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[800px] p-4">
                      <div className="mb-4">
                        <Link to="/all-products">
                          <Button variant="outline" className="w-full">
                            View All Products
                          </Button>
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">
                        {categories.map((category) => (
                          <div key={category.slug} className="space-y-2">
                            <div className="text-sm text-gray-900 px-2 py-1">
                              {category.name}
                            </div>
                            <div className="space-y-1">
                              {category.subcategories.map((subcategory) => (
                                <Link
                                  key={subcategory.slug}
                                  to={`/product/${subcategory.slug}`}
                                  className="block px-2 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                >
                                  {subcategory.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/price-calculator"
              className={`transition-colors ${
                isActive("/price-calculator") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Price Calculator
            </Link>
            <Link
              to="/bulk-order"
              className={`transition-colors ${
                isActive("/bulk-order") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Bulk Order
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-600">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 hover:bg-gray-100">
                    <Avatar className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600">
                      <AvatarFallback className="text-white text-sm">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline text-gray-900">{user.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200 shadow-lg">
                  <DropdownMenuLabel className="bg-gray-50 px-3 py-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem 
                    onClick={() => navigate("/dashboard?tab=profile")}
                    className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50 text-gray-900 px-3 py-2"
                  >
                    <UserCircle className="mr-2 h-4 w-4 text-gray-700" />
                    <span>My Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate("/dashboard?tab=orders")}
                    className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50 text-gray-900 px-3 py-2"
                  >
                    <Package className="mr-2 h-4 w-4 text-gray-700" />
                    <span>My Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 px-3 py-2"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-red-600" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/all-products"
                className={`transition-colors ${
                  isActive("/all-products") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                to="/price-calculator"
                className={`transition-colors ${
                  isActive("/price-calculator") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Price Calculator
              </Link>
              <Link
                to="/bulk-order"
                className={`transition-colors ${
                  isActive("/bulk-order") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Bulk Order
              </Link>
              
              {/* Cart Link for Mobile */}
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <Badge className="ml-auto bg-blue-600">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600">
                        <AvatarFallback className="text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <Link to="/dashboard?tab=profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2 hover:bg-blue-50">
                        <UserCircle className="h-4 w-4" />
                        My Dashboard
                      </Button>
                    </Link>
                    <Link to="/dashboard?tab=orders" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2 hover:bg-blue-50">
                        <Package className="h-4 w-4" />
                        My Orders
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:border-red-300"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
