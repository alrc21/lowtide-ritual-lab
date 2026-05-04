type Pillar = {
  num: string;
  title: string;
  body: string;
  measure: string[];
  refuse: string[];
};

const pillars: Pillar[] = [
  {
    num: "01",
    title: "We're improving as DJs.",
    body:
      "The work is the work. Selection, mixing, transitions, reading rooms. Lowtide is at least partly a DJ practice — we measure ourselves against ourselves over time, not against a P&L.",
    measure: [
      "Hours mixing per week per brother",
      "New tracks added to the working selection per month",
      "One peer review per quarter from a DJ we respect",
      "A yearly self-recorded set we can compare to last year's",
    ],
    refuse: [
      "Booking ourselves into rooms where we cannot grow",
      "Long sets without preparation",
      "Any gig we'd be embarrassed to send to a peer",
    ],
  },
  {
    num: "02",
    title: "Community is the asset, not an output.",
    body:
      "Real people, real relationships. The list is named, knowable, tended. We answer DMs. We remember names at the door. We grow slow on purpose.",
    measure: [
      "Attendees who came to ≥3 events in the last 12 months — the core",
      "List members who responded to the last drop",
      "Names we know personally on the door at a 100-cap event (target 30+)",
    ],
    refuse: [
      "Audience-as-traffic vocabulary in any internal document",
      "Buying followers, gaming engagement",
      "Treating people as data",
    ],
  },
  {
    num: "03",
    title: "Curation at Devialet-tier or not at all.",
    body:
      "When we say curated, we mean designed — the room, the rig, the order of moments, the light, the scent, the printed program. The selection is one input among many. We over-invest at flagship and Listening; we hold the line.",
    measure: [
      "Acoustic measurement of the Listening room before each event",
      "Single named photographer per event, briefed in writing",
      "One printed artifact per event (program, zine, vinyl mailer)",
      "One tier-1 editorial press placement per Flagship",
    ],
    refuse: [
      "Vinyl banners in any Listening or Flagship setting",
      "iPhone-only photography on flagship products",
      "\"We'll figure it out on the day\" production",
    ],
  },
  {
    num: "04",
    title: "We don't trade essence for money.",
    body:
      "Below a price floor, we walk. Above a brand-fit ceiling, we walk. The B2B 65/35 economic model is the output of this rule, not the rule itself.",
    measure: [
      "Gigs declined this quarter for fit reasons (target ≥1 — zero refusals means we are not curating ourselves)",
      "Brand-fit memo signed per B2B booking",
      "Per-event essence score self-rated 1–5",
    ],
    refuse: [
      "Any gig under €1,500",
      "Any sponsor conversation that requires a specific track or genre",
      "Any \"exclusive\" agreement that locks us out of Listening or Flagship work",
    ],
  },
];

export function Essence() {
  return (
    <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
      {pillars.map((p) => (
        <article key={p.num} className="bg-background p-6 sm:p-8 md:p-10 flex flex-col">
          <div className="flex items-baseline gap-4 mb-5">
            <span className="display text-terracotta text-2xl">{p.num}</span>
            <span className="label text-muted">Pillar</span>
          </div>
          <h3 className="display text-xl sm:text-2xl mb-4 leading-tight">{p.title}</h3>
          <p className="text-sm sm:text-base leading-relaxed mb-7 text-foreground/85">{p.body}</p>

          <div className="grid sm:grid-cols-2 gap-6 mt-auto">
            <div>
              <div className="label text-terracotta mb-3">What we measure</div>
              <ul className="space-y-2">
                {p.measure.map((m, i) => (
                  <li key={i} className="text-xs sm:text-sm leading-snug flex gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-terracotta shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="label text-muted mb-3">What we refuse</div>
              <ul className="space-y-2">
                {p.refuse.map((r, i) => (
                  <li key={i} className="text-xs sm:text-sm leading-snug flex gap-2 text-foreground/70">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-stone shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
