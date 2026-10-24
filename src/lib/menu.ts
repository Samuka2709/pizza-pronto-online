export type Item = { name: string; desc: string; tag?: string };
export type Section = { title: string; note: string; price: string; items: Item[] };

export const sections: Section[] = [
  {
    title: "Pizzas Tradicionais",
    note: "8 fatias · escolha até 2 sabores na mesma pizza",
    price: "R$ 59,90",
    items: [
      {
        name: "Mussarela",
        desc: "Molho de tomate, mussarela e orégano. O clássico que nunca sai de moda.",
      },
      {
        name: "Calabresa",
        desc: "Molho de tomate, mussarela, calabresa fatiada, cebola e orégano. O sabor tradicional que conquista a cada fatia.",
      },
      {
        name: "Portuguesa",
        desc: "Molho de tomate, mussarela, presunto, ovos, cebola, pimentão, azeitonas, tomate e orégano.",
      },
      {
        name: "Frango com Catupiry",
        desc: "Molho de tomate, mussarela, frango desfiado, catupiry e orégano. Cremosa e sucesso em qualquer pedido.",
      },
      {
        name: "Bacon",
        desc: "Molho de tomate, mussarela, bacon crocante e orégano. Marcante para os apaixonados por bacon.",
      },
      {
        name: "Napolitana",
        desc: "Molho de tomate, mussarela, tomate fresco, parmesão ralado e orégano. Leve e equilibrada.",
      },
      {
        name: "Milho",
        desc: "Molho de tomate, mussarela, milho verde e orégano. Delicada e ótima para qualquer momento.",
      },
      {
        name: "Baiana",
        desc: "Molho de tomate, mussarela, calabresa moída, cebola, pimenta calabresa e orégano. Picância na medida certa.",
      },
    ],
  },
  {
    title: "Pizzas Especiais",
    note: "8 fatias · escolha até 2 sabores na mesma pizza",
    price: "R$ 69,90",
    items: [
      {
        name: "4 Queijos",
        desc: "Molho de tomate, mussarela, catupiry, parmesão e provolone. Cremosa do começo ao fim.",
        tag: "Novidade",
      },
      {
        name: "Lombinho com Cream Cheese e Geleia de Amora",
        desc: "Molho de tomate, mussarela, lombinho defumado, cream cheese, geleia de amora e orégano.",
      },
      {
        name: "Lombinho com Catupiry",
        desc: "Molho de tomate, mussarela, massa artesanal, lombinho defumado, catupiry e orégano.",
      },
      {
        name: "Frango com Bacon",
        desc: "Molho de tomate, mussarela, frango desfiado, bacon crocante e orégano.",
      },
      {
        name: "Atum",
        desc: "Molho de tomate, mussarela, atum em pedaços, cebola, azeitonas e orégano. Leve, saborosa e irresistível.",
        tag: "Novidade",
      },
      {
        name: "À Moda da Casa",
        desc: "Molho de tomate, mussarela, calabresa, bacon, catupiry e orégano. A receita especial da casa.",
      },
    ],
  },
  {
    title: "Pizzas Doces",
    note: "8 fatias · escolha até 2 sabores na mesma pizza",
    price: "R$ 64,90",
    items: [
      { name: "Nutella com Morango", desc: "Creme de leite, mussarela, Nutella e morango." },
      {
        name: "Chocolate com Confete",
        desc: "Creme de leite, mussarela, chocolate e confete colorido.",
      },
      { name: "Romeu e Julieta", desc: "Creme de leite, mussarela, goiabada cremosa." },
    ],
  },
  {
    title: "Pizza Doce Baby",
    note: "4 fatias · escolha até 2 sabores na mesma pizza",
    price: "R$ 34,90",
    items: [
      { name: "Nutella com Morango", desc: "Creme de leite, mussarela, Nutella e morango." },
      {
        name: "Chocolate com Confete",
        desc: "Creme de leite, mussarela, chocolate e confete colorido.",
      },
      { name: "Romeu e Julieta", desc: "Creme de leite, mussarela, goiabada cremosa." },
    ],
  },
];

export const drinks = [
  { name: "Guaraná lata", price: "R$ 5,00" },
  { name: "Coca-Cola lata", price: "R$ 6,00" },
  { name: "Guaraná litro", price: "R$ 10,00" },
  { name: "Coca-Cola litro", price: "R$ 12,00" },
  { name: "Água", price: "R$ 2,50" },
];

export function toNumber(price: string): number {
  return Number(price.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
