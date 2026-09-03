const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export const fetchPageBySlug = async (slug: string) => {
  /*
   * --------------------------------------------------
   * 1. NORMAL PAGE API
   * --------------------------------------------------
   */

  const pageUrl =
    `${STRAPI_URL}/api/pages` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}`;

  /*
   * --------------------------------------------------
   * 2. PRICING API
   * --------------------------------------------------
   */

  const pricingUrl =
    `${STRAPI_URL}/api/pages` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&populate[pageBuilder][on][acf-sections.home-featured-case-study][populate][pricing_cards][populate][feature_list]=*`;

  console.log("fetchPageBySlug: normal URL:", pageUrl);
  console.log("fetchPageBySlug: pricing URL:", pricingUrl);

  const [pageResponse, pricingResponse] = await Promise.all([
    fetch(pageUrl),
    fetch(pricingUrl),
  ]);

  if (!pageResponse.ok) {
    console.error(
      "fetchPageBySlug: page response not ok",
      pageResponse
    );

    throw new Error(
      `Failed to fetch page: ${pageResponse.status}`
    );
  }

  if (!pricingResponse.ok) {
    console.error(
      "fetchPageBySlug: pricing response not ok",
      pricingResponse
    );

    throw new Error(
      `Failed to fetch pricing data: ${pricingResponse.status}`
    );
  }

  const pageResult = await pageResponse.json();
  const pricingResult = await pricingResponse.json();

  console.log(
    "fetchPageBySlug: normal result:",
    pageResult
  );

  console.log(
    "fetchPageBySlug: pricing result:",
    pricingResult
  );

  const page = pageResult?.data?.[0];

  if (!page) {
    return null;
  }

  /*
   * --------------------------------------------------
   * Find pricing layout from special API response
   * --------------------------------------------------
   */

  const pricingLayouts =
    pricingResult?.data?.[0]?.pageBuilder || [];

  const pricingLayout = pricingLayouts.find(
    (layout: any) =>
      layout?.__component ===
      "acf-sections.home-featured-case-study"
  );

  /*
   * --------------------------------------------------
   * Find pageBuilder from normal response
   * --------------------------------------------------
   */

  const pageBuilder = page?.pageBuilder || [];

  const updatedPageBuilder = pageBuilder.map(
    (layout: any) => {
      if (
        layout?.__component ===
        "acf-sections.home-featured-case-study"
      ) {
        return {
          ...layout,

          pricing_cards:
            pricingLayout?.pricing_cards ||
            layout?.pricing_cards ||
            [],
        };
      }

      return layout;
    }
  );

  /*
   * --------------------------------------------------
   * Return page with enriched pricing data
   * --------------------------------------------------
   */

  return {
    ...page,
    pageBuilder: updatedPageBuilder,
  };
};


/*
 * ==================================================
 * FOOTER API
 * ==================================================
 *
 * Footer is a separate Strapi Single Type.
 *
 * API:
 * /api/footer
 *
 * menu_item is populated separately.
 */

export const fetchFooter = async () => {
  const url =
    `${STRAPI_URL}/api/footer` +
    `?populate[menu_item]=*`;

  console.log(
    "fetchFooter: requesting URL:",
    url
  );

  const response = await fetch(url);

  if (!response.ok) {
    console.error(
      "fetchFooter: response not ok",
      response
    );

    throw new Error(
      `Failed to fetch footer: ${response.status}`
    );
  }

  const result = await response.json();

  console.log(
    "fetchFooter: result:",
    result
  );

  return result?.data || null;
};


/*
 * ==================================================
 * HEADER API
 * ==================================================
 *
 * Header is a separate Strapi Single Type.
 *
 * API:
 * /api/header
 *
 * Populates:
 * - logo
 * - menu_item
 */

export const fetchHeader = async () => {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

  const url =
    `${STRAPI_URL}/api/header` +
    `?populate[logo]=true` +
    `&populate[menu_item]=true`;

  console.log("fetchHeader URL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    console.error(
      "fetchHeader: response not ok",
      response
    );

    throw new Error(
      `Failed to fetch header: ${response.status}`
    );
  }

  const result = await response.json();

  console.log(
    "HEADER API DATA:",
    result
  );

  return result?.data || null;
};