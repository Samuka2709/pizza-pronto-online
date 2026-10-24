import { useMemo, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { sections, drinks, toNumber, formatBRL } from "@/lib/menu";

const WHATSAPP_NUMBER = "5573998548191";

// Salgadas juntam Tradicionais + Especiais: o cliente pode misturar,
// e o valor da pizza é o do sabor mais caro (a especial).
const groups = [
  {
    key: "salgada",
    title: "Salgada",
    label: "Pizza Salgada",
    slices: "8 fatias",
    hint: "Misturou tradicional com especial? Vale o valor da especial.",
    from: toNumber(sections[0].price),
    sections: [sections[0], sections[1]],
  },
  {
    key: "doce",
    title: "Doce",
    label: "Pizza Doce",
    slices: "8 fatias",
    hint: "Escolha até 2 sabores na mesma pizza.",
    from: toNumber(sections[2].price),
    sections: [sections[2]],
  },
  {
    key: "baby",
    title: "Doce Baby",
    label: "Pizza Doce Baby",
    slices: "4 fatias",
    hint: "Escolha até 2 sabores na mesma pizza.",
    from: toNumber(sections[3].price),
    sections: [sections[3]],
  },
] as const;

type PizzaLine = {
  id: number;
  label: string;
  slices: string;
  flavors: string[];
  qty: number;
  unitPrice: number;
};

const payments = ["Pix", "Cartão (na entrega)", "Dinheiro"] as const;

const field =
  "w-full rounded-xl border border-gold/50 bg-secondary px-4 py-3 text-base text-cream placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40";

const card = "rounded-2xl border border-gold/40 bg-card p-5 shadow-[0_0_0_1px_rgba(201,168,76,0.08)] sm:p-8";

function StepTitle({ n, children }: { n: number; children: string }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-cream">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
        {n}
      </span>
      {children}
    </h2>
  );
}

