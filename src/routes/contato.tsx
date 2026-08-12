import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Localização & Contato — Forno D'Oro Pizzaria" },
      {
        name: "description",
        content:
          "Visite a Forno D'Oro em Salvador. Endereço, horários, telefone e mapa para a pizzaria artesanal com forno a lenha.",
      },
      { property: "og:title", content: "Localização & Contato — Forno D'Oro Pizzaria" },
      {
        property: "og:description",
        content:
          "Endereço, horários, telefone e mapa para a Forno D'Oro em Salvador.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contato,
});

const infos = [
  { label: "Endereço", value: "Rua das Pizzas, 123 — Barra, Salvador / BA, 40140-000" },
  { label: "Telefone", value: "(71) 3333-4444" },
  { label: "WhatsApp", value: "(71) 99999-0000" },
  { label: "E-mail", value: "ola@fornodoro.com.br" },
];

const hours = [
  { d: "Terça a Quinta", h: "18h — 23h" },
  { d: "Sexta e Sábado", h: "18h — 23h30" },
  { d: "Domingo", h: "18h — 23h" },
  { d: "Segunda", h: "Fechado" },
];

function Contato() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Localização & contato
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold text-cream">Venha nos visitar</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Estamos na Barra, em Salvador. Passe para comer no local ou peça para entrega.
        </p>
        <div className="mx-auto mt-6 h-px max-w-xs hairline-gold" />
      </header>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        {/* Map */}
        <div className="overflow-hidden rounded-2xl border border-border/60">
          <iframe
            title="Mapa da Forno D'Oro Pizzaria"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-38.6650%2C-13.0120%2C-38.6320%2C-12.9890&layer=mapnik&marker=-13.0005%2C-38.6485"
            className="h-80 w-full md:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <dl className="space-y-6">
            {infos.map((i) => (
              <div key={i.label} className="border-b border-border/40 pb-4">
                <dt className="text-xs font-semibold uppercase tracking-widest text-gold">
                  {i.label}
                </dt>
                <dd className="mt-1 font-display text-lg text-cream">{i.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Horários</p>
            <ul className="mt-3 space-y-2">
              {hours.map((h) => (
                <li
                  key={h.d}
                  className="flex items-center justify-between text-sm text-muted-foreground"
                >
                  <span>{h.d}</span>
                  <span className="text-cream">{h.h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://wa.me/5571999990000"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
            >
              WhatsApp
            </a>
            <a
              href="tel:+557133334444"
              className="rounded-full border border-gold/50 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Ligar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
