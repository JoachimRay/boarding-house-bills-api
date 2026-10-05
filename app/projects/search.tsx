"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import { ProjectList } from "./project-list";

type Props = { projects: Project[] };

export function ProjectSearch({ projects }: Props) {
  const [query, setQuery] = useState("");
  const shown = projects.filter((project) =>
    `${project.title} ${project.id}`.toLowerCase().includes(query.toLowerCase()),
  );

  if (projects.length === 0) return   <p className="py-6 text-zinc-400">No accounts found.</p>;

  return (
    <>
      <div className="relative my-7">
        <span className="absolute left-3 top-2.5 text-zinc-400">⌕</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by tenant name or account ID..." aria-label="Search tenant accounts" className="w-full border border-zinc-800 bg-black px-8 py-3 text-white outline-none focus:border-white" />
      </div>
      {shown.length ? <ProjectList projects={shown} /> : <p className="py-6 text-zinc-400">No accounts found for “{query}”.</p>}
    </>
  );
}
