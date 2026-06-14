const items = [
  { href: "#essence", label: "Essence" },
  { href: "#lanes", label: "Lanes" },
  { href: "#briefings", label: "Briefings" },
  { href: "#brief", label: "Brief" },
  { href: "#decisions", label: "Decisions" },
  { href: "#research", label: "Research" },
  { href: "#strategy", label: "Strategy" },
  { href: "#concepts", label: "Concepts" },
  { href: "#identity", label: "Identity" },
  { href: "#pipeline", label: "Ops" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-foreground/10">
      <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 py-5">
        <a href="#top" className="display text-base sm:text-lg tracking-tight whitespace-nowrap">
          Lowtide Ritual <span className="text-terracotta">Lab</span>
        </a>
        <ul className="hidden lg:flex gap-8">
          {items.map((i) => (
            <li key={i.href}>
              <a href={i.href} className="label hover:text-terracotta transition-colors duration-300">
                {i.label}
              </a>
            </li>
          ))}
        </ul>
        <details className="lg:hidden relative">
          <summary className="label cursor-pointer list-none select-none">Menu</summary>
          <ul className="absolute right-0 top-full mt-3 bg-background border border-foreground/10 py-2 min-w-[12rem] shadow-lg">
            {items.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  className="label block px-5 py-2.5 hover:text-terracotta hover:bg-light-stone/30 transition-colors"
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </nav>
  );
}
