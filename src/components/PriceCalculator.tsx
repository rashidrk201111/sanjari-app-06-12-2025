import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { categories } from "../data/categories";
import { Minus, Plus } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

interface CalculationResult {
  pages: string;
  copies: string;
  paperType: string;
  paperSize: string;
  printedColour: string;
  coverOption: string;
  printingSides: string;
  bindingOptions: string;
  pricePerPage: number;
  printingCost: number;
  coverCost: number;
  totalCost: number;
}

type FieldType = 
  | "pages"
  | "copies"
  | "paperSize"
  | "paperType"
  | "printingColor"
  | "printingSides"
  | "printedSide"
  | "bindingOptions"
  | "coverOption"
  | "quantity"
  | "quantityButtons"
  | "size"
  | "paper"
  | "laminationType"
  | "corner"
  | "mugColor"
  | "cushionType"
  | "papertype"
  | "printType"
  | "frameType"
  | "material"
  | "displayType"
  | "printing"
  | "invoiceNumber"
  | "billBookType";

interface SubcategoryConfig {
  fields: FieldType[];
  colorLabel?: "PRINTING COLOR" | "PRINTED COLOUR" | "PRINTED COLOR";
  isNotecardFormat?: boolean;
  useQuantityButtons?: boolean;
}

// Field configurations for each subcategory
const getSubcategoryConfig = (categorySlug: string, subcategorySlug: string): SubcategoryConfig => {
  // DOCUMENTS - all subcategories have same order
  if (categorySlug === "documents") {
    return {
      fields: ["pages", "copies", "paperSize", "paperType", "printingColor", "printingSides", "bindingOptions", "coverOption"],
      colorLabel: "PRINTING COLOR"
    };
  }
  
  // BOOKS - different orders for different subcategories
  if (categorySlug === "books") {
    // Subcategories with "PRINTING COLOR" label and specific order
    if (["paperback-books", "hardbound-books", "comic-book-printing", "training-manual-printing", 
         "portfolios", "children-book", "gaming-rulebook", "yearbook-print", "presentations", 
         "proposal-print", "instructions-print"].includes(subcategorySlug)) {
      
      // Paperback, Portfolios, Children Book, Gaming Rulebook, Yearbook, Instructions - no cover option
      if (["paperback-books", "portfolios", "children-book", "gaming-rulebook", "yearbook-print", "instructions-print"].includes(subcategorySlug)) {
        return {
          fields: ["pages", "copies", "paperSize", "paperType", "printingColor", "printingSides", "bindingOptions"],
          colorLabel: "PRINTING COLOR"
        };
      }
      
      // Hardbound, Comic Book, Training Manual, Presentations, Proposal - with cover option
      return {
        fields: ["pages", "copies", "paperSize", "paperType", "printingColor", "printingSides", "bindingOptions", "coverOption"],
        colorLabel: "PRINTING COLOR"
      };
    }
    
    // E-Book - specific order
    if (subcategorySlug === "ebook-printing") {
      return {
        fields: ["pages", "copies", "paperType", "paperSize", "printingColor", "printingSides", "bindingOptions"],
        colorLabel: "PRINTED COLOUR"
      };
    }
    
    // Study Material, School Book, Family History, Bulk Book, Magazines - "PRINTED COLOUR" label
    return {
      fields: ["pages", "copies", "paperType", "paperSize", "printingColor", "coverOption", "printingSides", "bindingOptions"],
      colorLabel: "PRINTED COLOUR"
    };
  }
  
  // THESIS & DISSERTATION - all subcategories have same order as DOCUMENTS
  if (categorySlug === "thesis-dissertation") {
    return {
      fields: ["pages", "copies", "paperSize", "paperType", "printingColor", "printingSides", "bindingOptions", "coverOption"],
      colorLabel: "PRINTING COLOR"
    };
  }
  
  // CERTIFICATE & CARDS - different formats
  if (categorySlug === "certificate-cards") {
    // Notecards has special format with quantity, size, lamination, corner
    if (subcategorySlug === "notecards") {
      return {
        fields: ["quantity", "size", "paper", "printingSides", "laminationType", "corner"],
        isNotecardFormat: true
      };
    }
    
    // Flash Card and Certificate Printing - standard format without binding and cover
    return {
      fields: ["pages", "copies", "paperSize", "paperType", "printingColor", "printingSides"],
      colorLabel: "PRINTED COLOUR"
    };
  }
  
  // DOCUMENT BINDING - binding and cover options come before printing color and sides
  if (categorySlug === "document-binding") {
    return {
      fields: ["pages", "copies", "paperSize", "paperType", "bindingOptions", "coverOption", "printingColor", "printingSides"],
      colorLabel: "PRINTING COLOR"
    };
  }
  
  // MARKETING MATERIALS - Table and Tentcards
  if (categorySlug === "marketing-materials") {
    return {
      fields: ["quantityButtons", "size", "material", "displayType"],
      useQuantityButtons: true
    };
  }
  
  // POSTERS - different subcategories
  if (categorySlug === "posters") {
    // Poster Printing - standard format
    if (subcategorySlug === "poster-printing") {
      return {
        fields: ["pages", "copies", "paperSize", "paperType", "printingColor"],
        colorLabel: "PRINTED COLOUR"
      };
    }
    
    // Graphics and Art Prints - uses quantity with +/- buttons
    if (subcategorySlug === "graphics-art-prints") {
      return {
        fields: ["quantityButtons", "paperSize", "paperType", "printingColor", "printedSide"],
        colorLabel: "PRINTED COLOUR",
        useQuantityButtons: true
      };
    }
    
    // Framed Posters - blank/not shown
    return {
      fields: [],
    };
  }
  
  // FLYERS OR LEAFLETS - unique combined printing field
  if (categorySlug === "flyers-leaflets") {
    return {
      fields: ["quantity", "size", "paper", "printing"]
    };
  }
  
  // LETTERHEAD & STATIONERY - different formats
  if (categorySlug === "letterhead-stationery") {
    // Bill Books - unique format
    if (subcategorySlug === "bill-books") {
      return {
        fields: ["quantity", "size", "paperType", "billBookType", "printingColor", "invoiceNumber"],
        colorLabel: "PRINTED COLOR"
      };
    }
    
    // Letterhead Printing - simplified format
    return {
      fields: ["pages", "copies", "paperSize", "paperType", "printingColor", "printedSide"],
      colorLabel: "PRINTED COLOUR"
    };
  }
  
  // VISITING CARDS - same as notecards
  if (categorySlug === "visiting-cards") {
    return {
      fields: ["quantity", "size", "paper", "printingSides", "laminationType", "corner"],
      isNotecardFormat: true
    };
  }
  
  // PERSONALISED GIFTS - each subcategory has unique fields
  if (categorySlug === "personalised-gifts") {
    if (subcategorySlug === "mug-printing") {
      return {
        fields: ["quantityButtons", "mugColor"],
        useQuantityButtons: true
      };
    }
    
    if (subcategorySlug === "cushion-print") {
      return {
        fields: ["quantityButtons", "cushionType"],
        useQuantityButtons: true
      };
    }
    
    if (subcategorySlug === "photo-calender") {
      return {
        fields: ["quantityButtons", "size", "papertype"],
        useQuantityButtons: true
      };
    }
    
    if (subcategorySlug === "canvas-print") {
      return {
        fields: ["quantityButtons", "size", "printType"],
        useQuantityButtons: true
      };
    }
    
    if (subcategorySlug === "framed-photos") {
      return {
        fields: ["quantityButtons", "size", "paperType", "frameType"],
        useQuantityButtons: true
      };
    }
  }
  
  // BUSINESS STATIONERY - blank/not shown
  if (categorySlug === "business-stationery") {
    return {
      fields: []
    };
  }
  
  // STICKERS AND LABELS - blank/not shown
  if (categorySlug === "stickers-labels") {
    return {
      fields: []
    };
  }
  
  // Default configuration
  return {
    fields: ["pages", "copies", "paperSize", "paperType", "printingColor", "printingSides", "bindingOptions", "coverOption"],
    colorLabel: "PRINTING COLOR"
  };
};

