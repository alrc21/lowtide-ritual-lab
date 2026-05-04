type Lane = {
  num: string;
  name: string;
  tagline: string;
  positioning: string;
  audience: string;
  music: string;
  price: string;
  venue: string;
  owner: string;
  sponsors: string;
  refusal: string;
  accent: string;
};

const lanes: Lane[] = [
  {
    num: "01",
    name: "Afterglow",
    tagline: "Post-race recovery × groove. Mainstream-tolerant, brand-paid.",
    positioning:
      "The post-race / post-run recovery format with Madefor. Mainstream-tolerant selection because runners don't dance much, and when they do they want mainstream. The product is recovery + groove, not a dance floor.",
    audience: "Runners 22–40, brand-funded, free or token-priced.",
    music: "90–115 BPM, sun-coded, vocal-tolerant daytime house & disco.",
    price: "Runners free / €0–15. Brand fee €1,800–3,500 per activation.",
    venue: "Coffee terrace, chiringuito post-race, Patacona beach bar at noon, Marina warehouse with garage doors open.",
    owner: "Alberto (lead) · brother (alt) · Madefor (creative partner)",
    sponsors: "Hoka, On, Asics, NB · Maurten, Therabody · coffee partners",
    refusal: "No alcohol-led visuals · no club-late visuals · no peak-time selection · no Devialet rig (wrong context).",
    accent: "bg-terracotta-soft/30",
  },
  {
    num: "02",
    name: "Listening",
    tagline: "Devialet-tier curated dusk. The lane that carries the editorial press.",
    positioning:
      "The dusk listening circle, Vespertina-format. The Devialet-tier curated experience — the lane that carries the Devialet partnership, the editorial press, the curatorial credibility.",
    audience: "28–45 creative-class, design / hospitality / architecture, the international wellness traveler.",
    music: "Ambient, fourth-world, organic house, modern composition. 60–95 BPM. Album-in-full nights.",
    price: "€60–90 GA · €120–150 patron tier (printed program + vinyl mailer).",
    venue: "Bombas Gens · Real Colegio del Patriarca cloister · Caro Hotel courtyard · El Saler villa · Lonja de la Seda for a flagship.",
    owner: "Brother (selection-led) · Alberto (production)",
    sponsors: "Devialet · KEF · Genelec · Aesop · Le Labo · Loewe Casa · Apartamento, Cereal, Wallpaper",
    refusal: "No mainstream selection · no run-club imagery · no glassware in foreground · no late-night visuals.",
    accent: "bg-light-stone/50",
  },
  {
    num: "03",
    name: "Privé",
    tagline: "Co-owned underground with Mlab. Aliases on the lineup, brand wall.",
    positioning:
      "The Mlab-aligned underground night. Selection-led, club-credible, alcohol-friendly. Not a Lowtide-master post — co-owned with Mlab under a brand wall. The brothers appear under their artist aliases on the lineup, not as Lowtide.",
    audience: "Valencia locals 22–32, scene-literate, high loyalty. 20–30% expat tail crossing over from other lanes.",
    music: "House / techno / electro / leftfield — wherever Mlab's scene leans. Where selection gets to push without sponsor friction.",
    price: "€12–18 advance · €15–25 door. Door + bar split + club-credible sponsor.",
    venue: "Mlab's existing rotation — La 3, Spook, Cabanyal warehouse, Killing Time, Mini Club. 2.4-licensed.",
    owner: "Mlab counterparty · Alberto/brother as bookings via aliases",
    sponsors: "Beer (Estrella Galicia, Mahou) · club-credible spirits · local Valencia cultural press",
    refusal: "No cross-tagging from @lowtide grid · no Devialet equipment · no wellness imagery · 21-day window before / 7-day window after a Listening or Flagship event.",
    accent: "bg-foreground/[0.04]",
  },
  {
    num: "04",
    name: "Flagship",
    tagline: "The 2× per year programmed arc. Press, Devialet, the full ritual.",
    positioning:
      "The 2× per year ticketed flagship. Maratón Valencia weekend in December, one summer edition (June or September). Case-study generators, editorial moments, Devialet content engines. Production budget runs 2–3× a Listening event.",
    audience: "Curated cross-section of all three lanes + an international tail (wellness traveler, design press, tier-1 guests). 200–400 cap.",
    music: "A programmed arc across the day — sunrise breath → run → coffee → noon swim → afternoon Listening → sunset DJ. Multiple postures stitched into one ritual.",
    price: "€60–95 day pass · €150 patron tier with printed program / vinyl mailer.",
    venue: "Albufera + Bombas Gens combined · El Saler private finca · Cabanyal full-day takeover.",
    owner: "Alberto + brother (co-leads) · external producer for ops",
    sponsors: "Devialet (anchor) + Hoka or On + Estrella Galicia + a hotel partner. Stacked, not exclusive.",
    refusal: "No standalone DJ booking — Flagship is always a programmed arc · no undisclosed venue · no surprise lineups (press needs talent announced).",
    accent: "bg-terracotta-soft/40",
  },
];

export function Lanes() {
  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
        {lanes.map((l) => (
          <article key={l.num} className={`p-6 sm:p-8 md:p-10 flex flex-col ${l.accent}`}>
            <div className="flex items-baseline justify-between mb-4">
              <span className="label text-muted">Lane № {l.num}</span>
              <span className="label text-muted">{l.owner.split("·")[0].trim()}</span>
            </div>
            <h3 className="display text-3xl sm:text-4xl mb-2 leading-none">{l.name}</h3>
            <p className="display-light text-sm sm:text-base italic text-muted mb-6 sm:mb-7 leading-snug">
              {l.tagline}
            </p>

            <p className="text-sm leading-relaxed mb-6 text-foreground/85">{l.positioning}</p>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-6 pt-5 border-t border-foreground/10">
              <Field label="Audience" value={l.audience} />
              <Field label="Price" value={l.price} />
              <Field label="Music" value={l.music} />
              <Field label="Venue" value={l.venue} />
              <Field label="Owner" value={l.owner} />
              <Field label="Sponsor lane" value={l.sponsors} />
            </div>

            <div className="border-l-2 border-terracotta pl-4 py-1 mt-auto">
              <div className="label text-terracotta mb-2">Refusals</div>
              <p className="text-xs sm:text-sm leading-relaxed italic">{l.refusal}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="display-light text-base sm:text-lg leading-snug max-w-3xl border-l-2 border-terracotta pl-5 italic">
        We're a Valencia music house with four ways of gathering — a run, a listening, a club, a ritual — built to make us better DJs and a real community at the same time.
      </p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="label text-muted mb-1.5">{label}</div>
      <p className="text-xs sm:text-sm leading-snug">{value}</p>
    </div>
  );
}
