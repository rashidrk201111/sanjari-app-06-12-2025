import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Staff } from "../context/AdminContext";
import { UserCog, Shield, User, Briefcase } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface StaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff?: Staff | null;
  onSave: (staff: Staff & { password?: string }) => Promise<{ success: boolean; error?: string }>;
}

const roleIcons = {
  admin: Shield,
  manager: Briefcase,
  staff: User,
  support: UserCog,
};

const roleDescriptions = {
  admin: "Full access to all system features and settings",
  manager: "Can manage orders, users, and content",
  staff: "Can view and process orders",
  support: "Can view and respond to customer inquiries",
};

export function StaffDialog({ open, onOpenChange, staff, onSave }: StaffDialogProps) {
  const [name, setName] = useState(staff?.name || "");
  const [email, setEmail] = useState(staff?.email || "");
  const [phone, setPhone] = useState(staff?.phone || "");
  const [role, setRole] = useState<Staff["role"]>(staff?.role || "staff");
  const [department, setDepartment] = useState(staff?.department || "");
  const [isActive, setIsActive] = useState(staff?.isActive ?? true);
  const [password, setPassword] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (staff) {
      setName(staff.name);
      setEmail(staff.email);
      setPhone(staff.phone || "");
      setRole(staff.role);
      setDepartment(staff.department || "");
      setIsActive(staff.isActive);
      setPassword("");
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setRole("staff");
      setDepartment("");
      setIsActive(true);
      setPassword("");
    }
    setIsRateLimited(false);
    setCountdown(0);
  }, [staff, open]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isRateLimited) {
      setIsRateLimited(false);
    }
  }, [countdown, isRateLimited]);

  const handleSave = async () => {
    if (!name.trim() || !email.trim() || !role) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password required for new staff
    if (!staff && !password.trim()) {
      toast.error("Password is required for new staff");
      return;
    }

    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const newStaff: Staff & { password?: string } = {
      id: staff?.id || `staff_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role,
      department: department.trim(),
      isActive,
      joinedDate: staff?.joinedDate || new Date().toISOString().split('T')[0],
      lastLogin: staff?.lastLogin,
    };

    // If password is provided, include it
    if (password) {
      newStaff.password = password;
    }

    // Call onSave and wait for result
    const result = await onSave(newStaff);
    
    // Check for rate limit error
    if (!result.success && result.error?.includes("RATE_LIMIT")) {
      setIsRateLimited(true);
      setCountdown(30);
      return;
    }
    
    // Only close dialog if successful
    if (result.success) {
      onOpenChange(false);
    }
  };

  const RoleIcon = roleIcons[role];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCog className="w-5 h-5" />
            {staff ? "Edit Staff Member" : "Add New Staff Member"}
          </DialogTitle>
          <DialogDescription>
            {staff ? "Update staff member information and permissions" : "Add a new staff member with role-based access"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="staffName">Full Name *</Label>
            <Input
              id="staffName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="staffEmail">Email *</Label>
            <Input
              id="staffEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@sanjariprints.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="staffPhone">Phone Number</Label>
            <Input
              id="staffPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="staffRole">Role *</Label>
            <Select value={role} onValueChange={(value) => setRole(value as Staff["role"])}>
              <SelectTrigger id="staffRole">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </div>
                </SelectItem>
                <SelectItem value="manager">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Manager</span>
                  </div>
                </SelectItem>
                <SelectItem value="staff">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Staff</span>
                  </div>
                </SelectItem>
                <SelectItem value="support">
                  <div className="flex items-center gap-2">
                    <UserCog className="w-4 h-4" />
                    <span>Support</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 flex items-start gap-2">
              <RoleIcon className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{roleDescriptions[role]}</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="staffDepartment">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger id="staffDepartment">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="customer-service">Customer Service</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="quality-control">Quality Control</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!staff && (
            <div className="space-y-2">
              <Label htmlFor="staffPassword">Password *</Label>
              <Input
                id="staffPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
              />
              {isRateLimited && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                  <p className="text-xs text-amber-800 flex items-center gap-2">
                    <span className="text-base">⏱️</span>
                    <span>
                      <strong>Rate limit reached!</strong> Please wait {countdown} seconds before creating another staff account.
                      This is a Supabase security feature.
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {staff && (
            <div className="space-y-2">
              <Label htmlFor="staffPasswordReset">Reset Password (optional)</Label>
              <Input
                id="staffPasswordReset"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
              />
            </div>
          )}

          <div className="flex items-center justify-between space-x-2 pt-2 border-t">
            <Label htmlFor="staffActive" className="cursor-pointer">
              Account Active
            </Label>
            <Switch
              id="staffActive"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isRateLimited}
          >
            {isRateLimited 
              ? `Wait ${countdown}s...` 
              : staff ? "Update Staff" : "Add Staff"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
