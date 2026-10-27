// Endereço público do site. Se trocar de domínio, mude aqui e em public/sitemap.xml e public/robots.txt.
export const SITE_URL = "https://pizza-pronto-online.vercel.app";
export const SITE_NAME = "Cerqueira's Pizza";

// Imagem de prévia usada no WhatsApp, Instagram, Facebook e Google.
// Hoje é a logo (150x150). Quando tiver a imagem 1200x630, salve em public/og-image.jpg
// e troque as duas linhas abaixo por:
//   const OG_IMAGE_PATH = "/og-image.jpg";
//   export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
const OG_IMAGE_PATH = "/cerqueiras-logo.jpg";
export const OG_IMAGE_SIZE = { width: 150, height: 150 };
export const OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;
const OG_IMAGE_ALT = "Logo da Cerqueira's Pizza";

// Imagem pequena aparece melhor como cartão "summary"; a de 1200x630 como cartão grande.
const TWITTER_CARD = OG_IMAGE_SIZE.width >= 600 ? "summary_large_image" : "summary";

type PageHeadOptions = {
  path: string;
  title: string;
  description: string;
  ogDescription?: string;
};

// Título, descrição, canonical, Open Graph e Twitter Card de cada página.
export function pageHead({ path, title, description, ogDescription }: PageHeadOptions) {
  const url = `${SITE_URL}${path}`;
  const shareDescription = ogDescription ?? description;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: shareDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: String(OG_IMAGE_SIZE.width) },
      { property: "og:image:height", content: String(OG_IMAGE_SIZE.height) },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { name: "twitter:card", content: TWITTER_CARD },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: shareDescription },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
