import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";

interface Subcategory {
  name: string;
}

interface Category {
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

const categories: Category[] = [
  {
    name: "DOCUMENTS",
    slug: "documents",
    subcategories: [
      { name: "PDF PRINT" },
      { name: "ANNUAL REPORT PRINTING" },
      { name: "FITNESS PLAN PRINTING" },
      { name: "LEGAL DOCUMENT PRINT" },
      { name: "HOMEWORK WORKSHEET PRINTING" },
      { name: "SURVEY & QUESTIONNAIRE PRINTING" },
      { name: "SCRIPT PRINTING" },
      { name: "CV/RESUME PRINT" },
      { name: "BILLS/INVOICE PRINTING" },
    ],
  },
  {
    name: "BOOKS",
    slug: "books",
    subcategories: [
      { name: "PAPERBACK / SOFTCOVER / SOFTBACK BOOKS" },
      { name: "HARDBOUND / HARDBACK BOOKS" },
      { name: "E-BOOK PRINTING" },
      { name: "STUDY MATERIAL/GUIDE PRINTING" },
      { name: "TRAINING/INSTRUCTION MANUAL PRINTING" },
      { name: "SCHOOL BOOK PRINTING" },
      { name: "COMIC BOOK PRINTING" },
      { name: "FAMILY HISTORY BOOK PRINTING" },
      { name: "BULK BOOK PRINTING" },
    ],
  },
  {
    name: "THESIS & DISSERTATION",
    slug: "thesis-dissertation",
    subcategories: [
      { name: "Thesis Print" },
      { name: "Dissertation Print" },
      { name: "Final Major Projects" },
      { name: "Thesis Dissertation Print" },
    ],
  },
  {
    name: "CERTIFICATE & CARDS",
    slug: "certificate-cards",
    subcategories: [
      { name: "NOTECARDS" },
      { name: "CERTIFICATE PRINTING" },
      { name: "FLASH CARD PRINTING" },
    ],
  },
  {
    name: "MARKETING MATERIALS",
    slug: "marketing-materials",
    subcategories: [
      { name: "BROCHURES" },
      { name: "TABLE AND TENTCARDS" },
    ],
  },
  {
    name: "POSTERS",
    slug: "posters",
    subcategories: [
      { name: "POSTER PRINTING" },
      { name: "FRAMED POSTERS" },
      { name: "GRAPHICS AND ART PRINTS" },
    ],
  },
  {
    name: "FLYERS OR LEAFLETS",
    slug: "flyers-leaflets",
    subcategories: [
      { name: "Flyers, Pamphlet or Leaflet - Black and White Printing" },
    ],
  },
  {
    name: "LETTERHEAD & STATIONERY",
    slug: "letterhead-stationery",
    subcategories: [
      { name: "Letterhead Printing" },
      { name: "Bill Books" },
    ],
  },
  {
    name: "VISITING CARDS",
    slug: "visiting-cards",
    subcategories: [
      { name: "Business Cards" },
    ],
  },
  {
    name: "BUSINESS STATIONERY",
    slug: "business-stationery",
    subcategories: [],
  },
  {
    name: "PERSONALISED GIFTS",
    slug: "personalised-gifts",
    subcategories: [],
  },
  {
    name: "STICKERS AND LABELS",
    slug: "stickers-labels",
    subcategories: [],
  },
  {
    name: "DOCUMENT BINDING",
    slug: "document-binding",
    subcategories: [
      { name: "Corner Staple Binding" },
      { name: "Staple Binding" },
      { name: "Center Staple Binding or Saddle Stitch Binding" },
      { name: "Spiral Binding" },
      { name: "Wiro Binding" },
      { name: "Soft Cover Binding" },
      { name: "Glue / Tape Binding" },
    ],
  },
];

export function AllProducts() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (slug: string) => {
    setExpandedCategory(expandedCategory === slug ? null : slug);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4">All Products</h2>
          <p className="text-lg text-gray-600">
            Browse our complete range of printing products organized by category
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories List */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-xl mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => toggleCategory(category.slug)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                      expandedCategory === category.slug
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span>{category.name}</span>
                    {category.subcategories.length > 0 && (
                      expandedCategory === category.slug ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Subcategories Display */}
          <div className="lg:col-span-2">
            {expandedCategory ? (
              <Card className="p-6">
                <h3 className="text-2xl mb-6">
                  {categories.find((c) => c.slug === expandedCategory)?.name}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {categories
                    .find((c) => c.slug === expandedCategory)
                    ?.subcategories.map((subcategory, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <h4 className="text-gray-900">{subcategory.name}</h4>
                      </div>
                    ))}
                  {categories.find((c) => c.slug === expandedCategory)
                    ?.subcategories.length === 0 && (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      <p>Explore our range of products in this category</p>
                      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Products
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl mb-2">Select a Category</h3>
                  <p className="text-gray-600">
                    Choose a category from the list to view all available products and subcategories
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-6 mt-12">
          <Card className="p-6 text-center">
            <div className="text-3xl text-blue-600 mb-2">13</div>
            <div className="text-sm text-gray-600">Main Categories</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl text-blue-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">Product Types</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl text-blue-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Quality Guaranteed</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl text-blue-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Online Ordering</div>
          </Card>
        </div>
      </div>
    </section>
  );
}
