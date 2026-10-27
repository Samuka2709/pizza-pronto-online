import { createFileRoute, Link } from "@tanstack/react-router";
import { sections, drinks } from "@/lib/menu";
import { Pizza } from "lucide-react";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/cardapio")({
  head: () =>
    pageHead({
      path: "/cardapio",
      title: "Cardápio — Cerqueira's Pizza",
      description:
        "Cardápio da Cerqueira's Pizza: tradicionais R$ 59,90, especiais R$ 69,90, doces 8 fatias R$ 64,90, baby 4 fatias R$ 34,90 e bebidas. Delivery em Ilhéus/BA.",
      ogDescription: "Pizzas tradicionais, especiais, doces e bebidas. Delivery em Ilhéus/BA.",
    }),
  component: Cardapio,
});

function Cardapio() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
      {/* Left decorative accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-20 lg:block"
      >
        <div className="sticky top-1/2 flex flex-col items-center gap-5 pt-32">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/60 [writing-mode:vertical-rl]">
            Sabor
          </span>
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <Pizza className="h-4 w-4 text-gold/40" />
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/60 [writing-mode:vertical-rl]">
            Carinho
          </span>
        </div>
      </div>

      {/* Right decorative accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 lg:block"
      >
        <div className="sticky top-1/2 flex flex-col items-center gap-5 pt-32">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/60 [writing-mode:vertical-rl]">
            Tradição
          </span>
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <Pizza className="h-4 w-4 text-gold/40" />
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/60 [writing-mode:vertical-rl]">
            Amor
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Nosso cardápio
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-cream sm:text-5xl">
            Feita com carinho
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Ingredientes selecionados, sabor que fica. Delivery em Cururupe, Ilhéus/BA.
          </p>
          <div className="mx-auto mt-6 h-px max-w-xs hairline-gold" />
        </header>

        <div className="mt-16 space-y-16">
          {sections.map((s) => (
            <section key={s.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-gold/30 pb-3">
                <div>
                  <h2 className="font-display text-2xl font-bold text-gold sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.note}
                  </p>
                </div>
                <span className="font-display text-2xl font-bold text-cream">{s.price}</span>
              </div>
              <div className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">
                {s.items.map((it) => (
                  <div key={it.name} className="border-b border-border/40 py-4">
                    <p className="flex flex-wrap items-center gap-2 font-display text-lg font-bold text-cream">
                      {it.name}
                      {it.tag && (
                        <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold">
                          {it.tag}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h2 className="border-b border-gold/30 pb-3 font-display text-2xl font-bold text-gold sm:text-3xl">
              Bebidas
            </h2>
            <div className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
              {drinks.map((d) => (
                <div
                  key={d.name}
                  className="flex items-baseline justify-between gap-4 border-b border-border/40 py-3"
                >
                  <span className="text-cream">{d.name}</span>
                  <span className="shrink-0 font-semibold text-gold">{d.price}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-20 rounded-2xl border border-gold/30 bg-card p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold text-cream">Bora pedir?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Escolha seu sabor favorito — delivery, de terça a domingo, das 18h às 22h.
          </p>
          <Link
            to="/pedido"
            className="mt-6 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
          >
            Monte seu pedido
          </Link>
        </div>
      </div>
    </div>
  );
}
