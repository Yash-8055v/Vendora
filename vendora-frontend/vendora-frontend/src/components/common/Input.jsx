import { forwardRef, useId } from "react";
import { cn } from "@/utils/cn";

/**
 * Input — text/email/password/number/search via the `type` prop.
 * Supports label, helper text, validation message, success/error state.
 */
const Input = forwardRef(function Input(
  { label, helperText, error, success, className, type = "text", id, ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error || helperText ? `${inputId}-description` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-stone-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          "h-11 rounded-sm border bg-white px-3 text-sm text-stone-800 placeholder:text-stone-400",
          "transition-colors duration-150 focus:border-brand-400",
          error
            ? "border-error-500"
            : success
            ? "border-success-500"
            : "border-stone-300",
          "disabled:bg-stone-50 disabled:text-stone-400 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-description`} className="text-xs text-error-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-description`} className="text-xs text-stone-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
