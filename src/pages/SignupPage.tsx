import { useState, useMemo } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Checkbox } from "../components/ui/checkbox";
import { Card } from "../components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextSupabase";

export function SignupPage() {
  const navigate = useNavigate();
  const { signup, socialLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Real-time validation
  const validation = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    
    return {
      fullName: formData.fullName.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(formData.fullName.trim()),
      email: emailRegex.test(formData.email),
      phone: phoneRegex.test(formData.phone) && ['6', '7', '8', '9'].includes(formData.phone[0]),
      password: formData.password.length >= 8 && 
                /(?=.*[a-z])/.test(formData.password) && 
                /(?=.*[A-Z])/.test(formData.password) && 
                /(?=.*[0-9])/.test(formData.password),
      confirmPassword: formData.confirmPassword === formData.password && formData.confirmPassword.length > 0,
    };
  }, [formData]);

  // Password strength calculator
  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;

    if (strength <= 1) return { strength: 20, label: "Weak", color: "bg-red-500" };
    if (strength <= 2) return { strength: 40, label: "Fair", color: "bg-orange-500" };
    if (strength <= 3) return { strength: 60, label: "Good", color: "bg-yellow-500" };
    if (strength <= 4) return { strength: 80, label: "Strong", color: "bg-blue-500" };
    return { strength: 100, label: "Very Strong", color: "bg-green-500" };
  };

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation - Check empty fields
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Name validation
    if (formData.fullName.trim().length < 2) {
      toast.error("Please enter your full name (at least 2 characters)");
      setIsLoading(false);
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
      toast.error("Name should contain only letters and spaces");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Additional email checks
    const emailParts = formData.email.split('@');
    if (emailParts[1] && emailParts[1].indexOf('.') === -1) {
      toast.error("Please enter a valid email domain");
      setIsLoading(false);
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      setIsLoading(false);
      return;
    }

    // Check for valid Indian mobile number starting digits
    if (!['6', '7', '8', '9'].includes(formData.phone[0])) {
      toast.error("Please enter a valid Indian mobile number");
      setIsLoading(false);
      return;
    }

    // Password validation
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    // Strong password check
    if (!/(?=.*[a-z])/.test(formData.password)) {
      toast.error("Password must contain at least one lowercase letter");
      setIsLoading(false);
      return;
    }

    if (!/(?=.*[A-Z])/.test(formData.password)) {
      toast.error("Password must contain at least one uppercase letter");
      setIsLoading(false);
      return;
    }

    if (!/(?=.*[0-9])/.test(formData.password)) {
      toast.error("Password must contain at least one number");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    // Create account with Supabase
    try {
      const result = await signup(
        formData.email,
        formData.password,
        formData.fullName,
        formData.phone
      );

      if (result.success) {
        toast.success("Account created! Please check your email to verify your account.");
        setIsLoading(false);
        
        // Redirect to verify email page
        setTimeout(() => {
          navigate("/verify-email", { 
            state: { email: formData.email } 
          });
        }, 1500);
      } else {
        toast.error(result.error || "Failed to create account. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'facebook') => {
    try {
      toast.info(`Signing up with ${provider}...`);
      
      const result = await socialLogin(provider);
      
      if (!result.success) {
        toast.error(result.error || `Failed to sign up with ${provider}`);
      }
      // Note: User will be redirected to provider's site
      // They'll come back via /auth/callback
    } catch (error) {
      console.error('Social signup error:', error);
      toast.error('An error occurred during signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <Card className="p-8 shadow-xl">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl text-gray-900 mb-2">Create Account</h1>
                <p className="text-gray-600">Sign up to get started with our services</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className={`pl-10 pr-10 h-12 ${
                        touched.fullName && !validation.fullName
                          ? "border-red-500 focus-visible:ring-red-500"
                          : touched.fullName && validation.fullName
                          ? "border-green-500 focus-visible:ring-green-500"
                          : ""
                      }`}
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      onBlur={() => setTouched({ ...touched, fullName: true })}
                    />
                    {touched.fullName && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {validation.fullName ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {touched.fullName && !validation.fullName && (
                    <p className="text-xs text-red-500">Please enter a valid name (letters and spaces only, min 2 characters)</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`pl-10 pr-10 h-12 ${
                        touched.email && !validation.email
                          ? "border-red-500 focus-visible:ring-red-500"
                          : touched.email && validation.email
                          ? "border-green-500 focus-visible:ring-green-500"
                          : ""
                      }`}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onBlur={() => setTouched({ ...touched, email: true })}
                    />
                    {touched.email && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {validation.email ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {touched.email && !validation.email && (
                    <p className="text-xs text-red-500">Please enter a valid email address</p>
                  )}
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">
                    Mobile Number
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your mobile number"
                      className={`pl-10 pr-10 h-12 ${
                        touched.phone && !validation.phone
                          ? "border-red-500 focus-visible:ring-red-500"
                          : touched.phone && validation.phone
                          ? "border-green-500 focus-visible:ring-green-500"
                          : ""
                      }`}
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })
                      }
                      onBlur={() => setTouched({ ...touched, phone: true })}
                    />
                    {touched.phone && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {validation.phone ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {touched.phone && !validation.phone && (
                    <p className="text-xs text-red-500">Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className={`pl-10 pr-10 h-12 ${
                        touched.password && !validation.password
                          ? "border-red-500 focus-visible:ring-red-500"
                          : touched.password && validation.password
                          ? "border-green-500 focus-visible:ring-green-500"
                          : ""
                      }`}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      onBlur={() => setTouched({ ...touched, password: true })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {passwordStrength && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Password Strength:</span>
                        <span className={`${passwordStrength.color.replace('bg-', 'text-')}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {touched.password && !validation.password && (
                    <div className="bg-red-50 border border-red-200 rounded p-3 text-xs space-y-1">
                      <p className="text-red-700">Password must contain:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-red-600">
                        <li className={formData.password.length >= 8 ? "text-green-600" : ""}>At least 8 characters</li>
                        <li className={/(?=.*[a-z])/.test(formData.password) ? "text-green-600" : ""}>One lowercase letter</li>
                        <li className={/(?=.*[A-Z])/.test(formData.password) ? "text-green-600" : ""}>One uppercase letter</li>
                        <li className={/(?=.*[0-9])/.test(formData.password) ? "text-green-600" : ""}>One number</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className={`pl-10 pr-10 h-12 ${
                        touched.confirmPassword && !validation.confirmPassword
                          ? "border-red-500 focus-visible:ring-red-500"
                          : touched.confirmPassword && validation.confirmPassword
                          ? "border-green-500 focus-visible:ring-green-500"
                          : ""
                      }`}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      onBlur={() => setTouched({ ...touched, confirmPassword: true })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {touched.confirmPassword && !validation.confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer leading-tight">
                    I agree to the{" "}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Sign Up Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <Separator />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
                  Or sign up with
                </span>
              </div>

              {/* Social Signup - Google Only */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-2"
                onClick={() => handleSocialSignup("google")}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-900 hover:text-blue-700 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </Card>

          {/* Right Side - Welcome Section */}
          <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-900 to-blue-700 p-12 text-white rounded-2xl shadow-xl relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl mb-6">Join Sanjari Prints Today</h2>
              <p className="text-blue-100 mb-8">Start your printing journey with us</p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>An Account With us Makes your Shopping Experience Easier, Faster and More Powerful!</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>You Can Save Your Time, you don't have to type in your details every time you checkout.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>You Can See Your Order History and track all your orders in real-time.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Be the First to know about Offers, New Products updates and exclusive deals.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>For any Technical Issue Call on +91 7350001266 / 9323684301</p>
                </div>
              </div>

              {/* Decorative element */}
              <div className="mt-12 flex gap-2">
                <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
                <div className="w-12 h-1 bg-blue-400 rounded-full"></div>
                <div className="w-12 h-1 bg-orange-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
