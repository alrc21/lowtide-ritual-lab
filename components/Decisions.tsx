import Link from "next/link";

type Decision = {
  question: string;
  recommendation: string;
  why: string;
  options: { code: string; title: string; verdict: "go" | "no-go" | "fallback" }[];
  next: string[];
  doc: { slug: string; label: string };
};

const decisions: Decision[] = [
  {
    question: "What to do with the Lowtide × Mlab Privé collaborations?",
    recommendation:
      "Spin Privé into a separately branded, co-owned nightlife sibling. Keep Lowtide pure, sober-coded, and B2B-anchored.",
    why:
      "Running both Privé and Lowtide under one halo tells Devialet, Hoka, On, and any wellness-aligned hotel that Lowtide is a club promoter who also runs in the morning — the opposite of the run-first wellness ritual wedge the Brief locks in. Killing Privé entirely leaves cash and Mlab relationship value on the table. Separate brands let each format optimise for its own economics without compromising the other.",
    options: [
      { code: "A", title: "Concentrate fully on Lowtide. Drop Privé.", verdict: "fallback" },
      { code: "B", title: "Run Privé under the Lowtide halo.", verdict: "no-go" },
      { code: "C", title: "Spin Privé into a separate, co-owned brand.", verdict: "go" },
    ],
    next: [
      "Have the conversation with Mlab — use the 10-question script in §7 of the doc.",
      "Confirm a clean brand wall: separate IG, separate visual system, separate booking inbox, no cross-tagging from Lowtide's grid.",
      "If Mlab refuses the wall, fall back to Option A.",
      "Run a 90-day test: 1 Privé event under the new brand, 1 Lowtide ritual untouched. Measure sponsor reactions and audience overlap.",
    ],
    doc: { slug: "06-mlab-prive-strategy", label: "Read the full strategy doc" },
  },
  {
    question: "How should Lowtide own its audience beyond Instagram?",
    recommendation:
      "Run three channels with different jobs: Beehiiv newsletter (\"The Tide Letter\") as the durable owned asset, WhatsApp Broadcast list as the conversion channel, Instagram Broadcast as discovery. Skip Telegram and WhatsApp Community for now.",
    why:
      "Instagram is rented land — algorithm shifts can drop reach 60% overnight, and a list owned in someone else's app cannot be exported, segmented, or sold to sponsors. A newsletter compounds (open-rate data is the asset), WhatsApp Broadcast converts (the right channel for a 24h ticket drop in Spain), and IG Broadcast filters discovery before pushing into the owned channels. Telegram has poor adoption with Lowtide's Spain-resident audience; WhatsApp Community adds moderation overhead before there's enough volume.",
    options: [
      { code: "A", title: "Stay IG-only.", verdict: "no-go" },
      { code: "B", title: "Beehiiv + WhatsApp Broadcast + IG Broadcast.", verdict: "go" },
      { code: "C", title: "Telegram channel + group as primary.", verdict: "fallback" },
    ],
    next: [
      "Open Beehiiv (free tier), claim the.tideletter handle. Set up double-opt-in.",
      "Stand up a WhatsApp Broadcast list inside the Lowtide business number — capture +34 numbers at every event.",
      "Add a GDPR opt-in checkbox to every Sync × Lowtide ticket flow before doors open — without it, the attendee list stays with Sync.",
      "Seed the first 200 names from event guest lists, IG DMs, and the Madefor run-club crew. Send issue 01 within 14 days.",
    ],
    doc: { slug: "07-sync-collab-and-broadcast", label: "Read the Sync collab + distribution doc" },
  },
];

const verdictStyles: Record<Decision["options"][number]["verdict"], string> = {
  go: "border-terracotta bg-terracotta-soft/30",
  fallback: "border-foreground/15 bg-light-stone/30",
  "no-go": "border-foreground/10 bg-background opacity-60 line-through decoration-foreground/30",
};

const verdictLabels: Record<Decision["options"][number]["verdict"], string> = {
  go: "Recommended",
  fallback: "Fallback",
  "no-go": "Refused",
};

export function Decisions() {
  return (
    <div className="space-y-10">
      {decisions.map((d, idx) => (
        <article key={idx} className="border border-foreground/10 p-5 sm:p-8 md:p-10 bg-background">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="label text-terracotta">Open question № {String(idx + 1).padStart(2, "0")}</span>
          </div>

          <h3 className="display text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 max-w-3xl leading-tight">
            {d.question}
          </h3>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 mb-8 sm:mb-10">
            <div className="lg:col-span-7">
              <div className="label text-muted mb-3">Recommendation</div>
              <p className="display-light text-lg sm:text-xl md:text-2xl leading-snug border-l-2 border-terracotta pl-4 sm:pl-5 mb-6">
                {d.recommendation}
              </p>
              <div className="label text-muted mb-3">Why</div>
              <p className="text-sm leading-relaxed text-foreground/85">{d.why}</p>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="label text-muted mb-3">Options weighed</div>
              {d.options.map((o) => (
                <div
                  key={o.code}
                  className={`p-4 border ${verdictStyles[o.verdict]}`}
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="display text-sm">Option {o.code}</span>
                    <span className="label">{verdictLabels[o.verdict]}</span>
                  </div>
                  <div className="text-sm">{o.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-8">
            <div>
              <div className="label text-muted mb-4">Next moves</div>
              <ol className="space-y-3">
                {d.next.map((n, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span className="display text-terracotta shrink-0 w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <Link
            href={{ pathname: `/research/${d.doc.slug}` }}
            className="label inline-flex items-center gap-2 text-terracotta hover:gap-3 transition-all duration-300"
          >
            {d.doc.label} →
          </Link>
        </article>
      ))}
    </div>
  );
}
