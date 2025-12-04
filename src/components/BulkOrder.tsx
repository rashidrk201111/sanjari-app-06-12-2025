import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Package, TrendingDown, Clock, Headphones } from "lucide-react";

export function BulkOrder() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4">Bulk Order Solutions</h2>
          <p className="text-lg text-gray-600">
            Special pricing and dedicated support for large volume orders
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Benefits */}
          <div>
            <h3 className="text-2xl mb-6">Why Order in Bulk?</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingDown className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg mb-2">Significant Cost Savings</h4>
                  <p className="text-gray-600">
                    Get up to 40% discount on bulk orders. The more you order, the more you save.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg mb-2">Priority Processing</h4>
                  <p className="text-gray-600">
                    Your bulk orders are prioritized in our production queue for faster turnaround.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Headphones className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg mb-2">Dedicated Account Manager</h4>
                  <p className="text-gray-600">
                    Get a dedicated account manager to handle all your printing needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg mb-2">Flexible Payment Terms</h4>
                  <p className="text-gray-600">
                    We offer flexible payment options and credit terms for regular bulk customers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-8">
              <h3 className="text-2xl mb-6">Request Bulk Order Quote</h3>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Your company name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-name">Contact Name</Label>
                  <Input id="contact-name" placeholder="Your name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-type">Product Type</Label>
                  <Input id="product-type" placeholder="e.g., Business cards, Brochures" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Estimated Quantity</Label>
                  <Input id="quantity" type="number" placeholder="e.g., 10000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Project Details</Label>
                  <Textarea
                    id="details"
                    placeholder="Tell us about your project requirements..."
                    rows={4}
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Submit Request
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl text-center mb-8">Bulk Order Pricing Tiers</h3>
          <div className="grid sm:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl mb-2">500+</div>
              <div className="text-sm text-gray-600 mb-4">Units</div>
              <div className="text-2xl text-blue-600">10%</div>
              <div className="text-sm text-gray-600">Discount</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl mb-2">1,000+</div>
              <div className="text-sm text-gray-600 mb-4">Units</div>
              <div className="text-2xl text-blue-600">20%</div>
              <div className="text-sm text-gray-600">Discount</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl mb-2">5,000+</div>
              <div className="text-sm text-gray-600 mb-4">Units</div>
              <div className="text-2xl text-blue-600">30%</div>
              <div className="text-sm text-gray-600">Discount</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl mb-2">10,000+</div>
              <div className="text-sm text-gray-600 mb-4">Units</div>
              <div className="text-2xl text-blue-600">40%</div>
              <div className="text-sm text-gray-600">Discount</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
