import type { Concept } from "@/lib/data";
import Link from "next/link";

function ConceptCard({ c }: { c: Concept }) {
  return (
    <article className="bg-background p-6 sm:p-8 md:p-10 flex flex-col">
      <div className="flex items-baseline justify-between mb-4 sm:mb-6">
        <span className="label text-terracotta">Concept № {String(c.num).padStart(2, "0")}</span>
        <span className="label text-muted">Valencia</span>
      </div>

      <h3 className="display text-3xl sm:text-4xl mb-2 leading-none">{c.name}</h3>
      {c.tagline && (
        <p className="display-light text-base sm:text-lg italic text-muted mb-6 sm:mb-8">{c.tagline}</p>
      )}

      <Field label="Signature ritual" value={c.signature} highlight />
      <Field label="Capacity & pricing" value={c.capacityPricing} />
      <Field label="Venue" value={c.venue} />
      <Field label="Format" value={c.format} small />
      <Field label="Audience" value={c.audience} small />
      <Field label="Devialet fit" value={c.devialetFit} small />
      <Field label="Risk & mitigation" value={c.risk} small />
    </article>
  );
}

function Field({ label, value, highlight, small }: { label: string; value: string; highlight?: boolean; small?: boolean }) {
  if (!value) return null;
  return (
    <div className={`mb-4 sm:mb-5 ${highlight ? "border-l-2 border-terracotta pl-4 mb-6" : ""}`}>
      <div className={`label mb-1.5 ${highlight ? "text-terracotta" : "text-muted"}`}>{label}</div>
      <p className={`leading-relaxed ${small ? "text-sm" : "text-base"} ${highlight ? "italic" : ""}`}>{value}</p>
    </div>
  );
}

export function Concepts({ concepts }: { concepts: Concept[] }) {
  if (concepts.length === 0) {
    return <p className="text-muted italic">08-vanguard-ritual-concepts.md not found.</p>;
  }
  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
        {concepts.map((c) => <ConceptCard key={c.num} c={c} />)}
      </div>
      <Link
        href={{ pathname: "/research/08-vanguard-ritual-concepts" }}
        className="label inline-flex items-center gap-2 text-terracotta hover:gap-3 transition-all duration-300"
      >
        Read the full concept doc — P&Ls, validation roadmap, hardware stack →
      </Link>
    </div>
  );
}
