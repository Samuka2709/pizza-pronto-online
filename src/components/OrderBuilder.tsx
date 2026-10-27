import { useMemo, useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { sections, drinks, toNumber, formatBRL } from "@/lib/menu";

const WHATSAPP_NUMBER = "5573998548191";

// Abas do cardápio: Tradicionais, Especiais, Doces e Doce Baby.
// Sabor 1 e Sabor 2 podem vir de abas diferentes (o valor é o do sabor mais caro).
// A Doce Baby tem 4 fatias, então só mistura com ela mesma.
const categories = sections.map((s, i) => ({
  idx: i,
  title: s.title.replace("Pizzas ", "").replace("Pizza ", ""),
  price: toNumber(s.price),
  priceLabel: s.price,
  baby: s.title.includes("Baby"),
  items: s.items,
}));

type Choice = { name: string; cat: number } | null;

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

const card =
  "rounded-2xl border border-gold/40 bg-card p-5 shadow-[0_0_0_1px_rgba(201,168,76,0.08)] sm:p-8";

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
  const [catIdx, setCatIdx] = useState(0);
  const [slot1, setSlot1] = useState<Choice>(null);
  const [slot2, setSlot2] = useState<Choice>(null);
  const [activeSlot, setActiveSlot] = useState<1 | 2>(1);
  const [pizzaQty, setPizzaQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [notice, setNotice] = useState("");

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

  const cat = categories[catIdx];
  const picks = [slot1, slot2].filter((p): p is NonNullable<Choice> => p !== null);
  const isBaby = picks.length > 0 ? categories[picks[0].cat].baby : cat.baby;
  const currentPrice =
    picks.length > 0 ? Math.max(...picks.map((p) => categories[p.cat].price)) : cat.price;

  const isPicked = (slot: Choice, flavorName: string) =>
    slot !== null && slot.name === flavorName && slot.cat === catIdx;

  const resetBuilder = () => {
    setSlot1(null);
    setSlot2(null);
    setActiveSlot(1);
    setPizzaQty(1);
  };

  const selectCat = (i: number) => {
    // Doce Baby (4 fatias) não mistura com as de 8 fatias
    if (picks.length > 0 && categories[picks[0].cat].baby !== categories[i].baby) {
      setSlot1(null);
      setSlot2(null);
      setActiveSlot(1);
      setNotice(
        categories[i].baby
          ? "A Doce Baby tem 4 fatias e não mistura com as outras. Escolha os sabores dela."
          : "Voltamos para as pizzas de 8 fatias. Escolha os sabores de novo.",
      );
    } else {
      setNotice("");
    }
    setCatIdx(i);
    setAdded(false);
  };

  const pickFlavor = (flavorName: string) => {
    const other = activeSlot === 1 ? slot2 : slot1;
    const current = activeSlot === 1 ? slot1 : slot2;
    if (isPicked(other, flavorName)) return; // já é a outra metade
    const next: Choice = isPicked(current, flavorName) ? null : { name: flavorName, cat: catIdx };
    if (activeSlot === 1) setSlot1(next);
    else setSlot2(next);
    setAdded(false);
    setNotice("");
  };

  const clearSlot = (n: 1 | 2) => {
    if (n === 1) setSlot1(null);
    else setSlot2(null);
    setActiveSlot(n);
    setAdded(false);
  };

  const flavorText = (flavors: string[]) =>
    flavors.length === 2 ? `Meia ${flavors[0]} / Meia ${flavors[1]}` : flavors[0];

  const addPizza = () => {
    if (picks.length === 0) return;
    setLines((prev) => [
      ...prev,
      {
        id: nextId,
        label: isBaby ? "Pizza Doce Baby" : "Pizza",
        slices: isBaby ? "4 fatias" : "8 fatias",
        flavors: picks.map((p) => p.name),
        qty: pizzaQty,
        unitPrice: currentPrice,
      },
    ]);
    setNextId((n) => n + 1);
    resetBuilder();
    setAdded(true);
    setNotice("");
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

          {/* Abas: Tradicionais, Especiais, Doces, Doce Baby */}
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {categories.map((c, i) => (
              <button
                key={c.title}
                type="button"
                onClick={() => selectCat(i)}
                className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                  i === catIdx
                    ? "border-gold bg-gold/15 ring-1 ring-gold"
                    : "border-gold/30 bg-secondary hover:border-gold/70"
                }`}
              >
                <span className="block text-sm font-bold text-cream">{c.title}</span>
                <span className="mt-1 block text-xs font-semibold text-gold">{c.priceLabel}</span>
                <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
                  {c.baby ? "4 fatias" : "8 fatias"}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {cat.baby
              ? "A Doce Baby tem 4 fatias e só mistura com os sabores dela."
              : "Misture sabores de Tradicionais, Especiais e Doces: troque de aba e escolha o outro sabor. Vale o valor do sabor mais caro."}
          </p>

          {/* Os dois sabores (metades) */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {([1, 2] as const).map((n) => {
              const slot = n === 1 ? slot1 : slot2;
              const active = activeSlot === n;
              return (
                <div
                  key={n}
                  className={`relative rounded-xl border-2 transition-colors ${
                    active ? "border-gold bg-gold/10" : "border-gold/30 bg-secondary"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveSlot(n)}
                    className="block w-full rounded-xl px-3 py-3 pr-10 text-left"
                  >
                    <span className="block text-xs font-semibold uppercase tracking-widest text-gold">
                      Sabor {n}
                      {n === 2 ? " (opcional)" : ""}
                    </span>
                    <span
                      className={`mt-1 block text-sm ${slot ? "font-semibold text-cream" : "text-muted-foreground"}`}
                    >
                      {slot ? slot.name : active ? "Escolha abaixo ↓" : "Toque para escolher"}
                    </span>
                  </button>
                  {slot && (
                    <button
                      type="button"
                      aria-label={`Remover sabor ${n}`}
                      onClick={() => clearSlot(n)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {slot1 && !slot2 && activeSlot === 1 && (
            <p className="mt-2 text-xs text-gold">
              Quer meia a meia? Toque em “Sabor 2” e escolha a outra metade.
            </p>
          )}
          {notice && <p className="mt-2 text-sm font-medium text-gold">{notice}</p>}

          {/* Sabores da aba escolhida */}
          <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-gold">
            {cat.title} · toque para colocar no Sabor {activeSlot}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {cat.items.map((it) => {
              const mark = isPicked(slot1, it.name) ? 1 : isPicked(slot2, it.name) ? 2 : 0;
              return (
                <button
                  key={it.name}
                  type="button"
                  onClick={() => pickFlavor(it.name)}
                  className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                    mark
                      ? "border-gold bg-gold/15"
                      : "border-gold/30 bg-secondary hover:border-gold"
                  }`}
                >
                  <span>
                    <span className="flex flex-wrap items-center gap-2 font-semibold text-cream">
                      {it.name}
                      {it.tag && (
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold">
                          {it.tag}
                        </span>
                      )}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-xs text-muted-foreground">
                      {it.desc}
                    </span>
                  </span>
                  {mark > 0 && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-primary-foreground">
                      {mark}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {picks.length > 0 && (
            <div className="mt-5 flex items-baseline justify-between gap-3 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3">
              <span className="text-sm text-cream">{flavorText(picks.map((p) => p.name))}</span>
              <span className="shrink-0 font-display text-xl font-bold text-gold">
                {formatBRL(currentPrice)}
              </span>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <Stepper value={pizzaQty} onChange={setPizzaQty} min={1} />
            <button
              type="button"
              onClick={addPizza}
              disabled={picks.length === 0}
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
