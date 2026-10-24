import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Flame, MapPin, Pizza, Truck } from "lucide-react";
import heroPizza from "../assets/hero-lombinho.webp";
import logo from "../assets/cerqueiras-logo.jpg.asset.json";

const siteUrl = "https://pizza-pronto-online.vercel.app";
const ogImage = `${siteUrl}/cerqueiras-logo.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cerqueira's Pizza — Pizzaria em Cururupe, Ilhéus/BA" },
      {
        name: "description",
        content:
          "Feita com carinho, para reunir quem você ama. Pizzas tradicionais, especiais e doces em Cururupe, Ilhéus/BA. Delivery, terça a domingo das 18h às 22h.",
      },
      { property: "og:title", content: "Cerqueira's Pizza — Pizzaria em Cururupe, Ilhéus/BA" },
      {
        property: "og:description",
        content:
          "Ingredientes selecionados, sabor que fica. Delivery em Ilhéus/BA, terça a domingo das 18h às 22h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "preload", as: "image", href: heroPizza, fetchpriority: "high" },
      { rel: "canonical", href: "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Cerqueira's Pizza",
          image: ogImage,
          servesCuisine: "Pizza",
          priceRange: "R$ 34,90 - R$ 69,90",
          telephone: "+55 73 99854-8191",
          url: siteUrl,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ilhéus",
            addressRegion: "BA",
            addressCountry: "BR",
            streetAddress: "Cururupe",
          },
          sameAs: ["https://www.instagram.com/cerqueiraspizza"],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "18:00",
              closes: "22:00",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const featured = [
  {
    name: "4 Queijos",
    desc: "Mussarela, catupiry, parmesão e provolone. Nossa novidade, cremosa do começo ao fim.",
    price: "R$ 69,90",
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
            alt="Pizza de lombinho com cream cheese e geleia de amora da Cerqueira's Pizza"
            width={1600}
            height={1073}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-40">
          <div className="max-w-2xl">
            <img
              src="/cerqueiras-logo.jpg"
              alt="Logo da Cerqueira's Pizza"
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border border-gold/30"
            />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Cururupe · Ilhéus / BA
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-cream sm:text-5xl md:text-7xl">
              Feita com carinho, para reunir quem você ama.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/80">
              Massa artesanal, ingredientes selecionados e aquele sabor que fica no coração.
              Delivery de terça a domingo, das 18h às 22h.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
                          <Link
                to="/pedido"
                className="rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
              >
                Monte seu pedido
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

      {/* Animated marquee bridge — decorativo */}
      <section aria-hidden="true" className="relative overflow-hidden border-y border-gold/30 bg-secondary/50 py-10">

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

        {/* Row 1 — scrolls left */}
        <div className="relative flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee-left items-center gap-8 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="font-display text-3xl font-bold text-cream sm:text-5xl">Cerqueira&apos;s Pizza</span>
                <Pizza className="h-8 w-8 text-gold" />
                <span className="font-display text-3xl font-bold text-gold sm:text-5xl">Lombinho com Cream Cheese</span>
                <Flame className="h-8 w-8 text-gold" />
                <span className="font-display text-3xl font-bold text-cream sm:text-5xl">4 Queijos</span>
                <Pizza className="h-8 w-8 text-gold" />
                <span className="font-display text-3xl font-bold text-gold sm:text-5xl">À Moda da Casa</span>
                <Truck className="h-8 w-8 text-gold" />
                <span className="font-display text-3xl font-bold text-cream sm:text-5xl">Delivery em Ilhéus</span>
                <MapPin className="h-8 w-8 text-gold" />
                <span className="font-display text-3xl font-bold text-gold sm:text-5xl">Cururupe · BA</span>
                <Clock className="h-8 w-8 text-gold" />
                <span className="font-display text-3xl font-bold text-cream sm:text-5xl">Ter a Dom · 18h — 22h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative mt-4 flex overflow-hidden opacity-60">
          <div className="flex shrink-0 animate-marquee-right items-center gap-8 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="font-display text-2xl font-bold text-gold/80 sm:text-4xl">Massa artesanal</span>
                <span className="font-display text-2xl font-bold text-cream/60 sm:text-4xl">•</span>
                <span className="font-display text-2xl font-bold text-gold/80 sm:text-4xl">Ingredientes frescos</span>
                <span className="font-display text-2xl font-bold text-cream/60 sm:text-4xl">•</span>
                <span className="font-display text-2xl font-bold text-gold/80 sm:text-4xl">Sabor que fica</span>
                <span className="font-display text-2xl font-bold text-cream/60 sm:text-4xl">•</span>
                <span className="font-display text-2xl font-bold text-gold/80 sm:text-4xl">Feita com carinho</span>
                <span className="font-display text-2xl font-bold text-cream/60 sm:text-4xl">•</span>
                <span className="font-display text-2xl font-bold text-gold/80 sm:text-4xl">Para reunir quem você ama</span>
                <span className="font-display text-2xl font-bold text-cream/60 sm:text-4xl">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-border/40 bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {[
            { t: "Ingredientes selecionados", d: "Sabor que fica em cada fatia." },
            { t: "Delivery", d: "Peça e receba em casa." },
            { t: "Ter a Dom · 18h — 22h", d: "Sua pizza prontinha, quentinha e no horário." },
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
            Monte seu pedido aqui e envie pelo WhatsApp. Delivery em Cururupe, Ilhéus.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
                     <Link
              to="/pedido"
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
            >
              Monte seu pedido
            </Link>
            <a
              href="https://www.instagram.com/cerqueiraspizza?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
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
