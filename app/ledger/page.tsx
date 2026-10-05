import { getProjects } from "@/lib/projects";
import { formatCurrency } from "@/lib/ledger";
import { ProjectSearch } from "./search";
import { AddCustomer } from "./add-customer";

export default async function LedgerPage() {
  const projects = await getProjects();
  const outstanding = projects.reduce((total, project) => total + project.balance, 0);
  const paidAccounts = projects.filter((project) => project.balance === 0).length;

  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-[1000px] py-12 md:w-[calc(100%-48px)] md:py-16">
      <section className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
        <div>
          <p className="text-[11px] uppercase tracking-[1px] text-zinc-400">BOARDING HOUSE / LEDGER</p>
          <h1 className="mt-3 text-4xl font-bold md:text-[44px]">Accounts overview</h1>
          <p className="mt-3 text-zinc-400">Track tenant balances and payment activity in one place.</p>
        </div>
        <div className="text-xs text-zinc-400">Updated today</div>
      </section>
      <section className="my-10 grid gap-6 md:my-14 md:grid-cols-3" aria-label="Ledger summary">
        <article className="flex flex-col gap-2"><span className="text-[11px] uppercase tracking-[1px] text-zinc-400">Total outstanding</span><strong className="text-3xl">{formatCurrency(outstanding)}</strong><span className="text-xs text-zinc-400">Across {projects.length} accounts</span></article>
        <article className="flex flex-col gap-2"><span className="text-[11px] uppercase tracking-[1px] text-zinc-400">Active accounts</span><strong className="text-3xl">{projects.length}</strong><span className="text-xs text-zinc-400">Tenants on the ledger</span></article>
        <article className="flex flex-col gap-2"><span className="text-[11px] uppercase tracking-[1px] text-zinc-400">Paid in full</span><strong className="text-3xl">{paidAccounts}</strong><span className="text-xs text-zinc-400">No balance due</span></article>
      </section>
      <section className="border-t border-zinc-800 pt-7">
        <div className="flex items-start justify-between gap-6">
          <div><p className="text-[11px] uppercase tracking-[1px] text-zinc-400">ACCOUNT LEDGER</p><h2 className="mt-2 text-2xl font-bold">Tenant accounts</h2></div>
          <span className="text-xs text-zinc-400">{projects.length} records</span>
        </div>
        <ProjectSearch projects={projects} />
        <AddCustomer />
      </section>
    </main>
  );
}
