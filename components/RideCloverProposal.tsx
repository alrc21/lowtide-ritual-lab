// Propuesta de colaboración Lowtide × RideClover — brief de negociación para la junta presencial.
// Datos de oferta RideClover verificados en rideclover.com (jun 2026): suscripción €69/mes, modelo
// battery-swap, Riese & Müller UBN, recién llegada a Valencia. Comisiones = posición de apertura nuestra.

const leverage = [
  { label: "Audiencia local", value: "~8.200", note: "680 Lowtide · 6.000 Made For · 1.500 V. Swim" },
  { label: "Visualizaciones · 30d", value: "54k", note: "Audiencia 100% Valencia, expat-heavy" },
  { label: "Comunidad WhatsApp", value: "600+", note: "Made For · Valencia Swim" },
  { label: "Cuerpos por amanecer", value: "80+", note: "Demo en vivo de la bici en uso" },
];

const tiers = [
  {
    code: "Nivel 1 — Bicis embajadoras",
    title: "2 bicis cedidas al equipo core",
    ask: "Cesión de 2 bicis (12 meses) a cambio de embajada + contenido recurrente.",
    get: "Vallas rodantes ante su ICP exacto en cada run, swim y gig. Contenido mensual y rol de “partner oficial de movilidad de Lowtide”.",
    cost: "~€138/mes de coste de oportunidad — no es cash, es inventario.",
    state: "lead",
  },
  {
    code: "Nivel 2 — Referidos",
    title: "Canal de adquisición, pago por resultado",
    ask: "Código único Lowtide + comisión €50–80 por suscriptor confirmado + tarifa reducida para el equipo. [confirmar]",
    get: "Adquisición local a CAC bajo, paga solo si convertimos, y la densidad de suscriptores que su modelo de swap necesita en su ciudad de lanzamiento.",
    cost: "€0 fijo. Solo paga sobre resultado.",
    state: "win",
  },
  {
    code: "Nivel 3 — Activación DJ en bici Duo",
    title: "El sonido rueda en la bici",
    ask: "Préstamo de una bici Duo para un set DJ rodante junto a los corredores/nadadores al amanecer.",
    get: "Momento de marca + contenido en un ritual auténtico, no un anuncio. Un lanzamiento en Valencia que el dinero no compra fácil.",
    cost: "Préstamo puntual por activación.",
    state: "moment",
  },
];

const giveGet = [
  {
    we: "2 bicis cedidas 12 meses",
    them: "Presencia diaria ante audiencia activa + expat de Valencia",
  },
  {
    we: "Código de referido + comisión por suscriptor",
    them: "Canal de crecimiento medible, pagado solo por conversión",
  },
  {
    we: "Tarifa reducida para el equipo",
    them: "Embajadores reales montando su producto cada día",
  },
  {
    we: "Bici Duo para activación DJ",
    them: "Reels y momento de marca en sus rituales de amanecer",
  },
  {
    we: "Exclusividad: única marca de e-bike de Lowtide",
    them: "Categoría blindada frente a competidores en la escena local",
  },
];

const posture = [
  {
    code: "Apertura",
    desc: "Presentar el paquete completo de 3 niveles como una sola colaboración. Marco: no pedimos un favor, ofrecemos densidad local en su ciudad de lanzamiento.",
  },
  {
    code: "Suelo — no salir con las manos vacías",
    desc: "Cerrar como mínimo N1 (bicis) o N2 (referidos). Si solo entra uno, que sea uno con continuidad.",
  },
  {
    code: "Fichas de intercambio",
    desc: "A cambio de mejores condiciones: ofrecer exclusividad de marca, más volumen de contenido, o fechas de activación garantizadas en el calendario.",
  },
];

const script = [
  "“Nos prestasteis una bici un mes y la hemos vivido. Os traemos algo concreto, no una idea.”",
  "“Vuestro modelo de swap necesita densidad local. Nosotros somos la vía más rápida y barata a vuestro cliente exacto en Valencia: activo, expat, sin coche.”",
  "“Queremos ser vuestro canal de adquisición pagado por resultado — más dos bicis para el equipo y una activación que os pone en el centro de un ritual real.”",
];

const stateStyles: Record<string, string> = {
  lead: "bg-terracotta-soft/30 border-terracotta",
  win: "bg-light-stone/40 border-foreground/15",
  moment: "bg-background border-foreground/10",
};

