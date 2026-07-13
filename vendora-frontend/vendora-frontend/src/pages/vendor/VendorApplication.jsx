import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";
import { cn } from "@/utils/cn";

const STEPS = ["Business Info", "Contact Details", "Review"];

const schema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessType: z.string().min(1, "Select a business type"),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().min(1, "Email is required").email("Enter a valid email"),
  contactPhone: z.string().min(7, "Enter a valid phone number"),
});

// TODO: Replace mock submit with POST /vendor/post (see 08_API_MAPPING.md)
export default function VendorApplication() {
  const [step, setStep] = useState(0);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), mode: "onBlur" });

  const next = async () => {
    const fieldsByStep = [
      ["businessName", "businessType"],
      ["contactName", "contactEmail", "contactPhone"],
    ];
    const valid = await trigger(fieldsByStep[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    showToast("Application submitted", TOAST_TYPES.SUCCESS);
    navigate("/vendor/application-status");
  };

  const values = getValues();

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-xl font-semibold text-stone-900">Become a Vendor</h1>

      <div className="mt-6 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold",
                i < step ? "bg-brand-600 text-white" : i === step ? "bg-brand-100 text-brand-700" : "bg-stone-100 text-stone-400"
              )}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && <div className={cn("mx-2 h-0.5 flex-1", i < step ? "bg-brand-600" : "bg-stone-100")} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 rounded-card border border-stone-200 bg-white p-6 shadow-soft" noValidate>
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <Input label="Business name" error={errors.businessName?.message} {...register("businessName")} />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-stone-700">Business type</label>
              <select
                {...register("businessType")}
                className="h-11 rounded-sm border border-stone-300 bg-white px-3 text-sm text-stone-800"
              >
                <option value="">Select type</option>
                <option value="individual">Individual / Sole proprietor</option>
                <option value="company">Registered company</option>
              </select>
              {errors.businessType && <p className="text-xs text-error-600">{errors.businessType.message}</p>}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <Input label="Contact name" error={errors.contactName?.message} {...register("contactName")} />
            <Input label="Contact email" type="email" error={errors.contactEmail?.message} {...register("contactEmail")} />
            <Input label="Contact phone" type="tel" error={errors.contactPhone?.message} {...register("contactPhone")} />
          </div>
        )}

        {step === 2 && (
          <dl className="space-y-3 text-sm">
            {Object.entries(values).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-stone-100 pb-2">
                <dt className="capitalize text-stone-500">{key.replace(/([A-Z])/g, " $1")}</dt>
                <dd className="font-medium text-stone-800">{value || "—"}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-8 flex justify-between">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={next}>
              Continue
            </Button>
          ) : (
            <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
              Submit Application
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
