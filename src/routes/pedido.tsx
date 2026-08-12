import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pedido")({
  head: () => ({
    meta: [
      { title: "Pedir Online — Cerqueira's Pizza" },
      {
        name: "description",
        content:
          "Peça sua pizza da Cerqueira's Pizza pelo WhatsApp. Delivery e retirada em Cururupe, Ilhéus/BA, de terça a domingo das 18h às 22h.",
      },
      { property: "og:title", content: "Pedir Online — Cerqueira's Pizza" },
      {
        property: "og:description",
        content: "Delivery e retirada em Ilhéus/BA. Peça pelo WhatsApp, terça a domingo, 18h às 22h.",
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
    href: "https://wa.me/message/DIYAGYHKRP3KC1",
    cta: "Chamar no WhatsApp",
    note: "Delivery e retirada",
  },
  {
    name: "Instagram",
    desc: "Veja as novidades, sabores da semana e chame no direct.",
    href: "https://www.instagram.com/cerqueiraspizza",
    cta: "Abrir Instagram",
    note: "@cerqueiraspizza",
  },
];

const steps = [
  { n: "01", t: "Chame no WhatsApp", d: "Fale com a gente pelo link acima." },
  { n: "02", t: "Monte seu pedido", d: "Escolha as pizzas e bebidas do cardápio." },
  { n: "03", t: "Receba ou retire", d: "Delivery na sua casa ou retirada na pizzaria." },
];

function Pedido() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Pedir online</p>
        <h1 className="mt-3 font-display text-5xl font-bold text-cream">Sua pizza a caminho</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Atendemos de terça a domingo, das 18h às 22h. Cozinhamos assim que o pedido chega.
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
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
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
        <p className="text-sm text-muted-foreground">Horário de atendimento</p>
        <p className="mt-2 font-display text-3xl font-bold text-gold">Terça a domingo · 18h — 22h</p>
        <p className="mt-4 text-sm text-muted-foreground">Cururupe · Ilhéus / BA</p>
      </div>
    </div>
  );
}