export function RideCloverProposal() {
  return (
    <div className="space-y-14">
      {/* Snapshot + el insight de densidad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <div className="p-6 sm:p-7 border border-foreground/10 bg-background">
          <div className="label text-muted mb-3">Qué es RideClover</div>
          <p className="text-sm sm:text-base leading-relaxed">
            No alquila, <strong>suscribe</strong>: €69/mes todo incluido (batería, seguro,
            mantenimiento), bici premium Riese &amp; Müller, modelo <em>battery-swap</em>. Acaban de
            aterrizar en Valencia y nos prestaron una un mes.
          </p>
        </div>
        <div className="p-6 sm:p-7 border border-terracotta bg-terracotta-soft/30">
          <div className="label text-muted mb-3">La palanca</div>
          <p className="text-sm sm:text-base leading-relaxed">
            Un modelo de swap <strong>necesita densidad local de suscriptores</strong> para ser
            viable. Sus primeros clientes en su ciudad de lanzamiento valen oro — y nosotros tenemos
            justo eso: audiencia hiper-local de Valencia, activa y expat. Su cliente ideal.
          </p>
        </div>
      </div>

      {/* Nuestra leverage: los números */}
      <div>
        <div className="label text-muted mb-5">Lo que ponemos en la mesa</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
          {leverage.map((m) => (
            <div key={m.label} className="bg-background p-5 sm:p-6">
              <div className="label text-muted mb-2 sm:mb-3">{m.label}</div>
              <div className="display text-2xl sm:text-3xl mb-1 sm:mb-2 leading-tight">{m.value}</div>
              <div className="text-xs sm:text-sm text-muted">{m.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Paquete escalonado de 3 niveles */}
      <div>
        <div className="label text-muted mb-5">El paquete — pedimos los tres, ellos eligen entrada</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          {tiers.map((t) => (
            <div key={t.code} className={`p-6 sm:p-7 border flex flex-col ${stateStyles[t.state]}`}>
              <div className="label text-muted mb-3">{t.code}</div>
              <div className="display text-lg mb-4">{t.title}</div>
              <div className="space-y-3 text-sm leading-relaxed flex-1">
                <p>
                  <span className="label text-muted block mb-1">Pedimos</span>
                  {t.ask}
                </p>
                <p>
                  <span className="label text-muted block mb-1">Obtienen</span>
                  {t.get}
                </p>
              </div>
              <p className="text-xs text-muted italic mt-4 pt-4 border-t border-foreground/10">
                {t.cost}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla give / get */}
      <div>
        <div className="label text-muted mb-5">Qué queremos / qué obtienen</div>
        <div className="border border-foreground/10">
          <div className="grid grid-cols-2 gap-px bg-foreground/10">
            <div className="bg-background p-4 label text-muted">Lowtide pide</div>
            <div className="bg-background p-4 label text-muted">RideClover obtiene</div>
            {giveGet.map((r) => (
              <Row key={r.we} we={r.we} them={r.them} />
            ))}
          </div>
        </div>
      </div>

      {/* Postura de negociación */}
      <div>
        <div className="label text-muted mb-5">Postura de negociación</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
          {posture.map((p) => (
            <div key={p.code} className="bg-background p-6 sm:p-7">
              <div className="display text-terracotta mb-3">{p.code}</div>
              <p className="text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guion de la junta */}
      <div>
        <div className="label text-muted mb-5">Guion para la mesa</div>
        <ul className="space-y-4 max-w-3xl">
          {script.map((s, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="display text-terracotta text-lg shrink-0 leading-none mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base sm:text-lg leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pullquote del giro */}
      <p className="display-light text-xl md:text-2xl max-w-3xl border-l-2 border-terracotta pl-6 italic">
        No pedimos un favor — somos su canal de adquisición local, pagado por resultado. Eso cambia
        quién necesita a quién.
      </p>

      {/* Gaps a confirmar */}
      <div className="text-xs text-muted leading-relaxed max-w-3xl pt-2">
        <span className="label">A confirmar antes / en la junta</span>
        <br />
        Las comisiones €50–80/suscriptor son nuestra posición de apertura, no términos suyos · el CAC
        de referencia es estimación de industria · “1.5” se interpreta como 1.500 seguidores de
        Valencia Swim · verificar si ya tienen programa de referidos y ajustar · cerrar nº exacto de
        bicis y fechas de activación.
      </div>
    </div>
  );
}

function Row({ we, them }: { we: string; them: string }) {
  return (
    <>
      <div className="bg-background p-4 text-sm leading-relaxed">{we}</div>
      <div className="bg-background p-4 text-sm leading-relaxed">{them}</div>
    </>
  );
}
