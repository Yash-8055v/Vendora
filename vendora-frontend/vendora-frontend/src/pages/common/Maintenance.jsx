import { Wrench } from "lucide-react";

export default function Maintenance() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <Wrench className="h-12 w-12 text-stone-400" />
      <h1 className="font-display text-xl font-semibold text-stone-900">We'll be right back</h1>
      <p className="max-w-sm text-sm text-stone-500">
        Vendora is undergoing scheduled maintenance. Please check back shortly.
      </p>
    </div>
  );
}
