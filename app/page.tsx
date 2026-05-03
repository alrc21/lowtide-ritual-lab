import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { MetricsRow } from "@/components/MetricsRow";
import { Section, HairlineDivider } from "@/components/Section";
import { Md } from "@/components/Md";
import { ResearchGrid } from "@/components/ResearchGrid";
import { IdentityCanvas } from "@/components/IdentityCanvas";
import { Pipeline } from "@/components/Pipeline";
import { DevialetTracker } from "@/components/DevialetTracker";
import { InspirationGallery } from "@/components/InspirationGallery";
import { Decisions } from "@/components/Decisions";
import { Concepts } from "@/components/Concepts";
import { tryReadMd, getResearch, getInspiration, getConcepts } from "@/lib/data";

export default async function Home() {
  const brief = await tryReadMd("BRIEF.md");
  const research = await getResearch();
  const inspiration = await getInspiration();
  const concepts = await getConcepts();

  return (
    <main>
      <Nav />
      <Hero />
      <MetricsRow />

      <HairlineDivider />
      <Section
        id="brief"
        eyebrow="Section 01 · Executive synthesis"
        title="The Brief"
        lede="Synthesis of four research documents. The strategic verdict, the 2026 revenue map, the three productised formats, and what Lowtide refuses."
      >
        {brief ? (
          <Md>{brief.content}</Md>
        ) : (
          <p className="text-muted italic">BRIEF.md not found.</p>
        )}
      </Section>

      <HairlineDivider />
      <Section
        id="decisions"
        eyebrow="Section 02 · Open strategic forks"
        title="Decisions"
        lede="Where Lowtide is at a fork. Each decision shows the recommendation, why, the options weighed, and what to do next. Deeper analysis lives in Research."
      >
        <Decisions />
      </Section>

      <HairlineDivider />
      <Section
        id="research"
        eyebrow="Section 03 · Phase 1 deliverables"
        title="Research"
        lede="Four self-contained documents. Each ends with concrete implications for Lowtide. Numbers flagged [verify] need a sourcing pass before externalising."
      >
        <ResearchGrid docs={research} />
      </Section>

      <HairlineDivider />
      <Section
        id="inspiration"
        eyebrow="Section 04 · What already worked"
        title="Inspiration Gallery"
        lede="A sourcebook of real events from Daybreaker, Devialet, wellness × music, run-clubs, and Spain-anchored peers. Mechanics, formats, and EUR pricing — picked apart for what Lowtide can steal. Concept seeds at the bottom turn the references into Valencia-specific ideas."
      >
        {inspiration ? (
          <InspirationGallery data={inspiration} />
        ) : (
          <p className="text-muted italic">05-event-inspiration.md not found.</p>
        )}
      </Section>

      <HairlineDivider />
      <Section
        id="concepts"
        eyebrow="Section 05 · The Lowtide product line"
        title="Concepts"
        lede="Eight named, vanguard ritual concepts — Mediterranean coding, Devialet-tier production, ranged for Valencia first. Each card is the seed of a real event; the full doc adds run-of-show details, P&Ls, and a 90-day validation roadmap."
      >
        <Concepts concepts={concepts} />
      </Section>

      <HairlineDivider />
      <Section
        id="identity"
        eyebrow="Section 06 · Define the project"
        title="Identity Canvas"
        lede="The questions that turn research into a product. Fill these in your voice — drafts auto-save to your browser. Download as Markdown when you're ready to hand it to Claude or paste into IDENTITY.md."
      >
        <IdentityCanvas />
      </Section>

      <HairlineDivider />
      <Section
        id="pipeline"
        eyebrow="Section 07 · Bookings & flagships"
        title="Pipeline"
        lede="B2B opportunities and the four ticketed flagships of 2026 — Equinox, Vespertina, Salar, Marea."
      >
        <Pipeline />
      </Section>

      <HairlineDivider />
      <Section
        id="devialet"
        eyebrow="Section 08 · The credibility multiplier"
        title="Devialet Tracker"
        lede="The deal sequence is A → B → C, never D. Event 1 is the decision."
      >
        <DevialetTracker />
      </Section>

      <HairlineDivider />
      <footer className="px-5 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
          <div>
            <div className="display text-xl mb-2">
              Lowtide Ritual <span className="text-terracotta">Lab</span>
            </div>
            <div className="label text-muted">Valencia · Spain · 2026</div>
          </div>
          <div className="text-sm text-muted max-w-md">
            This dashboard is a local-first canvas. Every section is backed by a markdown file in the project vault. Edit there, reload, the canvas updates.
          </div>
        </div>
      </footer>
    </main>
  );
}
