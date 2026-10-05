"use client";

import { type ReactNode } from "react";
import { useSession } from "@/hooks/use-session";
import { SignIn } from "./sign-in";

export function AuthGate({ children }: { children: ReactNode }) {
  const session = useSession();

  if (session === undefined) {
    return <main className="flex min-h-[calc(100vh-77px)] items-center justify-center text-sm text-zinc-400">Loading...</main>;
  }

  return session ? <>{children}</> : <SignIn />;
}
