import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Star, MessageSquarePlus } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { ReviewDialog } from "./ReviewDialog";

export function Testimonials() {
  const { reviews } = useAdmin();
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  // Get approved reviews only
  const approvedReviews = reviews.filter((review) => review.isApproved);

  // Sort by default first, then by date
  const sortedReviews = [...approvedReviews].sort((a, b) => {
    if (a.isDefault && !b.isDefault) return -1;
    if (!a.isDefault && b.isDefault) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {sortedReviews.map((review) => (
            <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">{review.content}</p>
              <div className="border-t pt-4">
                <div className="text-gray-900">{review.name}</div>
                {review.role && review.company && (
                  <div className="text-sm text-gray-600">
                    {review.role}, {review.company}
                  </div>
                )}
                {review.role && !review.company && (
                  <div className="text-sm text-gray-600">{review.role}</div>
                )}
                {!review.role && review.company && (
                  <div className="text-sm text-gray-600">{review.company}</div>
                )}
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(review.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Write a Review Button */}
        <div className="text-center">
          <Button
            onClick={() => setShowReviewDialog(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <MessageSquarePlus className="w-5 h-5 mr-2" />
            Write a Review
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            Share your experience with Sanjari Prints
          </p>
        </div>

        {/* Review Dialog */}
        <ReviewDialog open={showReviewDialog} onOpenChange={setShowReviewDialog} />
      </div>
    </section>
  );
}
