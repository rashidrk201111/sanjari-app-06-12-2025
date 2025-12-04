import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PricingRule } from "../context/AdminContext";
import { categories } from "../data/categories";
import { Plus, Trash2, DollarSign } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PricingRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule?: PricingRule | null;
  onSave: (rule: PricingRule) => void;
}

export function PricingRuleDialog({ open, onOpenChange, rule, onSave }: PricingRuleDialogProps) {
  const [categorySlug, setCategorySlug] = useState(rule?.category || "");
  const [subcategory, setSubcategory] = useState(rule?.subcategory || "");
  const [basePrice, setBasePrice] = useState(rule?.basePrice.toString() || "");
  const [paperTypes, setPaperTypes] = useState(rule?.paperTypes || [{ name: "", priceModifier: 0 }]);
  const [bindingTypes, setBindingTypes] = useState(rule?.bindingTypes || []);
  const [quantityDiscounts, setQuantityDiscounts] = useState(rule?.quantityDiscounts || [{ minQty: 1, discount: 0 }]);

  const selectedCategory = categories.find(c => c.slug === categorySlug);
  const subcategories = selectedCategory?.subcategories || [];

  // Reset form when rule changes
  useEffect(() => {
    if (rule) {
      setCategorySlug(rule.category);
      setSubcategory(rule.subcategory);
      setBasePrice(rule.basePrice.toString());
      setPaperTypes(rule.paperTypes);
      setBindingTypes(rule.bindingTypes || []);
      setQuantityDiscounts(rule.quantityDiscounts);
    } else {
      setCategorySlug("");
      setSubcategory("");
      setBasePrice("2.00");
      setPaperTypes([
        { name: "70 GSM", priceModifier: 0 },
        { name: "80 GSM", priceModifier: 0.5 },
        { name: "100 GSM", priceModifier: 1.0 },
      ]);
      setBindingTypes([]);
      setQuantityDiscounts([
        { minQty: 1, discount: 0 },
        { minQty: 50, discount: 5 },
        { minQty: 100, discount: 10 },
        { minQty: 500, discount: 15 },
      ]);
    }
  }, [rule, open]);

  // Listen for pre-fill events from quick add
  useEffect(() => {
    const handlePrefill = (event: any) => {
      const { categorySlug: catSlug, subcategoryName } = event.detail;
      if (catSlug && subcategoryName) {
        setCategorySlug(catSlug);
        setSubcategory(subcategoryName);
      }
    };

    window.addEventListener('prefillPricingRule', handlePrefill);
    return () => window.removeEventListener('prefillPricingRule', handlePrefill);
  }, []);

  const handleSave = () => {
    // Validation
    if (!categorySlug || !subcategory || !basePrice) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (paperTypes.some(p => !p.name)) {
      toast.error("Please fill in all paper type names");
      return;
    }

    const newRule: PricingRule = {
      id: rule?.id || `rule_${Date.now()}`,
      category: categorySlug,
      subcategory,
      basePrice: parseFloat(basePrice),
      paperTypes: paperTypes.filter(p => p.name),
      bindingTypes: bindingTypes.filter(b => b.name),
      quantityDiscounts: quantityDiscounts.filter(q => q.minQty > 0),
    };

    onSave(newRule);
    toast.success(rule ? "Pricing rule updated!" : "Pricing rule added!");
    onOpenChange(false);
  };

  const addPaperType = () => {
    setPaperTypes([...paperTypes, { name: "", priceModifier: 0 }]);
  };

  const removePaperType = (index: number) => {
    setPaperTypes(paperTypes.filter((_, i) => i !== index));
  };

  const updatePaperType = (index: number, field: "name" | "priceModifier", value: string | number) => {
    const updated = [...paperTypes];
    updated[index] = { ...updated[index], [field]: value };
    setPaperTypes(updated);
  };

  const addBindingType = () => {
    setBindingTypes([...bindingTypes, { name: "", price: 0 }]);
  };

  const removeBindingType = (index: number) => {
    setBindingTypes(bindingTypes.filter((_, i) => i !== index));
  };

  const updateBindingType = (index: number, field: "name" | "price", value: string | number) => {
    const updated = [...bindingTypes];
    updated[index] = { ...updated[index], [field]: value };
    setBindingTypes(updated);
  };

  const addQuantityDiscount = () => {
    setQuantityDiscounts([...quantityDiscounts, { minQty: 0, discount: 0 }]);
  };

  const removeQuantityDiscount = (index: number) => {
    setQuantityDiscounts(quantityDiscounts.filter((_, i) => i !== index));
  };

  const updateQuantityDiscount = (index: number, field: "minQty" | "discount", value: number) => {
    const updated = [...quantityDiscounts];
    updated[index] = { ...updated[index], [field]: value };
    setQuantityDiscounts(updated);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            {rule ? "Edit Pricing Rule" : "Add New Pricing Rule"}
          </DialogTitle>
          <DialogDescription>
            Configure pricing for a product subcategory. Default values are pre-filled to help you get started.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Category & Subcategory */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={categorySlug} onValueChange={(value) => {
                setCategorySlug(value);
                setSubcategory(""); // Reset subcategory when category changes
              }}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory *</Label>
              {subcategories.length > 0 ? (
                <Select value={subcategory} onValueChange={setSubcategory}>
                  <SelectTrigger id="subcategory">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map(sub => (
                      <SelectItem key={sub.slug} value={sub.name}>{sub.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="subcategory"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  placeholder="Enter subcategory name"
                  disabled={!categorySlug}
                />
              )}
              {categorySlug && subcategories.length === 0 && (
                <p className="text-xs text-gray-500">This category has no predefined subcategories. Enter a custom name.</p>
              )}
            </div>
          </div>

          {/* Base Price */}
          <div className="space-y-2">
            <Label htmlFor="basePrice">Base Price (₹ per unit/page) *</Label>
            <Input
              id="basePrice"
              type="number"
              step="0.01"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              placeholder="2.50"
            />
          </div>

          {/* Paper Types */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Paper Types / Options *</Label>
              <Button type="button" variant="outline" size="sm" onClick={addPaperType}>
                <Plus className="w-4 h-4 mr-1" />
                Add Paper Type
              </Button>
            </div>
            <div className="space-y-2">
              {paperTypes.map((paper, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Paper name (e.g., 80 GSM)"
                    value={paper.name}
                    onChange={(e) => updatePaperType(index, "name", e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Price modifier"
                    value={paper.priceModifier}
                    onChange={(e) => updatePaperType(index, "priceModifier", parseFloat(e.target.value) || 0)}
                    className="w-32"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removePaperType(index)}
                    disabled={paperTypes.length === 1}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Binding Types (Optional) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Binding Types (Optional)</Label>
              <Button type="button" variant="outline" size="sm" onClick={addBindingType}>
                <Plus className="w-4 h-4 mr-1" />
                Add Binding Type
              </Button>
            </div>
            <div className="space-y-2">
              {bindingTypes.map((binding, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Binding name (e.g., Spiral Binding)"
                    value={binding.name}
                    onChange={(e) => updateBindingType(index, "name", e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={binding.price}
                    onChange={(e) => updateBindingType(index, "price", parseFloat(e.target.value) || 0)}
                    className="w-32"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBindingType(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Discounts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Quantity-Based Discounts *</Label>
              <Button type="button" variant="outline" size="sm" onClick={addQuantityDiscount}>
                <Plus className="w-4 h-4 mr-1" />
                Add Discount Tier
              </Button>
            </div>
            <div className="space-y-2">
              {quantityDiscounts.map((discount, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span className="text-sm text-gray-600 w-20">From</span>
                  <Input
                    type="number"
                    placeholder="Min Qty"
                    value={discount.minQty}
                    onChange={(e) => updateQuantityDiscount(index, "minQty", parseInt(e.target.value) || 0)}
                    className="w-28"
                  />
                  <span className="text-sm text-gray-600">units:</span>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Discount %"
                    value={discount.discount}
                    onChange={(e) => updateQuantityDiscount(index, "discount", parseFloat(e.target.value) || 0)}
                    className="w-28"
                  />
                  <span className="text-sm text-gray-600">% off</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuantityDiscount(index)}
                    disabled={quantityDiscounts.length === 1}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            {rule ? "Update Rule" : "Add Rule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
