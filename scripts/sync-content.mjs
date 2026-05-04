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

async function main() {
  await fs.mkdir(TARGET, { recursive: true });
  const results = await Promise.all(FILES.map(copyOne));
  const ok = results.filter((r) => r.ok).length;
  const skipped = results.filter((r) => !r.ok);
  console.log(`[sync-content] ${ok}/${FILES.length} files synced from vault → content/`);
  for (const s of skipped) console.log(`  · skipped ${s.rel} (${s.reason})`);
}

main().catch((e) => {
  console.error("[sync-content] failed:", e);
  process.exit(1);
});
