import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹2,400",
    description: "Perfect for individuals and small businesses",
    features: [
      "250 Business Cards",
      "Standard Paper",
      "2-3 Day Delivery",
      "Basic Design Templates",
      "Email Support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "₹6,500",
    description: "Ideal for growing businesses",
    features: [
      "500 Business Cards",
      "Premium Paper Options",
      "1-2 Day Delivery",
      "Custom Design Support",
      "Priority Support",
      "Free Revisions",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹16,500",
    description: "For large organizations with high volume needs",
    features: [
      "1000+ Business Cards",
      "All Paper Types",
      "Same Day Delivery",
      "Dedicated Designer",
      "24/7 Phone Support",
      "Unlimited Revisions",
      "Account Manager",
    ],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">
            Choose the plan that fits your needs. All plans include our quality guarantee
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 ${
                plan.popular
                  ? "border-2 border-blue-600 shadow-xl scale-105"
                  : "border border-gray-200"
              } relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl mb-2">{plan.name}</h3>
                <div className="text-4xl mb-2">
                  {plan.price}
                  <span className="text-lg text-gray-500">/order</span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-800 hover:bg-gray-900"
                }`}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
