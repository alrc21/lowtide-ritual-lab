const phases = [
  {
    code: "v1 — Path A",
    title: "Equipment loan only",
    when: "Events 1–2",
    desc: "Prove the format. Zero cash exposure. Editorial capture is everything.",
    state: "current",
  },
  {
    code: "v2 — Path B",
    title: "Loan + content rights",
    when: "Events 3–4",
    desc: "Devialet reposts editorial assets. Implicit endorsement. Hire a real production team.",
    state: "next",
  },
  {
    code: "v3 — Path C",
    title: "Paid partnership",
    when: "Year 2",
    desc: "Pitch a 4-city Iberian series — Valencia, Ibiza, Madrid, Lisbon.",
    state: "future",
  },
  {
    code: "Path D",
    title: "Revenue share",
    when: "Never",
    desc: "Devialet's commercial team isn't built for it. Better fit with hotel groups or beverage sponsors.",
    state: "refused",
  },
];

const checklist = [
  { phase: "0–30 days", items: [
    "Lock MoU draft for option A",
    "Build 10-slide deck (designed like a Wallpaper* feature)",
    "Choose flagship venue for event 1 (Bombas Gens, Veles e Vents, El Carmen cloister, El Saler villa)",
    "Sign a media partner — Neo2, Vein, or Apartamento",
    "Hire a named director/photographer for the year",
    "Build a 300-name curated guest list",
  ]},
  { phase: "30–60 days", items: [
    "Confirm gear list, delivery, calibration day",
    "Production: lighting designer, scent design, printed program/zine",
    "Confirm guest artist — editorial credibility (Pional, John Talabot, Marc Piñol)",
    "Pre-event content plan: 3 teasers, 1 Reel, 1 newsletter",
    "Run the event. Listening segment is non-negotiable.",
    "Same-night content capture — deliver edit within 7 days",
  ]},
  { phase: "60–90 days", items: [
    "Send post-event report to Devialet",
    "Schedule renewal conversation within 14 days — pitch path B",
    "Draft 2026 series calendar (Equinox, Vespertina, Salar, Marea)",
    "Open hotel partner conversation — Caro, Only YOU, Hospes, or Mandarin Madrid",
    "Begin press relations 90 days out for event 2",
    "Build Lowtide × Devialet microsite",
  ]},
];

const stateStyles: Record<string, string> = {
  current: "bg-terracotta-soft/30 border-terracotta",
  next: "bg-light-stone/40 border-foreground/15",
  future: "bg-background border-foreground/10",
  refused: "bg-background border-foreground/10 opacity-60",
};

export function DevialetTracker() {
  return (
    <div className="space-y-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {phases.map((p) => (
          <div key={p.code} className={`p-5 sm:p-6 border ${stateStyles[p.state]}`}>
            <div className="label text-muted mb-3">{p.code}</div>
            <div className="display text-lg mb-1">{p.title}</div>
            <div className="text-xs text-muted mb-4 italic">{p.when}</div>
            <p className="text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="label text-muted mb-5">30 / 60 / 90 plan</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
          {checklist.map((c) => (
            <div key={c.phase} className="bg-background p-7">
              <div className="display text-terracotta mb-5">{c.phase}</div>
              <ul className="space-y-3">
                {c.items.map((it) => (
                  <li key={it} className="text-sm leading-relaxed flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-stone shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="display-light text-xl md:text-2xl max-w-3xl border-l-2 border-terracotta pl-6 italic">
        Devialet doesn't decide based on the deck. They decide based on whether event 1 looks like something they would have produced themselves.
      </p>
    </div>
  );
}
