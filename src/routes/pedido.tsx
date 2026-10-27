import { createFileRoute } from "@tanstack/react-router";
import { OrderBuilder } from "@/components/OrderBuilder";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/pedido")({
  head: () =>
    pageHead({
      path: "/pedido",
      title: "Pedir Online — Cerqueira's Pizza",
      description:
        "Peça sua pizza da Cerqueira's Pizza pelo WhatsApp. Delivery em Cururupe, Ilhéus/BA, de terça a domingo das 18h às 22h.",
      ogDescription: "Delivery em Ilhéus/BA. Peça pelo WhatsApp, terça a domingo, 18h às 22h.",
    }),
  component: Pedido,
});

const channels = [
  {
    name: "WhatsApp",
    desc: "Peça direto com a gente. Atendimento humano e cardápio completo.",
    href: "https://wa.me/5573998548191",
    cta: "Chamar no WhatsApp",
    note: "Delivery",
  },
  {
    name: "Instagram",
    desc: "Veja as novidades, sabores da semana e chame no direct.",
    href: "https://www.instagram.com/cerqueiraspizza?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    cta: "Abrir Instagram",
    note: "@cerqueiraspizza",
  },
];

const steps = [
  { n: "01", t: "Monte seu pedido", d: "Escolha as pizzas, os sabores e as bebidas aqui no site." },
  { n: "02", t: "Envie pelo WhatsApp", d: "Sua mensagem já vai pronta, é só confirmar o envio." },
  { n: "03", t: "Receba em casa", d: "Entregamos quentinha, direto na sua porta." },
];

function Pedido() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Pedir online</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-cream sm:text-5xl">
          Sua pizza a caminho
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Atendemos de terça a domingo, das 18h às 22h. Cozinhamos assim que o pedido chega.
        </p>
        <div className="mx-auto mt-6 h-px max-w-xs hairline-gold" />
      </header>

      <OrderBuilder />

      <h2 className="mt-24 text-center font-display text-2xl font-bold text-cream">
        Prefere falar com a gente?
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {channels.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-8 transition-colors hover:border-gold/60"
          >
            <div>
              <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">{c.name}</h2>
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
            <div
              key={s.n}
              className="rounded-2xl border border-border/40 bg-card/40 p-6 text-center"
            >
              <p className="gold-text font-display text-4xl font-bold">{s.n}</p>
              <p className="mt-3 font-display text-lg font-bold text-cream">{s.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 rounded-2xl border border-gold/30 bg-secondary/40 p-8 text-center sm:p-12">
        <p className="text-sm text-muted-foreground">Horário de atendimento</p>
        <p className="mt-2 font-display text-3xl font-bold text-gold">
          Terça a domingo · 18h — 22h
        </p>
        <p className="mt-4 text-sm text-muted-foreground">Cururupe · Ilhéus / BA</p>
      </div>
    </div>
  );
}
