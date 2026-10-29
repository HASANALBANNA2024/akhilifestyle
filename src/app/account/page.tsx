"use client";
import { useState } from "react";
import { AccountMenu } from "@/components/account/AccountMenu";
import { PageTitle } from "@/components/account/PageTitle";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { authApi } from "@/lib/api/auth";
import { errorMessage } from "@/lib/errors";

// প্রোফাইল: নাম ও ইমেইল এডিট (PATCH /me)
export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const toast = useToast();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [busy, setBusy] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      setUser(await authApi.updateMe({ name: name.trim() || null, email: email.trim() || null }));
      toast("প্রোফাইল আপডেট হয়েছে");
    } catch (err) { toast(errorMessage(err), "error"); }
    finally { setBusy(false); }
  };

  return (
    <>
      <div className="mb-5 flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-2xl font-bold text-brand-600">{(user?.name || "A").charAt(0).toUpperCase()}</span>
        <div>
          <p className="text-lg font-bold">{user?.name || "আপনার নাম যোগ করুন"}</p>
          <p className="text-sm text-muted">{user?.phone}</p>
        </div>
      </div>

      <AccountMenu className="mb-5 md:hidden" />

      <PageTitle title="আমার প্রোফাইল" />
      <form onSubmit={save} className="max-w-lg space-y-4 rounded-2xl border border-line bg-white p-5">
        <Input label="মোবাইল নম্বর" value={user?.phone ?? ""} disabled readOnly hint="নম্বর বদলানো যায় না" />
        <Input label="আপনার নাম" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="ইমেইল (ঐচ্ছিক)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" loading={busy}>সংরক্ষণ করুন</Button>
      </form>
    </>
  );
}
