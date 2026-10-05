import Link from "next/link";
import type { Project } from "@/lib/projects";
import { formatCurrency } from "@/lib/projects";

type Props = { projects: Project[] };

export function ProjectList({ projects }: Props) {
  return (
    <ul className="list-none">
      {projects.map((project) => (
        <li key={project.slug} className="border-t border-zinc-800">
          <Link href={`/ledger/${project.slug}`} className="grid grid-cols-[1fr_150px_160px_20px] items-center gap-4 py-5 max-md:grid-cols-[1fr_20px]">
            <span className="flex flex-col gap-1"><strong>{project.title}</strong><small className="text-[11px] uppercase tracking-[1px] text-zinc-400">Account {project.id}</small></span>
            <span className="flex flex-col gap-1 max-md:hidden"><small className="text-[11px] uppercase tracking-[1px] text-zinc-400">Last paid</small><span>{project.lastPaid}</span></span>
            <span className="flex flex-col gap-1 text-right max-md:hidden"><small className="text-[11px] uppercase tracking-[1px] text-zinc-400">Balance</small><strong>{formatCurrency(project.balance)}</strong></span>
            <span>→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
