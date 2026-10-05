import { supabase } from "@/lib/supabase";

export type Profile = {
  id: string;
  email: string;
  role: string;
};

export type Customer = {
  id: string;
  name: string;
  balance: number;
  lastPaid: string;
};

export async function fetchProfile(): Promise<Profile | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return null;

  const response = await fetch("/api/me", {
    headers: {
      Authorization: `Bearer ${sessionData.session.access_token}`,
    },
  });

  if (!response.ok) throw new Error("Unable to load your profile.");
  return response.json() as Promise<Profile>;
}

export async function fetchCustomers(): Promise<Customer[]> {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) throw new Error("Authentication required.");

  const response = await fetch("/api/customers", {
    headers: {
      Authorization: `Bearer ${sessionData.session.access_token}`,
    },
  });

  if (!response.ok) throw new Error("Unable to load customers.");
  return response.json() as Promise<Customer[]>;
}
