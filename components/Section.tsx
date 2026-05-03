export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-5 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-20 md:py-24">
      <header className="mb-10 md:mb-12 max-w-3xl">
        <div className="label text-muted mb-4 sm:mb-5">{eyebrow}</div>
        <h2 className="display text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-4">{title}</h2>
        {lede && <p className="text-base sm:text-lg leading-relaxed text-muted max-w-2xl">{lede}</p>}
      </header>
      {children}
    </section>
  );
}

export function HairlineDivider() {
  return (
    <div className="px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="hairline" />
    </div>
  );
}
