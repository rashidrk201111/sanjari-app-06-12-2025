import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { categories } from "../data/categories";
import { ArrowRight } from "lucide-react";

// Product images mapping
const productImages: Record<string, string> = {
  "pdf-print": "https://images.unsplash.com/photo-1616861771635-49063a4636ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZGYlMjBkb2N1bWVudCUyMHByaW50aW5nfGVufDF8fHx8MTc2MDc5MDU2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "fitness-plan-printing": "https://images.unsplash.com/photo-1758875568756-37a9c5c1a4f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMHBsYW58ZW58MXx8fHwxNzYwNzkwNTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "legal-document-print": "https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGNvbnRyYWN0JTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYwNzkwNTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "cv-resume-print": "https://images.unsplash.com/photo-1620302044818-4209fdb10e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN1bWUlMjBjdiUyMHByaW50fGVufDF8fHx8MTc2MDc5MDU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "business-cards": "https://images.unsplash.com/photo-1667201698408-0c06e55b3da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhcmRzJTIwZGVzaWdufGVufDF8fHx8MTc2MDc4NTY5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "brochures": "https://images.unsplash.com/photo-1695634281463-4788ac6ddfdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9jaHVyZXMlMjBtYXJrZXRpbmd8ZW58MXx8fHwxNzYwNzg5NjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "poster-printing": "https://images.unsplash.com/photo-1759692071978-8bb602bcfe76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5uZXIlMjBwcmludGluZ3xlbnwxfHx8fDE3NjA3ODk2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

export function AllProductsPage() {
  // Get all subcategories from all categories
  const allProducts = categories.flatMap((category) =>
    category.subcategories.map((sub) => ({
      ...sub,
      categoryName: category.name,
      categorySlug: category.slug,
    }))
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1656784095237-3fcb8f5971b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMHByZXNzJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzYwNzg5NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Products background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl lg:text-6xl mb-4">PRODUCTS</h1>
          <p className="text-xl text-gray-300">All Products</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <Card key={product.slug} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                <Link to={`/product/${product.slug}`}>
                  <div className="relative h-48 bg-gray-100">
                    <ImageWithFallback
                      src={productImages[product.slug] || productImages["pdf-print"]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-sm mb-2">{product.name}</h3>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <div className="flex justify-center gap-2">
                    <Link to={`/configure/${product.categorySlug}/${product.slug}`} className="flex-1">
                      <Button size="sm" variant="outline" className="text-xs w-full">
                        Print Now
                      </Button>
                    </Link>
                    <Link to="/price-calculator" className="flex-1">
                      <Button size="sm" variant="ghost" className="text-xs w-full">
                        Pricing
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
