#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DASHBOARD = path.resolve(__dirname, "..");
const VAULT = path.resolve(DASHBOARD, "..");
const TARGET = path.join(DASHBOARD, "content");

const FILES = [
  "BRIEF.md",
  "research/01-global-references.md",
  "research/02-valencia-spain-operating-reality.md",
  "research/03-b2b-vs-ticketing-economics.md",
  "research/04-devialet-sponsorship-playbook.md",
  "research/05-event-inspiration.md",
  "research/06-mlab-prive-strategy.md",
  "research/07-sync-collab-and-broadcast.md",
  "research/08-vanguard-ritual-concepts.md",
  "research/09-brand-architecture-and-essence.md",
];

// Strategy docs live flat in the vault root but are exposed under content/strategy/
// with stable, route-friendly slugs. { src in vault → dst in content }.
const STRATEGY_MAP = [
  { src: "LOWTIDE-SINTESIS.md", dst: "strategy/01-sintesis-proyecto.md" },
  { src: "VENUES-VALENCIA.md", dst: "strategy/02-venues-valencia.md" },
  { src: "PLAN-EVENTOS-SPONSORS.md", dst: "strategy/03-plan-eventos-sponsors.md" },
];

async function copyMapped(src, dst) {
  const s = path.join(VAULT, src);
  const d = path.join(TARGET, dst);
  try {
    await fs.access(s);
  } catch {
    return { rel: dst, ok: false, reason: "missing in vault" };
  }
  await fs.mkdir(path.dirname(d), { recursive: true });
  await fs.copyFile(s, d);
  return { rel: dst, ok: true };
}

async function copyOne(rel) {
  const src = path.join(VAULT, rel);
  const dst = path.join(TARGET, rel);
  try {
    await fs.access(src);
  } catch {
    return { rel, ok: false, reason: "missing in vault" };
  }
  await fs.mkdir(path.dirname(dst), { recursive: true });
  await fs.copyFile(src, dst);
  return { rel, ok: true };
}

async function syncDir(rel) {
  const srcDir = path.join(VAULT, rel);
  const dstDir = path.join(TARGET, rel);
  try {
    await fs.access(srcDir);
  } catch {
    return { rel, ok: false, count: 0, reason: "missing in vault" };
  }
  await fs.mkdir(dstDir, { recursive: true });
  const files = (await fs.readdir(srcDir)).filter((f) => f.endsWith(".md"));
  for (const f of files) {
    await fs.copyFile(path.join(srcDir, f), path.join(dstDir, f));
  }
  return { rel, ok: true, count: files.length };
}

async function main() {
  await fs.mkdir(TARGET, { recursive: true });
  const results = await Promise.all(FILES.map(copyOne));
  const ok = results.filter((r) => r.ok).length;
  const skipped = results.filter((r) => !r.ok);
  console.log(`[sync-content] ${ok}/${FILES.length} files synced from vault → content/`);
  for (const s of skipped) console.log(`  · skipped ${s.rel} (${s.reason})`);

  const strategyResults = await Promise.all(STRATEGY_MAP.map((m) => copyMapped(m.src, m.dst)));
  const strategyOk = strategyResults.filter((r) => r.ok).length;
  console.log(`[sync-content] ${strategyOk}/${STRATEGY_MAP.length} strategy docs synced from vault → content/strategy/`);
  for (const s of strategyResults.filter((r) => !r.ok)) console.log(`  · skipped ${s.rel} (${s.reason})`);

  const briefings = await syncDir("briefings");
  if (briefings.ok) console.log(`[sync-content] ${briefings.count} briefings synced`);
  else console.log(`  · briefings dir skipped (${briefings.reason})`);
}

main().catch((e) => {
  console.error("[sync-content] failed:", e);
  process.exit(1);
});
