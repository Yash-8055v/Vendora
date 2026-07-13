import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

const VARIANT_CLASSES = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800",
  secondary: "bg-stone-100 text-stone-800 hover:bg-stone-200 active:bg-stone-300",
  outline: "bg-transparent border border-stone-300 text-stone-800 hover:bg-stone-50",
  ghost: "bg-transparent text-stone-700 hover:bg-stone-100",
  danger: "bg-error-500 text-white hover:bg-error-600",
  success: "bg-success-500 text-white hover:bg-success-600",
};

const SIZE_CLASSES = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
  icon: "h-10 w-10 p-0",
};

/**
 * Button — Primary / Secondary / Outline / Ghost / Danger / Success / Icon / Loading.
 * States: default, hover, active, disabled, loading, focus (focus handled globally).
 */
const Button = forwardRef(function Button(
  { variant = "primary", size = "md", isLoading = false, disabled = false, className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
});

export default Button;
