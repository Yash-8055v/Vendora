import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthCard from "@/components/auth/AuthCard";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";

const schema = z
  .object({
    otp: z.string().length(6, "Enter the 6-digit code"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// TODO: Replace mock submit with POST /auth/verify-reset-password-otp
// and POST /auth/reset-password (see 08_API_MAPPING.md)
export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const email = location.state?.email;

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    showToast("Password reset successfully", TOAST_TYPES.SUCCESS);
    navigate("/login");
  };

  return (
    <AuthCard
      title="Reset your password"
      subtitle={email ? `Enter the code sent to ${email}` : "Enter the code sent to your email"}
      footer={
        <Link to="/login" className="font-medium text-brand-700">
          Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Input label="Verification code" inputMode="numeric" maxLength={6} error={errors.otp?.message} {...register("otp")} />
        <Input
          label="New password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Reset password
        </Button>
      </form>
    </AuthCard>
  );
}
