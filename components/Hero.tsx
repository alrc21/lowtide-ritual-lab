export function Hero() {
  return (
    <header id="top" className="px-5 sm:px-8 md:px-16 lg:px-24 pt-14 pb-24 sm:pt-20 sm:pb-32 md:pt-28 md:pb-40 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6 sm:mb-8 flex-wrap">
        <span className="label text-muted">Valencia · Spain · 2026</span>
        <span className="w-1 h-1 rounded-full bg-stone" />
        <span className="label text-terracotta">The Lab</span>
      </div>
      <h1 className="display text-[2.5rem] leading-[1.02] sm:text-5xl md:text-7xl lg:text-8xl sm:leading-[0.95] max-w-5xl mb-8 sm:mb-10">
        A listening ritual where running, the Mediterranean, and high-fidelity sound meet.
      </h1>
      <p className="font-[var(--font-body)] text-lg sm:text-xl md:text-2xl leading-relaxed text-muted max-w-3xl">
        This is the lab side of Lowtide — where strategy, research, identity, and pipeline get worked out before they become events.
      </p>
      <div className="absolute -right-32 -top-20 w-[40rem] h-[40rem] rounded-full bg-terracotta/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-40 bottom-0 w-[28rem] h-[28rem] rounded-full bg-stone/30 blur-3xl pointer-events-none" />
    </header>
  );
}
