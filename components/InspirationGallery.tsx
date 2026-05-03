import type { InspirationData, InspirationEvent } from "@/lib/data";
import ReactMarkdown from "react-markdown";

const bucketAccent: Record<string, string> = {
  "Daybreaker editions": "bg-terracotta-soft/40",
  "Devialet activations": "bg-foreground/[0.04]",
  "Wellness × music": "bg-light-stone/50",
  "Run-club + DJ": "bg-terracotta-soft/30",
  "Spain-specific that already work": "bg-light-stone/40",
  "Hotel / terrace residencies": "bg-foreground/[0.03]",
};

function EventCard({ ev }: { ev: InspirationEvent }) {
  return (
    <article className={`p-5 sm:p-7 md:p-8 ${bucketAccent[ev.bucket] || "bg-background"}`}>
      <div className="flex items-baseline justify-between mb-5">
        <span className="label text-muted">№ {String(ev.num).padStart(2, "0")} · {ev.bucket}</span>
        <span className="label text-muted">{ev.location}</span>
      </div>
      <h3 className="display text-xl md:text-2xl mb-3 leading-tight">{ev.title}</h3>
      <div className="text-xs text-muted mb-5">{ev.operator}</div>
      <p className="text-sm leading-relaxed mb-5">{ev.format}</p>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 pt-5 border-t border-foreground/10">
        <div>
          <div className="label text-muted mb-1">Attendance</div>
          <div className="text-sm">{ev.attendance}</div>
        </div>
        <div>
          <div className="label text-muted mb-1">Price · EUR</div>
          <div className="text-sm">{ev.price}</div>
        </div>
      </div>

      {ev.whatWorked.length > 0 && (
        <div className="mb-6">
          <div className="label text-muted mb-3">What worked</div>
          <ul className="space-y-2">
            {ev.whatWorked.map((w, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-3">
                <span className="mt-2 w-1 h-1 rounded-full bg-terracotta shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-l-2 border-terracotta pl-4 py-1">
        <div className="label text-terracotta mb-2">For Lowtide</div>
        <p className="text-sm leading-relaxed italic">{ev.replicability}</p>
      </div>
    </article>
  );
}

export function InspirationGallery({ data }: { data: InspirationData }) {
  const buckets = Array.from(new Set(data.events.map((e) => e.bucket)));

  return (
    <div className="space-y-16">
      {buckets.map((bucket) => {
        const events = data.events.filter((e) => e.bucket === bucket);
        return (
          <div key={bucket}>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-5 sm:mb-6">
              <span className="label text-terracotta">Bucket</span>
              <h3 className="display text-lg sm:text-xl">{bucket}</h3>
              <span className="label text-muted sm:ml-auto">{events.length} events</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
              {events.map((ev) => <EventCard key={ev.num} ev={ev} />)}
            </div>
          </div>
        );
      })}

      {data.patterns.length > 0 && (
        <div>
          <div className="label text-terracotta mb-5">Cross-cutting patterns</div>
          <ol className="grid md:grid-cols-2 gap-x-12 gap-y-5 list-none counter-reset-[item]">
            {data.patterns.map((p, i) => (
              <li key={i} className="flex gap-5 text-sm leading-relaxed">
                <span className="display text-terracotta text-xl shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div className="prose prose-sm prose-lowtide max-w-none [&_p]:mb-0">
                  <ReactMarkdown>{p}</ReactMarkdown>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {data.seeds.length > 0 && (
        <div>
          <div className="label text-terracotta mb-5">Concept seeds for Lowtide</div>
          <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
            {data.seeds.map((s, i) => (
              <div key={i} className="bg-background p-6 flex gap-5">
                <span className="display text-2xl text-terracotta shrink-0 leading-none">{String(i + 1).padStart(2, "0")}</span>
                <div className="prose prose-sm prose-lowtide max-w-none [&_p]:mb-0 [&_strong]:font-display [&_strong]:tracking-tight">
                  <ReactMarkdown>{s}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
