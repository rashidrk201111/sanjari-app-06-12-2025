import * as LucideIcons from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export function Features() {
  const { pageContent, siteSettings } = useAdmin();
  const { features } = pageContent;

  // Fallback features if admin hasn't set any yet
  const displayFeatures = features.length > 0 ? features : [
    {
      id: "1",
      icon: "Palette",
      title: "Premium Quality",
      description: "High-resolution printing with vibrant colors and crisp details",
    },
    {
      id: "2",
      icon: "Clock",
      title: "Fast Turnaround",
      description: "Quick production and delivery without compromising quality",
    },
    {
      id: "3",
      icon: "Truck",
      title: "Free Shipping",
      description: "Free delivery on orders above ₹500 across the country",
    },
    {
      id: "4",
      icon: "CheckCircle",
      title: "Easy Ordering",
      description: "Simple online ordering process with instant price quotes",
    },
    {
      id: "5",
      icon: "Shield",
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee or we'll reprint for free",
    },
    {
      id: "6",
      icon: "Users",
      title: "Expert Support",
      description: "Dedicated customer support team to help with your orders",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4">Why Choose {siteSettings.siteName}?</h2>
          <p className="text-lg text-gray-600">
            We're committed to delivering the best printing experience with unmatched quality and service
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayFeatures.map((feature) => {
            // Dynamically get the icon component from lucide-react
            const Icon = (LucideIcons as any)[feature.icon] || LucideIcons.Star;
            return (
              <div key={feature.id} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
