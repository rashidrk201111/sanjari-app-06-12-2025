import { Button } from "./ui/button";
import { ArrowRight, Star, Package, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContextSupabase";
import { useAdmin } from "../context/AdminContext";

export function Hero() {
  const { isAuthenticated, user } = useAuth();
  const { pageContent } = useAdmin();
  const { hero } = pageContent;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {isAuthenticated && user ? (
              /* Logged-in User Welcome */
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">Welcome back, {user.name}!</span>
              </div>
            ) : (
              /* Default Badge */
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">Trusted by 10,000+ businesses</span>
              </div>
            )}

            <h1 className="text-4xl lg:text-6xl">
              {isAuthenticated && user 
                ? "Ready to Print Your Next Project?"
                : hero.title
              }
            </h1>

            <p className="text-lg text-gray-600">
              {isAuthenticated && user
                ? "Continue exploring our wide range of printing services or check your order status from your dashboard."
                : hero.subtitle
              }
            </p>

            {isAuthenticated && user ? (
              /* Logged-in User Buttons */
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard?tab=profile">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    <User className="mr-2 h-5 w-5" />
                    My Dashboard
                  </Button>
                </Link>
                <Link to="/dashboard?tab=orders">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Package className="mr-2 h-5 w-5" />
                    My Orders
                  </Button>
                </Link>
              </div>
            ) : (
              /* Default Buttons */
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                  onClick={() => window.location.href = '/#/all-products'}
                >
                  {hero.ctaText || "Start Your Order"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => window.location.href = '/#/all-products'}
                >
                  View Products
                </Button>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl text-blue-600">500K+</div>
                <div className="text-sm text-gray-600">Orders Delivered</div>
              </div>
              <div>
                <div className="text-3xl text-blue-600">24hrs</div>
                <div className="text-sm text-gray-600">Fast Turnaround</div>
              </div>
              <div>
                <div className="text-3xl text-blue-600">4.9★</div>
                <div className="text-sm text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1656784095237-3fcb8f5971b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMHByZXNzJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzYwNzg5NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Printing Press"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Free Shipping</div>
                  <div>On orders above ₹500</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
