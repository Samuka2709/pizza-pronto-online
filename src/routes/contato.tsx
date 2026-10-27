import { createFileRoute } from "@tanstack/react-router";
import { OG_IMAGE as ogImage } from "@/lib/site";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Localização & Contato — Cerqueira's Pizza" },
      {
        name: "description",
        content:
          "Cerqueira's Pizza em Cururupe, Ilhéus/BA. Horários de terça a domingo das 18h às 22h, WhatsApp, Instagram e mapa.",
      },
      { property: "og:title", content: "Localização & Contato — Cerqueira's Pizza" },
      {
        property: "og:description",
        content: "Cururupe, Ilhéus/BA. Terça a domingo, 18h às 22h. Delivery.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: Contato,
});

const infos = [
  { label: "Bairro", value: "Cururupe — Ilhéus / BA" },
  { label: "WhatsApp", value: "(73) 99854-8191" },
  { label: "Instagram", value: "@cerqueiraspizza" },
  { label: "Atendimento", value: "Delivery" },
];

const hours = [
  { d: "Terça a domingo", h: "18h — 22h" },
  { d: "Segunda", h: "Fechado" },
];

function Contato() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Localização & contato
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl md:text-5xl">
          Fale com a gente
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Estamos em Cururupe, Ilhéus/BA. Peça seu delivery pelo WhatsApp.
        </p>
        <div className="mx-auto mt-6 h-px max-w-xs hairline-gold" />
      </header>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border/60">
          <iframe
            title="Mapa da Cerqueira's Pizza em Cururupe, Ilhéus"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-39.0700%2C-14.8400%2C-39.0100%2C-14.7900&layer=mapnik&marker=-14.8150%2C-39.0400"
            className="h-80 w-full md:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

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
              href="https://wa.me/5573998548191"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/cerqueiraspizza?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold/50 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
