import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function VerifyEmailPage() {
  const location = useLocation();
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const email = location.state?.email || "user@example.com"; // Get email from signup flow

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    setIsResending(true);
    
    try {
      // Resend verification email using Supabase
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        toast.error(error.message || "Failed to resend email. Please try again.");
        setIsResending(false);
        return;
      }

      toast.success("Verification email sent! Please check your inbox.");
      setIsResending(false);
      setCountdown(60);
      setCanResend(false);
    } catch (error: any) {
      console.error("Resend email error:", error);
      toast.error("An error occurred. Please try again.");
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 shadow-xl">
          <div className="space-y-6">
            {/* Back Button */}
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Sign In
            </Link>

            {/* Success Icon */}
            <div className="text-center space-y-4 py-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-10 h-10 text-blue-600" />
              </div>

              <div>
                <h1 className="text-3xl text-gray-900 mb-2">Check Your Email</h1>
                <p className="text-gray-600">
                  We've sent a verification link to
                </p>
                <p className="text-blue-900 mt-1">{email}</p>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-left space-y-3">
                <h3 className="flex items-center gap-2 text-gray-900">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  Next Steps:
                </h3>
                <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside ml-4">
                  <li>Check your email inbox for our verification message</li>
                  <li>Click the verification link in the email</li>
                  <li>You'll be redirected to complete your account setup</li>
                </ol>
              </div>

              {/* Resend Email */}
              <div className="space-y-3 pt-4">
                <p className="text-sm text-gray-600">
                  Didn't receive the email? Check your spam folder or
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12"
                  disabled={!canResend || isResending}
                  onClick={handleResendEmail}
                >
                  {isResending
                    ? "Sending..."
                    : canResend
                    ? "Resend Verification Email"
                    : `Resend in ${countdown}s`}
                </Button>
              </div>

              {/* Change Email */}
              <div className="pt-4">
                <Link
                  to="/signup"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Use a different email address
                </Link>
              </div>
            </div>

            {/* Additional Help */}
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Need help?</strong> Contact our support team at{" "}
                <a
                  href="mailto:sanjariprint@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  sanjariprint@gmail.com
                </a>{" "}
                or call us at{" "}
                <a href="tel:+917350001266" className="text-blue-600 hover:underline">
                  +91 7350001266
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
