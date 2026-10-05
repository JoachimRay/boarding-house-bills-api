import { ROWS, type Customer } from "@/app/api/rows";

export type Project = Customer & {
  slug: string;
  title: string;
  year: string;
  summary: string;
};

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

export function getProjects(): Project[] {
  return ROWS.map(toProject);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(value);
}
