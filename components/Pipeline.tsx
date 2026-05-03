const stages = ["Lead", "Contacted", "Proposal", "Confirmed", "Delivered"];

const seed = [
  { name: "Madefor — Valencia run series", type: "Run Ritual", value: "€2.5K", stage: "Confirmed" },
  { name: "On Running Spain — coffee party", type: "Run Ritual", value: "€3.5K", stage: "Contacted" },
  { name: "Hoka Iberia — flagship Q3", type: "Brand activation", value: "€7K", stage: "Lead" },
  { name: "See You Hotel — sunset residency", type: "Sunset Residency", value: "€12K", stage: "Proposal" },
  { name: "Lululemon Spain — corporate reset", type: "Corporate Reset", value: "€3.8K", stage: "Lead" },
  { name: "Sync × Lowtide collab drop", type: "Ticketed", value: "—", stage: "Lead" },
];

const flagships = [
  { code: "Equinox", date: "March 2026", venue: "—", status: "Concept" },
  { code: "Vespertina", date: "June 2026", venue: "—", status: "To lock" },
  { code: "Salar", date: "September 2026", venue: "—", status: "To lock" },
  { code: "Marea", date: "December 2026 · Maratón weekend", venue: "—", status: "Anchor flagship" },
];

export function Pipeline() {
  return (
    <div className="space-y-12">
      <div>
        <div className="label text-muted mb-5">B2B opportunities</div>

        {/* Desktop table */}
        <div className="hidden md:block border border-foreground/10">
          <div className="grid grid-cols-12 px-6 py-4 label text-muted bg-light-stone/30">
            <div className="col-span-5">Account</div>
            <div className="col-span-3">Type</div>
            <div className="col-span-2">Value</div>
            <div className="col-span-2 text-right">Stage</div>
          </div>
          {seed.map((row) => (
            <div key={row.name} className="grid grid-cols-12 px-6 py-5 border-t border-foreground/10 items-center">
              <div className="col-span-5 display-light text-base">{row.name}</div>
              <div className="col-span-3 text-sm text-muted">{row.type}</div>
              <div className="col-span-2 text-sm">{row.value}</div>
              <div className="col-span-2 text-right">
                <span className="label">{row.stage}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-px bg-foreground/10 border border-foreground/10">
          {seed.map((row) => (
            <div key={row.name} className="bg-background p-5">
              <div className="flex items-baseline justify-between mb-2 gap-3">
                <div className="display-light text-base leading-tight">{row.name}</div>
                <span className="label text-terracotta shrink-0">{row.stage}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted">
                <span>{row.type}</span>
                <span>{row.value}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted mt-3 italic">Seed data. Wire to a markdown-backed file in the next iteration so edits persist.</p>
      </div>

      <div>
        <div className="label text-muted mb-5">2026 flagship calendar</div>
        <div className="grid md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
          {flagships.map((f) => (
            <div key={f.code} className="bg-background p-6">
              <div className="label text-terracotta mb-3">{f.code}</div>
              <div className="display text-lg mb-2">{f.date}</div>
              <div className="text-sm text-muted mb-1">Venue · {f.venue}</div>
              <div className="text-xs text-muted italic">{f.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
