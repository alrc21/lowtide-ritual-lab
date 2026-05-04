import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const CONTENT_ROOT = path.resolve(process.cwd(), "content");

export async function readMd(relPath: string) {
  const full = path.join(CONTENT_ROOT, relPath);
  const raw = await fs.readFile(full, "utf8");
  const { data, content } = matter(raw);
  return { data, content, path: relPath };
}

export async function tryReadMd(relPath: string) {
  try { return await readMd(relPath); } catch { return null; }
}

export type ResearchDoc = {
  slug: string;
  title: string;
  blurb: string;
  body: string;
  words: number;
};

const RESEARCH_FILES: { slug: string; title: string; blurb: string }[] = [
  {
    slug: "01-global-references",
    title: "Global References",
    blurb: "Daybreaker, Morning Gloryville, Ecstatic Dance, Tulum/Bali, Berlin — patterns and 8 implications for Lowtide.",
  },
  {
    slug: "02-valencia-spain-operating-reality",
    title: "Valencia & Spain Operating Reality",
    blurb: "Regulation (ZAS, license tiers 2.1–2.4), 15 specific venues, run-club + DJ scene in Spain, Sync Social Club deep-dive.",
  },
  {
    slug: "03-b2b-vs-ticketing-economics",
    title: "B2B vs Ticketing Economics",
    blurb: "The decision document. Pricing benchmarks, three ticketing scenarios, recommended 65/35 mix, 2026 revenue band.",
  },
  {
    slug: "04-devialet-sponsorship-playbook",
    title: "Devialet Sponsorship Playbook",
    blurb: "Brand posture, peer cases (B&O, KEF, Sonos, Genelec), 10-slide deck, deal sequence A→B→C, 30/60/90 plan.",
  },
  {
    slug: "06-mlab-prive-strategy",
    title: "Mlab × Privé Strategy",
    blurb: "Lowtide-pure vs Privé-with-Mlab vs separate-brand. Recommendation, decision framework, 90-day test, conversation script.",
  },
  {
    slug: "07-sync-collab-and-broadcast",
    title: "Sync Collab & Distribution List",
    blurb: "What Sync Social Club does well, where Lowtide should not copy them, the two upcoming joint events, and the case for owning a distribution channel beyond Instagram.",
  },
  {
    slug: "08-vanguard-ritual-concepts",
    title: "Vanguard Ritual Concepts",
    blurb: "Eight named high-end event concepts (Vespertina, Marea, Ámbar, Salar, Vigília, Ofrenda, Cenote, Lumbre). Mediterranean coding, Devialet-tier production, P&Ls for three.",
  },
  {
    slug: "09-brand-architecture-and-essence",
    title: "Brand Architecture & Essence",
    blurb: "From two brothers who DJ to a Mediterranean music house. Service-agency model, four named lanes, two-phased artist aliases, four essence pillars, ten Valencia venue prospects.",
  },
];

export type InspirationEvent = {
  num: number;
  title: string;
  location: string;
  bucket: string;
  operator: string;
  category: string;
  format: string;
  attendance: string;
  price: string;
  whatWorked: string[];
  replicability: string;
  source: string;
};

export type InspirationData = {
  events: InspirationEvent[];
  patterns: string[];
  seeds: string[];
};

const FIELD_RE = /^\s*-\s+\*\*([^:]+):\*\*\s*(.*)$/;

function parseEventBlock(block: string, bucket: string): InspirationEvent | null {
  const lines = block.split("\n");
  const headerMatch = lines[0].match(/^(\d+)\.\s+(.+?)\s+—\s+(.+?)$/);
  if (!headerMatch) return null;
  const num = parseInt(headerMatch[1], 10);
  const title = headerMatch[2].trim();
  const location = headerMatch[3].trim();

  const fields: Record<string, string> = {};
  const whatWorked: string[] = [];
  let currentField: string | null = null;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(FIELD_RE);
    if (m) {
      const key = m[1].trim();
      const value = m[2].trim();
      currentField = key;
      fields[key] = value;
    } else if (currentField === "What worked" && /^\s+-\s+/.test(line)) {
      whatWorked.push(line.replace(/^\s+-\s+/, "").trim());
    }
  }

  return {
    num,
    title,
    location,
    bucket,
    operator: fields["Operator"] || "",
    category: fields["Category"] || "",
    format: fields["Format"] || "",
    attendance: fields["Attendance"] || "",
    price: fields["Price (EUR)"] || "",
    whatWorked,
    replicability: fields["Replicability for Lowtide"] || "",
    source: fields["Source"] || "",
  };
}

