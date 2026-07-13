import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { cn } from "@/utils/cn";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

// DEV-ONLY: lets you preview any role without a real backend.
// Remove this selector once real login returns the role from the server.
const DEV_ROLE_OPTIONS = [
  {
    value: ROLES.CUSTOMER,
    label: "Customer",
    redirectTo: "/account",
    prefixes: ["/account", "/cart", "/checkout", "/orders"],
  },
  {
    value: ROLES.VENDOR,
    label: "Vendor",
    redirectTo: "/vendor",
    prefixes: ["/vendor"],
  },
  {
    value: ROLES.ADMIN,
    label: "Admin",
    redirectTo: "/admin",
    prefixes: ["/admin"],
  },
];

// TODO: Replace mock submit with POST /auth/login (see 08_API_MAPPING.md).
// The role select below is a temporary dev aid — production login should
// get the role back from the server response, not let the user pick it.
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [devRole, setDevRole] = useState(ROLES.CUSTOMER);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const onSubmit = async (data) => {
    // Mock auth — replace with real authService.login(data) call.
    await new Promise((r) => setTimeout(r, 600));
    const roleOption = DEV_ROLE_OPTIONS.find((r) => r.value === devRole);
    login(
      { name: "Jordan Reyes", email: data.email, role: devRole },
      "mock-token",
    );
    showToast("Logged in successfully", TOAST_TYPES.SUCCESS);

    // Only honor a "came from" redirect if it actually belongs to the role
    // the person just logged in as — otherwise a stale redirect from an
    // earlier, different-role attempt could bounce them to a page their
    // new role can't access (e.g. /account after logging in as Vendor).
    const fromPath = location.state?.from?.pathname;
    const fromMatchesRole =
      fromPath &&
      roleOption.prefixes.some((prefix) => fromPath.startsWith(prefix));
    navigate(fromMatchesRole ? fromPath : roleOption.redirectTo, {
      replace: true,
    });
  };

  // DEMO: simulates the redirect-and-callback round trip of a real Google
  // OAuth flow. TODO: Replace with real Google OAuth once a backend
  // /auth/google endpoint exists.
  // const handleGoogleLogin = async () => {
  //   setIsGoogleLoading(true);
  //   await new Promise((r) => setTimeout(r, 900));
  //   const roleOption = DEV_ROLE_OPTIONS.find((r) => r.value === devRole);
  //   login(
  //     { name: "Jordan Reyes", email: "jordan.reyes@gmail.com", role: devRole },
  //     "mock-google-token",
  //   );
  //   setIsGoogleLoading(false);
  //   showToast("Signed in with Google", TOAST_TYPES.SUCCESS);
  //   navigate(roleOption.redirectTo, { replace: true });
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
      title="Welcome back"
      subtitle="Log in to continue to Vendora"
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-brand-700">
            Register
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-brand-700"
          >
            Forgot password?
          </Link>
        </div>

        <div className="rounded-md border border-dashed border-stone-200 bg-stone-50 p-3">
          <p className="text-xs font-medium text-stone-500">
            Dev preview — log in as:
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {DEV_ROLE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setDevRole(option.value)}
                className={cn(
                  "rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                  devRole === option.value
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-stone-200 bg-white text-stone-600 hover:bg-stone-100",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mt-2"
        >
          Log in
        </Button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-stone-200" />
          <span className="text-xs text-stone-400">or</span>
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        {/* <GoogleButton onClick={handleGoogleLogin} isLoading={isGoogleLoading} /> */}
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
