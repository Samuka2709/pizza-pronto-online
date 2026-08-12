import { createFileRoute } from "@tanstack/react-router";
import heroPizza from "../assets/hero-pizza.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forno D'Oro — Pizzaria Artesanal em Salvador" },
      {
        name: "description",
        content:
          "Pizzaria artesanal com forno a lenha em Salvador. Massa de fermentação natural, ingredientes frescos e entrega rápida. Peça pelo WhatsApp ou iFood.",
      },
      { property: "og:title", content: "Forno D'Oro — Pizzaria Artesanal em Salvador" },
      {
        property: "og:description",
        content:
          "Pizzaria artesanal com forno a lenha em Salvador. Massa de fermentação natural e entrega rápida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featured = [
  {
    name: "Margherita D'Oro",
    desc: "Molho de tomate San Marzano, mozzarella fresca, manjericão e fio de azeite.",
    price: "R$ 52",
  },
  {
    name: "Quattro Formaggi",
    desc: "Mozzarella, gorgonzola, parmesão e provolone, nozes e mel.",
    price: "R$ 64",
  },
  {
    name: "Calabresa Artesanal",
    desc: "Calabresa defumada fatiada, cebola roxa, azeitonas e orégano.",
    price: "R$ 58",
  },
];

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={heroPizza}
            alt="Pizza artesanal de fermentação natural saindo do forno a lenha"
            width={1600}
            height={1008}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-40">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Salvador · desde 2014
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-cream sm:text-7xl">
              O sabor do forno a lenha, feito à mão.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/80">
              Massa de fermentação natural por 48 horas, ingredientes frescos e o calor do forno
              a lenha. Cada pizza é uma pequira obra de arte.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/pedido"
                className="rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
              >
                Pedir agora
              </Link>
              <Link
                to="/cardapio"
                className="rounded-full border border-gold/50 px-7 py-3 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-gold hover:text-primary-foreground"
              >
                Ver cardápio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-border/40 bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {[
            { t: "Forno a lenha", d: "420°C de calor puro para uma crosta perfeita." },
            { t: "Massa 48h", d: "Fermentação natural lenta para leveza e digestão fácil." },
            { t: "Entrega rápida", d: "Quente na sua casa em até 40 minutos." },
          ].map((h) => (
            <div key={h.t} className="text-center sm:text-left">
              <p className="font-display text-lg font-bold text-gold">{h.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{h.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured pizzas */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Especialidades</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-cream">As queridinhas da casa</h2>
          <div className="mx-auto mt-6 h-px max-w-xs hairline-gold" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <article
              key={p.name}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-colors hover:border-gold/60"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-bold text-cream">{p.name}</h3>
                <span className="shrink-0 rounded-full bg-gold/10 px-3 py-1 text-sm font-semibold text-gold">
                  {p.price}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/cardapio"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gold transition-colors hover:text-gold-bright"
          >
            Cardápio completo
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
            Fome de pizza de verdade?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Peça pelo WhatsApp ou pelo iFood. Entregamos em toda Salvador em até 40 minutos.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5571999990000"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
            >
              Pedir pelo WhatsApp
            </a>
            <a
              href="https://www.ifood.com.br"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold/50 px-7 py-3 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Pedir no iFood
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
