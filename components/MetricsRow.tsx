const metrics = [
  { label: "Revenue mix · 2026", value: "65 / 35", note: "B2B / Ticketed" },
  { label: "Gross target", value: "€85–140K", note: "Net €55–95K" },
  { label: "B2B floor", value: "€1,500", note: "Walk away below" },
  { label: "Anchor date", value: "Dec 2026", note: "Maratón Valencia" },
];

export function MetricsRow() {
  return (
    <section className="px-5 sm:px-8 md:px-16 lg:px-24 -mt-10 sm:-mt-12 md:-mt-16 mb-12 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
        {metrics.map((m) => (
          <div key={m.label} className="bg-background p-5 sm:p-6 md:p-8">
            <div className="label text-muted mb-2 sm:mb-3">{m.label}</div>
            <div className="display text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 leading-tight">{m.value}</div>
            <div className="text-xs sm:text-sm text-muted">{m.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