export async function getInspiration(): Promise<InspirationData | null> {
  const md = await tryReadMd("research/05-event-inspiration.md");
  if (!md) return null;
  const body = md.content;

  const events: InspirationEvent[] = [];
  const sectionMatches = [...body.matchAll(/^## (.+)$/gm)];
  const sections = sectionMatches.map((sm) => ({ name: sm[1].trim(), start: sm.index ?? 0 }));

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const next = sections[i + 1];
    const slice = body.slice(sec.start, next ? next.start : undefined);
    const bucketMatch = sec.name.match(/^\d+\.\s+(.+)$/);
    if (bucketMatch) {
      const bucket = bucketMatch[1].trim();
      const blocks = slice.split(/\n### /).slice(1);
      for (const b of blocks) {
        const ev = parseEventBlock(b, bucket);
        if (ev) events.push(ev);
      }
    }
  }

  const patternsBlock = body.match(/## Patterns that repeat across the gallery\s+([\s\S]*?)(?=\n---|\n## )/);
  const seedsBlock = body.match(/## Concept seeds for Lowtide\s+([\s\S]*?)(?=\n---|$)/);

  const extractList = (raw?: string) => {
    if (!raw) return [];
    return raw
      .split(/\n(?=\d+\.\s)/)
      .map((s) => s.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);
  };

  return {
    events,
    patterns: extractList(patternsBlock?.[1]),
    seeds: extractList(seedsBlock?.[1]),
  };
}

export type Concept = {
  num: number;
  name: string;
  tagline: string;
  format: string;
  audience: string;
  capacityPricing: string;
  venue: string;
  devialetFit: string;
  risk: string;
  signature: string;
};

export async function getConcepts(): Promise<Concept[]> {
  const md = await tryReadMd("research/08-vanguard-ritual-concepts.md");
  if (!md) return [];
  const body = md.content;

  const out: Concept[] = [];
  const blocks = body.split(/\n### Concept (\d+)\s+—\s+\*\*/).slice(1);
  for (let i = 0; i < blocks.length; i += 2) {
    const num = parseInt(blocks[i], 10);
    const rest = blocks[i + 1] || "";
    const nameMatch = rest.match(/^([^*]+)\*\*/);
    if (!nameMatch) continue;
    const name = nameMatch[1].trim();
    const after = rest.slice(nameMatch[0].length);
    const taglineMatch = after.match(/\*([^*]+)\*/);
    const tagline = taglineMatch ? taglineMatch[1].trim().replace(/\.$/, "") : "";

    const grab = (label: string): string => {
      const re = new RegExp(`^\\s*-\\s+\\*\\*${label}[^:]*:\\*\\*\\s*([^\\n]+(?:\\n(?!\\s*-\\s+\\*\\*).+)*)`, "m");
      const m = after.match(re);
      return m ? m[1].trim().replace(/\s+/g, " ") : "";
    };

    out.push({
      num,
      name,
      tagline,
      format: grab("Format"),
      audience: grab("Audience"),
      capacityPricing: grab("Capacity & pricing"),
      venue: grab("Venue"),
      devialetFit: grab("Devialet fit"),
      risk: grab("Risk & mitigation"),
      signature: grab("Signature ritual mechanic"),
    });
  }
  return out;
}

export async function getResearch(): Promise<ResearchDoc[]> {
  const out: ResearchDoc[] = [];
  for (const f of RESEARCH_FILES) {
    const md = await tryReadMd(`research/${f.slug}.md`);
    if (!md) continue;
    out.push({
      slug: f.slug,
      title: f.title,
      blurb: f.blurb,
      body: md.content,
      words: md.content.split(/\s+/).length,
    });
  }
  return out;
}
