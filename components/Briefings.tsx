import type { Briefing } from "@/lib/data";

function formatDate(d: string) {
  try {
    const date = new Date(d);
    return date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  } catch {
    return d;
  }
}

function BriefingCard({ b }: { b: Briefing }) {
  return (
    <article className="border border-foreground/10 bg-background">
      <header className="p-6 sm:p-8 md:p-10 border-b border-foreground/10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <div className="label text-terracotta mb-2">Team briefing</div>
          <h3 className="display text-2xl sm:text-3xl leading-tight">{b.title}</h3>
        </div>
        <div className="label text-muted">{formatDate(b.date)}</div>
      </header>

      {b.intro && (
        <div className="px-6 sm:px-8 md:px-10 py-6 border-b border-foreground/10 bg-light-stone/20">
          <p className="text-sm sm:text-base leading-relaxed italic max-w-3xl">{b.intro}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-px bg-foreground/10">
        {b.roles.length > 0 && (
          <section className="bg-background p-6 sm:p-8">
            <div className="label text-terracotta mb-5">Roles</div>
            <ul className="space-y-3">
              {b.roles.map((r, i) => (
                <li key={i} className="text-sm leading-snug">
                  <div className="display-light">{r.role}</div>
                  <div className="text-muted">{r.owner || "—"}</div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {b.actions.length > 0 && (
          <section className="bg-background p-6 sm:p-8 lg:col-span-2">
            <div className="label text-terracotta mb-5">Action items</div>
            <ol className="space-y-5">
              {b.actions.map((a, i) => (
                <li key={i} className="border-l-2 border-foreground/15 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                    <div className="display-light text-sm sm:text-base leading-tight">{a.task}</div>
                    {a.deadline && <div className="label text-terracotta shrink-0">{a.deadline}</div>}
                  </div>
                  {a.owner && <div className="text-xs text-muted mb-1">{a.owner}</div>}
                  {a.note && <div className="text-xs text-muted/80 italic mt-1">{a.note}</div>}
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>

      {b.timeline.length > 0 && (
        <div className="px-6 sm:px-8 md:px-10 py-6 border-t border-foreground/10">
          <div className="label text-muted mb-5">Timeline</div>
          <div className="grid sm:grid-cols-3 gap-x-6 gap-y-4">
            {b.timeline.map((t, i) => (
              <div key={i} className="border-l-2 border-terracotta pl-4">
                <div className="text-sm leading-tight">{t.milestone}</div>
                <div className="label text-terracotta mt-1">{t.when}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export function Briefings({ briefings }: { briefings: Briefing[] }) {
  if (briefings.length === 0) {
    return (
      <p className="text-muted italic">
        No briefings yet. Drop a markdown file into <code className="font-mono text-xs bg-light-stone/40 px-1.5 py-0.5">briefings/</code> in the vault and run <code className="font-mono text-xs bg-light-stone/40 px-1.5 py-0.5">npm run sync</code>.
      </p>
    );
  }
  return (
    <div className="space-y-8">
      {briefings.map((b) => <BriefingCard key={b.slug} b={b} />)}
    </div>
  );
}
