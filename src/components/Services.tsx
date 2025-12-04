import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { CreditCard, FileText, Image, Package, Tag } from "lucide-react";

const services = [
  {
    icon: CreditCard,
    title: "Business Cards",
    description: "Make a lasting first impression with premium business cards in various finishes.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: FileText,
    title: "Brochures & Flyers",
    description: "Eye-catching marketing materials to promote your business effectively.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Image,
    title: "Banners & Posters",
    description: "Large format printing for events, promotions, and advertising campaigns.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Package,
    title: "Packaging",
    description: "Custom packaging solutions that make your products stand out on the shelf.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Tag,
    title: "Labels & Stickers",
    description: "High-quality labels and stickers for products, branding, and promotions.",
    color: "bg-yellow-100 text-yellow-600",
  },
];

export function Services() {
  const handleCardClick = () => {
    window.location.href = '/#/all-products';
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4">Our Printing Services</h2>
          <p className="text-lg text-gray-600">
            We offer a comprehensive range of printing solutions to meet all your business needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title} 
                className="flex flex-col cursor-pointer"
                onClick={handleCardClick}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className={`${service.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
