import { useMemo, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { sections, drinks, toNumber, formatBRL } from "@/lib/menu";

const WHATSAPP_NUMBER = "5573998548191";

type PizzaLine = {
  id: number;
  category: string;
  slices: string;
  flavors: string[];
  qty: number;
  unitPrice: number;
};

const payments = ["Pix", "Cartão (na entrega)", "Dinheiro"] as const;

const field =
  "w-full rounded-lg border border-border/60 bg-background px-3 py-2.5 text-sm text-cream placeholder:text-muted-foreground focus:border-gold/70 focus:outline-none";

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
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-cream transition-colors hover:border-gold/60"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-6 text-center font-semibold text-cream">{value}</span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => onChange(value + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-cream transition-colors hover:border-gold/60"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function OrderBuilder() {
  // Pizza em construção
  const [sectionIdx, setSectionIdx] = useState(0);
  const [flavor1, setFlavor1] = useState("");
  const [flavor2, setFlavor2] = useState("");
  const [pizzaQty, setPizzaQty] = useState(1);

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

  const section = sections[sectionIdx];

  const addPizza = () => {
    if (!flavor1) return;
    const flavors = flavor2 && flavor2 !== flavor1 ? [flavor1, flavor2] : [flavor1];
    setLines((prev) => [
      ...prev,
      {
        id: nextId,
        category: section.title,
        slices: section.note.split("·")[0].trim(),
        flavors,
        qty: pizzaQty,
        unitPrice: toNumber(section.price),
      },
    ]);
    setNextId((n) => n + 1);
    setFlavor1("");
    setFlavor2("");
    setPizzaQty(1);
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

  const isEmpty = lines.length === 0 && drinkLines.length === 0;
  const missingData = !name.trim() || !address.trim();

  const buildMessage = () => {
    const parts: string[] = [];
    parts.push("🍕 *Novo pedido — Cerqueira's Pizza*");
    parts.push("");
    parts.push(`*Nome:* ${name.trim()}`);
    parts.push("");
    parts.push("*Pedido:*");
    lines.forEach((l) => {
      const flavorText =
        l.flavors.length === 2
          ? `Meia ${l.flavors[0]} / Meia ${l.flavors[1]}`
          : l.flavors[0];
      parts.push(
        `• ${l.qty}x ${l.category} (${l.slices}) — ${flavorText} — ${formatBRL(l.qty * l.unitPrice)}`,
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
    <div className="mt-16 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-8">
        {/* 1. Pizzas */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-cream">1. Escolha sua pizza</h2>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {sections.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => {
                  setSectionIdx(i);
                  setFlavor1("");
                  setFlavor2("");
                }}
                className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                  i === sectionIdx
                    ? "border-gold bg-gold/10"
                    : "border-border/60 hover:border-gold/50"
                }`}
              >
                <span className="block text-sm font-semibold text-cream">
                  {s.title.replace("Pizzas ", "").replace("Pizza ", "")}
                </span>
                <span className="mt-1 block text-xs text-gold">{s.price}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
            {section.note}
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-muted-foreground">
              Sabor 1
              <select
                className={`${field} mt-1`}
                value={flavor1}
                onChange={(e) => setFlavor1(e.target.value)}
              >
                <option value="">Selecione…</option>
                {section.items.map((it) => (
                  <option key={it.name} value={it.name}>
                    {it.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-muted-foreground">
              Sabor 2 (opcional, meia a meia)
              <select
                className={`${field} mt-1`}
                value={flavor2}
                onChange={(e) => setFlavor2(e.target.value)}
                disabled={!flavor1}
              >
                <option value="">Só um sabor</option>
                {section.items
                  .filter((it) => it.name !== flavor1)
                  .map((it) => (
                    <option key={it.name} value={it.name}>
                      {it.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <Stepper value={pizzaQty} onChange={setPizzaQty} min={1} />
            <button
              type="button"
              onClick={addPizza}
              disabled={!flavor1}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              Adicionar ao pedido
            </button>
          </div>
        </section>

        {/* 2. Bebidas */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-cream">2. Bebidas</h2>
          <div className="mt-5 divide-y divide-border/40">
            {drinks.map((d) => (
              <div key={d.name} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-cream">{d.name}</p>
                  <p className="text-sm text-gold">{d.price}</p>
                </div>
                <Stepper
                  value={drinkQty[d.name] ?? 0}
                  onChange={(v) => setDrinkQty((prev) => ({ ...prev, [d.name]: v }))}
                />
              </div>
            ))}
          </div>
        </section>

        {/* 3. Dados */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-cream">3. Seus dados</h2>
          <div className="mt-5 space-y-4">
            <label className="block text-sm text-muted-foreground">
              Seu nome
              <input
                className={`${field} mt-1`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                autoComplete="name"
              />
            </label>
            <label className="block text-sm text-muted-foreground">
              Endereço de entrega
              <input
                className={`${field} mt-1`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, número, bairro e ponto de referência"
                autoComplete="street-address"
              />
            </label>
            <div>
              <p className="text-sm text-muted-foreground">Forma de pagamento</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {payments.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPayment(p)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      payment === p
                        ? "border-gold bg-gold/10 text-cream"
                        : "border-border/60 text-muted-foreground hover:border-gold/50"
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
            <label className="block text-sm text-muted-foreground">
              Observações (opcional)
              <textarea
                className={`${field} mt-1 min-h-20`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex.: sem cebola, borda recheada, campainha estragada…"
              />
            </label>
          </div>
        </section>
      </div>

      {/* Resumo */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-gold/30 bg-secondary/40 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-cream">Seu pedido</h2>

          {isEmpty ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Nada por aqui ainda. Escolha uma pizza e clique em “Adicionar ao pedido”.
            </p>
          ) : (
            <ul className="mt-5 space-y-4">
              {lines.map((l) => (
                <li key={l.id} className="flex items-start justify-between gap-3">
                  <div className="text-sm">
                    <p className="font-semibold text-cream">
                      {l.qty}x {l.category}
                    </p>
                    <p className="text-muted-foreground">
                      {l.flavors.length === 2
                        ? `Meia ${l.flavors[0]} / Meia ${l.flavors[1]}`
                        : l.flavors[0]}
                    </p>
                    <p className="text-gold">{formatBRL(l.qty * l.unitPrice)}</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remover pizza do pedido"
                    onClick={() => setLines((prev) => prev.filter((x) => x.id !== l.id))}
                    className="mt-1 text-muted-foreground transition-colors hover:text-gold"
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
                  <p className="text-gold">{formatBRL(d.qty * d.unitPrice)}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 border-t border-gold/30 pt-4">
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
            className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Enviar pedido pelo WhatsApp
          </button>
        </div>
      </aside>
    </div>
  );
}
