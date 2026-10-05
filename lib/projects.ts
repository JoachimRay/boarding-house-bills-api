import { db } from "@/db";
import { customers } from "@/db/schema";
import type { Customer } from "@/app/api/rows";
import type { LedgerAccount } from "./ledger";
import { formatCurrency } from "./ledger";

export type Project = LedgerAccount;

function toProject(customer: Customer): Project {
  return {
    ...customer,
    slug: customer.id,
    title: customer.name,
    year: customer.lastPaid,
    summary:
      customer.balance > 0
        ? `Outstanding balance of ${formatCurrency(customer.balance)}.`
        : "Account is fully paid.",
  };
}

export async function getProjects(): Promise<Project[]> {
  const rows = await db.select().from(customers);
  return rows.map((row) => toProject({
    id: row.id,
    name: row.name,
    balance: Number(row.balance),
    lastPaid: row.lastPaid,
  }));
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
