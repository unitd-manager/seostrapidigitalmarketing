import { useEffect } from "react";

const STRAPI_URL: string = import.meta.env.VITE_STRAPI_URL ?? "";

export interface SeoMedia {
  url?: string | null;
  alternativeText?: string | null;
}

/** Shape of the Strapi `shared.seo` component. */
export interface SeoData {
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  keywords?: string | null;
  canonicalUrl?: string | null;
  metaImage?: SeoMedia | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: SeoMedia | null;
  twitterCard?: "summary" | "summaryLarge" | string | null;
  schema?: unknown;
  noIndex?: boolean | null;
}

export interface SeoFallback {
  title?: string | null;
  description?: string | null;
  /** Force noindex regardless of the CMS value (used by the 404 page). */
  noIndex?: boolean;
}

const clean = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

export const absoluteMediaUrl = (media?: SeoMedia | null): string => {
  const url = clean(media?.url);
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `${STRAPI_URL}${url}`;
};

export const twitterCardValue = (card?: string | null) =>
  card === "summaryLarge" ? "summary_large_image" : "summary";

/** Resolved values that end up in <head>. Pure, so it is easy to test. */
export const buildSeoTags = (seo?: SeoData | null, fallback: SeoFallback = {}, currentUrl = "") => {
  const title = clean(seo?.metaTitle) || clean(fallback.title);
  const description = clean(seo?.metaDescription) || clean(fallback.description);
  const image = absoluteMediaUrl(seo?.ogImage) || absoluteMediaUrl(seo?.metaImage);

  let schema = "";
  if (seo?.schema && typeof seo.schema === "object") {
    schema = JSON.stringify(seo.schema);
  } else if (typeof seo?.schema === "string" && seo.schema.trim()) {
    try {
      schema = JSON.stringify(JSON.parse(seo.schema));
    } catch {
      schema = "";
    }
  }

  return {
    title,
    description,
    keywords: clean(seo?.keywords),
    robots: fallback.noIndex || seo?.noIndex ? "noindex, nofollow" : "",
    canonical: clean(seo?.canonicalUrl) || currentUrl,
    ogTitle: clean(seo?.ogTitle) || title,
    ogDescription: clean(seo?.ogDescription) || description,
    image,
    twitterCard: twitterCardValue(seo?.twitterCard),
    schema,
  };
};

type Restore = () => void;

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string): Restore {
  const existing = document.head.querySelector<HTMLElement>(selector);
  if (!value) return () => {};

  if (existing) {
    const previous = existing.getAttribute(attr);
    existing.setAttribute(attr, value);
    return () => {
      if (previous === null) existing.removeAttribute(attr);
      else existing.setAttribute(attr, previous);
    };
  }

  const el = create();
  el.setAttribute(attr, value);
  document.head.appendChild(el);
  return () => el.remove();
}

const meta = (key: "name" | "property", name: string, value: string) =>
  setTag(
    `meta[${key}="${name}"]`,
    () => {
      const el = document.createElement("meta");
      el.setAttribute(key, name);
      return el;
    },
    "content",
    value
  );

/** Writes the SEO tags into <head>. Returns a function that puts the previous values back. */
export function applySeo(seo?: SeoData | null, fallback: SeoFallback = {}): Restore {
  const tags = buildSeoTags(seo, fallback, `${window.location.origin}${window.location.pathname}`);
  const restores: Restore[] = [];

  const previousTitle = document.title;
  if (tags.title) document.title = tags.title;
  restores.push(() => {
    document.title = previousTitle;
  });

  restores.push(meta("name", "description", tags.description));
  restores.push(meta("name", "keywords", tags.keywords));
  restores.push(meta("name", "robots", tags.robots));

  restores.push(
    setTag(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        return el;
      },
      "href",
      tags.canonical
    )
  );

  restores.push(meta("property", "og:type", "website"));
  restores.push(meta("property", "og:url", tags.canonical));
  restores.push(meta("property", "og:title", tags.ogTitle));
  restores.push(meta("property", "og:description", tags.ogDescription));
  restores.push(meta("property", "og:image", tags.image));
  restores.push(meta("name", "twitter:card", tags.twitterCard));
  restores.push(meta("name", "twitter:title", tags.ogTitle));
  restores.push(meta("name", "twitter:description", tags.ogDescription));
  restores.push(meta("name", "twitter:image", tags.image));

  if (tags.schema) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo", "page");
    script.text = tags.schema;
    document.head.appendChild(script);
    restores.push(() => script.remove());
  }

  return () => restores.reverse().forEach((restore) => restore());
}

/** Apply CMS SEO for the current page and revert on unmount / when the data changes. */
export function useSeo(seo?: SeoData | null, fallback: SeoFallback = {}) {
  const key = JSON.stringify([seo ?? null, fallback]);

  useEffect(() => applySeo(seo, fallback), [key]); // eslint-disable-line react-hooks/exhaustive-deps
}
