import { afterEach, describe, expect, it } from "vitest";
import { applySeo, buildSeoTags, twitterCardValue } from "./seo";

const seo = {
  metaTitle: "About Lightwarp | Real-Time 3D Animation Studio",
  metaDescription: "Learn about Lightwarp.",
  keywords: "3d, animation",
  canonicalUrl: "https://example.com/about",
  ogTitle: "OG title",
  ogImage: { url: "https://cdn.example.com/og.png" },
  metaImage: { url: "https://cdn.example.com/meta.png" },
  twitterCard: "summaryLarge",
  schema: { "@context": "https://schema.org", "@type": "AboutPage" },
  noIndex: false,
};

const content = (selector: string) => document.head.querySelector(selector)?.getAttribute("content");

afterEach(() => {
  document.head.innerHTML = "";
  document.title = "";
});

describe("seo", () => {
  it("maps twitter card values", () => {
    expect(twitterCardValue("summaryLarge")).toBe("summary_large_image");
    expect(twitterCardValue("summary")).toBe("summary");
  });

  it("falls back to the page title / description and og values", () => {
    const tags = buildSeoTags(null, { title: "Fallback" }, "https://x.com/p");
    expect(tags.title).toBe("Fallback");
    expect(tags.canonical).toBe("https://x.com/p");
    expect(buildSeoTags({ metaTitle: "T", metaDescription: "D" }).ogTitle).toBe("T");
  });

  it("writes tags to <head> and restores them on cleanup", () => {
    document.head.innerHTML = '<meta name="description" content="site default"><link rel="canonical" href="https://default.com">';
    document.title = "Default";

    const restore = applySeo(seo);

    expect(document.title).toBe(seo.metaTitle);
    expect(content('meta[name="description"]')).toBe("Learn about Lightwarp.");
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://example.com/about");
    expect(content('meta[property="og:title"]')).toBe("OG title");
    expect(content('meta[property="og:image"]')).toBe("https://cdn.example.com/og.png");
    expect(content('meta[name="twitter:card"]')).toBe("summary_large_image");
    expect(content('meta[name="robots"]')).toBeUndefined();
    expect(JSON.parse(document.head.querySelector('script[data-seo="page"]')!.textContent!)["@type"]).toBe("AboutPage");

    restore();

    expect(document.title).toBe("Default");
    expect(content('meta[name="description"]')).toBe("site default");
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://default.com");
    expect(document.head.querySelector('script[data-seo="page"]')).toBeNull();
    expect(document.head.querySelector('meta[property="og:title"]')).toBeNull();
  });

  it("adds noindex when requested", () => {
    applySeo({ ...seo, noIndex: true });
    expect(content('meta[name="robots"]')).toBe("noindex, nofollow");
  });
});
