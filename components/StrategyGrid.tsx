import type { StrategyDoc } from "@/lib/data";
import Link from "next/link";

export function StrategyGrid({ docs }: { docs: StrategyDoc[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
      {docs.map((d, i) => (
        <Link
          key={d.slug}
          href={{ pathname: `/strategy/${d.slug}` }}
          className="bg-background p-8 md:p-10 group hover:bg-terracotta-soft/20 transition-colors duration-500 block"
        >
          <div className="flex items-baseline justify-between mb-6">
            <span className="label text-muted">Plan 0{i + 1}</span>
            <span className="label text-muted">{d.words.toLocaleString()} words</span>
          </div>
          <h3 className="display text-2xl md:text-3xl mb-4 group-hover:text-terracotta transition-colors duration-500">
            {d.title}
          </h3>
          <p className="text-muted leading-relaxed mb-6">{d.blurb}</p>
          <span className="label group-hover:text-terracotta transition-colors duration-500">Leer →</span>
        </Link>
      ))}
    </div>
  );
}
