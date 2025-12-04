import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    title: "Business Cards",
    description: "Premium quality professional cards",
    image: "https://images.unsplash.com/photo-1667201698408-0c06e55b3da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhcmRzJTIwZGVzaWdufGVufDF8fHx8MTc2MDc4NTY5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    slug: "visiting-cards/business-cards",
  },
  {
    title: "Marketing Materials",
    description: "Brochures, flyers, and catalogs",
    image: "https://images.unsplash.com/photo-1695634281463-4788ac6ddfdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9jaHVyZXMlMjBtYXJrZXRpbmd8ZW58MXx8fHwxNzYwNzg5NjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    slug: "marketing-materials/brochures",
  },
  {
    title: "Banners & Signage",
    description: "Custom sizes and materials available",
    image: "https://images.unsplash.com/photo-1759692071978-8bb602bcfe76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5uZXIlMjBwcmludGluZ3xlbnwxfHx8fDE3NjA3ODk2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    slug: "posters/poster-printing",
  },
  {
    title: "Custom Packaging",
    description: "Make your products shine",
    image: "https://images.unsplash.com/photo-1720762224315-439072aa22c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYwNzczMDY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    slug: "personalised-gifts",
  },
];

export function ProductShowcase() {
  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4">Popular Products</h2>
          <p className="text-lg text-gray-600">
            Browse our most popular printing products and find the perfect solution for your needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl mb-1">{product.title}</h3>
                  <p className="text-sm text-gray-200">{product.description}</p>
                </div>
              </div>
              <div className="p-4">
                <Link to={`/products/${product.slug}`}>
                  <Button variant="ghost" className="w-full group-hover:bg-blue-50 group-hover:text-blue-600">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
