"use client";
import { useEffect, useMemo, useState } from "react";

type Prompt = { id: string; eyebrow: string; title: string; hint: string };

const prompts: Prompt[] = [
  { id: "manifesto", eyebrow: "Manifesto", title: "Why Lowtide exists", hint: "One paragraph, in your voice. Why this, why Valencia, why now." },
  { id: "voice", eyebrow: "Voice", title: "How we speak", hint: "Three adjectives + one anti-adjective. e.g. ritual, intentional, Mediterranean — never hype." },
  { id: "visual", eyebrow: "Visual identity", title: "What Lowtide looks like", hint: "Materials, light, type, colour cues. What we wear in photos. What we never wear." },
  { id: "format-run", eyebrow: "Format · Run Ritual", title: "Coffee + run + DJ activation", hint: "Define the canonical run-of-show. 06:00 → 09:00. What plays, what's served, who speaks, what guests take home." },
  { id: "format-sunset", eyebrow: "Format · Sunset Residency", title: "Hotel-terrace 8-night package", hint: "Which two home venues. Pricing tier. Lineup posture. Aftermovie style." },
  { id: "format-corporate", eyebrow: "Format · Corporate Reset", title: "Half-day wellness offsite", hint: "Run → breathwork → coffee → DJ. Target buyers. What the deck looks like." },
  { id: "wellness-side", eyebrow: "Wellness × party", title: "What the wellness moment is", hint: "Sauna, breathwork, ice, sound bath, ecstatic dance. Pick what's authentic, not what's trendy." },
  { id: "alignment", eyebrow: "Define & align", title: "What we are NOT", hint: "Anti-patterns: alcohol-led identity, open-source chapters, festivals before residency, gigs under €1,500. Add yours." },
  { id: "fabrica-tardeo", eyebrow: "Fábrica Tardeo", title: "Where this fits", hint: "Is Fábrica Tardeo a partner venue, an inspiration, or a sibling format? Define the relationship." },
  { id: "outside-valencia", eyebrow: "Outside Valencia", title: "Events beyond the home base", hint: "Which destinations, what excuse to go (race, retreat, brand activation), how often." },
  { id: "transport", eyebrow: "Events with transport", hint: "Bus or boat trip wrapped around the event. Who pays, what it costs the guest, where to.", title: "The transport-included format" },
  { id: "marina-beach", eyebrow: "Marina Beach 11am", title: "The 11am Marina ritual", hint: "Daytime curated session at Marina Beach. Cap, price, season, music posture, food/coffee partner." },
];

const STORAGE_KEY = "lowtide-identity-canvas-v1";

function downloadMd(values: Record<string, string>) {
  const today = new Date().toISOString().slice(0, 10);
  const lines: string[] = [];
  lines.push("---");
  lines.push("project: Lowtide Ritual");
  lines.push("type: identity-canvas");
  lines.push(`date: ${today}`);
  lines.push("language: EN");
  lines.push("---");
  lines.push("");
  lines.push("# Lowtide Ritual — Identity Canvas");
  lines.push("");
  lines.push("> Filled in the Lab dashboard. Hand this file to Claude as context, or use it as the source for IDENTITY.md in the vault.");
  lines.push("");
  for (const p of prompts) {
    lines.push(`## ${p.title}`);
    lines.push("");
    lines.push(`*${p.eyebrow} — ${p.hint}*`);
    lines.push("");
    const v = (values[p.id] || "").trim();
    lines.push(v.length ? v : "_(empty)_");
    lines.push("");
  }
  const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `lowtide-identity-${today}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function copyMd(values: Record<string, string>) {
  const today = new Date().toISOString().slice(0, 10);
  const parts = [`# Lowtide Identity Canvas — ${today}`, ""];
  for (const p of prompts) {
    const v = (values[p.id] || "").trim();
    if (!v) continue;
    parts.push(`## ${p.title}`);
    parts.push(v);
    parts.push("");
  }
  await navigator.clipboard.writeText(parts.join("\n"));
}

export function IdentityCanvas() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setValues(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(values)); } catch {}
  }, [values, hydrated]);

  const filled = useMemo(
    () => prompts.filter((p) => (values[p.id] || "").trim().length > 0).length,
    [values]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border border-foreground/10 bg-light-stone/30 sticky top-[57px] z-20 backdrop-blur-md bg-light-stone/60">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="display text-terracotta text-2xl">{filled}</span>
          <span className="label text-muted">of {prompts.length} prompts filled</span>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button
            type="button"
            onClick={async () => { await copyMd(values); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="label px-3 sm:px-4 py-2 border border-foreground/20 hover:border-foreground/50 transition-colors disabled:opacity-40 flex-1 sm:flex-none"
            disabled={filled === 0}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <button
            type="button"
            onClick={() => downloadMd(values)}
            className="label px-3 sm:px-4 py-2 bg-foreground text-background hover:bg-foreground/85 transition-colors disabled:opacity-40 flex-1 sm:flex-none"
            disabled={filled === 0}
          >
            Download .md →
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
        {prompts.map((p) => {
          const v = values[p.id] || "";
          const filledThis = v.trim().length > 0;
          return (
            <article key={p.id} className="bg-background p-5 sm:p-7 md:p-8 flex flex-col">
              <div className="flex items-baseline justify-between mb-3">
                <div className="label text-muted">{p.eyebrow}</div>
                {filledThis && <div className="label text-terracotta">filled</div>}
              </div>
              <h3 className="display text-lg md:text-xl mb-3 leading-tight">{p.title}</h3>
              <p className="text-xs text-muted leading-relaxed mb-4 italic">{p.hint}</p>
              <textarea
                value={v}
                onChange={(e) => setValues((s) => ({ ...s, [p.id]: e.target.value }))}
                rows={5}
                placeholder="Write here…"
                className="w-full bg-transparent border border-foreground/15 focus:border-terracotta focus:outline-none p-3 text-sm leading-relaxed font-[var(--font-body)] resize-y min-h-[7rem]"
              />
            </article>
          );
        })}
      </div>

      <p className="text-xs text-muted italic">
        Drafts auto-save to your browser only — nothing leaves your machine until you download or copy.
      </p>
    </div>
  );
}
