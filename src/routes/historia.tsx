import { createFileRoute } from "@tanstack/react-router";
import logo from "../assets/cerqueiras-logo.jpg.asset.json";

export const Route = createFileRoute("/historia")({
  head: () => ({
    meta: [
      { title: "Nossa História — Cerqueira's Pizza" },
      {
        name: "description",
        content:
          "Por que Cerqueira's Pizza? Nasceu da vontade de levar pizzas feitas com carinho para reunir famílias, amigos e criar bons momentos em Ilhéus/BA.",
      },
      { property: "og:title", content: "Nossa História — Cerqueira's Pizza" },
      {
        property: "og:description",
        content:
          "Mais do que um sobrenome, uma história: pizzas feitas com carinho para reunir quem você ama.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Historia,
});

const blocks = [
  {
    title: "Mais do que um sobrenome. Uma história.",
    text: "A Cerqueira's Pizza nasceu da vontade de levar pizzas feitas com carinho para reunir famílias, amigos e criar bons momentos.",
  },
  {
    title: "O nome vem de casa",
    text: "Escolhemos o nome Cerqueira porque ele representa quem está por trás de cada pedido: uma família que acredita que uma boa pizza vai muito além dos ingredientes.",
  },
  {
    title: "Cada detalhe tem um objetivo",
    text: "Cada massa aberta, cada molho preparado e cada cobertura escolhida têm um único objetivo: fazer você se sentir em casa.",
  },
  {
    title: "Não entregamos apenas uma pizza",
    text: "Queremos fazer parte das suas noites de sexta, dos sábados em família, das comemorações e daqueles momentos simples que acabam se tornando inesquecíveis.",
  },
  {
    title: "Porque acreditamos que...",
    text: "Toda boa história sempre começa ao redor de uma pizza.",
  },
];

function Historia() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <header className="text-center">
        <img
          src={logo.url}
          alt="Logo da Cerqueira's Pizza"
          width={112}
          height={112}
          className="mx-auto h-28 w-28 rounded-full border border-gold/30"
        />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Nossa história
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold text-cream">
          Por que Cerqueira's Pizza?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Feita com carinho, para reunir quem você ama.
        </p>
        <div className="mx-auto mt-6 h-px max-w-xs hairline-gold" />
      </header>

      <div className="mt-16 space-y-8">
        {blocks.map((b) => (
          <article
            key={b.title}
            className="rounded-2xl border border-border/60 bg-card p-8 transition-colors hover:border-gold/60"
          >
            <h2 className="font-display text-2xl font-bold text-gold">{b.title}</h2>
            <p className="mt-3 text-muted-foreground">{b.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground">Esse é o significado da</p>
        <p className="mt-2 font-display text-3xl font-bold text-cream">Cerqueira's Pizza.</p>
        <a
          href="https://wa.me/5573998548191"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
        >
          Fazer pedido
        </a>
      </div>
    </div>
  );
}
