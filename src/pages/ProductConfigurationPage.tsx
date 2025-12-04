import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, ShoppingCart, Plus, Minus, IndianRupee, Upload, X } from "lucide-react";
import { categories } from "../data/categories";
import { getProductConfig, fieldOptions, FieldType } from "../utils/productConfig";
import { useCart } from "../context/CartContext";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner@2.0.3";

export function ProductConfigurationPage() {
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
  }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { pricingRules } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [configuration, setConfiguration] = useState<{ [key: string]: string | number }>({
    pages: 1,
    copies: 1,
    quantity: 1,
    invoiceNumber: 50,
  });

  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Find category and product
  const category = categories.find((cat) => cat.slug === categorySlug);
  const product = category?.subcategories.find((sub) => sub.slug === subcategorySlug);
  
  // Get pricing rule for current product
  const pricingRule = pricingRules.find(rule => 
    rule.category === categorySlug && 
    rule.subcategory.toLowerCase() === product?.name.toLowerCase()
  );

  if (!category || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-2">Product Not Found</h2>
          <Button onClick={() => navigate("/")}>Go to Home</Button>
        </div>
      </div>
    );
  }

  const productConfig = getProductConfig(categorySlug!, subcategorySlug!);

  // Calculate price based on configuration
  useEffect(() => {
    calculatePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configuration, pricingRule]);

  const calculatePrice = () => {
    let basePrice = 0;
    const pages = Number(configuration.pages) || 1;
    const copies = Number(configuration.copies) || 1;
    const quantity = Number(configuration.quantity) || 1;

    // Price calculation logic based on configuration
    if (productConfig.fields.includes("pages")) {
      // Document/Book pricing with admin pricing rules
      let pricePerPage = 1; // Default fallback
      
      if (pricingRule) {
        // Use admin-configured pricing
        pricePerPage = pricingRule.basePrice;
        
        // Apply paper type modifier
        if (configuration.paperType && pricingRule.paperTypes.length > 0) {
          const paperTypeRule = pricingRule.paperTypes.find(pt => 
            String(configuration.paperType).toLowerCase().includes(pt.name.toLowerCase())
          );
          if (paperTypeRule) {
            pricePerPage += paperTypeRule.priceModifier;
          }
        }
      } else {
        // Fallback to hardcoded pricing
        pricePerPage = configuration.printingColor === "color" ? 3 : 1;
      }
      
      // Adjust for color printing if not in pricing rule
      if (!pricingRule && configuration.printingColor === "color") {
        pricePerPage *= 3;
      }
      
      // Adjust for duplex printing
      if (configuration.printingSides === "duplex") {
        pricePerPage *= 1.5;
      }
      
      let printingCost = pages * copies * pricePerPage;
      
      // Apply quantity discounts from pricing rule
      if (pricingRule && pricingRule.quantityDiscounts.length > 0) {
        const totalQuantity = copies;
        const applicableDiscount = pricingRule.quantityDiscounts
          .filter(qd => totalQuantity >= qd.minQty)
          .sort((a, b) => b.minQty - a.minQty)[0];
        
        if (applicableDiscount) {
          printingCost = printingCost * (1 - applicableDiscount.discount / 100);
        }
      }
      
      let bindingCost = 0;
      if (configuration.bindingOptions && pricingRule?.bindingTypes) {
        const bindingRule = pricingRule.bindingTypes.find(bt =>
          String(configuration.bindingOptions).toLowerCase().includes(bt.name.toLowerCase())
        );
        if (bindingRule) {
          bindingCost = bindingRule.price * copies;
        }
      } else {
        // Fallback binding costs
        if (configuration.bindingOptions === "spiral" || configuration.bindingOptions === "wiro") {
          bindingCost = 50 * copies;
        } else if (configuration.bindingOptions === "thermal") {
          bindingCost = 30 * copies;
        } else if (configuration.bindingOptions === "hardbound") {
          bindingCost = 150 * copies;
        } else if (configuration.bindingOptions === "staple") {
          bindingCost = 10 * copies;
        }
      }
      
      let coverCost = 0;
      if (configuration.coverOption === "transparent") {
        coverCost = 20 * copies;
      } else if (configuration.coverOption === "colored") {
        coverCost = 30 * copies;
      }
      
      basePrice = printingCost + bindingCost + coverCost;
    } else {
      // Other products (cards, posters, gifts, etc.)
      // Use pricing rule base price if available
      if (pricingRule) {
        basePrice = pricingRule.basePrice * quantity;
        
        // Apply quantity discounts
        if (pricingRule.quantityDiscounts.length > 0) {
          const applicableDiscount = pricingRule.quantityDiscounts
            .filter(qd => quantity >= qd.minQty)
            .sort((a, b) => b.minQty - a.minQty)[0];
          
          if (applicableDiscount) {
            basePrice = basePrice * (1 - applicableDiscount.discount / 100);
          }
        }
      } else {
        // Fallback to hardcoded pricing
        if (categorySlug === "personalised-gifts") {
          if (subcategorySlug === "mug-printing") {
            basePrice = 250 * quantity;
          } else if (subcategorySlug === "cushion-print") {
            basePrice = 400 * quantity;
          } else if (subcategorySlug === "photo-calender") {
            basePrice = 300 * quantity;
          } else if (subcategorySlug === "canvas-print") {
            const sizeMultiplier = configuration.size === "large" ? 2 : configuration.size === "medium" ? 1.5 : 1;
            basePrice = 500 * quantity * sizeMultiplier;
          } else if (subcategorySlug === "framed-photos") {
            basePrice = 350 * quantity;
          }
        } else if (categorySlug === "visiting-cards") {
          basePrice = (quantity / 100) * 200; // ₹200 per 100 cards
        } else if (categorySlug === "posters") {
          const sizeMultiplier = configuration.size === "large" ? 2 : configuration.size === "medium" ? 1.5 : 1;
          basePrice = 100 * quantity * sizeMultiplier;
        } else if (categorySlug === "certificate-cards") {
          basePrice = 20 * quantity;
        } else if (categorySlug === "flyers-leaflets") {
          basePrice = 5 * quantity;
        } else {
          // Default pricing
          basePrice = 50 * quantity;
        }
      }
    }

    setCalculatedPrice(Math.round(basePrice));
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setConfiguration((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuantityChange = (field: string, delta: number) => {
    const currentValue = Number(configuration[field]) || 1;
    const newValue = Math.max(1, currentValue + delta);
    handleFieldChange(field, newValue);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter((file) => {
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
          toast.error(`${file.name} is too large. Maximum file size is 50MB.`);
          return false;
        }
        return true;
      });
      
      setUploadedFiles((prev) => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) uploaded successfully!`);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    toast.success("File removed");
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${Date.now()}-${Math.random()}`,
      productName: product.name,
      categorySlug: categorySlug!,
      subcategorySlug: subcategorySlug!,
      configuration,
      price: calculatedPrice,
      quantity: 1,
    };

    addToCart(cartItem);
    toast.success(`${product.name} added to cart!`);
    navigate("/cart");
  };

  const renderField = (field: FieldType) => {
    switch (field) {
      case "pages":
        return (
          <div className="space-y-2">
            <Label>Number of Pages</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange("pages", -1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={configuration.pages}
                onChange={(e) => handleFieldChange("pages", Number(e.target.value))}
                className="text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange("pages", 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case "copies":
        return (
          <div className="space-y-2">
            <Label>Number of Copies</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange("copies", -1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={configuration.copies}
                onChange={(e) => handleFieldChange("copies", Number(e.target.value))}
                className="text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange("copies", 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case "quantity":
        return (
          <div className="space-y-2">
            <Label>Quantity</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange("quantity", -1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={configuration.quantity}
                onChange={(e) => handleFieldChange("quantity", Number(e.target.value))}
                className="text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange("quantity", 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case "invoiceNumber":
        return (
          <div className="space-y-2">
            <Label>Number of Invoices per Book</Label>
            <Input
              type="number"
              min="50"
              step="50"
              value={configuration.invoiceNumber}
              onChange={(e) => handleFieldChange("invoiceNumber", Number(e.target.value))}
            />
          </div>
        );

      case "paperSize":
        return (
          <div className="space-y-2">
            <Label>Paper Size</Label>
            <Select
              value={configuration.paperSize as string}
              onValueChange={(value) => handleFieldChange("paperSize", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.paperSize.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "paperType":
        return (
          <div className="space-y-2">
            <Label>Paper Type</Label>
            <Select
              value={configuration.paperType as string}
              onValueChange={(value) => handleFieldChange("paperType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select paper type" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.paperType.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "printingColor":
        return (
          <div className="space-y-2">
            <Label>{productConfig.colorLabel || "Printing Color"}</Label>
            <Select
              value={configuration.printingColor as string}
              onValueChange={(value) => handleFieldChange("printingColor", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select color option" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.printingColor.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "printingSides":
        return (
          <div className="space-y-2">
            <Label>Printing Sides</Label>
            <Select
              value={configuration.printingSides as string}
              onValueChange={(value) => handleFieldChange("printingSides", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select printing sides" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.printingSides.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "bindingOptions":
        return (
          <div className="space-y-2">
            <Label>Binding Options</Label>
            <Select
              value={configuration.bindingOptions as string}
              onValueChange={(value) => handleFieldChange("bindingOptions", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select binding" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.bindingOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "coverOption":
        return (
          <div className="space-y-2">
            <Label>Cover Option</Label>
            <Select
              value={configuration.coverOption as string}
              onValueChange={(value) => handleFieldChange("coverOption", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cover" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.coverOption.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "size":
        return (
          <div className="space-y-2">
            <Label>Size</Label>
            <Select
              value={configuration.size as string}
              onValueChange={(value) => handleFieldChange("size", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.size.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "paper":
        return (
          <div className="space-y-2">
            <Label>Paper Finish</Label>
            <Select
              value={configuration.paper as string}
              onValueChange={(value) => handleFieldChange("paper", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select paper finish" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.paper.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "laminationType":
        return (
          <div className="space-y-2">
            <Label>Lamination</Label>
            <Select
              value={configuration.laminationType as string}
              onValueChange={(value) => handleFieldChange("laminationType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select lamination" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.laminationType.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "corner":
        return (
          <div className="space-y-2">
            <Label>Corner Style</Label>
            <Select
              value={configuration.corner as string}
              onValueChange={(value) => handleFieldChange("corner", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select corner style" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.corner.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "mugColor":
        return (
          <div className="space-y-2">
            <Label>Mug Color</Label>
            <Select
              value={configuration.mugColor as string}
              onValueChange={(value) => handleFieldChange("mugColor", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select mug color" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.mugColor.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "cushionType":
        return (
          <div className="space-y-2">
            <Label>Cushion Type</Label>
            <Select
              value={configuration.cushionType as string}
              onValueChange={(value) => handleFieldChange("cushionType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cushion type" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.cushionType.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "frameType":
        return (
          <div className="space-y-2">
            <Label>Frame Type</Label>
            <Select
              value={configuration.frameType as string}
              onValueChange={(value) => handleFieldChange("frameType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frame type" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.frameType.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "material":
        return (
          <div className="space-y-2">
            <Label>Material</Label>
            <Select
              value={configuration.material as string}
              onValueChange={(value) => handleFieldChange("material", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.material.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "displayType":
        return (
          <div className="space-y-2">
            <Label>Display Type</Label>
            <Select
              value={configuration.displayType as string}
              onValueChange={(value) => handleFieldChange("displayType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select display type" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.displayType.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "billBookType":
        return (
          <div className="space-y-2">
            <Label>Bill Book Type</Label>
            <Select
              value={configuration.billBookType as string}
              onValueChange={(value) => handleFieldChange("billBookType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.billBookType.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl text-gray-900 mb-2">Configure Your Order</h1>
          <p className="text-gray-600">
            {category.name} → {product.name}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Configuration Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl text-gray-900 mb-6">Product Specifications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {productConfig.fields.map((field) => (
                  <div key={field}>{renderField(field)}</div>
                ))}
              </div>

              {/* File Upload Section */}
              <div className="mt-8">
                <Separator className="mb-6" />
                <h3 className="text-lg text-gray-900 mb-4">Upload Your Files</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      Drag and drop your files here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 50MB each)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm text-gray-700">Uploaded Files ({uploadedFiles.length})</h4>
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                            <Upload className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFile(index)}
                          className="flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl text-gray-900 mb-4">Order Summary</h2>
              <Separator className="mb-4" />

              <div className="space-y-3 mb-6">
                {Object.entries(configuration).map(([key, value]) => {
                  if (value && value !== "none") {
                    const label = key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase());
                    return (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600">{label}:</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              <Separator className="mb-4" />

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900 flex items-center">
                    <IndianRupee className="w-3 h-3" />
                    {calculatedPrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%):</span>
                  <span className="text-gray-900 flex items-center">
                    <IndianRupee className="w-3 h-3" />
                    {Math.round(calculatedPrice * 0.18)}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-2xl text-blue-600 flex items-center">
                    <IndianRupee className="w-5 h-5" />
                    {Math.round(calculatedPrice * 1.18)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  ✓ Free shipping on orders above ₹500
                </p>
                <p className="text-sm text-green-800">
                  ✓ Estimated delivery: 3-5 business days
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
