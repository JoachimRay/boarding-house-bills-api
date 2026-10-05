import { notFound } from "next/navigation";
import { formatCurrency, getProject } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-[1000px] py-10 md:w-[calc(100%-48px)]">
      <a href="/ledger" className="text-sm text-zinc-400">← Back to accounts</a>
      <section className="mt-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><p className="text-[11px] uppercase tracking-[1px] text-zinc-400">TENANT ACCOUNT / {project.id.toUpperCase()}</p><h1 className="mt-3 text-4xl font-bold">{project.title}</h1><p className="mt-3 text-zinc-400">Last payment recorded {project.year}</p></div>
        <span className="border border-zinc-800 px-2.5 py-2 text-xs text-zinc-400">{project.balance === 0 ? "Paid in full" : "Balance due"}</span>
      </section>
      <section className="my-9 grid gap-8 border-y border-zinc-800 py-7 md:grid-cols-2">
        <article className="flex flex-col gap-2"><span className="text-[11px] uppercase tracking-[1px] text-zinc-400">Current balance</span><strong className="text-4xl">{formatCurrency(project.balance)}</strong><p className="text-zinc-400">{project.summary}</p></article>
        <article className="flex flex-col gap-2"><span className="text-[11px] uppercase tracking-[1px] text-zinc-400">Account ID</span><strong>{project.id}</strong><span className="mt-3 text-[11px] uppercase tracking-[1px] text-zinc-400">Last payment</span><strong>{project.lastPaid}</strong></article>
      </section>
      <section className="border-t border-zinc-800 pt-7">
        <div><p className="text-[11px] uppercase tracking-[1px] text-zinc-400">PAYMENT HISTORY</p><h2 className="mt-2 text-2xl font-bold">Ledger activity</h2></div>
        <div className="mt-6 border-t border-zinc-800 py-9 text-zinc-400"><p className="text-white">Payment history is ready to be connected to the ledger API.</p><span className="mt-2 block text-sm">The current API payload provides the latest payment and account balance.</span></div>
      </section>
    </main>
  );
}
