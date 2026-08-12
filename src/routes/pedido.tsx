import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pedido")({
  head: () => ({
    meta: [
      { title: "Pedir Online — Forno D'Oro Pizzaria" },
      {
        name: "description",
        content:
          "Peça sua pizza da Forno D'Oro pelo WhatsApp ou iFood. Entrega em Salvador em até 40 minutos.",
      },
      { property: "og:title", content: "Pedir Online — Forno D'Oro Pizzaria" },
      {
        property: "og:description",
        content:
          "Peça sua pizza da Forno D'Oro pelo WhatsApp ou iFood. Entrega em Salvador em até 40 minutos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pedido,
});

const channels = [
  {
    name: "WhatsApp",
    desc: "Peça direto com a gente. Atendimento humano e cardápio completo.",
    href: "https://wa.me/5571999990000",
    cta: "Chamar no WhatsApp",
    note: "Resposta em até 5 minutos",
  },
  {
    name: "iFood",
    desc: "Peça pelo app com cupons e pagamento online.",
    href: "https://www.ifood.com.br",
    cta: "Abrir no iFood",
    note: "Pagamento online disponível",
  },
];

const steps = [
  { n: "01", t: "Escolha o canal", d: "WhatsApp ou iFood, como preferir." },
  { n: "02", t: "Monte seu pedido", d: "Selecione pizzas, entradas e bebidas." },
  { n: "03", t: "Receba quentinha", d: "Entrega em Salvador em até 40 minutos." },
];

function Pedido() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Pedir online
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold text-cream">Sua pizza a caminho</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Escolha o canal de entrega mais conveniente para você. Cozinhamos assim que o pedido
          chega.
        </p>
        <div className="mx-auto mt-6 h-px max-w-xs hairline-gold" />
      </header>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {channels.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-8 transition-colors hover:border-gold/60"
          >
            <div>
              <h2 className="font-display text-3xl font-bold text-cream">{c.name}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-gold">{c.note}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform group-hover:scale-105">
                {c.cta}
              </span>
            </div>
          </a>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="text-center font-display text-2xl font-bold text-cream">Como funciona</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border/40 bg-card/40 p-6 text-center">
              <p className="gold-text font-display text-4xl font-bold">{s.n}</p>
              <p className="mt-3 font-display text-lg font-bold text-cream">{s.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 rounded-2xl border border-gold/30 bg-secondary/40 p-8 text-center sm:p-12">
        <p className="text-sm text-muted-foreground">Prefere ligar?</p>
        <a
          href="tel:+557133334444"
          className="mt-2 inline-block font-display text-3xl font-bold text-gold transition-colors hover:text-gold-bright"
        >
          (71) 3333-4444
        </a>
        <p className="mt-4 text-sm text-muted-foreground">Ter a Dom · 18h — 23h30</p>
      </div>
    </div>
  );
}
