import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthCard from "@/components/auth/AuthCard";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

// TODO: Replace mock submit with POST /auth/forgot-password
export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const { showToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 600));
    showToast("Reset code sent to your email", TOAST_TYPES.SUCCESS);
    navigate("/reset-password", { state: { email: data.email } });
  };

  return (
    <AuthCard
      title="Forgot your password?"
      subtitle="We'll send a reset code to your email"
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="font-medium text-brand-700">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Send reset code
        </Button>
      </form>
    </AuthCard>
  );
}