export function PriceCalculator() {
  const { pricingRules } = useAdmin();
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [pages, setPages] = useState(1);
  const [copies, setCopies] = useState(1);
  const [paperType, setPaperType] = useState("");
  const [paperSize, setPaperSize] = useState("");
  const [printedColour, setPrintedColour] = useState("");
  const [coverOption, setCoverOption] = useState("");
  const [printingSides, setPrintingSides] = useState("");
  const [bindingOptions, setBindingOptions] = useState("");
  
  // Notecard-specific fields
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [paper, setPaper] = useState("");
  const [laminationType, setLaminationType] = useState("");
  const [corner, setCorner] = useState("");
  
  // Personalised Gifts fields
  const [mugColor, setMugColor] = useState("");
  const [cushionType, setCushionType] = useState("");
  const [papertype, setPapertype] = useState("");
  const [printType, setPrintType] = useState("");
  const [frameType, setFrameType] = useState("");
  
  // Marketing Materials fields
  const [material, setMaterial] = useState("");
  const [displayType, setDisplayType] = useState("");
  
  // Flyers fields
  const [printing, setPrinting] = useState("");
  
  // Bill Books fields
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [billBookType, setBillBookType] = useState("");
  
  const [result, setResult] = useState<CalculationResult | null>(null);

  const selectedCategory = categories.find(cat => cat.slug === mainCategory);
  const config = getSubcategoryConfig(mainCategory, subCategory);
  
  // Get pricing rule for current selection
  const getPricingRule = () => {
    if (!mainCategory || !subCategory) return null;
    
    const category = categories.find(c => c.slug === mainCategory);
    const subcategoryObj = category?.subcategories.find(s => s.slug === subCategory);
    
    if (!subcategoryObj) return null;
    
    return pricingRules.find(rule => 
      rule.category === mainCategory && 
      rule.subcategory.toLowerCase() === subcategoryObj.name.toLowerCase()
    );
  };

  const incrementPages = () => setPages(prev => prev + 1);
  const decrementPages = () => setPages(prev => prev > 1 ? prev - 1 : 1);
  const incrementCopies = () => setCopies(prev => prev + 1);
  const decrementCopies = () => setCopies(prev => prev > 1 ? prev - 1 : 1);

  const calculatePrice = () => {
    const pagesNum = pages;
    const copiesNum = copies;
    const pricingRule = getPricingRule();
    
    // Base price calculation in INR
    let pricePerPage = 0.89; // Default fallback
    
    // Use pricing rule if available
    if (pricingRule) {
      pricePerPage = pricingRule.basePrice;
      
      // Apply paper type modifier from pricing rule
      if (paperType && pricingRule.paperTypes.length > 0) {
        const paperTypeRule = pricingRule.paperTypes.find(pt => 
          paperType.toLowerCase().includes(pt.name.toLowerCase())
        );
        if (paperTypeRule) {
          pricePerPage += paperTypeRule.priceModifier;
        }
      }
    } else {
      // Fallback to hardcoded logic if no pricing rule exists
      if (paperType.includes("80GSM") || paperType.includes("85GSM")) pricePerPage = 1.0;
      else if (paperType.includes("100GSM")) pricePerPage = 1.2;
      else if (paperType.includes("120GSM")) pricePerPage = 1.4;
      else if (paperType.includes("170GSM")) pricePerPage = 2.0;
    }
    
    // Adjust based on color
    if (printedColour === "color") pricePerPage *= 8;
    
    // Adjust based on sides
    if (printingSides === "duplex") pricePerPage *= 1.5;
    
    let printingCost = pagesNum * copiesNum * pricePerPage;
    
    // Apply quantity discounts from pricing rule
    if (pricingRule && pricingRule.quantityDiscounts.length > 0) {
      const totalQuantity = copiesNum;
      const applicableDiscount = pricingRule.quantityDiscounts
        .filter(qd => totalQuantity >= qd.minQty)
        .sort((a, b) => b.minQty - a.minQty)[0];
      
      if (applicableDiscount) {
        printingCost = printingCost * (1 - applicableDiscount.discount / 100);
      }
    }
    
    // Binding cost
    let bindingCost = 0;
    if (bindingOptions && pricingRule?.bindingTypes) {
      const bindingRule = pricingRule.bindingTypes.find(bt =>
        bindingOptions.toLowerCase().includes(bt.name.toLowerCase())
      );
      if (bindingRule) {
        bindingCost = bindingRule.price * copiesNum;
      }
    }
    
    // Cover cost (fallback logic)
    let coverCost = 0;
    if (coverOption === "front-cover") coverCost = 10;
    else if (coverOption === "front-back-cover") coverCost = 20;
    else if (coverOption === "thick-color-cover") coverCost = 30;
    
    const totalCost = printingCost + bindingCost + coverCost;
    
    setResult({
      pages: pages.toString(),
      copies: copies.toString(),
      paperType: paperType || "",
      paperSize: paperSize || "",
      printedColour: printedColour || "",
      coverOption: coverOption || "",
      printingSides: printingSides || "",
      bindingOptions: bindingOptions || "",
      pricePerPage,
      printingCost,
      coverCost: coverCost + bindingCost,
      totalCost,
    });
  };

  const getPrintedColourLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      "bw": "BLACK & WHITE PRINTING",
      "color": "COLOR PRINTING",
    };
    return labels[value] || value;
  };

  const getCoverOptionLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      "no-cover": "NO COVER",
      "front-cover": "FRONT COVER",
      "front-back-cover": "FRONT & BACK COVER",
      "thick-color-cover": "THICK COLOR COVER",
    };
    return labels[value] || value;
  };

  const getPrintingSidesLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      "single": "SINGLE SIDE PRINTING",
      "duplex": "DUPLEX PRINTING (BOTH SIDES)",
    };
    return labels[value] || value;
  };

  const getBindingOptionsLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      "no-binding": "LOOSE SHEET (NO BINDING)",
      "staple": "STAPLE BINDING",
      "spiral": "SPIRAL BINDING",
      "perfect": "PERFECT BINDING",
      "soft-cover": "SOFT COVER BINDING",
      "hard-binding": "HARD BINDING WITH LAMINATION",
    };
    return labels[value] || value;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl">PRICE CALCULATOR</h2>
        </div>

        {/* Main Category Selection - Dark Header */}
        <div className="bg-gray-800 text-white px-8 py-6 rounded-t-lg">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <Label className="text-white text-lg mb-3 block">Select Product Type</Label>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Select value={mainCategory} onValueChange={(value) => {
                setMainCategory(value);
                setSubCategory("");
              }}>
                <SelectTrigger className="bg-white text-gray-900 h-12">
                  <SelectValue placeholder="Select Main Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.slug} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={subCategory} 
                onValueChange={setSubCategory}
                disabled={!mainCategory || !selectedCategory?.subcategories.length}
              >
                <SelectTrigger className="bg-white text-gray-900 h-12">
                  <SelectValue placeholder="Select Subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategory?.subcategories.map((sub) => (
                    <SelectItem key={sub.slug} value={sub.slug}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Display - Only show after calculation */}
        {result && (
          <div className="bg-white border border-gray-200 px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-sm text-gray-600">PAGES: </span>
                <span className="text-sm">{result.pages}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">COPIES: </span>
                <span className="text-sm">{result.copies}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">PAPER TYPE: </span>
                <span className="text-sm text-orange-500">{result.paperType}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">PAPER SIZE: </span>
                <span className="text-sm text-orange-500">{result.paperSize.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-sm text-gray-600">PRINTED COLOUR: </span>
                <span className="text-sm text-orange-500">{getPrintedColourLabel(result.printedColour)}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">COVER OPTION: </span>
                <span className="text-sm text-orange-500">{getCoverOptionLabel(result.coverOption)}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-sm text-gray-600">PRINTING SIDES: </span>
                <span className="text-sm text-orange-500">{getPrintingSidesLabel(result.printingSides)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <span className="text-sm text-gray-600">BINDING OPTIONS: </span>
                <span className="text-sm text-orange-500">{getBindingOptionsLabel(result.bindingOptions)}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-sm text-gray-600">PRINTING CHARGE PER PAGE: </span>
                <span className="text-sm text-orange-500">₹{result.pricePerPage.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded text-sm">
                PRINTING COST: ₹ {result.printingCost.toFixed(2)}/-
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded text-sm">
                COVER OPTION: ₹ {result.coverCost.toFixed(2)}/-
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded text-sm">
                TOTAL COST: ₹ {result.totalCost.toFixed(2)}/-
              </span>
            </div>
          </div>
        )}

        {/* Form Card - Only show when subcategory is selected */}
        {subCategory ? (
          <Card className="p-8 rounded-t-none">
            {config.fields.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Form configuration coming soon for this category.</p>
                <p className="text-gray-500 text-sm mt-2">Please select a different category or check back later.</p>
              </div>
            ) : (
              <>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
            {config.fields.map((field) => {
              // Pages field
              if (field === "pages") {
                return (
                  <div key="pages" className="space-y-2">
                    <Label className="text-xs text-gray-600">PAGES:</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={decrementPages}
                        className="h-10 w-10 shrink-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={pages}
                        onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        className="h-10 text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={incrementPages}
                        className="h-10 w-10 shrink-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              }

              // Copies field
              if (field === "copies") {
                return (
                  <div key="copies" className="space-y-2">
                    <Label className="text-xs text-gray-600">COPIES:</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={decrementCopies}
                        className="h-10 w-10 shrink-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={copies}
                        onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        className="h-10 text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={incrementCopies}
                        className="h-10 w-10 shrink-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              }

              // Paper Size field
              if (field === "paperSize") {
                return (
                  <div key="paperSize" className="space-y-2">
                    <Label className="text-xs text-gray-600">PAPER SIZE:</Label>
                    <Select value={paperSize} onValueChange={setPaperSize}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select paper size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A4">A4</SelectItem>
                        <SelectItem value="A3">A3</SelectItem>
                        <SelectItem value="A5">A5</SelectItem>
                        <SelectItem value="B5">B5</SelectItem>
                        <SelectItem value="Letter">Letter</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Paper Type field
              if (field === "paperType") {
                return (
                  <div key="paperType" className="space-y-2">
                    <Label className="text-xs text-gray-600">PAPER TYPE:</Label>
                    <Select value={paperType} onValueChange={setPaperType}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select paper type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="75GSM NORMAL PAPER">75GSM NORMAL PAPER</SelectItem>
                        <SelectItem value="80GSM NORMAL PAPER">80GSM NORMAL PAPER</SelectItem>
                        <SelectItem value="75GSM PREMIUM PAPER">75GSM PREMIUM PAPER</SelectItem>
                        <SelectItem value="85GSM BOND PAPER">85GSM BOND PAPER</SelectItem>
                        <SelectItem value="80GSM DUO PAPER">80GSM DUO PAPER</SelectItem>
                        <SelectItem value="100GSM BOND PAPER">100GSM BOND PAPER</SelectItem>
                        <SelectItem value="100GSM DUO PAPER">100GSM DUO PAPER</SelectItem>
                        <SelectItem value="170GSM MATTE PAPER">170GSM MATTE PAPER</SelectItem>
                        <SelectItem value="120GSM MATTE PAPER">120GSM MATTE PAPER</SelectItem>
                        <SelectItem value="170GSM GLOSS PAPER">170GSM GLOSS PAPER</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Printing Color field
              if (field === "printingColor") {
                return (
                  <div key="printingColor" className="space-y-2">
                    <Label className="text-xs text-gray-600">{config.colorLabel}:</Label>
                    <Select value={printedColour} onValueChange={setPrintedColour}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select colour option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bw">BLACK & WHITE PRINTING</SelectItem>
                        <SelectItem value="color">COLOR PRINTING</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Printing Sides field
              if (field === "printingSides") {
                return (
                  <div key="printingSides" className="space-y-2">
                    <Label className="text-xs text-gray-600">PRINTING SIDES:</Label>
                    <Select value={printingSides} onValueChange={setPrintingSides}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select printing sides" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">SINGLE SIDE PRINTING</SelectItem>
                        <SelectItem value="duplex">DUPLEX PRINTING (BOTH SIDES)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Binding Options field
              if (field === "bindingOptions") {
                return (
                  <div key="bindingOptions" className="space-y-2">
                    <Label className="text-xs text-gray-600">BINDING OPTIONS:</Label>
                    <Select value={bindingOptions} onValueChange={setBindingOptions}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select binding option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-binding">LOOSE SHEET (NO BINDING)</SelectItem>
                        <SelectItem value="staple">STAPLE BINDING</SelectItem>
                        <SelectItem value="corner-staple">CORNER STAPLE BINDING</SelectItem>
                        <SelectItem value="center-staple">CENTER STAPLE BINDING (SADDLE STITCH)</SelectItem>
                        <SelectItem value="spiral">SPIRAL BINDING</SelectItem>
                        <SelectItem value="wiro">WIRO BINDING</SelectItem>
                        <SelectItem value="soft-cover">SOFT COVER BINDING</SelectItem>
                        <SelectItem value="hard-binding">HARD BINDING WITH LAMINATION</SelectItem>
                        <SelectItem value="glue-tape">GLUE / TAPE BINDING</SelectItem>
                        <SelectItem value="perfect">PERFECT BINDING</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Cover Option field
              if (field === "coverOption") {
                return (
                  <div key="coverOption" className="space-y-2">
                    <Label className="text-xs text-gray-600">COVER OPTION:</Label>
                    <Select value={coverOption} onValueChange={setCoverOption}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select cover option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-cover">NO COVER</SelectItem>
                        <SelectItem value="front-cover">FRONT COVER</SelectItem>
                        <SelectItem value="front-back-cover">FRONT & BACK COVER</SelectItem>
                        <SelectItem value="thick-color-cover">THICK COLOR COVER</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Quantity field (dropdown - for Notecards, Flyers, Bill Books)
              if (field === "quantity") {
                // Flyers - different quantity options
                if (mainCategory === "flyers-leaflets") {
                  return (
                    <div key="quantity" className="space-y-2">
                      <Label className="text-xs text-gray-600">QUANTITY:</Label>
                      <Select value={quantity} onValueChange={setQuantity}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                          <SelectItem value="250">250</SelectItem>
                          <SelectItem value="500">500</SelectItem>
                          <SelectItem value="1000">1000</SelectItem>
                          <SelectItem value="2500">2500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }
                
                // Bill Books - book quantity
                if (mainCategory === "letterhead-stationery" && subCategory === "bill-books") {
                  return (
                    <div key="quantity" className="space-y-2">
                      <Label className="text-xs text-gray-600">QUANTITY:</Label>
                      <Select value={quantity} onValueChange={setQuantity}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                          <SelectItem value="250">250</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }
                
                // Notecards, Visiting Cards - standard card quantities
                return (
                  <div key="quantity" className="space-y-2">
                    <Label className="text-xs text-gray-600">QUANTITY:</Label>
                    <Select value={quantity} onValueChange={setQuantity}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="250">250</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                        <SelectItem value="1000">1000</SelectItem>
                        <SelectItem value="2500">2500</SelectItem>
                        <SelectItem value="5000">5000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Size field (different options for different categories)
              if (field === "size") {
                // Flyers - specific size format
                if (mainCategory === "flyers-leaflets") {
                  return (
                    <div key="size" className="space-y-2">
                      <Label className="text-xs text-gray-600">SIZE:</Label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a5">A5 SIZE - 148 MM x 210 MM</SelectItem>
                          <SelectItem value="a4">A4 SIZE - 210 MM x 297 MM</SelectItem>
                          <SelectItem value="a6">A6 SIZE - 105 MM x 148 MM</SelectItem>
                          <SelectItem value="dl">DL SIZE - 99 MM x 210 MM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }
                
                // Marketing Materials - standard sizes
                if (mainCategory === "marketing-materials") {
                  return (
                    <div key="size" className="space-y-2">
                      <Label className="text-xs text-gray-600">SIZE:</Label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a5">A5</SelectItem>
                          <SelectItem value="a4">A4</SelectItem>
                          <SelectItem value="a6">A6</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }
                
                // Personalised Gifts - different sizes for different products
                if (mainCategory === "personalised-gifts") {
                  if (subCategory === "photo-calender") {
                    return (
                      <div key="size" className="space-y-2">
                        <Label className="text-xs text-gray-600">SIZE:</Label>
                        <Select value={size} onValueChange={setSize}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a4">A4</SelectItem>
                            <SelectItem value="a3">A3</SelectItem>
                            <SelectItem value="8x11">8X11 INCH</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }
                  
                  if (subCategory === "canvas-print") {
                    return (
                      <div key="size" className="space-y-2">
                        <Label className="text-xs text-gray-600">SIZE:</Label>
                        <Select value={size} onValueChange={setSize}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="20x30">20X30CM</SelectItem>
                            <SelectItem value="30x40">30X40CM</SelectItem>
                            <SelectItem value="40x60">40X60CM</SelectItem>
                            <SelectItem value="16x20">16X20 INCH</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }
                  
                  if (subCategory === "framed-photos") {
                    return (
                      <div key="size" className="space-y-2">
                        <Label className="text-xs text-gray-600">SIZE:</Label>
                        <Select value={size} onValueChange={setSize}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5x5">5X5INCH</SelectItem>
                            <SelectItem value="6x8">6X8INCH</SelectItem>
                            <SelectItem value="8x10">8X10INCH</SelectItem>
                            <SelectItem value="a4">A4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }
                }
                
                // Bill Books - standard sizes
                if (mainCategory === "letterhead-stationery" && subCategory === "bill-books") {
                  return (
                    <div key="size" className="space-y-2">
                      <Label className="text-xs text-gray-600">SIZE:</Label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a4">A4</SelectItem>
                          <SelectItem value="a5">A5</SelectItem>
                          <SelectItem value="b5">B5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }
                
                // Notecards, Visiting Cards - business card sizes
                return (
                  <div key="size" className="space-y-2">
                    <Label className="text-xs text-gray-600">SIZE:</Label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="89x51">89 X 51 MM</SelectItem>
                        <SelectItem value="85x55">85 X 55 MM (STANDARD BUSINESS CARD)</SelectItem>
                        <SelectItem value="90x50">90 X 50 MM</SelectItem>
                        <SelectItem value="custom">CUSTOM SIZE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Paper field (different options for different categories)
              if (field === "paper") {
                // Flyers - combines type and weight
                if (mainCategory === "flyers-leaflets") {
                  return (
                    <div key="paper" className="space-y-2">
                      <Label className="text-xs text-gray-600">PAPER:</Label>
                      <Select value={paper} onValueChange={setPaper}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select paper" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal-75gsm">NORMAL - 75GSM</SelectItem>
                          <SelectItem value="premium-80gsm">PREMIUM - 80GSM</SelectItem>
                          <SelectItem value="glossy-170gsm">GLOSSY - 170GSM</SelectItem>
                          <SelectItem value="matte-170gsm">MATTE - 170GSM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }
                
                // Notecards, Visiting Cards - thick paper options
                return (
                  <div key="paper" className="space-y-2">
                    <Label className="text-xs text-gray-600">PAPER:</Label>
                    <Select value={paper} onValueChange={setPaper}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select paper" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300gsm-coated">300GSM COATED PAPER</SelectItem>
                        <SelectItem value="300gsm-matte">300GSM MATTE PAPER</SelectItem>
                        <SelectItem value="250gsm-coated">250GSM COATED PAPER</SelectItem>
                        <SelectItem value="350gsm-coated">350GSM COATED PAPER</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Lamination Type field (for Notecards)
              if (field === "laminationType") {
                return (
                  <div key="laminationType" className="space-y-2">
                    <Label className="text-xs text-gray-600">LAMINATION TYPE:</Label>
                    <Select value={laminationType} onValueChange={setLaminationType}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select lamination type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-lamination">NO LAMINATION</SelectItem>
                        <SelectItem value="gloss-lamination">GLOSS LAMINATION</SelectItem>
                        <SelectItem value="matte-lamination">MATTE LAMINATION</SelectItem>
                        <SelectItem value="soft-touch-lamination">SOFT TOUCH LAMINATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Corner field (for Notecards)
              if (field === "corner") {
                return (
                  <div key="corner" className="space-y-2">
                    <Label className="text-xs text-gray-600">CORNER:</Label>
                    <Select value={corner} onValueChange={setCorner}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select corner type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">STANDARD (SHARP CORNERS)</SelectItem>
                        <SelectItem value="rounded">ROUNDED CORNERS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Quantity with +/- buttons (for Personalised Gifts, Posters, Marketing Materials)
              if (field === "quantityButtons") {
                return (
                  <div key="quantityButtons" className="space-y-2">
                    <Label className="text-xs text-gray-600">QUANTITY:</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 shrink-0"
                        onClick={() => setCopies(Math.max(1, copies - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={copies}
                        onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                        className="h-10 text-center"
                        min="1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 shrink-0"
                        onClick={() => setCopies(copies + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              }

              // Printed Side (singular - for Letterhead, Posters Graphics)
              if (field === "printedSide") {
                return (
                  <div key="printedSide" className="space-y-2">
                    <Label className="text-xs text-gray-600">PRINTED SIDE:</Label>
                    <Select value={printingSides} onValueChange={setPrintingSides}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select printed side" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">SINGLE SIDE PRINTING</SelectItem>
                        <SelectItem value="duplex">DOUBLE SIDE PRINTING</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Mug Color (for Mug Printing)
              if (field === "mugColor") {
                return (
                  <div key="mugColor" className="space-y-2">
                    <Label className="text-xs text-gray-600">MUG COLOR:</Label>
                    <Select value={mugColor} onValueChange={setMugColor}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select mug color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="black">BLACK</SelectItem>
                        <SelectItem value="white">WHITE</SelectItem>
                        <SelectItem value="red">RED</SelectItem>
                        <SelectItem value="blue">BLUE</SelectItem>
                        <SelectItem value="green">GREEN</SelectItem>
                        <SelectItem value="yellow">YELLOW</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Cushion Type (for Cushion Print)
              if (field === "cushionType") {
                return (
                  <div key="cushionType" className="space-y-2">
                    <Label className="text-xs text-gray-600">TYPE:</Label>
                    <Select value={cushionType} onValueChange={setCushionType}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cushion-covers">CUSHION COVERS</SelectItem>
                        <SelectItem value="cushion-with-filler">CUSHION WITH FILLER</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Papertype (lowercase - for Photo Calender)
              if (field === "papertype") {
                return (
                  <div key="papertype" className="space-y-2">
                    <Label className="text-xs text-gray-600">PAPERTYPE:</Label>
                    <Select value={papertype} onValueChange={setPapertype}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select papertype" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300gsm-matte">300GSM MATTE PAPER</SelectItem>
                        <SelectItem value="300gsm-glossy">300GSM GLOSSY PAPER</SelectItem>
                        <SelectItem value="170gsm-matte">170GSM MATTE PAPER</SelectItem>
                        <SelectItem value="170gsm-glossy">170GSM GLOSSY PAPER</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Print Type (for Canvas Print)
              if (field === "printType") {
                return (
                  <div key="printType" className="space-y-2">
                    <Label className="text-xs text-gray-600">PRINT TYPE:</Label>
                    <Select value={printType} onValueChange={setPrintType}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select print type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="canvas-print">CANVAS PRINT</SelectItem>
                        <SelectItem value="photo-print">PHOTO PRINT</SelectItem>
                        <SelectItem value="art-print">ART PRINT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Frame Type (for Framed Photos)
              if (field === "frameType") {
                return (
                  <div key="frameType" className="space-y-2">
                    <Label className="text-xs text-gray-600">FRAME TYPE:</Label>
                    <Select value={frameType} onValueChange={setFrameType}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select frame type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="black-frame">BLACK FRAME WITH GLASS</SelectItem>
                        <SelectItem value="white-frame">WHITE FRAME WITH GLASS</SelectItem>
                        <SelectItem value="wooden-frame">WOODEN FRAME WITH GLASS</SelectItem>
                        <SelectItem value="no-frame">NO FRAME</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Material (for Table and Tentcards)
              if (field === "material") {
                return (
                  <div key="material" className="space-y-2">
                    <Label className="text-xs text-gray-600">MATERIAL:</Label>
                    <Select value={material} onValueChange={setMaterial}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gloss">GLOSS</SelectItem>
                        <SelectItem value="matte">MATTE</SelectItem>
                        <SelectItem value="textured">TEXTURED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Display Type (for Table and Tentcards)
              if (field === "displayType") {
                return (
                  <div key="displayType" className="space-y-2">
                    <Label className="text-xs text-gray-600">DISPLAY TYPE:</Label>
                    <Select value={displayType} onValueChange={setDisplayType}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select display type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="table-tent">TABLE TENT</SelectItem>
                        <SelectItem value="tent-card">TENT CARD</SelectItem>
                        <SelectItem value="standee">STANDEE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Printing (combined sides + color for Flyers)
              if (field === "printing") {
                return (
                  <div key="printing" className="space-y-2">
                    <Label className="text-xs text-gray-600">PRINTING:</Label>
                    <Select value={printing} onValueChange={setPrinting}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select printing option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-bw">SINGLE SIDE - BLACK AND WHITE</SelectItem>
                        <SelectItem value="single-color">SINGLE SIDE - COLOR</SelectItem>
                        <SelectItem value="double-bw">DOUBLE SIDE - BLACK AND WHITE</SelectItem>
                        <SelectItem value="double-color">DOUBLE SIDE - COLOR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Bill Book Type (for Bill Books)
              if (field === "billBookType") {
                return (
                  <div key="billBookType" className="space-y-2">
                    <Label className="text-xs text-gray-600">TYPE:</Label>
                    <Select value={billBookType} onValueChange={setBillBookType}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50-original-50-duplicate">50 ORIGINAL + 50 DUPLICATE</SelectItem>
                        <SelectItem value="100-original">100 ORIGINAL</SelectItem>
                        <SelectItem value="50-original-50-duplicate-50-triplicate">50 ORIGINAL + 50 DUPLICATE + 50 TRIPLICATE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Invoice Number (for Bill Books)
              if (field === "invoiceNumber") {
                return (
                  <div key="invoiceNumber" className="space-y-2">
                    <Label className="text-xs text-gray-600">INVOICE NUMBER:</Label>
                    <Select value={invoiceNumber} onValueChange={setInvoiceNumber}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select invoice number option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="with-invoice">WITH INVOICE NUMBER</SelectItem>
                        <SelectItem value="without-invoice">WITHOUT INVOICE NUMBER</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Calculate Button */}
          <Button
            onClick={calculatePrice}
            className="bg-blue-900 hover:bg-blue-800 text-white px-12"
            size="lg"
          >
            CALCULATE PRICE
          </Button>

          {/* Notes Section */}
          <div className="mt-8 space-y-3">
            <h3 className="text-sm">Notes:</h3>
            
            <div className="text-xs text-gray-700 space-y-2">
              <p>
                <strong>Paper Size:</strong> Size of the Paper A3 [297 x 420 millimeters or 11.69 x 16.54 inches], A4 [210 297 millimeters or 8.27 11.69 inches], 
                B5 [176 x 250 millimeters or 6.9 x 9.8 inches], A5 [148 x 210 millimeters or 5.83 x 8.27 inches]
              </p>
              
              <p>
                <strong>Printing Sides:</strong> To find out whether you want duplex printing (Back 2 Back) or Single Side Printing
              </p>
              
              <p>
                <strong>Paper Type:</strong> Types of Document [75GSM: Business Forms, Flyers, Books, Mailers, Reports], [100GSM/130GSM: Premium Books, Mailers, Resume, Letterhead], 
                [170GSM: Booklet, Magazine, etc], [170GSM/250GSM/300GSM: Poster, Marketing Materials], [250GSM/300GSM: Business Card, Certificates, Photo, Premium Poster, etc]
              </p>
              
              <p>
                <strong>Binding Type:</strong> Choose Binding type of the Document.
              </p>
            </div>
          </div>
              </>
            )}
        </Card>
        ) : (
          <Card className="p-8 rounded-t-none">
            <div className="text-center py-12 text-gray-500">
              <p>Please select a main category and subcategory to start calculating prices.</p>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
