import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";

// TODO: Replace mock submit with the profile update API once confirmed.
export default function Profile() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsSaving(false);
    setEditing(false);
    showToast("Profile updated", TOAST_TYPES.SUCCESS);
  };

  return (
    <div className="max-w-lg">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-stone-900">Profile</h1>
        {!editing && (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            Edit profile
          </Button>
        )}
      </div>

      <form onSubmit={handleSave} className="mt-6 flex flex-col gap-4">
        <Input label="Full name" defaultValue={user?.name ?? ""} disabled={!editing} />
        <Input label="Email" type="email" defaultValue={user?.email ?? ""} disabled={!editing} />
        <Input label="Phone" type="tel" placeholder="Add a phone number" disabled={!editing} />

        {editing && (
          <div className="mt-2 flex gap-2">
            <Button type="submit" isLoading={isSaving} disabled={isSaving}>
              Save changes
            </Button>
            <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
