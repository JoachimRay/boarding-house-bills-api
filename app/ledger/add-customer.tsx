"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useProfile } from "@/hooks/use-profile";

export function AddCustomer() {
  const profile = useProfile();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("0");
  const [lastPaid, setLastPaid] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!profile || profile.role !== "admin") return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaving(true);

    const { data } = await supabase.auth.getSession();
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session?.access_token ?? ""}`,
      },
      body: JSON.stringify({ name, balance: Number(balance), lastPaid }),
    });

    const result = (await response.json()) as { error?: string };
    setSaving(false);

    if (!response.ok) {
      setError(result.error ?? "Unable to add customer.");
      return;
    }

    setName("");
    setBalance("0");
    setLastPaid("");
    setOpen(false);
    window.location.reload();
  }

  return (
    <div className="mt-8 border-t border-zinc-800 pt-6">
      <button type="button" onClick={() => setOpen((value) => !value)} className="border border-white px-4 py-3 text-sm font-bold hover:bg-white hover:text-black">
        {open ? "Cancel" : "+ Add customer"}
      </button>
      {open && (
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 border border-zinc-800 p-5 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm">Name<input required value={name} onChange={(event) => setName(event.target.value)} className="border border-zinc-800 bg-black px-3 py-3 outline-none focus:border-white" /></label>
          <label className="flex flex-col gap-2 text-sm">Balance<input required min="0" step="0.01" type="number" value={balance} onChange={(event) => setBalance(event.target.value)} className="border border-zinc-800 bg-black px-3 py-3 outline-none focus:border-white" /></label>
          <label className="flex flex-col gap-2 text-sm">Last paid<input value={lastPaid} onChange={(event) => setLastPaid(event.target.value)} placeholder="e.g. Oct 5" className="border border-zinc-800 bg-black px-3 py-3 outline-none focus:border-white" /></label>
          <div className="md:col-span-3">
            {error && <p className="mb-3 text-sm text-red-400" role="alert">{error}</p>}
            <button type="submit" disabled={saving} className="border border-white px-4 py-3 text-sm font-bold hover:bg-white hover:text-black disabled:opacity-50">{saving ? "Adding..." : "Save customer"}</button>
          </div>
        </form>
      )}
    </div>
  );
}
