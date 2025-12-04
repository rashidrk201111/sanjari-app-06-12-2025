import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useAdmin, Review } from "../context/AdminContext";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewDialog({ open, onOpenChange }: ReviewDialogProps) {
  const { addReview } = useAdmin();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.content) {
      toast.error("Please fill in required fields");
      return;
    }

    if (formData.content.length < 20) {
      toast.error("Review must be at least 20 characters");
      return;
    }

    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    const newReview: Review = {
      id: `review_${Date.now()}`,
      name: formData.name,
      email: formData.email || undefined,
      role: formData.role || undefined,
      company: formData.company || undefined,
      content: formData.content,
      rating: formData.rating,
      date: new Date().toISOString().split("T")[0],
      isApproved: false, // Reviews need admin approval
      isDefault: false,
    };

    addReview(newReview);
    toast.success("Thank you for your review! It will be published after admin approval.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with Sanjari Prints. Your feedback helps us improve!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <Label>Rating *</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || formData.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              required
              className="mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Email will not be displayed publicly
            </p>
          </div>

          {/* Role */}
          <div>
            <Label htmlFor="role">Your Role (Optional)</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Business Owner, Student, etc."
              className="mt-1"
            />
          </div>

          {/* Company */}
          <div>
            <Label htmlFor="company">Company/Organization (Optional)</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Your Company Name"
              className="mt-1"
            />
          </div>

          {/* Review Content */}
          <div>
            <Label htmlFor="content">Your Review *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Tell us about your experience with our printing services..."
              rows={5}
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 20 characters
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
