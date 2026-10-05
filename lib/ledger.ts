import type { Customer } from "@/app/api/rows";

export type LedgerAccount = Customer & {
  slug: string;
  title: string;
  year: string;
  summary: string;
};

export type Project = LedgerAccount;

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(value);
}
