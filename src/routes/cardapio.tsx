import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Forno D'Oro Pizzaria" },
      {
        name: "description",
        content:
          "Cardápio completo da Forno D'Oro: pizzas salgadas, doces, entradas e bebidas. Massa de fermentação natural e forno a lenha.",
      },
      { property: "og:title", content: "Cardápio — Forno D'Oro Pizzaria" },
      {
        property: "og:description",
        content:
          "Pizzas salgadas, doces, entradas e bebidas. Massa de fermentação natural e forno a lenha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cardapio,
});

type Item = { name: string; desc: string; price: string };
type Section = { title: string; items: Item[] };

const sections: Section[] = [
  {
    title: "Pizzas Salgadas",
    items: [
      { name: "Margherita D'Oro", desc: "Molho San Marzano, mozzarella fresca, manjericão, azeite.", price: "R$ 52" },
      { name: "Calabresa Artesanal", desc: "Calabresa defumada, cebola roxa, azeitonas, orégano.", price: "R$ 58" },
      { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, parmesão, provolone, nozes e mel.", price: "R$ 64" },
      { name: "Portuguesa", desc: "Presunto, ovos, cebola, ervilha, azeitona, mozzarella.", price: "R$ 60" },
      { name: "Frango com Catupiry", desc: "Frango desfiado temperado, catupiry original, milho.", price: "R$ 62" },
      { name: "Parma & Rúcula", desc: "Presunto parma, rúcula, tomate confit, mozzarella de búfala.", price: "R$ 72" },
    ],
  },
  {
    title: "Pizzas Doces",
    items: [
      { name: "Chocolate & Morango", desc: "Chocolate belga derretido, morangos frescos, granulado.", price: "R$ 56" },
      { name: "Brigadeiro Gourmet", desc: "Brigadeiro belga, granulado belga, leve toque de flor de sal.", price: "R$ 54" },
      { name: "Banana com Canela", desc: "Banana caramelizada, doce de leite, canela e açúcar.", price: "R$ 50" },
    ],
  },
  {
    title: "Entradas & Bebidas",
    items: [
      { name: "Bruschetta Caprese", desc: "Pão rústico, tomate, mozzarella, manjericão.", price: "R$ 32" },
      { name: "Bolinho de Bacalhau", desc: "6 unidades, bolinho artesanal de bacalhau.", price: "R$ 38" },
      { name: "Vinho Tinto (taça)", desc: "Seleção da casa, corte italiano.", price: "R$ 28" },
      { name: "Refrigerante", desc: "Lata 350ml — várias opções.", price: "R$ 8" },
      { name: "Suco Natural", desc: "Laranja, abacaxi ou maracujá.", price: "R$ 12" },
    ],
  },
];

function Cardapio() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Nosso cardápio
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold text-cream">Sabores que abraçam</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Massa de fermentação natural por 48h, assada no forno a lenha. Tamanhos: broto (4 fatias)
          e grande (8 fatias).
        </p>
        <div className="mx-auto mt-6 h-px max-w-xs hairline-gold" />
      </header>

      <div className="mt-16 space-y-16">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-3xl font-bold text-gold">{s.title}</h2>
            <div className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">
              {s.items.map((it) => (
                <div
                  key={it.name}
                  className="flex items-baseline justify-between gap-4 border-b border-border/40 py-4"
                >
                  <div>
                    <p className="font-display text-lg font-bold text-cream">{it.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
                  </div>
                  <span className="shrink-0 font-semibold text-gold">{it.price}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 rounded-2xl border border-gold/30 bg-card p-8 text-center sm:p-12">
        <h2 className="font-display text-2xl font-bold text-cream">Bora pedir?</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Escolha seu sabor favorito e receba quentinha na sua casa.
        </p>
        <Link
          to="/pedido"
          className="mt-6 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
        >
          Fazer pedido
        </Link>
      </div>
    </div>
  );
}
