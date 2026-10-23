import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logo from "../assets/cerqueiras-logo.jpg.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  if (import.meta.env.DEV) console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Tente recarregar ou volte para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "robots", content: "index, follow" },
      { title: "Cerqueira's Pizza — Pizzaria em Ilhéus/BA" },
      {
        name: "description",
        content:
          "Feita com carinho, para reunir quem você ama. Pizzaria em Cururupe, Ilhéus/BA. Delivery, terça a domingo das 18h às 22h.",
      },
      { name: "author", content: "Cerqueira's Pizza" },
      { property: "og:title", content: "Cerqueira's Pizza — Pizzaria em Ilhéus/BA" },
      {
        property: "og:description",
        content:
          "Feita com carinho, para reunir quem você ama. Delivery em Cururupe, Ilhéus/BA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/cardapio", label: "Cardápio" },
  { to: "/historia", label: "Nossa história" },
  { to: "/pedido", label: "Pedir" },
  { to: "/contato", label: "Contato" },
] as const;

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo.url}
            alt="Logo da Cerqueira's Pizza"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <span className="font-display text-xl font-bold tracking-tight text-cream">
            Cerqueira's <span className="gold-text">Pizza</span>
          </span>
        </Link>


        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5573998548191"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
          >
            Pedir agora
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 items-center justify-center text-gold md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            focusable="false"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" strokeLinecap="round" />
                <path d="M4 12h16" strokeLinecap="round" />
                <path d="M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Menu principal" className="border-t border-border/60 bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium uppercase tracking-widest text-muted-foreground"
                activeProps={{ className: "text-gold" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold text-cream">
              Cerqueira's <span className="gold-text">Pizza</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Feita com carinho, para reunir quem você ama. Ingredientes selecionados, sabor que
              fica.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Navegação</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Contato</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Cururupe — Ilhéus / BA</li>
              <li>Delivery</li>
              <li>Ter a Dom · 18h — 22h</li>
              <li>
                <a
                  href="https://wa.me/5573998548191"
                  className="transition-colors hover:text-cream"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                {" · "}
                <a
                  href="https://www.instagram.com/cerqueiraspizza?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  className="transition-colors hover:text-cream"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cerqueira's Pizza. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Ir para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>

    </QueryClientProvider>
  );
}
