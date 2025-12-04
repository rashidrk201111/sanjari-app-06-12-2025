import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, Check } from "lucide-react";
import { categories } from "../data/categories";

export function ProductDetailPage() {
  const { productSlug } = useParams<{ productSlug: string }>();

  // Find the product
  let currentProduct: { name: string; slug: string } | null = null;
  let currentCategory: { name: string; slug: string } | null = null;

  for (const category of categories) {
    const product = category.subcategories.find((sub) => sub.slug === productSlug);
    if (product) {
      currentProduct = product;
      currentCategory = category;
      break;
    }
  }

  if (!currentProduct) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl mb-4">Product not found</h2>
        <Link to="/all-products">
          <Button>Back to All Products</Button>
        </Link>
      </div>
    );
  }

  // Get other products from the same category
  const relatedProducts = currentCategory?.subcategories.filter(
    (sub) => sub.slug !== productSlug
  ) || [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-700 to-gray-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1616861771635-49063a4636ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZGYlMjBkb2N1bWVudCUyMHByaW50aW5nfGVufDF8fHx8MTc2MDc5MDU2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Product background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl mb-4">{currentProduct.name}</h1>
          <p className="text-lg text-gray-300 mb-6">
            Print your PDFs quickly & easily with Sanjari prints. We can print, bind & deliver your pdfs.
          </p>
          <div className="flex justify-center gap-4">
            <Link to={`/configure/${currentCategory.slug}/${currentProduct.slug}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                {currentProduct.name.toUpperCase()} NOW
              </Button>
            </Link>
            <Link to="/price-calculator">
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                CALCULATE PRICE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl mb-6">Print {currentProduct.name} Online</h2>
              <p className="text-gray-700 mb-6">
                Save time & order online with our professional PDF printing service. From simple loose or stapled sheets & wire bound documents to booklets, books, posters & more - we've got PDF printing and binding covered.
              </p>

              {/* Available Papers */}
              <Card className="p-6 mb-8">
                <h3 className="text-xl mb-4">Available Papers</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Economy White Paper (75gsm)",
                    "Premium White Paper (75gsm)",
                    "Bond Paper (80gsm)",
                    "Duo White Paper (100gsm)",
                    "Glossy White Paper (100gsm)",
                    "Matt White Paper (100gsm)",
                  ].map((paper, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{paper}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Available Document Sizes */}
              <Card className="p-6 mb-8">
                <h3 className="text-xl mb-4">Available Document Sizes</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "A3 (297 × 420 millimeters or 11.69 × 16.54 inches)",
                    "A4 (210 × 297 millimeters or 8.27 × 11.69 inches)",
                    "A5 (148 × 210 millimeters or 5.83 × 8.27 inches)",
                    "B5 (176 × 250 millimeters or 6.9 × 9.8 inches)",
                  ].map((size, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{size}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Binding Options */}
              <Card className="p-6 mb-8">
                <h3 className="text-xl mb-4">Available Binding</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Corner Staple",
                    "Staple",
                    "Saddle Stitch",
                    "Hard Binding",
                    "Hard Binding with Golden Print",
                    "Soft Cover Binding / Perfect Binding",
                    "Glue Binding / Tape Binding",
                  ].map((binding, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{binding}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1616861771635-49063a4636ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZGYlMjBkb2N1bWVudCUyMHByaW50aW5nfGVufDF8fHx8MTc2MDc5MDU2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt={`Product image ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Artwork Tips */}
              <Card className="p-6 mb-8">
                <h3 className="text-xl mb-4">ARTWORK TIPS</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    To make ordering as print as easy as possible we accept 9 different file types:{" "}
                    <span className="font-medium">PDF, DOC, DOCX, PPT, PPTX, JPEG, PNG</span>
                  </p>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Recommended - PDF for perfect print!</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">File is above 100 MB?</p>
                    <p>
                      Share Your PDF file from:{" "}
                      <a href="https://wetransfer.com/" className="text-blue-600 hover:underline">
                        https://wetransfer.com/
                      </a>{" "}
                      or Google Drive.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Other Information */}
              <Card className="p-6">
                <h3 className="text-xl mb-4">OTHER INFORMATION</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2">Delivery</h4>
                    <p className="text-gray-700 text-sm">
                      You will get the Delivery Timeline at time of Placing the order. This is Depend on Location and Order type.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2">Packaging</h4>
                    <p className="text-gray-700 text-sm">
                      Normally We pack the books, b0es in Envelope and Cardboard Boxes for safe Delivery.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="mt-8">
                <Link to={`/configure/${currentCategory.slug}/${currentProduct.slug}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                    PRINT NOW
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sidebar - Related Products */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <h3 className="text-xl mb-4">OUR PRODUCTS</h3>
                <div className="space-y-2">
                  {relatedProducts.slice(0, 10).map((product) => (
                    <Link
                      key={product.slug}
                      to={`/product/${product.slug}`}
                      className="block py-2 px-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 inline mr-2" />
                      {product.name}
                    </Link>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
