import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthCard from "@/components/auth/AuthCard";
import GoogleButton from "@/components/auth/GoogleButton";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES, ROLES } from "@/constants";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    phone: z.string().min(7, "Enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

// TODO: Replace mock submit with POST /auth/register (see 08_API_MAPPING.md)
// On success: redirect to email verification, per pages spec.
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 600));
    showToast("Account created — verify your email to continue", TOAST_TYPES.SUCCESS);
    navigate("/verify-email", { state: { email: data.email } });
  };

  // DEMO: Google already verifies the person's email, so a real "Continue
  // with Google" signup skips the OTP step and goes straight to logged-in.
  // TODO: Replace with real Google OAuth once a backend /auth/google
  // endpoint exists.
  // const handleGoogleSignup = async () => {
  //   setIsGoogleLoading(true);
  //   await new Promise((r) => setTimeout(r, 900));
  //   login({ name: "Jordan Reyes", email: "jordan.reyes@gmail.com", role: ROLES.CUSTOMER }, "mock-google-token");
  //   setIsGoogleLoading(false);
  //   showToast("Account created with Google", TOAST_TYPES.SUCCESS);
  //   navigate("/account", { replace: true });
  // };

  const handleGoogleSuccess = async (credentialResponse) => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/auth/google",
          {
            idToken: credentialResponse.credential,
          },
          {
            withCredentials: true,
          },
        );
  
        console.log(res.data);
  
        localStorage.setItem("accessToken", res.data.token);
  
        navigate("/");
      } catch (error) {
        console.log(error.response?.data);
      }
    };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join Vendora as a customer"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-brand-700">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Input label="Full name" autoComplete="name" error={errors.name?.message} {...register("name")} />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Phone"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          helperText="At least 8 characters"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} className="mt-2">
          Create account
        </Button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-stone-200" />
          <span className="text-xs text-stone-400">or</span>
          <span className="h-px flex-1 bg-stone-200" />
        </div>
{/* 
        <GoogleButton onClick={handleGoogleSignup} isLoading={isGoogleLoading} label="Continue with Google" /> */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.log("Google Login Failed");
          }}
        />
      </form>
    </AuthCard>
  );
}
