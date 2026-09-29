import type {
  CaseStudy,
  StrapiCollectionResponse,
} from "@/types/case-study";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export default async function getCaseStudyBySlug({
  slug,
}: {
  slug: string;
}): Promise<CaseStudy | null> {
  if (!STRAPI_URL) {
    throw new Error("VITE_STRAPI_URL is not configured.");
  }

  /*
   * --------------------------------------------------------------
   * populate=* only goes ONE level deep for nested components.
   * Several fields on case-study are components that themselves
   * contain a nested repeatable component, so those need an
   * explicit deeper populate or they come back empty:
   *
   *   - challenge_items -> tags        (numbered-item.tags)
   *   - strategy_phases -> items       (phase-item.items)
   *
   * Everything else (hero_stats, overview_points, results_stats,
   * why_worked_points, key_results_stats, featuredImage, seo) is
   * only one level deep so a plain populate=true is enough.
   * --------------------------------------------------------------
   */
  const populateParams =
    `populate[hero_stats]=true` +
    `&populate[overview_points]=true` +
    `&populate[challenge_items][populate]=*` +
    `&populate[strategy_phases][populate]=*` +
    `&populate[results_stats]=true` +
    `&populate[why_worked_points]=true` +
    `&populate[key_results_stats]=true` +
    `&populate[featuredImage]=true` +
    `&populate[seo][populate]=*`;

  /*
   * status=published -> only published entries are returned (Strapi v5).
   * If the entry is unpublished (or Draft & Publish shows it as draft),
   * the API returns an empty array and this function returns null,
   * so the page can show a 404.
   */
  const url =
    `${STRAPI_URL}/api/case-studies` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&status=published` +
    `&${populateParams}`;

  const response = await fetch(url, {
    // Don't let the browser serve a stale copy after unpublishing
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("getCaseStudyBySlug: response not ok", response);
    throw new Error(`Failed to fetch case study: ${response.status}`);
  }

  const result = (await response.json()) as StrapiCollectionResponse<CaseStudy>;

  return result.data?.[0] ?? null;
}