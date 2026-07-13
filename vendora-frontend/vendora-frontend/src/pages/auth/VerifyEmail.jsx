import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";

// TODO: Replace mock calls with GET /auth/send-verification-otp and
// POST /auth/verify-email (see 08_API_MAPPING.md)
export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      setError("Enter the 6-digit code sent to your email");
      return;
    }
    setError("");
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    showToast("Email verified", TOAST_TYPES.SUCCESS);
    navigate("/login");
  };

  return (
    <AuthCard
      title="Verify your email"
      subtitle={email ? `We sent a code to ${email}` : "Enter the code sent to your email"}
      footer={
        <>
          Didn't get a code?{" "}
          <button className="font-medium text-brand-700" onClick={() => showToast("Code resent", TOAST_TYPES.INFO)}>
            Resend
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Verification code"
          inputMode="numeric"
          maxLength={6}
          placeholder="••••••"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          error={error}
        />
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Verify Email
        </Button>
      </form>
      <p className="mt-4 text-center text-xs text-stone-400">
        Wrong email?{" "}
        <Link to="/register" className="font-medium text-brand-700">
          Go back
        </Link>
      </p>
    </AuthCard>
  );
}
