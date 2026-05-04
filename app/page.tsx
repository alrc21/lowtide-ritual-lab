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
import { Essence } from "@/components/Essence";
import { Lanes } from "@/components/Lanes";
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
        id="essence"
        eyebrow="Section 01 · Why we exist"
        title="Essence"
        lede="Four pillars. Above the P&L. Each one is a sentence, a way to measure ourselves, and a list of what we refuse — because the rules of refusal are what make the rest possible."
      >
        <Essence />
      </Section>

      <HairlineDivider />
      <Section
        id="lanes"
        eyebrow="Section 02 · The four ways of gathering"
        title="Lanes"
        lede="Lowtide is the music house. The lanes are the products. Afterglow for runners, Listening for Devialet-tier dusks, Privé for the underground (co-owned with Mlab, on aliases), Flagship for the 2× per year programmed arc. One brand, four postures, codified refusals."
      >
        <Lanes />
      </Section>

      <HairlineDivider />
      <Section
        id="brief"
        eyebrow="Section 03 · Executive synthesis"
        title="The Brief"
        lede="Synthesis of the research. Strategic verdict, 2026 revenue map, productised formats, what Lowtide refuses."
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
        eyebrow="Section 04 · Open strategic forks"
        title="Decisions"
        lede="Where Lowtide is at a fork. Each decision shows the recommendation, why, the options weighed, and what to do next. Deeper analysis lives in Research."
      >
        <Decisions />
      </Section>

      <HairlineDivider />
      <Section
        id="research"
        eyebrow="Section 05 · Phase 1 deliverables"
        title="Research"
        lede="Self-contained documents — each ends with concrete implications for Lowtide. Numbers flagged [verify] need a sourcing pass before externalising."
      >
        <ResearchGrid docs={research} />
      </Section>

      <HairlineDivider />
      <Section
        id="inspiration"
        eyebrow="Section 06 · What already worked"
        title="Inspiration Gallery"
        lede="A sourcebook of real events from Daybreaker, Devialet, wellness × music, run-clubs, and Spain-anchored peers. Mechanics, formats, EUR pricing. Concept seeds at the bottom turn the references into Valencia-specific ideas."
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
        eyebrow="Section 07 · The Lowtide product line"
        title="Concepts"
        lede="Eight named ritual concepts — Mediterranean coding, Devialet-tier production, ranged for Valencia first. Each card is the seed of a real event."
      >
        <Concepts concepts={concepts} />
      </Section>

      <HairlineDivider />
      <Section
        id="identity"
        eyebrow="Section 08 · Define the project"
        title="Identity Canvas"
        lede="The questions that turn research into a product. Fill these in your voice — drafts auto-save to your browser. Download as Markdown when you're ready to hand it to Claude or paste into IDENTITY.md."
      >
        <IdentityCanvas />
      </Section>

      <HairlineDivider />
      <Section
        id="pipeline"
        eyebrow="Section 09 · Operations"
        title="Pipeline & Devialet"
        lede="The operational layer below the values. B2B opportunities, the four flagships, and the Devialet deal sequence A → B → C."
      >
        <div className="space-y-16 sm:space-y-20">
          <Pipeline />
          <div className="hairline" />
          <DevialetTracker />
        </div>
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
            We&apos;re a Valencia music house with four ways of gathering — a run, a listening, a club, a ritual. Built to make us better DJs and a real community at the same time.
          </div>
        </div>
      </footer>
    </main>
  );
}
