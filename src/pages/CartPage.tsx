import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, IndianRupee, ArrowRight } from "lucide-react";
import { Input } from "../components/ui/input";

export function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to get started
          </p>
          <Button onClick={() => navigate("/all-products")} size="lg">
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const gst = Math.round(subtotal * 0.18);
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + gst + shipping;

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{items.length} item(s) in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex gap-4">
                  {/* Product Image Placeholder */}
                  <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900 mb-2">{item.productName}</h3>
                    
                    {/* Configuration Details */}
                    <div className="space-y-1 mb-3">
                      {Object.entries(item.configuration).map(([key, value]) => {
                        if (value && value !== "none") {
                          const label = key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase());
                          return (
                            <p key={key} className="text-sm text-gray-600">
                              <span className="font-medium">{label}:</span> {value}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, Number(e.target.value))
                          }
                          className="w-16 h-8 text-center p-0"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center text-lg text-gray-900">
                        <IndianRupee className="w-4 h-4" />
                        {item.price * item.quantity}
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={clearCart} className="text-red-500">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl text-gray-900 mb-4">Order Summary</h2>
              <Separator className="mb-4" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900 flex items-center">
                    <IndianRupee className="w-3 h-3" />
                    {subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%):</span>
                  <span className="text-gray-900 flex items-center">
                    <IndianRupee className="w-3 h-3" />
                    {gst}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-900 flex items-center">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <>
                        <IndianRupee className="w-3 h-3" />
                        {shipping}
                      </>
                    )}
                  </span>
                </div>

                {subtotal < 500 && (
                  <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                    Add ₹{500 - subtotal} more to get free shipping!
                  </p>
                )}

                <Separator className="my-2" />

                <div className="flex justify-between">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-2xl text-blue-600 flex items-center">
                    <IndianRupee className="w-5 h-5" />
                    {total}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
                size="lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/all-products")}
                className="w-full"
              >
                Continue Shopping
              </Button>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Free shipping on orders above ₹500</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Estimated delivery: 3-5 business days</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
