"use client";

import { useProfile } from "@/hooks/use-profile";
import { supabase } from "@/lib/supabase";

export default function AccountScreen() {
  const profile = useProfile();

  return (
    <main className="mx-auto flex min-h-[calc(100vh-77px)] w-[calc(100%-32px)] max-w-[1000px] flex-col gap-5 py-12">
      <p className="text-xs uppercase tracking-[1px] text-zinc-400">ACCOUNT</p>
      <h1 className="text-4xl font-bold">{profile?.email ?? "Account"}</h1>
      <p className="text-zinc-400">Role: {profile?.role ?? "user"}</p>
      <button
        type="button"
        onClick={() => void supabase.auth.signOut()}
        className="w-fit border border-white px-4 py-3 text-sm font-bold hover:bg-white hover:text-black"
      >
        Sign out
      </button>
    </main>
  );
}
