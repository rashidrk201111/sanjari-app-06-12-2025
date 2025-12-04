import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Star, Check, X, Trash2, Search, Filter } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useAdmin } from "../../context/AdminContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function ReviewsTab() {
  const { reviews, approveReview, deleteReview } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending">("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (review.company && review.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "approved" && review.isApproved) ||
      (filterStatus === "pending" && !review.isApproved);

    return matchesSearch && matchesStatus;
  });

  // Sort: Pending first, then by date
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (!a.isApproved && b.isApproved) return -1;
    if (a.isApproved && !b.isApproved) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleApprove = (id: string) => {
    approveReview(id);
    toast.success("Review approved successfully!");
  };

  const handleDeleteClick = (id: string) => {
    setReviewToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (reviewToDelete) {
      deleteReview(reviewToDelete);
      toast.success("Review deleted successfully!");
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    }
  };

  const pendingCount = reviews.filter((r) => !r.isApproved).length;
  const approvedCount = reviews.filter((r) => r.isApproved).length;
  const totalCount = reviews.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Reviews Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage customer reviews and testimonials
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-3xl mt-2">{totalCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-3xl mt-2 text-green-600">{approvedCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-3xl mt-2 text-orange-600">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Filter className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search reviews by name, content, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Reviews Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedReviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No reviews found
                  </TableCell>
                </TableRow>
              ) : (
                sortedReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div>
                        <div className="text-gray-900">{review.name}</div>
                        {review.role && review.company && (
                          <div className="text-xs text-gray-500">
                            {review.role}, {review.company}
                          </div>
                        )}
                        {review.role && !review.company && (
                          <div className="text-xs text-gray-500">{review.role}</div>
                        )}
                        {!review.role && review.company && (
                          <div className="text-xs text-gray-500">{review.company}</div>
                        )}
                        {review.email && (
                          <div className="text-xs text-gray-400">{review.email}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {review.content}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {new Date(review.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      {review.isDefault ? (
                        <Badge className="bg-purple-100 text-purple-800">Default</Badge>
                      ) : review.isApproved ? (
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      ) : (
                        <Badge className="bg-orange-100 text-orange-800">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {!review.isApproved && !review.isDefault && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(review.id)}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        )}
                        {!review.isDefault && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteClick(review.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                        {review.isDefault && (
                          <Badge variant="outline" className="text-xs">
                            Cannot Delete
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Info Card */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg text-blue-900 mb-3">ℹ️ Review Management Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• <strong>Default reviews</strong> (3 Indian names) cannot be deleted</li>
          <li>• New reviews require admin approval before being displayed</li>
          <li>• Approved reviews appear on the homepage testimonials section</li>
          <li>• Reviews are sorted with default reviews first, then by date</li>
          <li>• Customer emails are hidden from public view</li>
          <li>• Pending reviews are highlighted for quick action</li>
        </ul>
      </Card>
    </div>
  );
}
