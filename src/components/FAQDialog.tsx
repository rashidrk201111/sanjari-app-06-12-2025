import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FAQ } from "../context/AdminContext";
import { HelpCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface FAQDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faq?: FAQ | null;
  onSave: (faq: FAQ) => void;
}

export function FAQDialog({ open, onOpenChange, faq, onSave }: FAQDialogProps) {
  const [question, setQuestion] = useState(faq?.question || "");
  const [answer, setAnswer] = useState(faq?.answer || "");
  const [category, setCategory] = useState(faq?.category || "General");

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
      setCategory(faq.category || "General");
    } else {
      setQuestion("");
      setAnswer("");
      setCategory("General");
    }
  }, [faq, open]);

  const handleSave = () => {
    if (!question.trim() || !answer.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const newFAQ: FAQ = {
      id: faq?.id || `faq_${Date.now()}`,
      question: question.trim(),
      answer: answer.trim(),
      category,
    };

    onSave(newFAQ);
    toast.success(faq ? "FAQ updated!" : "FAQ added!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            {faq ? "Edit FAQ" : "Add New FAQ"}
          </DialogTitle>
          <DialogDescription>
            Add or edit frequently asked questions for your customers
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Pricing">Pricing</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Shipping">Shipping</SelectItem>
                <SelectItem value="Returns">Returns</SelectItem>
                <SelectItem value="Account">Account</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="question">Question *</Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What is your question?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer">Answer *</Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Provide a detailed answer..."
              rows={6}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            {faq ? "Update FAQ" : "Add FAQ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
