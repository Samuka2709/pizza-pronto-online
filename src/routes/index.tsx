import { createFileRoute, Link } from "@tanstack/react-router";
import heroPizza from "../assets/hero-pizza.jpg";
import logo from "../assets/cerqueiras-logo.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cerqueira's Pizza — Pizzaria em Cururupe, Ilhéus/BA" },
      {
        name: "description",
        content:
          "Feita com carinho, para reunir quem você ama. Pizzas tradicionais, especiais e doces em Cururupe, Ilhéus/BA. Delivery e retirada, terça a domingo das 18h às 22h.",
      },
      { property: "og:title", content: "Cerqueira's Pizza — Pizzaria em Cururupe, Ilhéus/BA" },
      {
        property: "og:description",
        content:
          "Ingredientes selecionados, sabor que fica. Delivery e retirada em Ilhéus/BA, terça a domingo das 18h às 22h.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featured = [
  {
    name: "4 Queijos",
    desc: "Mussarela, catupiry, parmesão e provolone. Nossa novidade, cremosa do começo ao fim.",
    price: "R$ 59,90",
    tag: "Novidade",
  },
  {
    name: "À Moda da Casa",
    desc: "Calabresa, bacon, catupiry e orégano. A receita especial da casa.",
    price: "R$ 69,90",
  },
  {
    name: "Lombinho com Cream Cheese",
    desc: "Lombinho defumado, cream cheese e geleia de amora. Sabor e cremosidade.",
    price: "R$ 69,90",
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
            alt="Pizza artesanal da Cerqueira's Pizza saindo do forno"
            width={1600}
            height={1008}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-40">
          <div className="max-w-2xl">
            <img
              src={logo.url}
              alt="Logo da Cerqueira's Pizza"
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border border-gold/30"
            />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Cururupe · Ilhéus / BA
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-cream sm:text-7xl">
              Feita com carinho, para reunir quem você ama.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/80">
              Ingredientes selecionados, sabor que fica. Delivery e retirada de terça a domingo,
              das 18h às 22h.
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
            { t: "Ingredientes selecionados", d: "Sabor que fica em cada fatia." },
            { t: "Delivery e retirada", d: "Escolha como preferir receber." },
            { t: "Ter a Dom · 18h — 22h", d: "Aberto todas as noites, menos segunda." },
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
              {p.tag && (
                <span className="mt-3 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold">
                  {p.tag}
                </span>
              )}
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

      {/* História */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Nossa história
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
            Mais do que um sobrenome. Uma história.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            A Cerqueira's Pizza nasceu da vontade de levar pizzas feitas com carinho para reunir
            famílias, amigos e criar bons momentos. Porque acreditamos que toda boa história sempre
            começa ao redor de uma pizza.
          </p>
          <Link
            to="/historia"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gold transition-colors hover:text-gold-bright"
          >
            Conhecer nossa história
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
            Chame no WhatsApp e escolha entre delivery ou retirada em Cururupe, Ilhéus.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/message/DIYAGYHKRP3KC1"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
            >
              Pedir pelo WhatsApp
            </a>
            <a
              href="https://www.instagram.com/cerqueiraspizza"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold/50 px-7 py-3 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Ver no Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
