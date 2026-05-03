# Lowtide Ritual — Command Center

Local-first strategic dashboard for Lowtide Ritual. Reads markdown snapshots from `content/`. Vault MDs at `../BRIEF.md` and `../research/*.md` are the source of truth — `content/` is a synced snapshot for production.

## Stack

- Next.js 15 (App Router) · React 19 · Tailwind v4
- Cabinet Grotesk + Sentient via Fontshare CDN (matches lowtideritual.com)
- gray-matter + react-markdown for vault MDs

## Architecture

```
…/lowtide/
├─ BRIEF.md                   ← source of truth
├─ research/                  ← source of truth
│  ├─ 01-global-references.md
│  ├─ 02-valencia-spain-operating-reality.md
│  ├─ 03-b2b-vs-ticketing-economics.md
│  ├─ 04-devialet-sponsorship-playbook.md
│  ├─ 05-event-inspiration.md
│  └─ 06-mlab-prive-strategy.md
└─ dashboard/
   ├─ content/                ← synced snapshot (committed; what Vercel reads)
   └─ scripts/sync-content.mjs ← copies vault → content/
```

`npm run sync` copies vault MDs into `content/`. Runs automatically on `predev` and `prebuild`. On Vercel the script is a no-op (the vault path doesn't exist) — Vercel just reads the committed snapshot.

## Local development

```bash
npm install
npm run dev   # syncs first, then http://localhost:3030
```

Edit MDs in the vault, then `npm run sync` (or restart dev) to refresh the snapshot.

## Production · Vercel

**One-time setup:**
1. Push the Medusa Quantum repo (or this subdirectory as its own repo) to GitHub.
2. Vercel → Add Project → import the repo.
3. Set **Root Directory** to `03-experiencias/lowtide/dashboard`.
4. Framework preset: Next.js (auto-detected via `vercel.json`). Region: `cdg1` (Paris) closest to Valencia.
5. Deploy.

**Updating prod:**
1. Edit `BRIEF.md` or `research/*.md` in the vault.
2. `cd 03-experiencias/lowtide/dashboard && npm run sync`.
3. Commit `content/` + push. Vercel rebuilds automatically.

The nightly EOD launchd sync (per Medusa Quantum dashboard architecture) can be wired to run `npm run sync && git commit + push` if you want hands-free prod refresh.

## Design

Matches lowtideritual.com identity: warm off-white `#F4F1ED`, deep charcoal `#1A1A1A`, sun-bleached terracotta `#D8A37B`, Cabinet Grotesk display + Sentient body. Subtle radial gradients (terracotta + stone) replace the hard-gradient request from the brief while staying inside the editorial system.

## Sections

1. **Brief** — renders `BRIEF.md`.
2. **Research** — 4 deep-dive docs, opens to `/research/[slug]`.
3. **Inspiration Gallery** — 26 real events from `05-event-inspiration.md`, parsed into bucketed cards + patterns + concept seeds.
4. **Identity Canvas** — six prompts ready to fill in the next session.
5. **Pipeline** — B2B leads + 2026 flagship calendar (Equinox · Vespertina · Salar · Marea).
6. **Devialet Tracker** — A → B → C deal phases + 30/60/90 plan.

Identity, Pipeline, and Devialet seed data currently live inline in components — wire to MD-backed files in the next iteration so edits persist via the same sync mechanism.