function Stepper({
  value,
  onChange,
  min = 0,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div className="inline-flex items-center gap-3">
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
      >
        <Minus className="h-5 w-5" />
      </button>
      <span className="w-7 text-center text-lg font-bold text-cream">{value}</span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => onChange(value + 1)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-gold/10 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
}

export function OrderBuilder() {
  // Pizza em construção
  const [groupIdx, setGroupIdx] = useState(0);
  const [flavor1, setFlavor1] = useState("");
  const [flavor2, setFlavor2] = useState("");
  const [pizzaQty, setPizzaQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Pedido
  const [lines, setLines] = useState<PizzaLine[]>([]);
  const [drinkQty, setDrinkQty] = useState<Record<string, number>>({});
  const [nextId, setNextId] = useState(1);

  // Dados do cliente
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<(typeof payments)[number]>("Pix");
  const [change, setChange] = useState("");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);

  const group = groups[groupIdx];

  // Todos os sabores do grupo, com o preço da categoria de cada um
  const options = useMemo(
    () =>
      group.sections.map((s) => ({
        title: s.title,
        price: toNumber(s.price),
        items: s.items,
      })),
    [group],
  );

  const priceOf = (flavor: string) => {
    for (const o of options) {
      if (o.items.some((it) => it.name === flavor)) return o.price;
    }
    return 0;
  };

  const currentFlavors = flavor2 && flavor2 !== flavor1 ? [flavor1, flavor2] : [flavor1];
  const currentPrice = flavor1 ? Math.max(...currentFlavors.map(priceOf)) : group.from;

  const resetBuilder = () => {
    setFlavor1("");
    setFlavor2("");
    setPizzaQty(1);
  };

  const addPizza = () => {
    if (!flavor1) return;
    setLines((prev) => [
      ...prev,
      {
        id: nextId,
        label: group.label,
        slices: group.slices,
        flavors: currentFlavors,
        qty: pizzaQty,
        unitPrice: currentPrice,
      },
    ]);
    setNextId((n) => n + 1);
    resetBuilder();
    setAdded(true);
  };

  const drinkLines = useMemo(
    () =>
      drinks
        .filter((d) => (drinkQty[d.name] ?? 0) > 0)
        .map((d) => ({ name: d.name, qty: drinkQty[d.name], unitPrice: toNumber(d.price) })),
    [drinkQty],
  );

  const total =
    lines.reduce((sum, l) => sum + l.qty * l.unitPrice, 0) +
    drinkLines.reduce((sum, d) => sum + d.qty * d.unitPrice, 0);

  const itemCount =
    lines.reduce((sum, l) => sum + l.qty, 0) + drinkLines.reduce((sum, d) => sum + d.qty, 0);

  const isEmpty = lines.length === 0 && drinkLines.length === 0;
  const missingData = !name.trim() || !address.trim();

  const flavorText = (flavors: string[]) =>
    flavors.length === 2 ? `Meia ${flavors[0]} / Meia ${flavors[1]}` : flavors[0];

  const buildMessage = () => {
    const parts: string[] = [];
    parts.push("🍕 *Novo pedido — Cerqueira's Pizza*");
    parts.push("");
    parts.push(`*Nome:* ${name.trim()}`);
    parts.push("");
    parts.push("*Pedido:*");
    lines.forEach((l) => {
      parts.push(
        `• ${l.qty}x ${l.label} (${l.slices}) — ${flavorText(l.flavors)} — ${formatBRL(l.qty * l.unitPrice)}`,
      );
    });
    drinkLines.forEach((d) => {
      parts.push(`• ${d.qty}x ${d.name} — ${formatBRL(d.qty * d.unitPrice)}`);
    });
    parts.push("");
    parts.push(`*Total:* ${formatBRL(total)} (sem taxa de entrega)`);
    parts.push("");
    parts.push(`*Endereço de entrega:* ${address.trim()}`);
    parts.push(
      `*Pagamento:* ${payment}${payment === "Dinheiro" && change.trim() ? ` (troco para ${change.trim()})` : ""}`,
    );
    if (notes.trim()) parts.push(`*Observações:* ${notes.trim()}`);
    return parts.join("\n");
  };

  const send = () => {
    setTouched(true);
    if (isEmpty || missingData) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mt-16 grid gap-8 pb-24 lg:grid-cols-[1.3fr_1fr] lg:pb-0">
      <div className="space-y-8">
        {/* 1. Pizzas */}
        <section className={card}>
          <StepTitle n={1}>Escolha sua pizza</StepTitle>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {groups.map((g, i) => (
              <button
                key={g.key}
                type="button"
                onClick={() => {
                  setGroupIdx(i);
                  resetBuilder();
                  setAdded(false);
                }}
                className={`rounded-xl border-2 px-2 py-3 text-center transition-colors ${
                  i === groupIdx
                    ? "border-gold bg-gold text-primary-foreground"
                    : "border-gold/40 bg-secondary text-cream hover:border-gold"
                }`}
              >
                <span className="block text-sm font-bold">{g.title}</span>
                <span
                  className={`mt-1 block text-xs ${i === groupIdx ? "text-primary-foreground/80" : "text-gold"}`}
                >
                  {g.key === "salgada" ? "a partir de " : ""}
                  {formatBRL(g.from)}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs uppercase tracking-widest text-gold/90">
            {group.slices} · até 2 sabores
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{group.hint}</p>

          <div className="mt-5 space-y-4">
            <label className="block text-sm font-medium text-cream">
              Sabor 1
              <select
                className={`${field} mt-2`}
                value={flavor1}
                onChange={(e) => {
                  setFlavor1(e.target.value);
                  if (e.target.value === flavor2) setFlavor2("");
                  setAdded(false);
                }}
              >
                <option value="">Toque para escolher…</option>
                {options.map((o) => (
                  <optgroup
                    key={o.title}
                    label={`${o.title.replace("Pizzas ", "")} — ${formatBRL(o.price)}`}
                  >
                    {o.items.map((it) => (
                      <option key={it.name} value={it.name}>
                        {it.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-cream">
              Sabor 2 <span className="font-normal text-muted-foreground">(opcional, meia a meia)</span>
              <select
                className={`${field} mt-2 disabled:opacity-50`}
                value={flavor2}
                onChange={(e) => {
                  setFlavor2(e.target.value);
                  setAdded(false);
                }}
                disabled={!flavor1}
              >
                <option value="">Só um sabor</option>
                {options.map((o) => (
                  <optgroup
                    key={o.title}
                    label={`${o.title.replace("Pizzas ", "")} — ${formatBRL(o.price)}`}
                  >
                    {o.items
                      .filter((it) => it.name !== flavor1)
                      .map((it) => (
                        <option key={it.name} value={it.name}>
                          {it.name}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </label>
          </div>

          {flavor1 && (
            <div className="mt-5 flex items-baseline justify-between rounded-xl border border-gold/40 bg-gold/10 px-4 py-3">
              <span className="text-sm text-cream">{flavorText(currentFlavors)}</span>
              <span className="font-display text-xl font-bold text-gold">
                {formatBRL(currentPrice)}
              </span>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <Stepper value={pizzaQty} onChange={setPizzaQty} min={1} />
            <button
              type="button"
              onClick={addPizza}
              disabled={!flavor1}
              className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:border disabled:border-gold/40 disabled:bg-transparent disabled:text-gold/50 disabled:hover:scale-100 sm:w-auto"
            >
              Adicionar ao pedido
            </button>
          </div>
          {added && (
            <p className="mt-3 text-sm font-medium text-gold">
              ✓ Pizza adicionada! Escolha outra ou siga para as bebidas.
            </p>
          )}
        </section>

        {/* 2. Bebidas */}
        <section className={card}>
          <StepTitle n={2}>Bebidas</StepTitle>
          <div className="mt-5 space-y-3">
            {drinks.map((d) => {
              const qty = drinkQty[d.name] ?? 0;
              return (
                <div
                  key={d.name}
                  className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3 transition-colors ${
                    qty > 0 ? "border-gold bg-gold/10" : "border-gold/30 bg-secondary/60"
                  }`}
                >
                  <div>
                    <p className="font-medium text-cream">{d.name}</p>
                    <p className="text-sm font-semibold text-gold">{d.price}</p>
                  </div>
                  <Stepper
                    value={qty}
                    onChange={(v) => setDrinkQty((prev) => ({ ...prev, [d.name]: v }))}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Dados */}
        <section className={card}>
          <StepTitle n={3}>Seus dados</StepTitle>
          <div className="mt-5 space-y-5">
            <label className="block text-sm font-medium text-cream">
              Seu nome
              <input
                className={`${field} mt-2`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                autoComplete="name"
              />
            </label>
            <label className="block text-sm font-medium text-cream">
              Endereço de entrega
              <input
                className={`${field} mt-2`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, número, bairro e ponto de referência"
                autoComplete="street-address"
              />
            </label>
            <div>
              <p className="text-sm font-medium text-cream">Forma de pagamento</p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {payments.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPayment(p)}
                    className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-colors ${
                      payment === p
                        ? "border-gold bg-gold text-primary-foreground"
                        : "border-gold/40 bg-secondary text-cream hover:border-gold"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              {payment === "Dinheiro" && (
                <input
                  className={`${field} mt-3`}
                  value={change}
                  onChange={(e) => setChange(e.target.value)}
                  placeholder="Troco para quanto? (ex.: R$ 100)"
                />
              )}
            </div>
            <label className="block text-sm font-medium text-cream">
              Observações <span className="font-normal text-muted-foreground">(opcional)</span>
              <textarea
                className={`${field} mt-2 min-h-24`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex.: sem cebola, borda recheada, campainha estragada…"
              />
            </label>
          </div>
        </section>
      </div>

      {/* Resumo */}
      <aside id="resumo" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border-2 border-gold/60 bg-secondary/60 p-5 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-cream">Seu pedido</h2>

          {isEmpty ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Nada por aqui ainda. Escolha uma pizza e toque em “Adicionar ao pedido”.
            </p>
          ) : (
            <ul className="mt-5 space-y-4">
              {lines.map((l) => (
                <li key={l.id} className="flex items-start justify-between gap-3">
                  <div className="text-sm">
                    <p className="font-semibold text-cream">
                      {l.qty}x {l.label}
                    </p>
                    <p className="text-muted-foreground">{flavorText(l.flavors)}</p>
                    <p className="font-semibold text-gold">{formatBRL(l.qty * l.unitPrice)}</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remover pizza do pedido"
                    onClick={() => setLines((prev) => prev.filter((x) => x.id !== l.id))}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
              {drinkLines.map((d) => (
                <li key={d.name} className="flex items-start justify-between gap-3 text-sm">
                  <p className="font-semibold text-cream">
                    {d.qty}x {d.name}
                  </p>
                  <p className="font-semibold text-gold">{formatBRL(d.qty * d.unitPrice)}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 border-t border-gold/40 pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-3xl font-bold text-gold">{formatBRL(total)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Taxa de entrega informada pelo atendimento no WhatsApp.
            </p>
          </div>

          {touched && isEmpty && (
            <p className="mt-4 text-sm text-destructive">Adicione ao menos um item ao pedido.</p>
          )}
          {touched && !isEmpty && missingData && (
            <p className="mt-4 text-sm text-destructive">Preencha seu nome e endereço.</p>
          )}

          <button
            type="button"
            onClick={send}
            className="mt-6 w-full rounded-full bg-primary px-6 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Enviar pedido pelo WhatsApp
          </button>
        </div>
      </aside>

      {/* Barra fixa no celular: total sempre à vista */}
      {!isEmpty && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-gold/60 bg-background/95 px-4 py-3 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-md items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {itemCount} {itemCount === 1 ? "item" : "itens"}
              </p>
              <p className="font-display text-xl font-bold text-gold">{formatBRL(total)}</p>
            </div>
            <a
              href="#resumo"
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground"
            >
              Ver pedido
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
